class RemoveEmailConfirmColumnToUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :email_confirmed, :boolean
    remove_column :users, :confirm_token, :string
  end
end
