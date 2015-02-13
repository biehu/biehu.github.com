
var currslid = 0;
var slidint;
function setfoc(id){
	document.getElementById("bigimg").src = picarry[id];
	document.getElementById("a_jimg").href = lnkarry[id];
	if (id==4) {
			document.getElementById("a_jimg").style.background = 'url('+picarry[0]+')'	
		}
		else {
			document.getElementById("a_jimg").style.background = 'url('+picarry[id+1]+')'
		}
	currslid = id;
	for(i=0;i<7;i++){
		document.getElementById("li_jimg"+i).className = "li_jimg";
	};
	document.getElementById("li_jimg"+id).className ="li_jimg on";

	var borserInfo=navigator.userAgent.toLowerCase();
	if(/msie/.test(borserInfo))
	{
		document.getElementById("bigimg").style.visibility = "hidden";
		document.getElementById("bigimg").filters[0].Apply();
		document.getElementById("bigimg").filters[0].transition=23;
		if (document.getElementById("bigimg").style.visibility == "visible") {
			document.getElementById("bigimg").style.visibility = "hidden";
		}
		else {
			document.getElementById("bigimg").style.visibility = "visible";
		}
		document.getElementById("bigimg").filters[0].Play();
	}
	stopit();
}

function playnext(){
	if(currslid==6){
		currslid = 0;
	}
	else{
		currslid++;
	};
	setfoc(currslid);
	playit();
}
function playit(){
	slidint = setTimeout(playnext,2500);
}
function stopit(){
	clearTimeout(slidint);
	}

window.onload = function(){
	playit();
}

function playit01(){
	document.getElementById("playStop").className = "stop";
	playit();
}
function stopit01(){
	document.getElementById("playStop").className = "play";
	stopit();
	}
	