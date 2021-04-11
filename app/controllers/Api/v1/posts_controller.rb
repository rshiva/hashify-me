class Api::V1::PostsController < ApplicationController
  before_action :validate_has_salt, only: [:create]
  before_action :find_post, only: [:reveal, :secret, :reveal_post]

  def create
    render json: {error: {error_type: "validation", error_message: "params missing"}}, status: 422 and return if post_params[:body].empty?
    if current_user && current_user.id == post_params[:created_by]
      if post_params[:group_selected] && current_user.is_member?(post_params[:group_id])
        post = Post.create(post_params)
      else
        render json: {error: {error_type: "validation", error_message: "You don't belong to this group"}}, status: 422
      end
    else
      post = Post.create(post_params)
    end
    if post.valid? 
      post_hash = PostSerializer.new(post).serializable_hash
      render json: {data: post_hash[:data][:attributes]}, status: 200
    else
      render json: {error: {error_type: "validation", error_message: post.errors.full_messages.join(" ")}}, status: 422
    end
  end

  def reveal
    if @post
      result = SaltChecker.new(@post, params[:salty_password]).call
      if result[:msg]
        message = Ciphering.new(@post["body"], result[:salt]).decrypt
        render json: {data: message}
        $redis.del(@token) #deleting once its revealed
      else
        render json: {error: {error_type: "invalid_data", error_message: "Oops! Incorrect Passcode"}}, status: 403 and return 
      end
    else
      render json: {error: {error_type: "not_found", error_message: " Data not found or has been already viewed"}}, status: 404
    end
  end

  def reveal_post
    if @post
      result = SaltChecker.new(@post, post_params[:salty_password]).call
      if result[:msg]
        message = Ciphering.new(@post["body"], result[:salt]).decrypt
        render json: {data: message}
        $redis.del(@token) #deleting once its revealed
      else
        render json: {error: {error_type: "invalid_data", error_message: "Oops! Incorrect Passcode"}}, status: 403 and return 
      end
    else
      render json: {error: {error_type: "not_found", error_message: " Data not found or has been already viewed"}}, status: 404
    end
  end


  def secret
    if @post
      render json: {url_token: @post["url_token"], expired_at: @post["expired_at"], has_salt: @post["has_salt"]} 
    else
      render json: {error: {error_type: "not_found", error_message: "not found"}}, status: 404 and return
    end
  end

  private
  def post_params
    params.require(:post)
    .permit(:id, :body, :salty_password, :url_token,
            :expired_at, :has_salt, :group_selected, :group_id,
            :created_by)
  end

  def find_post
    @token = params["token"] || params[:id]
    @post = $redis.get(@token)
    @post = JSON.parse(@post) if @post
  end

  def validate_has_salt
    if post_params.has_key?(:has_salt)
      unless [true, false].include?(post_params[:has_salt])
        render json: {error: {error_type: "validation", error_message: "Cannot pass other than boolean"}}, status: 422 and return
      end
    end
  end
end