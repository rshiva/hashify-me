class GroupsController < ApplicationController
  before_action :authenticate_admin

  def index
    @groups = Group.where(group_admin_id: current_user)
  end

  def create
    @group = Group.new(group_params.merge!(group_admin_id: current_user.id))
    respond_to do |format|
      if @group.save
        format.html { redirect_to @group }
      else
        format.html { redirect_to groups_path }
      end
    end
  end

  def new
    @group = Group.new
  end

  def show
    @group =  Group.find(params[:id])
    @users = @group.users
  end

  def user
    #add user to group
    @user = User.find_by(email: params[:email])
    @group = Group.find(params[:id])
    respond_to do |format|
      if @user && current_user.account_id == @user.account_id
        @user.groups << @group
        format.html { redirect_to @group, notice: "User added successfully" }
      else
        format.html { redirect_to @group, notice: "Emails not found" }
      end
    end
  end

  def remove_user
    @user = User.find(params[:user_id])
    @membership = @user.memberships.where(group_id: params[:id]).last
    respond_to do |format|
      if @membership
        @membership.destroy
        format.html { redirect_to groups_path, notice: "User removed from group successfully" }
      else
        format.html { redirect_to @group, notice: "User not found" }
      end
    end

    

  end


  private
  def group_params
    params.require(:group).permit(:name, :group_admin_id)
  end
end
