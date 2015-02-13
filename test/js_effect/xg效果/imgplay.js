var imgPlay,_lis,len,n=0,_timeEvent0,_timeEvent;	
var isIE=document.all;
var imgArr=[];
imgArr[0]="../../../images/front/img/imgplayimg.jpg";
imgArr[1]="../../../images/front/img/imgplayimg.jpg";
imgArr[2]="../../../images/front/img/imgplayimg.jpg";
imgArr[3]="../../../images/front/img/imgplayimg.jpg";
imgArr[4]="../../../images/front/img/imgplayimg.jpg";
var imgInfoArr=[];
imgInfoArr[0]='<span><a href="#">1查看其所有演出</a></span><a href="#">庆八一38周年</a><a href="#">2010八月合唱节</a><a href="#">国家艺术院团展演</a>';
imgInfoArr[1]='<span><a href="#">2查看其所有演出</a></span><a href="#">庆八一38周年</a><a href="#">2010八月合唱节</a><a href="#">国家艺术院团展演</a>';
imgInfoArr[2]='<span><a href="#">3查看其所有演出</a></span><a href="#">庆八一38周年</a><a href="#">2010八月合唱节</a><a href="#">国家艺术院团展演</a>';
imgInfoArr[3]='<span><a href="#">4查看其所有演出</a></span><a href="#">庆八一38周年</a><a href="#">2010八月合唱节</a><a href="#">国家艺术院团展演</a>';
imgInfoArr[4]='<span><a href="#">5查看其所有演出</a></span><a href="#">庆八一38周年</a><a href="#">2010八月合唱节</a><a href="#">国家艺术院团展演</a>';
var filter=[];
filter[0]="FILTER: revealTrans(Duration=2, Transition=0)";
filter[1]="FILTER: revealTrans(Duration=2, Transition=1)";
filter[2]="FILTER: revealTrans(Duration=2, Transition=2)";
filter[3]="FILTER: revealTrans(Duration=2, Transition=3)";
filter[4]="FILTER: revealTrans(Duration=2, Transition=4)";
filter[5]="FILTER: revealTrans(Duration=2, Transition=5)";
filter[6]="FILTER: revealTrans(Duration=2, Transition=6)";
filter[7]="FILTER: revealTrans(Duration=2, Transition=7)";
filter[8]="FILTER: revealTrans(Duration=2, Transition=8)";
filter[9]="FILTER: revealTrans(Duration=2, Transition=9)";
filter[10]="FILTER: revealTrans(Duration=2, Transition=10)";
filter[11]="FILTER: revealTrans(Duration=2, Transition=12)";
filter[12]="FILTER: revealTrans(Duration=2, Transition=13)";
filter[13]="FILTER: revealTrans(Duration=2, Transition=14)";
filter[14]="FILTER: revealTrans(Duration=2, Transition=15)";
filter[15]="FILTER: revealTrans(Duration=2, Transition=16)";
filter[16]="FILTER: revealTrans(Duration=2, Transition=17)";
filter[17]="FILTER: revealTrans(Duration=2, Transition=18)";
filter[18]="FILTER: revealTrans(Duration=2, Transition=19)";
filter[19]="FILTER: revealTrans(Duration=2, Transition=20)";
filter[20]="FILTER: revealTrans(Duration=2, Transition=21)";
filter[21]="FILTER: revealTrans(Duration=2, Transition=22)";
filter[22]="FILTER: revealTrans(Duration=2, Transition=23)";
	
function imgPlay(conNum){
	imgPlay=document.getElementById("imgplay");
	if(!imgPlay) return;
	_lis=imgPlay.getElementsByTagName("li");
	len=_lis.length;
	for(var i=0;i<len;i++){
		_lis[i].onmouseover=imgPlayEvent;
		if(conNum==0)
			_lis[i].onmouseout=imgplayStart;
	}
	if(conNum==0)
		imgplayStart();
}

function imgPlayEvent(){
	var _class;
		for(var j=0;j<len;j++){
			_class=_lis[j].className;
			if(_class.indexOf("imgplayThover") >=0)
			_lis[j].className=_class.substring(0,_class.indexOf("imgplayThover"));
			if(_class==this.className)
			n=j;
			}
		_class=this.className;
		if(_class.indexOf("imgplayThover") <0) this.className+="imgplayThover";
         setFilter(n);
	    clearInterval(_timeEvent);
	
}

function imgPlayEvent1(){
	var _class;
	//alert("d");
	/*循环设置所有小图无特殊样式*/
		for(var j=0;j<len;j++){
			_class=_lis[j].className;
			if(_class.indexOf("imgplayThover") >=0)
				_lis[j].className=_class.substring(0,_class.indexOf("imgplayThover"));
		}

       if(n>4) n=0;
	   /*设置大图变化样式*/
	  setFilter(n);
	  /*设置小图特殊样式*/
	  _class=_lis[n].className;
	  if(_class.indexOf("imgplayThover") <0) 
		  _lis[n].className+="imgplayThover";
	  n++;
	
}
	
function setFilter(n){
	if(isIE){
		   document.getElementById("imgPlayImg").style.filter=filter[Math.floor(filter.length*Math.random())];//设置大图随机滤镜
		   document.getElementById("imgPlayImg").filters.item(0).Apply();
	}
           document.getElementById("imgPlayImg").src=imgArr[n];
		   document.getElementById("imgplayInfo").innerHTML=imgInfoArr[n];
    if(isIE)
           document.getElementById("imgPlayImg").filters.item(0).Play();

	}
/*开始*/
function imgplayStart(){
	_timeEvent=setInterval("imgPlayEvent1()",3000);
}
/*结束*/
function imgplayStop(){
	clearInterval(_timeEvent);
}



/*
imgplay初始化
参数 0：自动轮播
参数 1：不自动轮播
*/

imgPlay(0);