$(document).ready(function() {

	$('#messages').click();
	markForInlineEditing($('.editable-text'), false);
	$('#recipient').autocomplete({
		source : function(req, add) {
			$.ajax({
				url : "../security/getUsernames.php",
				async : true,
				type : 'POST',
				data : {
					'prefix' : req.term
				},
				success : function(text)
		         {
		             add(JSON.parse(text));
		         }
			});
		}
	});
	

});
// username
function sendMessage() {
	var message = {
		'title' : $('div[data-for="#title"]').text(),
		'text' : $('pre[data-for="#message-body"]').text(),
		'recipient' : {
			username : $('div[data-for="#recipient"]').text()
		},
	};
	$.ajax({
		url : "../security/sendMessage.php",
		async : true,
		type : 'POST',
		data : {
			'message' : JSON.stringify(message)
		},
		success : function(text)
        {
            alert('Message sent succesfully!');
        }
	});
}
