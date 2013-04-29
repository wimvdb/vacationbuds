var user = {};

$(document)
		.ready(
				function() {

					// init tabs
					$('#create-profile div.tab:not(:first)').hide();
					$('#create-profile-nav li').click(
							function(event) {
								event.preventDefault();
								$('#create-profile div.tab').hide();
								$('#create-profile-nav .current').removeClass(
										"current");
								$(this).addClass('current');

								var clicked = $(this).find('a:first').attr(
										'href');
								$('#create-profile ' + clicked).fadeIn('fast');
							}).eq(0).addClass('current');

					// setup avatar
					// $('#avatar-drop-zone').on('dragover', handleDragOver);
					// $('#avatar-drop-zone').on('drop', handleAvatarSelect);

					$('body').on('dragover', function handleDragOver(evt) {
						evt.stopPropagation();
						evt.preventDefault();

					});
					$('body').on('drop', function(evt) {
						return false;
					});

					$('.image-drop-zone-left-parent').first().hide();
					$('.image-drop-zone-right-parent').first().hide();

					$('.trash').droppable({
						activeClass : 'trash-highlight',
						hoverClass : 'highlight-accept',
						drop : function(event, ui) {
							puffRemoveProfile($(ui.draggable));
						}
					});

					$('.error').hide();

					new Dropzone(
							"#avatar-postit",
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
									this.previewsContainer
											.appendChild(file.previewTemplate);
								},
								success : function(file, response) {
									user.avatar = response;
									$('#avatar')[0].src = response;
									showAvatar();
								},
								complete : function() {
									$('.file-preview').remove();
								},
								fallback : function() {
									$('.dragNdropMessage').text(
											'Click here to upload Image!')
									var child, messageElement, span, _i, _len, _ref;

									this.element.className = ""
											+ this.element.className
											+ " browser-not-supported";
									_ref = this.element
											.getElementsByTagName("div");
									for (_i = 0, _len = _ref.length; _i < _len; _i++) {
										child = _ref[_i];
										if (/(^| )message($| )/
												.test(child.className)) {
											messageElement = child;
											child.className = "message";
											continue;
										}
									}

									return $(this.element).after(
											this.getFallbackForm());

								}
							});

					$('.ie-form-avatar').submit(function() {
						$(this).ajaxSubmit({
							success : function(response) {
								user.avatar = response;
								$('#avatar')[0].src = response;
								showAvatar();
							}
						});
						return false;
					});

					$('.ie-file-avatar').change(function() {
						$('.ie-form-avatar').submit();

					});

					$('.ie-file-avatar').position({
						of : $('#avatar-postit')
					});

				});

/*
 * function handleAvatarSelect(evt) { evt.stopPropagation();
 * evt.preventDefault(); var files = evt.originalEvent.dataTransfer.files; //
 * FileList object. if (typeof FileReader !== "undefined" &&
 * (/image/i).test(files[0].type)) { reader = new FileReader(); reader.onload =
 * (function(theImg) { return function(evt) { var img_src = evt.target.result;
 * theImg.src = img_src; user.avatar = img_src; };
 * 
 * }($('#avatar')[0])); reader.readAsDataURL(files[0]); }
 * 
 * showAvatar(); }
 */

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
}

/*function handleImageSelect(evt) {

 evt.stopPropagation();
 evt.preventDefault();
 var files = evt.originalEvent.dataTransfer.files;  
 for ( var i = 0; i < files.length; i++) {
 if (typeof FileReader !== "undefined" && (/image/i).test(files[i].type)) {
 var img = $('.image').last();
 reader = new FileReader();
 reader.onload = (function(theImg) {
 return function(evt) {
 theImg.src = evt.target.result;
 saveProfileImage(evt.target.result, theImg);
 };
 }(img[0]));
 reader.readAsDataURL(files[i]);

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
 }
 }*/

function saveProfileImage(image, imgHtml) {
	var profileImage = {
		'image' : image
	};
	$.ajax({
		url : "../security/saveProfileImage.php",
		type : 'POST',
		data : {
			'profileImg' : JSON.stringify(profileImage)
		}
	}).done(function(data) {
		$(imgHtml).attr('id', 'profile-image' + JSON.parse(data).imgId);
	});

}
