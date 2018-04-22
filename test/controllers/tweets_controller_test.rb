require 'test_helper'
require 'json'

# class TweetsControllerTest < ActionDispatch::IntegrationTest

#   test "should successfully create a new tweet" do
#     assert_difference 'Tweet.count' do
#       post(:create, {tweets: {content: "tweet test"}})
#     end

#     assert_response :success

#     json_response = JSON.parse(@response.body)
#     assert_equal json_response["content"], "tweet test"
#   end

#   test "index method" do
#     get /tweets

#     json_response = JSON.parse(response.body)
#     assert_equal Tweet.last.content, json_response[-1]["content"]
#   end

# end
