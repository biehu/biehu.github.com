var currentPageNum = 0;
var pages = $('.scroll_item');

var showPage = function () {
    pages.eq(currentPageNum).fadeIn().siblings().hide();
};

var scrollLeft = function () {
    if (currentPageNum > 0) {
        currentPageNum -= 1;
    }
    else {
        currentPageNum = 0;
    }
    showPage();
    return false;
};

var scrollRight = function () {
    if (currentPageNum < (pages.length - 1)) {
        currentPageNum += 1;
    }
    else {
        currentPageNum = pages.length - 1; 
    }
    showPage();
    return false;
};

var page = function () {
    $('.scroll_left_btn').on('click', scrollLeft);
    $('.scroll_right_btn').on('click', scrollRight);
};

var playVideo = function () {
    
    var widths=$(window).width();
    $(".zhezhao1").css({width:widths,left:-widths,display:"none"});
    $(".begin").click(function(){
        $(".zhezhao1").stop().animate({left:"0px",zIndex:"999"},500).css({display:"block"});
        return false;
    });
    $(".closes").click(function(){


        $(".zhezhao1").css({zIndex:"9"}).stop().animate({left:-widths},500,function(){
            $(".zhezhao1").css({display:"none"});
            });

    });
};

var showTabContent = function () {
    var currentNum = $(this).attr('data-num');
    $(this).addClass('tab_on').siblings().removeClass('tab_on');
    $('.tab_content_' + currentNum).show().siblings().hide();
};

var tab = function () {
    $('.tab a').on('click', showTabContent);
};

var showMain = function () {
    $('.cover').hide();
    $('.scroll').show();
};

var gotoMain = function () {
    $('#goto_subject').click(showMain);
};


$(function () {
    tab();
    playVideo();
    page();
    gotoMain();
});
