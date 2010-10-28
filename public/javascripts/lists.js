function List(){
	DefineEvents(this, 'item_created','item_instantiated','item_deleted','item_removed');
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
	
	remove_item: function(item){
		var index = $.inArray(item, this.items);
		if(index >= 0)
			this.items.splice(index, 1);
		this.item_removed.fire(item);
	},
	
	instantiate_item: function(attr){
		var item = new Item(this, attr);
		item.deleted.observe(this.remove_item, this);
		this.items.push(item);
		this.item_instantiated.fire(item);
		return item;
	}	
});



function ListUI(opts){
	var item_uis = [], me = this;

	this.list = opts.list;
	this.container = opts.container;
	this.element = $('<div class="container"></div>');
	this.title_el = $('<div class="title">' + this.list.title + '</div>');
	this.items_el = $('<div class="items_container"></div>');
	this.element.append(this.title_el, this.items_el);
	this.container.append(this.element);
	
	this.create_item_ui = function(item){
		item_uis.push(new ItemUI({item:item, container:this.element}));
	};
	
	this.remove_item_ui = function(item){
		$.each(item_uis, function(index, item_ui){
			if(item_ui.item == item){
				item_uis.splice(index, 1);
			}
		});
	}
	
	this.create_all_items_uis = function(){
		$.each(this.list.items, function(index, item){
			me.create_item_ui(item);
		});
	}

	this.list.item_instantiated.observe(this.create_item_ui, this);
	this.list.item_removed.observe(this.remove_item_ui, this);	
	
	if(this.list.items && this.list.items.length > 0) this.create_all_items_uis();
}



