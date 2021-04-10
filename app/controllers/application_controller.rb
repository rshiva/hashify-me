class ApplicationController < ActionController::Base

  skip_before_action :verify_authenticity_token


  def authenticate_admin
    unless logged_in? && current_user.has_role?(:admin)
      redirect_to root_url, notice: "Access denied"
    end
  end

  def logged_in?
    !!current_user
  end

  def authorize
   unless logged_in?
    redirect_to root_url, notice: "Please login"
   end
  end
end
