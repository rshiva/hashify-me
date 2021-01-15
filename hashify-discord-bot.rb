require 'discordrb'
require 'httparty'

# require './hashify-discord-bot'
class HashifyDiscordBot
  EXPIRE_IN = [2, 12, 24]
  attr_reader :bot, :base_url

  def initialize
    @bot = Discordrb::Commands::CommandBot.new token: token, prefix: '/'
    @base_url = "https://e0bda4b98ea1.ngrok.io/v1/"
  end

  def call
    description = "How to use Hashify \n /hashify -m Message goes here -s optional salt key -e 2/12/24 hours"
    bot.command(:hashify, help_available: true, description: description) do |event, *args|
      #check for args empty
      if args.empty?
        title = "Empty empty message can't be encrypted"
        description = "How to use Hashify \n /hashify -m Message goes here -s optional salt key -e 2/12/24 hours"
        send_error_embed(event,title: title, description: description)
      elsif parse_message(args).has_key?(:body)
        message_id = event.message.id
        #delete message from chat
        event.channel.delete_message(message_id)
        send_success_embed(event,args)
      else
        title = "Psst! Wrong Formatting. Help is below"
        description = "How to use Hashify \n /hashify -m Message goes here -s optional salt key -e 2/12/24 hours"
        send_error_embed(event,title: title, description: description)
      end
      message_id = event.message.id
      #delete message from chat after url generation
      event.channel.delete_message(message_id)
    end

    bot.run
  end

  def parse_message(args)
    if args.include?("-m") and args.include?("-e")
      
      expiry_start = args.index("-e") + 1
      expiry_end = args.size - 1
      given_time_range = EXPIRE_IN.include?(args[expiry_start].to_i)
      if given_time_range
        # args = args.reject(&:blank?)
        message_start = args.index("-m") + 1
        message_end = (args.index("-s") || args.index("-e")) - 1
    
        salt_start = (args.index("-s") || args.index("-e")) + 1
        salt_end = args.index("-e") - 1
    
        message = args[message_start .. message_end].join(' ')
        salt = args[salt_start..salt_end].join(' ')
        expiry_at = args[expiry_start..expiry_end].join(' ')
        {body: message, salt: salt, expiry: EXPIRE_IN.index(args[expiry_start].to_i)}
      else
        {error: "error"}
      end
    else
      {error: "error"}
    end
  end


def send_success_embed(event, args)
  message = parse_message(args)
  @options = { headers: { "Content-Type" => "application/json" } }
  has_salt = message[:salt].nil? ? false : true
  body = {body: {body: message[:body],salty_password: message[:salt], expired_at: message[:expiry], has_salt: has_salt}.to_json}
  @options.merge!(body)

  response = HTTParty.post(@base_url+"posts/", @options)
  if response.code
    res = JSON.parse(response.body)
    event.channel.send_embed do |embed|
      embed.title = 'Secret Link for Secret Message'
      embed.description = "Copy this link to share the hashified message "
      embed.thumbnail = {"url": "https://cdn.discordapp.com/embed/avatars/0.png"}
      embed.url = @base_url+"secret?token="+res["data"]["url_token"]
    end
  end
end


  def send_error_embed(event,args)
    event.channel.send_embed do |embed|
      embed.title = args[:title]
      embed.colour = '#ec524b'
      embed.description = args[:description]
    end
  end

end
