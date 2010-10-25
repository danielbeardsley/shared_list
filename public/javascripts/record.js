function Record(opt){
	if(opt.fields)
		this.fields = opt.fields;
		
	this.set = function(key, value){
		if(!this.is_field(key))
			throw(key + " is not a field");
			
		if(this[key] != value){
			this[key] = value;
			if(this.changed)
				this.changed.fire();
			this.dirty = true;
		}
	}
	
	this.is_field = function(key){
		return this.fields[key];
	}
	
	this.load_attributes = function(attr){
		for(var k in this.fields){
			this[k] = attr[k];
		}
		if(attr.id) this.id = attr.id;
	}
	
	this.is_new_record = function(){ return this.id && this.id > 0;}
}
