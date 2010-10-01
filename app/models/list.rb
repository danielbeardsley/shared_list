class List < ActiveRecord::Base
	has_many :items
	
	attr_readonly :created_at
	
	validates_uniqueness_of :url
end
