module Api
    class ScoresController < ApplicationController
        require 'jwt'
  
        def increment
            token = request.headers['Authorization']&.split(' ')&.last
            payload = JWT.decode(token, ENV['JWT_SECRET'], true, algorithm: 'HS256')
            user_id = payload[0]['user_id']
    
            user = User.find_by(id: user_id)
  
            if user

                score = Score.find_or_initialize_by(user: user)

                if params[:score_type] == 'correct'
                    score.increment!(:correct_responses)
                elsif params[:score_type] == 'incorrect'
                    score.increment!(:incorrect_responses)
            else
                render json: { error: 'Invalid score type' }, status: :bad_request
                return
            end

                score.save
  
                render json: { message: 'Score updated' }, status: :ok
            else
                render json: { error: 'User not found' }, status: :not_found
            end
        end
    end
end