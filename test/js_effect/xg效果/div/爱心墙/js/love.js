	var i=2;
	/*��ק*/
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
	/*�鿴����*/
	function looklook(){
		alert("�ҾͲ����㿴..�ٺ�.");
	}
	/*��������*/
	function hiddenp(id){
		document.getElementById(id).style.display="none";
	}
	/*д����*/
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
	/*��������*/
	function addlove(){
		//���һ��div
		var oDiv = document.createElement("DIV");
		//��div��ӵ�ҳ����
		document.body.appendChild(oDiv); 
		var num=Math.round(Math.random()*100+Math.random()*100);
		oDiv.id = i; 
		oDiv.style.top = 200+num; 
		oDiv.style.left = 200+num;
		oDiv.style.width = 209; 
		oDiv.style.height = 181;  
		oDiv.style.background = 'url(img/o1.gif)';
		oDiv.style.visibility = 'visible';
		//�õ�ʱ��
		var now= new Date( );
		var da=now.getYear()+"-"+(now.getMonth( )+1)+"-"+now.getDate();
		divdata="<div class='recipient'>"+document.getElementById("revename").value+"</div>"+"<div class='lookc'>"+"<img src='img/look.gif' alt='�鿴' onClick='looklook()' />&nbsp;"+"<img src='img/close.gif' id='hidd"+i+"' alt='�ر�'/ >"+"</div>"+"<div class='introduce'>&nbsp;&nbsp;&nbsp;&nbsp;"+document.f1.loveletter.value+"</div>"+"<div class='sender'>"+document.getElementById("sendname").value+"</div>"+"<div class='senddate'>"+da+"</div>";
		oDiv.innerHTML=divdata;
		//��������,��һ����Ҫ���õ���������,�ڶ���������Ҫ���õ�ֵ.
		oDiv.setAttribute("onmousedown",function(){begin(oDiv)});
		var j = i+"";
		//���ر�ͼƬ����¼�
		document.getElementById("hidd"+i).onclick=function (){hiddenp(j)};
		i++;
	}