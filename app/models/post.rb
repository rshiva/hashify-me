class Post < ApplicationRecord
  validates :body, presence: true
  validates :expired_at, presence: true
end
