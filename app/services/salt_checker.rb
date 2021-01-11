class SaltChecker

  def initialize(post,salt)
    @salt = post["has_salt"] ? salt : ''
    @encrypted_salt = post["salty_password"]
  end

  def call
    validate? ? {salt: @salt, msg: true} : {msg: false}
  end

  def validate?
    BCrypt::Password.new(@encrypted_salt) ==  @salt
  end


end