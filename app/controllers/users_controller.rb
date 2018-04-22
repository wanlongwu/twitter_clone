require 'json'
class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @tweets = Tweet.where(user:params[:id]).order(updated_at: :desc)
    respond_to do |format|
      format.html
      format.json { render :json => @tweets.to_json(include: :user) }
    end
  end

  def update
    @user = current_user
    users_array = user_params[:following_users].split(",").map {|i|i.to_i}.to_s
    @user.following_users = users_array
    @user.save!
  end

  private

  def user_params
    params.require(:user).permit(:following_users, :password, :email, :avatar)
  end

end
