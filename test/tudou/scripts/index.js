(function () {
    'use strict';
    
    /*
     * 翻页
     */
    var root = $('.pages');
    var section = root.find('.page');
    var bg = $('.bg');
    var movePrevent = false;
    var touchDown = false;
    var curPage = 0;
    var pageHeight, startX, startY, margin;
    
    var bind = function () {
        document.body.addEventListener('touchstart', function (e) {
            onStart(e.changedTouches[0]);
        });
        
        document.body.addEventListener('touchmove', function (e) {
            e.preventDefault();
            onMove(e.changedTouches[0]);
        });
        
        document.body.addEventListener('touchend', function (e) {
            onEnd(e.changedTouches[0]);
        });
    };
    
    var prevPage = function () {
        animatePage(curPage - 1);
    };
    
    var nextPage = function () {
        animatePage(curPage + 1);
    };
    
    var setTop = function (pos) {
        root.css({'-webkit-transform': 'matrix(1, 0, 0, 1, 0,' + pos + ')'});
    };
    
    var onStart = function (e) {
        if (movePrevent) {
            return;
        }
        
        touchDown = true;
        
        startX = e.pageX;
        startY = e.pageY;
        margin = root.css('-webkit-transform');
        margin = margin.replace("matrix(", "");
        margin = margin.replace(")", "");
        margin = margin.split(",");
        margin = parseInt(margin[5]);
    };
    
    var onMove = function (e) {
        if (movePrevent || !touchDown) {
            return;
        }
        
        if (e.pageY !== startY) {
            setTop(margin + e.pageY - startY);
        }
    };
    
    var onEnd = function (e) {
        if (movePrevent) {
            return;
        }
        
        var endY = e.pageY;
        
        touchDown = false;
        
        if (Math.abs(endY - startY) < 50) {
            animatePage(curPage);
        }
        else if (endY > startY) {
            prevPage();
        }
        else {
            nextPage();
        }
        
    };
    
    var animatePage = function (newPage) {
        var newMarginTop, curBg;
        
        if (newPage < 0) {
            newPage = 0;
        }
        if (newPage > section.length - 1) {
            newPage = section.length - 1;
        }
        
        curPage = newPage;
        
        movePrevent = true;
        root.one('webkitTransitionEnd', function () {
            movePrevent = false;
        });
        newMarginTop  = newPage * (-pageHeight);
        setTop(newMarginTop);
        
        section.removeClass('show');
        section.eq(curPage).addClass('show');
        
        curBg = $('.bg-' + (curPage + 1));
        if (!curBg.hasClass('show')) {
            bg.removeClass('show');
            curBg.addClass('show');
        }
    };
    
    var pageInit = function () {
        pageHeight = $(window).height();
        
        section.height(pageHeight);
        animatePage(curPage);
        
        bind();
    };
    
    var effectIndex = function () {
        $('.page-1').addClass('show-title');
    };
	
	
	var music = function () {
		var isPlay = true;
		$("#music").on("touchstart", function(){
			var audio = $('#audio_music')[0];
			var that = $(this);
			if (isPlay) {
				audio.pause();
				isPlay = false;
				that.addClass('on');
			}
			else {
				audio.play();
				isPlay = true;
				that.removeClass('on');
			}
            return false;
		});

	};

    
    $(window).load(function () {
        pageInit();
//        effectIndex();
		music();
    });
    
})();
