class UsersController < ApplicationController
  def show
    @user = User.find(current_user.id)
    @tweet = Tweet.new
  end
end
