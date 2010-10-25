var App = new (function(){
	this.create_list = function(attr){
		var list = new List();
		if(attr)
			list.load(attr);
			
		current_list_ui = new ListUI({
			list: list,
			container:$('.list_container')
		});

		ListIO.watch_list(list);
		
		App.current_list = list;
	}
})();
