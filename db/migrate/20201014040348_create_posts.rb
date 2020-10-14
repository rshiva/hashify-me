class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :body, null: false
      t.string :salty_password
      t.text :url_token, null: false
      t.datetime :expired_at

      t.timestamps
    end
  end
end
