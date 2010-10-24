class ListsController < ApplicationController
	def create
		@list = List.create
		redirect_to @list
	end
	
	def show
		@list = List.find(params[:id])
	end
	
	def update
		puts request.body
		@list = List.find(params[:id])
		puts params.inspect
		flash[:notice] = params.inspect
		if !(new_item = params[:new_item]).blank?
			@list.items.create(:title => new_item)
		end
		
		render :json => {:success => true, :message => "List saved successfully"}, :status => 200
	end
end
