<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="EasyDrag.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>无标题页</title>
    <script src="js/jquery.min.js" language="javascript"></script>
    <script src="js/jquery.easydrag.handler.beta2.js" language="javascript"></script>
    <script>
		$(document).ready( function()
							{
								$("#divPanel").easydrag();
							}
						);
    </script>
</head>
<body>
    <form id="form1" runat="server">
    直接托动
    
    <div id="divPanel" style="width:300px;height:300px;background:lavender;position:absolute;left:5px;top:50px" >
		
    </div>
    
    </form>
</body>
</html>
