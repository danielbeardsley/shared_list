var IO = {
	save:function(list){
		$.ajax({
			url: window.location.pathname,
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(list.to_json()),
			dataType: 'json',
			beforeSend: function(xhr){xhr.setRequestHeader("X-Http-Method-Override","put");}
		});
	}
}
