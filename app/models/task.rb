class Task < ApplicationRecord
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  validates :description, uniqueness: true

  accepts_nested_attributes_for :tags
  accepts_nested_attributes_for :taggings, allow_destroy: true
end
