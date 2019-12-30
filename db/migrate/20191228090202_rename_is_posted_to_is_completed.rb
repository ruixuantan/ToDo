class RenameIsPostedToIsCompleted < ActiveRecord::Migration[6.0]
  def change
    rename_column :tasks, :is_posted, :is_completed
  end
end
