(function(){
    var oDiv = document.getElementById('origin_img');
    
    var oShow = oDiv.getElementsByTagName('div')[0];
    var wrapPos = $(oShow).offset();
    var wrapPosLeft = wrapPos.left;
    var wrapPosTop = wrapPos.top;
    
    var oSpan = oDiv.getElementsByTagName('span')[0];
    var oImg = document.getElementById('img1');
    var oImgWrap = oImg.parentNode;
    
    var oShowWidth = $(oShow).width();
    var oShowHeight = $(oShow).height();
    var oSpanWidth = $(oSpan).width();
    var oSpanHeight = $(oSpan).height();
    
    $(oShow).on('mouseenter', function(){
        $(oSpan).show();
        $(oImgWrap).show();
    });
    $(oShow).on('mouseleave', function(){
        $(oSpan).hide();
        $(oImgWrap).hide();
    });
    $(oShow).on('mousemove', function(ev){
        var oEvent = ev || event;
        
        var mouseX = oEvent.pageX;
        var mouseY = oEvent.pageY;
        
        var x = mouseX - wrapPosLeft - oSpanWidth / 2;
        var y = mouseY - wrapPosTop - oSpanHeight / 2;
        
        if (x < 0) {
            x = 0;
        } else if (x > oShowWidth - oSpanWidth) {
            x = oShowWidth - oSpanWidth;
        }
        if (y < 0) {
            y = 0;
        }
        else if (y > oShowHeight - oSpanHeight) {
            y = oShowHeight - oSpanHeight;
        }
        
        $(oSpan).css({left: x + 'px', top: y + 'px'});
        
        var percentX = x / (oShowWidth - oSpanWidth);
        var percentY = y / (oShowHeight - oSpanHeight);
        
        $(oImg).css({
            left: -percentX * ($(oImg).width() - $(oImgWrap).width()) + 'px',
            top: -percentY * ($(oImg).height() - $(oImgWrap).height()) + 'px'
        });
    });
})();
