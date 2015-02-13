/**
 * [zoomScroll description]
 * @param  {[object]} box [容器，鼠标放在容器上时，停止播放,离开容器自动播放]
 * @param  {[object]} ul  [滚动的对象]
 * @param  {[object]} bar  [滚动颜色条的对象]
 */
function zoomScroll(box, ul, bar) {
	var timer;
	var index = 0;
	var prevIndex = 0;
	var box = $(box);
	var ul = $(ul);
	var bar = $(bar);
	var num = ul.find('li').length;
	var itemWidth = ul.find('li').eq(0).outerWidth(true);
	var lis = [];
	var bindEvent = function () {
		box.mouseover(function () {
			clearInterval(timer);
		}).mouseout(function () {
					autoPlay("clicked");
				});
		ul.find('li').bind('click', function () {
			var jump = false;
			var i = $(this).attr('data-index');
			if ($(this).hasClass("on")) {
				jump = true;
			} else {
				jump = false;
			}
			play(i);
			return jump;
		});
	};
	var copyItem = function () {
		ul.append($(lis[0]).clone(true));
		ul.append($(lis[1]).clone(true));

		ul.prepend($(lis[num - 1]).clone(true));
		ul.prepend($(lis[num - 2]).clone(true));
	};

	function init() {
		ul.css({
			"width": itemWidth * (num + 4),
			"position": "absolute"
		});
		ul.find('li').each(function (index, item) {
			$(item).attr('data-index', index);
			lis.push(item);
		});
		copyItem();
		bindEvent();
		autoPlay();
	}

	function autoPlay(opt) {
		timer = setInterval(function () {
			if (opt) {
				index++;
				if (index >= num) {
					index = 0;
				}
				play(index);
			} else {
				if (index >= num) {
					index = 0;
				}
				play(index);
				index++;
			}
		}, 3000);
	}

	var setBarPosition = function (index) {
		var barWidth = Math.ceil(950 / num);
		bar.css({
			"width": barWidth,
			"left": barWidth * index
		});
	};

	function play(a) {
		index = a;
		ul.animate({
			"left": -(index * itemWidth)
		});
		setBarPosition(index);
		zoomItem(prevIndex, 0);
		zoomItem(index, 1);
		//记录上一个目标
		prevIndex = index;
	}

	/**
	 * [zoomItem description]
	 * @param  {[number]} elemIndex [需要放大缩小的索引数字值]
	 * @param  {[boolean]} flag      [true 时为放大 false时为缩小]
	 */
	function zoomItem(elemIndex, flag) {
		var li = ul.find('li[data-index="' + elemIndex + '"]');
		var item = li.find('.item');
		if (flag) {
			//放大
			li.addClass('on');
			item.animate({
				"width": "184px",
				"height": "235px",
				"left": "-7px",
				"top": "-10px"
			});
		} else {
			//缩小
			item.animate({
				"width": "170px",
				"height": "215px",
				"left": "0px",
				"top": "0px"
			});
			li.removeClass('on');
		}
	};
	init();
}

var Kuaixun = function () {	//快讯新闻间隔滚动
	var self = this,
			$kuaixun = $('.kuaixun'),
			$news_list = $kuaixun.find('.news_list'),	//新闻列表
			$wrap = '',	//为新闻列表增加一级父容器
			w = 0,	//新闻列表宽
			h = 0,	//新闻列表高
			h_li = $kuaixun.find('li').outerHeight(true),	//每行新闻高
			temp,	//临时
			interval;	//运动间隔

	self.init = function (pars) {

		interval = pars.interval ? pars.interval : 1000;

		w = $news_list.width();

		h = $news_list.height();

		$news_list.css('height', 'auto');

		$wrap = $news_list.wrap('<div class="news_list_wrap"/>').parent('.news_list_wrap');

		$wrap.width(w).height(h).css('overflow', 'hidden');

		temp = setInterval(self.animate, interval);

		self.events();

	};

	self.animate = function () {

		var n_margin_top = parseFloat($news_list.css('margin-top'));

		n_margin_top -= h_li;

		$news_list.animate({'margin-top': n_margin_top}, function () {

			$news_list.children('li:eq(0)').appendTo($news_list);

			$news_list.css('margin-top', 0);

		});
	};

	self.events = function () {

		$wrap.hover(function () {

			clearInterval(temp);

		}, function () {

			clearInterval(temp);

			temp = setInterval(self.animate, interval);

		});

	};
};


	dj.get("ui.fixed", function () {
		$('.sidebar').fixed({
			pos: {top: '221px', left: 'auto'},
			stop: true,
			end: $('.sidebar').offset().top
		});
	});

        var closeSidebar = function () {
                $('.sidebar').hide();
        };

        $('.closeBtn').click(closeSidebar);

	dj.get("ui.focusimg", ["ui.gun"], function () {

		//焦点图
		$("#focal01 .scroll-wrap-inner .clear").focusimg({
			item: "li",
			index: 0,
			auto: true,
			interval: 5000,
			vertical: false,
			circle: true,
			prev: "#focal01 .focal-btn-lt",
			next: "#focal01 .focal-btn-rt",
			smallimg: $("#focal01 ol li"),
			smallevent: "click",
			smallSelectedClass: "focal-active"
		}, function () {

		});

		//微博列表翻页	
		$(".weibo-block .bd-inner ul.clearfix").focusimg({
			item: "li",
			index: 0,
			auto: false,
			vertical: false,
			circle: true,
			prev: ".weibo-block .hd .prev",
			next: ".weibo-block .hd .next"
		});
	});

$(function () {

	//品牌十大排行
	$('.r3 .type-list-info li').mouseenter(function () {
		$(this).addClass('active').siblings().removeClass('active');
	});

	if ($('.kuaixun').length > 0) {
		var Kuaixun_n = new Kuaixun();
		Kuaixun_n.init({'interval': 2000});
	}

	//装修案例
	if ($.browser.msie && $.browser.version == 6.0) {
		$('.case_list > li').each(function () {
			$(this).find('div').css('height', $(this).height());
		});
	}

	$('.case_list > li').hover(function () {
		$('.case_list > li').find('div').show();
		$(this).find('div').hide();
		$('.case_txt > li').hide().eq($(this).index()).show();
	});

	$('.case_bd').bind('mouseleave', function () {
                 $('.case_list > li').find('div').hide();
	});

	//微信二维码
	$('.weibo-block .weixin .text').bind('click', function () {
		var $weixin_pic = $(this).siblings('.weixin-pic');
		$weixin_pic.show();
	});

	$('.weibo-block .weixin-pic .close').bind('click', function () {
		var $weixin_pic = $(this).parents('.weixin-pic');
		$weixin_pic.hide();
	});

	//人物风云榜
	zoomScroll($('.ul-wrap'), $('.ul-wrap ul'), $('.bottom-bar span'));
});
