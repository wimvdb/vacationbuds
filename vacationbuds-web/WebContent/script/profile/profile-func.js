function showAvatar() {
	$('#avatar').removeClass('hidden');
	$('#avatar-postit').addClass('hidden');

	$('#avatar').draggable({
		revert : 'invalid',
		appendTo : 'body',
		containment : '#drag-area',
		scroll : false,
		start : function() {
			$('body').css('overflow', 'hidden');
		},
		stop : function() {
			$('body').css('overflow', 'auto');
		}
	});
}

function getURLParameter(name) {
	return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [
			, null ])[1]);
}

function initProfile(id) {
	var user;
	$
			.ajax({
				url : 'http://localhost:8080/vacationbuds-webservice/rest/dao/getUserById/'
						+ id,
				type : "GET",
				success : function(user) {
					if (!user.id) {
						user = JSON.parse(user);
					}
					initProfilePage(user);
				},
				error : function(data) {
					alert(data);
				}
			});
}

function addPicture() {
	var dropzone;
	if ($('.image-drop-zone-right-parent').size() > $('.image-drop-zone-left-parent').size()) {
		dropzone = $($('.image-drop-zone-left-parent').get(0)).clone();
	} else {
		dropzone = $($('.image-drop-zone-right-parent').get(0)).clone();
	}
	dropzone.children(0).on('dragover', handleDragOver);
	dropzone.children(0).on('drop', handleImageSelect);
	var count = $('#pictures > div').size() - 1;

	var title_label = dropzone.children(1).find('div[data-for=#title]');
	title_label.attr('data-for', '#title' + count);
	dropzone.children(1).find('input').attr('id', 'title' + count);

	var description_label = dropzone.children(1).find(
			'div[data-for=#description]');
	description_label.attr('data-for', '#description' + count);
	dropzone.children(1).find('textarea').attr('id', 'description' + count);

	$('#pictures').append(dropzone.show());

	markForInlineEditing(dropzone.children(1).find('.editable-text'), false);
	return dropzone;

}
