function showAvatar(){
	$('#avatar').removeClass('hidden');
	$('#avatar-postit').addClass('hidden');

	$('#avatar').draggable({
		revert : 'invalid',
		appendTo: 'body',
		containment : '#drag-area',
		scroll: false,
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
					initProfilePage(user);
				},
				error : function(data) {
					alert(data);
				}
			});
}