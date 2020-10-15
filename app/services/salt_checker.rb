class SaltChecker

  def initialize(encrypted_salt,salt)
    @salt = salt || '' 
    @encrypted_salt = encrypted_salt
  end

  def call
    validate? ? {salt: @salt, msg: true} : {msg: false}
  end

  def validate?
    BCrypt::Password.new(@encrypted_salt) ==  @salt
  end


end