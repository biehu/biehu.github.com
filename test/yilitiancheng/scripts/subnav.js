(function () {
    var list = $('.subnav-con-item');
    var menuLinks = $('.subnav-title li');
    
    menuLinks.hover(function () {
        $(this).addClass('hover');
        list.eq($(this).index()).show();
    }, function () {
        $(this).removeClass('hover');
        list.eq($(this).index()).hide();
    });

    list.hover(function () {
        $(this).show();
        menuLinks.eq($(this).index()).addClass('hover');
    }, 
    function () {
        $(this).hide();
        menuLinks.eq($(this).index()).removeClass('hover');
    });
})();