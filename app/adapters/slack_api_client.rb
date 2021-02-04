require 'httparty'

class SlackApiClient
  include HTTParty
  base_uri 'https://slack.com/api'

  def initialize()
    @options = {
      headers: {
        "Content-Type" => "application/json" 
      },
    }
  end

  def authorize(args)
    client_id = Rails.application.config_for(:slack)[:client_id]
    client_secret = Rails.application.config_for(:slack)[:client_secret]
    @options = { body: args.merge!(client_id: client_id,client_secret: client_secret )}
    self.class.post('/oauth.v2.access', @options)
  end

  def open_view(args)
    @options = { body: args}
    self.class.post('/views.open', @options)
  end

  # def publish_view(args)
  #   @options = { body: args}
  #   @options.merge!(headers: {"Authorization" => "Bearer #{Rails.application.config_for(:slack)[:token]}"})
  #   self.class.post('/views.publish',@options)
  # end

  def post_message(args)
    @options = { body: args}
    @options.merge!(headers: {"Authorization" => "Bearer #{args[:token]}"})
    self.class.post('/chat.postMessage',@options)
  end
end

