$redis = Redis.new(host: Rails.application.config_for(:redis)[:host],
                   port: Rails.application.config_for(:redis)[:port],
                   timeout: 10)