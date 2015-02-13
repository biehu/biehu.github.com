//汽车汽配	汽车 、汽车用品、汽车配件、维修保养、摩托车
//弹出画中画 290x135
document.write('<div id="epop" style="Z-INDEX:99999;right:0px;visibility:hidden; POSITION:absolute; TOP:0px;"> ');
document.write('<table width="290" border="0" cellpadding="0" cellspacing="0" style="border:1px #DC0000 solid;background:#DC0000;">');
document.write('<tr>');
document.write('<td width="229" height="27" background="http://www.ep.hc360.com/images/bg.jpg" style="color:#fff; text-align:left;">&nbsp;慧聪提示</td>');
document.write('<td width="61" background="http://www.ep.hc360.com/images/bg.jpg" align="right"><img src="http://www.water.hc360.com/images/zt_img/min.gif" width="15" height="15" onclick="changeDiv();" id="ctrl" style="cursor:pointer;" /><img style="cursor:pointer;" src="http://www.water.hc360.com/images/zt_img/close.gif" width="15" height="15" onclick="closeDiv();" />&nbsp;</td>');
document.write('</tr><tr>');
document.write('<td colspan="2" id="popad">');
document.write('<iframe marginheight="0" marginwidth="0" frameborder="0" width="290" height="135" scrolling="no" src="http://hcafp.allyes.com/main/adfshow?user=hcafp|news_fin_pop|qiche&db=hcafp&border=0&local=yes"></iframe></td></tr></table></div>');
var divTop,divLeft,divWidth,divHeight,docHeight,docWidth,objTimer,i = 0;
var bodyfrm = ( document.compatMode.toLowerCase()=="css1compat" ) ? document.documentElement : document.body;
function getMsg()
{
	try{
	divTop = parseInt(document.getElementById("epop").style.top,10);
	divLeft = parseInt(document.getElementById("epop").style.right,10);
	divHeight = parseInt(document.getElementById("epop").offsetHeight,10);
	divWidth = parseInt(document.getElementById("epop").offsetWidth,10);
	docWidth = bodyfrm.scrollLeft;
	docHeight = bodyfrm.clientHeight;
	document.getElementById("epop").style.top = parseInt(bodyfrm.scrollTop,10) + docHeight + 10+"px";//  divHeight
	document.getElementById("epop").style.right = parseInt(bodyfrm.scrollLeft,10)+2+"px";
	document.getElementById("epop").style.visibility="visible"
	objTimer = window.setInterval("moveDiv()",10)
	setTimeout("changeDiv()",8000);
	}
	catch(e){}
}

function resizeDiv()
	{
	try{
	divHeight = parseInt(document.getElementById("epop").offsetHeight,10)
	divWidth = parseInt(document.getElementById("epop").offsetWidth,10)
	docWidth = document.documentElement.clientWidth;
	docHeight = bodyfrm.clientHeight;
	document.getElementById("epop").style.top = docHeight - divHeight + parseInt(bodyfrm.scrollTop,10)+"px";
	document.getElementById("epop").style.right = parseInt(bodyfrm.scrollLeft,10)+2+"px";
	}
	catch(e){}
}

function moveDiv()
{
	try
	{
	if(parseInt(document.getElementById("epop").style.top,10) <= (docHeight - divHeight + parseInt(bodyfrm.scrollTop,10)))
	{
	window.clearInterval(objTimer)
	objTimer = window.setInterval("resizeDiv()",1)
	}
	divTop = parseInt(document.getElementById("epop").style.top,10)
	document.getElementById("epop").style.top = divTop - 1+"px";
	}
	catch(e){}
}

function closeDiv()
{
	document.getElementById('epop').style.visibility='hidden';
	if(objTimer) window.clearInterval(objTimer)
}
function changeDiv(){
	var cobj = document.getElementById('ctrl').src;	
	if(cobj=="http://www.water.hc360.com/images/zt_img/min.gif") {
		document.getElementById('popad').innerHTML = "";
		document.getElementById('ctrl').src = "http://www.water.hc360.com/images/zt_img/max.gif";
		}
	if(cobj=="http://www.water.hc360.com/images/zt_img/max.gif"){
		document.getElementById('ctrl').src = "http://www.water.hc360.com/images/zt_img/min.gif";
		document.getElementById('popad').innerHTML = '<iframe marginheight="0" marginwidth="0" frameborder="0" width="290" height="135" scrolling="no" src="http://hcafp.allyes.com/main/adfshow?user=hcafp|news_fin_pop|qiche&db=hcafp&border=0&local=yes"></iframe>';
		}
		
}
	window.onload = getMsg;
	window.onresize = resizeDiv;
	//window.onerror = function(){}