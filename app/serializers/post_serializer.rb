class PostSerializer
  include JSONAPI::Serializer
  attributes :url_token, :expired_at
  
  # set_type :salty_password
  set_id :url_token
end
