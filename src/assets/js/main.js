(function($) {
	"use strict";
	
	$(window).on( 'load',function(){
		$( '.child-top' ).each(function(){
			var data = $(this).data( 'color' );
			if( data != '' ){
				$(this).css( 'background', data );
				$(this).find( '.view-all > a' ).css( 'color', data );
			}
		});
		
		$( '.top-tap' ).each(function(){
			var data = $(this).data( 'color' );
			if( data != '' ){
				$(this).css( 'background', data );
				$(this).find( 'li.active a' ).css( 'color', data );

				$(this).find(".nav-tabs li a").hover(function(){
					$(this).css( 'color', data );
				}, function(){
					$(this).css( 'color', '#000' );
				});
			}
		});
		
		$( '.childcat-slider' ).each(function(){
			var data = $(this).data( 'color' );
			if( data != '' ){
				$(this).css( 'background', data );
				$(this).find('.childcat-content').css( 'border-left-color', data );
				$(this).find( '.view-all > a' ).css( 'color', data );

				$(this).find( '.childcat-content ul >li >a' ).hover(function(){
					$(this).css( {'background': data, 'color': '#fff'} );
				}, function(){
					$(this).css( {'background': 'transparent', 'color': '#000'} );
				});
			}
		});
		
		if( $( 'body' ).hasClass( 'tax-product_cat' ) || $( 'body' ).hasClass( 'post-type-archive-product' ) ) {
			$('.grid-view').on('click',function(){
				$('.list-view').removeClass('active');
				$('.grid-view').addClass('active');
				jQuery("ul.products-loop").fadeOut(300, function() {
					$(this).removeClass("list").fadeIn(300).addClass( 'grid' );			
				});
			});
			
			$('.list-view').on('click',function(){
				$( '.grid-view' ).removeClass('active');
				$( '.list-view' ).addClass('active');
				$("ul.products-loop").fadeOut(300, function() {
					jQuery(this).addClass("list").fadeIn(300).removeClass( 'grid' );
				});
			});
			/* End Change Layout */
		}
		
		/*
		** Blog Masonry
		*/
		$('body').find('.blog-content-grid').isotope({ 
			layoutMode : 'masonry'
		});
	});
	
	//Color change
	if (Cookies.get && Cookies.get("theme")) {
		try {
			var theme = "css/app-" + Cookies.get("theme") + ".css";
			$("#theme_color").attr("href", theme);
			$($('a[data-theme="' + Cookies.get("theme") + '"]').parent ('li')).addClass ('active');
		} catch (e) {
			console.log(e);
		}
	} else {
				$($('a[data-theme="orange"]').parent ('li')).addClass ('active');
	}
	
	$('a[data-theme]').on('click', function() {
		var color = $(this).data('theme');
		var theme = "css/app-" + color + ".css";
		Cookies.set('theme', color);
		location.reload();
	});
	
	//Advanced
	if (Cookies.get && Cookies.get("advanced")) {
		try {
			var advanced = Cookies.get("advanced");
			$("body").removeClass('ltr').removeClass('rtl').addClass(advanced);
			$('html').attr('dir', advanced);
			if (advanced === 'rtl')
				$('#rtl').attr('href', 'css/rtl.css');
			else
				advanced = 'ltr';
			$($('a[data-advanced="' + Cookies.get("advanced") + '"]').parent ('li')).addClass ('active');
		} catch (e) {
			console.log(e);
		}
	}
	
	$('a[data-advanced]').on('click', function() {
		var advanced = $(this).data('advanced');
		Cookies.set('advanced', advanced);
		location.reload();
	});
	
	/* 
	** Add Click On Ipad 
	*/
	$(window).on ('resize', function(){
		var $width = $(this).width();
		if( $width < 1199 ){
			$( '.primary-menu .nav .dropdown-toggle'  ).each(function(){
				$(this).attr('data-toggle', 'dropdown');
			});
		}
	});


	/*
	** Quickview and single product slider
	*/
	$('.fancybox').fancybox({
		'width'     : 830,
		'height'   : '500',
		'autoSize' : false,
		afterShow: function() {			
			//Compare button
			try {
				if (Cookies.get && Cookies.get("advanced") && Cookies.get("advanced") === 'rtl') {
					$('#quickview-container').addClass ('rtl').addClass ('woocommerce');
				} else {
					$('#quickview-container').removeClass ('rtl').removeClass ('woocommerce');
				}
				
				$(document).on('click', '.product a.compare', function (ev) {
					ev.preventDefault();
					$('body').trigger('yith_woocompare_open_popup', {response: 'ajax/compare.html', button: $(this)});
				});


				// open popup
				$('body').on( 'yith_woocompare_open_popup', function( e, data ) {
					var response = data.response;
					$.colorbox({
						href: response,
						iframe: true,
						width: '90%',
						height: '90%'
					});

					$(window).on ('resize', function () {
						$.colorbox.resize({
							width: '90%',
							height: '90%'
						});
					});
				});
			} catch (e) {}
			
			$('#quickview-container .add_to_wishlist').on ('click', function(ev) {
				ev.preventDefault();
				var $this = $(this);
				$this.siblings('.ajax-loading').css({
					'visibility': 'visible'
				});
				window.setTimeout(function() {
					$this.siblings('.ajax-loading').css('visibility', 'hidden');
					var msg = $('#yith-wcwl-popup-message');
					if (msg[0] === undefined) {
						$('body').prepend('<div id="yith-wcwl-popup-message" style="display:none"></div>');
						msg = $('#yith-wcwl-popup-message')
					}
					msg.html('<div id="yith-wcwl-message">Product added!</div>');
					msg.css('margin-left', '-' + $(msg).width() + 'px').fadeIn();
					window.setTimeout(function() {
						msg.fadeOut();
					}, 2000);
				}, 1000);
				return false;
			});
			
			$('#quickview-container .single_add_to_cart_button').on('click', function(ev) {
				ev.preventDefault();
				var $this = $(this);
				$this.removeClass('added').addClass('loading');
				window.setTimeout(function() {
					$this.removeClass('loading').addClass('added');
				}, 1000);
				return false;
			});
			
			$( '.quickview-container .product-images' ).each(function(){
				var $id 			= this.id;
				var $rtl 			= $('body').hasClass( 'rtl' );
				var $img_slider 	= $( '#' + $id + ' .product-responsive');
				var $thumb_slider 	= $( '#' + $id + ' .product-responsive-thumbnail' )
				$img_slider.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					fade: true,
					arrows: false,
					rtl: $rtl,
					asNavFor: $thumb_slider
				});
				$thumb_slider.slick({
					slidesToShow: 4,
					slidesToScroll: 1,
					asNavFor: $img_slider,
					arrows: true,
					focusOnSelect: true,
					rtl: $rtl,
					responsive: [				
					{
						breakpoint: 360,
						settings: {
							slidesToShow: 2    
						}
					}
					]
				});

				var el = $(this);
				setTimeout(function(){
					el.removeClass("loading");
				}, 1000);
			});
		}
	});
	
	//Compare button
	try {
		 $(document).on('click', '.product a.compare', function (ev) {
			ev.preventDefault();
			$('body').trigger('yith_woocompare_open_popup', {response: 'ajax/compare.html', button: $(this)});
		});


		// open popup
		$('body').on( 'yith_woocompare_open_popup', function( e, data ) {
			var response = data.response;
			$.colorbox({
				href: response,
				iframe: true,
				width: '90%',
				height: '90%'
			});

			$(window).resize(function () {
				$.colorbox.resize({
					width: '90%',
					height: '90%'
				});
			});
		});
	} catch (e) {}
	
	//Add to wishlist
	$(document).on('click', '.add_to_wishlist:not(.added)', function(ev) {
        ev.preventDefault();
        var $this = $(this);
        $this.siblings('.ajax-loading').css({
            'visibility': 'visible',
            'margin-top': '-6px'
        });
        window.setTimeout(function() {
            $this.siblings('.ajax-loading').css('visibility', 'hidden');
            var msg = $('#yith-wcwl-popup-message');
            if (msg[0] === undefined) {
                $('body').append('<div id="yith-wcwl-popup-message" style="display:none"></div>');
                msg = $('#yith-wcwl-popup-message')
            }
            msg.html('<div id="yith-wcwl-message">Product added!</div>');
            msg.css('margin-left', '-' + $(msg).width() + 'px').fadeIn();
            window.setTimeout(function() {
                msg.fadeOut();
            }, 2000);
        }, 1000);
		return false;
    });
	
	//Add to cart
    $(document).on('click', '.add_to_cart_button:not(.external), .single_add_to_cart_button:not(.external)', function(ev) {
        ev.preventDefault();
        var $this = $(this);
        $this.removeClass('added').addClass('loading');
        window.setTimeout(function() {
            $this.removeClass('loading').addClass('added')
        }, 1000);
		return false;
    });
	
    $('.slideshow').owlCarousel2({
        navText: ['', ''],
        navClass: ['owl-custom-prev', 'owl-custom-next'],
        loop: !0,
        margin: 0,
        responsiveClass: !0,
		rtl: Cookies.get("advanced") === 'rtl',
        nav: !1,
        dots: !0,
        autoplay: !0,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            }
        }
    });
	/* 
	** Slider single product image
	*/
	$( '.product-images' ).each(function(){
		var $id 					= this.id;
		var $rtl 					= $('body').hasClass( 'rtl' );
		var $vertical			= $(this).data('vertical');
		var $img_slider 	= $( '#' + $id + ' .product-responsive');
		var $thumb_slider = $( '#' + $id + ' .product-responsive-thumbnail' );
		
		$img_slider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			fade: true,
			arrows: false,
			rtl: $rtl,
			asNavFor: $thumb_slider
		});
		$thumb_slider.slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			asNavFor: $img_slider,
			arrows: true,
			rtl: $rtl,
			vertical: $vertical,
			verticalSwiping: $vertical,
			focusOnSelect: true,
			responsive: [				
			{
				breakpoint: 360,
				settings: {
					slidesToShow: 2    
				}
			}
			]
		});

		var el = $(this);
		setTimeout(function(){
			el.removeClass("loading");
		}, 1000);
	});

	/*
	** Search on click
	*/
	$('.header-open').on('click', function(){
		$('.main-menu').toggleClass("open");
	});
	$('.main-menu .header-close').on('click', function(){
		$('.main-menu').removeClass("open");
	});

	/*
	**  show menu mobile
	*/
	$('.header-menu-categories .open-menu').on('click', function(){
		$('.main-menu').toggleClass("open");
	});

	$('.footer-mstyle1 .footer-menu .footer-search a').on('click', function(){
		$('.top-form.top-search').toggleClass("open");
	});
	$('.footer-mstyle1 .footer-menu .footer-more a').on('click', function(){
		$('.menu-item-hidden').toggleClass("open");
	});

	/*
	** Product listing order hover
	*/
	$('ul.orderby.order-dropdown li ul').hide(); 
	$("ul.order-dropdown > li").each( function(){
		$(this).hover( function() {
			$(this).find( '> ul' ).stop().fadeIn("fast");
		}, function() {
			$(this).find( '> ul' ).stop().fadeOut("fast");
		});
	});

	/*
	** Product listing select box
	*/
	$('.catalog-ordering .orderby .current-li a').html($('.catalog-ordering .orderby ul li.current a').html());
	$('.catalog-ordering .sort-count .current-li a').html($('.catalog-ordering .sort-count ul li.current a').html());

	/*
	** Menu hidden
	*/
	$('.product-categories')
	.find('li:gt(5)') /*you want :gt(4) since index starts at 0 and H3 is not in LI */
	.hide()
	.end()
	.each(function(){
		if($(this).children('li').length > 5){
			$(this).append(
				$('<li><a>See more   +</a></li>')
				.addClass('showMore')
				.on('click',function(){
					if($(this).siblings(':hidden').length > 0){
						$(this).html('<a>See less   -</a>').siblings(':hidden').show(400);
					}else{
						$(this).html('<a>See more   +</a>').show().siblings('li:gt(5)').hide(400);
					}
				})
				);
		}
	});

	/* 
	** Fix accordion heading state 
	*/
	$('.accordion-heading').each(function(){
		var $this = $(this), $body = $this.siblings('.accordion-body');
		if (!$body.hasClass('in')){
			$this.find('.accordion-toggle').addClass('collapsed');
		}
	});	

	/*
	** Cpanel
	*/
	$('#cpanel').collapse();

	$('#cpanel-reset').on('click', function(e) {

		if (document.cookie && document.cookie != '') {
			var split = document.cookie.split(';');
			for (var i = 0; i < split.length; i++) {
				var name_value = split[i].split("=");
				name_value[0] = name_value[0].replace(/^ /, '');

				if (name_value[0].indexOf(cpanel_name)===0) {
					$.cookie(name_value[0], 1, { path: '/', expires: -1 });
				}
			}
		}

		location.reload();
	});

	$('#cpanel-form').on('submit', function(e){
		var $this = $(this), data = $this.data(), values = $this.serializeArray();

		var checkbox = $this.find('input:checkbox');
		$.each(checkbox, function() {

			if( !$(this).is(':checked') ) {
				name = $(this).attr('name');
				name = name.replace(/([^\[]*)\[(.*)\]/g, '$1_$2');

				$.cookie( name , 0, { path: '/', expires: 7 });
			}

		})

		$.each(values, function(){
			var $nvp = this;
			var name = $nvp.name;
			var value = $nvp.value;

			if ( !(name.indexOf(cpanel_name + '[')===0) ) return ;

			name = name.replace(/([^\[]*)\[(.*)\]/g, '$1_$2');

			$.cookie( name , value, { path: '/', expires: 7 });

		});

		location.reload();

		return false;

	});

	$('a[href="#cpanel-form"]').on( 'click', function(e) {
		var parent = $('#cpanel-form'), right = parent.css('right'), width = parent.width();

		if ( parseFloat(right) < -10 ) {
			parent.animate({
				right: '0px',
			}, "slow");
		} else {
			parent.animate({
				right: '-' + width ,
			}, "slow");
		}

		if ( $(this).hasClass('active') ) {
			$(this).removeClass('active');
		} else $(this).addClass('active');

		e.preventDefault();
	});


	/*
	** Currency Selectbox
	*/
	$('.currency_switcher li a').on('click', function(){
		var $current = $(this).attr('data-currencycode');
		jQuery('.currency_w > li > a').html($current);
	});
	jQuery(document).ready(function(){
		$('.currency_converter .currency_w li > .currency_switcher  li:first-child > a').addClass('active');
		var currency_show = jQuery('ul.currency_switcher li a.active').html();
		jQuery('.currency_to_show').html(currency_show);	
	}); 
	
	/*
	** Language
	*/
	var $current ='';
	$('#lang_sel ul > li > ul li a').on('click',function(){
		$current = $(this).html();
		$('#lang_sel ul > li > a.lang_sel_sel').html($current);
		$a = $.cookie('lang_select_etrostore', $current, { expires: 1, path: '/'}); 
	});
	
	if( $.cookie('lang_select_etrostore') && $.cookie('lang_select_etrostore').length > 0 ) {
		$('#lang_sel ul > li > a.lang_sel_sel').html($.cookie('lang_select_etrostore'));
	}

	$('#lang_sel ul > li.icl-ar').on ('click', function(){
		$('#lang_sel ul > li.icl-en').removeClass( 'active' );
		$(this).addClass( 'active' );
		$.cookie( 'etrostore_lang_en' , 1, { path: '/', expires: 1 });
	});
	
	$('#lang_sel ul > li.icl-en').on ('click', function(){
		$('#lang_sel ul > li.icl-ar').removeClass( 'active' );
		$(this).addClass( 'active' );
		$.cookie( 'etrostore_lang_en' , 0, { path: '/', expires: -1 });
	});
	
	var Etrostore_Lang = $.cookie( 'etrostore_lang_en' );
	if( Etrostore_Lang == null ){
		$('#lang_sel ul > li.icl-en').addClass( 'active' );
		$('#lang_sel ul > li.icl-ar').removeClass( 'active' );
	}else{
		$('#lang_sel ul > li.icl-en').removeClass( 'active' );
		$('#lang_sel ul > li.icl-ar').addClass( 'active' );
	}
	
	/* Header Top5 */
	$(".top3 .sidebar-log").on ('click', function(){
		$(".top3 .widget_nav_menu .widget-inner ul").slideToggle();
	});

	$(".sw_top .stick-sr").on ('click', function(){
		$(".sw_top >.top-form.top-search").slideToggle();
	});

	/* Footer Respon*/
	if ($(window).width() < 768) {	
		$('.footer .widget_nav_menu .widgettitle').append('<span class="icon-footer"></span>');
		$('.footer .wrap-newletters h3').append('<span class="icon-footer"></span>');
		$('.footer .infomation h2').append('<span class="icon-footer"></span>');
		
		$(".footer .widget_nav_menu .widgettitle").each(function(){
			$(this).on('click', function(){
				$(this).parent().find("ul.menu").slideToggle();
			});
		});		
		$(".footer .infomation h2").on ('click', function(){
			$(".footer .infomation .info-support").slideToggle();
		});
		$(".footer .wrap-newletters h3").on ('click', function(){
			$(".footer .wrap-newletters .info-newsletter").slideToggle();
		});	
	}

	if ($(window).width() < 991) {
		$('.sw-accordion-product .box-slider-title h2').append('<span class="icon-footer"></span>');
		$(".sw-accordion-product .box-slider-title").each(function(){
			$(this).on('click', function(){
				$(this).parent().find(".wrap-content").slideToggle();
			});
		});
	}
	/*
	** Clear header style 
	*/
	$( '.etrostore-logo' ).on('click', function(){
		$.cookie("etrostore_header_style", null, { path: '/' });
		$.cookie("etrostore_footer_style", null, { path: '/' });
	});
	
	/*
	** Back to top
	**/
	$("#etrostore-totop").hide();
	var wh = $(window).height();
	var whtml = $(document).height();
	$(window).scroll(function () {
		if ($(this).scrollTop() > whtml/10) {
			$('#etrostore-totop').fadeIn();
		} else {
			$('#etrostore-totop').fadeOut();
		}
	});
	
	$('#etrostore-totop').on ('click', function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	/* end back to top */

	/*
	** Fix js 
	*/
	$('.wpb_map_wraper').on('click', function () {
		$('.wpb_map_wraper iframe').css("pointer-events", "auto");
	});

	$( ".wpb_map_wraper" ).on('mouseleave', function() {
		$('.wpb_map_wraper iframe').css("pointer-events", "none"); 
	});

	/*
	** Hover on mobile and tablet
	*/
	var mobileHover = function () {
		$('*').on('touchstart', function () {
			$(this).trigger('hover');
		}).on('touchend', function () {
			$(this).trigger('hover');
		});
	};
	mobileHover();
	
	
	/*
	** Twice click 
	*/
	$(document).on('click.twice', '.open [data-toggle="dropdown"]', function(e){
		var $this = $(this), href = $this.attr('href');
		e.preventDefault();
		window.location.href = href;
		return false;
	});
	

	/*
	** Change Layout 
	*/
	$(window).on('load', function() {	
		if( $( 'body' ).hasClass( 'tax-product_cat' ) || $( 'body' ).hasClass( 'post-type-archive-product' ) ) {
			$('.grid-view').on('click',function(){
				$('.list-view').removeClass('active');
				$('.grid-view').addClass('active');
				jQuery("ul.products-loop").fadeOut(300, function() {
					$(this).removeClass("list").fadeIn(300).addClass( 'grid' );			
				});
			});
			
			$('.list-view').on('click',function(){
				$( '.grid-view' ).removeClass('active');
				$( '.list-view' ).addClass('active');
				$("ul.products-loop").fadeOut(300, function() {
					jQuery(this).addClass("list").fadeIn(300).removeClass( 'grid' );
				});
			});
			/* End Change Layout */
		} 
		/*
		** Blog Masonry
		*/
		$('body').find('.blog-content-grid').isotope({ 
			layoutMode : 'masonry'
		});
	});

	$(window).on('scroll', function() {    
		var whtop = $(window).scrollTop(); 
		if (whtop > 0) {
			$(".header-style4").addClass("header-ontop");
		} else {
			$(".header-style4").removeClass("header-ontop");
		} 
	});
	
	/*remove loading*/
	$(".sw-woo-tab").fadeIn(300, function() {
		$(this).removeClass("loading");
	});
	$(".responsive-slider").fadeIn(300, function() {
		$(this).removeClass("loading");
	});
	/*Vertical Menu*/
	if($(window).width() >= 992 && $(window).width() <= 1191){
		jQuery('.home-style1 .vertical-megamenu')
		.find(' > li:gt(4) ') 
		.hide()
		.end()
		.each(function(){
			if($(this).children('li').length > 4){ 
				$(this).append(
					$('<li><a class="open-more-cat">All Categories</a></li>')
					.addClass('showMore')
					.on('click', function(){
						if($(this).siblings(':hidden').length > 0){
							$(this).html('<a class="close-more-cat">Less Categories</a>').siblings(':hidden').show(400);
						}else{
							$(this).html('<a class="open-more-cat">All Categories</a>').show().siblings('li:gt(4)').hide(400);
						}
					})
					);
			}
		});
	}
	if($(window).width() >= 1191){
		jQuery('.home-style1 .vertical-megamenu')
		.find(' > li:gt(9) ') 
		.hide()
		.end()
		.each(function(){
			if($(this).children('li').length > 9){ 
				$(this).append(
					$('<li><a class="open-more-cat">All Categories</a></li>')
					.addClass('showMore')
					.on('click', function(){
						if($(this).siblings(':hidden').length > 0){
							$(this).html('<a class="close-more-cat">Less Categories</a>').siblings(':hidden').show(400);
						}else{
							$(this).html('<a class="open-more-cat">All Categories</a>').show().siblings('li:gt(9)').hide(400);
						}
					})
					);
			}
		});
	}

	/*Vertical Menu*/
	if($(window).width() >= 992 && $(window).width() <= 1191){
		jQuery('.home-style2 .vertical-megamenu')
		.find(' > li:gt(6) ') 
		.hide()
		.end()
		.each(function(){
			if($(this).children('li').length > 6){ 
				$(this).append(
					$('<li><a class="open-more-cat">All Categories</a></li>')
					.addClass('showMore')
					.on('click', function(){
						if($(this).siblings(':hidden').length > 0){
							$(this).html('<a class="close-more-cat">Less Categories</a>').siblings(':hidden').show(400);
						}else{
							$(this).html('<a class="open-more-cat">All Categories</a>').show().siblings('li:gt(6)').hide(400);
						}
					})	
					);
			}
		});
	}
	if($(window).width() >= 1191){
		jQuery('.home-style2 .vertical-megamenu')
		.find(' > li:gt(10) ') 
		.hide()
		.end()
		.each(function(){
			if($(this).children('li').length > 10){ 
				$(this).append(
					$('<li><a class="open-more-cat">All Categories</a></li>')
					.addClass('showMore')
					.on('click', function(){
						if($(this).siblings(':hidden').length > 0){
							$(this).html('<a class="close-more-cat">Less Categories</a>').siblings(':hidden').show(400);
						}else{
							$(this).html('<a class="open-more-cat">All Categories</a>').show().siblings('li:gt(10)').hide(400);
						}
					})
					);
			}
		});
	}
	
	/*Verticle Menu*/
	if($('body').hasClass('home-style3')){
		jQuery('.vertical-megamenu')
		.find(' > li:gt(9) ') 
		.hide()
		.end()
		.each(function(){
			if($(this).children('li').length > 9){ 
				$(this).append(
					$('<li><a class="open-more-cat">All Categories</a></li>')
					.addClass('showMore')
					.on('click', function(){
						if($(this).siblings(':hidden').length > 0){
							$(this).html('<a class="close-more-cat">Less Categories</a>').siblings(':hidden').show(400);
						}else{
							$(this).html('<a class="open-more-cat">All Categories</a>').show().siblings('li:gt(9)').hide(400);
						}
					})
					);
			}
		});
	}

	/*Vertical Menu*/
	if($(window).width() >= 992 && $(window).width() <= 1191){
		jQuery('.home-style4 .vertical-megamenu')
		.find(' > li:gt(6) ') 
		.hide()
		.end()
		.each(function(){
			if($(this).children('li').length > 6){ 
				$(this).append(
					$('<li><a class="open-more-cat">All Categories</a></li>')
					.addClass('showMore')
					.on('click', function(){
						if($(this).siblings(':hidden').length > 0){
							$(this).html('<a class="close-more-cat">Less Categories</a>').siblings(':hidden').show(400);
						}else{
							$(this).html('<a class="open-more-cat">All Categories</a>').show().siblings('li:gt(6)').hide(400);
						}
					})	
					);
			}
		});
	}
	if($(window).width() >= 1191){
		jQuery('.home-style4 .vertical-megamenu')
		.find(' > li:gt(10) ') 
		.hide()
		.end()
		.each(function(){
			if($(this).children('li').length > 10){ 
				$(this).append(
					$('<li><a class="open-more-cat">All Categories</a></li>')
					.addClass('showMore')
					.on('click', function(){
						if($(this).siblings(':hidden').length > 0){
							$(this).html('<a class="close-more-cat">Less Categories</a>').siblings(':hidden').show(400);
						}else{
							$(this).html('<a class="open-more-cat">All Categories</a>').show().siblings('li:gt(10)').hide(400);
						}
					})
					);
			}
		});
	}


	$(".widget_nav_menu li.menu-compare a").on ('hover', function() {
		$(this).css('cursor','pointer').attr('title', 'Compare');
	}, function() {
		$(this).css('cursor','auto');
	});
	$(".widget_nav_menu li.menu-wishlist a").on ('hover', function() {
		$(this).css('cursor','pointer').attr('title', 'My Wishlist');
	}, function() {
		$(this).css('cursor','auto');
	});
	$("a.add_to_cart_button").attr('title', 'Add to Cart');
	$("a.compare").attr('title', 'Add to Compare');
	$(".yith-wcwl-add-button a").attr('title', 'Add to wishlist');
	$("a.fancybox").attr('title', 'Quickview');
	$("a.add_to_wishlist").attr('title', 'Add to wishlist');
}(jQuery));

/*
** Check comment form
*/
function submitform(){
	if(document.commentform.comment.value=='' || document.commentform.author.value=='' || document.commentform.email.value==''){
		alert('Please fill the required field.');
		return false;
	} else return true;
}
