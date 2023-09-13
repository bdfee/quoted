class CreateScores < ActiveRecord::Migration[7.0]
  def change
    create_table :scores do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :correct_responses, default: 0
      t.integer :incorrect_responses, default: 0
      
      t.timestamps
    end
  end
end
