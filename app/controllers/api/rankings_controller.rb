module Api
    class RankingsController < ApplicationController
        def index
        # Join the scores and users tables and order by ranking_score in descending order
        @rankings = Score.joins(:user).order(ranking_score: :desc)
  
        # Select the fields you want to include in the response (ranking_score and username)
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