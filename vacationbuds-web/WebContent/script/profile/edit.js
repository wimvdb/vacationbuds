//var userid = getURLParameter('userid');

$(document).ready(function() {
	$('#menu-profile').click();
	initProfile();
	if ($('#avatar').src != '#') {
		showAvatar();
	}
	

});

function initProfilePage(user) {

	$('div[data-for=#email]').text(user.email);
	$('div[data-for=#age]').text(user.age);
	$('div[data-for=#country]').text(user.country);
	$(':radio[value=' + user.gender + ']').get(0).checked = true;

	$('pre[data-for=#short-description]').text(user.description);

	markForInlineEditing($('.editable-text'), false);

	$('#avatar').get(0).src = user.avatar;

	$.ajax({
		url : "../security/getProfileImages.php",
		type : 'POST',
		data : {
			'userid' : user.id
		}
	}).done(
			function(data) {
				var images = JSON.parse(data);

				for ( var i = 0; i < images.length; i++) {
					var dropzone;
					// if (i % 2 == 0) {
					dropzone = addPicture();
					// } else {
					// dropzone =
					// addPicture($('.image-drop-zone-right-parent').get(0).children(0));
					// }
					var img = $(dropzone.find('img').get(0));
					img.attr({
						'src' : images[i].image,
						'id' : 'profile-image' + images[i].id
					}).removeClass('hidden');
					dropzone.find('div[data-type=editable]').eq(0).text(
							images[i].description);
					$(dropzone.find('.postit').get(0)).addClass('hidden');
					img.draggable({
						revert : 'invalid',
						sroll : false
					});

				}

				addPicture();
			});

}

function saveOrUpdateUser() {

	if (validateInput()) {
		var pictures = $.find('#pictures img.ui-draggable');
		for ( var i = 0; i < pictures.length; i++) {
			var pictureContainer = $(pictures[i]).parent().parent();
			var profileImage = {
				'id' : $(pictures[i]).attr('id').split('profile-image')[1],
				'description' : pictureContainer
						.find('div[data-type=editable]').eq(0).text()
			};
			$.ajax({
				url : "../security/saveProfileImage.php",
				type : 'POST',
				data : {
					'profileImg' : JSON.stringify(profileImage)
				}
			});
		}

		$.extend(user, {
			//'id' : userid,
			'email' : $('div[data-for="#email"]').text(),
			'age' : $('div[data-for="#age"]').text(),
			'country' : $('div[data-for="#country"]').text(),
			'gender' : $('input[name=gender]:radio:checked').val(),
			'description' : $('pre[data-for="#short-description"]').text(),
			'avatar' : $('#avatar').get(0).src
		});

		post_to_url('../security/updateUser.php', {
			'user' : JSON.stringify(user)
		}, 'post');
	}
}

function validateInput() {
	var valid = true;
	var email = $('div[data-for="#email"]');
	if ($.trim(email.text()) == '') {
		valid = false;
		email.siblings('div.error').show().text('Email is a required field!');
	} else if (!validateEmail(email.text())) {
		valid = false;
		email.siblings('div.error').show().text('Please enter a valid email!');
	} else {
		email.siblings('div.error').hide();
	}
	var age = $('div[data-for="#age"]');
	if ($.trim(age.text()) == '') {
		valid = false;
		age.siblings('div.error').show().text('Age is a required field!');
	} else {
		age.siblings('div.error').hide();
	}
	var gender = $('input[name=gender]:radio:checked');
	if (!gender.val()) {
		valid = false;
		$('input[name=gender]').siblings('div.error').show().text(
				'Sex is a required field!');
	} else {
		$('input[name=gender]').siblings('div.error').hide();
	}
	return valid;
}

function validateEmail(email) {

	var atpos = email.indexOf("@");
	var dotpos = email.lastIndexOf(".");
	if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
		return false;
	}
	return true;
}

