class Post
  include ActiveModel::Validations
  include Generator

  EXPIRE_IN = [2, 12, 24]

  # id           
  # body          mandatory 
  # salty_password  optional
  # url_token      
  # expired_at     mandatory
  # created_at     
  # updated_at
  attr_accessor :url_token, :body, :salty_password, :expired_at, :created_at, :updated_at, :has_salt

  validates :body, presence: true
  validates :expired_at, presence: true

  def self.create(post_params)
    post = new.tap do |p|
      salty_password = post_params[:has_salt] ? post_params[:salty_password] : ''
      p.body = self.ciphered(post_params[:body], salty_password)
      p.expired_at = time_to_sec(EXPIRE_IN[post_params[:expired_at].to_i]) if post_params[:expired_at]
      p.salty_password = self.generate_salt(salty_password)
      p.has_salt = post_params[:has_salt]
      p.url_token = self.generate_url_token
    end
    if post.valid?
      $redis.set(post.url_token, post.to_json, ex: post.expired_at)
      post
    end
  end


  protected

  def self.serializer(post)
    
  end


end
