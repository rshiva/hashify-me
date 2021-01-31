uri = URI.parse(Rails.application.config_for(:redis)[:host])
$redis = Redis.new(host: uri.host, port: uri.port, password: uri.password,
                  ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE },
                  timeout: 10)
