module Api
    class ScoresController < ApplicationController
        require 'jwt'
    
        def increment
            # Global scoring regardless of logged-in status
            global_score = GlobalScore.first_or_initialize
    
            case params[:score_type]
            when 'correct'
                global_score.increment!(:correct_responses)
            when 'incorrect'
                global_score.increment!(:incorrect_responses)
            end
    
            global_score.save
    
            # Check for JWT with userID, which indicates logged-in status
            token = request.headers['Authorization']&.split(' ')&.last
    
            # If present, decode for userID
            payload = token.present? ? JWT.decode(token, ENV['JWT_SECRET'], true, algorithm: 'HS256') : nil
    
            if payload.present?
                user_id = payload[0]['user_id']
                user = User.find_by(id: user_id)
    
                if user
                    # Increment the user's score
                    score = Score.find_or_initialize_by(user: user)
        
                    case params[:score_type]
                    when 'correct'
                        score.increment!(:correct_responses)
                    when 'incorrect'
                        score.increment!(:incorrect_responses)
                    else
                        render json: { error: 'Invalid score type' }, status: :bad_request
                    return
                    end
        
                    score.save
        
                    # Send scores on the socket to the nav bar in the client
                    ActionCable.server.broadcast("scores_channel", { user_score: score, global_score: global_score })
        
                    render json: { message: 'Score updated' }, status: :ok
                else
                    render json: { error: 'User not found' }, status: :not_found
                end
            
            else
                # Send global score only to the nav in the client
                ActionCable.server.broadcast("scores_channel", { global_score: global_score })
    
                render json: { message: 'Global score updated' }, status: :ok
            end
        end
    end
  end