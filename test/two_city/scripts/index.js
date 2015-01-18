var showBannerText = function () {
    $('.banner_text_img span').animate({bottom: 0});
};

var showFocusText = function () {
    $('.focus_text').animate({right: 0});
};
var hideFocusText = function () {
    $('.focus_text').animate({right: '-100%'});
};

var changeTab = function () {
    $(this).siblings().removeClass('on').end().addClass('on');
    $('.tab_content').removeClass('on');
    $('.tab_content').eq($(this).index()).addClass('on');
};

var addEvents = function () {
    $('.focus').hover(showFocusText, hideFocusText);
    $('.tab_title li').click(changeTab);
};

var swipeChange = function () {
	window.swipe1 = $('#swipe-1').Swipe().data('Swipe');
	window.swipe2 = $('#swipe-2').Swipe().data('Swipe');
};

var scroll = function () {
	$(".scroll").mCustomScrollbar({
		scrollButtons:{enable:true},
		theme:"light-thick",
		scrollbarPosition:"outside"
	});
};

window.onload = function () {
    showBannerText();
	swipeChange();
	scroll();
    addEvents();
};
