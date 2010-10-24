var IO = {
	processing:{
		add_http_put_header:function(xhr){
			xhr.setRequestHeader("X-Http-Method-Override", 'put');
		}
	}
}

var ListIO = {
	watch_list: function(list){
		list.item_created.observe(this.watch_item);
	},
	
	watch_item: function(item){
		item.changed.observe(item.save);
	}
}

$.extend(Item.prototype,{
	save: function(){
		var request_opts = {
			url: window.location.pathname + '/items',
			contentType: 'application/json',
			type: 'POST',
			data: JSON.stringify({item:this.to_json()}),
			dataType: 'json'
		};
		
		if(this.is_new_record())
			request_opts.beforeSend = IO.processing.add_http_put_header;
		
		$.ajax(request_opts);		
	}
});
