class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.text :description
      t.datetime :dateline
      t.boolean :is_posted

      t.timestamps
    end
  end
end
