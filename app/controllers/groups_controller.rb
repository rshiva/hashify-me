class GroupsController < ApplicationController
  before_action :authenticate_admin, only: [:index, :show]

  def index
    @groups = Group.where(group_admin_id: current_user)
  end

  def create
    @group = Group.new(group_params)
    respond_to do |format|
      if @group.save
        format.html { redirect_to @group }
      else
        format.html { render :new, }
      end
    end
  end

  def new
    @group = Group.new
  end

  def show
    @group =  Group.find_by(group_admin_id: current_user)
    @users = @group.users
  end


  private
  def group_params
    params.require(:group).permit(:name)
  end
end
