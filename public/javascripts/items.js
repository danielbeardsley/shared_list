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
		this.deleted.fire(this);
		this._clear_all_event_handlers();
		delete(this.fields);
	},
	
	next_item: function(){
		return this.list.item_after(this);
	}
})

function ItemUI(opts){
	this.item = opts.item;
	this.item.deleted.observe(this.destroy, this);
	this.item.changed.observe(this.on_item_changed, this);
	
	this.element = this.create_ui();
	
	if(opts.before)
		opts.before.element.before(this.element);
	else if(opts.container)
		opts.container.append(this.element);

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
					me.item.list.create_item({after:me.item});
					e.preventDefault();
					break;
				case 8:
					//me.do_backspace_action();
					break;
				case 46:
					if(me.do_delete_action()) e.preventDefault();
					break;
			}
		});
		
		el.focusout(function(e){
			me.item.set('title', $.trim(el.val()));
		});
	},
	
	do_delete_action: function(){
		var text = this.element.val();

		if(text.length == 0){
			this.item.destroy();
			return true;
		}
		
		var range = this.element.caret();
		if((range.end - range.start) == 0 && range.end == text.length){
			var next = this.item.next_item();
			if(next){
				var next_title = next.title;
				this.item.set("title", text + next_title);
				this.element.caret(text.length, text.length);
				next.destroy();
				return true;
			}
		}
	},
	
	on_item_changed: function(){
		this.element.val(this.item.title);
	}	
});
