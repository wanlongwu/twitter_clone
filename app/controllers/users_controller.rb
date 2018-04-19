class UsersController < ApplicationController
  def show
    @tweets = Tweet.where(user:params[:id]).order(updated_at: :desc)
    respond_to do |format|
      format.html
      format.json { render :json => @tweets.to_json(include: :user) }
    end
  end
end
