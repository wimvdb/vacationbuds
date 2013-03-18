var recipient;
$(document).ready(function() {

	recipient = getURLParam('recipient');
	if (recipient != 'null') {
		$('div[data-for="#recipient"]').text(recipient);
	}
	$('#messages').click();
	markForInlineEditing($('.editable-text'), false);
	$('#recipient').autocomplete({
		source : function(req, add) {
			$.ajax({
				url : "../security/getUsernames.php",
				type : 'POST',
				data : {
					'prefix' : req.term
				},
				success : function(text) {
					add(JSON.parse(text));
				}
			});
		}
	});

});

function sendMessage() {
	var valid = true;
	var recipient = $('div[data-for="#recipient"]');
	if ($.trim(recipient.text()) == '') {
		valid = false;
		recipient.siblings('div.error').show().text(
				'Recipient is a required field!');
	}
	if (valid) {
		var message = {
			'title' : $('div[data-for="#title"]').text(),
			'text' : $('pre[data-for="#message-body"]').text(),
			'recipient' : {
				username : $('div[data-for="#recipient"]').text()
			},
		};
		$.ajax({
			url : "../security/sendMessage.php",
			type : 'POST',
			data : {
				'message' : JSON.stringify(message)
			},
			success : function(text) {
				alert('Message sent succesfully!');
			}
		});
	}
}
