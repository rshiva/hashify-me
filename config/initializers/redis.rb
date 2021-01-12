$redis = Redis.new(host: Rails.application.config_for(:redis)[:host],
                   timeout: 10)