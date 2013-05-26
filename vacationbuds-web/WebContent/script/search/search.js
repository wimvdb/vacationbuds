var ads;
var row = 0;
var images = {};
var TABLE = {};
// var userid;
var currentId = 0;
$(document)
		.ready(
				function() {			
					$("body").on({
						ajaxStart : function() {
							$('#image-drop-zone').addClass("loading");
						},
						ajaxStop : function() {
							$('#image-drop-zone').removeClass("loading");
						}
					});
					if (!$.browser.opera) {
						$('#prev').hover(function() {
							movePrevLeft();
						}, function() {
							prevLoop = false;
						});

						$('#next').hover(function() {
							moveNextRight();
						}, function() {
							nextLoop = false;
						});
					}

					$('#next').click(
							function() {
								if ($('.images').length > 2) {
									var current = $('.images:not(".hidden")');
									var next = current.next().length ? current
											.next() : $(current.siblings().get(
											1));
									current.addClass('hidden');
									next.removeClass('hidden');
								}
							});
					$('#prev')
							.click(
									function() {
										if ($('.images').length > 2) {
											var current = $('.images:not(".hidden")');
											var prev = !(current.prev().attr(
													'id') == 'new-image') ? current
													.prev()
													: current.siblings().last();
											current.addClass('hidden');
											prev.removeClass('hidden');
										}
									});

				});
// userid = getURLParam('userid');

function positionLightboxImage() {
	var top = ($(window).height() - $('#lightbox').height()) / 2;
	var left = ($(window).width() - $('#lightbox').width()) / 2;
	$('#lightbox').css({
		'top' : top ,
		'left' : left
	}).fadeIn();
}

function removeLightbox() {
	$('#overlay, #lightbox').fadeOut('slow', function() {
		//$('body').css('overflow-y', 'auto'); // show scrollbars!
	});
}

function search() {

	$('#found-ads').children().remove();

	// $('#results tbody tr').remove();
	var searchCriteria = {
		'type' : $('#search-type').val(),
		'destination' : $('#search-destination').val(),
		'sex' : $('#search-sex').val(),
		'age' : $('#search-age').val()
	};

	$
			.ajax({
				url : "../security/getAdsBySearchCriteria.php",
				type : 'POST',
				data : {
					'searchCriteria' : JSON.stringify(searchCriteria)
				}
			})
			.done(
					function(data) {
						ads = JSON.parse(data);
						if (ads.length > 0) {
							for ( var i = 0; i < ads.length; i++) {
								var adTemplate = $('#found-ad-template')
										.clone();
								adTemplate.attr('id', null).removeClass(
										'hidden');
								var username = $('<a href="../profile/profile.php?profileid='
										+ ads[i].user.id
										+ '">'
										+ ads[i].user.username + '</a>');
								adTemplate.find('.name').append(username);
								adTemplate.find('.title').text(ads[i].title);
								adTemplate.find('.from').text(
										ads[i].user.country);
								if (ads[i].adtype == 'V') {
									adTemplate.find('.vacation').fadeIn(500);
									adTemplate.find('.hosting').hide();
									adTemplate.find('.destination')
											.text(
													ads[i].country + ', '
															+ ads[i].city);
									adTemplate.find('.dateOfDeparture').text(
											ads[i].departure);
									adTemplate.find('.duration').text(
											ads[i].duration);
								} else {
									adTemplate.find('.hosting').fadeIn(500);
									adTemplate.find('.vacation').hide();
									adTemplate.find('.location')
											.text(
													ads[i].country + ', '
															+ ads[i].city);
								}
								adTemplate.find('.content-div').text(
										ads[i].text);
								var img = adTemplate.find('.user-image');
								$(img).attr('title', ads[i].user.description);
								if (ads[i].user.avatar == '') {
									if (ads[i].user.gender == 'M') {
										$(img)
												.attr('src',
														"../images/derp.jpg");
									} else {
										$(img).attr('src',
												"../images/derpina.jpg");
									}
								} else {
									$(img).attr('src', ads[i].user.avatar);
								}
								$('#found-ads').append(adTemplate);
								adTemplate.find('a.lightbox').attr('id',
										'adlink' + i);
							}

							paginate('#found-ads', 4);

							$('a.lightbox').click(
									function(e) {
										resetAd();
										row = $(this)[0].id.substring(6);
										initViewAdPage(ads[row]);
										//$('body').css('overflow-y', 'hidden'); // hide
										// scrollbars!
										$('<div id="overlay"></div>')
												.css('opacity', '0').animate({
													'opacity' : '0.5'
												}, 'slow').appendTo('body');
										$('#ad').removeClass('hidden')
												.appendTo('#lightbox');

										$('.close').click(function() {
											removeLightbox();
										});

										positionLightboxImage();
										return false;
									});
						} else {
							$('#results').removeClass('hidden');
							$('#noResults').removeClass('hidden');
							$('.table-wrapper').addClass('hidden');
						}
					});

}

function resetAd() {
	$('#title').text('');
	$('.ad-text div div div').text('');
	$('.images:not("#new-image")').remove();
}

function initViewAdPage(ad) {

	var username = $('<a id="profile-link" href="../profile/profile.php?profileid='
			+ ad.user.id + '">' + ad.user.username + '</a>');
	$('#profile-link').remove();
	$('#title').text(ad.title);
	$('#name').append(username);
	$('#age').text(calcAge(ad.user.birthday));
	$('#from').text(ad.user.country);
	if (ad.adtype == 'V') {
		$('#vacation').fadeIn(500);
		$('#hosting').hide();
		$('#destination').text(ad.country + ', ' + ad.city);
		$('#dateOfDeparture').text(ad.departure);
		$('#duration').text(ad.duration);
		if (ad.expenses == 50) {
			$('#vacation-expenses').text('I will pay my fair share');
		} else if (ad.expenses == 100) {
			$('#vacation-expenses').text('I will pay for everything');
		} else {
			$('#vacation-expenses').text('My company is payment enough :-)');
		}

	} else {
		$('#vacation').hide();
		$('#hosting').fadeIn(500);
		$('#location').text(ad.country + ', ' + ad.city);
		if (ad.expenses == 100) {
			$('#hosting-expenses').text("We 'll work something out");
		} else {
			$('#hosting-expenses').text("Your money is no good here!");
		}
	}
	$('#placeOn').text(ad.placeOn);
	$('#expireOn').text(ad.expireOn);
	$('#description-div').text(ad.text);
	initAdImages(ad);

}

function initAdImages(ad) {

	if (!images[row.valueOf()]) {
		$.ajax({
			url : "../security/getAdImages.php",
			type : 'POST',
			data : {
				'adid' : ad.id
			}
		}).done(function(data) {
			var adImages = JSON.parse(data);
			if (!adImages.length && adImages.length != 0) {
				adImages = JSON.parse(adImages);
			}
			images[row] = adImages;
			initAdImages2(adImages);
			initProfileImage(ad);
		});

	} else {
		initAdImages2(images[row.valueOf()]);
		initProfileImage(ad);
	}

}

function initAdImages2(adImages) {
	for ( var i = 0; i < adImages.length; i++) {
		var img = $('#new-image').clone();
		$(img).removeClass('hidden');
		$(img).attr('id', adImages[i].id);
		$(img).attr('src', adImages[i].image);
		$('img.images').addClass('hidden');
		$('#image-drop-zone').append(img);
		if ($('.arrow').hasClass('hidden')) {
			$('.arrow').removeClass('hidden');
		}
	}

}

function initProfileImage(ad) {
	var img = $('#new-image').clone();
	$(img).removeClass('hidden');
	$(img).attr('id', 'avatar');
	$(img).attr('title', ad.user.description);
	if (ad.user.avatar == '') {
		if (ad.user.gender == 'M') {
			$(img).attr('src', "../images/derp.jpg");
		} else {
			$(img).attr('src', "../images/derpina.jpg");
		}
	} else {
		$(img).attr('src', ad.user.avatar);
	}
	$('img.images').addClass('hidden');
	$('#image-drop-zone').append(img);
	if ($('.arrow').hasClass('hidden')) {
		$('.arrow').removeClass('hidden');
	}
}

var prevLoop = true;
var nextLoop = true;

function movePrevLeft() {
	if (!prevLoop) {
		prevLoop = true;
		return;
	}
	$('#prev').stop().animate({
		'padding-left' : 0,
		'padding-right' : 4
	}, 'fast', 'easeInOutExpo', movePrevRight);

}

function movePrevRight() {
	if (!prevLoop) {
		$('#prev').stop().animate({
			'padding-left' : 4,
			'padding-right' : 0
		}, 'slow', 'easeInOutExpo');
		prevLoop = true;
		return;
	}
	$('#prev').stop().animate({
		'padding-left' : 4,
		'padding-right' : 0
	}, 'slow', 'easeInOutExpo', movePrevLeft);

}

function moveNextLeft() {
	if (!nextLoop) {
		nextLoop = true;
		$('#next').stop().animate({
			'padding-left' : 0,
			'padding-right' : 4
		}, 'slow', 'easeInOutExpo');
		return;
	}
	$('#next').stop().animate({
		'padding-left' : 0,
		'padding-right' : 4
	}, 'slow', 'easeInOutExpo', moveNextRight);

}

function moveNextRight() {
	if (!nextLoop) {
		nextLoop = true;
		return;
	}
	$('#next').stop().animate({
		'padding-left' : 4,
		'padding-right' : 0
	}, 'fast', 'easeInOutExpo', moveNextLeft);

}

function paginate(divs, pageLength) {

	var numPages = Math.ceil($(divs).children().length / pageLength) - 1;

	$('#results').removeClass('hidden');
	$('.table-wrapper').removeClass('hidden');
	$('#noResults').addClass('hidden');
	var current = 0;

	var $nav = $('.table-wrapper').find('.wrapper-paging ul');
	var $back = $nav.find('li:first-child a');
	var $next = $nav.find('li:last-child a');

	$nav.find('a.paging-this strong').text(current + 1);
	$nav.find('a.paging-this span').text(numPages + 1);
	$back.addClass('paging-disabled').click(function() {
		pagination('<');
	});
	$next.click(function() {
		pagination('>');
	});

	pagination = function(direction) { // 4. Move previous and next

		if (direction == "<") { // previous
			if (current > 1) {
				(current -= 1);
			} else if (current == 1) {
				(current -= 1);
				$back.addClass("paging-disabled");
			}
		} else { // next
			if (current < numPages - 1) {
				current += 1;
			} else if (current == numPages - 1) {
				current += 1;
				$next.addClass("paging-disabled");
			}
		}
		reveal(current + 1);
	};

	var reveal = function(current) { // 5. Reveal the correct rows
		$back.removeClass('paging-disabled');
		$next.removeClass('paging-disabled');

		$(".found-ad").hide();
		$(".found-ad").filter(":not('#found-ad-template')").each(function(n) {
			if (n >= pageLength * (current - 1) && n < pageLength * current)
				$(this).show();
		});

		$nav.find('a.paging-this strong').text(current);
	};
	reveal(1);

}



function sendMessage() {
	window.location = "../messages/new-message.php?" + '&recipient='
			+ $('#name').text();
}

function addToFavorites() {
	$.ajax({
		url : "../security/addToFavorites.php",
		type : 'POST',
		data : {
			'ad' : JSON.stringify({
				'id' : ads[row].id
			})
		}
	});
}

function calcAge(dateString) {
	var today = new Date();
	var dateArray = dateString.split('-');
	var birthDate = new Date(Date.fromISO(dateArray[2] + '-' + dateArray[1]
			+ '-' + dateArray[0]));
	// var birthDate = new Date(Date.parse(dateArray[1] + '-' + dateArray[0] +
	// '-'
	// + dateArray[2]));
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}
