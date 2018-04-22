class ApplicationMailer < ActionMailer::Base
  default from: 'abc@twitter-fake.com'
  layout 'mailer'
end
