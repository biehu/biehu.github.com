<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DragHander.aspx.cs" Inherits="DragHander" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>无标题页</title>
    <script src="js/jquery.min.js" language="javascript"></script>
    <script src="js/jquery.easydrag.handler.beta2.js" language="javascript"></script>
    
    <script >
		$(document).ready ( function()
			{
				$("#divPanel").easydrag();
			
				$("#divPanel").setHandler("divTitle");
			}
		);
    </script>
    
</head>
<body>
    <form id="form1" runat="server">
     
     使用标题进行托动
     
     <div id="divPanel" style="width:300px;height:300px;background:white;border:1px solid #000000;position:absolute;left:5px;top:50px" >
		<div id="divTitle" style="width:100%;height:25px;background:lavender">
			&nbsp;Title
		</div>
		<div style="width:100%">
			
		</div>
    </div>
    
 
    
    </form>
</body>
</html>
