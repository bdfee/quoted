# frozen_string_literal: true

module Api
  class SessionsController < ApplicationController
    require 'jwt'

    def create
      #  user model method
      user = User.find_by(username: params[:session][:username])

      if user&.authenticate(params[:session][:password])
        # create jwt with user_id payload
        token = encode_token(user_id: user.id)

        render json: { token: }, status: :ok
      else
        render json: { error: 'Invalid username or password' }, status: :unprocessable_entity
      end
    end

    private

    def encode_token(payload)
      JWT.encode(payload, ENV['JWT_SECRET'], 'HS256')
    end
  end
end
