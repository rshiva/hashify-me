module Generator

  extend ActiveSupport::Concern

  class_methods do
    
    def ciphered(post_params)
      Ciphering.new(post_params[:body], post_params[:salty_password] || "").encrypt
    end

    def generate_salt(salty_password = "")
      @salt = BCrypt::Password.create(salty_password)
    end

    def generate_url_token
      loop do
        @token = SecureRandom.uuid
        break @token unless $redis.get(@token).present?
      end
    end

    def time_to_sec(hours)
      hours * 60 * 60
    end

  end
end