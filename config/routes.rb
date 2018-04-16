Rails.application.routes.draw do

  devise_for :users
  root to: 'users#show'

  resources :users, only: :show do
    resources :tweets, only: :create
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
