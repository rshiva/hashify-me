class SlackController < ApplicationController
  def index
  end

  def auth
    render json: {body: {message: "Authorization was called"}}
  end
end
