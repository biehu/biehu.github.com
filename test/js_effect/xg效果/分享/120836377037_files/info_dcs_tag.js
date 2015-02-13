var jrj_SDC_code = " <!-- START OF SDC Advanced Tracking Code --> "    +"\n"+
" <!-- Copyright (c) 1996-2005 WebTrends Inc.  All rights reserved. --> "    +"\n"+
" <!-- V7.5 --> "    +"\n"+
" <!-- $DateTime: 2005/07/20 17:14:11 $ --> "    +"\n"+
" <SCRIPT LANGUAGE=\"Javascript\"><!-- "    +"\n"+
" var gService = true; "    +"\n"+
" var gTimeZone = +8; "    +"\n"+
" // Code section for Enable First-Party Cookie Tracking "    +"\n"+
" function dcsCookie(){ "    +"\n"+
" 	if (typeof(dcsOther)==\"function\"){ "    +"\n"+
" 		dcsOther(); "    +"\n"+
" 	} "    +"\n"+
" 	else if (typeof(dcsPlugin)==\"function\"){ "    +"\n"+
" 		dcsPlugin(); "    +"\n"+
" 	} "    +"\n"+
" 	else if (typeof(dcsFPC)==\"function\"){ "    +"\n"+
" 		dcsFPC(gTimeZone); "    +"\n"+
" 	} "    +"\n"+
" } "    +"\n"+
" function dcsGetCookie(name){ "    +"\n"+
" 	var pos=document.cookie.indexOf(name+\"=\"); "    +"\n"+
" 	if (pos!=-1){ "    +"\n"+
" 		var start=pos+name.length+1; "    +"\n"+
" 		var end=document.cookie.indexOf(\";\",start); "    +"\n"+
" 		if (end==-1){ "    +"\n"+
" 			end=document.cookie.length; "    +"\n"+
" 		} "    +"\n"+
" 		return unescape(document.cookie.substring(start,end)); "    +"\n"+
" 	} "    +"\n"+
" 	return null; "    +"\n"+
" } "    +"\n"+
" function dcsGetCrumb(name,crumb){ "    +"\n"+
" 	var aCookie=dcsGetCookie(name).split(\":\"); "    +"\n"+
" 	for (var i=0;i<aCookie.length;i++){ "    +"\n"+
" 		var aCrumb=aCookie[i].split(\"=\"); "    +"\n"+
" 		if (crumb==aCrumb[0]){ "    +"\n"+
" 			return aCrumb[1]; "    +"\n"+
" 		} "    +"\n"+
" 	} "    +"\n"+
" 	return null; "    +"\n"+
" } "    +"\n"+
" function dcsFPC(offset){ "    +"\n"+
" 	if (typeof(offset)==\"undefined\"){ "    +"\n"+
" 		return; "    +"\n"+
" 	} "    +"\n"+
" 	var name=gFpc; "    +"\n"+
" 	var dCur=new Date(); "    +"\n"+
" 	dCur.setTime(dCur.getTime()+(dCur.getTimezoneOffset()*60000)+(offset*3600000)); "    +"\n"+
" 	var dExp=new Date(dCur.getTime()+315360000000); "    +"\n"+
" 	var dSes=new Date(dCur.getTime()); "    +"\n"+
" 	if (document.cookie.indexOf(name+\"=\")!=-1){ "    +"\n"+
" 		var id=dcsGetCrumb(name,\"id\"); "    +"\n"+
" 		var lv=parseInt(dcsGetCrumb(name,\"lv\")); "    +"\n"+
" 		var ss=parseInt(dcsGetCrumb(name,\"ss\")); "    +"\n"+
" 		if ((id==null)||(id==\"null\")||isNaN(lv)||isNaN(ss)){ "    +"\n"+
" 			return; "    +"\n"+
" 		} "    +"\n"+
" 		WT.co_f=id; "    +"\n"+
" 		WT.vt_f=\"0\"; "    +"\n"+
" 		WT.vt_f_a=\"0\"; "    +"\n"+
" 		var dLst=new Date(lv); "    +"\n"+
" 		dSes.setTime(ss); "    +"\n"+
" 		if ((dCur.getTime()>(dLst.getTime()+1800000))||(dCur.getTime()>(dSes.getTime()+28800000))){ "    +"\n"+
" 			dSes.setTime(dCur.getTime()); "    +"\n"+
" 			WT.vt_f_s=\"1\"; "    +"\n"+
" 		} "    +"\n"+
" 		if ((dCur.getDay()!=dLst.getDay())||(dCur.getMonth()!=dLst.getMonth())||(dCur.getYear()!=dLst.getYear())){ "    +"\n"+
" 			WT.vt_f_d=\"1\"; "    +"\n"+
" 		} "    +"\n"+
" 	} "    +"\n"+
" 	else{ "    +"\n"+
" 		var tmpname=name+\"_TMP=\"; "    +"\n"+
" 		document.cookie=tmpname+\"1\"; "    +"\n"+
" 		if (document.cookie.indexOf(tmpname)!=-1){ "    +"\n"+
" 			document.cookie=tmpname+\"; expires=Thu, 01-Jan-1970 00:00:01 GMT\"; "    +"\n"+
" 			if ((typeof(gWtId)!=\"undefined\")&&(gWtId!=\"\")){ "    +"\n"+
" 				WT.co_f=gWtId; "    +"\n"+
" 				WT.vt_f=\"0\"; "    +"\n"+
" 			} "    +"\n"+
" 			else if ((typeof(gTempWtId)!=\"undefined\")&&(gTempWtId!=\"\")){ "    +"\n"+
" 				WT.co_f=gTempWtId; "    +"\n"+
" 				WT.vt_f=\"1\"; "    +"\n"+
" 			} "    +"\n"+
" 			else{ "    +"\n"+
" 				WT.co_f=\"2\"; "    +"\n"+
" 				var cur=dCur.getTime().toString(); "    +"\n"+
" 				for (var i=2;i<=(32-cur.length);i++){ "    +"\n"+
" 					WT.co_f+=Math.floor(Math.random()*16.0).toString(16); "    +"\n"+
" 				} "    +"\n"+
" 				WT.co_f+=cur; "    +"\n"+
" 				WT.vt_f=\"1\"; "    +"\n"+
" 			} "    +"\n"+
" 			WT.vt_f_a=(typeof(gWtAccountRollup)!=\"undefined\")?\"0\":\"1\"; "    +"\n"+
" 			WT.vt_f_s=\"1\"; "    +"\n"+
" 			WT.vt_f_d=\"1\"; "    +"\n"+
" 		} "    +"\n"+
" 		else{ "    +"\n"+
" 			WT.vt_f=\"2\"; "    +"\n"+
" 			WT.vt_f_a=\"2\"; "    +"\n"+
" 			return; "    +"\n"+
" 		} "    +"\n"+
" 	} "    +"\n"+
" 					var loginuser=dcsGetCookie(\"LoginID\"); "    +"\n"+
"						var is_user =\"0\"; "    +"\n"+
" 					if (loginuser!= null){ "    +"\n"+
"								is_user=\"1\"; "    +"\n"+
" 					} "    +"\n"+ 
" 			var df=\"&isuser=\"+is_user+\"&loginid=\"+loginuser;"    +"\n"+
" 	WT.vt_sid=WT.co_f+\".\"+dSes.getTime()+df; "    +"\n"+
" 	var expiry=\"; expires=\"+dExp.toGMTString(); "    +"\n"+
" 	document.cookie=name+\"=\"+\"id=\"+WT.co_f+\":lv=\"+dCur.getTime().toString()+\":ss=\"+dSes.getTime().toString()+expiry+\"; path=/\"+(((typeof(gFpcDom)!=\"undefined\")&&(gFpcDom!=\"\"))?(\"; domain=\"+gFpcDom):(\"\")); "    +"\n"+
" } "    +"\n"+

" // Code section for Use the new first-party cookie generated with this tag. "    +"\n"+
" var gFpc=\"WT_FPC\"; "    +"\n"+
" var gWtId=\"\"; "    +"\n"+
" var gTempWtId=\"\"; "    +"\n"+
" if (gService){ "    +"\n"+
" 	var gConvert=true; "    +"\n"+
" } "    +"\n"+


" function dcsMultiTrack(){ "    +"\n"+
" 	for (var i=0;i<arguments.length;i++){ "    +"\n"+
" 		if (arguments[i].indexOf('WT.')==0){ "    +"\n"+
" 				WT[arguments[i].substring(3)]=arguments[i+1]; "    +"\n"+
" 				i++; "    +"\n"+
" 		} "    +"\n"+
" 		if (arguments[i].indexOf('DCS.')==0){ "    +"\n"+
" 				DCS[arguments[i].substring(4)]=arguments[i+1]; "    +"\n"+
" 				i++; "    +"\n"+
" 		} "    +"\n"+
" 		if (arguments[i].indexOf('DCSext.')==0){ "    +"\n"+
" 				DCSext[arguments[i].substring(7)]=arguments[i+1]; "    +"\n"+
" 				i++; "    +"\n"+
" 		} "    +"\n"+
" 	} "    +"\n"+
" 	var dCurrent=new Date(); "    +"\n"+
" 	DCS.dcsdat=dCurrent.getTime(); "    +"\n"+
" 	dcsTag(); "    +"\n"+
" } "    +"\n"+


" function dcsAdv(){ "    +"\n"+
" 	dcsFunc(\"dcsCookie\"); "    +"\n"+
" } "    +"\n"+

" //--> "    +"\n"+
" </SCRIPT> "    +"\n"+
" <!-- END OF SDC Advanced Tracking Code --> "    +"\n"+

" <!-- START OF SmartSource Data Collector TAG --> "    +"\n"+
" <!-- Copyright (c) 1996-2005 WebTrends Inc.  All rights reserved. --> "    +"\n"+
" <!-- V7.5 --> "    +"\n"+
" <!-- $DateTime: 2005/07/20 17:14:11 $ --> "    +"\n"+
" <SCRIPT LANGUAGE=\"Javascript\"><!-- "    +"\n"+
" gVersion=\"1.0\"; "    +"\n"+
" //--> "    +"\n"+
" </SCRIPT> "    +"\n"+
" <SCRIPT LANGUAGE=\"Javascript1.1\"><!-- "    +"\n"+
" gVersion=\"1.1\"; "    +"\n"+
" //--> "    +"\n"+
" </SCRIPT> "    +"\n"+
" <SCRIPT LANGUAGE=\"Javascript1.2\"><!-- "    +"\n"+
" gVersion=\"1.2\"; "    +"\n"+
" var RE={\"%09\":/\\t/g,\"%20\":/ /g,\"%23\":/\\#/g,\"%26\":/\\&/g,\"%2B\":/\\+/g,\"%3F\":/\\?/g,\"%5C\":/\\\\/g}; "    +"\n"+
" //--> "    +"\n"+
" </SCRIPT> "    +"\n"+
" <SCRIPT LANGUAGE=\"Javascript1.3\"><!-- "    +"\n"+
" gVersion=\"1.3\"; "    +"\n"+
" if (window.ActiveXObject){ "    +"\n"+
" 	var gFV=\"\"; "    +"\n"+
" 	for (var gVer=2;gVer<=10;gVer++){ "    +"\n"+
" 		try{ "    +"\n"+
" 			var gFlash = eval(\"new ActiveXObject('ShockwaveFlash.ShockwaveFlash.\"+gVer+\"');\"); "    +"\n"+
" 			if (gFlash){ "    +"\n"+
" 				gFV=gVer+\".0\"; "    +"\n"+
" 				break; "    +"\n"+
" 			} "    +"\n"+
" 		} "    +"\n"+
" 		catch(e){ "    +"\n"+
" 		} "    +"\n"+
" 	} "    +"\n"+
" } "    +"\n"+
" //--> "    +"\n"+
" </SCRIPT> "    +"\n"+
" <SCRIPT LANGUAGE=\"Javascript1.4\"><!-- "    +"\n"+
" gVersion=\"1.4\"; "    +"\n"+
" //--> "    +"\n"+
" </SCRIPT> "    +"\n"+
" <SCRIPT LANGUAGE=\"Javascript1.5\"><!-- "    +"\n"+
" gVersion=\"1.5\"; "    +"\n"+
" //--> "    +"\n"+
" </SCRIPT> "    +"\n"+
" <SCRIPT LANGUAGE=\"JavaScript\"><!-- "    +"\n"+
" var gImages=new Array; "    +"\n"+
" var gIndex=0; "    +"\n"+
" var DCS=new Object(); "    +"\n"+
" var WT=new Object(); "    +"\n"+
" var DCSext=new Object(); "    +"\n"+
" var gQP=new Array(); "    +"\n"+

" var gDomain=\"wisecode.b2b.hc360.com\"; "    +"\n"+
" var gDcsId=\"dcscdeyp1fhcfnncczq87vdyc_7c6u\"; "    +"\n"+
" // Add customizations here "    +"\n"+

" if ((typeof(gConvert)!=\"undefined\")&&gConvert&&(document.cookie.indexOf(gFpc+\"=\")==-1)){ "    +"\n"+
" 	document.write(\"<SCR\"+\"IPT Language='JavaScript' SRC='\"+\"http\"+(window.location.protocol.indexOf('https:')==0?'s':'')+\"://\"+gDomain+\"/\"+gDcsId+\"/wtid.js\"+\"'></SCR\"+\"IPT>\"); "    +"\n"+
" } "    +"\n"+
" //--> "    +"\n"+
" </SCRIPT> "    +"\n"+
" <SCRIPT LANGUAGE=\"Javascript\"><!-- "    +"\n"+
" function dcsVar(){ "    +"\n"+
" 	var dCurrent=new Date(); "    +"\n"+
" 	/* "    +"\n"+
" 	WT.tz=dCurrent.getTimezoneOffset()/60*-1; "    +"\n"+
" 	if (WT.tz==0){ "    +"\n"+
" 		WT.tz=\"0\"; "    +"\n"+
" 	} "    +"\n"+
" 	WT.bh=dCurrent.getHours(); "    +"\n"+
" 	WT.ul=navigator.appName==\"Netscape\"?navigator.language:navigator.userLanguage; "    +"\n"+
" 	if (typeof(screen)==\"object\"){ "    +"\n"+
" 		WT.cd=navigator.appName==\"Netscape\"?screen.pixelDepth:screen.colorDepth; "    +"\n"+
" 		WT.sr=screen.width+\"x\"+screen.height; "    +"\n"+
" 	} "    +"\n"+
" 	if (typeof(navigator.javaEnabled())==\"boolean\"){ "    +"\n"+
" 		WT.jo=navigator.javaEnabled()?\"Yes\":\"No\"; "    +"\n"+
" 	} "    +"\n"+
" 	if (document.title){ "    +"\n"+
" 		WT.ti=document.title; "    +"\n"+
" 	} "    +"\n"+
" 	WT.js=\"Yes\"; "    +"\n"+
" 	if (typeof(gVersion)!=\"undefined\"){ "    +"\n"+
" 		WT.jv=gVersion; "    +"\n"+
" 	} "    +"\n"+
" 	if (document.body&&document.body.addBehavior){ "    +"\n"+
" 		document.body.addBehavior(\"#default#clientCaps\"); "    +"\n"+
" 		if (document.body.connectionType){ "    +"\n"+
" 			WT.ct=document.body.connectionType; "    +"\n"+
" 		} "    +"\n"+
" 		document.body.addBehavior(\"#default#homePage\"); "    +"\n"+
" 		WT.hp=document.body.isHomePage(location.href)?\"1\":\"0\"; "    +"\n"+
" 	} "    +"\n"+
" 	if (parseInt(navigator.appVersion)>3){ "    +"\n"+
" 		if ((navigator.appName==\"Microsoft Internet Explorer\")&&document.body){ "    +"\n"+
" 			WT.bs=document.body.offsetWidth+\"x\"+document.body.offsetHeight; "    +"\n"+
" 		} "    +"\n"+
" 		else if (navigator.appName==\"Netscape\"){ "    +"\n"+
" 			WT.bs=window.innerWidth+\"x\"+window.innerHeight; "    +"\n"+
" 		} "    +"\n"+
" 	} "    +"\n"+
" 	WT.fi=\"No\"; "    +"\n"+
" 	if (window.ActiveXObject){ "    +"\n"+
" 		if ((typeof(gFV)!=\"undefined\")&&(gFV.length>0)){ "    +"\n"+
" 					WT.fi=\"Yes\"; "    +"\n"+
" 			WT.fv=gFV; "    +"\n"+
" 		} "    +"\n"+
" 	} "    +"\n"+
" 	else if (navigator.plugins&&navigator.plugins.length){ "    +"\n"+
" 		for (var i=0;i<navigator.plugins.length;i++){ "    +"\n"+
" 			if (navigator.plugins[i].name.indexOf('Shockwave Flash')!=-1){ "    +"\n"+
" 				WT.fi=\"Yes\"; "    +"\n"+
" 				WT.fv=navigator.plugins[i].description.split(\" \")[2]; "    +"\n"+
" 				break; "    +"\n"+
" 			} "    +"\n"+
" 		} "    +"\n"+
" 	} "    +"\n"+
" 	WT.sp=\"@@SPLITVALUE@@\"; "    +"\n"+
" 	*/ "    +"\n"+
" 	DCS.dcsdat=dCurrent.getTime(); "    +"\n"+
" 	DCS.dcssip=window.parent.location.hostname; "    +"\n"+
" 	DCS.dcsuri=window.parent.location.pathname; "    +"\n"+
" 	if (window.parent.location.search){ "    +"\n"+
" 		DCS.dcsqry=window.parent.location.search; "    +"\n"+
" 		if (gQP.length>0){ "    +"\n"+
" 			for (var i=0;i<gQP.length;i++){ "    +"\n"+
" 				var pos=DCS.dcsqry.indexOf(gQP[i]); "    +"\n"+
" 				if (pos!=-1){ "    +"\n"+
" 					var front=DCS.dcsqry.substring(0,pos); "    +"\n"+
" 					var end=DCS.dcsqry.substring(pos+gQP[i].length,DCS.dcsqry.length); "    +"\n"+
" 					DCS.dcsqry=front+end; "    +"\n"+
" 				} "    +"\n"+
" 			} "    +"\n"+
" 		} "    +"\n"+
" 	} "    +"\n"+
" 	if ((window.parent.document.referrer!=\"\")&&(window.parent.document.referrer!=\"-\")){ "    +"\n"+
" 		if (!(navigator.appName==\"Microsoft Internet Explorer\"&&parseInt(navigator.appVersion)<4)){ "    +"\n"+
" 			DCS.dcsref=window.parent.document.referrer; "    +"\n"+
" 		} "    +"\n"+
" 	} "    +"\n"+
" } "    +"\n"+

" function A(N,V){ "    +"\n"+
" 	return \"&\"+N+\"=\"+dcsEscape(V); "    +"\n"+
" } "    +"\n"+

" function dcsEscape(S){ "    +"\n"+
" 	if (typeof(RE)!=\"undefined\"){ "    +"\n"+
" 		var retStr = new String(S); "    +"\n"+
" 		for (R in RE){ "    +"\n"+
" 			retStr = retStr.replace(RE[R],R); "    +"\n"+
" 		} "    +"\n"+
" 		return retStr; "    +"\n"+
" 	} "    +"\n"+
" 	else{ "    +"\n"+
" 		return escape(S); "    +"\n"+
" 	} "    +"\n"+
" } "    +"\n"+

" function dcsLoadHref(evt){ "    +"\n"+
" 	if ((typeof(gHref)!=\"undefined\")&&(gHref.length>0)){ "    +"\n"+
" 		window.location=gHref; "    +"\n"+
" 		gHref=\"\"; "    +"\n"+
" 	} "    +"\n"+
" } "    +"\n"+

" function dcsCreateImage(dcsSrc){ "    +"\n"+
" 	if (document.images){ "    +"\n"+
" 		gImages[gIndex]=new Image; "    +"\n"+
" 		if ((typeof(gHref)!=\"undefined\")&&(gHref.length>0)){ "    +"\n"+
" 			gImages[gIndex].onload=gImages[gIndex].onerror=dcsLoadHref; "    +"\n"+
" 		} "    +"\n"+
" 		gImages[gIndex].src=dcsSrc; "    +"\n"+
" 		gIndex++; "    +"\n"+
" 	} "    +"\n"+
" 	else{ "    +"\n"+
" 		document.write('<IMG BORDER=\"0\" NAME=\"DCSIMG\" WIDTH=\"1\" HEIGHT=\"1\" SRC=\"'+dcsSrc+'\">'); "    +"\n"+
" 	} "    +"\n"+
" } "    +"\n"+

" function dcsMeta(){ "    +"\n"+
" 	var elems; "    +"\n"+
" 	if (document.all){ "    +"\n"+
" 		elems=document.all.tags(\"meta\"); "    +"\n"+
" 	} "    +"\n"+
" 	else if (document.documentElement){ "    +"\n"+
" 		elems=document.getElementsByTagName(\"meta\"); "    +"\n"+
" 	} "    +"\n"+
" 	if (typeof(elems)!=\"undefined\"){ "    +"\n"+
" 		for (var i=1;i<=elems.length;i++){ "    +"\n"+
" 			var meta=elems.item(i-1); "    +"\n"+
" 			if (meta.name){ "    +"\n"+
" 				if (meta.name.indexOf('WT.')==0){ "    +"\n"+
" 					WT[meta.name.substring(3)]=meta.content; "    +"\n"+
" 				} "    +"\n"+
" 				else if (meta.name.indexOf('DCSext.')==0){ "    +"\n"+
" 					DCSext[meta.name.substring(7)]=meta.content; "    +"\n"+
" 				} "    +"\n"+
" 				else if (meta.name.indexOf('DCS.')==0){ "    +"\n"+
" 					DCS[meta.name.substring(4)]=meta.content; "    +"\n"+
" 				} "    +"\n"+
" 			} "    +"\n"+
" 		} "    +"\n"+
" 	} "    +"\n"+
" } "    +"\n"+

" function dcsTag(){ "    +"\n"+
" 	var P=\"http\"+(window.location.protocol.indexOf('https:')==0?'s':'')+\"://\"+gDomain+(gDcsId==\"\"?'':'/'+gDcsId)+\"/dcs.gif?\"; "    +"\n"+
" 	for (N in DCS){ "    +"\n"+
" 		if (DCS[N]) { "    +"\n"+
" 			P+=A(N,DCS[N]); "    +"\n"+
" 		} "    +"\n"+
" 	} "    +"\n"+
" 	for (N in WT){ "    +"\n"+
" 		if (WT[N]) { "    +"\n"+
" 			P+=A(\"WT.\"+N,WT[N]); "    +"\n"+
" 		} "    +"\n"+
" 	} "    +"\n"+
" 	for (N in DCSext){ "    +"\n"+
" 		if (DCSext[N]) { "    +"\n"+
" 			P+=A(N,DCSext[N]); "    +"\n"+
" 		} "    +"\n"+
" 	} "    +"\n"+
" 	if (P.length>2048&&navigator.userAgent.indexOf('MSIE')>=0){ "    +"\n"+
" 		P=P.substring(0,2040)+\"&WT.tu=1\"; "    +"\n"+
" 	} "    +"\n"+
" 	dcsCreateImage(P); "    +"\n"+
" } "    +"\n"+

" function dcsFunc(func){ "    +"\n"+
" 	if (typeof(window[func])==\"function\"){ "    +"\n"+
" 		window[func](); "    +"\n"+
" 	} "    +"\n"+
" } "    +"\n"+

" dcsVar(); "    +"\n"+
" dcsMeta(); "    +"\n"+
" dcsFunc(\"dcsAdv\"); "    +"\n"+
" dcsTag(); "    +"\n"+
" //11//--> "    +"\n"+
" </SCRIPT> "    ;

document.write(jrj_SDC_code);




var UrgeS_KeyN="urgeStay";

function urgePutCookie(nm,val){
	var exp="";
	var y=360*5;
		var dt=new Date(); 
		dt.setTime(dt.getTime()+(y*86400000)); 
		exp="; expires="+dt.toGMTString();
	
	document.cookie=nm+"="+escape(val)+exp+";path=/;domain=hc360.com"; 
}   
    
function urgeGetCookie(nm){ 
	var m=""; 
	if(window.RegExp){ 
		var re=new RegExp(";\\s*"+nm+"=([^;]*)","i"); 
		m=re.exec(';'+document.cookie); 
	} 
	return(m?unescape(m[1]):"");
}
function urgeStayWin(openType){
	var domain=document.location.host;
	var oType=openType.split(";");
	if(oType[0]=="1" ){
		window.open("http://www.hc360.com/index.htm?urgestay=1");
	}else if(oType[0]=="2" ){
		window.open("http://www.hc360.com/urgestay.html?urgearea=homepage",'',"width=570; height=210px");
	}else{
			var domainArry=domain.split(".");
			
			if(oType[0]=="3"){
				
				window.open("http://www.secu.hc360.com/js/index/urgestay.html?urgearea="+domainArry[domainArry.length-3],'',"width=502px; height=278px");
			}else if(oType[0]=="4"){
				window.open("http://www."+domainArry[1]+".hc360.com/index.html?urgestay=1");
			}
			
	}
}

function thisDocWin(){
	var domain=document.location.host;
	if(domain=="detail.b2b.hc360.com" || domain=="b2b.hc360.com" 
		|| domain=="www.search.hc360.com" || domain=="list.b2b.hc360.com"
		|| domain=="activity.b2b.hc360.com"
		|| domain=="info.b2b.hc360.com" || domain=="info.news.hc360.com"
		|| domain=="info.ceo.hc360.com" || domain=="info.news.hc360.com"
		|| domain=="info.biz.hc360.com" || domain=="info.finance.hc360.com" 
		|| domain=="sou.hc360.com" ){
		return "1";
	}else if(domain=="www.hc360.com" || domain=="hc360.com" ){
		return "2";
	}else{
			var domainArry=domain.split(".");

			if((domainArry.length==3 && domainArry[1]=="hc360") || (domainArry.length==4 && domainArry[0]=="www")){
				return "3;"+domainArry[domainArry.length-3];
			}else if(domainArry.length==4 && domainArry[0]=="info"){
				return "4;"+domainArry[1];
			
			}
			
	}
}

if(document.location.host.indexOf(".hc360.")>-1){
	
	if(document.location.href.indexOf("http://www.search.hc360.com/adpage.cgi?w=")>-1){
		
		urgePutCookie(UrgeS_KeyN,"1");
	}
		var thisOrder=0;
		var thisWin="";
	if( urgeGetCookie(UrgeS_KeyN)==null || urgeGetCookie(UrgeS_KeyN)=="" || urgeGetCookie(UrgeS_KeyN)!="1"){
		
	
		if(urgeGetCookie(UrgeS_KeyN)==null || urgeGetCookie(UrgeS_KeyN)=="" ){
			thisOrder = 0;
			thisWin=thisDocWin();
		}else{
			thisOrder=parseInt(urgeGetCookie(UrgeS_KeyN).split(";")[0])+1;
			thisWin=urgeGetCookie(UrgeS_KeyN).split(";")[1];
			
				if(thisWin!="2" && thisWin!="3"){
					thisWin=thisDocWin();
				}else if(thisWin=="2" || thisDocWin()=="2"){
					thisWin="2";
				}else if(thisWin=="3"){
					thisWin="3;"+urgeGetCookie(UrgeS_KeyN).split(";")[2];
				}
				if(thisDocWin()=="1" && thisWin!="2"){
					thisWin="1";
				}
		}
		
		urgePutCookie(UrgeS_KeyN,thisOrder+";"+thisWin);
		 
			var thisOrder=urgeGetCookie(UrgeS_KeyN).split(";")[0];
			window.onbeforeunload = function(event)
				{
					
					event = event || window.event;
					window.status=(event.clientY+"||"+event.clientX+"||"+document.body.clientWidth);
					
		  if(urgeGetCookie(UrgeS_KeyN)!="1"  && (event.clientX>document.body.clientWidth  || event.clientY<0 ||event.altKey || event.ctrlKey) && thisOrder+""==urgeGetCookie(UrgeS_KeyN).split(";")[0]){
		  urgePutCookie(UrgeS_KeyN,"1");
		  urgeStayWin(thisWin);
			}
			}
		
	}
}