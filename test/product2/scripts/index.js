var windowScrollHandler = function() {
    var nav_oritop = $("#nav").offset() && $("#nav").offset().top;
    var wd_H = $(window).height();
    $(window).scroll(function() {
        var _wstop = $(window).scrollTop();
        if($("#nav").length>0){
         if (_wstop > nav_oritop) {
            if ($("#nav").css("position") == 'relative') {
                $("#nav").css({
                    "position": "fixed",
                    "top": "0"
                });
            }
         } else {
            if ($("#nav").css("position") == 'fixed') {
                $("#nav").css({
                    "position": "relative",
                    "top": "auto"
                });
            }
         }
        }
        
        });
        
};

var nav = function () {
    $('.nav a').click(function () {
        $(this).parents('.nav').find('a').removeClass('on').
            end().end().addClass('on');
    });
};

/*
 * 滑动改变背景色
 */

var changeBg = function () {
    var root = $('.section2');
    
    $('.section2-left').hover(function () {
        root.addClass('blue');
    }, function () {
        root.removeClass('blue');
    });
    
    $('.section2-right').hover(function () {
        root.addClass('red');
    }, function () {
        root.removeClass('red');
    });
};

$(function () {
    windowScrollHandler();
    nav();
    changeBg();
});

