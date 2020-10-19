class Post
  include ActiveModel::Validations


  # id           
  # body          mandatory 
  # salty_password  optional
  # url_token      
  # expired_at     mandatory
  # created_at     
  # updated_at
  attr_accessor :url_token, :body, :salty_password, :expired_at, :created_at, :updated_at

  validates :body, presence: true
  validates :expired_at, presence: true

  def self.create_new(post_params)
    post = new.tap do |p|
      p.body = self.ciphered(post_params)
      p.expired_at = post_params[:expired_at]
      p.salty_password = self.generate_salt(post_params[:salty_password])
      p.url_token = self.generate_url_token
    end
    puts "--->",post.url_token

    if post.valid?
      $redis.set(post.url_token, post.to_json, ex: post.expired_at)
      {post: post.to_json, status: 200}
    else
      {error_type: "validation", error_message: "params missing", status: 422}
    end
  end


  protected

  def self.ciphered(post_params)
    Ciphering.new(post_params[:body], post_params[:salty_password] || "").encrypt
  end

  def self.generate_salt(salty_password = "")
    @salt = BCrypt::Password.create(salty_password)
  end

  def self.generate_url_token
    loop do
      @token = SecureRandom.uuid
      break @token unless $redis.get(@token).present?
    end
  end
end
