;(function () {
	
	'use strict';

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas overflow');
    			$('.js-fh5co-nav-toggle').removeClass('active');
	    	}
	    }
		});

	};


	var offcanvasMenu = function() {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas overflow');
    			$('.js-fh5co-nav-toggle').removeClass('active');
				
	    	}
		});

		$('#fh5co-offcanvas').on('click', 'a', function () {
			$('body').removeClass('offcanvas overflow');
			$('.js-fh5co-nav-toggle').removeClass('active');
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var runAnimateQueue = function() {
			setTimeout(function() {
				$('body .animate-box.item-animate').each(function(k) {
					var el = $(this);
					setTimeout(function() {
						var effect = el.data('animate-effect');
						if (effect === 'fadeIn') {
							el.addClass('fadeIn animated-fast');
						} else if (effect === 'fadeInLeft') {
							el.addClass('fadeInLeft animated-fast');
						} else if (effect === 'fadeInRight') {
							el.addClass('fadeInRight animated-fast');
						} else {
							el.addClass('fadeInUp animated-fast');
						}
						el.removeClass('item-animate');
					}, k * 200, 'easeInOutExpo');
				});
			}, 100);
		};

		var queueElement = function($el) {
			if (!$el.hasClass('animated-fast') && !$el.hasClass('item-animate')) {
				$el.addClass('item-animate');
				runAnimateQueue();
			}
		};

		var queueServicesSection = function() {
			var $pending = $('#fh5co-services .animate-box').not('.animated-fast').not('.item-animate');
			if (!$pending.length) {
				return;
			}
			$pending.addClass('item-animate');
			runAnimateQueue();
		};

		$('.animate-box').waypoint(function(direction) {
			if (direction !== 'down' || $(this.element).hasClass('animated-fast')) {
				return;
			}
			var $el = $(this.element);
			if ($el.closest('#fh5co-services').length) {
				queueServicesSection();
			} else {
				queueElement($el);
			}
		}, { offset: '85%' });

		if ($('#fh5co-services').length) {
			$('#fh5co-services').waypoint(function(direction) {
				if (direction === 'down') {
					queueServicesSection();
				}
			}, { offset: 'bottom-in-view' });
		}
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var revealVisibleAnimateBoxes = function() {
		$('.animate-box').each(function() {
			var $el = $(this);
			if ($el.hasClass('animated-fast')) {
				return;
			}
			var rect = this.getBoundingClientRect();
			if (rect.top >= window.innerHeight * 0.92 || rect.bottom <= 0) {
				return;
			}
			var effect = $el.data('animate-effect');
			if (effect === 'fadeIn') {
				$el.addClass('fadeIn animated-fast');
			} else if (effect === 'fadeInLeft') {
				$el.addClass('fadeInLeft animated-fast');
			} else if (effect === 'fadeInRight') {
				$el.addClass('fadeInRight animated-fast');
			} else {
				$el.addClass('fadeInUp animated-fast');
			}
		});
	};

	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		if (!owl.length) {
			return;
		}
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
		});
	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#fh5co-counter').length > 0 ) {
			$('#fh5co-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Parallax
	var parallax = function() {
		if ($.fn.stellar) {
			$(window).stellar();
		}
	};

	
	$(function(){
		try {
			mobileMenuOutsideClick();
			parallax();
			offcanvasMenu();
			burgerMenu();
			contentWayPoint();
			dropdown();
			testimonialCarousel();
			goToTop();
			counter();
			counterWayPoint();
			setTimeout(revealVisibleAnimateBoxes, 200);
			$(window).on('load', function() {
				revealVisibleAnimateBoxes();
				if (typeof Waypoint !== 'undefined' && Waypoint.refreshAll) {
					Waypoint.refreshAll();
				}
				setTimeout(revealVisibleAnimateBoxes, 300);
			});
		} catch (err) {
			if (window.console && console.error) {
				console.error(err);
			}
			$('.animate-box').css('opacity', 1);
		} finally {
			loaderPage();
		}
	});


}());
