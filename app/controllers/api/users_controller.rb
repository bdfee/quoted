module Api
    class UsersController < ApplicationController
        def create
            @user = User.new(user_params)
  
            Rails.logger.info(@user)
            
            if @user.save
                render json: @user, status: :created
                # redirect_to root_path, notice: 'Account created successfully!'
            else
                render json: { errors: @user.errors.full_message }, status: :unprocessable_entity
                # render 'new'
            end
        end
  
        private
  
        def user_params
            params.require(:user).permit(:username, :password)
        end
    end
end