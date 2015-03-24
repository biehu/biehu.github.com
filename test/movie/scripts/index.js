$(document).ready(function(){
	// µπº∆ ±
	$('#countdown').ClassyCountdown({
		theme: "white",
		end: (new Date(2015,4,25)).getTime(),
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