var ads;
var row = 0;
var images = {};
var c = {};
var currentId = 0;
$(document)
		.ready(
				function() {

					$('#manage-ads').click();

					$("body").on({
						ajaxStart : function() {
							$('#image-drop-zone').addClass("loading");
						},
						ajaxStop : function() {
							$('#image-drop-zone').removeClass("loading");
						}
					});

					initViewAds();

					$('body').on('dragover', function handleDragOver(evt) {
						evt.stopPropagation();
						evt.preventDefault();
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

					if (!opera) {
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

function initViewAds() {
	$
			.ajax({
				url : "../security/getAdsByUserId.php",
				type : 'POST'
			})
			.done(
					function(data) {
						ads = JSON.parse(data);
						if (!ads.length && ads.length != 0) {
							ads = JSON.parse(ads);
						}
						if (ads.length > 0) {
							for ( var i = 0; i < ads.length; i++) {

								var tr = $(
										'<tr title="Drag ad to the bin to delete!"></tr>')
										.append(
												'<td>'
														+ ((ads[i].adtype == 'V') ? 'Vacation ad'
																: 'Hosting ad')
														+ '</td>')
										.append('<td>' + ads[i].title + '</td>')
										.append(
												'<td>' + ads[i].placeOn
														+ '</td>').append(
												'<td>' + ads[i].expireOn
														+ '</td>');

								$('#ad-list tbody').append(tr);
								tr
										.draggable({
											revert : 'invalid',
											appendTo : 'body',

											scroll : false,
											helper : "clone",
											start : function(event, ui) {
												if (!$('body').outerHeight() > $(
														window).height()) {
													$('body').css('overflow',
															'hidden');
												}
												c.tr = this;
												c.helper = ui.helper;
											},
											stop : function() {
												$('body').css('overflow',
														'auto');
											}
										});

							}
							currentId = ads[0].id;
							initViewAdPage(ads[0]);
						} else {
							var tr = $('<tr></tr>').append(
									'<td colspan="4"> No ads!</td>');
							$('#ad-list tbody').append(tr);
							$('#ad').addClass('hidden');
							$('.trash').addClass('hidden');
						}

						$('tbody tr').on('click', function() {
							if (row != $(this).index()) {
								resetAd();
								row = $(this).index();
								currentId = ads[row].id;
								initViewAdPage(ads[row]);
							}
						});

						// $('#ad-list tbody tr:even').addClass('zebra');
						$('#ad-list tbody tr').mouseover(function() {
							$(this).addClass('zebraHover');
						});
						$('#ad-list tbody tr').mouseout(function() {
							$(this).removeClass('zebraHover');
						});
					});

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
		} else if (ad.expenses == 100) {
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
	$('.ad-text div div div').text('');
	$('.images:not("#new-image")').remove();

}

function initAdImages(adid) {
	if (!images[row.valueOf()]) {
		$.ajax({
			url : "../security/getAdImages.php",
			type : 'POST',
			data : {
				'adid' : adid
			}
		}).done(function(data) {
			if (currentId == adid) {
				var adImages = JSON.parse(data);
				if (!adImages.length && adImages.length != 0) {
					adImages = JSON.parse(adImages);
				}
				images[row] = adImages;
				initAdImages2(adImages);
			}
		});

	} else {

		initAdImages2(images[row.valueOf()]);
	}

}

function initAdImages2(adImages) {
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
	if (adImages.length == 0) {
		$('.arrow').addClass('hidden');
	}
}

function puffRemoveAd(which) {

	var frame_count = 5, $trash, $puff;

	var position = $('#trashbin').position();
	// create container
	$trash = $('<div class="puff"></div>').css({
		height : 285,
		left : position.left,
		top : position.top,
		width : 320,
		position : 'absolute',
		overflow : 'hidden'
	}).appendTo('#drag-area');

	// add the animation image
	$puff = $('<img class="puff" src="../images/epuff.png"/>').css({
		width : 320,
		height : 1600
	}).data('count', frame_count).appendTo($trash);

	$(c.tr).hide();
	$(c.helper).remove();

	// $this.remove();
	/*
	 * var imagecount = $('img.images').length; if (imagecount > 1) {
	 * $($('img.images').get(1)).removeClass('hidden'); } else {
	 * $('.postit').removeClass('hidden'); $('.arrow').addClass('hidden'); }
	 */

	(function animate() {

		var count = $puff.data('count');

		if (count) {
			var top = frame_count - count;
			var height = $puff.height() / frame_count;
			$puff.css({
				"top" : -(top * height),
				'position' : 'absolute'
			});
			$trash.css({
				'height' : height
			});
			$puff.data("count", count - 1);
			setTimeout(animate, 75);
		} else {
			$puff.parent().remove();
		}
	})();

	$.ajax({
		url : "../security/deleteAd.php",
		type : 'POST',
		data : {
			'ad' : JSON.stringify({
				'id' : ads[$(c.tr).index()].id
			})
		}
	});
	if ($('#ad-list tbody tr:visible').length > 0) {
		$('#ad-list tbody tr:visible').first().click();
	} else {
		var tr = $('<tr></tr>').append('<td colspan="4"> No ads!</td>');
		$('#ad-list tbody').append(tr);
		$('#ad').addClass('hidden');
		$('.trash').addClass('hidden');
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
