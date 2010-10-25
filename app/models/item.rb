class Item < ActiveRecord::Base
	belongs_to :list
	
	def to_hash
		self.attributes.slice('id', 'title')
	end
end
