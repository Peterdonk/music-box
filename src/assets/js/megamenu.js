(function($){
	$.fn.megamenu = function(options) {
		options = jQuery.extend({
			  wrap:'.nav-mega',
			  speed: 0,
			  justify: "",
			  rtl: false,
			  mm_timeout: 0
		  }, options);
		var menuwrap = $(this);
		buildmenu(menuwrap);
		/* Build menu */
		function buildmenu(mwrap){
			mwrap.find('.etrostore-mega > li').each(function(){
				var menucontent 		= $(this).find(".dropdown-menu");
				var menuitemlink 		= $(this).find(".item-link:first");
		    	var menucontentinner 	= $(this).find(".nav-level1");
		    	var mshow_timer = 0;
		    	var mhide_timer = 0;
		     	var li = $(this);
		     	var islevel1 = (li.hasClass('level1'))?true:false;
				var havechild = (li.hasClass('dropdown'))?true:false;
				li.mouseenter(function(el){
					el.stopPropagation();
					clearTimeout(mhide_timer);
					clearTimeout(mshow_timer);
					addHover(li);
					if(havechild){
						positionSubMenu(li, islevel1);						
					}
				}).mouseleave(function(el){ //return;
					clearTimeout(mshow_timer);
					clearTimeout(mhide_timer);					
					removeHover(li);
			    });
			});
		}		
		// Add class hover to li
		function addHover(el){
			$(el).addClass('hover');
			
		}
		// Remove class hover to li
		function removeHover(el){
			$(el).removeClass('hover');
		}
		// Position Submenu
		function positionSubMenu(el, islevel1){
			menucontent 		= $(el).find(".dropdown-menu");
			menuitemlink 		= $(el).find(".item-link");
	    	menucontentinner 	= $(el).find(".nav-level1");
	    	wrap_O				= ( options.rtl == false ) ? menuwrap.offset().left : ( $(window).width() - (menuwrap.offset().left + menuwrap.outerWidth()) );
	    	wrap_W				= menuwrap.outerWidth();
	    	menuitemli_O		= ( options.rtl == false ) ? menuitemlink.parent('li').offset().left : ( $(window).width() - (menuitemlink.parent('li').offset().left + menuitemlink.parent('li').outerWidth()) );
	    	menuitemli_W		= menuitemlink.parent('li').outerWidth();
	    	menuitemlink_H		= menuitemlink.outerHeight();
	    	menuitemlink_W		= menuitemlink.outerWidth();
	    	menuitemlink_O		= ( options.rtl == false ) ? menuitemlink.offset().left : ( $(window).width() - (menuitemlink.offset().left + menuitemlink.outerWidth()) );
	    	menucontent_W		= menucontent.outerWidth();
			
			if (islevel1) { 				
				
				if(options.justify == "left"){
					var wrap_RE = wrap_O + wrap_W;

					var menucontent_RE = menuitemlink_O + menucontent_W;
					
					if( menucontent_RE >= wrap_RE ) { 
						if( options.rtl == false ){
							menucontent.css({
								'left':wrap_RE - menucontent_RE + menuitemlink_O - menuitemli_O + 'px'
							}); 
						}else{
							menucontent.css({
								'left': 'auto',
								'right':wrap_RE - menucontent_RE + menuitemlink_O - menuitemli_O + 'px'
							});
						}
					}
				} 
			}else{
				_leftsub = 0;
				menucontent.css({
					'top': menuitemlink_H*0 +"px",
					'left': menuitemlink_W + _leftsub + 'px'
				})
				
				if(options.justify == "left"){
					var wrap_RE = wrap_O + wrap_W;
					var menucontent_RE = menuitemli_O + menuitemli_W + _leftsub + menucontent_W;
											
					if( menucontent_RE >= wrap_RE ) { 
						menucontent.css({
							'left': _leftsub - menucontent_W + 'px'
						}); 
					}
				} else if( options.justify == "right" ) {
					var wrap_LE = wrap_O;
					
					var menucontent_LE = menuitemli_O - menucontent_W + _leftsub;
											
					if( menucontent_LE <= wrap_LE ) { // Menu content exceeding the outer box
						menucontent.css({
							'left': menuitemli_W - _leftsub + 'px'
						}); // Limit megamenu inside the outer box
					} else {
						menucontent.css({
							'left':  - _leftsub - menucontent_W + 'px'
						}); // Limit megamenu inside the outer box
					}
				}
			}
		}
	};
	$( 'document' ).ready(function(){
		$rtl = $('body').hasClass('rtl');
		$('.header-mid > .container').megamenu({ 
			wrap:'.nav-mega',
			justify: 'left',
			rtl: $rtl
		});
		$('.header-bottom > .container').megamenu({ 
			wrap:'.nav-mega',
			justify: 'left',
			rtl: $rtl
		});
		$('.vertical-megamenu > li').each(function(){
			var target = $(this).find( '.menu-color' );
			var tar_color = target.data( 'color' );
			target.css( 'background', tar_color );
			$(this).on( 'mouseenter',function(){
				target.css( 'width', '100%' );
				target.parent().css( 'color', '#fff' );
			}).on('mouseleave', function(){
				target.css( 'width', '4px' );
				target.parent().css( 'color', '#222222' );
			});
		});
	});
	
})(jQuery);