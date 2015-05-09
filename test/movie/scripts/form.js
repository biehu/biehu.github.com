$(document).ready(function(){
	// 登录验证
	var login = function () {
		if ($('#login_form').length === 0 ) {
			return;
		}

		$('#login_form').isHappy({
			submitButton: '#login_btn',	
			fields: {
				'#email': {
					required: true,
					message: '邮箱不能为空',
					next: {
						message: '邮箱格式不正确',
						test: happy.email
					}
				},
				'#password': {
					required: true,
					message: '密码不能为空'
					
				}
			},
			happy: function () {
				alert('success');
			}
		});
	};

	// 找回密码
	var recoverPassword = function () {
		if ($('#recover_password').length === 0) {
			return;
		}

		$('#recover_password').isHappy({
			submitButton: '#recover_password_btn',	
			fields: {
				'#email': {
					required: true,
					message: '邮箱不能为空',
					next: {
						message: '邮箱格式不正确',
						test: happy.email
					}
				}
			}
		});
	
	};

	var isSameToFirstPassword = function (val, firstPasswordSelector) {
		return val === $.trim($(firstPasswordSelector).val());
	};

	// 重设密码
	var resetPassword = function () {
		if ($('#reset_password').length === 0) {
			return;
		}

		$('#reset_password').isHappy({
			submitButton: '#reset_password_btn',	
			fields: {
				'#email': {
					required: true,
					message: '邮箱不能为空',
					next: {
						message: '邮箱格式不正确',
						test: happy.email
					}
				},
				'#password': {
					required: true,
					message: '密码不能为空'
					
				},
				'#repeat_password': {
					required: true,
					message: '密码不能为空',
					next: {
						message: '两次输入的密码不一致',
						test: isSameToFirstPassword,
						arg: '#password'
					}
					
				}
			}
		});
	
	};

	// 注册
	var reg = function () {
		if ($('#reg_form').length === 0) {
			return;
		}
		
		$('#reg_form').isHappy({
			submitButton: '#reg_btn',	
			fields: {
				'#email': {
					required: true,
					message: '邮箱不能为空',
					next: {
						message: '邮箱格式不正确',
						test: happy.email
					}
				},
				'#username': {
					required: true,
					message: '请输入昵称'
					
				},
				'#password': {
					required: true,
					message: '密码不能为空'
					
				},
				'#repeat_password': {
					required: true,
					message: '密码不能为空',
					next: {
						message: '两次输入的密码不一致',
						test: isSameToFirstPassword,
						arg: '#password'
					}
					
				},
				'#identify_code': {
					required: true,
					message: '请输入验证码'
				}
			}
		});
	
	};

	// 上传预览
	var uploadImg = function () {
		if ($('#upload_img').length === 0) {
			return;
		}
		$('#upload_img')[0].onchange = previewImage;

        function previewImage()
        {
		
          var MAXWIDTH  = 128; 
          var MAXHEIGHT = 128;
		  var file = this;
          var div = document.getElementById('preview');
          if (file.files && file.files[0])
          {
              div.innerHTML ='<img id=imghead>';
              var img = document.getElementById('imghead');
              img.onload = function(){
                var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                img.width  =  rect.width;
                img.height =  rect.height;
//                 img.style.marginLeft = rect.left+'px';
                img.style.marginTop = rect.top+'px';
              }
              var reader = new FileReader();
              reader.onload = function(evt){img.src = evt.target.result;}
              reader.readAsDataURL(file.files[0]);
          }
          else //兼容IE
          {
            var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            var src = document.selection.createRange().text;
            div.innerHTML = '<img id=imghead>';
            var img = document.getElementById('imghead');
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
            div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
          }
        }
        function clacImgZoomParam( maxWidth, maxHeight, width, height ){
            var param = {top:0, left:0, width:width, height:height};
            if( width>maxWidth || height>maxHeight )
            {
                rateWidth = width / maxWidth;
                rateHeight = height / maxHeight;
                 
                if( rateWidth > rateHeight )
                {
                    param.width =  maxWidth;
                    param.height = Math.round(height / rateWidth);
                }else
                {
                    param.width = Math.round(width / rateHeight);
                    param.height = maxHeight;
                }
            }
             
            param.left = Math.round((maxWidth - param.width) / 2);
            param.top = Math.round((maxHeight - param.height) / 2);
            return param;
        }

	};

	// 身份最多选择两个
	var selectIdentity = function () {
		var select = $('#indentity li');
		select.click(function () {
			$(this).toggleClass('on');
		});
	};

	// 基本信息验证
	var basicInfo = function () {
		if ($('.basic_next').length === 0) {
			return;
		}
		
		var validateSelected = function () {
			var selected = $('#indentity .on');
			var error = $('.unhappyMessage');

			if (selected.length === 0) {
				error.html('请选择角色').show();
			}
			else if (selected.length > 2) {
				error.html('最多选择两个身份').show();
			}
			else {
				error.html('').hide();
			}
			return false;
		};
		
		$('.basic_next').click(validateSelected);

	};

	// 实名认证
	var indentityInfo = function () {
		if ($('#list_form').length === 0) {
			return;
		}
		
		$('list_form').isHappy({
			submitButton: '#list_save',	
			fields: {
				'#indentity': {
					required: true,
					message: '真实姓名不能为空'
				},
				'#phone': {
					required: true,
					message: '联系电话不能为空'
					
				},
				'#province': {
					required: true,
					message: '所在地区不能为空'
				},
				'#city': {
					required: true,
					message: '所在地区不能为空'
				},
				'#county': {
					required: true,
					message: '所在地区不能为空'
				},
				'#work': {
					required: true,
					message: '职业不能为空'
				},
				'#desc': {
					required: true,
					message: '认证描述不能为空'
				},
				'#upload_img': {
					required: true,
					message: '证明材料不能为空',
					errorParent: '.sixth',
					when: 'submit'
				},
				'#work_time': {
					required: true,
					message: '入行年份不能为空'
				}
			}
		});

		$('#upload_img')[0].onblur = null;
	};


	login();
	recoverPassword();
	resetPassword();
	reg();

	uploadImg();
	selectIdentity();
	basicInfo();

	indentityInfo();
	
});