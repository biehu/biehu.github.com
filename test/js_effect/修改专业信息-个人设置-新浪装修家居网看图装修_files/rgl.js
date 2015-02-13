var rgl ={
    getWordNumber: function (val) {
        val = val.replace(/[^\x00-\xff]/g, '**');
        return Math.ceil(val.length / 2);
    },
    getCharNumber: function (val) {
        val = val.replace(/[^\x00-\xff]/g, '**');
        return val.length;
    },
	checkTel:function(val){
		return !(val === '' || /^1[3458]\d{9}$/.test(val));
	},
	checkFixLineTel:function(val){
		return /^(^0\d{2}-?\d{8}$)|(^0\d{3}-?\d{7}$)|(^\(0\d{2}\)-?\d{8}$)|(^\(0\d{3}\)-?\d{7}$)$/;
	},
	checkEmail:function(val){
		return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val);
		// /^[0-9a-z][_.0-9a-z-]{0,30}[0-9a-z]@([0-9a-z][0-9a-z-]{0,30}\.){1,4}[a-z]{2,4}$/
	},
	checkUrl:function(val){
		 return /^https?:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(val);
	},
	checkPwd:function(val){
		return /^[\w\~\!\@\#\$\%\^\&\*\(\)\+\`\-\=\[\]\\\{\}\|\;\'\:\"\,\.\/\<\>\?]+$/i.test(val);
	},
	checkEquals:function(val1,val2){
		if (val1 == val2){
			return true;
		}
			return false;
		},
	checkUpper:function(val){
		return /[A-Z]/.test(val);
	},
	checkText:function(val){//中英文、数字、下划线
		return !/^[0-9a-zA-Z\u4E00-\u9FA5\-_]+$/.test(val);
	},
	checkRealName:function(val){
		return /^[a-zA-Z\u4E00-\u9FA5]+$/.test(val);
	},
	checkPwd1:function(val){//匹配半角字符
		return /[\u0000-\u00ff]/.test(val);
	},
	isSameChar:function(val){
		return /^(.)\1+$/.test(val);
	},
	isContinueChar:function(val){
		var arr = val.split('');
		var charCode = arr[0].charCodeAt(0);
		if ( arr.length == 1 ) {
			return true;
		}
		for( var i = 1; i < arr.length; i++ ){
			var thisCode = arr[i].charCodeAt(0);
			var code = charCode + i;
			var code1 = charCode - i;
			if( code != thisCode && code1 != thisCode ){
				return true;
			}
		}
		return false;
	},
	checkNumber : function(val){
		return /^\d+$/.test(val);
	},
	checkQQ:function(val){
		return /^[1-9]{1}[0-9]{4,8}&/.test(val);
	},
	//全为数字
	checkAllNum:function(val){
		return !/^\d+$/.test(val);
	},
	checkSina:function(val){
		return !/@sina\./.test(val);
	},
	checkMinLen:function(val,len){
		if ( val.length < len){
			return true;
		}
		return false;
	},
	checkMaxLen:function(val,len){
		if ( rgl.getCharNumber(val) > len ) {
			return true;
		}
			return false;
	},
    
    checkMaxWordLen:function(val,len){
        if ( rgl.getWordNumber(val) > len ) {
            return true;
        }
            return false;
    },
	getEmailValue:function(){
		return $("#email").val();
	},
	checkSpace:function(val){//匹配空格符
		return /\s+/.test(val);
	},
    checknoNull:function(val){
        return !this.checkisNull(val);
    },
	checkisNull:function(val){
		return /^[ ]*$/.test(val)
	}
    
//    ,
//	checkAjax:function(type,val,param,isSettingBase,u){
//		var result="";
//		var a={};
//		var url="";
//		a[param]=val;
//		if(isSettingBase){
//			//修改邮箱用
//			url="/index.php?app=Ajax&m=User_SettingBase&a="+type;
//		}else if (u)
//		{
//			//特殊路径时用传整个接口路径
//			url= u + type;
//		}else{
//			url="/index.php?app=Ajax&m=User_Register&a="+type;
//		}
//		$.ajax({
//			type:"GET",
//			async:false,
//			url:url,
//			data:a,
//			dataType:"json",					
//			success:function(data){
//				result=data;
//			},
//			error:function(data){
//			}
//		});
//		return result;
//	}
}