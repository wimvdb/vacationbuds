var lastImg;

$(document).ready(function() {
	
	if ($.browser.msie) {
	$('#profile').css('border-style','none');
	}
});


function showAvatar() {
	$('#avatar').removeClass('hidden');
	$('#avatar-postit').addClass('hidden');

	$('#avatar').draggable({
		revert : 'invalid',
		appendTo : 'body',
		containment : '#drag-area',
		scroll : false,
		start : function() {
			$('body').css('overflow', 'hidden');
		},
		stop : function() {
			$('body').css('overflow', 'auto');
		}
	});
}

function getURLParameter(name) {
	return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [
			, null ])[1]);
}

function initProfileById(id) {
	var user;
	$.ajax({
		url : "../security/getUserById.php",
		type : "POST",
		data : {
			'user' : JSON.stringify({
				'id' : id
			})
		},
		success : function(user) {
			if (!user.id) {
				user = JSON.parse(user);
			}
			initProfilePage(user);
		},
		error : function(data) {
			alert(data);
		}
	});
}

function initProfile() {
	var user;
	$.ajax({
		url : "../security/getUserById.php",
		type : "POST",
		success : function(user) {
			if (!user.id) {
				user = JSON.parse(user);
			}
			initProfilePage(user);
		},
		error : function(data) {
			alert(data);
		}
	});
}

function addPicture() {
	var dropzone;
	if ($('.image-drop-zone-right-parent').size() > $(
			'.image-drop-zone-left-parent').size()) {
		dropzone = $($('.image-drop-zone-left-parent').get(0)).clone();
	} else {
		dropzone = $($('.image-drop-zone-right-parent').get(0)).clone();
	}
	// dropzone.children(0).on('dragover', handleDragOver);
	// dropzone.children(0).on('drop', handleImageSelect);
	var count = $('#pictures > div').size() - 1;

	var title_label = dropzone.children(1).find('div[data-for=#title]');
	title_label.attr('data-for', '#title' + count);
	dropzone.children(1).find('input').attr('id', 'title' + count);

	var description_label = dropzone.children(1).find(
			'div[data-for=#description]');
	description_label.attr('data-for', '#description' + count);
	dropzone.children(1).find('textarea').attr('id', 'description' + count);

	$('#pictures').append(dropzone.show());

	dropzone.children(0).attr('id', 'images_dropzone_' + count);
	new Dropzone(
			'#images_dropzone_' + count,
			{
				paramName : "userfile",
				url : '../security/file-upload.php',
				createImageThumbnails : false,
				maxFilesize : 2, // MB
				previewTemplate : "<div class=\"preview file-preview\">\n  <div class=\"details\">\n   <div class=\"filename\"><span></span></div>\n  </div>\n  <div class=\"progress\"><span class=\"upload\"></span></div>\n  <div class=\"success-mark\"><span></span></div>\n  <div class=\"error-mark\"><span></span></div>\n  <div class=\"error-message\"><span></span></div>\n</div>",
				accept : function(file, done) {
					done();
				},
				
				addedfile : function(file) {
					file.previewTemplate = Dropzone
							.createElement(this.options.previewTemplate);
					this.previewsContainer.appendChild(file.previewTemplate);
				},
				success : function(file, response) {
					var img = $('.image[src=""]').last();
					saveProfileImage(response, img);
					img[0].src = response;
					if ($(img).hasClass('hidden')) {
						if ($('#pictures .postit:visible').size() == 1) {
							addPicture($(this));
						}
						$(img).removeClass('hidden');
						$(img).siblings(0).addClass('hidden');
					}
					$(img).draggable({
						revert : 'invalid',
						sroll : false
					});
				},
				complete : function() {
					$('.file-preview').remove();
				},
				fallback : function() {
					$('.dragNdropMessage').text('Click here to upload Image!');
					var child, messageElement, span, _i, _len, _ref;

					this.element.className = "" + this.element.className
							+ " browser-not-supported";
					_ref = this.element.getElementsByTagName("div");
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						child = _ref[_i];
						if (/(^| )message($| )/.test(child.className)) {
							messageElement = child;
							child.className = "message";
							continue;
						}
					}

					return $(this.element).after(this.getFallbackForm());

				}
			});

	//workaround for ie
	$(dropzone).find('form').submit(function() {
		$(this).ajaxSubmit({
			success : function(response) {
				var img = lastImg;

				saveProfileImage(response, img);

				img[0].src = response;
				if ($(img).hasClass('hidden')) {
					if ($('#pictures .postit:visible').size() == 1) {
						addPicture($(this));
					}
					$(img).removeClass('hidden');
					$(img).siblings(0).addClass('hidden');
				}
				img.draggable({
					revert : 'invalid',
					sroll : false
				});
			}
		});
		return false;
	});

	$(dropzone).find('.ie-file').change(function() {
		$(this).closest("form").submit();

	});

	$(dropzone).hover(function(e) {

		$(dropzone).find('.ie-file').position({
			of : $(dropzone).find('.postit')
		});
	});

	

	$(dropzone).find('.ie-file').click(function() {
		lastImg = $(this).parent().parent().find('img');
		
	});

	markForInlineEditing(dropzone.children(1).find('.editable-text'), false);
	return dropzone;

}
