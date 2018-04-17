class TweetsController < ApplicationController
  def create
    @tweet = Tweet.new(tweet_params)
    @tweet.user = current_user
    @tweet.save!
    respond_to do |format|
      format.html { redirect_to user_path(current_user) }
      format.js
    end
  end

  def index
    @tweets = Tweet.all.order(updated_at: :desc)
  end

  private

  def tweet_params
    params.require(:tweet).permit(:content)
  end
end
