function testService() {
	var webMethod = "http://localhost:8080/vacationbuds-webservice/services/ServiceImpl/test";

	/*$.post(webMethod, function(data) {
		alert(data);
	}).error(function(e) {
		alert("error : " + e.responseText);
	});*/

	$.ajax({
	    type: "POST",
	    url: webMethod,
	    success: function(data){alert(data);},
	    error: function(errMsg) {
	        alert(errMsg.responseText);
	    }
	});
	
	
	
	/*$.ajax({
		type: "POST",
	    contentType: "application/json; charset=utf-8",
	    url: webMethod,
	    beforeSend : function(xhr) {

			xhr.setRequestHeader("SOAPAction", "");
		},
	    data: '{username: "wim",password :"w123"}',
		success : function(msg) {
			alert(msg.d);
		},
		error : function(e) {
			alert("error : "   +e.responseText);
		}
	});*/
}

function testService2() {
	var webMethod = "http://localhost:8080/vacationbuds-webservice/services/ServiceImpl/test";

	$.ajax({
		type : "GET",
		url : webMethod,

		success : function(msg) {
			alert(msg);
		},
		error : function(e) {
			alert("error : " + e.responseText);
		}
	});
}