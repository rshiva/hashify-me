class Post < ApplicationRecord
  validates :body, presence: true
end
