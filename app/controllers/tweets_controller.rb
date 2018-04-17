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

  def feed
    following_tweets = []
    users_array = current_user.following_users.split(" ")
    users_array.each do |user_id|
      user_obj = User.find(user_id)
      following_tweets += user_obj.tweets
    end
    @sorted_tweets = following_tweets.sort_by{|x|x.updated_at}.reverse
  end

  private

  def tweet_params
    params.require(:tweet).permit(:content)
  end
end
