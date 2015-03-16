// scroll

var scroll = function (id, scale, leftSelector, rightSelector) {
	var root = document.getElementById(id);
	var swipe = $(root).find('.swipe-wrap')[0];
	var distance = $(root).width() / scale;
	var scrollElem = $(root).parents('.day-tab-item').find('.focus-scroll');
	var index = 0;
	var left = $(root).parents('.watch').find(leftSelector);
	var right = $(root).parents('.watch').find(rightSelector);
	var changeOpa;

	if (!root) {
		return;
	}

	function animate(element, from, to, speed) {

    if (!speed) {
      element.style.left = to + 'px';
      return;

    }
    
    var start = +new Date;
    
    var timer = setInterval(function() {
      var timeElap = +new Date - start;
      if (timeElap > speed) {
        element.style.left = to + 'px';
        clearInterval(timer);
        return;
      }
      element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px';
    }, 4);

  }
	
	// 滑块左右滑
	if (scrollElem.length > 0) {
		scrollElem.slider({
			range: "max",
			  min: 1,
			  max: 10,
			  value: 1,
			  slide: function( event, ui ) {
                 if (10 - index > scale) {
    				 animate(swipe, 
    					-distance * index,
    					-distance * (ui.value - 1),
    					300);
                    
                  }
				 index = ui.value - 1;
			  }
		});
		
	}

	// 绑定左右滑
	if (left.length > 0 && right.length > 0) {
		changeOpa = function () {
			$(swipe).find('ul').each(function (n) {
				if (index === n || n === (index + 4)) {
					$(this).addClass('opa');
				}
				else {
					$(this).removeClass('opa');
				}
			});
			
		};

		right.click(function () {
			if (index === $(swipe).find('ul').length - 5) {
				return false;
			}

			animate(swipe, 
				-distance * index++,
				-distance * index,
				300);

			changeOpa();
			 return false;
		});

		left.click(function () {
			if (index === 0) {
				return false; 
			}

			animate(swipe, 
				-distance * index--,
				-distance * index,
				300);

				changeOpa();
			 return false;
		});

		changeOpa();

	}

	$(swipe).width( $(root).width() * $(swipe).find('ul').length);

	
};


var scroll2 = function (id, scale, leftSelector, rightSelector) {
	var root = document.getElementById(id);
	var swipe = $(root).find('.swipe-wrap')[0];
	var distance = $(root).width() / scale;
	var scrollElem = $(root).parents('.section1_con').find('.slider');
	var index = 0;
	var left = $(root).parents('.section3').find(leftSelector);
	var right = $(root).parents('.section3').find(rightSelector);
	var changeOpa;

	if (!root) {
		return;
	}

	function animate(element, from, to, speed) {

    if (!speed) {
      element.style.left = to + 'px';
      return;

    }
    
    var start = +new Date;
    
    var timer = setInterval(function() {
      var timeElap = +new Date - start;
      if (timeElap > speed) {
        element.style.left = to + 'px';
        clearInterval(timer);
        return;
      }
      element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px';
    }, 4);

  }
	
	// 滑块左右滑
	if (scrollElem.length > 0) {

		scrollElem.slider({
			range: "max",
			  min: 1,
			  max: $(swipe).find('ul').length,
			  value: 1,
			  slide: function( event, ui ) {
                  
                   if ($(swipe).find('ul').length  - index >= scale) {
                     animate(swipe, 
                        -distance * index,
                        -distance * (ui.value - 1),
                        300);
                    
                  }
				 index = ui.value - 1;
			  }
		});
		
	}

	// 绑定左右滑
	if (left.length > 0 && right.length > 0) {
		changeOpa = function () {
			$(swipe).find('ul').each(function (n) {
				if (index === n || n === (index + 4)) {
					$(this).addClass('opa');
				}
				else {
					$(this).removeClass('opa');
				}
			});
			
		};

		right.click(function () {
			if (index === $(swipe).find('ul').length - 5) {
				return false;
			}

			animate(swipe, 
				-distance * index++,
				-distance * index,
				300);

			changeOpa();
			 return false;
		});
		left.click(function () {
			if (index === 0) {
				return false; 
			}

			animate(swipe, 
				-distance * index--,
				-distance * index,
				300);

				changeOpa();
			 return false;
		});

		changeOpa();

	}

	$(swipe).width( $(root).width() * $(swipe).find('ul').length);

	
};

// tab

var tab = function (linkSelector, contentSelector, contentOtherSelector) {
	var tab = $(linkSelector);
	var tabContent = $(contentSelector);
	var tabContentOther = $(contentOtherSelector);

	var change = function () {
        
        if ($(this).attr('data-isNotClick') === 'true') {
            return;
        }
        
		var index = $(this).index();
		
		$(this).siblings().removeClass('on').end().addClass('on');
		tabContent.removeClass('on').eq(index).addClass('on');
		tabContentOther.removeClass('on').eq(index).addClass('on');

		trend();
	};
	
	tab.click(change);

};

// swipe

var swipe = function () {
	var saysSlide = Swipe(document.getElementById('says-slide'));
	
	$('.says .swipe-left').click(function () {
		saysSlide.prev();
		return false;
	});
	$('.says .swipe-right').click(function () {
		saysSlide.next();
		return false;
	});
	
	var trend = function (id) {
		var trendSlideElem = document.getElementById(id);

		if (!trendSlideElem) {
			return;
		}

		var trendRoot = $(trendSlideElem).parents('.trend-tab-item');
		var trendSlide = Swipe(trendSlideElem);
		trendRoot.find('.trend-left').click(function () {
			trendSlide.prev();
			return false;
		});
		trendRoot.find('.trend-right').click(function () {
			trendSlide.next();
			return false;
		});
	};

	

	return function () {
		trend('trend-slide');
		trend('trend-slide-2');
		trend('trend-slide-3');
		trend('trend-slide-4');

		scroll('watch-slide', 5, '.watch_left', '.watch_right');
		scroll('watch-slide-2', 5, '.watch_left', '.watch_right');
		scroll('watch-slide-3', 5, '.watch_left', '.watch_right');
		scroll('watch-slide-4', 5, '.watch_left', '.watch_right');

		scroll2('slider', 3);
		scroll2('slider-2', 3);
	};

};



var trend = swipe();
trend();

tab('.day-tab a', '.day-tab-item');
tab('.trend-tab li', '.trend-tab-item', '.watch');

scroll('slide', 2);
scroll('slide-2', 2);
scroll('slide-3', 2);

scroll2('section3-slide', 5, '.section3_left', '.section3_right');


tab('.section1_btn li', '.section1_con');
