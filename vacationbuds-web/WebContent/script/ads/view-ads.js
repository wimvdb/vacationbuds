var ads;
$(document)
		.ready(
				function() {

					initViewAds();

					$('tbody tr').on('click', function() {
						resetAd();
						initViewAdPage(ads[$(this).index()]);
					});

					$('#ad-list tbody tr:even').addClass('zebra');
					$('#ad-list tbody tr').mouseover(function() {
						$(this).addClass('zebraHover');
					});
					$('#ad-list tbody tr').mouseout(function() {
						$(this).removeClass('zebraHover');
					});

					$('body').on('dragover', function handleDragOver(evt) {
						evt.stopPropagation();
						evt.preventDefault();
						// evt.dataTransfer.dropEffect = 'move';
					});
					$('body').on('drop', function(evt) {
						return false;
					});

					$('.trash').droppable({
						activeClass : 'trash-highlight',
						hoverClass : 'highlight-accept',
						drop : function(event, ui) {
							puffRemoveAd($(ui.draggable));
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

function initViewAds() {
	var response = $.ajax({
		url : "../security/getAdsByUserId.php",
		async : false,
		type : 'POST'
	}).responseText;
	ads = JSON.parse(response);
	if (!ads.length) {
		ads = JSON.parse(ads);
	}
	if (ads.length > 0) {
		initViewAdPage(ads[0]);
	}
	;

}

function initViewAdPage(ad) {
	$('#title').text(ad.title);
	if (ad.adtype == 'V') {
		$('#vacation').fadeIn(500);
		$('#hosting').hide();
		$('#type').text('Vacation Ad');
		$('#destination').text(ad.country + ', ' + ad.city);
		$('#dateOfDeparture').text(ad.departure);
		$('#duration').text(ad.duration);
		if (ad.expenses == 50) {
			$('#vacation-expenses').text('I will pay my fair share!');
		} else if (ads[0].expenses == 100) {
			$('#vacation-expenses').text('I will pay for everything!');
		} else {
			$('#vacation-expenses').text('My company is payment enough! :-)');
		}
		
	} else {
		$('#type').text('Hosting Ad');
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
	initAdImages(ad.id);
}

function resetAd() {
	$('#title').text('');
	$('#type').text('');
	$('#placeOn').text('');
	$('#expireOn').text('');
	$('#destination').text('');
	$('#dateOfDeparture').text('');
	$('#duration').text('');
	$('#vacation-expenses').text('');
	$('#description-div').text('');

}

function initAdImages(adid) {
	var response = $.ajax({
		url : "../security/getAdImages.php",
		async : false,
		type : 'POST',
		data : {
			'adid' : adid
		}
	}).responseText;
	var adImages = JSON.parse(response);
	if (!adImages.length && adImages.length != 0) {
		adImages = JSON.parse(adImages);
	}
	for ( var i = 0; i < adImages.length; i++) {
		var img = $('#new-image').clone();
		$(img).removeClass('hidden');
		$(img).attr('src', adImages[i].image);
		$('img.images').addClass('hidden');
		$('#image-drop-zone').append(img);
		if ($('.arrow').hasClass('hidden')) {
			$('.arrow').removeClass('hidden');
		}
	}

}

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
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
