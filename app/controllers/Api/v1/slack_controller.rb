class Api::V1::SlackController < ApplicationController

  def authorization
    client_id ="1457351754660.1444473716470" #Rails.application.config_for(:slack)[:client_id]
    client_secret = Rails.application.config_for(:slack)[:client_secret]
    code = params[:code]
    binding.pry
    url = "https://slack.com/api/oauth.v2.access?client_id=#{client_id}&client_secret=#{client_secret}&code=#{code}"
    response = HTTParty.post(url)
    render json: {body: {message: "Authorization was called", response: response}}
  end

  def slashcommand
    view_modal = JSON.load(Rails.root.join('app/views/Api/v1/slack/view_open.json'))
    slack = SlackParty.new()
    res = slack.open_view(trigger_id: params[:trigger_id], view: view_modal.
      to_json )
    head :ok
  end


  def create
    response = JSON.parse(params[:payload])
    form_response = response["view"]["state"]["values"]
    body = form_response["message_id"]["ml_input"]["value"]
    expired_at = form_response["expiry_id"]["static_select-action"]["selected_option"]["value"]
    salty_password = form_response["salt_id"]["sl_input"]["value"]
    post_params = {body: body, expired_at: expired_at.to_i, salty_password: salty_password}
    post = Post.create(post_params)
    if post
      post_hash = PostSerializer.new(post).serializable_hash
      slack = SlackParty.new()
      #instead of test need to send block
      # make the url correct for prod
      # unable to append channed_id
      url = "https://"+request.subdomains[0]+"."+request.domain + "/v1/secret?token=#{post_hash[:data][:id]}"
      res = slack.post_message(channel: params[:channel_id],text: "Use this link to share the secret message created.\n <#{url}| Secret URL>")
    end
    
  end
end


