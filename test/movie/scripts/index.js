$(document).ready(function(){
	// µπº∆ ±
	$('#countdown').ClassyCountdown({
		theme: "white",
		end: $.now() + 10000,
		style: {
			hours: {
				gauge: {
					thickness: .08,
					bgColor: "rgba(210,210,210,1)",
					fgColor: "#3A9473"
				}
			},
			minutes: {
				gauge: {
					thickness: .08,
					bgColor: "rgba(210,210,210,1)",
					fgColor: "#3A9473"
				}
			},
			seconds: {
				gauge: {
					thickness: .08,
					bgColor: "rgba(210,210,210,1)",
					fgColor: "#3A9473"
				}
			}
		}
	});
		
	// Ωπµ„Õº
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