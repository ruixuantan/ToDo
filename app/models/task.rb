class Task < ApplicationRecord
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings
  belongs_to :user 

  validates :description, uniqueness: true

  accepts_nested_attributes_for :tags
  accepts_nested_attributes_for :taggings, allow_destroy: true
end
