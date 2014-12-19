/*
 * 滑动
 */
var root = $('.slide-box');

var changePos = function (index) {
    
    if (index > 0 && index < 4) {
        root.find('.slide-box-list').animate({
            left: -(index - 1) * 200
        });
    }
    else if (index === 4) {
        root.find('.slide-box-list').animate({
            left: -400
        });
    }
};

var changeNav = function (index) {
    var items = $('.nav').find('a');
    
    items.removeClass('on');
    items.eq(index).addClass('on');
};

var slide = function () {
    $(".slide-box dt, .editor-pic").hover(function() {
        $(this).find('.bg').animate({
            opacity: 0
        })
    }, function() {
        $(this).find('.bg').animate({
            opacity: 0.6
        })
    });
    
    $(".slide-box dt").click(function() {
        var _this = $(this),
            index = parseInt(_this.attr('x_index'));
    
        _this.siblings('dd:visible').animate({width: 0},function(){
                $(this).hide();
                _this.hide();
            }
        );
    
        _this.next("dd:hidden").show().animate({width: "798px"},function(){
            _this.siblings('dt:hidden').width(198).show();
        });
        
        changePos(index);
        changeNav(index);
    });

};
    
    
/*
 * 焦点图
 */
var innerWrap, pageNum, wrap;
var time = 2000;

var setElem = function (elem) {
    wrap = elem.parents('.focus');
    innerWrap = wrap.find('.focus-list');
    pageNum = innerWrap.find('li').length;
};

var setShowPic = function (type) {
    var activeIndex = wrap.data('activeIndex');
    if (type === 1) {
        innerWrap.animate({'margin-left': activeIndex === 0 ?
            0 : -Math.abs(innerWrap.find('li')[activeIndex].offsetLeft) * activeIndex + 'px'});
    }
    else {
        innerWrap.animate({'margin-left': activeIndex === 0 ?
            0 : -Math.abs(innerWrap.find('li')[activeIndex].offsetLeft)+ 'px'});
    }
};

var setShowPic1 = function (type) {
    var activeIndex = wrap.data('activeIndex');
    if (type === 1) {
        innerWrap.animate({'margin-top': activeIndex === 0 ?
            0 : -Math.abs(innerWrap.find('li')[activeIndex].offsetTop) * activeIndex + 'px'});
    }
    else {
        innerWrap.animate({'margin-top': activeIndex === 0 ?
            0 : -Math.abs(innerWrap.find('li')[activeIndex].offsetTop)+ 'px'});
    }
};

var scrollLeft = function (e) {
    e.preventDefault();
    setElem($(this));
    var activeIndex = wrap.data('activeIndex') ? wrap.data('activeIndex') : 0;
    if (activeIndex > 0) {
       activeIndex -= 1;
   }
   else {
       activeIndex = pageNum - 1;
   }
   
   wrap.data('activeIndex', activeIndex);
   if ($(this).attr('data-type') === '1') {
       setShowPic1(0);
   }
   else {
       setShowPic(0);
   }
   
};

var scrollRight = function (e) {
    e.preventDefault();
    setElem($(this));
    var activeIndex = wrap.data('activeIndex') ? wrap.data('activeIndex') : 0;
    if (activeIndex < pageNum - 1) {
       activeIndex += 1;
   }
   else {
       activeIndex = 0;
   }
   
   wrap.data('activeIndex', activeIndex);
   if ($(this).attr('data-type') === '1') {
       setShowPic1(1);
   }
   else {
       setShowPic(1);
   }
};

var imgPlay = function () {
    $('.focus-prev').on('click', scrollLeft);
    $('.focus-next').on('click', scrollRight);
    
    setInterval(function () {
        $('.focus-next').click();
    }, 2000);
};


var nav = function () {
    $('.nav a').click(function () {
        if ($(this).is('.on')) {
            return false;
        }
        var index = $(this).attr('data-index');
        $('.slide-box').find('dt').eq(index).click();
        return false;
    });
};


var imgText = function () {
    $('.section-right li  a')
        .on('mouseenter', function () {
            $(this).find('span').animate({left: 0});
        })
        .on('mouseleave', function () {
            $(this).find('span').animate({left: '100%'});
        });
};

$(function () {
    slide();
    imgPlay();
    nav();
    imgText();
});
