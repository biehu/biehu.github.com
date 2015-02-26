var  page = function () {

   /*
    * 翻页
    */
   var yStart;
   var yEnd;
   var index = 0;
   var allNum = $('.page').length;
   var isAnimate = false;
   var isModal = false;
   var score = [];
   
   var slide = function (el, num) {
        el.css('WebkitTransitionDuration', '.5s');
        el.css('webkitTransform', 'translateY(' + num +　')');
   };
   
   var setPage = function (dir,page) {
        isAnimate = true;
        
        if(dir === 1){
            $(".page"+(page+1)).removeClass('up');
            $(".page"+(page+2)).addClass('down');
            
        }
        else{
            $(".page"+page).addClass('up');
            $(".page"+(page+1)).removeClass('down');
        }
       
        // 翻页
        setTimeout(function(){
            if (isAnimate) {
                isAnimate = false;
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
            if (isAnimate || isModal) 
                return false;
            if (yEnd - 100 > yStart & yEnd > yStart) { //down
                if (index === 0)
                    return false;
                setPage(1, --index);
            }
            else 
                if (yEnd + 100 < yStart & yEnd < yStart) { //up
                    if (index === (allNum - 1)) 
                        return false;
                    setPage(0, ++index);
                }
        });
        
    };
  
  var getSendData = function (d) {
      var num = 0,
          answer = '',
          result = 0;
          
      d.forEach(function (item) {
          num += parseInt(item.score);
          answer += item.answer;
      });
      
      if (num >= 5 && num < 11) {
          result = 1;
      }
      else if (num >= 11 && num < 21) {
          result = 2;
      }
      else if (num >= 21 && num < 31) {
          result = 3;
      }
      
      return {
          answer: answer,
          result: result
      }
  };
    
   var bindPageUp = function () {

       $(".answer li, .start-btn").bind('touchstart click', function(e){
		   $('.start-btn').addClass('on');
		   if (index > 0) {
			   score[index] = {};
			   score[index].score = $(this).attr('data-score');
			   score[index].answer = $(this).find('em').html();
		   }
		   
		   if (index == (allNum - 2)) {
			   send();
		   }
		   
		   if (isAnimate) {
			   isAnimate = false;
		   }
		   
		   setPage(0, ++index);
       });

       var send = function() {
            var data = getSendData(score);

            $.post("admin/insert.php", data, function () {
                
            });
			$('.result').hide();
			$('.result' + data.result).show();

       };
   };

   var init = function () {
       bindPageUp();
//               bindTouchPageUp();
   };

   init();
};

/*
 * 分享提示
 */
var share = function () {
    $('.share-btn').on('touchstart', function (e) {
        $('.share-prompt').fadeIn();   
    });

    $('.share-prompt').on('touchstart', function () {
        $(this).fadeOut();
    });
};


/*
	封面
*/
var cover = function () {
	var canvas = document.getElementById('cloud');
	if (!canvas) return;

	var ctx = canvas.getContext('2d');
	var mousePress = false;
	var last;
	
	var draw = function () {
		var img = new Image();

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		img.onload = function () {
			last = { x: window.innerWidth / 2, y: this.height * window.innerWidth / this.width / 2 };
			ctx.drawImage(img, 0, 0, window.innerWidth, this.height * window.innerWidth / this.width);
		};
		img.src = './images/cloud.jpg';
	};

	var getTransparentPercent = function (ctx, width, height) {
		var imgData = ctx.getImageData(0, 0, width, height);
		var pixles = imgData.data;
		var transPixs = [];
		var i, l;

		for (i = 0, l = pixles.length; i < l; i += 4) {
			if (pixles[i + 3] === 0) transPixs.push(i);
		}
		return transPixs.length / (pixles.length / 4) * 100                 
	 };

	function pos(event){
        var x = event.touches[0].pageX;
        var y = event.touches[0].pageY;
        

        return {
            x: x,
            y: y
        };
    }
	 
	 draw();
	 canvas.addEventListener('touchstart', function (e) {
		$('.hand').hide();
		mousePress = true;
		event.preventDefault();
		event.stopPropagation(); 
	 }, false);
	 canvas.addEventListener('touchmove', function (e) {
		 event.preventDefault();
		 event.stopPropagation();
		 if (!mousePress) return;
		
		 ctx.globalCompositeOperation = 'destination-out';
		 var xy = pos(e);
		 if (last != null) {
			ctx.lineWidth = 40;
			ctx.strokeStyle = "#000000";
			ctx.beginPath();
			ctx.moveTo(last.x, last.y);
			ctx.lineTo(xy.x, xy.y);
			ctx.stroke();
		 }
		 last = xy;

		 
//		 fillCircle.call(ctx, x, y, touchRadius);
		 if (parseInt(getTransparentPercent(ctx, canvas.width, canvas.height)) > 30) {
			$('.start-before').fadeOut();
			$('.start').addClass('show');
		 }
	 }, false);
	 canvas.addEventListener('touchend', function (e) {
		mousePress = false;
        event.preventDefault();
		event.stopPropagation(); 
		last = null;
	 }, false);
	 $('.page').on('touchstart touchmove touchend', function () {
		return false;
	 });

};

/*
	设置页面高度
*/
var setHeight = function () {
	var pageHeight = $(window).height();
	var section = $('.page, body, html');
	section.height(pageHeight);
};

/*
	loading
*/
var loading = (function () {
            var pics = [
                "http://biehu.me/test/question2/images/bg.jpg",
                "http://biehu.me/test/question2/images/cover-title2.png",
                "http://biehu.me/test/question2/images/cover-bg.jpg",
                "http://biehu.me/test/question2/images/cloud.jpg"
            ];
            var index = 0;
            var len = pics.length;
            
            var progress = function (w) {
                
                    $('.loading em').text(w);
               
            };
            
            var loaded = function () {
                $('.loading').fadeOut();
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
            
            return init;

        })();
/*
	音乐播放
*/
var iosAutoPlay = function () {
	if (/i(Phone|P(o|a)d)/.test(navigator.userAgent)) {
        $('#cloud').one("touchstart",function(){
            $('#audio_music')[0].play();
        });
    }
};
var music = function () {
		var isPlay = true;
		$("#music").on("touchstart", function(){
			var audio = $('#audio_music')[0];
			var that = $(this);
			if (isPlay) {
				audio.pause();
				isPlay = false;
				that.addClass('on');
			}
			else {
				audio.play();
				isPlay = true;
				that.removeClass('on');
			}
            return false;
		});

	};


	/*
		结果页弹出层
	*/

	var resultWin = function () {

		$('.result-btn img').on('touchstart', function () {
			var root = $(this).parents('.page-result');
			root.find('.result-text').hide();
			root.find('.result-detail').fadeIn();
		});

		$('.result-win-close').on('touchstart', function () {
			var root = $(this).parents('.page-result');
			root.find('.result-text').show();
			root.find('.result-detail').fadeOut();
		});
	};


$(function () {
	loading();
    page();
    share();
	cover();
	setHeight();
	iosAutoPlay();
	music();
	resultWin();
});
