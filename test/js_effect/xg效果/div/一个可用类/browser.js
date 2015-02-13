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
���濴һ����ҳ����ʱ��Ҫ��ӵķ������й���ҳ���غͳ�ʼ�������������£�
//��ҳ���ص���initialize��getBrowserInfo����
Event.observe(window, 'load', initialize, false);
Event.observe(window, 'load', getBrowserInfo, false);
//δ����ʱ��ջ���
Event.observe(window, 'unload', Event.unloadCache, false);
//��ʼ������
function initialize(){...}{
        //���ø÷���Ϊ��ҳ��Ӹ��ǲ�͸�����ʾ��
        addLightboxMarkup();
        //Ϊÿ���ɸ�����ʾ��Ԫ�ش���lightbox����
        lbox = document.getElementsByClassName('lbOn');
        for(i = 0; i < lbox.length; i++) {
                    valid = new lightbox(lbox[i]);
        }
}

// ʹ��Dom�����������ǲ�͸�����
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