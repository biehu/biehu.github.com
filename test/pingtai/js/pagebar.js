// 比价条 效果

(function () {
    var root = $('.price_list');
    var pos = root.css('right');
    
    var clearBar = function () {
        $('.price_left a').removeClass('on');
        $('.price_main > div').addClass('hide');
    };
    
    var isOpen = function () {
        return root.css('right') == '0px';
    };
    
    var isShow = function (s) {
        return !$(s).hasClass('hide');
    };
    
    var showBarBtn = function (btn) {
        $('.price_left a').removeClass('on');
        $(btn).addClass('on');
    };
    
    var showBarCon = function (con) {
        $('.price_main > div').addClass('hide');
        $(con).removeClass('hide');
    };
    
    $('.price_left2').click(function () {
		setPriceTabConHeight();

        if (isShow('.price_tab')) {
            root.animate({right: pos}, '500', function () {
                 clearBar();
            });
            return false;
        } 
        
        if(!isOpen()) {
            root.animate({right: 0}, '500');
        }
        
        showBarCon('.price_tab');
        showBarBtn(this);
        
        return false;
    });
    $('.price_left1').click(function () {
	
		setPriceTabConHeight();
        
        if (isShow('.service_tab')) {
            root.animate({right: pos}, '500', function () {
                 clearBar();
            });
            return false;
        } 
        
        if(!isOpen()) {
            root.animate({right: 0}, '500');
        }
        
        showBarCon('.service_tab');
        showBarBtn(this);
        
        return false;
    });
    
    $('.price_left3').click(function () {
        window.scrollTo(0, 0);
        return false;
    });


	// 内容滚动条

	var setPriceTabConHeight = function () {
		var btn = $('.price_btn_wrap');
		var con = $('.price_tab_main');

		var winHeight = $(window).height();

		con.height(winHeight - btn.height());
	};

})();
