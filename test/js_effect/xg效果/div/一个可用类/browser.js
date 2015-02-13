var detect = navigator.userAgent.toLowerCase();
var OS,browser,version,total,thestring;

function getBrowserInfo(){
       if (checkIt('konqueror')) {
            browser = "Konqueror";
            OS = "Linux";
       }
       else if (checkIt('safari')) browser = "Safari"
       else if (checkIt('omniWeb')) browser = "OmniWeb"
       else if (checkIt('opera')) browser = "Opera"
       else if (checkIt('Webtv')) browser = "WebTV";
       else if (checkIt('icab')) browser = "iCab"
       else if (checkIt('msie')) browser = "Internet Explorer"
       else if (!checkIt('compatible')){
             browser = "Netscape Navigator"
            version = detect.charAt(8);
       }
       else browser = "An unknown browser";

       if (!version) version = detect.charAt(place + thestring.length);

       if(!OS){
            if (checkIt('linux')) OS = "Linux";
            else if (checkIt('x11')) OS = "Unix";
            else if (checkIt('mac')) OS = "Mac"
            else if (checkIt('win')) OS = "Windows"
            else OS = "an unknown operating system";
       }
}

function checkIt(string){
        place = detect.indexOf(string) + 1;
        thestring = string;
        return place;
}
下面看一下网页加载时需要添加的方法。有关网页加载和初始化方法代码如下：
//网页加载调用initialize和getBrowserInfo方法
Event.observe(window, 'load', initialize, false);
Event.observe(window, 'load', getBrowserInfo, false);
//未加载时清空缓存
Event.observe(window, 'unload', Event.unloadCache, false);
//初始化方法
function initialize(){...}{
        //调用该方法为该页添加覆盖层和高亮显示层
        addLightboxMarkup();
        //为每个可高亮显示的元素创建lightbox对象
        lbox = document.getElementsByClassName('lbOn');
        for(i = 0; i < lbox.length; i++) {
                    valid = new lightbox(lbox[i]);
        }
}

// 使用Dom方法创建覆盖层和高亮层
function addLightboxMarkup(){
        bod = document.getElementsByTagName('body')[0];
        overlay = document.createElement('div');
        overlay.id = 'overlay';
        lb = document.createElement('div');
        lb.id = 'lightbox';
        lb.className = 'loading';
        lb.innerHTML = '<div id="lbLoadMessage">' +
                                           '<p>Loading</p>' +
                                           '</div>';
        bod.appendChild(overlay);
        bod.appendChild(lb);
}