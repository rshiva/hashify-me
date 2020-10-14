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
      if params[:salty_password].present? && correct_salt?(@post.salty_password,params[:salty_password])
        salt =  params[:salty_password]
      elsif params[:salty_password].present? && !correct_salt?(@post.salty_password,params[:salty_password])
        render json: {error: {error_message: "Entered Salt is wrong"}}, status: 403 and return 
      else
        salt = ''               
      end
      @post.body = Ciphering.new(@post.body, salt).decrypt
      render json: {data: @post.attributes}
    else
      render json: {error: {error_message: "not found"}}, status: 404
    end
  end


  private
  def post_params
    # params.require(:post).permit(:id,:body, :salty_password, :url_token, :expires_at)
    params.permit(:id, :body, :salty_password, :url_token, :expires_at)
  end
end