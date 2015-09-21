$(document).ready(function(){

	$(".prev,.next").hover(function(){
		$(this).stop(true,false).fadeTo("show",0.9);
	},function(){
		$(this).stop(true,false).fadeTo("show",0.4);
	});
	
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

});

//图片效果
	$(function() {
		$("#hongtou dl").before("<div></div>"); 
		$("#hongtou div").stop().fadeTo(0,0.5);
		$("#hongtou dl").each(function(index, el) {
			var $num=-index*25; 
			$(el).css("background-position","5px "+$num+"px");
		});
		$("#hongtou li").hover(function() { 
			$(this).children('div,dl').stop().animate({"bottom":0},500)
		}, function() {  
			$(this).children('div,dl').stop().animate({"bottom":-175},500)
		});
	});



	$(function() {
		$("#nnn dl").before("<div></div>"); 
		$("#nnn div").stop().fadeTo(0,0.5);
		$("#nnn dl").each(function(index, el) {
			var $num=-index*25; 
			$(el).css("background-position","5px "+$num+"px");
		});
		$("#nnn li").hover(function() { 
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
		$("#xianc p").before("<div></div>");  
		$("#xianc div").stop().fadeTo(0,0.5);
		$("#xianc p").each(function(index, el) {
			var $num=-index*25; 
			$(el).css("background-position","5px "+$num+"px");
		});
		$("#xianc li").hover(function() { 
			$(this).children('div,p').stop().animate({"bottom":0},500)
		}, function() {  
			$(this).children('div,p').stop().animate({"bottom":-25},500)
		});
	});
	
	

	$(function() {
		$("#hei li").mouseenter(function(event) {
			$(this).siblings().stop().fadeTo(500,0.5);  /*它的兄弟变暗，自己不变*/
		}).mouseleave(function(event) {
			$("#hei li").stop().fadeTo(500,1);
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
	});













