var IO = {
	helpers:{
		item_path: function(item){
			return '/lists/' + item.list.id + '/items' + (item.is_new_record() ? '' : '/' + item.id);
		}
	}
}


var ListIO = {
	watch_list: function(list){
		list.item_created.observe(this.watch_item, this);
		for(var i=list.items.length-1; i>=0; --i){
			this.watch_item(list.items[i]);
		}
	},
	
	watch_item: function(item){
		var me = this;
		item.changed.observe(function(){
			me.save_item(item);
		});
		item.deleted.observe(function(){
			me.delete_item(item);
		});
	},
	
	delete_item: function(item){
		var request_opts = this.ajax_request_options(item, 'delete');
		
		$.ajax(request_opts);		
	},
	
	save_item: function(item){
		var request_opts = this.ajax_request_options(item);

		$.ajax(request_opts);		
	},
	
	ajax_request_options: function(item, method){
		return {
			url: IO.helpers.item_path(item),
			contentType: 'application/json',
			type: method || (item.is_new_record() ? 'POST' : 'PUT'),
			data: JSON.stringify({item:item.to_json()}),
			dataType: 'json'
		};
	}
}
