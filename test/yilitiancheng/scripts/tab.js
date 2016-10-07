$('.course-tab-title a').click(function () {
    var index = $(this).parent().index();
    var cons = $(this).parents('.course-section').find('.course-tab-con');
    
    cons.find('.course-tab-con-item').removeClass('hover')
        .eq(index).addClass('hover');
        
    $(this).parents('.course-tab-title').find('a').removeClass('hover');
    $(this).addClass('hover');
    
    return false;
});
