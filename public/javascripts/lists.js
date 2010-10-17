$("#content").keypress(function(e) {
		if (e.which == 13) {
				e.preventDefault(); // I think this is the keyword you look for?
		}
});

function List(element){
	this.element = element
	DefineEvents(this, 'item_created','list_created','item_deleted');
}

$.extend(List.prototype, {
	load: function(json){
		
	},
	
	create_item: function(){
		
	}
});



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
