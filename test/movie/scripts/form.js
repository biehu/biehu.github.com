$(document).ready(function(){
	// 登录验证
	var login = function () {
		$('#login_btn').isHappy({
			fields: {
				
				'#email': {
					required: true,
					message: '邮箱格式不正确',
					test: happy.email
				},
				'#email': {
					required: true,
					message: '邮箱不能为空'
				},
				'#password': {
					required: true,
					message: '密码不能为空',
					
				}
			}
		});
	};

	login();
	
});