$.extend(List.prototype, {
	load: function(json){
		var list = this;
		list.load_attributes(json);
		
		if(json.items){
			$.each(json.items, function(index, item){
				list.instantiate_item(item)
			});
		}
	}
});

