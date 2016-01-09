// 广告 关闭
var closeAd = function () {
    var handleClose = function () {
        $(this).parent().hide();
        return false;
    };
    $('.ad .close').click(handleClose);
};

// 搜索下拉
var searchSelect = function () {
    var showSelect = function () {
        var selectWrap = $(this).parent();
        selectWrap.toggleClass('search_box_hover');
        return false;
    };
    var hideSelect = function () {
        $('.search_box_1').removeClass('search_box_hover');
    };
    var handleSelect = function () {
        var selectWrap = $(this).parents('.search_box_1');
        selectWrap.find('strong').html(this.innerText);
        selectWrap.removeClass('search_box_hover');
    };
    $('.search_box_1 li').click(handleSelect);
    $('.search_box_1 strong').click(showSelect);
    if ($('.search_box_1 strong').length > 0) {
        $(document.body).click(hideSelect);
    }
};

// 分类导航
var menu = function () {
    var list = $('.sort');
    var menuLinks = $('.menu li');
    
    $('.close-sort').click(
    function () {
        list.hide();
        menuLinks.removeClass('on');
        return false;
    });
    
    menuLinks.hover(
    function () {
        $(this).addClass('on');
        list.eq($(this).index()).show();
    }, 
    function () {
        $(this).removeClass('on');
        list.eq($(this).index()).hide();
    });
    list.hover(
    function () {
        $(this).show();
        menuLinks.eq($(this).index() - 1).addClass('on');
    }, 
    function () {
        $(this).hide();
        menuLinks.eq($(this).index() - 1).removeClass('on');
    });
};

// tab
var tab = function () {
    $('.tab_t').click(
    function () {
        var conSelector = '.' + $(this).attr('data-to');
        $(this).parents('.tab').find('.tab_t').removeClass('on');
        $(this).addClass('on');
        $(this).parents('.tab').find('.tab_c').hide();
        $(this).parents('.tab').find(conSelector).show();
    });
};

// scrollTop
var scrollTop = function () {
    var speed = 30
    move2.innerHTML = move1.innerHTML
    function Marquee(){
        if (move1.scrollHeight - move.scrollTop <= 0) 
            move.scrollTop -= move1.offsetHeight
        else {
            move.scrollTop++
        }
    }
    
    var MyMar = setInterval(Marquee, speed)
    move.onmouseover = function(){
        clearInterval(MyMar)
    }
    move.onmouseout = function(){
        MyMar = setInterval(Marquee, speed)
    }
};

// 渐变焦点图
var Focus = function (wrapId) {
    if (typeof wrapId === 'String') {
        this.wrap = $('#' + wrapId);
    } else {
        this.wrap = wrapId;
    }
    
    this.items = this.wrap.find('.item');
    this.pointLinks = this.wrap.find('.carousel-indicators li');
    this.now = 0;
    this.interval; 
    
    this.init();
};
Focus.prototype.move = function () {
    this.pointLinks.removeClass('active');
    this.pointLinks.eq(this.now).addClass('active');
    
    this.items.fadeOut();
    this.items.eq(this.now).fadeIn(1000);
};

Focus.prototype.toLeft = function () {
    this.now--;
    if (this.now < 0) {
        this.now = this.items.length - 1;
    }
    this.move();
    return false;
};

Focus.prototype.toRight = function () {
    this.now++;
    if (this.now > this.items.length - 1) {
        this.now = 0;
    }
    this.move();
    return false;
};

 Focus.prototype.handleSlide = function (link) {
     var _this = this;
     var slide = $(link).attr('data-slide-to');
     clearInterval(this.interval);
     
     this.now = slide;
     this.move();
     
     this.interval = setInterval(
     function () {
        _this.toRight();
     }, 3000);
 };
Focus.prototype.init = function () {
    var _this = this;
    this.interval = setInterval(
    function () {
       _this.toRight();
    }, 
    3000);

    this.pointLinks.click(
    function () {
        _this.handleSlide(this);
    });
};

// 展开分类
var startMenu = function () {
    var menu  = $('.menu');
    
    $('.nav_all').hover(
        function () {
            menu.show();
        },
        function () {
            menu.hide();
        });
    
    menu.hover(
        function () {
            $(this).show();
        },
        function () {
            $(this).hide();
        });
    
};

// 显示特定区域
var toggleShowArea = function () {
    
    $('.show_btn').click(function () {
        
        $(this).toggleClass('on');
        if ($(this).attr('data-show')) {
            $($(this).attr('data-show')).toggleClass('hide');
        }
        
        return false;
    });
};

// select
var selectSearch = function () {
    
    $('.checkbox_list .submit_btn').click(function () {
        var list = $(this).parents('.checkbox_list');
        var hrefParams = [];
        
        list.find('input[name="list_val"]').each(function () {
            if ($(this).prop('checked')) {
                hrefParams.push($(this).val());
            }
        });
        
        location.href = $(this).attr('data-href') + '?data=' + hrefParams.join();
        
        return false;
    });
    
    
    $('.checkbox_list .checkbox_more_btn').click(function () {
        var list = $(this).parents('.checkbox_list');
        
        $(this).hide();
        
        list.addClass('checkbox_selected');
        list.find('.control_btns').show();
        
        list.find('.submit_btn').addClass('disabled_btn');
        
        return false;
    });
    
    
    $('.checkbox_list input').click(function () {
        
        if ($('.checkbox_list input:checked').length > 0) {
            $('.checkbox_list .submit_btn').removeClass('disabled_btn');
        }
    });
    $('.checkbox_list .cancel_btn').click(function () {
        $('.checkbox_list input').prop('checked', false);
        
        $('.checkbox_more_btn').show();
        $('.checkbox_list').removeClass(' checkbox_selected');
        $('.checkbox_list').find('.control_btns').hide();
        
        return false;
    });
};


var showBigPic = function () {
    // 详情页显示图片
    
    var detailImg = $('.detail_img');
    var links = detailImg.find(' .overview li');
    
    links.hover(function () {
        links.removeClass('on')
        $(this).addClass('on');
        
        detailImg.find('.big img').attr('src', $(this).attr('data-pic'));
    });
};

var changeNum = function () {
    // 详情页增加减少数量
    
    var lessBtn = $('.change_less');
    var moreBtn = $('.change_more');
    
    lessBtn.click(function () {
        var num = $(this).parents('.change_num').find('input');
		var numVal = Number(num.val()) - 1;
        num.val(numVal ? numVal : 1);
    });
    
    moreBtn.click(function () {
		var num = $(this).parents('.change_num').find('input');
		var numVal = Number(num.val()) + 1;
        num.val(numVal);
    });
};

var backService = function () {
    var root = $('.back_service');
    
    root.find('span').click(function () {
        root.find('span').removeClass('on');
        $(this).addClass('on')
    });
};

/*
 * 表单
 */

var focusInput = function () {
    var inputs = $('.focus');
    inputs.focus(function () {
        $(this).parent().addClass('input_focus');
    });
    inputs.blur(function () {
        $(this).parent().removeClass('input_focus');
    });
};

/*

	方案批量删除
*/
var deleteList = function () {
	var checkAllElem = $('.config_list_check_all');
	var deleteElem = $('.config_list_delete');

	var listItem = $('.config_list_check');

	if (!checkAllElem.length || !deleteElem.length) return;

	var checkAll = function (isTrue) {
		listItem.prop('checked', isTrue);
	};

	checkAllElem.on('change', function () {
		checkAll(this.checked);
	});

	deleteElem.on('click', function () {
		listItem.each(function () {
			if (this.checked) $('.win_wrap, .win_back').show();
		});
		return false;
	});


	var close =  $('.win_close');
	var done = $('.win_done');
	var deleteOne = $('.config_list_delete_item');

	close.on('click', function () {
		$('.win_wrap, .win_back').hide();
		return false;
	});
	
	done.on('click', function () {
		listItem.each(function () {
			if (this.checked) $(this).parents('li').remove();
		});

		$('.win_wrap, .win_back').hide();
		return false;
	});

	deleteOne.on('click', function () {

		$('.win_wrap, .win_back').show();
		listItem.prop('checked', false);
		$(this).parents('li').find('.config_list_check').prop('checked', true);

		return false;
	});



};


var selectProduct = function () {
	$('.product span').click(function () {
		$(this).addClass('on').siblings().removeClass('on');	
	});
};

var configMore = function () {
    var configs = $('.config_more');
    
    var wrap, wrapInfo;
    
    $('.config_more_show').click(function () {
        wrap = $(this).parents('li').find('.config_more');
        wrapInfo = $(this).parents('li').find('.config_more_info');
        
        configs.addClass('hide');
        wrap.removeClass('hide');
        return false;
    });
    
    $('.config_more').click(function () {
        return false;
    });
    
    $(document.body).click(function () {
        if (!wrap.length) return;
        
        var html = '';
        var inputs = wrap.find('select, input');
        
        var i;
        
        for (i = 0; i < inputs.length;  i++) {
            if (inputs.eq(i).val() != '') html += inputs.eq(i).val() + ' ';
        }
        
        wrap.addClass('hide');
        
        wrapInfo.html(html);
        
        
    });
};



/*
 * 初始化
 */
if ($('.login_page, .log2_page').length ||
    $('.step3').length) {
    focusInput();
}
if ($('.detail_page').length) {
    $('#detail_slide').tinycarousel({
        bullets  : true,
        animationTime : 500
    });
    $('#more_shops').tinycarousel({
        bullets  : true,
        axis   : 'y',
        animationTime : 500
    });
    
    showBigPic();
    changeNum();
    backService();
    tab();
    
}
if ($('.list_page').length) {
    menu();
    startMenu();
    searchSelect();
    toggleShowArea();
    selectSearch();
}
if ($('.main_page').length) {

    for (var i = 0; i < $('.slide').length; i++) {
        new Focus($('.slide').eq(i));
    }
    $('#slider1').tinycarousel({
        bullets  : true
    });
    
    
    searchSelect();
    closeAd();
    menu();
    tab();
    scrollTop();

}

if ($('.plan_page').length) {
	deleteList();
	changeNum();
}

if ($('.parity_page').length) {
	selectProduct();
	toggleShowArea();
	changeNum();
	deleteList();
    configMore();
}