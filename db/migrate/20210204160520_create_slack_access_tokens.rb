class CreateSlackAccessTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :slack_access_tokens do |t|
      t.string :team_id
      t.string :bot_token

      t.timestamps
    end
    add_index :slack_access_tokens, :team_id
    add_index :slack_access_tokens, :bot_token
  end
end
