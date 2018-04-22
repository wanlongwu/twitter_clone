require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  # include Devise::Test::ControllerHelpers
  test "should be able to sign in" do
    @user = users(:wan)
    @user.confirmed_at = Time.zone.now
    @user.save
    sign_in @user
    get '/'
    assert_response :success
  end

  test "should be able to show user's all post" do
    @user = users(:wan)
    @user.confirmed_at = Time.zone.now
    @user.save
    sign_in @user
    get user_path(@user.id)
    assert_equal 200, response.status
  end

end
