function login() {
	var username = $('#username').val();
	var password = $('#password').val();
	$
			.ajax({
				url : 'http://localhost:8080/vacationbuds-webservice/rest/dao/login',
				contentType : 'application/json',
				data : {
					'username' : username,
					'password' : password
				},
				type : "POST",
				success : function(data) {

					window.location.href = "http://localhost:8080/vacationbuds-web/profile/profile.html";

				},
				error : function(data) {
					alert(data.statusText);
				}
			});
}
