$(function () {
    var menu = function () {
        var toggleShow = function () {
            $(this).parent().next('.menu').toggle();
            return false;
        };
        $('.menu-show').click(toggleShow);
    };
    
    menu();
    
    var userList = function () {
        var list = $('.user-list');
        var showList = function () {
           list.show(); 
           return false;
        };
        var hideList = function () {
           if (list.length) list.hide();
        };
        $('.user-photo').click(showList);
        $(document.body).click(hideList);
    };
    
    userList();
    
    var changeMenuHeight = function () {
        if ($(window).height() < 700) {
            $('.sidebar').css('position', 'absolute');
        }
    };
    
    changeMenuHeight();
    
    var changeEnterPicHeight = function () {
        if (!$('.enter-pic').length) return;
        var winHeight = $(window).height();
        if (winHeight < 1046) {
            $('.enter-pic img').height(winHeight);
            $(document.body).css('overflow', 'hidden');
        }
    };
    
    changeEnterPicHeight();
});
