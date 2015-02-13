var isIE = (document.all) ? true : false; //document.all 只有ie支持此属性
var ieVersion = 7; //IE版本，默认为7
if (isIE) {
    ieVersion = parseFloat(navigator.appVersion.split("MSIE")[1]);
}
var de = getBodyObj();
function getBodyObj() {
    return (document.documentElement) ? document.documentElement : document.body;
}
function resetCSS(elem, prop) { for (var i in prop) { elem.style[i] = prop[i]; } }
//滚动条位置
function scrollX() { return self.pageXOffset || de && de.scrollLeft || document.body.scrollLeft; }
function scrollY() { return self.pageYOffset || de && de.scrollTop || document.body.scrollTop; }
//可视尺寸
function windowW() { return self.innerWidth || de && de.clientWidth || document.body.clientWidth; }
function windowH() { return self.innerHeight || de && de.clientHeight || document.body.clientHeight; }
//页面尺寸（最小不小于可视尺寸）
function pageW() { var s = document.body.scrollWidth; var c = windowW(); return s > c ? s : c; }
function pageH() { var s = document.body.scrollHeight; var c = windowH(); return s > c ? s : c; }
//lightbox显示和隐藏
function createDivOverLayer(w, h) {
    //内容
    var tempInnerHtml = "<div id=\"divOverProgress\" style='width:400px;height:250px;margin:0 auto;position:absolute;top:0px;padding-top:8px;text-align:right;background-color:#fff;border:8px solid #8F8F8F;' title='按住鼠标可以拖动' onmousedown = \"down(this)\">";
    tempInnerHtml += "<span id=\"spanCloseLightBox\" onclick=\"closeLightBox()\" style=\"cursor: pointer; color: Blue\">关闭</span><br/>";
    tempInnerHtml += "<div style=\"margin-top: 90px; text-align: center\"><a href=\"#\" onclick=\"alert('confirm')\">确定</a>&nbsp;&nbsp;<a href=\"#\" onclick=\"closeLightBox()\">取消</a></div>";
    tempInnerHtml += "</div>";
    //建立lightbox
    var over = document.createElement("div");
    over.id = "myLightBoxLayer";
    var over2 = document.createElement("div");
    over2.id = "myProcessLayer";
    document.body.appendChild(over);
    document.body.appendChild(over2);
    //重设lightbox尺寸和位置
    function resetOver() {
        //设定遮掩层尺寸
        resetCSS(over, { position: "absolute", zIndex: "998", top: "0px", left: "0px", backgroundColor: "gray", opacity: "0.5", filter: "alpha(opacity=80)", width: pageW() + "px", height: pageH() + "px" });

        //设定弹出层尺寸和位置
        var eh = windowH() - h;
        var ew = windowW() - w;
        eh = eh < 0 ? 0 : eh;
        ew = ew < 0 ? 0 : ew;
        if (ieVersion != 7)
            resetCSS(over2, { position: "absolute", zIndex: "999", width: w + "px", height: h + "px", left: scrollX() + parseInt(ew / 2) + "px", top: scrollY() + parseInt(eh / 2) + "px", overFlow: "hidden", filter: "alpha(opacity=0)" });
        else
            resetCSS(over2, { position: "absolute", zIndex: "999", width: w + "px", height: h + "px", left: scrollX() + parseInt(ew / 2) + "px", top: scrollY() + parseInt(eh / 2) + "px", overFlow: "hidden" });
    };
    resetOver();
    window.onresize = resetOver;
    window.onscroll = resetOver;
    if (ieVersion != 7) { //将所有select置为不可用
        var oSelects = document.getElementsByTagName("select");
        for (var i = 0; i < oSelects.length; i++) {
            oSelects[i].disabled = true;
            oSelects[i].style.visibility = "hidden";
        }
    }
    over2.innerHTML = tempInnerHtml;
}

//点击关闭lightbox
function closeLightBox() {
    var over = document.getElementById("myLightBoxLayer");
    var over2 = document.getElementById("myProcessLayer");
    document.body.removeChild(over);
    document.body.removeChild(over2);
    if (ieVersion != 7) { //将所有select置为可用
        var oSelects = document.getElementsByTagName("select");
        for (var i = 0; i < oSelects.length; i++) {
            oSelects[i].disabled = false;
            oSelects[i].style.visibility = "visible";
        }
    }
}
