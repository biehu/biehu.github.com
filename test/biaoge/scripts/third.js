
var changeFontSize = function () {
	var fontSize = 14;
    $('.change-size').click(function () {
        var btn = $(this);
        var article = $('.article *');
		article.css('line-height', '1.5');	
        if (/change-max/.test(btn[0].className)) {
            article.css('font-size', fontSize++)
        } else {
            article.css('font-size', fontSize--)
        }
        return false;
    });
};

var articleLookMore = function () {
    $('.look-more').click(function () {
        var btn = $(this);
        var btnImg = btn.find('img');
        var down_image = 'http://' + document.domain + '/statics/css/yanqing/images/look-more.jpg';
        var up_image = 'http://' + document.domain + '/statics/css/yanqing/images/look-more-up.jpg';
        var btnImgSrc = {
            down: down_image,
            up: up_image
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

var demoShowInit = function () {
    changeFontSize();
    articleLookMore();
    bannerPlay();
};
demoShowInit();