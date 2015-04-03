/*
 * 滑动
 */
var slide = function () {
    $(".focus strong").click(function() {
        var self = $(this);
        self.siblings('p:visible').animate({width: 0},function(){
                $(this).hide();
                self.hide();
            }
        );
        self.next("p:hidden").show().animate({width: "689px"},function(){
            self.siblings('strong:hidden').show();
        });
    });
};

// 焦点图
var play = function () {
	var nav = function (i) {
		$('.swipe_btn').removeClass('on');
		$('.swipe_' + i).addClass('on');
	};

	var slider = Swipe(document.getElementById('slider'), {
		auto: 3000,
		continuous: true,
		callback: function (i) {
			nav(i);
		}
	});
	$('.left_btn').click(function () {
		slider.prev();
		return false;
	});
	$('.right_btn').click(function () {
		slider.next();
		return false;
	});
	$('.swipe_btn').click(function () {
		var index = $(this).attr('data-index');
		slider.slide(index);
		nav(index);
		return false;
	});
};
    

$(function () {
    slide();
	play();
});
