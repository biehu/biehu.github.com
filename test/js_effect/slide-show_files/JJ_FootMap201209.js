function hoverShow(c, b) {
    var d = $(c),
        a = $(b),
        e;
    $(d).mouseover(function() {
        e && clearTimeout(e);
        e = setTimeout(function() {
            e && clearTimeout(e);
            $(a).show()
        }, 200)
    });
    $(d).mouseout(function() {
        e && clearTimeout(e);
        e = setTimeout(function() {
            $(a).hide()
        }, 200)
    });
    $(a).mouseleave(function() {
        $(a).hide()
    });
    $(a).mouseenter(function() {
        e && clearTimeout(e);
        $(a).show()
    })
}
var JJ_FootMap_str='<li><a href="http://jiaju.sina.com.cn/" target="_blank">全国家居</a></li><li><a href="http://sh.jiaju.sina.com.cn/" target="_blank">上海家居</a></li><li><a href="http://gz.jiaju.sina.com.cn" target="_blank">广州家居</a></li><li><a href="http://sz.jiaju.sina.com.cn/" target="_blank">深圳家居</a></li><li><a href="http://cd.jiaju.sina.com.cn/" target="_blank">成都家居</a></li><li><a href="http://cq.jiaju.sina.com.cn/" target="_blank">重庆家居</a></li><li><a href="http://tj.jiaju.sina.com.cn/" target="_blank">天津家居</a></li><li><a href="http://wh.jiaju.sina.com.cn/" target="_blank">武汉家居</a></li><li><a href="http://cs.jiaju.sina.com.cn/" target="_blank">长沙家居</a></li><li><a href="http://zz.jiaju.sina.com.cn/" target="_blank">郑州家居</a></li><li><a href="http://nj.jiaju.sina.com.cn/" target="_blank">南京家居</a></li><li><a href="http://qd.jiaju.sina.com.cn/" target="_blank">青岛家居</a></li><li><a href="http://sjz.jiaju.sina.com.cn/" target="_blank">石家庄家居</a></li><li><a href="http://sy.jiaju.sina.com.cn/" target="_blank">沈阳家居</a></li><li><a href="http://shanxi.jiaju.sina.com.cn/" target="_blank">太原家居</a></li><li><a href="http://www.jiaju.com/" target="_blank">家居商城</a></li><li><a href="http://wh.jiaju.sina.com.cn/" target="_blank">武汉家居</a></li><li><a href="http://rizhao.jiaju.sina.com.cn/" target="_blank">日照家居</a></li><li><a href="http://kaifeng.jiaju.sina.com.cn/" target="_blank">开封家居</a></li><li><a href="http://jincheng.jiaju.sina.com.cn/" target="_blank">晋城家居</a></li><li><a href="http://jinhua.jiaju.sina.com.cn/" target="_blank">金华家居</a></li><li><a href="http://leshan.jiaju.sina.com.cn/" target="_blank">乐山家居</a></li><li><a href="http://tz.jiaju.sina.com.cn/" target="_blank">泰州家居</a></li><li><a href="http://wx.jiaju.sina.com.cn/" target="_blank">无锡家居</a></li><li><a href="http://xian.jiaju.sina.com.cn/" target="_blank">西安家居</a></li><li><a href="http://zz.jiaju.sina.com.cn/" target="_blank">郑州家居</a></li><li><a href="http://zhanjiang.jiaju.sina.com.cn/" target="_blank">湛江家居</a></li><li><a href="http://hf.jiaju.sina.com.cn/" target="_blank">合肥家居</a></li><li><a href="http://datong.jiaju.sina.com.cn/" target="_blank">大同家居</a></li><li><a href="http://baoding.jiaju.sina.com.cn/" target="_blank">保定家居</a></li><li><a href="http://h.jiaju.sina.com.cn/" target="_blank">哈尔滨家居</a></li><li><a href="http://handan.jiaju.sina.com.cn/" target="_blank">邯郸家居</a></li>';
document.getElementById("JJ_FootMap").innerHTML=JJ_FootMap_str;
hoverShow($("#jjAll"),$("#bottom-pop-box"));
hoverShow($("#topnav-l-mobile"), $("#topnav-l-mimg"));
