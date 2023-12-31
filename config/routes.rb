# frozen_string_literal: true

# this block wraps all routes
# controllers in snake_case
# controller file itself in snake_case and suffixed with _controller.rb
#

Rails.application.routes.draw do
  get 'quoted', to: 'main#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get 'api/new_quote', to: 'api/quote#index'

  post 'api/users', to: 'api/users#create'

  post 'api/signin', to: 'api/sessions#create'

  get 'api/scores', to: 'api/scores#getScores'

  post 'api/scores', to: 'api/scores#increment'
  # Defines the root path route "/" to be handled by hello_world_controller.rb action index
  # root 'main#index'

  get 'api/rankings', to: 'api/rankings#index'
end
