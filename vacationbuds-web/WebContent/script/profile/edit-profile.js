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

	$('body').on('dragover', function handleDragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		//evt.dataTransfer.dropEffect = 'move';
	});
	$('body').on('drop', function(evt) {
		return false;
	});



	$('#image-drop-zone-left').hide();
	$('#image-drop-zone-right').hide();

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
	}

	showAvatar();
}

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	// evt.dataTransfer.dropEffect = 'move';
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
		sroll : false
	});
}
