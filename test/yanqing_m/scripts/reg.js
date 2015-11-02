var regCheck = function () {
    var inputs = $('input, textarea');
    var phoneReg = /(^13\d{9}$)|(^14)[5,7]\d{8}$|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^17)[6,7,8]\d{8}$|(^18\d{9}$)/g; 
	var nameReg = /^[a-zA-Z\u4e00-\u9fa5]{1,}$/;
	var urlReg = /^http/;
	var mailReg = /@/;
	var ageTest = function (val) {
		return /[0-9]+/.test(val) && Number(val) > 18;
	};
    var input, inputValue, inputName, phoneReg;
    
    for (var i = 0; i < inputs.length; i++) {
        input = inputs.eq(i);
        inputValue = input.val().trim();
        inputName = input.parent().parent().find('label').text();
        if (inputValue === '') {
            alert(inputName + ' 不能为空！');
            return false;
        }
		if (inputName === '公司名称' && !nameReg.test(inputValue)){
            alert('公司名称只允许英文或者汉字');
            return false;
        }
		if (inputName === '注册号码' && isNaN(inputValue)){
            alert('注册号码只允许数字');
            return false;
        }
		if (inputName === '公司网址' && !urlReg.test(inputValue)){
            alert('公司网址格式不正确');
            return false;
        }
		if (inputName === '电子邮件' && !mailReg.test(inputValue)){
            alert('电子邮件格式不正确');
            return false;
        }
		if (inputName === '年龄' && !ageTest(inputValue)){
            alert('年龄必须为数字并且大于18');
            return false;
        }
		if (inputName === '联系电话' && isNaN(inputValue)){
            alert('联系电话只允许数字');
            return false;
        }
		if (inputName === 'QQ' && isNaN(inputValue)){
            alert('QQ只允许数字');
            return false;
        }
        if (inputName === '手机号码' && !phoneReg.test(inputValue)){
            alert('手机号码格式不正确');
            return false;
        }
    }
};

var regRadio = function () {
    $('.reg_radio').removeClass('on');
    $(this).addClass('on');
    $('.reg_radio_value').val($(this).attr('data-value'));
};

var getCode = function () {
    $.get(getCodeUrl, function () {
        alert('已经成功，请注意查收！');
    });
};

$('.reg_radio').click(regRadio);
$('.submit').click(regCheck);
$('.get_code').click(getCode);
