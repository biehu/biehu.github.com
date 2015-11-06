// 首页

$(function(){

	$(".prev,.next").hover(function(){
		$(this).stop(true,false).fadeTo("show",0.9);
	},function(){
		$(this).stop(true,false).fadeTo("show",0.2);
	});
	
    if ($(".banner-box").length > 0) {
    	$(".banner-box").slide({
    		titCell:".hd ul",
    		mainCell:".bd ul",
    		effect:"fold",
    		interTime:3500,
    		delayTime:500,
    		autoPlay:true,
    		autoPage:true, 
    		trigger:"click" 
    	});
    }

		$("#hongtou dl").before("<div></div>"); 
		$("#hongtou div").stop().fadeTo(0,0.5);
		$("#hongtou dl").each(function(index, el) {
			var $num=-index*25; 
			$(el).css("background-position","5px "+$num+"px");
		});
		$("#hongtou li")
            .click(function () {
                location.href = $(this).find('a').attr('href');
            })
            .hover(function() { 
    			$(this).children('div,dl').stop().animate({"bottom":0},500)
    		}, function() {  
    			$(this).children('div,dl').stop().animate({"bottom":-175},500)
    		});
	});


// 做过什么
	$(function() {
		$("#nnn dl").before("<div></div>"); 
		$("#nnn div").stop().fadeTo(0,0.5);
		$("#nnn dl").each(function(index, el) {
			var $num=-index*25; 
			$(el).css("background-position","5px "+$num+"px");
		});
		$("#nnn li")
            .click(function () {
                    location.href = $(this).find('a').attr('href');
                })
            .hover(function() { 
    			$(this).children('div,dl').stop().animate({"bottom":0},500)
    		}, function() {  
    			$(this).children('div,dl').stop().animate({"bottom":-175},500)
    		});
	});




		$(".mm2").click(function(event) {
			$(".xiayin").show();
		});


//购买现成
	$(function() {
		$("#xianc p, .gou2 p").before("<div></div>");  
		$("#xianc div, .gou2 a div").stop().fadeTo(0,0.5);
		$("#xianc p").each(function(index, el) {
			var $num=-index*25; 
			$(el).css("background-position","5px "+$num+"px");
		});
		$("#xianc li a, .gou2 li a, .gou3 li a, #slide_list .pic a").hover(function() { 
			$(this).children('div,p,b').stop().
                animate({"bottom":0},500)
		}, function() {  
			$(this).children('div,p,b').stop().
                animate({"bottom":-25},500)
		});
	});


//了解咨询

                $(function() {
                    $(".liaojie-hd li").click(function(event) {
                      $(this).addClass('current').siblings().removeClass('current');
                      $(".liaojie-bd ul").eq($(this).index()).show().siblings().hide(); 
                    });
                });


//联系我们

	$(function() {
		$("#boxla>li div").click(function(event) {
			$(this).siblings().stop().slideToggle().parent().siblings().children('ul').slideUp();
			$(this).children('i').toggleClass('fan');
		});
        
        $('.look_weixin_code, .guan2 a').click(function () {
            $('<div></div>')
                .css({
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 100000,
                    opacity: .5,
                    width: '100%',
                    height: '100%',
                    background: '#000'
                })
                .appendTo('body')
                .click(function () {
                    $(this).remove();
                    $('#weixin_code').remove();
                });
                
            $('<img id="weixin_code" src="http://www.ooms.com.cn/statics/css/yanqing/images/qrcode1.jpg" />')    
                .css({
                    position: 'fixed',
                    left: '50%',
                    marginLeft: '-100px',
                    marginTop: '-100px',
                    top: window.innerHeight / 2 + 'px',
                    zIndex: 100001
                })
                .appendTo('body');
            return false;
        });
	});
    
    
    // 能做什么
    $(function () {
        var showMenu = function () {
            var title = $(this);
            title.parents('ul').find('ul').hide();
            title.next('ul').show();
        };
        $('.cando strong').click(showMenu);
    
    });
    
    
  













