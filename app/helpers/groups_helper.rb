module GroupsHelper

  def title_group(user)
    if user.has_role? :admin
      "Group list"
    else
      "You belong to these groups"
    end
  end
end
