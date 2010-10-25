function List(){
	DefineEvents(this, 'item_created','item_instantiated','list_created','item_deleted');
	this.items = [];
}

List.prototype = new Record({fields:{
	'title': true
}});

$.extend(List.prototype, {
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
		var new_item = this.instantiate_item();
		this.item_created.fire(new_item);
	},
	
	instantiate_item: function(attr){
		var item = new Item(this, attr);
		this.items.push(item);
		this.item_instantiated.fire(item);
		return item;
	}	
});



function ListUI(opts){
	var item_uis = [], me = this;

	this.list = opts.list;
	this.container = opts.container;
	this.element = $('<div><div class="title">' + this.list.title + '</div></div>');
	this.container.append(this.element);
	
	this.create_item_ui = function(item){
		item.changed.observe(function(){
				console.log('item changed to:' + this.title);
		});

		item_uis.push(new ItemUI({item:item, container:this.element}));
	};
	
	this.create_all_items_uis = function(){
		$.each(this.list.items, function(index, item){
			me.create_item_ui(item);
		});
	}

	this.list.item_instantiated.observe(this.create_item_ui, this);
	
	if(this.list.items && this.list.items.length > 0) this.create_all_items_uis();
}



