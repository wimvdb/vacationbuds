var user = {};
var profile = {};
profile.images = [];
$(document).ready(function() {
	// init tabs
	$('#create-profile div.tab:not(:first)').hide();
	$('#create-profile-nav li').click(function(event) {
		event.preventDefault();
		$('#create-profile div.tab').hide();
		$('#create-profile-nav .current').removeClass("current");
		$(this).addClass('current');

		var clicked = $(this).find('a:first').attr('href');
		$('#create-profile ' + clicked).fadeIn('fast');
	}).eq(0).addClass('current');

	// setup avatar
	$('#avatar-drop-zone').on('dragover', handleDragOver);
	$('#avatar-drop-zone').on('drop', handleAvatarSelect);

	// setup image dropzone
	$('.image-drop-zone-right').on('dragover', handleDragOver);
	$('.image-drop-zone-right').on('drop', handleImageSelect);
	$('.image-drop-zone-left').on('dragover', handleDragOver);
	$('.image-drop-zone-left').on('drop', handleImageSelect);

	//markForInlineEditing($('.editable-text'), true);

	$('#image-drop-zone-left').hide();
	$('#image-drop-zone-right').hide();

	addPicture($('#image-drop-zone-left'));

	$('.trash').droppable({
		activeClass : 'trash-highlight',
		hoverClass : 'highlight-accept',
		drop : function(event, ui) {
			puffRemove($(ui.draggable));
		}
	});

});

function handleAvatarSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	var files = evt.originalEvent.dataTransfer.files; // FileList object.
	if (typeof FileReader !== "undefined" && (/image/i).test(files[0].type)) {
		reader = new FileReader();
		reader.onload = (function(theImg) {
			return function(evt) {
				var img_src = evt.target.result;
				theImg.src = img_src;
				user.avatar = img_src;

				/*var imgd = ctx.getImageData(0, 0, img.width, img.width);
				var pix = imgd.data;
				var len = pix.length;
				var argb = []; //pixels as int
				for (var i = 0; i < len; i += 4) {
				    argb.push((pix[i + 3] << 24) + (pix[i] << 16) + (pix[i + 1] << 8) + pix[i + 2]);
				}*/

			};

		}($('#avatar')[0]));
		reader.readAsDataURL(files[0]);
		//user.avatar = reader.readAsArrayBuffer(files[0]);

	}
	/*$('#avatar').removeClass('hidden');
	$('#avatar-postit').addClass('hidden');

	$('#avatar').draggable({
		revert : 'invalid',
		appendTo: 'body',
		containment : '#drag-area',
		scroll: false,
		start : function() {
			$('body').css('overflow', 'hidden');
		},
		stop : function() {
			$('body').css('overflow', 'auto');
		}
	});*/
	showAvatar();
}




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
		containment : '#drag-area',
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

function post_to_url(path, params, method) {
	method = method || "post"; // Set method to post by default, if not specified.

	// The rest of this code assumes you are not using a library.
	// It can be made less wordy if you use one.
	var form = document.createElement("form");
	form.setAttribute("method", method);
	form.setAttribute("action", path);

	for ( var key in params) {
		if (params.hasOwnProperty(key)) {
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", key);
			hiddenField.setAttribute("value", params[key]);

			form.appendChild(hiddenField);
		}
	}

	document.body.appendChild(form);
	form.submit();
}


