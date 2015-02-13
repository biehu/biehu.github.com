/*
** <summary>
** Cookie处理
** </summary>
** <param name="name">cookie键名</param>
** <param name="value">cookie键值</param>
** <param name="option">可选参数</param>
*/
var cookie = {
	/*设置cookie*/
	setCookie:function(name, value, option){ 
		var str = name +"="+ escape(value); 
		if(option){ 
			if(option.expireHours){ 
				var d = new Date(); 
				d.setTime(d.getTime()+option.expireHours*3600*1000); 
				str += "; expires="+d.toGMTString(); 
			} 
			if(option.path) str += "; path="+option.path; 
			if(option.domain) str += "; domain="+option.domain; 
			if(option.secure) str += "; true"; 
		}
		document.cookie = str; 
	} ,

	/*获取cookie*/
	getCookie:function(name){ 
		var arr = document.cookie.split("; "); 
		if(arr.length == 0) return ""; 
		for(var i=0; i <arr.length; i++)
		{ 
			tmp = arr[i].split("="); 
			if(tmp[0] == name)
			{
				return unescape(tmp[1]); 
			}
		} 
		return "";
	} ,

	/*删除cookie*/
	delCookie:function(name){ 
		this.setCookie(name,"",{expireHours:-1});
	} ,

	/*获取cookie长度*/
	getLength:function(){
		return document.cookie.split("; ").length;
	}
};

var path = cookie.getCookie("cpath");


if (path == "")
{
	path = "default/default.css";
}

var link = document.createElement("link");
link.setAttribute("rel" ,"stylesheet");
link.setAttribute("type" ,"text/css");
link.setAttribute("href" ,path);

document.getElementsByTagName("head")[0].appendChild(link);