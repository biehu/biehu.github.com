/*
 * 分页
 */
function cpu(t,b,c,d) {return c*((t=t/d-1)*t*t+1)+b;}
var changeIndex = true;
var nowPage = 1;

var change = function (elem, start, length, callback) {
    if (!changeIndex) {
        return;
    }
    changeIndex = false;
    
    var duration = 20;
    var count = 0;
    var scrollInterval;
    
    scrollInterval = setInterval(function(){
        elem.height(cpu(count, start, length, duration));
        count++;
        if(count == duration){
            clearInterval(scrollInterval);
            callback();
            changeIndex = true;
        }
    },10);

};

var page = function (e) {
	if (!e.isTrigger) {
		return;
	}
	

    var pageNum = $(this).attr('data-page');
    var onPage = $('.page.on');
    var onPageNum = $('.nav .on').attr('data-page');
    var onPageTop = onPage.height();
    var toPage = $('.page-' + pageNum);
    var height = onPageTop;
    
    if (pageNum === onPageNum) {
        return;
    }
    
    nowPage = pageNum;
    
    $(this).parents('.nav').find('a').removeClass('on').end().end().addClass('on');
    toPage.addClass('on');
    if (pageNum > onPageNum) {
        setTimeout(function () {
            change(onPage, onPageTop, -onPageTop, function () {
                onPage.removeClass('on');
            });
        }, 0);
    }
    else {
        setTimeout(function () {
            change(toPage, 0, toPage.data('data-height'), function () {
                onPage.removeClass('on');
            });
        }, 0);
    }
    
    return false;
};

var setPageHeight = function () {
    var i, pageElem;
    
    for (i = 0; i < 6; i += 1) {
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
var next = 1;

var changePage = function (num) {
	if (next < 5) {
        $('.text[data-index="' + next + '"]').find('img').animate({'top': num});
    }

	if (next === 5) {
		$('[data-page="' + (num === 0 ? 1 : 0) + '"]').click();
	}

	if (next > 5 && next < 12) {
		$('.page-1 [data-index="' + (next - 5) + '"]').animate({'top': num});
	}

	if (next === 12) {
		$('[data-page="' + (num === 0 ? 2 : 1) + '"]').click();
	}

	if (next > 12 && next < 17) {
		$('.page-2 [data-index="' + (next - 12) + '"]').animate({'top': num});
	}

	if (next === 17) {
		$('[data-page="' + (num === 0 ? 3 : 2) + '"]').click();
	}

	if (next > 17 && next < 21) {
		$('.page-3 [data-index="' + (next - 17) + '"]').animate({'top': num});
	}

	if (next === 21) {
		$('[data-page="' + (num === 0 ? 4 : 3) + '"]').click();
	}

	if (next > 21 && next < 27) {
		$('.page-4 [data-index="' + (next - 21) + '"]').animate({'top': num});
	}

	if (next === 27) {
		$('[data-page="' + (num === 0 ? 5 : 4) + '"]').click();
	}

};
var stylePageNext = function () {
	
	if (next > 27) {
		return;
	}
	changePage(0);
    next += 1;
};

var stylePagePrev = function () {
	next -= 1;
    changePage(-3000);
};

var isScrll = 1;
var scrollFunc = function (e) {
    
	if (isScrll === 0) {
		return;
	}

    var type;
    e=e || window.event;
    if(e.wheelDelta){//IE/Opera/Chrome 
       type = e.wheelDelta; 
    }else if(e.detail){//Firefox 
       type = e.detail; 
    } 
    if (type < 0) {// 往下
        stylePageNext();
    }
    else {// 往上
        stylePagePrev();
    }

	isScrll = 0;
	setTimeout(function () {
		isScrll = 1;
	}, 100);
};

var bindScroll = function () {
    if(document.addEventListener){ 
        document.addEventListener('DOMMouseScroll',scrollFunc,false); 
    }//W3C 
    window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome 
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
		var v = _this.attr('data-index');
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


$(function () {
    bindPage();
    bindScroll();
	sendData();
	goHistory();
	showWeixin();
});


