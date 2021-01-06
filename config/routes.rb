Rails.application.routes.draw do
  get 'slack', to: "slack#index"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'home#index'
  namespace :api, :path => "", :defaults => {:format => :json} do
    namespace :v1 do
      resources :posts, only: [:create] do
        member do
          get 'reveal'
        end
      end

      resources :slack, only: [:create] 
      get 'slack/authorization'
      post 'slack/slashcommand'
      get 'secret', to: "posts#secret"
    end
  end
  match '*path', to: 'home#index', via: :all
end
