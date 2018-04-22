require 'test_helper'

class TweetTest < ActiveSupport::TestCase
  test "can not create a tweet w/o user_id" do
    tweet = Tweet.new(content: "abcdefg")
    assert_not tweet.save
  end

  test "can create a tweet if content length is less than 140 chars" do
    user1 = User.create(email:"abc@abc.com", password:"123456", username:"abc")
    tweet = Tweet.new(user:user1, content: "
      12345678901234567890123456789012345678901234567890123456789012345678901234567890")
    assert tweet.save
  end

  test "can't create a tweet if content length is more than 140 chars" do
    user1 = User.create(email:"abc@abc.com", password:"123456", username:"abc")
    tweet = Tweet.new(user:user1, content: "
      12345678901234567890123456789012345678901234567890123456789012345678901234567890
      12345678901234567890123456789012345678901234567890123456789012345678901234567890")
    assert_not tweet.save
  end
end
