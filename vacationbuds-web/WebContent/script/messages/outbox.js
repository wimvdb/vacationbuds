var messages;
var row = 0;
var c = {};
// var userid;
$(document).ready(function() {
	// userid = getURLParam('userid');
	$('#messages').click();
	initOutbox();
	$('tbody tr').on('click', function() {
		if (row != $(this).index()) {
			resetMessage();
			row = $(this).index();
			initMessage(messages[row]);
		}
	});

	$('#outbox-list tbody tr').mouseover(function() {
		$(this).addClass('zebraHover');
	});
	$('#outbox-list tbody tr').mouseout(function() {
		$(this).removeClass('zebraHover');
	});

	$('body').on('dragover', function handleDragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
	});
	$('body').on('drop', function(evt) {
		return false;
	});

	$('.trash').droppable({
		activeClass : 'trash-highlight',
		hoverClass : 'highlight-accept',
		drop : function(event, ui) {
			puffRemoveMessage($(ui.draggable));

		}
	});

});

function initOutbox() {
	$
			.ajax({
				url : "../security/getOutboxMessages.php",
				type : 'POST'
			})
			.done(
					function(data) {
						messages = JSON.parse(data);
						if (!messages.length && messages.length != 0) {
							messages = JSON.parse(messages);
						}
						if (messages.length > 0) {
							for ( var i = 0; i < messages.length; i++) {

								var tr = $(
										'<tr title="Drag message to the bin to delete!"></tr>')
										.append(
												'<td>'
														+ messages[i].recipient.username
														+ '</td>').append(
												'<td>' + messages[i].title
														+ '</td>').append(
												'<td>' + messages[i].sendDate
														+ '</td>').append(
												'<td><a href="" onclick="clickRemoveMessage('
														+ i
														+ ')">Remove</a></td>');

								$('#outbox-list tbody').append(tr);
								tr
										.draggable({
											revert : 'invalid',
											appendTo : 'body',

											scroll : false,
											helper : "clone",
											start : function(event, ui) {
												if (!$('body').outerHeight() > $(
														window).height()) {
													$('body').css('overflow',
															'hidden');
												}
												c.tr = this;
												c.helper = ui.helper;
											},
											stop : function() {
												$('body').css('overflow',
														'auto');
											}
										});

							}
							initMessage(messages[0]);
						} else {
							var tr = $('<tr></tr>').append(
									'<td colspan="4"> No Messages!</td>');
							$('#outbox-list tbody').append(tr);
							$('#message').addClass('hidden');
							$('.trash').addClass('hidden');

						}
					});

}

function initMessage(message) {

	var username = $('<a id="profile-link" href="../profile/profile.php?profileid='
			+ message.recipient.id
			// + '&userid='
			// + userid
			+ '">' + message.recipient.username + '</a>');

	$('#recipient').append(username);
	$('#title').text(message.title);
	$('#message-body').text(message.text);

}

function resetMessage() {
	$('#recipient').text('');
	$('#title').text('');
	$('#message-body').text('');
}

function puffRemoveMessage(which) {

	var frame_count = 5, $trash, $puff;
	var position = $('#trashbin').position();
	// create container
	$trash = $('<div class="puff"></div>').css({
		height : 285,
		left : position.left,
		top : position.top,
		width : 320,
		position : 'absolute',
		overflow : 'hidden'
	}).appendTo('#drag-area');

	// add the animation image
	$puff = $('<img class="puff" src="../images/epuff.png"/>').css({
		width : 320,
		height : 1600
	}).data('count', frame_count).appendTo($trash);

	$(c.tr).hide();
	$(c.helper).remove();

	(function animate() {

		var count = $puff.data('count');

		if (count) {
			var top = frame_count - count;
			var height = $puff.height() / frame_count;
			$puff.css({
				"top" : -(top * height),
				'position' : 'absolute'
			});
			$trash.css({
				'height' : height
			});
			$puff.data("count", count - 1);
			setTimeout(animate, 75);
		} else {
			$puff.parent().remove();
		}
	})();
	removeMessage($(c.tr).index());

}

function clickRemoveMessage(row) {
	$($('tbody tr').get(row)).hide();
	removeMessage(row);
}

function removeMessage(row) {
	$.ajax({
		url : "../security/deleteOutboxMessage.php",
		type : 'POST',
		data : {
			'message' : JSON.stringify({
				'id' : messages[row].id
			})
		}
	});

	if ($('#outbox-list tbody tr:visible').length > 0) {
		$('#outbox-list tbody tr:visible').first().click();
	} else {
		var tr = $('<tr></tr>').append('<td colspan="4"> No Messages!</td>');
		$('#outbox-list tbody').append(tr);
		$('#message').addClass('hidden');
		$('.trash').addClass('hidden');
	}
}
