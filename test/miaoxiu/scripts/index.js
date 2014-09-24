var angle = 0;
var musicInterval;
var stopClass = 'music_stop';

var musicRotate = function (elem) {
    if (!elem.hasClass(stopClass)) {
        clearInterval(musicInterval);
    }
    else {
        musicInterval = setInterval(function(){
            angle +=3;
            $('#j_disk').rotate(angle);
        }, 50);
    }
};

var playMusic = function (elem) {
    var music = $('#audio_music')[0];
    if (!elem.hasClass(stopClass)) {
        music.pause();
    }
    else {
       music.play();
    }
};

var changePlayBtn = function (elem) {
    elem.toggleClass(stopClass);
};

var bindPlayMusic = function () {
	musicRotate($('#j_music_control'));
    $('#j_music_control').click(function (e) {
        e.preventDefault();
        var self = $(this);
        changePlayBtn(self);
        musicRotate(self);
        playMusic(self);
    });
};

var playVideo = function () {
    var widths=$(window).width();
    $(".zhezhao1").css({width:widths,left:-widths,display:"none"});
    $("#j_play").click(function(){
        $(".zhezhao1").stop().animate({top: document.body.scrollTop + 'px', 
			left:"0px",zIndex:"999"},500).css({display:"block"});
        return false;
    });
    $(".closes").click(function(){
        $(".zhezhao1").css({zIndex:"9"}).stop().animate({left:-widths},500,function(){
            $(".zhezhao1").css({display:"none"});
        });
    });
};

var scrllShow = function () {
    var wrap = $('.scroll_show');
    var bottomShow = $('.scroll_pic');
    var topShow = $('.big_pic');
    
    var f = function (sct,sel,tel,max,init){
        var tmp = sct-parseFloat(sel.offset().top)-init+max+54;
        tmp = tmp >=max?max:tmp<0?0:tmp;
        tel.css('height',init+tmp);
    };
    
    wrap.css('height',topShow.height());

    $(window).scroll(function(){
        var sct = $(this).scrollTop();
        f(sct,topShow.eq(0),wrap.eq(0),bottomShow.height() + 60,topShow.height());
        f(sct,topShow.eq(1),wrap.eq(1),bottomShow.height() + 60,topShow.height());
        f(sct,topShow.eq(2),wrap.eq(2),bottomShow.height() + 10,topShow.height());
    });
};


var root, innerWrap, pageNum, wrap;
var time = 2000;

var setElem = function (elem) {
    wrap = elem.parents('.scroll_pic');
    root = wrap.find('.scroll_pic_con');
    innerWrap = wrap.find('.scroll_pic_list');
    pageNum = innerWrap.find('.scroll_pic_item').length;
};

var setShowPic = function (type) {
    var activeIndex = wrap.data('activeIndex');
    if (type === 1) {
        innerWrap.animate({'margin-left': activeIndex === 0 ?
            0 : -Math.abs(innerWrap.find('.scroll_pic_item')[activeIndex].offsetLeft) * activeIndex + 'px'});
    }
    else {
        innerWrap.animate({'margin-left': activeIndex === 0 ?
            0 : -Math.abs(innerWrap.find('.scroll_pic_item')[activeIndex].offsetLeft)+ 'px'});
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
   setShowPic(0);
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
   setShowPic(1);
};

var imgPlay = function () {
    $('.j_left').on('click', scrollLeft)
    $('.j_right').on('click', scrollRight)
};

var showWeixin = function () {
    $('.slayer a:eq(1)').hover(function(){
        $('.weixinshare').stop().animate({
            top:0
        },300)
    })
    
    $('.weixinshare').mouseleave(function(){
        $('.weixinshare').stop().animate({
            top:254
        },300)
    })

};

var showSurportTop = function () {
	$(window).scroll(function(){
        var sct = $(this).scrollTop();
		if (sct > ($('.across_scroll')[0].offsetTop + 100)) {
			$('.surport_top').slideDown();
		}
    });
};

$(function () {
    playVideo();
    bindPlayMusic();
    scrllShow();
    imgPlay();
	showWeixin();
	showSurportTop();
});


