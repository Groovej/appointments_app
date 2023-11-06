Rails.application.routes.draw do
  devise_for :user

  devise_scope :user do
    post '/sign_in', to: 'authentication#create'
    delete '/sign_out', to: 'authentication#destroy'
  end

  get 'sign_in', to: 'home#sign_in'

  root to: "home#sign_in"

  get 'dashboard', to: 'home#index'
  get 'sessions', to: 'home#index'
  get 'new', to: 'home#index'
  post 'appointment', to: 'home#create'

  get 'coaches', to: 'home#coaches'
  get 'user', to: 'home#user'
  get 'imcoming', to: 'home#imcoming'
end
