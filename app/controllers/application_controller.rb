class ApplicationController < ActionController::Base
  # protect_from_forgery
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :username, :following_users, :avatar, :avatar_cache])
    devise_parameter_sanitizer.permit(:account_update, keys: [:username, :email, :password, :current_password, :following_users, :avatar, :avatar_cache])
  end
end
