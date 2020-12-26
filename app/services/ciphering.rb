class Ciphering

  def initialize(body,salt='')
    @body = body
    @salt = salt
    @cipher = OpenSSL::Cipher::AES.new(256, :CBC)
  end

  def encrypt
    @cipher.encrypt
    @cipher.key = OpenSSL::PKCS5.pbkdf2_hmac_sha1(@salt, @salt, 20_000, @cipher.key_len)
    @body = @cipher.update(@body) + @cipher.final
    @body.unpack('H*')[0].upcase
  end

  def decrypt
    @cipher.decrypt
    @cipher.key =OpenSSL::PKCS5.pbkdf2_hmac_sha1(@salt, @salt, 20_000, @cipher.key_len)
    decrypted = [@body].pack('H*').unpack('C*').pack('c*')
    @cipher.update(decrypted) + @cipher.final
    
  end

end