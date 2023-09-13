module Api
    class UsersController < ApplicationController
        def create
            # username password auto hashed into password_digest
            # has_secure_password macro in model
            @user = User.new(user_params)
  
            if @user.save
                render json: @user, status: :created
            else
                render json: { errors: @user.errors.full_message }, status: :unprocessable_entity
            end
        end
  
        private
  
        def user_params
            params.require(:user).permit(:username, :password)
        end
    end
end