# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

# random_following_users = ""
# (1..10).sample.times do
#   random_following_users += (1..10).sample + " "
# end

names_attributes = [
  {password:"123456", username: "Salena Gomez", email:'sg@sg.com', following_users: "[1,2,3]"},
  {password:"123456", username: "Mark allen", email:'ma@ma.com', following_users: "[1,2,3]"},
  {password:"123456", username: "Adam sandler", email:'as@as.com', following_users: "[1,2,3]"},
  {password:"123456", email:'he@as.com', username: "Hessa", following_users: "[4,5,6]"},
  {password:"123456", email:'hen@as.com', username: "Henry", following_users: "[4,5,6]"},
  {password:"123456", email:'kev@as.com', username: "Kevin", following_users: "[4,5,6]"},
  {password:"123456", email:'wan@as.com', username: "Wanlong", following_users: "[4,5,6]"},
  {password:"123456", email:'shi@as.com', username: "Shinzo Abe", following_users: "[7,8,9]"},
  {password:"123456", email:'Don@as.com', username: "Don Johnson", following_users: "[7,8,9]"},
  {password:"123456", email:'Mic@as.com', username: "Mickey Mouse", following_users: "[7,8,9]"}
]

User.create!(names_attributes)

20.times do
  new_tweet = Tweet.create!(
    content:Faker::Lorem.sentence,
    user_id:User.all.sample.id,
    comment_to:(1..20).to_a.sample
    )
  puts new_tweet.content
end
