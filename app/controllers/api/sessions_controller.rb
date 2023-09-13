module Api
    class SessionsController < ApplicationController
        require 'jwt'

        def create
            user = User.find_by(username: params[:session][:username])
            if user && user.authenticate(params[:session][:password])

                token = encode_token(user_id: user.id)

                render json: { token: token }, status: :ok    
            else
                # Handle invalid sign-in attempt
                render json: { error: 'Invalid username or password' }, status: :unprocessable_entity
            end
        end

        private

        def encode_token(payload)
            JWT.encode(payload, ENV['JWT_SECRET'], 'HS256')
        end
    end
end