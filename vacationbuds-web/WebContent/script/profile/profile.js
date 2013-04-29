var counter = 0;
$(document).ready(function() {
	$('#menu-profile').click();
	var profileid = getURLParameter('profileid');
	if (profileid != 'null') {
		initProfileById(profileid);
	} else {
		initProfile();
	}

	$('body').scroll(function() {
		$(this).css('overflow', 'auto');
	});

	$('body').bind('mousewheel', function(event, delta) {
		$(this).css('overflow', 'auto');
	});

});

function initProfilePage(user) {

	$('#username-container').append('<div>' + user.username + '</div>');
	$('#age-container').append('<div>' + calcAge(user.birthday) + '</div>');
	$('#country-container').append('<div>' + user.country + '</div>');

	var description = $('#short-description-container');
	if (user.gender == 'M') {
		$(description).text(user.username + ' describes himself as : ');
	} else {
		$(description).text(user.username + ' describes herself as : ');
	}

	$('#short-description-container').append(
			'<pre class="marginTop">' + user.description + '</pre>');

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
	}).done(function(data) {
		
		var images = JSON.parse(data);
		var right = 0;
		var left = 0;
		var move = '320px';
		for ( var i = 0; i < images.length; i++) {

			var img1 = new Image();
			
			img1.onload = function() {
				var height = $(this)[0].height / 5;
				var width = $(this)[0].width / 5;

				if(height < 100){
					width = width * 100/height;
					height = 100;
				}
				
				
				var css = {};
				var rotation = 10;// Math.floor((Math.random()*11));
				if (counter != 0 && counter != 1) {
					$.extend(css, {
						'margin-top' : '-40px'
					});
				}
				if (right > left) {

					if (right % 2 == 1) {
						rotation *= -1;
					}
				} else {
					if (left % 2 == 1) {
						rotation *= -1;
					}
				}
				$.extend(css, {
					'-moz-transform' : 'rotate(' + rotation + 'deg)',
					'-o-transform' : 'rotate(' + rotation + 'deg)',
					'-webkit-transform' : 'rotate(' + rotation + 'deg)',
					'-transform' : 'rotate(' + rotation + 'deg)',
					'position' : 'relative',
					'z-index' : '10'

				});
				
				var photo = $('<img>').attr({
					'src' : $(this)[0].src,
					'height' : height,
					'width' : width,
					'title' : $(this)[0].title,
					'class' : 'image'

				}).css(css);
				if (counter % 2 == 0) {
					right++;
					$(photo).hover(function() {
						$('body').css('overflow', 'hidden');
						$(this).stop().animate({
							'height' : height * 5,
							'width' : width * 5,
							'right' : move
						}, 1000, 'easeInOutExpo');
					}, function() {

						$(this).stop().animate({
							'height' : height,
							'width' : width,
							'right' : '0px'
						}, 800, 'easeInOutExpo');
					});
					$(photo).appendTo('#photos-right');
				} else {
					left++;
					$(photo).hover(function() {
						$('body').css('overflow', 'hidden');
						$(this).stop().animate({
							'height' : height * 5,
							'width' : width * 5,
							'left' : '50px'
						}, 1000, 'easeInOutExpo');
					}, function() {

						$(this).stop().animate({
							'height' : height,
							'width' : width,
							'left' : '0px'
						}, 800, 'easeInOutExpo');
					});
					$(photo).appendTo('#photos-left');
				}
				counter++;

			};

			
			img1.src = images[i].image;
			img1.title = images[i].description;

		}
	});

}

function calcAge(dateString) {
	var today = new Date();
	var dateArray = dateString.split('-');
	var birthDate = new Date(Date.parse(dateArray[1] + '-' + dateArray[0] + '-'
			+ dateArray[2]));
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

