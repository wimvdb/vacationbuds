$(document).ready(function() {
markForInlineEditing($('.editable-text'), true);

});





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
		'username' : $('div[data-for="#username"]').text(),
		'password' : $('div[data-for="#password"]').text(),
		'email' : $('div[data-for="#email"]').text(),
		'age' : $('div[data-for="#age"]').text(),
		'country' : $('div[data-for="#country"]').text(),
		'gender' : $('input[name=gender]:radio:checked').val(),
		'description' : $('div[data-for="#short-description"]').text(),
		'profile' : profile
	});

	$
			.ajax({
				url : 'http://localhost:8080/vacationbuds-webservice/rest/dao/saveOrUpdateUser',
				contentType : 'application/json',
				// data : JSON.stringify(JSON.parse($("#json_text").val())),
				//data : user,
				data : JSON.stringify(user),
				type : "POST",
				success : function(data) {
					//login and redirecto to profile page.
					post_to_url('../security/checklogin.php', {
						'username' : user.username,
						'password' : user.password
					}, 'post');

				},
				error : function(data) {
					alert('error : ' + data.responseText);
					// $("#result").val(data.responseText);
				}
			});
}

