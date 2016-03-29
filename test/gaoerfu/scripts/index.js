// 渐变焦点图
var Focus = function (wrapId) {
    if (typeof wrapId === 'String') {
        this.wrap = $('#' + wrapId);
    } else {
        this.wrap = wrapId;
    }
    
    this.items = this.wrap.find('.item');
    this.pointLinks = this.wrap.find('.carousel-indicators li');
    this.now = 0;
    this.interval; 
    
    this.init();
};
Focus.prototype.move = function () {
    this.pointLinks.removeClass('active');
    this.pointLinks.eq(this.now).addClass('active');
    
    this.items.fadeOut();
    this.items.eq(this.now).fadeIn(1000);
};

Focus.prototype.toLeft = function () {
    this.now--;
    if (this.now < 0) {
        this.now = this.items.length - 1;
    }
    this.move();
    return false;
};

Focus.prototype.toRight = function () {
    this.now++;
    if (this.now > this.items.length - 1) {
        this.now = 0;
    }
    this.move();
    return false;
};

 Focus.prototype.handleSlide = function (link) {
     var _this = this;
     var slide = $(link).attr('data-slide-to');
     clearInterval(this.interval);
     
     this.now = slide;
     this.move();
     
     this.interval = setInterval(
     function () {
        _this.toRight();
     }, 3000);
 };
Focus.prototype.init = function () {
    var _this = this;
    this.interval = setInterval(
    function () {
       _this.toRight();
    }, 
    3000);

    this.pointLinks.click(
    function () {
        _this.handleSlide(this);
    });
};


new Focus($('#slide_1'));

var tab = function () {
    $('.tab_title a').click(function () {
        var linkWrap = $(this).parent('li');
		
		linkWrap.addClass('on').siblings().removeClass('on');
		
		$('.tab').removeClass('on');
		$('.tab_' + (linkWrap.index() + 1)).addClass('on');
        
		return false;
    });
};

tab();

var playVideo = function () {
    var widths=$(window).width() + 30;
    $(".zhezhao1").css({width:widths,left:-widths,display:"none"});
    $("#j_play").click(function(){
        $(document.body).css('overflow', 'hidden');
        $(".zhezhao1").stop().animate({
            top: document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop + 'px', 
            left:"0px",zIndex:"999"},500).css({display:"block"});
        return false;
    });
    $(".closes").click(function(){
        $(".zhezhao1").css({zIndex:"9"}).stop().animate({left:-widths},500,function(){
            $(document.body).css('overflow', 'auto');
            $(".zhezhao1").css({display:"none"});
        });
    });
};

playVideo();

var photoShow = function () {
            var blank = $('.blank');
            
            blank.each(function () {
                
                $(this)
                    .data({
                        top: $(this).css('top'),
                        left: $(this).css('left'),
						width: $(this).width(),
						height: $(this).height()
                    })
                    .css({
                        top: '50%',
                        left: '50%',
						width: 0,
						height: 0
                    });
            });
            
            var goIndex = 0;
            var go = function () {
                
                blank.eq(goIndex).animate({
                    top: blank.eq(goIndex).data('top'),
                    left: blank.eq(goIndex).data('left'),
                    width: blank.eq(goIndex).data('width'),
                    height: blank.eq(goIndex).data('height')
                });
                
                if (goIndex < blank.length) {
                    goIndex++;
                    setTimeout(go, 500);
                }
            };
			
			$(window).scroll(function () {
				if (document.body.scrollTop > $('.your_trip').offset().top) {
					go();
					$(window).off('scroll');
				}
			});
            
            
            
	
};

	photoShow();

