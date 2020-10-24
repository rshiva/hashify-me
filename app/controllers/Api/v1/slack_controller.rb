class Api::V1::SlackController < ApplicationController

  def authorization
    client_id = Rails.application.config_for(:slack)[:client_id]
    client_secret = Rails.application.config_for(:slack)[:client_secret]
    code = params[:code]
    url = "https://slack.com/api/oauth.v2.access?client_id=#{client_id}&client_secret=#{client_secret}&code=#{code}"
    response = HTTParty.post(url)
    render json: {body: {message: "Authorization was called", response: response}}
  end

  def slashcommand
    view_modal = JSON.load(Rails.root.join('app/views/Api/v1/slack/slack_modal.json'))
    slack = SlackParty.new(params[:token])
    puts slack.open_view(trigger_id: params[:trigger_id], view: view_modal.to_json)
    head :ok
  end


  def create

    response = JSON.parse[params[:payload]]
    form_response = response["view"]["state"]["values"]
    body = form_response["wmo"]["ml_input"]["value"]
    expired_at = form_response["L6l"]["static_select-action"]["selected_option"]["value"]
    salty_password = form_response["R=g1"]["sl_input"]["value"]
    post_params = {body: body, expired_at: expired_at, salty_password: salty_password}
    render json: {error: {error_type: "validation", error_message: "params missing"}}, status: 422 and return if post_params[:body].empty?
    @post = Post.create_new(post_params)
    if @post[:status] == 200
      render json: {data: @post[:post]}, status: @post[:status]
    else
      render json: {error: {error_type: "validation", error_message: "params missing"}}, status: @post[:status]
    end
  end
end
