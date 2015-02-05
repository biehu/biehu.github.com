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

       $(".answer li").bind('click', function(e){
          
           e.preventDefault();
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
            e.preventDefault();
//                    console.log(getSendData(score));
            var data = getSendData(score);

            $.post("admin/insert.php", data, function () {
                
            });
            location.href = 'result' + data.result + '.html';
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


$(function () {
    page();
    share();
});
