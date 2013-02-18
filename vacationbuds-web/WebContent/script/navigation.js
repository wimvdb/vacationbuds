$(document).ready(function() {
	$('#navigation ul > li ul').click(function(event) {
		event.stopPropagation();
	}).filter(':not(:first)').hide();

	$('#navigation ul > li').click(function() {
		var selfClick = $(this).find('ul:first').is(':visible');
		if (!selfClick) {
			$(this).parent().find('> li ul:visible').slideToggle();
		}

		$(this).find('ul:first').stop(true, true).slideToggle();
	});
	
	var userid = getURLParam('userid');
	var links = $('#navigation a:not("#view-profile")');
	for(var i= 0; i< links.length; i++){
		links.get(i).href=links.get(i).href + '?userid='+userid;
	}
	$('#view-profile').get(0).href=$('#view-profile').get(0).href + '?userid='+userid +'&profileid='+userid;

	
});

function getURLParam(name) {
	return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [
			, null ])[1]);
}


