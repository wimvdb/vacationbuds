function markForInlineEditing(elements, showEditFields) {
	elements.editables({
		beforeEdit : function(field) {
			if (this.data('updatable') && $(this).text() != 'Description') {
				if (!field.is('select')) {
				field.val(this.text());
				}else{
					field.find('option:contains("'+this.text()+'")').attr('selected',true);
					//field.val('50');
				}
			}

		},
		beforeFreeze : function(display) {
			if (!this.is('select')) {
				if (display.data('updatable')) {
					display.text(this.val());
				}
			}else{
				display.text(this.find('option[value='+this.val()+']').text());
			}
			if (this.is('textarea') && this.val() == '' && this.hasClass('description-textarea')) {
				display.text('Description');
			}
		}
	});

	if (showEditFields) {
		elements.find('div > div').hide();
		elements.find('div > pre').hide();
		elements.find('div > input').css('display', '');
		elements.find('div > textarea').css('display', '');
	} else {
		elements.find('div > div').show();
		elements.find('div > pre').show();
	}
	elements.find('div > div').on('hover', function() {
		$(this).toggleClass('highlight');
	});
	elements.find('div > pre').on('hover', function() {
		$(this).toggleClass('highlight');
	});

}

function puffRemoveProfile(which, remove) {
	var imgId = which.attr('id').split('profile-image')[1];
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
	
	$.ajax({
		url: "../security/deleteProfileImage.php",
		async: true,
		type : 'POST',
		data : {'img' :JSON.stringify({'id' : imgId})}
		});

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
