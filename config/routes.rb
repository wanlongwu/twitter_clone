Rails.application.routes.draw do

  devise_for :users
  root to: 'tweets#feed'

  resources :users, only: :show

  resources :tweets, only: [:create, :index]

  get 'tweets/feed'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

