var focus = function () {
    var wrap = $('.slide');
    var items = wrap.find('.item');
    var now = 0;
    var interval;

    var move = function () {
        items.hide();
        items.eq(now).fadeIn(1000);
    };

    var toLeft = function () {
        now--;
        if (now < 0) {
            now = items.length - 1;
        }
        move();
        return false;
    };

    var toRight = function () {
        now++;
        if (now > items.length - 1) {
            now = 0;
        }
        move();
        return false;
    };
    
     var handleSlide = function () {
         var slide = $(this).attr('data-slide');
        // clearInterval(interval);
         if (slide === 'prev') {
             toLeft();
         }
         else {
             toRight();
         }
        // interval = setInterval(function () {
         //   toRight();
        // }, 3000);
     };
    
    //interval = setInterval(function () {
      //  toRight();
   // }, 3000);

    $('.slide .carousel-control.left, .slide .carousel-control.right').click(handleSlide);
};
focus();


var changeSection2Bg = function () {
    var root = $('.section2');
    $('.tip_link').hover(
        function () {
           root.addClass($(this).attr('data-bg'));
        },
        function () {
           root.removeClass($(this).attr('data-bg'));
        });
};

changeSection2Bg();
