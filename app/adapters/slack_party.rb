require 'httparty'

class SlackParty
  include HTTParty
  base_uri 'https://slack.com/api'

  def initialize()
    # @token = token
    @options = {
      headers: {
        "Content-Type" => "application/json" 
      },
    }
  end

  def open_view(args)
    @options = { body: args.merge!(token: Rails.application.config_for(:slack)[:token])}
    self.class.post('/views.open', @options)
  end

  def publish_view(args)
    @options = { body: args}
    @options.merge!(headers: {"Authorization" => "Bearer #{Rails.application.config_for(:slack)[:token]}"})
    self.class.post('/views.publish',@options)
  end

  def post_message(args)
    # @options = { body: args.merge!(token: Rails.application.config_for(:slack)[:token])}
    @options = { body: args}
    @options.merge!(headers: {"Authorization" => "Bearer #{Rails.application.config_for(:slack)[:token]}"})
    self.class.post('/chat.postMessage',@options)
    
  end
end

