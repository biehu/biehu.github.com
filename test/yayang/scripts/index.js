var tab = function () {
    var root = $('.tab');
    
    var changeTab = function () {
        var link = $(this);
        var num = link.attr('data-num') - 1;
        root.find('.tab-title p').removeClass('on').
            eq(num).addClass('on');
        root.find('.tab-con p').removeClass('on').
            eq(num).addClass('on');
    };
    
    $('.link').click(changeTab);
};


tab();


var showText = function () {
    
    var show = function () {
        var text = $(this).attr('data-text');
        $('.' + text).show();
    };
    
    $('.text-link-btn').click(show);
};

showText();


(function () {

   /*
    * 翻页
    */
   var yStart, yEnd;
   var index = 0;
   var allNum = $('.wrap .p').length;
   var isAnimate = false;
   var isModal = false;
   
   var slide = function (el, num) {
        el.css('WebkitTransitionDuration', '.5s');
        el.css('webkitTransform', 'translateY(' + num +　')');
   };
   
   var setPage = function (dir,page) {
       
        isAnimate = true;
        
        if(dir === 1){
            $(".p"+(page+1)).addClass('active').removeClass('up');
            $(".p"+(page+2)).removeClass('active').addClass('down');
            
        }
        else{
            $(".p"+page).removeClass('active').addClass('up');
            $(".p"+(page+1)).addClass('active').removeClass('down');
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

   init();
}());
