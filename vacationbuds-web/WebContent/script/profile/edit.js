var userid = getURLParameter('userid');

$(document).ready(function() {
	$('#menu-profile').click();
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


	markForInlineEditing($('.editable-text'), false);

	$('#avatar').get(0).src = user.avatar;

	var response = $.ajax({
		url: "../security/getProfileImages.php",
		async: false,
		type : 'POST',
		data : {'userid' : user.id}
		}).responseText;
	var images = JSON.parse(response);

	for ( var i = 0; i < images.length; i++) {
		var dropzone;
		//if (i % 2 == 0) {
			dropzone = addPicture();
		//} else {
		//	dropzone = addPicture($('.image-drop-zone-right-parent').get(0).children(0));
		//}
		var img =$(dropzone.find('img').get(0));
		img.attr({'src':images[i].image,'id':'profile-image'+images[i].id}).removeClass('hidden');
		dropzone.find('div[data-type=editable]').eq(0).text(images[i].description);
		$(dropzone.find('.postit').get(0)).addClass('hidden');
		img.draggable({
			revert : 'invalid',
			sroll : false
		});
		
	}
	
		addPicture();
	

}

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
		'id' : userid,
		'email' : $('div[data-for="#email"]').text(),
		'age' : $('div[data-for="#age"]').text(),
		'country' : $('div[data-for="#country"]').text(),
		'gender' : $('input[name=gender]:radio:checked').val(),
		'description' : $('div[data-for="#short-description"]').text(),
		'avatar' : $('#avatar').get(0).src
	});

	post_to_url('../security/updateUser.php?userid=' + userid, {
		'user' : JSON.stringify(user)
	}, 'post');
}
