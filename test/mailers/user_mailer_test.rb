require 'test_helper'

class UserMailerTest < ActionMailer::TestCase
  test "sign up confirmation" do
    mail = UserMailer.registration_confirmation(User.create(email:"abc@abc.com", password:"123456", username:"abc")).deliver_now
    assert_equal "Registration Confirmation", mail.subject
    assert_equal ["abc@abc.com"], mail.to
    assert_equal ["abc@twitter-fake.com"], mail.from
  end

end
