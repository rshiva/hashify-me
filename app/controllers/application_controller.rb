class ApplicationController < ActionController::Base

  skip_before_action :verify_authenticity_token


  def authenticate_admin
    logged_in? && current_user.has_role?(:admin)
  end

  def logged_in?
    !!current_user
  end
end
