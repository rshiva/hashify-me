class Account < ApplicationRecord
  has_many :users
  validates :name, presence: true

  before_save { self.name.downcase! }
end
