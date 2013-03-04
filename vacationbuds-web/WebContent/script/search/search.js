var ads;
var row = 0;
var images = {};
var TABLE = {};
var userid;

$(document)
		.ready(
				function() {
					$("body").on({
					    ajaxStart: function() { 
					        $(this).addClass("loading"); 
					    },
					    ajaxStop: function() { 
					        $(this).removeClass("loading"); 
					    }    
					});

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
userid = getURLParam('userid');

function search() {

	$('#results tbody tr').remove();
	var searchCriteria = {
		'type' : $('#search-type').val(),
		'destination' : $('#search-destination').val(),
		'sex' : $('#search-sex').val(),
		'age' : $('#search-age').val()
	};

	$.ajax({
		url : "../security/getAdsBySearchCriteria.php",
		type : 'POST',
		data : {
			'searchCriteria' : JSON.stringify(searchCriteria)
		}
	}).done(function(data){
		ads = JSON.parse(data);
		if (ads.length > 0) {
			for ( var i = 0; i < ads.length; i++) {
				var tr = $('<tr></tr>').append(
						'<td>'
								+ ((ads[i].adtype == 'V') ? 'Vacation ad'
										: 'Hosting ad') + '</td>').append(
						'<td title="' + ads[i].user.description + '">'
								+ ads[i].user.username + '</td>')
						.append(
								'<td title="' + ads[i].text + '">' + ads[i].title
										+ '</td>').append(
								'<td>' + ads[i].country + ', ' + ads[i].city
										+ '</td>');

				$('#results tbody').append(tr);
			}

			initViewAdPage(ads[row]);
			$('#results tbody tr').on('click', function() {
				if (row != $(this).index()) {
					resetAd();
					row = $(this).index();
					initViewAdPage(ads[row]);
				}
			});

			// $('#ad-list tbody tr:even').addClass('zebra');
			$('#results tbody tr').mouseover(function() {
				$(this).addClass('zebraHover');
			});
			$('#results tbody tr').mouseout(function() {
				$(this).removeClass('zebraHover');
			});
			$('#ad').removeClass('hidden');

			$(".wrapper-paging").show();
			TABLE.paginate('#results', 5);

		} else {
			var tr = $('<tr></tr>').append(
					'<td colspan="4"> No results found!</td>');

			$('#results tbody').append(tr);
			$('#ad').addClass('hidden');
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
			+ ad.user.id
			+ '&userid='
			+ userid
			+ '">'
			+ ad.user.username
			+ '</a>');
	$('#profile-link').remove();
	$('#title').text(ad.title);
	$('#name').append(username);
	$('#age').text(ad.user.age);
	$('#from').text(ad.user.country);
	if (ad.adtype == 'V') {
		$('#vacation').fadeIn(500);
		$('#hosting').hide();
		$('#destination').text(ad.country + ', ' + ad.city);
		$('#dateOfDeparture').text(ad.departure);
		$('#duration').text(ad.duration);
		if (ad.expenses == 50) {
			$('#vacation-expenses').text('I will pay my fair share!');
		} else if (ad.expenses == 100) {
			$('#vacation-expenses').text('I will pay for everything!');
		} else {
			$('#vacation-expenses').text('My company is payment enough! :-)');
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
		}).done(function (data) {
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

function initAdImages2(adImages){
	for ( var i = 0; i < adImages.length; i++) {
		var img = $('#new-image').clone();
		$(img).removeClass('hidden');
		$(img).attr('id', adImages[i].id);
		$(img).attr('src', adImages[i].image);
		$('img.images').addClass('hidden');
		// $('img.images').hide();
		$('#image-drop-zone').append(img);
		// $(img).fadeIn(500);
		if ($('.arrow').hasClass('hidden')) {
			$('.arrow').removeClass('hidden');
		}
	}
	
}

function initProfileImage(ad){
	var img = $('#new-image').clone();
	$(img).removeClass('hidden');
	$(img).attr('id', 'avatar');
	$(img).attr('title', ad.user.description);
	$(img).attr('src', ad.user.avatar);
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

TABLE.paginate = function(table, pageLength) {
	// 1. Set up paging information
	var $table = $(table);
	var $rows = $table.find('tbody > tr');
	var numPages = Math.ceil($rows.length / pageLength) - 1;
	var current = 0;

	// 2. Set up the navigation controls
	var $nav = $table.parents('.table-wrapper').find('.wrapper-paging ul');
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

	// 3. Show initial rows
	$rows.hide().slice(0, pageLength).show();

	pagination = function(direction) { // 4. Move previous and next  

		var reveal = function(current) { // 5. Reveal the correct rows
			$back.removeClass('paging-disabled');
			$next.removeClass('paging-disabled');

			$rows.hide().slice(current * pageLength,
					current * pageLength + pageLength).show();

			$nav.find('a.paging-this strong').text(current + 1);
		};

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
		reveal(current);
	};
};

function sendMessage() {
	window.location = "../messages/new-message.php?userid=" + userid
			+ '&recipient=' + $('#name').text();
}

function addToFavorites() {
	alert('todo');
}