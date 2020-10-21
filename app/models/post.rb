class Post
  include ActiveModel::Validations
  include Generator

  EXPIRE_IN = [ {mins: [1, 10, 15]},
                {hours: [1, 6, 24]},
                {days: [1,3,7]}
              ]

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
    if post.valid?
      $redis.set(post.url_token, post.to_json, ex: post.expired_at)
      {post:  self.serializer(post), status: 200}
    else
      {error_type: "validation", error_message: "params missing", status: 422}
    end
  end


  protected


  def self.serializer(post)
    post_hash = PostSerializer.new(post).serializable_hash
    post_hash[:data][:attributes]
  end

end
