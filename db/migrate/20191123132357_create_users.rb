class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name, index: true, null: false, unique: true,
      t.string :mail, null: false,
      t.timestamps
    end
  end
end
