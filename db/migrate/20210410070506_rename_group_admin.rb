class RenameGroupAdmin < ActiveRecord::Migration[6.0]
  def up
    rename_column :groups , :group_admin_id, :admin_id
  end

  def down
    rename_column :groups , :admin_id, :group_admin_id
  end
end
