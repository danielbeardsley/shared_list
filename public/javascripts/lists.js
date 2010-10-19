function List(){
	DefineEvents(this, 'item_created','list_created','item_deleted');
	this.items = [];
}

List.prototype = new Record({fields:{
	'title': true
}});

$.extend(List.prototype, {
	load: function(json){
		
	},
	
	to_json: function(){
		var json = {};
		for(field in this.fields)
			json[field] = this[field];

		json.items = [];
		$.each(this.items, function(index, item){
			json.items.push(item.to_json());
		});
		
		return json;
	},
	
	create_item: function(){
		var new_item = new Item(this);
		this.items.push(new_item);
		this.item_created.fire(new_item);
	}
});



function ListUI(opts){
	var item_uis = [];

	this.list = opts.list;
	this.container = opts.container;
	this.element = $('<div><div class="title">' + this.list.title + '</div></div>');
	this.container.append(this.element);
	
	this.list.item_created.observe(function(new_item){
		console.log('item created!! ' + new Date());
		new_item.changed.observe(function(){
				console.log('item changed to:' + this.title);
		});
		var item_ui = new ItemUI({item:new_item, container:this.element})
		item_uis.push(item_ui);
	}, this);
}

