
$(document).ready(function() {
	

	
$.param();
	

	

	

});

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
			    user.avatar =  stringToBytes(canvas[0].toDataURL("image/png"));
			};
		}($('#avatar')[0]));
		reader.readAsDataURL(files[0]);
		//user.avatar = reader.readAsArrayBuffer(files[0]);
		
	}
	$('#avatar').removeClass('hidden');
	$('#avatar-postit').addClass('hidden');

	$('#avatar').draggable({
		revert : 'invalid',
		containment : '#drag-area',
		sroll : false
	});
}

function stringToBytes(str) {
	  var ch, st, re = [];
	  for (var i = 0; i < str.length; i++ ) {
		ch = str.charCodeAt(i);  // get char 
		st = [];                 // set up "stack"
		do {
		  st.push( ch & 0xFF );  // push byte to stack
		  ch = ch >> 8;          // shift value down by 1 byte
		}  
		while ( ch );
		// add stack contents to result
		// done because chars have "wrong" endianness
		re = re.concat( st.reverse() );
	  }
	  // return an array of bytes
	  return re;
	}



/*function getBase64Image(){     
    p=document.getElementById("fileUpload").value;
    img1.setAttribute('src', p); 
    canvas.width = img1.width; 
    canvas.height = img1.height; 
    var ctx = canvas.getContext("2d"); 
    ctx.drawImage(img1, 0, 0); 
    var dataURL = canvas.toDataURL("image/png");alert("from getbase64 function"+dataURL );    
    return dataURL;
} */

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

/*
 * $(function() { $('#slides').slides({ preload : true, preloadImage :
 * '../images/loading.gif', hoverPause : true, animationStart :
 * function(current) { $('.caption').animate({ bottom : -35 }, 100); if
 * (window.console && console.log) { // example return of current slide number
 * console.log('animationStart on slide: ', current); } ; }, animationComplete :
 * function(current) { $('.caption').animate({ bottom : 0 }, 200); if
 * (window.console && console.log) { // example return of current slide number
 * console.log('animationComplete on slide: ', current); } ; }, slidesLoaded :
 * function() { $('.caption').animate({ bottom : 0 }, 200); } }); });
 */

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
	/*
	 * } else { $this.parent().parent().remove(); $('#pictures >
	 * div:even').attr('id','image-drop-zone-right'); $('#pictures >
	 * div:odd').attr('id','image-drop-zone-left'); $('#pictures > div:even >
	 * div:first').removeClass().addClass('image-drop-zone-right'); $('#pictures >
	 * div:odd > div:first').removeClass().addClass('image-drop-zone-left'); }
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

}

function saveOrUpdateUser() {

	$.extend(profile,  {'text' : $('div[data-for="#long-description"]').text()});
	var pictures = $.find('#pictures img.ui-draggable');
	for(var i =0; i < pictures.length; i++){
		var canvas = $('<canvas>');
		canvas.width = pictures[i].width; 
	    canvas.height = pictures[i].height;
	    var ctx = canvas[0].getContext("2d"); 
	    
	    ctx.drawImage(pictures[i], 0, 0); 
	    var pictureContainer = $(pictures[i]).parent().parent();
	    profile.images.push({'@type':'com.vacationbuds.model.ProfileImage', 'title':pictureContainer.find('div[data-type=editable]').eq(0).text(),'text':pictureContainer.find('div[data-type=editable]').eq(1).text(),'image':stringToBytes(canvas[0].toDataURL("image/png"))});
	}
	
	
	
	
	$.extend(user,  {
		'username' : $('div[data-for="#username"]').text(),
		'password' : $('div[data-for="#password"]').text(),
		'email' : $('div[data-for="#email"]').text(),
		'age' : $('div[data-for="#age"]').text(),
		'country' : $('div[data-for="#country"]').text(),
		'gender' : $('input[name=gender]:radio:checked').val(),
		'description' : $('div[data-for="#short-description"]').text(),
		'profile' : profile
	});
	

	$.ajax({
		url : 'http://localhost:8080/vacationbuds-webservice/rest/dao/saveOrUpdateUser',
		contentType : 'application/json',
		// data : JSON.stringify(JSON.parse($("#json_text").val())),
		//data : user,
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

/*function getUserInfo() {
	$.ajax({
		url : 'http://localhost:8080/vacationbuds-webservice/rest/dao/getUserById/1',
		//url : 'http://http://gumball.wickedlysmart.com/',
		type : "GET",
		success : function(data) {
			alert('suc ' +JSON.stringify(data));
		},
		error : function(data) {
			alert(data);
		}
	});
}*/


