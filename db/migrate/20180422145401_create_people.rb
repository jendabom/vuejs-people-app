class CreatePeople < ActiveRecord::Migration[5.1]
  def change
    create_table :people do |t|
      t.string :name
      t.string :bio
      t.boolean :bioAvail

      t.timestamps
    end
  end
end
