class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      t.references :user_id, null: false, foregin_key: true,
      t.references :group, null: false, foregin_key: true,
      t.timestamps
    end
  end
end
