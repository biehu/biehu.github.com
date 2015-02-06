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

       $(".answer li, .start-btn img").bind('click', function(e){
		   alert(1);
		   if ($(this).parents('.page').hasClass('last-ask')) return;
           if (index > 0) {
               score[index] = {};
               score[index].score = $(this).attr('data-score');
               score[index].answer = $(this).find('em').html();
           }
           
           if (index == (allNum - 1)) {
               return;
           }
           
           if (isAnimate) {
               isAnimate = false;
           }
           
           setPage(0, ++index);
       });

       $('.last-ask li').bind('click', function(e) {
		   alert(2);
//                    console.log(getSendData(score));
            var data = getSendData(score);

            $.post("admin/insert.php", data, function () {
                
            });
			alert('result' + data.result + '.html');
            window.location.href = 'result' + data.result + '.html';

       });
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
                
    $('.share-btn').on('click', function (e) {
        e.preventDefault();
        $('.share-prompt').fadeIn();   
    });

    $('.share-prompt').on('click', function () {
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
			console.log(1, window.innerWidth, window.innerHeight);
			ctx.drawImage(img, 0, 0, window.innerWidth, this.height * window.innerWidth / this.width);
		};
		img.src = './images/cloud.png';
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
//		 if (parseInt(getTransparentPercent(ctx, canvas.width, canvas.height)) > 30) {
			$('.start-before').fadeOut();
			$('.start').addClass('show');
//		 }
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
	 $('.hand').on('touchstart', function () {
		$(this).hide();
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


$(function () {
    page();
    share();
	cover();
	setHeight();
});
