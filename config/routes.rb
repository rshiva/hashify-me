Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, :path => "", :defaults => {:format => :json} do
    namespace :v1 do
      resources :posts, only: [:create] do
        member do
          get 'reveal'
        end
      end

      get 'secret', to: "posts#secret"
    end
  end
end
