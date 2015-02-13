/*
     * 焦点图
     */
    
    var focus = function () {
        var root = $('.focus_btn');
        
        var changeFocusTab = function (index) {
            
            root.find('li').removeClass('on');
            root.find('li').eq(index).addClass('on');
        };
        
        window.swipe = Swipe(document.getElementById('slider'), {
            callback: function(index, elem) {
                changeFocusTab(index);
            }
        });
        
        root.find('li').click(function () {
            swipe.slide($(this).index());
        });
    
    };
    
    /*
     * 滚动
     */
    
    var scroll = function (index) {
console.log(index);

		index = index || 0;

		var root = $('.tab').eq(index);


		var tab = root.find("#demo")[0];
        var tab1 = root.find("#demo1")[0];
        var tab2 = root.find("#demo2")[0];
		var indemo = root.find("#indemo")[0];


        var oIndemo =  tab1.offsetWidth;
        indemo.style.width = oIndemo*2+100+"px";
        
        /*自动滚动 */
        
        var widths = 640;
        
        var i = 0;
        var speed = 10;
        
        tab2.innerHTML = tab1.innerHTML;
        function Marquee(){
            if (tab2.offsetWidth - tab.scrollLeft <= 0) 
                tab.scrollLeft -= tab1.offsetWidth
            else {
                tab.scrollLeft++;
            }
        }
        var MyMar = setInterval(Marquee, speed);
        tab.onmouseover = function(){
            clearInterval(MyMar)
        };
        tab.onmouseout = function(){
            MyMar = setInterval(Marquee, speed)
        };
    };
    
    /*
     * Tab
     */
    
    var tab = function () {
        var root = $('.num-row');
        var pos = [132, 173, 216, 257];
        var numOn = $('.num-on');
        var defaultNum = 0;
        var nums = root.find('li[data-index]');
		var i;
        
        nums.hover(function () {

            if ($(this).parents('.num-row-1').length > 0) {
				numOn.show();
                numOn.stop().animate({'left': pos[Number($(this).attr('data-index'))]});
				$('.num-row-2').removeClass('num-row-on');
            }
            else {
                $(this).parents('.num-row-2').addClass('num-row-on');
                numOn.hide();
            }
            
        }, function () {
            
            if ($(this).parents('.num-row-1').length > 0) {
                numOn.stop().animate({'left': pos[defaultNum]});
				if (defaultNum === 4) {
					$('.num-row-2').addClass('num-row-on');
					numOn.hide();
				}
            }
            else {
				if (defaultNum === 4) {
					return;
				}
                $(this).parents('.num-row-2').removeClass('num-row-on');
                numOn.show();
            }
        });

		nums.click(function () {
			var index = Number($(this).attr('data-index'));
			$('.tab').removeClass('on');
			$('.tab').eq(index).addClass('on');
			defaultNum = index;

			scroll(index);

		});

		
    };

	var playVideo = function () {
		var widths=$(window).width();
		$(".zhezhao").css({width:widths,left:-widths,display:"none"});

		$(".begin").click(function(){
			$(this).parents('.tab').find(".zhezhao1").stop().animate({left:"0px", top: document.body.scrollTop + 'px', zIndex:"999"},500).css({display:"block"});
			return false;
		});


		$(".begin2").click(function(){
			$(this).parents('.tab').find(".zhezhao2").stop().animate({left:"0px", top:  document.body.scrollTop + 'px', zIndex:"999"},500).css({display:"block"});
			return false;
		});

		$(".closes").click(function(){
			$(this).parents('.zhezhao').css({zIndex:"9"}).stop().animate({left:-widths},500,function(){
				$(this).css({display:"none"});
			});
		});
	};

/*
 * 小车走起
 */
var startCar = function () {
    setTimeout(function () {
        $('.car').addClass('car-start');
    }, 500);
};

/*
	自定义滚动条
*/
var scrollBar = function () {
	$(".scroll_content").mCustomScrollbar({
		scrollButtons:{enable:true},
		theme:"light-thick",
		scrollbarPosition:"outside"
	});
};
    
    $(function () {
        focus();
        scroll();
        tab();
		playVideo();
		startCar();
		scrollBar();
    });
   