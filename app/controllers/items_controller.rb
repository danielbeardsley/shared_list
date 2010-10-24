class ItemsController < ApplicationController
	before_filter :load_records
	
	def create
		@item = @list.items.create(params['item'])
		
		render :json => {:success => !@item.nil?, :message => "Item Created", :data => @item.attributes}
	end
	
	def update
		@item.update_attributes(params[:item])
		render :json => {:success => true, :message => "Item updated", :data => @item.attributes}, :status => 200
	end
	
	private
	
	def load_records
		@list = List.find(params['list_id'])
		@item = @list.items.find(params['id']) if params['id']
	end
end
