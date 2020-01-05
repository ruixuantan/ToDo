class Tagging < ApplicationRecord
  belongs_to :tag, inverse_of: :taggings
  belongs_to :task

  validates :task_id, uniqueness: {scope: :tag_id}
end
