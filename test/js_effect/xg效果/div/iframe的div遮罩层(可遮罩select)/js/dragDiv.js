//dragDiv.js
// 实现可拖动的div
var px = 0;
var py = 0;
var begin = false;
//是否要开启透明效果
var enableOpacity = false; // 默认不允许
var myDragDiv;
function down(oDiv) {
    myDragDiv = oDiv;
    begin = true;
    oDiv.style.cursor = "hand";
    event.srcElement.setCapture();
    px = oDiv.style.pixelLeft - event.x;
    py = oDiv.style.pixelTop - event.y;
}
function document.onmousemove() {
    if (myDragDiv != null && typeof (myDragDiv) != "undefined") {
        if (begin) {
            if (enableOpacity) { myDragDiv.style.filter = "Alpha(opacity=30)"; }  // 滤镜 
            myDragDiv.style.pixelLeft = px + event.x;
            myDragDiv.style.pixelTop = py + event.y;
        }
    }
}
function document.onmouseup() {
    if (myDragDiv != null && typeof (myDragDiv) != "undefined") {
        begin = false;
        if (enableOpacity) { myDragDiv.style.filter = "Alpha(opacity=100)"; } // 滤镜 
        myDragDiv.style.cursor = "default";
        event.srcElement.releaseCapture();
        myDragDiv = null;
    }
}