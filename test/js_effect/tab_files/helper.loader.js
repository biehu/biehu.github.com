(function(){
	if(!window.cookie){
		window.cookie = function(key, value, options) {
			if (arguments.length > 1 && String(value) !== "[object Object]") {
				if (value === null || value === undefined) {
					options.expires = -1;
				}
				if (typeof options.expires === 'number') {
					var days = options.expires, t = options.expires = new Date();
					t.setDate(t.getDate() + days);
				}
				value = String(value);
				return (document.cookie = [
					encodeURIComponent(key), '=',
					options.raw ? value : encodeURIComponent(value),
					options.expires ? '; expires=' + options.expires.toUTCString() : '',
					options.path ? '; path=' + options.path : '',
					options.domain ? '; domain=' + options.domain : '',
					options.secure ? '; secure' : ''
				].join(''));
			}
			options = value || {};
			var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
			return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
		}
	}
	function load_helper(){
		if(!window.helper){
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "http://i0.sinaimg.cn/hs/suxiaowu/helper/helper.main.js";
			document.getElementsByTagName("head")[0].appendChild(script);
		}
	}
	if(cookie('admin_house_ticket')){
		load_helper();
	}else{
		var helperTimer=helperCount = 0;
		document.onkeypress = function(event) {
		  var hit,event = event || window.event;
		  if (event.which == null) {
			hit = String.fromCharCode(event.keyCode);
		  } else if (event.which!=0 && event.charCode!=0) {
			hit = String.fromCharCode(event.which);
		  }
		  if(hit === 'h'){
			helperCount += 1;
		  	if(!helperTimer) helperTimer = window.setTimeout(function(){
		  		if(window.console) window.console.log(helperCount);
		  		if(helperCount > 30){			
					load_helper();
		  		}
		  	},2000);
		  }else{
		  	document.onkeypress = null;
		  	if(helperTimer){
			  	window.clearTimeout(helperTimer);
		  	}
		  }
		}
	}

})();
