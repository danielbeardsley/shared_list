function Item(list){
	this.list = list;
	DefineEvents(this, 'item_changed','item_deleted');
}


$.extend(Item.prototype, {
	load: function(){
		
	}
});

