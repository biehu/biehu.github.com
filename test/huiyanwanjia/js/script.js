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
           list.toggle(); 
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
        if (document.body.scrollHeight < 700) {
            $('.sidebar').css('position', 'absolute');
        }
    };
    
    changeMenuHeight();
    
    var changeEnterPicHeight = function () {
        if (!$('.enter-pic').length) {
			return;
		}
        var winHeight = window.screen.height;
		$('.enter-pic img').height(winHeight);
		$(document.body).css('overflow', 'hidden');
    };
    
    changeEnterPicHeight();


	var slideRight = function () {
		if (!$('.bounced').length) {
			return;
		}

		$(document.body).css('overflow', 'hidden');
		$('.bounced').animate({right: 0}, 1000, function () {
			$(document.body).css('overflow', 'auto');
		});

		$('.bounced-close').click(function () {
			$(this).parents('.bounced').hide();
		});
	}

	slideRight();


	if ($('.alert-mask').length) {
		$('.alert-mask').css('height', document.body.scrollHeight);

		$('.alert-mask').click(function () {
			$('.alert, .alert-mask').hide();
		});
		$('.alert').click(function () {
			return false;
		});
	}
});
