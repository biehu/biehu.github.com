$(document).ready(function(e) {	
	$('#attention').bind({
		mouseover : function(){
			$(this).find('.more').show();
		},
		mouseout : function(){
			$(this).find('.more').hide();	
		}	
	});
	
	$('#marketing-center').bind({
		mouseover : function()
		{
			$(this).find('.detail').show();	
		},
		mouseout : function()
		{
			$(this).find('.detail').hide();	
		}	
	})
	$('#weibo').bind({
		mouseover : function()
		{
			$(this).find('.detail').show();	
		},
		mouseout : function()
		{
			$(this).find('.detail').hide();	
		}	
	})
	$('#weico').bind({
		mouseover : function()
		{
			$(this).find('.detail').show();	
		},
		mouseout : function()
		{
			$(this).find('.detail').hide();	
		}	
	})
	

	//月份切换
	jQuery("#monthSlide").slide({ titCell:".smallScroll li", mainCell:".bigImg ul", effect:"left", autoPlay:false,delayTime:200, trigger:'click',pnLoop:false});
	//小图左滚动切换
	jQuery("#monthSlide .smallScroll").slide({ mainCell:".smallBtn ul",vis:4,effect:"left",autoPage:true,prevCell:".sPre",nextCell:".sNext",scroll:1,pnLoop:false,defaultIndex:4});
	
	
	//初始化日期
	var dataServeTime;
	$.ajax({
		type : "post",
		url : "http://42.96.185.111/baidu/interface/serveDate.jsp",
		dataType : 	"jsonp",
		data : {},
		success : function(data){
			dataServeTime = data;
			
			//默认月份
			var mouthIndex = dataServeTime.split('/');
			
			
			//初始化表格数据\
			
			var trObj = null;
			var bigDataObj = null;
			$('.innerTd').each(function(index){
				trObj = this.parentElement.parentElement;
				bigDataObj = getBigData($.trim($(trObj).find("td:eq(0)").text()));
				
				$(trObj).find("td:eq(1)").html(bigDataObj.data[bigDataObj.data.length - 1]);
				
				gainsFall(dataServeTime, $(trObj).find("td:eq(2)"), "parent" ,bigDataObj);
			});
			
			//child表格数据
			$('.cen .left table:eq(0) .innerTd').bind('mouseover',function(){
			
				$('.innerTable').remove();
				//创建表格
				var _html = '<div class="innerTable"><table cellpadding="0" align="center" border="0" cellspacing="0"><tbody><tr class="CTr"><th class="CTd_1">去年今日热搜分类</th><th class="CTd_2">去年日平均PV量级</th><th class="CTd_3 borRightNone">昨日PV涨跌幅</th></tr>';
				
				var getIndexTitle = $(this).text();			//获取名称
				
				var dataIndex = getDateIndex(dataServeTime);
				if(dataIndex < 0)
				{
					return false;
				}
				
				bigDataObj = getBigData(getIndexTitle);
				
				var currentData = null;
				
				for(var j = 0; j < bigDataObj.list.length; j++)
				{
					currentData = bigDataObj.list[j];
					
					
					arrChildData = currentData.data[currentData.data.length - 1];
					
					_html += '<tr><td>' + currentData.name + '</td><td>' + arrChildData + '</td><td>' + getZhangFuImgHtml(dataServeTime,currentData.data[dataIndex],'child') + '</td></tr>';
				}
				$(this).addClass('on').append(_html);
				
			}).bind('mouseout',function(){
				$('.innerTable').remove();
				$(this).removeClass('on');
			});
			
		},
		error: function(msg){
			//return;
 		}
	});
	
	function getBigData(typeName)
	{
		if(!typeName)
		{
			return null;
		}
		for(var i=0; i < dataObj.length; i++){
			if(typeName == dataObj[i].name)
			{
				return dataObj[i];
			}
		}
		return null;
	}
	

	
	function getDateIndex(data)
	{
		if(!data)
		{
			return -1;
		}
		
		for(var i=0; i<dataTime.list.length; i++)
		{
			if(data == dataTime.list[i]){
				return i;
			}
		}
		
		return -1;
	}
	
	//涨幅跌
	function gainsFall(time, tdObj, imgType,currentData){
		
		/*if(!time || time == "undefined")
		{
			return false;
		}*/
		
		var dataIndex = getDateIndex(time);
		if(dataIndex < 0)
		{
			return false;
		}
		tdObj.html(getZhangFuImgHtml(time,currentData.data[dataIndex],imgType));
	}
	
	
	function getZhangFuImgHtml(time,dataNumber,imgType)
	{
		
		var pvValue = parseFloat(dataNumber);
		if(isNaN(pvValue))
		{
			return false;
		}
		var dataNum = pvValue * 100+10;
		var num = 0;

		if(dataNum <= -80){
			num = -5;	
		}else if(dataNum <= -60){
			num = -4;	
		}else if(dataNum <= -40){
			num = -3;	
		}else if(dataNum <= -20){
			num = -2;
		}else if(dataNum < 0){
			num = -1;
		}else if(dataNum >= 0 && dataNum <= 20){
			num = 1;
		}else if(dataNum <= 20){
			num = 1;	
		}else if(dataNum <= 40){
			num = 2;	
		}else if(dataNum <= 60){
			num = 3;	
		}else if(dataNum <= 80){
			num = 4;	
		}else if(dataNum <= 100 || dataNum > 5){
			num = 5;	
		}

		var _html = "";
		for(var i=0; i<Math.abs(num); i++)
		{
			if(imgType == 'parent' && num > 0){
				_html += '<img src="img/up.png" />';
			}
			if(imgType == 'parent' && num < 0){
				_html += '<img src="img/down.png" />';	
			}
			if(imgType == 'child' && num > 0){
				_html += '<img src="img/Sup.png" />';
			}
			if(imgType == 'child' && num < 0){
				_html += '<img src="img/Sdown.png" />';	
			}
		}
		
		return _html;
	}
	

	
	
	//点击clickMoreBtn，到达顶部
	$('.clickMoreBtn').bind('click',function(){
		$('html, body').animate({scrollTop:'620px'},200);
	});
	
	//表格隔行变色
	$('.cen .left tr:even').css('background','#F1DEE4');
	$('.cen .left .innerTable tr:odd').css('background', '#FFFFFF');
});