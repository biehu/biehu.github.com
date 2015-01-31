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
 * 生成图片
 */
var drawCanvas = function () {
	var wWidth = window.innerWidth;
	var wHeight = window.innerHeight;
    var canvas, board, img, cup;
    canvas = document.getElementById('cup');
    img = document.getElementById('img');
    
    board = canvas.getContext('2d');
	
	cup = new Image();
	cup.onload = function () {
		canvas.height = this.height;
		canvas.width = this.width;
		board.drawImage(this, 0, 0, this.width, this.height);
	};
	cup.src = 'http://www.biehu.me/test/nba/images/p1.jpg';
    
    var mousePress = false;
    var last = null;
    
    function beginDraw(){
        mousePress = true;
    }
    
    function drawing(event){
        event.preventDefault();
        if (!mousePress) 
            return;
        var xy = pos(event);
        if (last != null) {
			board.lineWidth = 5;
			board.strokeStyle = "#ffffff";
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
        last = null;
    }
    
    function pos(event){
        var x, y;
        if (isTouch(event)) {
            x = event.touches[0].pageX;
            y = event.touches[0].pageY;
        }
        else {
            x = event.offsetX + event.target.offsetLeft;
            y = event.offsetY + event.target.offsetTop;
        }
//        console.log('x='+x+' y='+y);
        return {
            x: x,
            y: y
        };
    }
    
    function isTouch(event){
        var type = event.type;
        if (type.indexOf('touch') >= 0) {
            return true;
        }
        else {
            return false;
        }
    }
    
    function save(){
        //base64
        var dataUrl = canvas.toDataURL();
        //                dataUrl = dataUrl.replace("image/png", "image/octet-stream");
        img.src = dataUrl;
    }
    
    
    function clean(){
        board.clearRect(0, 0, canvas.width, canvas.height);
        
    }
    
    canvas.onmousedown = beginDraw;
    canvas.onmousemove = drawing;
    canvas.onmouseup = endDraw;
    canvas.addEventListener('touchstart', beginDraw, false);
    canvas.addEventListener('touchmove', drawing, false);
    canvas.addEventListener('touchend', endDraw, false);
};

$(function () {
//    say('交易窗口要打开啦，我好兴奋啊！一定会有很多球队抢着要我！');

//   page();
//   load();

drawCanvas();
})

