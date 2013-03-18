$(document).ready(function() {

	markForInlineEditing($('.editable-text'), true);
	addPicture();

	$('input,textarea').focus(function() {
		$(this).css('border', 'none');
	});

});

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
			'username' : $('div[data-for="#username"]').text(),
			'password' : $('div[data-for="#password"]').text(),
			'email' : $('div[data-for="#email"]').text(),
			'age' : $('div[data-for="#age"]').text(),
			'country' : $('div[data-for="#country"]').text(),
			'gender' : $('input[name=gender]:radio:checked').val(),
			'description' : $('pre[data-for="#short-description"]').text()
		});

		$.ajax({
			url : "../security/createUser.php",
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
		});

	}
}

function validateInput() {
	var valid = true;
	var username = $('div[data-for="#username"]');
	var userNameTaken = validateUsername(username.text());
	if ($.trim(username.text()) == '') {
		valid = false;
		username.siblings('div.error').show().text(
				'Username is a required field!');
	} else if ($.trim(username.text()).length < 2) {
		valid = false;
		username.siblings('div.error').show().text(
				'Username needs to be at least 3 characters long!');
	} else if (userNameTaken =="true") {
		valid = false;
		username.siblings('div.error').show().text('Username taken!');
	} else {
		username.siblings('div.error').hide();
	}
	var password = $('div[data-for="#password"]');
	if ($.trim(password.text()) == '') {
		valid = false;
		password.siblings('div.error').show().text(
				'Password is a required field!');
	} else if ($.trim(password.text()).length < 2) {
		valid = false;
		password.siblings('div.error').show().text(
				'Password needs to be at least 3 characters long!');
	} else {
		password.siblings('div.error').hide();
	}
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

function validateUsername(username) {
	var userNameTaken = true;
	$.ajax({
		url : "../security/validateUsername.php",
		type : 'POST',
		async : false,
		data : {
			'username' : username
		}
	}).done(function(data) {
		userNameTaken = data;
	});
	return userNameTaken;
}

function validateEmail(email) {

	var atpos = email.indexOf("@");
	var dotpos = email.lastIndexOf(".");
	if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
		return false;
	}
	return true;
}
