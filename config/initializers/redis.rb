$redis = Redis.new(host: Rails.application.config_for(:redis)[:host],
                  ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE },
                  timeout: 10)