class Group < ApplicationRecord

  has_many :memberships
  has_many :users, :through => :memberships
  belongs_to :admin, class_name: "User", foreign_key: "admin_id"

  validates :name, presence: true

  before_save {self.name.downcase!}

end
