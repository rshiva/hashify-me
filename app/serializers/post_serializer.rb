class PostSerializer
  include JSONAPI::Serializer
  attributes :url_token, :expired_at, :has_salt
  
  # set_type :salty_password
  set_id :url_token
end
