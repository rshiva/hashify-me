class CreateGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :groups do |t|
      t.string :name, null: false
      t.integer :group_admin_id, null: false

      t.timestamps
    end

  end
end
