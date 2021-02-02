class Api::V1::SlackController < ApplicationController

  def slashcommand
    view_modal = JSON.load(Rails.root.join('app/views/Api/v1/slack/view_open.json'))
    slack = SlackApiClient.new()
    res = slack.open_view(trigger_id: params[:trigger_id], view: view_modal.to_json )
    Rails.logger.info("slash command response  --> #{res.inspect}")
    head :ok
  end


  def create
    response = JSON.parse(params[:payload])
    form_response = response["view"]["state"]["values"]
    body = form_response["message_id"]["ml_input"]["value"]
    expired_at = form_response["expiry_id"]["selected_expiry"]["selected_option"]["value"]
    salty_password = form_response["salt_id"]["sl_input"]["value"]
    user_id = response["user"]["id"]
    has_salt = salty_password.nil? ? false : true
    post_params = {body: body, expired_at: expired_at.to_i, salty_password: salty_password, has_salt: has_salt}
    post = Post.create(post_params)
    if post
      post_hash = PostSerializer.new(post).serializable_hash
      slack = SlackApiClient.new()
      #Make response message better
      # make the url correct for prod
      # unable to append channed_id, instead sending the private message to hashify. shouldnt the link be avaliable in private chat?
      url = "https://"+request.subdomains[0]+"."+request.domain + "/secret/#{post_hash[:data][:id]}"
      res = slack.post_message(channel: user_id ,text: "Use this link to share the secret message created.\n <#{url}| Secret URL>")
      Rails.logger.info("slash create post response  --> #{res.inspect}")
      head :ok
    end
    
  end
end


