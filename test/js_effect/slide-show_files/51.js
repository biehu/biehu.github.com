//登录相关
function getQueryString(d) {
    var c = {},
        e = d,
        b = /([^&=]+)=([^&]*)/g,
        a;
    while (a = b.exec(e)) {
        c[decodeURIComponent(a[1])] = decodeURIComponent(a[2])
    }
    return c;
}
function lejulogin() {
    var a = getCookie("SUP") || getCookie("LUP");
    a = decodeURIComponent(a);
    var cookieobj = getQueryString(a);
    var nick = cookieobj.nick || cookieobj.email;
    
    // console.log(nick);
    if(nick){
        var userid = cookieobj.uid;
        window.setloginmsg(userid, nick);
        // getJson('http://bbs0.house.sina.com.cn/api/userinfo.php?' + userid + '&&return_type=jsonp&callback=setloginmsg');
        document.getElementById('loginAfter').style.display = "";
        document.getElementById('loginBefore').style.display = "none";
        document.getElementById('userName').innerHTML = nick;
    }
}

function setloginmsg(userid, nick) {
    //
}

function getJson(url) {
    var s = document.createElement('script');
    s.src = url;
    document.getElementsByTagName("head")[0].appendChild(s);
}

function getCookie(a) {
    var b;
    b = a + "=";
    offset = document.cookie.indexOf(b);
    if (offset != -1) {
        offset += b.length;
        end = document.cookie.indexOf(";", offset);
        if (end == -1) {
            end = document.cookie.length;
        }
        return document.cookie.substring(offset, end);
    }
    else {
        return "";
    }
}

function clearCookie(a) {
    document.cookie = a + "=; " + "domain=sina.com.cn; path=/; ";
}

function leju_logout() {
    clearCookie('SUP');
    clearCookie('LUP');
    document.getElementById('loginAfter').style.display = "none";
    document.getElementById('loginBefore').style.display = "";
}