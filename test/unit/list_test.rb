require 'test_helper'

class ListTest < ActiveSupport::TestCase
	should have_many :items
	should have_readonly_attribute :created_at
	should have_readonly_attribute :url
	
	context "a List" do
		setup do
			Factory.create :list
		end
		#should validate_uniqueness_of :url
	end
	
	context "a new list" do
		setup do
			@list = List.create!
		end
		
		should "generate a random url" do
			assert_not_nil @list.url
			assert @list.url.length > 5
		end
	end
end
