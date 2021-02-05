if Rails.env.production?
    Sentry.init do |config|
        config.dsn = 'https://7f238021f7bb4e2b91dc433a42116095@o513750.ingest.sentry.io/5616172'
        config.breadcrumbs_logger = [:active_support_logger]
    
        # To activate performance monitoring, set one of these options.
        # We recommend adjusting the value in production:
        config.traces_sample_rate = 0.5
        # or
        config.traces_sampler = lambda do |context|
        true
        end
    end
end