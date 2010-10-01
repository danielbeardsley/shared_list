class CreateItems < ActiveRecord::Migration
	def self.up
		create_table :items do |t|
			t.integer :list_id
			t.string :title
			t.datetime :completed_on
		end
	end

	def self.down
		drop_table :items
	end
end
