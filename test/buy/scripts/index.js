var leftBtn = $('.left_btn'),
    rightBtn = $('.right_btn');

var setNav = function () {
    $('.list').find('li').removeClass('on').
        eq(scrollSwipe.getPos()).addClass('on');
};

var scroll = function () {
    window.scrollSwipe = new Swipe(document.getElementById('slider'));
    window.scrollSwipe1 = new Swipe(document.getElementById('slider1'), {speed: 500});
    window.scrollSwipe2 = new Swipe(document.getElementById('slider2'), {speed: 700});

    leftBtn.click(function () {
       window.scrollSwipe.prev();
       window.scrollSwipe1.prev();
       window.scrollSwipe2.prev();
       setNav();
    });
    rightBtn.click(function () {
       window.scrollSwipe.next();
       window.scrollSwipe1.next();
       window.scrollSwipe2.next();
       setNav();
    });

    $('.list').find('li').click(function () {
       window.scrollSwipe.slide($(this).index());
       window.scrollSwipe1.slide($(this).index());
       window.scrollSwipe2.slide($(this).index());
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

var showMask = function () {
	$('[data-mask]').click(function () {
		$(this).addClass('on');
		$('.c' + $(this).attr('data-mask')).fadeIn();
		return false;
	});

	$('body').click(function () {
		$('.c').fadeOut();
		$('[data-mask]').removeClass('on');
	});
};

showMask();





