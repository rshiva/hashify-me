class Api::V1::PostsController < ApplicationController
  before_action :generate_token, only: :create
  before_action :generate_salt, only: [:create]

  def create
    render json: {error: {error_message: "params missing"}}, status: 422 and return if post_params[:body].empty?
    @post = Post.new(post_params)
    @post.body = Ciphering.new(post_params[:body], post_params[:salty_password] || "").encrypt
    @post.salty_password = @salt
    @post.url_token =  @token
    if @post.save
      render json: {data: {url: @post.attributes}}, status: 200
    else
      render json: {error: {error_message: "params missing"}}, status: 422
    end
  end

  def reveal
    @post = Post.where(id: params[:id]).last
    if @post
      result = SaltChecker.new(@post.salty_password,params[:salty_password] ).call
      if result[:msg]
        @post.body = Ciphering.new(@post.body, result[:salt]).decrypt
        render json: {data: @post.attributes}
      else
        render json: {error: {error_message: "Not the right key"}}, status: 403 and return 
      end
    else
      render json: {error: {error_message: "not found"}}, status: 404
    end
  end


  def secret
    @post =  Post.where(url_token: params[:token]).last
    if @post
      render json: {data: {id: @post.id, token: @post.url_token}} and return
    else
      render json: {error: {error_message: "not found"}}, status: 404 and return
    end
  end



  private
  def post_params
    # params.require(:post).permit(:id,:body, :salty_password, :url_token, :expires_at)
    params.permit(:id, :body, :salty_password, :url_token, :expires_at)
  end
end