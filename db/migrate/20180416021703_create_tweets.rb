class CreateTweets < ActiveRecord::Migration[5.1]
  def change
    create_table :tweets do |t|
      t.text :content
      t.references :user, foreign_key: true
      t.integer :comment_to

      t.timestamps
    end
  end
end
