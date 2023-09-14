module Api
    class RankingsController < ApplicationController
        def index
            
        @rankings = Score.joins(:user).order(ranking_score: :desc)
  
        response_data = @rankings.map do |ranking|
          {
            ranking_score: ranking.ranking_score,
            username: ranking.user.username
          }
        end
  
        render json: response_data
        end
    end
end