// 选择比赛项目
var selectMatch = function () {
	var root = $('#matchs');
    if (!root.length) return;
    
	root.find('li').not('.partaking').
		hover(function () {
			if (!$(this).data('selected')) this.className = 'partake_to';
		},
		function () {
			if (!$(this).data('selected')) this.className = '';
		}).
		click(function () {
			this.className = 'partake_to';
			$(this).data('selected', true);
			$(this).siblings().removeClass('partake_to');
		});
};

// 选择时间
var selectDate = function () {
    var date = $('#date');
    if (!date.length) return;
    
    date.date_input();
};

selectMatch();
selectDate();
