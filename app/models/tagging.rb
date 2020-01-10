class Tagging < ApplicationRecord
  belongs_to :tag, inverse_of: :taggings
  belongs_to :task
  belongs_to :user

  validates :task_id, uniqueness: {scope: :tag_id}
end
