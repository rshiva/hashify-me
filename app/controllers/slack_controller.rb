class SlackController < ApplicationController

  def authorization
    slack = SlackApiClient.new()
    response = slack.authorize(code: params[:code])
    Rails.logger.info("add to slack authorization response --> #{response.inspect}")
    if response["ok"]
      # Rails.logger.info("slack logged in user #{response['authed_user']['id']}")
      add_to_slack_bot_access(response)
      redirect_to root_url, notice: "Hashify bot added successfully"
    else
      redirect_to root_url, notice: response["error"]
    end
  end

  private

  def add_to_slack_bot_access(response)
    if response['team']['id'] && response['access_token']
      @slack_access = SlackAccessToken.find_by(team_id: response['team']['id'])
        unless @slack_access.bot_token == response['access_token']
          @slack_access.bot_token = response['access_token']
          @slack_access.save!
        end
    end
  end
end
