class Api::V1::PostsController < ApplicationController
  before_action :find_post, only: [:reveal, :secret]

  def create
    render json: {error: {error_type: "validation", error_message: "params missing"}}, status: 422 and return if post_params[:body].empty?
    @post = Post.create_new(post_params)
    if @post[:status] == 200
      render json: {data: @post[:post]}, status: @post[:status]
    else
      render json: {error: {error_type: "validation", error_message: "params missing"}}, status: @post[:status]
    end
  end

  def reveal
    if @post
      result = SaltChecker.new(@post["salty_password"],params[:salty_password] ).call
      if result[:msg]
        message = Ciphering.new(@post["body"], result[:salt]).decrypt
        render json: {data: message}
        $redis.del(@token) #deleting once its revealed
      else
        render json: {error: {error_type: "invalid_data", error_message: "Not the right key"}}, status: 403 and return 
      end
    else
      render json: {error: {error_type: "not_found", error_message: "not found"}}, status: 404
    end
  end


  def secret
    if @post
      render json: {data: { token: @post["url_token"]}} 
    else
      render json: {error: {error_type: "not_found", error_message: "not found"}}, status: 404 and return
    end
  end



  private
  def post_params
    params.permit(:id, :body, :salty_password, :url_token, :expired_at)
  end

  def find_post
    @token = params["token"] || params[:id]
    @post = $redis.get(@token)
    @post = JSON.parse(@post) if @post
  end
end