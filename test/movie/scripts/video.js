var MM = window.MM || {};
MM.video = MM.video || {};

MM.video.detail = (function() {
	// 默认设置
	var defaults = {};

	function initialize() {
		bindEvent();
		doUploader();
	};
	// 上传
	function doUploader() {
		var previewHTML = '';
		var loaddingHTML = '';
		var photoMulti = '';
		var photoBoxNum = 5;
		// 上传图片
		$('.js-selectFile').uploader({
			action: '/index.php?app=pubs&ac=upphoto', //服务端脚本
			//mode: 'flash',        //上传模式，html5/flash
			name: "Filedata", //字段名
			formData: {
				'userid': '1355'
			}, //
			multiple: true, //是否多选
			auto: true, //是否自动上传
			debug: false,
			preview: false,
			// showQueue: '#queue',                        //显示队列的位置（传递jQuery选择器自定义队列显示的元素，传递true自动生成队列）
			fileSizeLimit: '2M', //文件大小限制（'100kb' '5M' 等）
			fileTypeDesc: '选择图片文件', //可选择的文件的描述，用中竖线分组。此字符串出现在浏览文件对话框的文件类型下拉中
			fileTypeExts: 'jpg,jpeg,gif,png', //允许上传的文件类型类表，用逗号分隔多个扩展，用中竖线分组（eg: 'jpg,jpeg,gif,png | zip,rar'）

			// 上传初始化完成
			onInit: function() {
				// if (this.options.mode === 'html5') {
				//     if ($.uploader.html5) log('恭喜，您的浏览器支持HTML5方式上传文件！');
				//     else log('抱歉，由于您的浏览器不支持HTML5上传，将自动降级到Flash方式');
				// } else {
				//     log('您设置了强制使用Flash方式上传！');
				// }
				var o = '当前配置：';
				o += this.options.multiple ? '允许多选' : '只能单选';
				o += this.options.auto ? '，选择完文件后自动上传' : '，选择完文件后手动上传';
			},
			// 选择文件,判断数目
			onSelected: function(filelist) {
				var show_num = $("#allowedPhoto").text();
				if (parseInt(show_num) > photoBoxNum) {
					layer.alert('超过了允许可以上传的数量', -1, !1);
					return false;
				}
				var sel_num = filelist.length;
				var total_num = parseInt(show_num) + parseInt(sel_num);
				if (total_num > photoBoxNum) {
					layer.alert('超过了允许可以上传的数量', -1, !1);
					return false;
				}

			},
			// 取消选择文件
			onCancel: function(file) {},
			// 开始上传
			onStart: function(e) {
				loaddingHTML = '<div class="photo-loadding"><p><img src="/theme/sample/loading.gif"></p></div>';
				$('#preview').prepend(loaddingHTML);
			},
			// 上传进行中
			onProgress: function(e) {
				// document.getElementById('show_speed').innerHTML = '上传速度：'+ e.speed;
			},
			// 上传发生错误
			onError: function(e) {
				layer.alert(e.message, -1, !1);
			},
			// 上传成功
			onSuccess: function(e) {
				var allowedPhoto = $("#allowedPhoto").text();
				var allowUpload = $("#allowUpload").text();

				if (parseInt(allowedPhoto) < photoBoxNum || parseInt(allowUpload) > 0) {
					var pathtmp = e.data.split('|');
					var moreAllowedPhoto = parseInt(allowedPhoto) + 1;
					$("#allowedPhoto").text(moreAllowedPhoto);

					var moreAllowUpload = parseInt(allowUpload) - 1;
					$("#allowUpload").text(moreAllowUpload);
					if (e.file.type === "image/jpeg") {

						$(".photo-loadding").remove();
						previewHTML += '<div class="photo-cell" id="' + pathtmp[1] + '"><p><img src="' + pathtmp[0] + '" width="80"></p><a  class="del-photo" href="javascript:;" onclick="del_photo(' + pathtmp[1] + ')"><span>删除</span></a></div>';
						$('#preview').prepend(previewHTML);
						photoMulti += '<input type="hidden" name="photoid[]" id="album_' + pathtmp[1] + '" class="photo-ablum" value="' + pathtmp[1] + '" />';
						$(".tac").prepend(photoMulti);
						previewHTML = '';
						loaddingHTML = '';
						photoMulti = '';
					}
				}

			},
			// 单个文件处理完成（error or success）
			onComplete: function(e) {},
			// 全部文件处理完成（error or success）
			onAllComplete: function() {},
			// 清空队列
			onClearQueue: function() {}
		});
	};

	function bindEvent() {
		// 点赞
		$(".js-zan").one('click', function() {
			var $ren = $(this).parents(".imgs-count").find(".js-ren");
			$ren.html(Number($ren.html()) + 1);
			return false;
		});
		//  支持他
		$(".js-detail-support").one('click', function() {
			var $piao = $(this).parents(".js-support-panel").find(".js-piao");
			$piao.html(Number($piao.html()) + 1);
			return false;
		});
	};
	return {
		init: function(options) {
			$.extend(defaults, options || {});
			initialize();
		}
	}
});

MM.video.list = (function() {
	// 默认设置
	var defaults = {};

	function initialize() {
		bindEvent();
	};

	function bindEvent() {
		$(".js-video-ding").one('click', function() {
			var $pio = $(this).parents(".row").find(".js-vide-piao");
			$pio.html(Number($pio.html()) + 1);
			return false;
		})
	};

	return {
		init: function(options) {
			$.extend(defaults, options || {});
			initialize();
		}
	}
});



model = (function() {
	// 默认设置
	var defaults = {};

	function initialize() {
		bindEvent();
	};

	function bindEvent() {};

	return {
		init: function(options) {
			$.extend(defaults, options || {});
			initialize();
		}
	}
})