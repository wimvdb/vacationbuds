$(document).ready(function() {
	
	markForInlineEditing($('.editable-text'), true);
	addPicture();
	
	$('input,textarea').focus(function(){
		$(this).css('border','none');
	});
		
	
});

function saveOrUpdateUser() {

	var pictures = $.find('#pictures img.ui-draggable');
	for ( var i = 0; i < pictures.length; i++) {
		var pictureContainer = $(pictures[i]).parent().parent();
		var profileImage = {
			'id' : $(pictures[i]).attr('id').split('profile-image')[1],
			'description' : pictureContainer.find('div[data-type=editable]')
					.eq(0).text()
		};
		$.ajax({
			url : "../security/saveProfileImage.php",
			async : false,
			type : 'POST',
			data : {
				'profileImg' : JSON.stringify(profileImage)
			}
		});
	}

	$.extend(user, {
		'username' : $('div[data-for="#username"]').text(),
		'password' : $('div[data-for="#password"]').text(),
		'email' : $('div[data-for="#email"]').text(),
		'age' : $('div[data-for="#age"]').text(),
		'country' : $('div[data-for="#country"]').text(),
		'gender' : $('input[name=gender]:radio:checked').val(),
		'description' : $('div[data-for="#short-description"]').text()
	});

	post_to_url('../security/createUser.php', {
		'user' : JSON.stringify(user)
	}, 'post');
}
