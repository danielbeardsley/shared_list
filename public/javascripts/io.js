var IO = {
	processing:{
		add_http_method_header:function(method){
			return function(xhr){
				xhr.setRequestHeader("X-Http-Method-Override", method);
			}
		}		
	},
	
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

		if(!item.is_new_record())
			request_opts.beforeSend = IO.processing.add_http_method_header('DELETE');
		
		$.ajax(request_opts);		
	},
	
	save_item: function(item){
		var request_opts = this.ajax_request_options(item, 'put');

		if(!item.is_new_record()){
			request_opts.beforeSend = IO.processing.add_http_method_header('put');
		}
		
		$.ajax(request_opts);		
	},
	
	ajax_request_options: function(item){
		return {
			url: IO.helpers.item_path(item),
			contentType: 'application/json',
			type: 'POST',
			data: JSON.stringify({item:item.to_json()}),
			dataType: 'json'
		};
	}
}
