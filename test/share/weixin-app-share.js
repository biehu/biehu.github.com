/*
 * 绑定微信分享事件
 * 
 * var weixinShareData = {
    "img_url":"",
    "link":"",
    "title":"",
    "desc":""
};
 * 
 */
function bindWeixinFun(){
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        // 分享到朋友圈;
        WeixinJSBridge.on('menu:share:timeline', function(argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": weixinShareData.img_url,
                "img_width": "92",
                "img_height": "92",
                "link": weixinShareData.link,
                "desc": weixinShareData.desc,
                "title": weixinShareData.title
            }, function(){});
        });
        WeixinJSBridge.on('menu:share:appmessage', function(argv) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "img_url": weixinShareData.img_url,
                "link": weixinShareData.link,
                "desc": weixinShareData.desc,
                "title": weixinShareData.title
            }, function(){});
        });
    }, false);
}

bindWeixinFun();