var newYear = window.newYear || {};
                    
newYear.streamShow = (function () {
    var beatBell,
        congratulateText,
        pageMark;
        
    pageMark = function () {
        $('.page-mark').fadeIn();
    };
    
    congratulateText = function () {
        var congratulate = $('.congratulate'),
            fireworks = $('.fireworks');
        
        $(this).addClass('hide');
        fireworks.addClass('slide-show');
        congratulate.addClass('animated bounceInDown');
        congratulate.one('webkitAnimationEnd', pageMark);
    };
    
    beatBell = function () {
        var bell = $('.bell');
            
        bell.addClass('animated swing');
        bell.one('webkitAnimationEnd', congratulateText);
    };
    
    return beatBell;
    
    
})();


newYear.lastTime = (function () {
    var startTime = 2,
        interval = 1000,
    
        clockNext, 
        change, 
        getNextHtml, 
        getNextData,
        callback;
        
    getNextHtml = function (time) {
        return ['<span class="clock-next">', time, '</span>'].join('');
    };
    
    getNextData = function (time) {
        return time < 0 ? '' : (time < 10 ? '0' + time : time);
    };
    
    change = function () {
        var clockOn = $('.clock-on'),
            clockPrev = $('.clock-prev'),
            clockRoot = $( '.clock');
            
        if (clockNext) {
            clockPrev.remove();
            clockOn.removeClass().addClass('clock-prev');
            clockNext.removeClass().addClass('clock-on');
        }
        else {
            clockOn.html(getNextData(startTime));
        }
        if (startTime < 0) {
            newYear.streamShow();
            return;
        }
        clockNext = $(getNextHtml(getNextData(startTime - 1))).
            appendTo(clockRoot);
        startTime = startTime - 1;
        
        setTimeout(change, interval);
    };
    
    return change;
})();


newYear.setPageHeight = function () {
    $('.wrap').height($(window).height());
};

newYear.page = (function () {

   /*
    * 翻页
    */
   var yStart, yEnd;
   var index = 0;
   var allNum = 5;
   var isAnimate = false;
   var isModal = false;
   
   var slide = function (el, num) {
        el.css('WebkitTransitionDuration', '.5s');
        el.css('webkitTransform', 'translateY(' + num +　')');
   };
   
   var setPage = function (dir,page) {
       // 动画完事后可以翻页
        if (page === 1 && !$('.page_1').find('.page-mark').is(':visible')) {
            index = index - 1;
            return;
        }
       
        isAnimate = true;
        
        if(dir === 1){
            $(".page_"+(page+1)).removeClass('up').addClass('active');
            $(".page_"+(page+2)).addClass('down').removeClass('active');
            
        }
        else{
            $(".page_"+page).addClass('up').removeClass('active');
            $(".page_"+(page+1)).removeClass('down').addClass('active');
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

   var init = function () {
       bindPageUp();
       bindTouchPageUp();
   };

   return init;
}());

$(function () {
    newYear.setPageHeight();
    newYear.lastTime();
    newYear.page();
});
