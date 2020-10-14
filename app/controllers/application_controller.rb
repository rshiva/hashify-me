class ApplicationController < ActionController::Base

  skip_before_action :verify_authenticity_token

  def generate_token
    loop do
      @token = SecureRandom.hex(10)
      break @token unless Post.where(url_token: @token).exists?
    end
  end

  def generate_salt
    @salt = BCrypt::Password.create(params[:salty_password])
  end

  def correct_salt?(encrypted_salt,salt='')
    BCrypt::Password.new(encrypted_salt) ==  salt
  end
  
end
