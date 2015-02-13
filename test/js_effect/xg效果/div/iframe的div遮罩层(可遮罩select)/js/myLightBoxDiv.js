var isIE = (document.all) ? true : false; //document.all ֻ��ie֧�ִ�����
var ieVersion = 7; //IE�汾��Ĭ��Ϊ7
if (isIE) {
    ieVersion = parseFloat(navigator.appVersion.split("MSIE")[1]);
}
var de = getBodyObj();
function getBodyObj() {
    return (document.documentElement) ? document.documentElement : document.body;
}
function resetCSS(elem, prop) { for (var i in prop) { elem.style[i] = prop[i]; } }
//������λ��
function scrollX() { return self.pageXOffset || de && de.scrollLeft || document.body.scrollLeft; }
function scrollY() { return self.pageYOffset || de && de.scrollTop || document.body.scrollTop; }
//���ӳߴ�
function windowW() { return self.innerWidth || de && de.clientWidth || document.body.clientWidth; }
function windowH() { return self.innerHeight || de && de.clientHeight || document.body.clientHeight; }
//ҳ��ߴ磨��С��С�ڿ��ӳߴ磩
function pageW() { var s = document.body.scrollWidth; var c = windowW(); return s > c ? s : c; }
function pageH() { var s = document.body.scrollHeight; var c = windowH(); return s > c ? s : c; }
//lightbox��ʾ������
function createDivOverLayer(w, h) {
    //����
    var tempInnerHtml = "<div id=\"divOverProgress\" style='width:400px;height:250px;margin:0 auto;position:absolute;top:0px;padding-top:8px;text-align:right;background-color:#fff;border:8px solid #8F8F8F;' title='��ס�������϶�' onmousedown = \"down(this)\">";
    tempInnerHtml += "<span id=\"spanCloseLightBox\" onclick=\"closeLightBox()\" style=\"cursor: pointer; color: Blue\">�ر�</span><br/>";
    tempInnerHtml += "<div style=\"margin-top: 90px; text-align: center\"><a href=\"#\" onclick=\"alert('confirm')\">ȷ��</a>&nbsp;&nbsp;<a href=\"#\" onclick=\"closeLightBox()\">ȡ��</a></div>";
    tempInnerHtml += "</div>";
    //����lightbox
    var over = document.createElement("div");
    over.id = "myLightBoxLayer";
    var over2 = document.createElement("div");
    over2.id = "myProcessLayer";
    document.body.appendChild(over);
    document.body.appendChild(over2);
    //����lightbox�ߴ��λ��
    function resetOver() {
        //�趨���ڲ�ߴ�
        resetCSS(over, { position: "absolute", zIndex: "998", top: "0px", left: "0px", backgroundColor: "gray", opacity: "0.5", filter: "alpha(opacity=80)", width: pageW() + "px", height: pageH() + "px" });

        //�趨������ߴ��λ��
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
    if (ieVersion != 7) { //������select��Ϊ������
        var oSelects = document.getElementsByTagName("select");
        for (var i = 0; i < oSelects.length; i++) {
            oSelects[i].disabled = true;
            oSelects[i].style.visibility = "hidden";
        }
    }
    over2.innerHTML = tempInnerHtml;
}

//����ر�lightbox
function closeLightBox() {
    var over = document.getElementById("myLightBoxLayer");
    var over2 = document.getElementById("myProcessLayer");
    document.body.removeChild(over);
    document.body.removeChild(over2);
    if (ieVersion != 7) { //������select��Ϊ����
        var oSelects = document.getElementsByTagName("select");
        for (var i = 0; i < oSelects.length; i++) {
            oSelects[i].disabled = false;
            oSelects[i].style.visibility = "visible";
        }
    }
}
