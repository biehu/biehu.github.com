(function () {
	// 倒计时

	var url = '';
	var phone = $('.last_time_phone');
	var sendBtn = $('.last_time_btn');
	var info = $('.last_time_info');
	var sendBtnHtml = sendBtn.html();
	var time = Number(sendBtn.attr('data-num'));
	var startTime;
	var flag;

	startTime = function () {
		if (time < 0) {

			// 恢复现场
			sendBtn.html(sendBtnHtml);
			info.html('');
			flag = false;
			time = Number(sendBtn.attr('data-num'));
			return;
		}

		sendBtn.html(time + '秒后重新发送');
		
		setTimeout(startTime, 1000);
		time--;
	};

	sendBtn.click(function () {

		if (phone.val() === '') {
			info.html('手机还没有填写');
			return;
		}

		if (!flag) {
			flag = true;

			//$.get(url, {phone: phone.val()}, function () {
				info.html('验证码已发送，请查收短信');

				startTime();
			//});

		}

	});

})();