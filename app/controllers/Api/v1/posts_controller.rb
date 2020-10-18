class Api::V1::PostsController < ApplicationController
  before_action :generate_token, only: :create
  before_action :generate_salt, only: [:create]
  before_action :destroy_exceed_posts, only: [:secret]

  def create
    render json: {error: {error_type: "validation", error_message: "params missing"}}, status: 422 and return if post_params[:body].empty?
    @post = Post.new(post_params)
    @post.body = Ciphering.new(post_params[:body], post_params[:salty_password] || "").encrypt
    @post.salty_password = @salt
    @post.url_token =  @token
    if @post.save
      render json: {data: {url: @post.attributes}}, status: 200
    else
      render json: {error: {error_type: "validation", error_message: "params missing"}}, status: 422
    end
  end

  def reveal
    @post = Post.where(id: params[:id],url_token: params[:token]).last
    if @post
      result = SaltChecker.new(@post.salty_password,params[:salty_password] ).call
      if result[:msg]
        @post.body = Ciphering.new(@post.body, result[:salt]).decrypt
        render json: {data: @post.attributes}
      else
        render json: {error: {error_type: "invalid_data", error_message: "Not the right key"}}, status: 403 and return 
      end
    else
      render json: {error: {error_type: "not_found", error_message: "not found"}}, status: 404
    end
  end


  def secret
    if @post
      render json: {data: {id: @post.id, token: @post.url_token}} and return
    else
      render json: {error: {error_type: "not_found", error_message: "not found"}}, status: 404 and return
    end
  end



  private
  def post_params
    # params.require(:post).permit(:id,:body, :salty_password, :url_token, :expires_at)
    params.permit(:id, :body, :salty_password, :url_token, :expired_at)
  end

  def destroy_exceed_posts
    @post =  Post.where(url_token: params[:token]).or(Post.where(id: params[:id])).last
    if @post and @post.try(:expired_at) <= Time.now
      @post.destroy
      @post = nil
    end
    @post
  end
end