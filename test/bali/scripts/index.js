var scrollToNav = function () {
    var top = $('.page_nav')[0].offsetTop;
    $(document.body).animate({
        scrollTop: top + 'px'
    });
    $('.page_nav').addClass('fixed');
    
    $(window).scroll(function(){
        var sct = $(this).scrollTop();
        if (sct < top) {
            $('.page_nav').removeClass('fixed');
        }
        else {
            $('.page_nav').addClass('fixed');
        }
    });
};

var showHeader_4 = function () {
    $('.person_1').animate({
        left: '0'
    });
    $('.person_6').animate({
        left: '762px'
    });
    
    setTimeout(scrollToNav, 1000);
};

var showHeader_3 = function () {
    $('.person_2').animate({
        left: '246px'
    });
    $('.person_5').animate({
        left: '944px'
    });
    
    setTimeout(showHeader_4, 500);
};

var showHeader_2 = function () {
    $('.person_3').animate({
        left: '468px'
    });
    $('.person_4').animate({
        left: '839px'
    });
    
    setTimeout(showHeader_3, 500);
};

var showHeader_1 = function () {
    $('.tower').animate({
        left: '110px'
    });
    $('.door').animate({
        left: '576px'
    });
    
    setTimeout(showHeader_2, 500);
    
};

var showViewText = function () {
    var self = $(this);
    self.find('.j_view_pic').animate({
        marginTop: -self.height() + 'px'
    });
};

var showViewpic = function () {
    var self = $(this);
    self.find('.j_view_pic').animate({
        marginTop: 0
    });
};

var editerTimeShow = function () {
    $(window).scroll(function(){
        var sct = $(this).scrollTop();
        if (sct > ($('.star_editer')[0].offsetTop)) {
            $('.editer_time').slideDown();
        }
    });
};

function share_weibo(title,url,img){
    window.open('http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url+'&source=bookmark&pic='+img,'_blank','width=450,height=400');
}

function share_qq(title,url,img){
    window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+url+ '&title='+title+'&pic='+img,'_blank');
}

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


$(function () {
    showHeader_1();
    $('.j_view_pic').parents('.flip_text_pic').on('mouseenter', showViewText).
        on('mouseleave', showViewpic);
        
    editerTimeShow();
    showWeixin();
});
