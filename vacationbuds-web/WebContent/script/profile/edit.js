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
	$('div[data-for=#dateOfBirth]').text(user.birthday);
	$('div[data-for=#country]').text(user.country);
	$(':radio[value=' + user.gender + ']').get(0).checked = true;

	$('pre[data-for=#short-description]').text(user.description);

	markForInlineEditing($('.editable-text'), false);

	if (user.avatar != "" && user.avatar != null) {
		$('#avatar').get(0).src = user.avatar;
	} else {
		if (user.gender == 'M') {
			$('#avatar').get(0).src = "../images/derp.jpg";
		} else {
			$('#avatar').get(0).src = "../images/derpina.jpg";
		}
	}

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
		try {
			$('body').addClass("loading");
			var pictures = $.find('#pictures img.ui-draggable');
			for ( var i = 0; i < pictures.length; i++) {
				var pictureContainer = $(pictures[i]).parent().parent();
				var profileImage = {
					'id' : $(pictures[i]).attr('id').split('profile-image')[1],
					'description' : pictureContainer.find(
							'div[data-type=editable]').eq(0).text()
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
				// 'id' : userid,
				'email' : $('div[data-for="#email"]').text(),
				'birthday' : $('div[data-for="#dateOfBirth"]').text(),
				'country' : $('div[data-for="#country"]').text(),
				'gender' : $('input[name=gender]:radio:checked').val(),
				'description' : $('pre[data-for="#short-description"]').text(),
				'avatar' : $('#avatar').get(0).src
			});

			// post_to_url('../security/updateUser.php', {
			// 'user' : JSON.stringify(user)
			// }, 'post');

			$.ajax({
				url : "../security/updateUser.php",
				type : 'POST',
				data : {
					'user' : JSON.stringify(user)
				}
			}).done(function(data) {
				if (data.indexOf('../profile/profile') == 0) {
					window.location.href = data;
				} else {
					post_to_url('../error.php', {
						'data' : JSON.stringify(data)
					}, 'post');
				}
			}).complete(function() {
				$('body').removeClass("loading");
			});
		} catch (e) {
			$('body').removeClass("loading");
		}

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
	var dateOfBirth = $('div[data-for="#dateOfBirth"]');
	if ($.trim(dateOfBirth.text()) == '') {
		valid = false;
		dateOfBirth.siblings('div.error').show().text(
				'Date of birth is a required field!');
	} else if (validateDate(dateOfBirth.text())) {
		valid = false;
		dateOfBirth.siblings('div.error').show().text(
				'Format dd-MM-yyyy');
	}else {
		dateOfBirth.siblings('div.error').hide();
	}
	var gender = $('input[name=gender]:radio:checked');
	if (!gender.val()) {
		valid = false;
		$('input[name=gender]').siblings('div.error').show().text(
				'Sex is a required field!');
	} else {
		$('input[name=gender]').siblings('div.error').hide();
	}
	if (!valid) {
		$('#profile-link').click();
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

function validateDate(dateString) {
	try {
		var dateArray = dateString.split('-');
		return isNaN(new Date(Date.fromISO(dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0])));
	} catch (e) {
		return false;
	}

}
