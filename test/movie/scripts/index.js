$(document).ready(function(){
	// ����ʱ
	$('#fancyClock').tzineClock();

	// ����ͼ
	var slide = function () {
		var slider =
		  Swipe(document.getElementById('slider'), {
			auto: 3000,
			continuous: true,
			callback: function(pos) {

			  var i = bullets.length;
			  while (i--) {
				bullets[i].className = ' ';
			  }
			  bullets[pos].className = 'on';

			}
		  });
		var bullets = document.getElementById('focus_position').
				getElementsByTagName('li');

	};

	slide();


});