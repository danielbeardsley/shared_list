// ========== CustomEvents ===========
var CustomEvent = function(default_context)
{
	this._observers = [];
	this._default_context = default_context;
}

$.extend(CustomEvent.prototype, {
	observe:function(observer, context)
	{
		var observer_info = 
		{
			func: observer,
			context: context || this._default_context,
			stop: this._stop_observing_this,
			event: this
		};
		this._observers.push(observer_info);
		return observer_info;
	},
	
	_stop_observing_this: function(){
		this.event.stop_observing(this);
	},
	
	stop_observing:function(observer_info)
	{
		this._observers = $.grep(this._observers, function(value) {
				return value != observer_info;
		});		
		observer_info.func = null;
	},
	
	clear_observers:function(){
		this._observers.length = 0;
	},
	
	fire:function(event_info)
	{
		var frozen_list = this._observers;
		for (var i = 0, l = frozen_list.length; i < l; ++i) {
			var observer_info = frozen_list[i];
			if(observer_info && observer_info.func)
				observer_info.func.apply(observer_info.context, [event_info, observer_info]);
		}
	}
});

var DefineEvents = function(){
	var args = [];
	for (var i=0, len=arguments.length; i < len; i++) {
		args.push(arguments[i]);
	}
	
	var event_host = args.shift();
	
	event_host._event_list = event_host._event_list || [];
		
	var events = args[0].constructor == Array ? args[0] : args;
	for (var i = events.length - 1; i >= 0; --i) {
		var event = new CustomEvent(event_host);
		event_host[events[i]] = event;
		event_host._event_list.push(event);
	}
}
