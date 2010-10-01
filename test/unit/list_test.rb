require 'test_helper'

class ListTest < ActiveSupport::TestCase
	should have_readonly_attribute :created_at
	
	context "a List" do
		setup do
			Factory.create :list
		end
		should validate_uniqueness_of :url
	end
end
