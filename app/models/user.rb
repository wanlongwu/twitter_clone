class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  mount_uploader :avatar, AvatarUploader


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable

  # attr_accessor :email, :password, :username, :avatar, :avatar_cache, :remove_avatar, :following_users

  # validates_presence_of   :avatar
  validates_integrity_of  :avatar
  validates_processing_of :avatar

  has_many :tweets, dependent: :destroy
  validates :username, presence: true, uniqueness: true
end
