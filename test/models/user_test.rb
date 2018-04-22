require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "User can't be created w/o username" do
    user = User.new(email:"abc@abc.com", password:"123456")
    assert_not user.save
  end

  test "User can't be created with a existed username" do
    user1 = User.create(email:"abc@abc.com", password:"123456", username:"abc")
    user2 = User.new(email:"abcd@abc.com", password:"123456", username:"abc")
    assert_not user2.save
  end
end
