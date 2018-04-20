class UserMailer < ApplicationMailer
    default :from => "me@mydomain.com"
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.welcome.subject
  #
  def registration_confirmation(user)
    @user = user

    mail to: "#{user.username} <#{user.email}>", :subject => "Registration Confirmation")
  end
end
