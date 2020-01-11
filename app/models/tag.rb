class Tag < ApplicationRecord
  has_many :taggings, dependent: :destroy
  has_many :tasks, through: :taggings
  belongs_to :user

  validates :name, uniqueness: true, presence: true

  accepts_nested_attributes_for :tasks
  accepts_nested_attributes_for :taggings, allow_destroy: true

  before_save :self.name.downcase!.strip
end
