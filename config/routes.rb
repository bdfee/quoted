# this block wraps all routes
# controllers in snake_case
# controller file itself in snake_case and suffixed with _controller.rb
# 

Rails.application.routes.draw do
  # get 'hello_world', to: 'hello_world#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route "/" to be handled by hello_world_controller.rb action index
  root 'hello_world#index'
end

