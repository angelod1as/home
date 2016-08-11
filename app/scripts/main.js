var isMobile = function(){
	if(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)){
		return true;
	}
	else {
		return false;
	}
}

if(isMobile()) {
	$('#video-head').remove();
} else {
	$('#video-head').get(0).pause();
}

$('.fitas-cassete').on('click', function(event) {
	$(this).find('.clique').css({'opacity': '0'});
	$(this).find('.fita').toggleClass('turn');
});

// pausa vídeo on load

// JS Galeria
function dir($this) {
	var parent = $this.parent();
	if (parent.find('.proximo').length > 0) {
		parent.find('.atual').removeClass('atual').addClass('anterior');
		parent.find('.proximo').first().removeClass('proximo').addClass('atual');
		if (parent.find('.proximo').length == 0)
		$this.fadeOut(300);
		if (parent.find('.anterior').length > 0)
		parent.find('.esq').fadeIn(300);
	}
}

function esq($this) {
	var parent = $this.parent();
	if (parent.find('.anterior').length > 0) {
		parent.find('.atual').removeClass('atual').addClass('proximo');
		parent.find('.anterior').last().removeClass('anterior').addClass('atual');
		if (parent.find('.anterior').length == 0)
		$this.fadeOut(300);
		if (parent.find('.proximo').length > 0)
		parent.find('.dir').fadeIn(300);
	}
}

function resize(){
	var size = 0;
	$('figure').each(function(){
		if ($(this).height()>size){
			size = $(this).height();
		}
	});
	$('.galeria').height(size);
	$('.galeria button').height($('.atual img').height());
}

$(window).resize(function(){
	resize();
});

function galInit(jsonGallery) {
	$.ajax({
		url: jsonGallery,
		type: 'GET',
		dataType: 'jsonp',
		jsonpCallback: 'photoGallery'
	})
	.done(function(data) {
		var templateGallery = '<figure id="{{idx}}" class="{{classCss}}"><img src="{{image_gallery}}" onload="resize()"/><figcaption>{{legend}} <span>{{author}}</span></figcaption></figure>';
		var htmlGallery = [];

		$.each(data.images, function(i, val) {
			var classCss = (i === 0 ? 'atual' : 'proximo'),
			legend = val.legend,
			author = val.credit,
			idx = val.idx,
			image_gallery = val.image_gallery;

			var actualImage = templateGallery.replace('{{idx}}', idx)
				.replace('{{classCss}}', classCss)
				.replace('{{legend}}', legend)
				.replace('{{author}}', author)
				.replace('{{image_gallery}}', image_gallery);
			htmlGallery.push(actualImage);
		});

		$('#galeria').prepend(htmlGallery.join(' '));

	})
	.fail(function(xhr, ajaxOptions, thrownError) {
		console.log('error', ajaxOptions);
	});

	var onComplete = function() {
		if ($('.touch').length > 0) {

			var heightButton = $('figure:first-child > img').height();
		}

	};

	if ($('.touch').length > 0) {

		/*document.getElementById('galeria').addEventListener('touchstart', function(e) {
		  touches.push(e.touches[0].clientX);
		});

		document.getElementById('galeria').addEventListener('touchend', function(e) {
			touches.push(e.changedTouches[0].clientX);
			if ((touches[touches.length - 2] - touches[touches.length - 1]) > 100) {
				dir($('.dir'));
			} else if ((touches[touches.length - 2] - touches[touches.length - 1]) < -100) {
				esq($('.esq'));
			}
		  touches = [];
		});*/
		$('.galeria .dir').on('click', function() {
			dir($(this));
		});

		$('.galeria .esq').on('click', function() {
			esq($(this));
		});
	} else {
		$('.galeria .dir').on('click', function() {
			dir($(this));
		});

		$('.galeria .esq').on('click', function() {
			esq($(this));
		});
	}
}
// END Js Galeria

(function(){

	$(document).on('scroll', function(){

		// Play no Vídeo Mobile
		if(!isMobile()) {
			if($('body').scrollTop() <= $('#video-container').height()) {
				$('#video-head').get(0).play();
				$('#spotify').fadeOut();
			} else {
				$('#video-head').get(0).pause();
				$('#spotify').fadeIn();
			}
		}
		// Spotify Mobile
		if (isMobile()) {
			if($('body').scrollTop() <= $('#video-container').height()) {
				$('#spotify').fadeOut();
			} else {
				$('#spotify').fadeIn();
			}
		}
	})

	var interval=setInterval(function(){
		if(document.readyState=='complete'){
			document.getElementsByClassName('loading')[0].style.display = 'none';
			document.body.classList.remove('no-scroll');
			clearInterval(interval);
		}
	}, 300);
})();