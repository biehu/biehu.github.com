/*
 * 说话
 */
var say = function (p, text) {
	var page = $('.p' + p);
    var arrow = page.find('.end-arrow');
    var textWrap = page.find('.txt');
	var wrap = page.find('.say-text-wrap');

    var sayEnd = function () {
        arrow.fadeIn();
		wrap.addClass('end');
    };

	var clear = function () {
		arrow.hide();
	};
    
    var startEnd = function () {
        $('#txt' + p).addClass('txt').html(text);
        arrow.show();
        page.find('.say-text-wrap').fadeOut();
		clear();
    };
    
    textWrap.typed({
        strings: [text],
        typeSpeed: 70,
        backDelay: 500,
        loop: false,
        contentType: 'text', 
        loopCount: false,
        callback: sayEnd,
	    showCursor: false,
        resetCallback: startEnd
    });
    $('body').on('click', function () {
        textWrap.typed('reset');
    });
};

/*
 * 翻页
 */
var page = function () {
   var index = 0;
   var allNum = $('.page').length;
   var isAnimate = false;
   var isModal = false;
   var yStart;
   var yEnd;
   
   var slide = function (el, num) {
        el.css('WebkitTransitionDuration', '.5s');
        el.css('webkitTransform', 'translateY(' + num +　')');
   };
   
   var setPage = function (dir,page) {
        isAnimate = true;
        
        if(dir === 1){
            $(".p"+(page+1)).removeClass('up').addClass('on');
            $(".p"+(page+2)).removeClass('on').addClass('down');
            
        }
        else{
            $(".p"+page).removeClass('on').addClass('up');
            $(".p"+(page+1)).removeClass('down').addClass('on');
        }
       
        // 翻页
        setTimeout(function(){
            if (isAnimate) {
				isAnimate = false;
            }

			if (page === 3) {
				say(4, '想想还有点小激动呢！快替我在6个中选一个吧！');
			}
        },750);
    };
    
    var bindTouchPageUp = function(){
    
        $(document).bind("touchstart", function(e){
            var touch = e.originalEvent.touches[0];
            yStart = touch.pageY;
        });
        $(document).bind("touchmove", function(e){
            event.preventDefault();
            var touch = e.originalEvent.touches[0];
            yEnd = touch.pageY;
            
            if (isAnimate || isModal) {
				return false;
		    }

            if (yEnd - 100 > yStart & yEnd > yStart) { //down
                if (index === 0) {
					return false;
                }
                setPage(1, --index);
            }
            else {
                if (yEnd + 100 < yStart & yEnd < yStart) { //up
					if (index === 3) {
						$('.p4 .link a').addClass('toggleOpa');
						return false;
					}
                    if (index === (allNum - 1)) {
						return false;
                    }
                    setPage(0, ++index);
                }
            }
               
        });
        
    };

    
   var bindPageUp = function () {
	   var setTime;
	   var isSelected;
       $(".next").bind('click', function(e){
           e.preventDefault();
           if (index == (allNum - 1)) {
			   return;
		   }
           if (isAnimate) {
			   isAnimate = false;
           }
           
		   // 球队选择
		   if ($(this).parents('.page').length > 0) { 
			   if ($(this).parents('.page').find('.say-text-wrap').is('.end') && !isSelected) {
					$(this).parents('.page').find('a').removeClass('active');
					$(this).addClass('active');
					isSelected = true;
			   }
			   else {
					e.stopPropagation();
					return;
			   }
				
		   }
		   

		   clearTimeout(setTime);
		   setTime = setTimeout(function () {
				setPage(0, ++index);
		   }, Number($(this).attr('data-delay')));
           
       });
   };

   var init = function () {
       bindPageUp();
       bindTouchPageUp();
   };

   init();
};

/*
 * loading
 */
var loading = function () {
//    var pics = ["http://www.biehu.me/test/nba/images/ball-wrap.png", "http://www.biehu.me/test/nba/images/ball.png", "http://www.biehu.me/test/nba/images/loading.png", "http://www.biehu.me/test/nba/images/say.png", "http://www.biehu.me/test/nba/images/say-arrow.png", "http://www.biehu.me/test/nba/images/p2-top.png", "http://www.biehu.me/test/nba/images/p2-middle.png", "http://www.biehu.me/test/nba/images/p2-bottom.png", "http://www.biehu.me/test/nba/images/pe2.png", "http://www.biehu.me/test/nba/images/pe3.png", "http://www.biehu.me/test/nba/images/pe4.png", "http://www.biehu.me/test/nba/images/p1.jpg"];

	var pics = ['http://www.biehu.me/test/nba/images/ball-wrap.png'];
    var index = 0;
    var len = pics.length;
    
    var progress = function (w) {
        $('.loading-text-tip').text(w);
    };
    
    var loaded = function () {
        $('.loading').fadeOut(function () {
			say(1, '交易窗口要打开啦，我好兴奋啊！一定会有很多球队抢着要我！');
        });
    };
    
    var load = function () {
        var img = new Image();
        img.src = pics[index];
        img.onload = function () {
            progress(Math.floor((index + 1) / len * 100) + '%');
            index += 1;
            if (index < len) {
                load();
            }
            else {
                loaded();
            }
        };
    };
    
    var init = function () {
        if (len > 0) {
            load();
        }
        else {
            progress('100%');
        }
    };
    
    init();

};

/*
 * 生成图片
 */
var drawCanvas = function () {
	var wWidth = window.innerWidth;
	var wHeight = window.innerHeight;
	var mousePress = false;
    var last = null;
    var canvas;
	var board;
	var img;
	var cup;
	
    canvas = document.getElementById('cup');
    board = canvas.getContext('2d');
	
	var drawImg = function () {
		cup = new Image();
		cup.onload = function () {
			canvas.height = this.height;
			canvas.width = this.width;
			board.drawImage(this, 0, 0, this.width, this.height);
		};
		cup.src = 'http://biehu.me/test/nba/images/cup-pic.png';
	};
    

    function beginDraw(event){
        mousePress = true;
		event.preventDefault();
		event.stopPropagation(); 
    }
    
    function drawing(event){
        event.preventDefault();
		event.stopPropagation(); 
        if (!mousePress) 
{
			return;
		}
        var xy = pos(event);
		var imgData = board.getImageData(xy.x, xy.y, canvas.width, canvas.height);
        if (last != null && imgData.data[3] > 0) {
			board.lineWidth = 5;
			board.strokeStyle = "#000000";
            board.beginPath();
            board.moveTo(last.x, last.y);
            board.lineTo(xy.x, xy.y);
            board.stroke();
        }
        last = xy;
        
    }
    
    function endDraw(event){
        mousePress = false;
        event.preventDefault();
		event.stopPropagation(); 
        last = null;
    }
    
    function pos(event){
        var x = event.touches[0].pageX + 70;
        var y = event.touches[0].pageY + 200;
        

        return {
            x: x,
            y: y
        };
    }


    
    function save(){
        //base64
        var dataUrl = canvas.toDataURL();
        //                dataUrl = dataUrl.replace("image/png", "image/octet-stream");
        alert(dataUrl);
    }
    
    
    function clean(){
        board.clearRect(0, 0, canvas.width, canvas.height);
		drawImg();
    }
	
	drawImg();
    
    canvas.addEventListener('touchstart', beginDraw, false);
    canvas.addEventListener('touchmove', drawing, false);
    canvas.addEventListener('touchend', endDraw, false);

	$('.sign-text').click(function () {
		$(this).hide();
		$('.cup-bg').addClass('cup-bg-on').
			one('webkitTransitionEnd', function () {
				$(this).hide();
				$('.draw-img, .draw-bottom').removeClass('hide');
		    });
	});
	$('.draw-clean').click(clean);
	$('.draw-save').click(save);
};

$(function () {
	page();
	loading();

	drawCanvas();
})

