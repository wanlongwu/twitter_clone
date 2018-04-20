class TweetsController < ApplicationController
  # skip_before_action :verify_authenticity_token

  def create
    @tweet = Tweet.new(tweet_params)
    @tweet.user = current_user
    respond_to do |format|
      format.json do
        if @tweet.save!
          render :json => @tweet.to_json(include: :user)
        else
          render :json => { :errors => @tweet.errors.messages }
        end
      end
    end
  end

  def index
    @tweets = Tweet.all.order(updated_at: :desc)
    @users_array = []
    @users_array = current_user.following_users.split(" ") if current_user.following_users != nil

    respond_to do |format|
      format.html
      format.json { render :json => @tweets.to_json(include: :user) }
    end
  end

  def feed
    following_tweets = []
    @users_array = []
    if current_user != nil && current_user.following_users != nil
      @users_array = current_user.following_users.split(" ")
      @users_array.each do |user_id|
        user_obj = User.find(user_id)
        following_tweets += user_obj.tweets
      end
      sorted_tweets = following_tweets.sort_by{|x|x.updated_at}.reverse
    end

    respond_to do |format|
      format.html
      format.json { render :json => sorted_tweets.to_json(include: :user) }
    end

  end

  private

  def tweet_params
    params.require(:tweet).permit(:content)
  end
end
