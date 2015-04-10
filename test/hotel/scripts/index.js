var showWeixinCode = function () {
    $('.weixin').click(function () {
        $('.weixin_code').show();
        return false;
    });
    
    $(document.body).click(function () {
        $('.weixin_code').hide();
    });
};

var slide = function () {
    var slider = document.getElementById('slider');
    if (!slider) {
        return;
    }
    var play = Swipe(document.getElementById('slider'), {
       auto: 3000, //设置自动切换时间，单位毫秒
       continuous: true,  //无限循环的图片切换效果
    });
    $('.left').click(function () {
        play.prev();
        return false;
    });
    $('.right').click(function () {
        play.next();
        return false;
    });
};

showWeixinCode();
slide();
