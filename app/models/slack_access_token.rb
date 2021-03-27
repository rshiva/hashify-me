class SlackAccessToken < ApplicationRecord
  validates :team_id, :bot_token, presence: true
end
