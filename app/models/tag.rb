class Tag < ApplicationRecord
  has_many :taggings, dependent: :destroy
  has_many :tasks, through: :taggings
  belongs_to :user

  validates :name, uniqueness: true, presence: true

  accepts_nested_attributes_for :tasks
  accepts_nested_attributes_for :taggings, allow_destroy: true

  before_save :edit_name

  def edit_name
    self.name.downcase!.strip!
  end
end
