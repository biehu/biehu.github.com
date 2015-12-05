    
// 登录验证
var login = function () {
	if ($('#login_submit').length === 0 ) return;
    
    $('#login_submit').click(function () {
        var username = $('#username');
        var password = $('#password');
        var formStatus = $('.form_status');
        
        if (username.val() == '') {
            formStatus.html('用户名不能为空').show();
            return false;
        }
        if (password.val() == '') {
            formStatus.html('密码不能为空').show();
            return false;
        }
        
    });

};

var thirdLogin = function () {
        if ($('#third_login').length === 0 ) {
            return;
        }

        $('#third_login').isHappy({
            submitButton: '.submit', 
            fields: {
                '#phone': {
                    required: true,
                    message: '手机不能为空',
                    next: {
                        message: '手机格式不正确',
                        test: happy.phone
                    }
                },
                '#code': {
                    required: true,
                    errorParent: '.phone_code',
                    message: '验证码不能为空'
                    
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


login();
thirdLogin();
	
