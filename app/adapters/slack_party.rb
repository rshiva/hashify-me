require 'httparty'

class SlackParty
  include HTTParty
  base_uri 'https://slack.com/api'

  def initialize(token)
    @token = token
    @options = {
      headers: {
        "Content-Type" => "application/json" 
      },
    }
  end

  def open_view(args)
    puts "key",Rails.application.config_for(:slack)
    options = { body: args.merge!(token: Rails.application.config_for(:slack)[:token])}
    puts "optsions",options
    self.class.post('/views.open', options)
  end
end

