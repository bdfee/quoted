class AddRankingScoreToScores < ActiveRecord::Migration[7.0]
  def change
    add_column :scores, :ranking_score, :decimal, precision: 10, scale: 2, default: 0
  end
end
