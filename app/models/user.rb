class User < ApplicationRecord
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  belongs_to :account

  has_many :memberships
  has_many :groups, :through => :memberships
  
  has_many :invitations, class_name: 'User', as: :invited_by

  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  accepts_nested_attributes_for :account

  delegate :name, to: :account, prefix: true


  def is_member?(group_id)
    memberships.exists?(group_id: group_id)
  end
end
