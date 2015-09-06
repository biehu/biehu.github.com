var storyImgArr = ['chu_1.png', 'chu_2.png', 'chu_3.png' , 'chu_10.png', 'chu_4.png', 'chu_5.png', 'chu_6.png' , 'chu_7.png' , 'chu_8.png' , 'brand.png' , 'chu_bg_1.jpg' , 'chu_bg_2.jpg' , 'chu_bg_3.jpg' , 'chu_bg_4.jpg' , 'chu_bg_5.jpg' , 'chu_bg_6.jpg' , 'chu_bg_7.jpg']


$(function(){

    initHeight();

    /*上滑动*/
    touch.on('.home_slide', 'swipeup , tap', function(ev){

        var vH = document.documentElement.clientHeight;
        
        $(".home_slide").animate({
            "bottom" : vH-90
        },function(){
            $(".chu_1").fadeIn(1000)
        })

        $(".story").animate({
            "bottom" : "0px"
        },function(){
            //出现按钮
            $(".footprint_btn").fadeIn(100)
        })
    });

    //取消事件冒泡
    touch.on('body' , 'touchstart' , function(ev){
        ev.preventDefault();
    })


    //脚印按钮
    touch.on('.footprint_btn' , 'touchstart' , function(ev){

        var storyHeight = $(".storyBox").height()
        var thisHeight = $(".story .in").height() - storyHeight;

        $(".footprintBox").css("height" , $(".story .in").height());

        var dom = $(".story .in");
        var domFoot = $(".footprintBox");


        //addFootPrint();
        startSlideUp(thisHeight, dom, domFoot);
    })

    touch.on('.footprint_btn' , 'touchend' , function(){
        stopSlideUp();
    })


    //返回重新测试
    
    touch.on('.botBtn' , 'tap' , function(){
        dom = $(".story .in");
        Restart(dom)
    })

})

/*初始化页面高度*/
function initHeight(){
    var vH = document.documentElement.clientHeight;
    
    $("body").css("height" , vH);
    $(".main").css("height" , vH);

    $(".story .storyBox").css({
        "height" : vH -90
    });

    $(".story").css({
        "bottom" : -(vH -90)
    });

}



var step = 0;
var footIndex = 1;
var time = null;
/*故事向上移动*/
function startSlideUp(h, dom, domFoot){

    if(step > h)
    {
        return;
    }

    time = setInterval(function(){

        dom.css("top" , -step);
        domFoot.css("top" , -step);

        step +=5;

        //全部向上移动完毕
        if(step >= h){

            $(".botBtn").fadeIn();
            clearTimeout(time); 
        }

        //创建脚印
        var leftPos = (footIndex%2==1) ? 200 : 290;

        if(step > 2900){

            $(".storyBox .chu_8").css("top" , step + 290);

        }
        else
        {
            if(step % 100 == 0)
            {
                var htmlImg = "<img style='top:"+(step+300)+"px ; left:"+leftPos+"px' src='images/footprint.png' />";
                $(".footprintBox").append(htmlImg);

                footIndex++;
            }
        }

        if($(".footprintBox img").size() > 5)
        {
            $(".footprintBox img:eq(0)").remove();
        }

    },10);

}

/*停止向上移动*/
function stopSlideUp(){
    clearTimeout(time);
}


/**返回重新测试**/
function Restart(dom){

    dom.animate({"top" : 0},500);

    //全部清除
    time = null;
    step = 0;
    footIndex = 1;
    $(".botBtn").fadeOut();
}


function loadImg(arr)
{
    var temArr = [];

    for(var i in arr)
    {
        var temImg = new Image();

        temImg.src = 'images/'+ arr[i];
        temImg.className =  arr[i].split('.')[0];

        temArr.push(temImg);
    }

    insertHtml(temArr.join(""));
}

function insertHtml(arr){
    //alert(arr);
    //$(".storyBox .in").html(arr)
}