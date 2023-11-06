class CreateTimetables < ActiveRecord::Migration[6.1]
  def change
    create_table :timetables, id: false, primary_key: :client_hash_id do |t|
      t.string :coach_hash_id
      t.string :client_hash_id
      t.datetime :start
      t.integer :duration

      t.timestamps
    end

    add_index :timetables, :coach_hash_id
  end
end
