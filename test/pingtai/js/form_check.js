    
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

var isSameToFirstPassword = function(val, firstPasswordSelector){
    return val === $.trim($(firstPasswordSelector).val());
};

var isCheckboxSelected = function(val) {
    return !!val;
};

var personalReg = function () {
    
    if (!$('#personal_reg_form').length) return;

	$('#personal_reg_form').isHappy({
		 submitButton: '.submit', 
        fields: {
            '#username': {
                required: true,
                message: '用户名不能为空'
            },
            '#password': {
                required: true,
                message: '设置密码不能为空'
            },
            '#password_2': {
                required: true,
                message: '确认密码不能为空',
                next: {
                    message: '两次输入的密码不一致',
                    test: isSameToFirstPassword,
                    arg: '#password'
                }
            },
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
                errorParent: '.reg_ul_5',
                message: '验证码不能为空'
                
            },
            '#phone_code': {
                required: true,
                errorParent: '.reg_ul_6',
                message: '短信验证码不能为空'
                
            }
        },
        happy: function () {
            alert('success');
        }
        
        
	});
};

var companyReg = function () {
    
    if (!$('#company_reg_form').length) return;

    $('#company_reg_form').isHappy({
       
        submitButton: '.submit', 
        fields: {
            '#username': {
                required: true,
                message: '用户名不能为空'
            },
            '#password': {
                required: true,
                message: '设置密码不能为空'
            },
            '#password_2': {
                required: true,
                message: '确认密码不能为空',
                next: {
                    message: '两次输入的密码不一致',
                    test: isSameToFirstPassword,
                    arg: '#password'
                }
            },
            '#contact_name': {
                required: true,
                message: '联系人不能为空'
            },
            '#department': {
                required: true,
                message: '所在部门不能为空'
            },
            '#phone': {
                required: true,
                message: '电话不能为空'
            },
            '#mobile': {
                required: true,
                message: '手机不能为空',
                next: {
                    message: '手机格式不正确',
                    test: happy.phone
                }
            },
            '#company_name': {
                required: true,
                message: '公司名称不能为空'
            },
            '#city': {
                required: true,
                when: 'submit',
                message: '公司所在地不能为空'
            },
            '#company_address': {
                required: true,
                message: '公司地址不能为空'
            },
            '.buy_type': {
                message: '购买用途/类型不能为空',
                test: isCheckboxSelected,
                errorParent: '.section4 .reg_ul_4',
                when: 'submit',
                required: 'sometimes',
            },
            '#code': {
                required: true,
                errorParent: '.section4 .reg_ul_5',
                message: '验证码不能为空'
                
            },
            '#phone_code': {
                required: true,
                errorParent: '.section3 .reg_ul_5',
                message: '短信验证码不能为空'
                
            },
            '#email': {
                required: true,
                message: '联系人邮箱不能为空',
                next: {
                    message: '邮箱格式不正确',
                    test: happy.email
                }
                
            }
        },
        happy: function () {
            alert('success');
        }
    });
};

var lookForPass1 = function () {
	if ($('#lookfor_pass_form_1').length === 0 ) {
		return;
	}

	$('#lookfor_pass_form_1').isHappy({
		submitButton: '.submit', 
		fields: {
			'#username': {
				required: true,
				message: '账户名不能为空'
			},
			'#code': {
				required: true,
				errorParent: '.zh_ul2',
				message: '验证码不能为空'
				
			}
		},
		happy: function () {
			alert('success');
		}
	});

};


var lookForPass2 = function () {
	if ($('#lookfor_pass_form_2').length === 0 ) {
		return;
	}

	$('#lookfor_pass_form_2').isHappy({
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
			'#phone_code': {
				required: true,
				message: '验证码不能为空'
				
			}
		},
		happy: function () {
			alert('success');
		}
	});

};


var lookForPass3 = function () {
	if ($('#lookfor_pass_form_3').length === 0 ) {
		return;
	}

	$('#lookfor_pass_form_3').isHappy({
		submitButton: '.submit', 
		fields: {
			'#password': {
				required: true,
				message: '密码不能为空',
				errorParent: '.step3_ul1'
					
			},
			'#password_2': {
				required: true,
				message: '确认密码不能为空',
				errorParent: '.step3_ul2',
                next: {
                    message: '两次输入的密码不一致',
                    test: isSameToFirstPassword,
                    arg: '#password'
                }
				
			}
		},
		happy: function () {
			alert('success');
		}
	});

};

var addPlan = function () {
    var btn = $('#plan_form');
    if (btn.length === 0) return;
    
    btn.isHappy({
        submitButton: '.submit', 
        fields: {
            '#company': {
                required: true,
                message: '公司名称不能为空'
                    
            },
            '#phone': {
                required: true,
                message: '手机不能为空',
                next: {
                    message: '手机格式不正确',
                    test: happy.phone
                }
            },
            '#email': {
                required: true,
                message: '邮箱不能为空',
                next: {
                    message: '邮箱格式不正确',
                    test: happy.email
                }
                
            }
        },
        happy: function () {
            alert('success');
        }
    });
};




login();
thirdLogin();

personalReg();
companyReg();

lookForPass1();
lookForPass2();
lookForPass3();

addPlan();
	
