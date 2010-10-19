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

