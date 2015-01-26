(function () {
    'use strict';
    
    
   /*
            * 翻页
            */
           var yStart, yEnd;
           var index = 0;
           var allNum = $('.page').length;
           var isAnimate = false;
           var isModal = false;
           
           var slide = function (el, num) {
                el.css('WebkitTransitionDuration', '.5s');
                el.css('webkitTransform', 'translateY(' + num +　')');
           };
           
           var setPage = function (dir,page) {
               
                isAnimate = true;
                
                if(dir === 1){
                    $(".page-"+(page+1)).removeClass('up').addClass('show');
                    $(".page-"+(page+2)).removeClass('show').addClass('down');
                    
                }
                else{
                    $(".page-"+page).removeClass('show').addClass('up');
                    $(".page-"+(page+1)).removeClass('down').addClass('show');
                }
                
                var curBg = $('.bg-' + (page + 1));
                var bg = $('.bg');
                if (!curBg.hasClass('show')) {
                    bg.removeClass('show');
                    curBg.addClass('show');
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

            
           var bindPageUp = function () {
               $(".next").bind('click', function(e){
                   e.preventDefault();
                   if (index == (allNum - 1)) {
                       return;
                   }
                   
                   if (isAnimate) {
                       isAnimate = false;
                   }
                   
                   setPage(0, ++index);
               });
           };

           var initScroll = function () {
               
               $('.page-1, .bg-1').addClass('show');
//               bindPageUp();
               bindTouchPageUp();
           };
    
    var pageInit = function () {
        var pageHeight = $(window).height();
        var section = $('.page');
        
        section.height(pageHeight);
        
    };
    
    var effectIndex = function () {
        $('.page-1').addClass('show-title');
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
    
    var videoAdd = function (e) {
        e.preventDefault();
        
        var videoHtml = ['<div class="video" onclick="videoRemove()">',
'            <div class="video-pos">',
'                <iframe src="http://www.tudou.com/programs/view/html5embed.action?type=0&code=nYgRAj7rkzY&lcode=&resourceId=0_06_05_99" allowtransparency="true" allowfullscreen="true" scrolling="no" border="0" frameborder="0" style="width:100%;height: 200px;"></iframe>',
'            </div>',
'        </div>'].join("");
        
        $('.container').append(videoHtml);
    };
    
    window.videoRemove = function () {
        if ($('.video').length > 0) {
            $('.video').remove();
        }
    };
    
    var bindVideo = function () {
        $('#play-video').on('touchend', videoAdd);
    };

    
    $(window).load(function () {
        initScroll();
        pageInit();
		music();
        bindVideo();
    });
    
})();
