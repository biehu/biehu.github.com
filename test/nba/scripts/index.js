/*
 * 说话
 */
var say = function (text) {
    var textWrap = $('#say-text');
    var textArea = $('.say-text-wrap');
    
    var sayEnd = function () {
        textArea.find('img').eq(1).addClass('fade-in');
//        textArea.addClass('fade-out');
    };
    
    var startEnd = function () {
        $('#say-text').addClass('say-text').html(text);
        sayEnd();
    };
    
    textWrap.typed({
        strings: [text],
        typeSpeed: 100,
        backDelay: 500,
        loop: false,
        contentType: 'text', 
        loopCount: false,
        callback: sayEnd,
        resetCallback: startEnd
    });
    $('body').on('touchstart', function () {
        textWrap.typed('reset');
    });
};

/*
 * 翻页
 */
var page = function () {
   var yStart, yEnd;
   var index = 0;
   var allNum = 3;
   var isAnimate = false;
   var isModal = false;
   
   var slide = function (el, num) {
        el.css('WebkitTransitionDuration', '.5s');
        el.css('webkitTransform', 'translateY(' + num +　')');
   };
   
   var setPage = function (dir,page) {
        isAnimate = true;
        
        if(dir === 1){
            $(".p"+(page+1)).removeClass('up').addClass('show');
            $(".p"+(page+2)).addClass('down');
            
        }
        else{
            $(".p"+page).addClass('up');
            $(".p"+(page+1)).removeClass('down').addClass('show');
        }
       
        // 翻页
        setTimeout(function(){
            if (isAnimate) isAnimate = false;
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
            
            if (isAnimate || isModal) return false;
            if (yEnd - 100 > yStart & yEnd > yStart) { //down
                if (index === 0) return false;
                setPage(1, --index);
            }
            else {
                if (yEnd + 100 < yStart & yEnd < yStart) { //up
                    if (index === (allNum - 1)) return false;
                    setPage(0, ++index);
                }
            }
               
        });
        
    };

    
   var bindPageUp = function () {
       $(".next").bind('click', function(e){
           e.preventDefault();
           if (index == (allNum - 1)) return;
           if (isAnimate) isAnimate = false;
           
           setPage(0, ++index);
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
var load = function () {
    var pics = ["http://www.biehu.me/test/nba/images/ball-wrap.png", "http://www.biehu.me/test/nba/images/ball.png", "http://www.biehu.me/test/nba/images/loading.png", "http://www.biehu.me/test/nba/images/say.png", "http://www.biehu.me/test/nba/images/say-arrow.png", "http://www.biehu.me/test/nba/images/p2-top.png", "http://www.biehu.me/test/nba/images/p2-middle.png", "http://www.biehu.me/test/nba/images/p2-bottom.png", "http://www.biehu.me/test/nba/images/pe2.png", "http://www.biehu.me/test/nba/images/pe3.png", "http://www.biehu.me/test/nba/images/pe4.png", "http://www.biehu.me/test/nba/images/p1.jpg"];
    var index = 0;
    var len = pics.length;
    
    var progress = function (w) {
        $('.loading-text-tip').text(w);
    };
    
    var loaded = function () {
        $('.loading').fadeOut(function () {
            say('交易窗口要打开啦，我好兴奋啊！一定会有很多球队抢着要我！');
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
 * 奖杯
 */
var cup = function () {
    var cupImg = new Image();
    var canvas = $('#cup')[0];
    var context = canvas.getContext('2d');
    
    alert(0);
    
    var drawImg = function () {
        alert(1);
        context.draeImage(canvas, 0, 0);
    };
    
    cupImg.onload = drawImg;
    cupImg.src = '../images/cup.jpg';
};

$(function () {
//    say('交易窗口要打开啦，我好兴奋啊！一定会有很多球队抢着要我！');

//   page();
//   load();
cup();
})

