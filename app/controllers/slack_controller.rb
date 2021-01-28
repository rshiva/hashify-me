class SlackController < ApplicationController

  def authorization
    slack = SlackApiClient.new()
    response = slack.authorize(code: params[:code])
    if response["ok"]
      redirect_to root_url, notice: "Hashify bot added successfully"
    else
      redirect_to root_url, notice: response["error"]
    end
  end

  def index
  end
end