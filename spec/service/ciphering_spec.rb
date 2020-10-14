require 'spec_helper'

RSpec.describe Ciphering do
  context 'encrypt' do
    before(:each) do
      @post =  create(:post)
    end
    it 'create hash' do
      plain_text = @post.body

      cipher = Ciphering.new(plain_text,@post.salty_password)
      
      enc = cipher.encrypt()
      expect(enc).not_to eq(plain_text)
    end
  end

  context 'decrypt' do
    before(:each) do
      @post = create(:post)
    end

    it 'decrypts hash' do
      plain_text = @post.body
      cipher = Ciphering.new(plain_text,@post.salty_password)

      cipher.encrypt()
      decrypted_text = cipher.decrypt()
      expect(decrypted_text).to eq(plain_text)
    end
  end
end