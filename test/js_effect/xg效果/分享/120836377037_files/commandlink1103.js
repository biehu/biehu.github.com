var domainName = "";
try{
	var curLink = location.href;
//	var curLink = "http://info.jj.hc360.com/2008/08/25072058995.shtml";
	domainName = curLink.substring(curLink.indexOf("info")+5,curLink.indexOf("hc360")-1);

}
catch(e){}
var shareLink = encodeURIComponent(curLink);
var shareTitle = encodeURIComponent(document.title);
document.write("<div id=\"addItem\">");
document.write("     <div id=\"addItemFirst\" style=\"height:auto\">");
//document.write("	     <div id=\"addItemFirstLeft\">");
//document.write("		    <iframe src=\"iframe_comm.html\" width=\"100%\" height=\"20\" frameborder=\"0\" scrolling=\"no\" id=\"comwin\" marginheight=\"0\" marginwidth=\"0\" allowtransparency></iframe>");
//document.write("		 </div>");
document.write("		 <div id=\"addItemFirstRight\" style=\"padding:2px 0 5px;*padding-top:10px;float:none;width:auto\">");
document.write("		     <ul style=\"overflow:hidden;zoom:1\">");
document.write("		        <li id=\"indexP\"><a href=\"http://www." + domainName + ".hc360.com\" title=\"返回首页\" onmousedown=\"return hcclick('?" + domainName + "_tracelog=endartical_index')\">首页</a></li>");
//document.write("				<li id=\"shareP\"><a title=\"复制标题和链接 \" onclick=\"copyToClipBoard()\"  onmousedown=\"return hcclick('?" + domainName + "_tracelog=endartical_copy')\" style=\"cursor:pointer;\">分享</a></li>");
document.write("				<li id=\"printP\"><a onclick=\"Javascript:window.print();\"  style=\"cursor:pointer;\">打印</a></li>");
document.write("				<li id=\"fontP\">字体[<a onclick=\"javascript:SetFontSize(16)\" style=\"cursor:pointer;\">大</a> <a onclick=\"javascript:SetFontSize(14)\" style=\"cursor:pointer;\">中</a> <a onclick=\"javascript:SetFontSize(12)\" style=\"cursor:pointer;\">小</a>]</li>");
document.write("				<li style=\"float:right;\"><span style=\"vertical-align:3px\">分享到：</span><a title=\"分享到新浪微博\" href=\"http://v.t.sina.com.cn/share/share.php?url="+shareLink+"&amp;title="+shareTitle+"\" target=\"_blank\" style=\"margin:0 5px\"><img src=\"http://www.hc360.com/js/cms/images/icon_sinawb.gif\"/></a><a title=\"分享到腾讯微博\" href=\"http://v.t.qq.com/share/share.php?title="+shareTitle+"&amp;url="+shareLink+"\"  target=\"_blank\" style=\"margin:0 5px\"><img src=\"http://www.hc360.com/js/cms/images/icon_qqwb.gif\"/></a><a title=\"分享到人人网\" href=\"http://share.xiaonei.com/share/buttonshare.do?link="+shareLink+"&amp;title="+shareTitle+"\"  target=\"_blank\" style=\"margin:0 5px\"><img src=\"http://www.hc360.com/js/cms/images/icon_renren.gif\"/></a><a title=\"分享到开心网\" href=\"http://www.kaixin001.com/~repaste/repaste.php?rtitle="+shareTitle+"&amp;rurl="+shareLink+"\" target=\"_blank\" style=\"margin:0 5px\"><img src=\"http://www.hc360.com/js/cms/images/icon_kaixin.gif\"/></a><a title=\"分享到豆瓣\" href=\"http://www.douban.com/recommend/?url="+shareLink+" &amp;title="+shareTitle+"\" target=\"_blank\" style=\"margin:0 5px\"><img src=\"http://www.hc360.com/js/cms/images/icon_douban.gif\"/></a><a title=\"分享到MSN/QQ\" href=\"javascript:showMsn(\'copy_share\');\" style=\"margin:0 5px\"><img src=\"http://www.hc360.com/js/cms/images/icon_qq.gif\"/></a><a title=\"分享到MSN/QQ\" href=\"javascript:showMsn(\'copy_share\');\" style=\"margin:0 5px\"><img src=\"http://www.hc360.com/js/cms/images/icon_msn.gif\"/></a></li>");
document.write("		     </ul>");
document.write("             <div style=\"display: none;clear:both;padding:10px 0;text-align:right\" id=\"copy_share\">分享给：MSN  QQ好友&nbsp;<input id=\"share_text\" name=\"share_text\" type=\"text\" value=\""+document.title+" "+document.location.href+"\" readonly=\"readonly\"><input type=\"button\" value=\"复制\" onclick=\"copyShareUrl(\'copy_share\',\'share_text\');\"></div>");
document.write("		 </div>");
document.write("	 </div>");
var hflag = false;
var kxHy = new Array();
kxHy[0] = "auto";
kxHy[1] = "qipei";
kxHy[2] = "auto-a";
kxHy[3] = "auto-m";
kxHy[4] = "cm";
kxHy[5] = "machine";
kxHy[6] = "motor";
kxHy[7] = "broadcast";
kxHy[8] = "tele";
kxHy[9] = "hotel";
kxHy[10] = "edu";
kxHy[11] = "ec";
kxHy[12] = "electric";
kxHy[13] = "it";
kxHy[14] = "bpq";
kxHy[15] = "power";
kxHy[16] = "secu";
kxHy[17] = "fire";
kxHy[18] = "havcr";
kxHy[19] = "hp";
kxHy[20] = "water";
kxHy[21] = "pv";
kxHy[22] = "ep";
kxHy[23] = "pf";
kxHy[24] = "coatings";
kxHy[25] = "chem";
kxHy[26] = "plas";
kxHy[27] = "shoes";
kxHy[28] = "leather";
kxHy[29] = "oil";
kxHy[30] = "homea";
kxHy[31] = "av";
kxHy[32] = "audio";
kxHy[33] = "xjd";
kxHy[34] = "op";
kxHy[35] = "food";
kxHy[36] = "printing";
kxHy[37] = "screen";
kxHy[38] = "paper";
kxHy[39] = "pharmacy";
kxHy[40] = "ad";
kxHy[41] = "gift";
kxHy[42] = "textile";
kxHy[43] = "wujin";
kxHy[44] = "jj";
kxHy[45] = "cloth";
kxHy[46] = "bm";
kxHy[47] = "service";
kxHy[48] = "lamp";
kxHy[49] = "zs";
kxHy[50] = "jdpj";
for(var j=0;j<kxHy.length;j++){
	if(domainName==kxHy[j]){
		hflag = true; 
		break;
	}
}
if(hflag==true){
	document.write("	 <div id=\"iframeCon\">");
	document.write("<iframe src=\"http://info." + domainName + ".hc360.com/list/iframe_end_search.shtml\" scrolling=\"no\" width=\"100%\" height=\"80\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\" allowtransparency></iframe>");
	document.write("	 </div>");
}
//document.write("    <div id=\"addItemAd\" style=\"text-align:center;\"><iframe src=\"http://info.hc360.com/list/iframe_logo2.shtml\" width=\"560\" height=\"80\" frameborder=\"0\" scrolling=\"no\" allowtransparency ></iframe> ");
//document.write("       <div class=\"addItemAdCon adCrack\"><a href=\"http://www.hc360.com/shop\" target=\"_blank\"><img src=\"http://www.edu.hc360.com/images/endpage0908/endpage0908_29.gif\" /></a></div>");
//document.write("	   <div class=\"addItemAdCon\"><a href=\"http://www.hc360.com/shop/expo\"  target=\"_blank\"><img src=\"http://img.hc360.com/b2b/info/images/201004/201004261712353605.jpg\" /></a></div>");
//document.write("    </div>");
document.write("</div>");

function SetFontSize(size){
	document.getElementById("artical").style.fontSize = size+'px';
}

function copyToClipBoard(){
	var clipBoardContent="";//初始清空
	var titleStr = window.document.title.split("-")[0];
	clipBoardContent+=titleStr;//写入Title
    clipBoardContent+='\r\n'+window.location.href;//换行，写入URL
	window.clipboardData.setData("Text",clipBoardContent);//写入ClipBoard
	alert("成功复制标题及链接,现在可以粘贴到“慧聪发发”发给好友了!");//弹出提示，如不需要可删除或屏蔽此行
}

function checkStyle(){
	if(document.getElementById("foreword")==null){
		document.getElementById("title").style.borderBottom = "1px solid #B3B2B2";
	}else{
		document.getElementById("title").style.borderBottom = "0px solid #B3B2B2";
	}
}

//function choicObj(){
//	var areastr= document.getElementById("hid_areastr").value;
//	var idstr= document.getElementById("hid_idstr").value;
//		document.getElementById("comwin").src = "http://comment.info.hc360.com/dignew.shtml?area=" + areastr + "&id=" + idstr;
//}

//checkStyle();
//choicObj();

//显示复制分享给msn qq好友
function showMsn(copyShareId){
	if(!document.getElementById(copyShareId)) return;
	document.getElementById(copyShareId).style.display = "block";
}
//复制分享给msn qq好友
function copyShareUrl(copyShareId,inputId){
	if(!document.getElementById(inputId)) return;
	if (window.clipboardData){
		var copyText=document.getElementById(inputId).value;
		window.clipboardData.clearData();
		window.clipboardData.setData("Text",copyText);
		alert("复制成功，你可以粘贴到论坛分享给坛友。");
		if(!document.getElementById(copyShareId)) return;
		document.getElementById(copyShareId).style.display = "none";
	}else{
		alert("您使用的浏览器不支持此复制功能，请使用Ctrl+C或鼠标右键。");
		document.getElementById(inputId).select();
	}
	return false;
}