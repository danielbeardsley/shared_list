$("#content").keypress(function(e) {
		if (e.which == 13) {
				e.preventDefault(); // I think this is the keyword you look for?
		}
});

function List(){
	
}

function Item(){
	
}

(function(){
	var Record = {
		set: function(key, value){
			if(!is_field(key))
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
	
	JQuery.extend(Item.prototype, Record);
	Item.prototype.fields = {
		'title':true
	};
	
	JQuery.extend(List.prototype, Record);
	Item.prototype.fields = {
		'title':true
	};	
})();
