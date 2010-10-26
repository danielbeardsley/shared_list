function Item(list, attr){
	this.list = list;
	if(attr) this.load_attributes(attr);
	DefineEvents(this, 'changed', 'deleted');
}

Item.prototype = new Record({fields:{
	'title': true
}});


$.extend(Item.prototype, {
	to_json: function(){
		var json = {};
		for(field in this.fields)
			json[field] = this[field];
		
		if(!this.is_new_record())
			json.id = this.id;
			
		return json;
	},
	
	destroy: function(){
		this.deleted.fire();
		this._clear_all_event_handlers();
		delete(this.fields);
	}
})

function ItemUI(opts){
	this.item = opts.item;
	this.item.deleted.observe(this.destroy, this);
	
	this.element = this.create_ui();
	
	if(opts.container)
		opts.container.append(this.element);
	else if(opts.after)
		opts.after.after(this.element);
	this.element.focus();
}

$.extend(ItemUI.prototype, {
	create_ui: function(){
		var el = $('<input type="text" class="item"/>');
		
		this.observe_element(el);
		
		el.val(this.item.title);
		return el;
	},
	
	destroy: function(){
		this.element.remove();
	},
	
	observe_element: function(el){
		var me = this;
		el.keydown(function(e){
			switch(e.which){
				case 13:
					me.item.list.create_item();
					e.preventDefault();
					break;
				case 8: case 46: //backspace and delete
					if(el.val() == ""){
						me.item.destroy();
						e.preventDefault();
					}
					return;
			}
		});
		
		el.focusout(function(e){
			me.item.set('title', el.val());
		});
	}
});
