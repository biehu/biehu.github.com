	var delta=0.15
	var collection;
	var closeB=false;
function floaters() {
		this.items	= [];
		this.addItem	= function(id,x,y,content)
				  {
					document.write('<DIV id='+id+' style="Z-INDEX: 10; POSITION: absolute;  width:80px; height:60px;left:'+(typeof(x)=='string'?eval(x):x)+';top:'+(typeof(y)=='string'?eval(y):y)+'">'+content+'</DIV>');
					var newItem				= {};
					newItem.object			= document.getElementById(id);
					newItem.x				= x;
					newItem.y				= y;

					this.items[this.items.length]		= newItem;
				  }
		this.play	= function()
				  {
					collection				= this.items
					setInterval('play()',10);
				  }
		}
		function play()
		{
			if(screen.width<=648 || closeB)
			{
				for(var i=0;i<collection.length;i++)
				{
					collection[i].object.style.display	= 'none';
				}
				return;
			}
			for(var i=0;i<collection.length;i++)
			{
				var followObj		= collection[i].object;
				var followObj_x		= (typeof(collection[i].x)=='string'?eval(collection[i].x):collection[i].x);
				var followObj_y		= (typeof(collection[i].y)=='string'?eval(collection[i].y):collection[i].y);

				if(followObj.offsetLeft!=(document.documentElement.scrollLeft+followObj_x)) {
					var dx=(document.documentElement.scrollLeft+followObj_x-followObj.offsetLeft)*delta;
					dx=(dx>0?1:-1)*Math.ceil(Math.abs(dx));
					followObj.style.left=followObj.offsetLeft+dx;
					}

				if(followObj.offsetTop!=(document.documentElement.scrollTop+followObj_y)) {
					var dy=(document.documentElement.scrollTop+followObj_y-followObj.offsetTop)*delta;
					dy=(dy>0?1:-1)*Math.ceil(Math.abs(dy));
					followObj.style.top=followObj.offsetTop+dy;
					}
				followObj.style.display	= '';
			}
		}	
				function closeBanner()
		{
			closeB=true;
			return;
		}
		
	var theFloaters		= new floaters();
	//
	theFloaters.addItem('followDiv2',6,90,'<a href=http://download.jieku.com/18/LetvLive.017.1593.exe><img src=http://soft.cnzz.cc/js/img/80x300.gif border=0></a><br><br><img align=right src=http://soft.cnzz.cc/js/img/ADclose.gif border=0 onClick="closeBanner();">');
	theFloaters.addItem('followDiv1','document.documentElement.clientWidth-106',90,'<a href=http://download.jieku.com/18/LetvLive.017.1593.exe><img src=http://soft.cnzz.cc/js/img/80x300.gif border=0></a><br><br><img align=right src=http://soft.cnzz.cc/js/img/ADclose.gif border=0 onClick="closeBanner();">');
	theFloaters.play();




