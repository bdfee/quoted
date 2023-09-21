# frozen_string_literal: true

class CreateGlobalScores < ActiveRecord::Migration[7.0]
  def change
    create_table :global_scores do |t|
      t.integer :correct_responses, default: 0
      t.integer :incorrect_responses, default: 0

      t.timestamps
    end
  end
end
