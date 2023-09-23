# frozen_string_literal: true

module Api
  class ScoresController < ApplicationController
    require 'jwt'

    def getScores
      
      user_id = get_user_id_from_token

      global_score = GlobalScore.first_or_initialize

      if user_id.present?

        user_score = Score.find_or_initialize_by(user_id: user_id)

        render json: { user_score:, global_score: }, status: :ok

      else

        render json: { global_score: }, status: :ok
      end
    end

    def increment

      user_id = get_user_id_from_token

      score_type = params[:score_type]

      # Score service can take nil as user_id to only update global score
      score_service = ScoreService.new(score_type, user_id)
      # increment the global score
      global_score = score_service.increment_global_score

      if user_id.present?
        # increment the user score
        user_score = score_service.increment_user_score
        # Socket the user and global score
        ActionCable.server.broadcast('scores_channel', { user_score:, global_score: })

        render json: { message: 'Score updated' }, status: :ok
      else
        # socket the global score only
        ActionCable.server.broadcast('scores_channel', { global_score: })
        render json: { message: 'Global score updated' }, status: :ok
      end
    end

    def get_user_id_from_token
      # Check for JWT with userID, which indicates logged-in status
      token = request.headers['Authorization']&.split(' ')&.last

      # If present, decode for userID
      payload = token.present? ? JWT.decode(token, ENV['JWT_SECRET'], true, algorithm: 'HS256') : nil

      # Safe navigation to user_id, will be nil if user not logged in
      payload&.dig(0, 'user_id')
    end

  end
end
