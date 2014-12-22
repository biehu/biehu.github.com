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
    if (currentPageNum === 3) {
        mask.open('ad');
        return;
    }
    
    if (currentPageNum < (pages.length - 1)) {
        currentPageNum += 1;
    }
    else {
        currentPageNum = 0; 
    }
    showPage();
    return false;
};

var scrollRight1 = function () {

    if (currentPageNum < (pages.length - 1)) {
        currentPageNum += 1;
    }
    else {
        currentPageNum = 0; 
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


var mask=(function(){
    var maskCloth=document.getElementById("mask_cloth");
    //弹出框居中
    function resizeMask(obj){
        var windowWidth=Math.max(document.documentElement.clientWidth,document.body.clientWidth);
        var windowHeight=getWinWH()['h'];
        var bodyHeight=Math.max(document.documentElement.clientHeight,document.body.scrollHeight);
        var bodyScrollTop=Math.max(document.documentElement.scrollTop,document.body.scrollTop);
        var openw =obj.offsetWidth; 
        var openh =obj.offsetHeight; 

        var isIE6=!!window.ActiveXObject && !window.XMLHttpRequest;
        var frame;

        if(isIE6){
            frame='<iframe style="width:100%;height:100%;filter:Alpha(opacity=0);" border="0" frameborder="0"></iframe>';
            maskCloth.innerHTML=frame;
        }

        //遮罩宽高
        maskCloth.style.width=windowWidth+"px";
        maskCloth.style.height=bodyHeight+"px";
        //弹出框位置
        obj.style.left = (windowWidth - openw) / 2 + "px";
        obj.style.top=bodyScrollTop+(windowHeight - openh) / 2 +"px";
        obj.style.zIndex = "1001";
    }

    //视窗尺寸
    function getWinWH(){
        var winWidth,winHeight;
        if (self.innerHeight) { // all except Explorer
            winWidth = self.innerWidth;
            winHeight = self.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
            winWidth = document.documentElement.clientWidth;
            winHeight = document.documentElement.clientHeight;
        } else if (document.body) { // other Explorers
            winWidth = document.body.clientWidth;
            winHeight = document.body.clientHeight;
        }

        return {'w':winWidth,'h':winHeight};
    }
    
    return{
        open:function(objId){
               maskCloth.style.display="block";
               var obj=document.getElementById(objId);
               $(obj).fadeIn();
               resizeMask(obj);
        },
        close:function(objId){
                $(document.getElementById(objId)).fadeOut();
                maskCloth.style.display="none";
        }
    }
})()

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



$(function () {
    tab();
    playVideo();
    page();
    gotoMain();

    
});
