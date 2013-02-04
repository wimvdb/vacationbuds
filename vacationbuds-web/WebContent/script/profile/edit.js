var userid = getURLParameter('userid');

$(document).ready(function() {

	initProfile(userid);
	if ($('#avatar').src != '#') {
		showAvatar();
	}

});

function initProfilePage(user) {

	$('div[data-for=#email]').text(user.email);
	$('div[data-for=#age]').text(user.age);
	$('div[data-for=#country]').text(user.country);
	$(':radio[value=' + user.gender + ']').get(0).checked = true;

	$('div[data-for=#short-description]').text(user.description);
	$('div[data-for=#long-description]').text(user.profile.text);

	markForInlineEditing($('.editable-text'), false);

	$('#avatar').get(0).src = user.avatar;

	var images = user.profile.images;

	for ( var i = 0; i < images.length; i++) {
		var dropzone;
		if (i % 2 == 0) {
			dropzone = addPicture($('#image-drop-zone-left').children(0));
		} else {
			dropzone = addPicture($('#image-drop-zone-right').children(0));
		}
		var img =$(dropzone.find('img').get(0));
		img.attr({'src':images[i].image}).removeClass('hidden');
		dropzone.find('div[data-type=editable]').eq(0).text(images[i].description);
		$(dropzone.find('.postit').get(0)).addClass('hidden');
		img.draggable({
			revert : 'invalid',
			sroll : false
		});
		
	}
	if (images.length % 2 == 0) {
		dropzone = addPicture($('#image-drop-zone-left').children(0));
	} else {
		dropzone = addPicture($('#image-drop-zone-right').children(0));
	}

}

function saveOrUpdateUser() {

	
	var pictures = $.find('#pictures img.ui-draggable:not(".hidden")');
	for ( var i = 0; i < pictures.length; i++) {
		var pictureContainer = $(pictures[i]).parent().parent();
		profile.images.push({
			'description' : pictureContainer.find('div[data-type=editable]')
					.eq(0).text(),
			'image' : pictures[i].src
		});
	}
	$.extend(user, {
		'id' : userid,
		'email' : $('div[data-for="#email"]').text(),
		'age' : $('div[data-for="#age"]').text(),
		'country' : $('div[data-for="#country"]').text(),
		'gender' : $('input[name=gender]:radio:checked').val(),
		'description' : $('div[data-for="#short-description"]').text(),
		'avatar' : $('#avatar').get(0).src,
		'profile' : profile
	});

	post_to_url('../security/updateUser.php?userid=' + userid, {
		'user' : JSON.stringify(user)
	}, 'post');
}
