class ListsController < ApplicationController
	def create
		@list = List.create
		redirect_to @list
	end
	
	def show
		@list = List.find(params[:id])
	end
end
