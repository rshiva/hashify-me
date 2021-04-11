class Users::InvitationsController < Devise::InvitationsController

  private
  def invite_params
    params.require(:user).permit(:email, :account_id) #overriding params
  end
end