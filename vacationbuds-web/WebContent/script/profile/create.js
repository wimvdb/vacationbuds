$(document).ready(function() {
markForInlineEditing($('.editable-text'), true);
addPicture($('#image-drop-zone-left').children(0));
});


function saveOrUpdateUser() {

	
	var pictures = $.find('#pictures img.ui-draggable');
	for ( var i = 0; i < pictures.length; i++) {
		var pictureContainer = $(pictures[i]).parent().parent();
		profile.images.push({
			'@type' : 'com.vacationbuds.model.ProfileImage',
			'description' : pictureContainer.find('div[data-type=editable]').eq(0)
					.text(),
			'image' : pictures[i].src
		});
	}

	$.extend(user, {
		'username' : $('div[data-for="#username"]').text(),
		'password' : $('div[data-for="#password"]').text(),
		'email' : $('div[data-for="#email"]').text(),
		'age' : $('div[data-for="#age"]').text(),
		'country' : $('div[data-for="#country"]').text(),
		'gender' : $('input[name=gender]:radio:checked').val(),
		'description' : $('div[data-for="#short-description"]').text(),
		'profile' : profile
	});

	post_to_url('../security/createUser.php', {
		'user' : JSON.stringify(user)
	}, 'post');
}





