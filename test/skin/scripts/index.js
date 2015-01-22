/*
 * 分页
 */
function cpu(t,b,c,d) {return c*((t=t/d-1)*t*t+1)+b;}
var changeIndex = true;
var nowPageNum = 0;
var isScroll = true;

var change = function (elem, start, length) {
    isScroll = false;
    
    var duration = 20;
    var count = 0;
    var scrollInterval;
    
    scrollInterval = setInterval(function(){
        elem.scrollTop = cpu(count, start, length, duration);
        count++;
        if(count == duration){
            clearInterval(scrollInterval);
            isScroll = true;
        }
    },10);

};

var isClearPage = function (page) {
    var pageTop = page.offset().top;
    var pageHeight = page.height();
    var screenHeight = window.innerHeight;
    var documentTop = document.body.scrollTop;
    
    if (pageTop > (screenHeight + documentTop) || 
        (pageHeight + pageTop) < documentTop) {
            return true;
    }
    return false;
};

var changePage1 = function (type) {
    var i, delay, top;
    
    if (type === 0) {
        top = -3000;
        delay = 100;
    }
    else {
        top = 0;
        delay = 500;
    }
    
    for (i = 1; i < 5; i += 1) {
        $('.text[data-index="' + i + '"]').find('img').
			delay(delay * i).animate({'top': top});
    }
    
};

var changePageOther = function (type) {
    var i, deday, root, selector = '';
    
    if (type === 0) {
        opacity = 0;
        for (i = 1; i < 5; i += 1) {
            if (i !== nowPageNum && i !== (nowPageNum - 1) && i !== (nowPageNum + 1)) {
                selector += '.page-' + i + ',';
            }
        }
        root = $(selector.substr(0, selector.length - 1));
        deday = 10;
    }
    else {
        opacity = 1;
        root = $('.page-' + nowPageNum);
        deday = 500;
    }
    
    for (i = 1; i < 8; i += 1) {
        root.find('[data-index="' + i + '"]').css({opacity: 0}).
			delay(deday * i).animate({'opacity': opacity});
    }
    
};

var clearPageStyle = function () {
    if (nowPageNum >= 1) {
        changePage1(0);
    }
    changePageOther(0); 
};


var changePageStyle = function () {
    clearPageStyle();
    
    if (nowPageNum === 0) {
        changePage1(1);
    }
    else {
       changePageOther(1); 
    }
};

var page = function (e) {
    
    var pageNum = $(this).attr('data-page');
    var onPage = $('.page.on');
    var onPageNum = $('.nav .on').attr('data-page');
    var onPageTop = onPage.height();
    var toPage = $('.page-' + pageNum);
    var height = onPageTop;
    var thisElem;
    
    if (pageNum === onPageNum) {
        return;
    }
    
    if (document.all) {
       change(document.documentElement, document.documentElement.scrollTop, toPage[0].offsetTop - document.documentElement.scrollTop); 
    }
    else {
        change(document.body, document.body.scrollTop, toPage[0].offsetTop - document.body.scrollTop);
    }
    
    
    nowPageNum = Number(pageNum);
    changePageStyle();
    
    thisElem = $(this);
    setTimeout(function () {
        thisElem.parents('.nav').find('a').removeClass('on');
        thisElem.addClass('on');
    }, 700);
    
    return false;
};

var setPageHeight = function () {
    var i, pageElem;
    
    for (i = 0; i < 5; i += 1) {
        pageElem = $('.page-' + i);
        pageElem.data('data-height', pageElem.height());
    }
};

var bindPage = function () {
    setPageHeight();
    $('.nav a').click(page);
};

/*
 * 页面效果
 */
var pages = [], 
    tops = [],
    pagetarget;

var styleNav = function (num) {
    $('.nav').find('a').removeClass('on').eq(num).addClass('on');
};
  
var stylePage = function (num) {
    nowPageNum = num;
    changePageStyle();
    styleNav(num);
};

var scroll = function () {
    if (!isScroll) {
        return;
    }
    
    var top = document.body.scrollTop || document.documentElement.scrollTop;
    var i, l;
    
    for (i = 0, l = tops.length; i < l; i += 1) {
        if (top > tops[i] && top < tops[i + 1] && tops[i] !== pagetarget) {
            stylePage(i);
            pagetarget = tops[i];
            break;
        }
    }
    
};

var setPagePos = function () {
    var i, page;
    
    for(i = 0; i < 5; i +=1 ) {
        page = $('.page-' + i);
        pages.push(page);
        tops.push(Number(page.offset().top));
    }
};

var bindScroll = function () {
    setPagePos();
    $(window).on('scroll', scroll);
};


var sendData = function () {
	var ctime = 600;
    var succ = '感谢您的投票';
    var fail = '很抱歉，'+(ctime/60)+'分钟内一个人只能投一次票哦';

    $.getJSON("http://mini.mcchina.com/beautylab001/?callback=?",function(d){
			$("#vote1").find("span").text(d[0]);
			$("#vote2").find("span").text(d[1]);
			$("#vote3").find("span").text(d[2]);
        });
	
    $('.vote').click(function(e){
		e.preventDefault();

		var _this = $(this);
		var v = _this.attr('data-value');
		var n = parseInt(_this.find('span').html());
		var url = "http://mini.mcchina.com/beautylab001/?callback=?";
		
		$('.vote').filter(function () { 
			return $(this).attr('data-index') != _this.attr('data-index'); 
		}).removeClass('on');
        _this.toggleClass('on');

		if(_this.is('.on')){
			
			$.ajax({
				url: url,
				data:"v="+v,
				dataType: "jsonp",
				success: function(result){
					if(result == 1){    //投票成功
						_this.find("span").text((n+1));
						alert(succ);
					}else{              //投票失败
						alert(fail);
					}
				}
			});
		}
    });
};


var goHistory = function () {
	$('#goto-history').change(function () {
		location.href = this.value;
	});

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

var bindHover = function () {
    
};


$(function () {
    bindPage();
    bindScroll();
    bindHover();
	sendData();
	goHistory();
	showWeixin();
});


