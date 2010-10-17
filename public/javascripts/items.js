function Item(list){
	this.list = list;
	DefineEvents(this, 'item_changed','item_deleted');
	
	this.set('title', 'New Item ' + Math.random());
}


$.extend(Item.prototype, {
});


function ItemUI(opts){
	this.item = opts.item;
	this.element = $('<input type="text"/>');
	this.element.val(this.item.title);
	opts.container.append(this.element);
}
