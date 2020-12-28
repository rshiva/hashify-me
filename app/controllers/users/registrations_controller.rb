class Users::RegistrationsController < Devise::RegistrationsController


  def after_sign_up_path_for(resource)
    current_user.add_role :admin
    root_path # Or :prefix_to_your_route
  end


  def sign_up_params
    params.require(:user).permit( :email, :password,:password_confirmation, 
      account_attributes:[:name])
  end

  # def account_update_params
  #   params.require(:user).permit(:email,:password, :password_confirmation, :current_password,
  #     account_attributes: [:id,:name])
  # end


end