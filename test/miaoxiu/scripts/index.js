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
    $('#j_music_control').click(function () {
        var self = $(this);
        changePlayBtn(self);
        musicRotate(self);
        playMusic(self);
        return false;
    });
};

var playVideo = function () {
    var widths=$(window).width();
    $(".zhezhao1").css({width:widths,left:-widths,display:"none"});
    $("#j_play").click(function(){
        $(".zhezhao1").stop().animate({left:"0px",zIndex:"999"},500).css({display:"block"});
        window.scrollTo(0, 0);
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
        f(sct,topShow.eq(0),wrap.eq(0),bottomShow.height(),topShow.height());
        f(sct,topShow.eq(1),wrap.eq(1),bottomShow.height(),topShow.height());
        f(sct,topShow.eq(2),wrap.eq(2),bottomShow.height(),topShow.height());
    });
};


var activeIndex = 0;
var time = 2000;
var defaultNumClass = 'focus_num_on';
var root = $('#j_scroll');
var innerWrap = root.find('.scroll_pic_list');
var pageNum = Math.ceil(innerWrap.find('.scroll_pic_item').length / 3);

var setShowPic = function (type) {
    if (type === 1) {
        innerWrap.animate({'margin-left': activeIndex === 0 ?
            0 : -Math.abs(innerWrap.find('.scroll_pic_item')[activeIndex * 3].offsetLeft) * activeIndex + 'px'});
    }
    else {
        innerWrap.animate({'margin-left': activeIndex === 0 ?
            0 : -Math.abs(innerWrap.find('.scroll_pic_item')[activeIndex * 3].offsetLeft)+ 'px'});
    }
};

var scrollLeft = function (e) {
    e.preventDefault();
    if (activeIndex > 0) {
       activeIndex -= 1;
   }
   else {
       activeIndex = pageNum - 1;
   }
   
   setShowPic(0);
};

var scrollRight = function (e) {
    e.preventDefault();
    if (activeIndex < pageNum - 1) {
       activeIndex += 1;
   }
   else {
       activeIndex = 0;
   }
   
   setShowPic(1);
};

var imgPlay = function () {
    $('#j_l').on('click', scrollLeft)
    $('#j_r').on('click', scrollRight)
};

$(function () {
    playVideo();
    bindPlayMusic();
    scrllShow();
    imgPlay();
});


