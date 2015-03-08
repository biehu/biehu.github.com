var leftBtn = $('.left_btn'),
    rightBtn = $('.right_btn');

var setNav = function () {
    $('.list').find('li').removeClass('on').
        eq(scrollSwipe.getPos()).addClass('on');
};

var scroll = function () {
    window.scrollSwipe = new Swipe(document.getElementById('slider'));

    leftBtn.click(function () {
       window.scrollSwipe.prev();
       setNav();
    });
    rightBtn.click(function () {
       window.scrollSwipe.next();
       setNav();
    });

    $('.list').find('li').click(function () {
       window.scrollSwipe.slide($(this).index());
       setNav();
    });
};

scroll();

var  showMap = function () {
      $('.adress_text a').click(function () {
       $(this).parent().parent().find('.map').removeClass('on').
          eq($(this).index() > 0 ? 1: 0).addClass('on');
       return false;
    });
};

showMap();

var 



