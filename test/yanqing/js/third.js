var changeFontSize = function () {
    $('.change-size').click(function () {
        var btn = $(this);
        var article = $('.article');
        if (/change-max/.test(btn[0].className)) {
            article.css('font-size', '14px');
        } else {
            article.css('font-size', '10px');
        }
        return false;
    });
};

var articleLookMore = function () {
    $('.look-more').click(function () {
        var btn = $(this);
        var btnImg = btn.find('img');
        var btnImgSrc = {
            down: 'images/look-more.jpg',
            up: 'images/look-more-up.jpg'
        };
        var article = $('.article');
        if (!article.data('all')) {
            if (!article.data('height')) article.data('height', article.height());
            article.height('auto');
            btnImg.attr('src', btnImgSrc.up);
            article.data('all', true);
        } else {
            article.height(article.data('height'));
            btnImg.attr('src', btnImgSrc.down);
            article.data('all', false);
        }
    });
    
};

var bannerPlay = function () {
    var slide = new Slide({
        animationType: 2,
        slideContainerSelector: '.post-gallery .slide',
        withPageNav: true,
        hoverNav: false
    });
    slide.run();
};


var focusPicPlay = function () {
    $('.slider1').bxSlider({
        pager: false,
        slideWidth: 122,
        minSlides: 2,
        maxSlides: 8,
        slideMargin: 15
    });
};


var demoShowInit = function () {
    changeFontSize();
    articleLookMore();
    bannerPlay();
    focusPicPlay();
};

demoShowInit();
