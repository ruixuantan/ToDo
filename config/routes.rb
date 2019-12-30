Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :tasks, only: [:index, :create, :show, :update, :destroy]
      resources :tags, only: [:index, :create, :show, :update, :destroy]
    end
  end
  get 'tasks/:id/edit', to: 'hello_world#index';
  get 'tasks/:id', to: 'hello_world#index';
  get 'tasks/new', to: 'hello_world#index';

  root 'hello_world#index'
end
