class SlackController < ApplicationController

  def authorization
    slack = SlackApiClient.new()
    response = slack.authorize(code: params[:code])
    Rails.logger.info("add to slack response --> #{response.inspect}")
    if response["ok"]
      redirect_to root_url, notice: "Hashify bot added successfully"
    else
      redirect_to root_url, notice: response["error"]
    end
  end

  def index
  end
end