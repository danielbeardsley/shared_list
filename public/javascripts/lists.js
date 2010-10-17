$("#content").keypress(function(e) {
		if (e.which == 13) {
				e.preventDefault(); // I think this is the keyword you look for?
		}
});

function List(){
	DefineEvents(this, 'item_created','list_created','item_deleted');
	this.items = [];
}

$.extend(List.prototype, {
	load: function(json){
		
	},
	
	create_item: function(){
		var new_item = new Item(this);
		this.items.push(new_item);
		this.item_created.fire(new_item);
	}
});



function ListUI(opts){
	var me       = this,
	    item_uis = [];

	this.list = opts.list;
	this.container = opts.container;
	this.element = $('<div><div class="title">' + this.list.title + '</div></div>');
	this.container.append(this.element);
	
	this.list.item_created.observe(function(new_item){
		console.log('item created!! ' + new Date());
		var item_ui = new ItemUI({item:new_item, container:me.element})
		item_uis.push(item_ui);
	});
}



(function(){
	var Record = {
		set: function(key, value){
			if(!this.is_field(key))
				throw(key + " is not a field");
				
			if(this[key] != value){
				this[key] = value;
				this.dirty = true;
			}
		},
		
		clean: function(){
			this.dirty = false;
		},
		
		is_field: function(key){
			return this.fields[key];
		}
	};
	
	$.extend(Item.prototype, Record);
	Item.prototype.fields = {
		title:true
	};
	
	$.extend(List.prototype, Record);
	List.prototype.fields = {
		title:true
	};	
})();
