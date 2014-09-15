var showNewYork = function () {
    $('#j_newyork').show().animate({
        left: 0,
        marginLeft: 0,
        opacity: 1
    });
};

var showArrow = function () {
    $('#j_arrow').fadeIn();
};

var menuHoverClass = 'menu_on';
var menuContentHoverClass = 'city_mark_on';

var changeMenu = function (e) {
    e.preventDefault();
    var self = $(this);
    var tabNum = self.attr('data-tab');
    $('#j_menu').find('a').removeClass(menuHoverClass);
    self.addClass(menuHoverClass);
    $('.j_city_mark').removeClass(menuContentHoverClass);
    $('#city_mark_' + tabNum).addClass(menuContentHoverClass);
};

var flipClass = 'flip_3d';

var flipIn = function (e) {
    e.preventDefault();
    var elem = $(this);
    
    if (elem.data('flipped')) {
        return;
    }
  
        elem.css('background', '#999999');
        elem.flip({
            direction: 'lr',
            speed: 350,
            onBefore: function(){
                
                elem.html(elem.siblings('.j_flip_hover').html());
            },
            onEnd: function () {
                elem.css('background', 'none');
            }
        });
        
        elem.data('flipped', true);
    
};

var flipOut = function (e) {
    e.preventDefault();
    var elem = $(this);
    elem.revertFlip();
    elem.data('flipped', false);
};

var cssSupports = (function() {
 var div = document.createElement('div'),
  vendors = 'Khtml O Moz Webkit'.split(' '),
  len = vendors.length;
 return function(prop) {
  if ( prop in div.style ) return true;
  if ('-ms-' + prop in div.style) return true;
  
  prop = prop.replace(/^[a-z]/, function(val) {
   return val.toUpperCase();
  });
  while(len--) {
   if ( vendors[len] + prop in div.style ) {
   return true;
  }
 }
  return false;
 };
})();

var flip = function () {
    var elem = $('.j_flip');
    if (cssSupports('transformStyle')) {
        $('.j_person').addClass(flipClass);
    }
    else {
        elem.on('mouseenter', flipIn).on('mouseleave', flipOut);
    }
};

var showViewText = function () {
    var self = $(this);
    self.find('.j_view_pic').animate({
        marginTop: -self.height() + 'px'
    });
};

var showViewpic = function () {
    var self = $(this);
    self.find('.j_view_pic').animate({
        marginTop: 0
    });
};

var showWeixin = function () {
    $('.slayer a:eq(1)').hover(function(){
        $('.weixinshare').stop().animate({
            top:0
        },300)
    })
    
    $('.weixinshare').mouseleave(function(){
        $('.weixinshare').stop().animate({
            top:254
        },300)
    })

};

var activeIndex = 0;
var time = 2000;
var defaultNumClass = 'focus_num_on';
var root = $('#j_focus');
var wrap = root.find('.focus');
var innerWrap = root.find('ul');
var pageNum = Math.ceil(innerWrap.find('li').length / 3);

var setShowPic = function () {
    innerWrap.animate({'margin-left': activeIndex === 0 ?
        0 : -innerWrap.find('li')[activeIndex * 3].offsetLeft + 'px'});
};

var scrollLeft = function (e) {
    e.preventDefault();
    if (activeIndex > 0) {
       activeIndex -= 1;
   }
   else {
       activeIndex = pageNum - 1;
   }
   
   setShowPic();
};

var scrollRight = function (e) {
    e.preventDefault();
    if (activeIndex < pageNum - 1) {
       activeIndex += 1;
   }
   else {
       activeIndex = 0;
   }
   
   setShowPic();
};

var imgPlay = function () {
    $('#j_left').on('click', scrollLeft)
    $('#j_right').on('click', scrollRight)
};

$(function () {
    showArrow();
    showWeixin();
    imgPlay();
    flip();
    $('#j_london, #j_arrow').on('mouseenter', showNewYork);
    $('#j_menu').on('click', 'a', changeMenu);
    $('.j_view_pic').parent('li').on('mouseenter', showViewText).
        on('mouseleave', showViewpic);
});
