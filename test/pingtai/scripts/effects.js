var searchSelect = function () {
    var showSelect = function () {
        var selectWrap = $(this).parent();
        selectWrap.toggleClass('search_box_hover');
        return false;
    };
    var hideSelect = function () {
        $('.search_box_1').removeClass('search_box_hover');
    };
    var handleSelect = function () {
        var selectWrap = $(this).parents('.search_box_1');
        selectWrap.find('strong').html(this.innerText);
        selectWrap.removeClass('search_box_hover');
    };
    $('.search_box_1 li').click(handleSelect);
    $('.search_box_1 strong').click(showSelect);
    if ($('.search_box_1 strong').length > 0) {
        $(document.body).click(hideSelect);
    }
};

searchSelect();
