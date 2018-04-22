require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::ControllerHelpers
  test "should get show" do
    sign_in @user
    get root_path
    assert_response :success
  end

  # test 'GET new' do
  # # Mimic the router behavior of setting the Devise scope through the env.
  # @request.env['devise.mapping'] = Devise.mappings[:user]

  # # Use the sign_in helper to sign in a fixture `User` record.
  # sign_in users(:wan)

  # get :new

  # assert_response :success
  # assert something
# end

end
