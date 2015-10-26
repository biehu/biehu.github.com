var regCheck = function () {
    var inputs = $('input, textarea');
    var phoneReg = /(^13\d{9}$)|(^14)[5,7]\d{8}$|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^17)[6,7,8]\d{8}$|(^18\d{9}$)/g; 
    var input, inputValue, inputName, phoneReg;
    
    for (var i = 0; i < inputs.length; i++) {
        input = inputs.eq(i);
        inputValue = input.val().trim();
        inputName = input.parent().parent().find('label').text();
        if (inputValue === '') {
            alert(inputName + ' 不能为空！');
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
