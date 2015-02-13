	var i=2;
	/*拖拽*/
	function begin(drag){
		var x=event.clientX-parseInt(drag.style.left);
		var y=event.clientY-parseInt(drag.style.top);
		document.attachEvent("onmousemove",move);
		document.attachEvent("onmouseup",getup)
		function move(e){
			drag.style.left=(event.clientX-x)+"px";
			drag.style.top=(event.clientY-y)+"px";
		}
		function getup(e){
			document.detachEvent("onmouseup",getup);
			document.detachEvent("onmousemove",move);
		}
	}
	/*查看字条*/
	function looklook(){
		alert("我就不让你看..嘿嘿.");
	}
	/*隐藏字条*/
	function hiddenp(id){
		document.getElementById(id).style.display="none";
	}
	/*写字条*/
	function writepaper(){
		wr=document.getElementById("writepp");
		if(wr.style.display=="none")
		{
			wr.style.display="block";
		}
		else
		{
			wr.style.display="none";
		}
	}
	/*增加字条*/
	function addlove(){
		//添加一个div
		var oDiv = document.createElement("DIV");
		//将div添加到页面里
		document.body.appendChild(oDiv); 
		var num=Math.round(Math.random()*100+Math.random()*100);
		oDiv.id = i; 
		oDiv.style.top = 200+num; 
		oDiv.style.left = 200+num;
		oDiv.style.width = 209; 
		oDiv.style.height = 181;  
		oDiv.style.background = 'url(img/o1.gif)';
		oDiv.style.visibility = 'visible';
		//得到时间
		var now= new Date( );
		var da=now.getYear()+"-"+(now.getMonth( )+1)+"-"+now.getDate();
		divdata="<div class='recipient'>"+document.getElementById("revename").value+"</div>"+"<div class='lookc'>"+"<img src='img/look.gif' alt='查看' onClick='looklook()' />&nbsp;"+"<img src='img/close.gif' id='hidd"+i+"' alt='关闭'/ >"+"</div>"+"<div class='introduce'>&nbsp;&nbsp;&nbsp;&nbsp;"+document.f1.loveletter.value+"</div>"+"<div class='sender'>"+document.getElementById("sendname").value+"</div>"+"<div class='senddate'>"+da+"</div>";
		oDiv.innerHTML=divdata;
		//俩个参数,第一个你要设置的属性名称,第二个参数是要设置的值.
		oDiv.setAttribute("onmousedown",function(){begin(oDiv)});
		var j = i+"";
		//给关闭图片添加事件
		document.getElementById("hidd"+i).onclick=function (){hiddenp(j)};
		i++;
	}