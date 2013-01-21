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

}

function saveOrUpdateUser() {
	$.extend(profile, {
		'text' : $('div[data-for="#long-description"]').text()
	});
	var pictures = $.find('#pictures img.ui-draggable');
	for ( var i = 0; i < pictures.length; i++) {
		var pictureContainer = $(pictures[i]).parent().parent();
		profile.images.push({
			'@type' : 'com.vacationbuds.model.ProfileImage',
			'title' : pictureContainer.find('div[data-type=editable]').eq(0)
					.text(),
			'text' : pictureContainer.find('div[data-type=editable]').eq(1)
					.text(),
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
		'profile' : profile
	});

	post_to_url('../security/updateUser.php?userid=' + userid, {
		'user' : JSON.stringify(user)
	}, 'post');
}
