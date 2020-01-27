class User < ApplicationRecord
  has_secure_password

  has_many :tasks
  has_many :tags
  has_many :taggings

  validates_presence_of :email
  validates_presence_of :password
  validates_uniqueness_of :email
end
