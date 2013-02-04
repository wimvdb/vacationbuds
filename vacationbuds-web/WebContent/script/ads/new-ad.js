var imageIndex = 1;
var adId = -1;
$(document)
		.ready(
				function() {

					markForInlineEditing($('.editable-text'), false);
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

					$("#expireOn").datepicker({
						dateFormat : 'dd-mm-yy',
						onSelect : function(dateText, inst) {
							$('div[data-for=#expireOn]').text(dateText);

						}
					});

					$("#placeOn").datepicker({
						dateFormat : 'dd-mm-yy',
						onSelect : function(dateText, inst) {
							$('div[data-for=#placeOn]').text(dateText);

						}
					});

					$("#type").change(function() {
						if ($(this).val() == 'H') {
							$('#vacation').hide();
							$('#hosting').fadeIn(500);
						} else {
							$('#vacation').fadeIn(500);
							$('#hosting').hide();
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
											2));
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

					$('#image-drop-zone').on('dragover', handleDragOver);
					$('#image-drop-zone').on('drop', handleImageSelect);

					$('body').on('dragover', function handleDragOver(evt) {
						evt.stopPropagation();
						evt.preventDefault();
					});
					$('body').on('drop', function(evt) {
						return false;
					});

				});

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
}

function handleImageSelect(evt) {

	evt.stopPropagation();
	evt.preventDefault();
	var files = evt.originalEvent.dataTransfer.files; // FileList object.
	for ( var i = 0; i < files.length; i++) {
		var img = $(this).children('#new-image').clone();
		if (typeof FileReader !== "undefined" && (/image/i).test(files[i].type)) {
			reader = new FileReader();
			reader.onload = (function(theImg) {
				return function(evt) {
					theImg.src = evt.target.result;
					saveAdImage(evt.target.result);
				};
			}(img.get(0)));
			$(img).removeClass('hidden');
			$('img.images').addClass('hidden');
			$(img).attr('id', 'new-image' + imageIndex);
			imageIndex++;
			$('#image-drop-zone').append(img);
			reader.readAsDataURL(files[i]);

			if (!$('postit').hasClass('hidden')) {
				$('.postit').addClass('hidden');
				$('.arrow').removeClass('hidden');
			}

		}
		img.draggable({
			revert : 'invalid',
			appendTo : 'body',

			scroll : false,
			start : function() {
				$('body').css('overflow', 'hidden');
			},
			stop : function() {
				$('body').css('overflow', 'auto');
			}
		});
	}
}

function puffRemoveAd(which, remove) {
	var $this = $(which), image_width = 128, scale_factor = $this.outerWidth()
			/ image_width, frame_count = 5, $trash, $puff;

	// create container
	$trash = $('<div class="puff"></div>').css({
		height : $this.outerHeight(),
		left : $this.offset().left,
		top : $this.offset().top,
		width : $this.outerWidth(),
		position : 'absolute',
		overflow : 'hidden'
	}).appendTo('#drag-area');

	// add the animation image
	$puff = $('<img class="puff" src="../images/epuff.png"/>').css({
		width : image_width * scale_factor,
		height : (frame_count * image_width) * scale_factor
	}).data('count', frame_count).appendTo($trash);

	$this.remove();
	var imagecount = $('img.images').length;
	if (imagecount > 1) {
		$($('img.images').get(1)).removeClass('hidden');
	} else {
		$('.postit').removeClass('hidden');
		$('.arrow').addClass('hidden');
	}

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

}

function saveAdImage(image) {
	var adImage = {
			'image' : image
		};
	$.ajax({
		url: "../security/saveAdImage.php",
		async: false,
		type : 'POST',
		data : {'adImg' : JSON.stringify(adImage)}
		}).responseText;
	
	/*post_to_url('../security/test.php',{'adImg' : ''}, 'post');*/
	
	
	
}


function saveAd() {
	var ad = {
		'title' : $('div[data-for="#title"]').text(),
		'text' : $('div[data-for="#description"]').text(),
		'placeOn' :$('div[data-for="#placeOn"]').text(),
		'expireOn' : $('div[data-for="#expireOn"]').text(),
		/*'images' : ($('img.images').length -1)*/
	};
	if ($('#type').val() == 'H') {
		$.extend(ad, {
			'@type' : 'com.vacationbuds.model.Ad',
			'country' : $('div[data-for="#host-country"]').text(),
			'city' : $('div[data-for="#host-city"]').text(),
			'expenses' : $('#hosting-expenses').val()
		});
	} else {
		$.extend(ad, {
			'@type' : 'com.vacationbuds.model.VacationAd',
			'country' : $('div[data-for="#country"]').text(),
			'city' : $('div[data-for="#city"]').text(),
			'duration' : $('div[data-for="#duration"]').text(),
			'departure' : $('div[data-for="#departure"]').text(),
			'expenses' : $('#vacation-expenses').val()
		});
	}

	post_to_url('../security/createAd.php', {
		'ad' : JSON.stringify(ad)
	}, 'post');
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
