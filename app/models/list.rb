class List < ActiveRecord::Base
	attr_readonly :created_at
	validates_uniqueness_of :url
end
