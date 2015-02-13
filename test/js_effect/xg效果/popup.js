function $getId(d){return document.getElementById(d);}
function $getClass(name,type,parent){
    var r = [];
    var re = new RegExp("(^|\\s)"+name+"(\\s|$)");
    var e = (parent ||document).getElementsByTagName(type || "*");
    for ( var j = 0,len=e.length;j < len; j++ )
        if (re.test(e[j].className)) r.push(e[j]);
    return r;
}
function getE(e){
	return e ? e.target : window.event.srcElement;
}
function openMask(objId,maskId){   
   var testObj =$getId(objId);
   var mask=$getId(maskId);
   if(!testObj || !mask) return false;
   testObj.style.display="block";
   mask.style.display="block";
   resizeMask(testObj,mask); 
   return false;
}
function closeMask(objId,maskId){
	$getId(objId).style.display=$getId(maskId).style.display="none";
}
function getStyle(elem,name) {
    if (elem.style[name])
        return elem.style[name];
    else if (elem.currentStyle)
        return elem.currentStyle[name];
    else if (window.getComputedStyle)
        return window.getComputedStyle(elem,null)[name];
    else
        return null;
}
function resizeMask(t,mask){
	var Maskw,Maskh,Openw,Openh;
	Maskw = document.body.offsetWidth;
	Maskh = window.screen.height; 
	Openw =t.offsetWidth; 
	Openh =t.offsetHeight; 
	var scrollPos;
	if (typeof window.pageYOffset != 'undefined') {
	   scrollPos = window.pageYOffset;
	}
	else if (typeof document.compatMode != 'undefined' &&
		 document.compatMode != 'BackCompat') {
	   scrollPos = document.documentElement.scrollTop;
	}
	else if (typeof document.body != 'undefined') {
	   scrollPos = document.body.scrollTop;
	} 
	var MaskObj = mask;
	MaskObj.style.width = Maskw+"px";
	var bodyH=document.body.scrollHeight?document.body.scrollHeight:document.documentElement.scrollHeight;
	MaskObj.style.height=bodyH+"px";
	MaskObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=50,finishOpacity=100"; 
	MaskObj.style.opacity = "0.5";
	MaskObj.style.background = "#000";
	MaskObj.style.zIndex = "1000";
	var PopObj = t;
	PopObj.style.left = (Maskw - Openw) / 2 + "px";
	PopObj.style.top =scrollPos+(-200 + Maskh - Openh) / 2 +"px";
	PopObj.style.width = Openw;
	PopObj.style.height = Openh;
	PopObj.style.zIndex = "1001";
}