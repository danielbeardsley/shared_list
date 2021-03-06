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
	
	create_item: function(attr, opt){
		var new_item = this.instantiate_item(attr || {}, opt);
		this.item_created.fire(new_item);
	},
	
	remove_item: function(item){
		var index = $.inArray(item, this.items);
		if(index >= 0)
			this.items.splice(index, 1);
		this.item_removed.fire(item);
	},
	
	instantiate_item: function(attr, opt){
		var item = new Item(this, attr),
		    index;

		item.deleted.observe(this.remove_item, this);

		if(opt && opt.after)
			index = $.inArray(opt.after, this.items)+1;
		else if(opt && opt.before)
			index = $.inArray(opt.before, this.items);
		else
			index = this.items.length;
		
		this.items.splice(index, 0, item);
			
		this.item_instantiated.fire({item:item, before_item:this.items[index+1]});
		return item;
	},
	
	item_after: function(item){
		return this.items[$.inArray(item, this.items)+1];
	},
	
	item_before: function(item){
		return this.items[$.inArray(item, this.items)-1];
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
	
	this.create_item_ui = function(info){
		var index, attr = {
			item:info.item,
			list_ui:this
		};
		
		if(info.before_item){
			index = this.index_of_ui_for_item(info.before_item);
			attr.before = item_uis[index];
		} else {
			index = item_uis.length;
			attr.container = this.items_el;
		}
		item_uis.splice(index, 0, new ItemUI(attr));
	};
	
	this.remove_item_ui = function(item){
		var index = this.index_of_ui_for_item(item);
		if(index !== false) item_uis.splice(index, 1);
	}
	
	this.create_all_items_uis = function(){
		$.each(this.list.items, function(index, item){
			me.create_item_ui({item:item});
		});
	}
	
	this.index_of_ui_for_item = function(item){
		for(var i=item_uis.length-1; i>=0; i--){
			if(item_uis[i].item == item) return i
		}
		return null;
	}
	
	this.item_ui_after = function(item){
		return item_uis[$.inArray(item, item_uis)+1];
	}
	
	this.item_ui_before = function(item){
		return item_uis[$.inArray(item, item_uis)-1];
	}

	this.list.item_instantiated.observe(this.create_item_ui, this);
	this.list.item_removed.observe(this.remove_item_ui, this);	
	
	if(this.list.items && this.list.items.length > 0) this.create_all_items_uis();
}



