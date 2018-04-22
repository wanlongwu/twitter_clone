require 'test_helper'
require 'json'

class TweetsControllerTest < ActionDispatch::IntegrationTest

  # test "should successfully create a new tweet" do
    # @user = users(:wan)
    # @user.confirmed_at = Time.zone.now
    # @user.save
    # sign_in @user
  #   post tweets_url, '{content: "testing"}'
  #   assert_equal "testing", @response.content
  # end

  test "index method" do
     @user = users(:wan)
    @user.confirmed_at = Time.zone.now
    @user.save
    sign_in @user
    get tweets_url
    assert_equal 200, response.status
  end

end
