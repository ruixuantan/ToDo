class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  skip_before_action :verify_authenticity_token

  #method to retrive user_id of current session
  def current_user
    return unless session[:user_id]
    @current_user = User.find_by_id(session[:user_id])
  end
end
