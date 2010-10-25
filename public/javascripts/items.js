function Item(list){
	this.list = list;
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
	}
})

function ItemUI(opts){
	this.item = opts.item;
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
	
	observe_element: function(el){
		var me = this;
		el.keydown(function(e){
			switch(e.which){
				case 13:
					me.item.list.create_item();
				default:
					return;
			}
			e.preventDefault();
		});
		
		el.focusout(function(e){
			me.item.set('title', el.val());
		});
	}
});
