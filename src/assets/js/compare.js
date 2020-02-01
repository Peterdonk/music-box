jQuery(document).ready(function($) {

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

    // ##### WIDGET ######

    $('.yith-woocompare-widget')

    // view table (click on compare
        .on('click', 'a.compare', function (e) {
            e.preventDefault();
            $('body').trigger('yith_woocompare_open_popup', { response: $(this).attr('href') });
        });


    function yith_add_query_arg(key, value)
    {
        key = escape(key); value = escape(value);

        var s = document.location.search;
        var kvp = key+"="+value;

        var r = new RegExp("(&|\\?)"+key+"=[^\&]*");

        s = s.replace(r,"$1"+kvp);

        if(!RegExp.$1) {s += (s.length>0 ? '&' : '?') + kvp;};

        //again, do what you will here
        return s;
    }

});