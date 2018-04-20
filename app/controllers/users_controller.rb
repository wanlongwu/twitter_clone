class UsersController < ApplicationController
  def show
    @tweets = Tweet.where(user:params[:id]).order(updated_at: :desc)
    respond_to do |format|
      format.html
      format.json { render :json => @tweets.to_json(include: :user) }
    end
  end

  def update
    @user = User.find(params[:id])
    @user.following_users = @user.following_users + "," + user_params[:following_users]
    @user.save!
  end

  private

  def user_params
    params.require(:user).permit(:following_users, :password, :email)
  end

end
