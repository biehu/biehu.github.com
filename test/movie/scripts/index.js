$(document).ready(function(){
	// µπº∆ ±
	$('.countdown').each(function () {
		$(this).ClassyCountdown();
	});
		
	// Ωπµ„Õº
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