Rails.application.routes.draw do

  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"

  namespace :api do
    namespace :v1 do
      resources :tasks, only: [:index, :create, :show, :update, :destroy]
      resources :tags, only: [:index, :create, :show, :destroy]
    end
  end

  get "tasks/:id/edit", to: "hello_world#index";
  get "tasks/:id", to: "hello_world#index";
  get "tasks/new", to: "hello_world#index";

  get "tags/", to: "hello_world#index";
  get "dashboard/", to: "hello_world#index";
  get "mainpage/", to: "hello_world#index";

  root "hello_world#index"
end
