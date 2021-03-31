class Group < ApplicationRecord

  has_many :memberships
  has_many :users, :through => :memberships
  belongs_to :group_admin, class_name: "User", foreign_key: "group_admin_id"

  validates :name, presence: true
end
