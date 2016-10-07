(function () {
    var Focus = function (wrapId) {
        if (typeof wrapId === 'String') {
            this.wrap = $('#' + wrapId);
        } else {
            this.wrap = wrapId;
        }
        
        this.items = this.wrap.find('.play-item');
        this.pointLinks = this.wrap.find('.play-index span');
        this.prevLink = this.wrap.find('.play-prev');
        this.nextLink = this.wrap.find('.play-next');
        this.wrapClassName = this.wrap[0].className;
        this.now = 0;
        this.interval; 
        
        this.init();
    };
    Focus.prototype.move = function () {
        this.pointLinks.removeClass('hover');
        this.pointLinks.eq(this.now).addClass('hover');
        
        this.items.fadeOut();
        this.items.eq(this.now).fadeIn(1000);
        
        this.wrap[0].className = this.wrapClassName + ' bg-' + (this.now + 1);
    };
    
    Focus.prototype.toLeft = function () {
        this.now--;
        if (this.now < 0) {
            this.now = this.items.length - 1;
        }
        this.move();
        
        this.autoSlide();
        
        return false;
    };
    
    Focus.prototype.toRight = function () {
        this.now++;
        if (this.now > this.items.length - 1) {
            this.now = 0;
        }
        this.move();
        
        this.autoSlide();
        
        return false;
    };
    
    Focus.prototype.autoSlide = function () {
        if (this.interval) clearInterval(this.interval);
        var _this = this;
        this.interval = setInterval(function () {
            _this.toRight();
        }, 3000);
    };
    
    Focus.prototype.handleSlide = function (link) {
         var _this = this;
         var slide = $(link).attr('data-slide-to');
         
         this.now = slide;
         this.move();
         
         this.autoSlide();
         
         return false;
     };
    Focus.prototype.init = function () {
        var _this = this;
        this.interval = setInterval(function () {
           _this.toRight();
        }, 3000);
        
        this.pointLinks.click(function () {
            _this.handleSlide(this);
        });
        
        this.prevLink.click(function () {
             _this.toLeft();
        });
        this.nextLink.click(function () {
             _this.toRight();
        });
    };
    
    new Focus($('.banner'));

})();