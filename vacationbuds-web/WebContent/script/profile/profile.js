$(document).ready(function() {
	var userid = getURLParameter('userid');
	initProfile(userid);
	
	
	$('body').scroll(function(){
		$(this).css('overflow','auto');
	});
	
	$('body').bind('mousewheel', function(event, delta) {
		$(this).css('overflow','auto');
    });

});



function initProfilePage(user) {

	$('#username-container').append('<div>' + user.username + '</div>');
	$('#age-container').append('<div>' + user.age + '</div>');
	$('#country-container').append('<div>' + user.country + '</div>');

	if (user.gender == 'M') {
		$('#gender-container').append('<div>Male</div>');
	} else {
		$('#gender-container').append('<div>Female</div>');
	}

	$('#short-description-container').append(
			'<div>' + user.description + '</div>');
	$('#long-description-container').append(
			'<div>' + user.profile.text + '</div>');

	$('#avatar').get(0).src = user.avatar;



	var images = user.profile.images;
	var right = 0;
	var left = 0;
	var move = '320px';
	for ( var i = 0; i < images.length; i++) {
		var css = {};
		var rotation = 10;// Math.floor((Math.random()*11));
		if (i != 0 && i != 1) {
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
			'src' : images[i].image,
			'height' : '120',
			'title' : images[i].title,
			'class' : 'image'

		}).css(css);
		if (i % 2 == 0) {
			right++;
			$(photo).hover(function() {
				$('body').css('overflow','hidden');
				$(this).stop().animate({
					'height' : 500,
					'right' : move 
				}, 1000,'easeInOutExpo');
			}, function() {
				
				$(this).stop().animate({
					'height' : 100,
					'right' : '0px'
				}, 800,'easeInOutExpo');
				//$('body').css('overflow','scroll');
			});
			$(photo).appendTo('#photos-right');
		} else {
			left++;
			$(photo).hover(function() {
				$('body').css('overflow','hidden');
				$(this).stop().animate({
					'height' : 500,
					'left' : '50px' 
				}, 1000,'easeInOutExpo');
			}, function() {
				
				$(this).stop().animate({
					'height' : 100,
					'left' : '0px'
				}, 800,'easeInOutExpo');
				//$('body').css('overflow','scroll');
			});
			$(photo).appendTo('#photos-left');
		}
	}

	

}

/*function convertCanvasToImage(user, canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}*/

/*function convertImageToCanvas(image) {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	canvas.getContext("2d").drawImage(image, 0, 0);

	return canvas;
}*/

function handleAvatarSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	var files = evt.originalEvent.dataTransfer.files; // FileList object.
	if (typeof FileReader !== "undefined" && (/image/i).test(files[0].type)) {
		reader = new FileReader();
		reader.onload = (function(theImg) {
			return function(evt) {
				theImg.src = evt.target.result;
				var canvas = $('<canvas>');
				canvas.width = theImg.width;
				canvas.height = theImg.height;
				var ctx = canvas[0].getContext("2d");
				ctx.drawImage(theImg, 0, 0);
				user.avatar = stringToBytes(canvas[0].toDataURL("image/png"));
			};
		}($('#avatar')[0]));
		reader.readAsDataURL(files[0]);
		// user.avatar = reader.readAsArrayBuffer(files[0]);

	}
	$('#avatar').removeClass('hidden');
	$('#avatar-postit').addClass('hidden');

	$('#avatar').draggable({
		revert : 'invalid',
		containment : '#drag-area',
		sroll : false
	});
}

/*
 * function getBase64Image(){ p=document.getElementById("fileUpload").value;
 * img1.setAttribute('src', p); canvas.width = img1.width; canvas.height =
 * img1.height; var ctx = canvas.getContext("2d"); ctx.drawImage(img1, 0, 0);
 * var dataURL = canvas.toDataURL("image/png");alert("from getbase64
 * function"+dataURL ); return dataURL; }
 */

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	// evt.dataTransfer.dropEffect = 'copy';
}

function handleImageSelect(evt) {
	var img = $(this).children('img');
	evt.stopPropagation();
	evt.preventDefault();
	var files = evt.originalEvent.dataTransfer.files; // FileList object.
	if (typeof FileReader !== "undefined" && (/image/i).test(files[0].type)) {
		reader = new FileReader();
		reader.onload = (function(theImg) {
			return function(evt) {
				theImg.src = evt.target.result;
			};
		}(img[0]));
		reader.readAsDataURL(files[0]);

		if ($(img).hasClass('hidden')) {
			if ($('#pictures .postit:visible').size() == 1) {
				addPicture($(this));
			}
			$(img).removeClass('hidden');
			$(this).children('div').addClass('hidden');
		}

	}

	img.draggable({
		revert : 'invalid',
		containment : 'body',
		sroll : false
	});
}

function addPicture(imageDropZone) {
	var dropzone;
	if (imageDropZone.hasClass('image-drop-zone-left')) {
		dropzone = $('#image-drop-zone-right').clone();
	} else {
		dropzone = $('#image-drop-zone-left').clone();
	}
	dropzone.children(0).on('dragover', handleDragOver);
	dropzone.children(0).on('drop', handleImageSelect);
	var count = $('#pictures > div').size() - 1;

	var title_label = dropzone.children(1).find('div[data-for=#title]');
	title_label.attr('data-for', '#title' + count);
	dropzone.children(1).find('input').attr('id', 'title' + count);

	var description_label = dropzone.children(1).find(
			'div[data-for=#description]');
	description_label.attr('data-for', '#description' + count);
	dropzone.children(1).find('textarea').attr('id', 'description' + count);

	$('#pictures').append(dropzone.show());

	markForInlineEditing(dropzone.children(1).find('.editable-text'), false);

}

function markForInlineEditing(elements, showEditFields) {
	elements.editables({
		beforeEdit : function(field) {
			if (this.data('updatable'))
				field.val(this.text());
		},
		beforeFreeze : function(display) {
			if (display.data('updatable'))
				display.text(this.val());
		}
	});

	if (showEditFields) {
		elements.find('div > div').hide();
		elements.find('div > input').css('display', '');
		elements.find('div > textarea').css('display', '');
	} else {
		elements.find('div > div').show();
	}
	elements.find('div > div').on('hover', function() {
		$(this).toggleClass('highlight');
	});

}

function puffRemove(which, remove) {
	var $this = $(which), image_width = 128, scale_factor = $this.outerWidth()
			/ image_width, frame_count = 5, $trash, $puff;

	// create container
	$trash = $('<div class="puff"></div>').css({
		position : 'fixed',
		right : '0px',
		bottom : '0px',
		width : $this.outerWidth(),
		overflow : 'hidden'
	}).appendTo('#drag-area');

	// add the animation image
	$puff = $('<img class="puff" src="../images/epuff.png"/>').css({
		width : image_width * scale_factor,
		height : (frame_count * image_width) * scale_factor
	}).data('count', frame_count).appendTo($trash);

	// remove the original element
	// if ($this.is("#avatar")) {
	$this.addClass('hidden');
	$this.attr('style', 'position : relative');
	$this.siblings('div').removeClass('hidden');
	

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

function saveOrUpdateUser() {

	$.extend(profile, {
		'text' : $('div[data-for="#long-description"]').text()
	});
	var pictures = $.find('#pictures img.ui-draggable');
	for ( var i = 0; i < pictures.length; i++) {
		var canvas = $('<canvas>');
		canvas.width = pictures[i].width;
		canvas.height = pictures[i].height;
		var ctx = canvas[0].getContext("2d");

		ctx.drawImage(pictures[i], 0, 0);
		var pictureContainer = $(pictures[i]).parent().parent();
		profile.images.push({
			'@type' : 'com.vacationbuds.model.ProfileImage',
			'title' : pictureContainer.find('div[data-type=editable]').eq(0)
					.text(),
			'text' : pictureContainer.find('div[data-type=editable]').eq(1)
					.text(),
			'image' : stringToBytes(canvas[0].toDataURL("image/png"))
		});
	}

	$.extend(user, {
		'username' : $('div[data-for="#username"]').text(),
		'password' : $('div[data-for="#password"]').text(),
		'email' : $('div[data-for="#email"]').text(),
		'age' : $('div[data-for="#age"]').text(),
		'country' : $('div[data-for="#country"]').text(),
		'gender' : $('input[name=gender]:radio:checked').val(),
		'description' : $('div[data-for="#short-description"]').text(),
		'profile' : profile
	});

	$
			.ajax({
				url : 'http://localhost:8080/vacationbuds-webservice/rest/dao/saveOrUpdateUser',
				contentType : 'application/json',
				// data : JSON.stringify(JSON.parse($("#json_text").val())),
				// data : user,
				data : JSON.stringify(user),
				type : "POST",
				success : function(data) {
					alert('succes : ' + JSON.stringify(data));
					// $("#result").val(data);
					// $("#json_text").val(JSON.stringify(data));
				},
				error : function(data) {
					alert('error : ' + data.responseText);
					// $("#result").val(data.responseText);
				}
			});
}
