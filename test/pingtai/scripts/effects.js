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
    }
    else {
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
         
         this.interval = setInterval(function () {
            _this.toRight();
         }, 3000);
     };
Focus.prototype.init = function () {
    var _this = this;
    this.interval = setInterval(function () {
       _this.toRight();
    }, 3000);

    this.pointLinks.click(
    function () {
        _this.handleSlide(this);
    });
};

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
