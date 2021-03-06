class List < ActiveRecord::Base
	has_many :items
	
	attr_readonly :created_at, :url
	
	validates_uniqueness_of :url, :on => :create
	
	before_validation :set_url, :on => :create
	
	def set_url
		self.url ||= (0...10).map{65.+(rand(25)).chr}.join
	end
	
	def to_hash(recursive = false)
		attr = self.attributes.slice('title', 'id', 'url')
		attr[:items] = self.items.map(&:to_hash) if recursive
		attr
	end
end
