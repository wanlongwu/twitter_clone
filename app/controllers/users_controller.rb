require 'json'
class UsersController < ApplicationController
  def show
    @tweets = Tweet.where(user:params[:id]).order(updated_at: :desc)
    respond_to do |format|
      format.html
      format.json { render :json => @tweets.to_json(include: :user) }
    end
  end

  def update
    @user = current_user
    users_array = JSON.parse(@user.following_users)
    users_array << user_params[:following_users].to_i
    @user.following_users = users_array.uniq.to_s
    @user.save!
  end

  private

  def user_params
    params.require(:user).permit(:following_users, :password, :email, :avatar)
  end

end
