require "application_system_test_case"

class TweetsTest < ApplicationSystemTestCase
  test "visiting home page" do
    login_as users(:wan)
    visit "/"
    assert_response :success
    # test login and go to home (feed) page

    fill_in "content", with: "this is a test tweet"

    click_on 'Submit'

    assert_text "this is a test tweet"
  end
end
