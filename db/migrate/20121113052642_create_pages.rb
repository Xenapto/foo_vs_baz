class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.string :url, :limit => 1024
      t.integer :foo_count
      t.integer :baz_count

      t.timestamps
    end
  end
end
