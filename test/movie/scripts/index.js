$(document).ready(function(){
	// 倒计时
	$('.countdown').each(function () {
		$(this).ClassyCountdown();
	});
		
	// 焦点图
	var slide = function () {
		var bullets = $('#focus_position li');
		var bulletShow = function (pos) {
			var i = bullets.length;
			while (i--) {
				bullets[i].className = ' ';
			}
			bullets[pos].className = 'on';
		};
		var slider = Swipe(
				document.getElementById('slider'), 
				{auto: 3000,
				startSlide: 0, 
				continuous: true,
				callback: function(pos) {
					bulletShow(pos);
				}
			  }
		);
		bullets.click(function () {
			var index = $(this).index();
			bulletShow(index);
			slider.slide(index);
		});
		

	};

	slide();


});