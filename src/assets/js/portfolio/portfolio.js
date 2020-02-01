(function($) {
	"use strict";
	$(document).ready(function(){
		$( '.ya-portfolio' ).each(function(){
			var $this 			= $(this);
			var $id 			= this.id;
			var $pf_id 			= ('#' + this.id );
			var $ajax_url 		= ya_portfolio.ajax_url;
			var $ya_style 		= $this.data('style');
			var $categories 	= $this.data('categories');
			var $max_page 		= $this.data('max_page');
			var $attributes 	= $this.data('attributes');
			var $number 		= $this.data('number');
			var $offset 		= $this.data('offset');
			var $orderby 		= $this.data('orderby');
			var $order 			= $this.data('order');
			var $container_id 	= $('#container_'+ $id);
			var $tab_id 		= $('#tab_'+ $id);
			var $container 		= $container_id; //The ID for the list with all the blog posts
			if( $ya_style == 'fitRows' ){
				$container.imagesLoaded().progress( function() {
					$container.isotope({ //Isotope options, 'item' matches the class in the PHP
						layoutMode : 'fitRows'
					});
				});
			}else{
				$container.imagesLoaded().progress( function() {
					$container.isotope({ //Isotope options, 'item' matches the class in the PHP
						layoutMode : 'masonry',
						percentPosition: true,
						masonry: {
						  columnWidth: '.portfolio-item'
						}
					});
				});
			}
		 
			//Add the class selected to the item that is clicked, and remove from the others
			var $optionSets = $tab_id,
			$optionLinks = $optionSets.find('li');
			$optionLinks.click(function(){
				var $this = $(this);
				// don't proceed if already selected
				if ( $this.hasClass('selected') ) {
				  return false;
				}
				var $optionSet = $this.parents($tab_id);
				$optionSets.find('.selected').removeClass('selected');
				$this.addClass('selected');
			 
				//When an item is clicked, sort the items.
				 var selector = $(this).attr('data-portfolio-filter');
				$container.isotope({ filter: selector });
				return false;
			});
			var $page = 1;
			var $btn_loadmore = $($pf_id + ' .btn-loadmore');
			$btn_loadmore.on("click", function(){
				if( $page >= $max_page ){
					return false;
				}
				$(this).addClass('btn-loading');
				jQuery.ajax({
					 type: "POST",
					 url: $ajax_url,
					 data: ({
						action : "sw_portfolio_ajax",
						catid  : $categories,
						numb   : $number,
						orderby: $orderby,
						order : $order,
						page : $page,
						style : $ya_style,
						attributes: $attributes
					}),
					 success: function(data) {
					 	console.log( data );
						var $newItems = $(data);
						if( $newItems.length > 0 ){
							$newItems.imagesLoaded( function(){
								setTimeout(function(){
									$container_id.isotope('reloadItems').isotope("insert",$newItems);
								}, 500);
							});
							$btn_loadmore.removeClass('btn-loading');
							$page = $page + 1;
							if( $newItems.length < $number ){
								$btn_loadmore.addClass( 'btn-loaded' );
							}
							if( $page >= $max_page ){
								$btn_loadmore.addClass( 'btn-loaded' );
							}

							
						 }else{
							$btn_loadmore.removeClass('btn-loading').addClass( 'btn-loaded' );
						 }
					 }
				 });
			});
		});
		$( '.item-popup' ).fancybox({
			helpers : {
				title : {
					type : 'over'
				}
			}
		});
	});
})(jQuery);


