class Menbers < ActiveRecord::Migration[5.0]
 def change
 create_table :menbers do |t|
 t.references :user, null: false, foreign_key: true
 t.references :group, null: false, foreign_key: true
 t.timestamps
 end
 end
end