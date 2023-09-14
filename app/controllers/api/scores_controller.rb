module Api
    class ScoresController < ApplicationController
      require 'jwt'
      
      def increment

        # Check for JWT with userID, which indicates logged-in status
        token = request.headers['Authorization']&.split(' ')&.last
  
        # If present, decode for userID
        payload = token.present? ? JWT.decode(token, ENV['JWT_SECRET'], true, algorithm: 'HS256') : nil
  
        # safe navigation to user_id, will be nil if user not logged in
        user_id = payload&.dig(0, 'user_id')

        score_type = params[:score_type]

        # score service can take nil as user_id to only update global score
        score_service = ScoreService.new(score_type, user_id)

        score_service.increment_global_score

        if user_id.present?
            
            score_service.increment_user_score
            
            ActionCable.server.broadcast("scores_channel", { user_score: score, global_score: global_score })
            
            render json: { message: 'Score updated' }, status: :ok
        else
            
            ActionCable.server.broadcast("scores_channel", { global_score: global_score })
  
            render json: { message: 'Global score updated' }, status: :ok
        end

    end
end