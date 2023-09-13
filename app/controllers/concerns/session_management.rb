module SessionManagement
    extend ActiveSupport::Concern

    def sign_in(user)
        session[:user_id] = user.id
    end

    def sign_out
        reset_session
    end
end