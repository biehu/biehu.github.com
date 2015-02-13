/**
 * @author nttdocomo
 */
(function() {
	var hasOwn = Object.prototype.hasOwnProperty, class2type = {}, toString = Object.prototype.toString;
	// Populate the class2type map
	var name = "Boolean Number String Function Array Date RegExp Object".split(" ");
	for (var i = 0; i < name.length; i++){
		class2type["[object " + name[i] + "]"] = name[i].toLowerCase();
	}
	var div = document.createElement('div');
	div.style.display = "none";
	div.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
	/*add ads custom style*/
	var style = document.getElementsByTagName('style');
	if(style.length) {
		style = style[0];
	} else {
		style = document.createElement('style');
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	var styleText = '.leju-ads object {vertical-align:top}\
	.cf:before,.cf:after{content:"";display:table;}\
	.cf:after{clear:both;}.cf{zoom:1;}\
	.row-6-900 div,.row-3-930 div,.row-2-940 div{margin-right:10px;}\
	.row-2 div,.row-3 div {float:left;}\
	.row-6-900 div {margin-right:10px;}\
	.row-3 .lunbo-585,.row-3 .banner-585{float:left;diplay:inline;margin:0 14px}\
	.mb10 .leju-ads,.row-2 .leju-ads,.row-3 .leju-ads {margin-bottom: 0;}\
	.row-2,.row-3{margin-bottom:10px;}\
	.leju-ads{margin-bottom:10px;}\
	.bfl50{position:absolute;top:0;left:50px;}\
	.bfl60{position:absolute;top:0;left:60px;}\
	.bfl70{position:absolute;top:0;left:70px;}\
	.bfl80{position:absolute;top:0;left:80px;}\
	.bfl90{position:absolute;top:0;left:90px;}\
	.bfr50{position:absolute;top:0;right:50px;}\
	.bfr60{position:absolute;top:0;right:60px;}\
	.bfr70{position:absolute;top:0;right:70px;}\
	.bfr80{position:absolute;top:0;right:80px;}\
	.bfr90{position:absolute;top:0;right:90px;}\
	.banner-430{margin-left:10px;margin-right:10px;}\
	.mod_blk .leju-ads,.blk .t .leju-ads{margin-bottom:0;}';
	
	if(style.styleSheet) {// for IE
		style.styleSheet.cssText += styleText;
	} else {// others
		var textnode = document.createTextNode(styleText);
		style.appendChild(textnode);
	}
	var all = div.getElementsByTagName("*"), a = div.getElementsByTagName("a")[0], select = document.createElement("select"), opt = select.appendChild(document.createElement("option")), input = div.getElementsByTagName("input")[0], vendors = "Khtml Ms O Moz Webkit".split(' '), len = vendors.length;
	var supports = this.supports = function(prop) {
		if( prop in div.style) {
			return true;
		}
		prop = prop.replace(/^[a-z]/, function(val) {
			return val.toUpperCase();
		});
		for(var i = 0; i < len; i++) {
			if(vendors[i] + prop in div.style) {
				return true;
			}
		}
		return false;
	};
	this.ads = {
		config : {
			path : 'src/'
		},
		hasInit : false,
		bind : function(E, D) {
			return function() {
				return D.apply(E, arguments)
			}
		},
		supports : {
			cssFloat : !!a.style.cssFloat
		},
		timers : [],
		vendors : "Khtml Ms O Moz Webkit".split(' '),
		ie : document.uniqueID != document.uniqueID,
		ie6 : !-[1,]&&!window.XMLHttpRequest,
		flashChecker : (function() {
			var hasFlash = 0;
			var flashVersion = 0;
			var isIE = document.uniqueID != document.uniqueID;
			if(isIE) {
				var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
				if(swf) {
					hasFlash = 1;
					VSwf = swf.GetVariable("$version");
					flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
				}
			} else {
				if(navigator.plugins && navigator.plugins.length > 0) {
					var swf = navigator.plugins["Shockwave Flash"];
					if(swf) {
						hasFlash = 1;
						var words = swf.description.split(" ");
						for(var i = 0; i < words.length; ++i) {
							if(isNaN(parseInt(words[i])))
								continue;
							flashVersion = parseInt(words[i]);
						}
					}
				}
			}
			return {
				f : hasFlash,
				v : flashVersion
			};
		})(),
		id : 0,
		$ : function(id) {
			if(id)
				return document.getElementById(id);
		},
		init : function() {
			if(!ads.hasInit) {
				// http://www.robertpenner.com/easing/
				Math.linearTween = function(t, b, c, d) {
					return c * t / d + b;
				};
				Math.easeOutCirc = function(t, b, c, d) {
					return c * Math.sqrt(1 - ( t = t / d - 1) * t) + b;
				};
				Math.easeInQuad = function(t, b, c, d) {
					return c * (t /= d) * t + b;
				};
				Math.easeOutBack = function(t, b, c, d, s) {
					if(s == undefined)
						s = 1.70158;
					return c * (( t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
				};
				Math.easeOutQuint = function(t, b, c, d) {
					return c * (( t = t / d - 1) * t * t * t * t + 1) + b;
				};
				Math.easeOutBounce = function(t, b, c, d) {
					if((t /= d) < (1 / 2.75)) {
						return c * (7.5625 * t * t) + b;
					} else if(t < (2 / 2.75)) {
						return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
					} else if(t < (2.5 / 2.75)) {
						return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
					} else {
						return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
					}
				};
			}
		},
		animate : function(el, prop, opt) {
			var start, end, unit;
			if( typeof opt != 'object' || opt === null) {
				var args = arguments;
				opt = {
					duration : args[2],
					easing : args[3],
					complete : args[4]
				};
			}
			if( typeof opt.duration != 'number')
				opt.duration = 250;
			opt.easing = Math[opt.easing] || Math.easeInQuad;
			opt.curAnim = ads.extend({}, prop);
			for(var name in prop) {
				var e = new ads.fx(el, opt, name);
				start = parseFloat(ads.css(el, name)) || 0;
				end = parseFloat(prop[name]);
				unit = name != 'opacity' ? 'px' : '';

				e.custom(start, end, unit);
			}
		},
		css : function(el, prop) {
			if(el.style[prop]) {
				return el.style[prop];
			} else if(document.defaultView) {
				return document.defaultView.getComputedStyle(el, null).getPropertyValue(prop);

			} else {
				if(prop == 'opacity')
					prop = 'filter';
				var val = el.currentStyle[prop.replace(/\-(\w)/g, function(a, b) {
					return b.toUpperCase();
				})];
				if(prop == 'filter')
					val = val.replace(/alpha\(opacity=([0-9]+)\)/, function(a, b) {
						return b / 100
					});
				return val === '' ? 1 : val;
			}
		},
		inArray : function(elem, array) {

			if(indexOf) {
				return indexOf.call(array, elem);
			}

			for(var i = 0, length = array.length; i < length; i++) {
				if(array[i] === elem) {
					return i;
				}
			}

			return -1;
		},
		isArray : Array.isArray ||
		function(obj) {
			return ads.type(obj) === "array";
		},

		isFunction : function(obj) {
			return ads.type(obj) === "function";
		},
		isWindow : function(obj) {
			return obj && typeof obj === "object" && "setInterval" in obj;
		},
		type : function(obj) {
			return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
		},
		noop : function() {
		},
		isPlainObject : function(obj) {
			// Must be an Object.
			// Because of IE, we also have to check the presence of the constructor property.
			// Make sure that DOM nodes and window objects don't pass through, as well
			if(!obj || ads.type(obj) !== "object" || obj.nodeType || ads.isWindow(obj)) {
				return false;
			}

			// Not own constructor property must be Object
			if(obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own.

			var key;
			for(key in obj ) {
			}

			return key === undefined || hasOwn.call(obj, key);
		},
		extend : function(obj, extObj) {
			var _obj;
			if( typeof obj === "string") {
				_obj = ads[obj];
				var ret;
				if(_obj && _obj.extend) {//like ads["Banner"] == ads.Banner
					ret = _obj.extend(extObj);
					//return ads.Banner.extend(extobj)
				} else {
					ret = {
						dependence : obj,
						extObj : extObj
					};
				}
				if(extObj.required) {
					ret.required = extObj.required;
				}
				return ret;
			} else {
				var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;

				// Handle a deep copy situation
				if( typeof target === "boolean") {
					deep = target;
					target = arguments[1] || {};
					// skip the boolean and the target
					i = 2;
				}

				// Handle case when target is a string or something (possible in deep copy)
				if( typeof target !== "object" && !ads.isFunction(target)) {
					target = {};
				}

				// extend jQuery itself if only one argument is passed
				if(length === i) {
					target = this; --i;
				}

				for(; i < length; i++) {
					// Only deal with non-null/undefined values
					if(( options = arguments[i]) != null) {
						// Extend the base object
						for(name in options ) {
							src = target[name];
							copy = options[name];

							// Prevent never-ending loop
							if(target === copy) {
								continue;
							}

							// Recurse if we're merging plain objects or arrays
							if(deep && copy && (jQuery.isPlainObject(copy) || ( copyIsArray = jQuery.isArray(copy)) )) {
								if(copyIsArray) {
									copyIsArray = false;
									clone = src && jQuery.isArray(src) ? src : [];

								} else {
									clone = src && jQuery.isPlainObject(src) ? src : {};
								}

								// Never move original objects, clone them
								target[name] = jQuery.extend(deep, clone, copy);

								// Don't bring in undefined values
							} else if(copy !== undefined) {
								target[name] = copy;
							}
						}
					}
				}

				// Return the modified object
				return target;
			}
		},
		setStyle : function(el, styles) {
			var len = ads.vendors.length, prop;
			for(var x in styles) {
				var name = ads.cssProps[x] || x;
				if(ads.ie && name == 'opacity') {
					if(styles[x] > 0.99)
						el.style.removeAttribute('filter');
					else
						el.style.filter = 'alpha(opacity=' + (styles[x] * 100) + ')';
				} else if( name in el.style) {
					el.style[name] = styles[x];
				} else {
					prop = name.replace(/^[a-z]/, function(val) {
						return val.toUpperCase();
					});
					for(var i = 0; i < len; i++) {
						if(ads.vendors[i] + prop in el.style) {
							el.style[ads.vendors[i] + prop] = styles[x];
						}
					}
				}
			}
		},
		getNextSibling : function(el) {
			if(el.nextSibling.nodeType == 3) {
				return ads.getNextSibling(el.nextSibling);
			} else {
				return el.nextSibling;
			}
		},
		insertAfter : function(newEl, targetEl) {
			var parentEl = targetEl.parentNode;

			if(parentEl.lastChild == targetEl) {
				parentEl.appendChild(newEl);
			} else {
				parentEl.insertBefore(newEl, ads.getNextSibling(targetEl));
			}
		},
		createElement : function(tag, attrs, styles, target, action) {
			var el = document.createElement(tag);
			if(attrs) {
				ads.extend(el, attrs);
			};
			if(styles) {
				ads.setStyle(el, styles);
			};
			if(target) {
				switch(action){
					case 'before':
						target.parentNode.insertBefore(el, target)
						break
					case 'after':
						ads.insertAfter(el, target)
						break
					case 'prepend':
						target.insertBefore(el,target.firstChild)
						break
					default:
						target.appendChild(el);
				}
			};
			return el;
		},
		getElementsByAttribute:function (search){
		    var tag = /([\*a-zA-Z1-6]*)?(\[(\w+)\s*(\^|\$|\*|\||~|!)?=?\s*([\w\u00C0-\uFFFF\s\-_\.]+)?\])?/,
		    node = arguments[1] || document,
		    agent = search.match(tag),
		    tag = agent[1] || "*",
		    attribute = agent[3],
		    type =  agent[4]+"=",
		    value = agent[5],
		    ieAttrFix = {"class": "className","for": "htmlFor"},
		    returnElements = [],
		    elements = (tag === "*" && node.all)? node.all : node.getElementsByTagName(tag),
		    length = elements.length;
		    if((!!document.querySelectorAll) && type != "!="){
		      elements = document.querySelectorAll(search);
		      for(var i=0,length = elements.length;i < length;i++){
		        returnElements.push(elements[i]);
		      }
		      return returnElements;
		    }
		    if(!+"\v1")
		      attribute = ieAttrFix[attribute] ? ieAttrFix[attribute] : attribute;
		    while(--length >= 0){
		      var current = elements[length],
		      _value = !+"\v1" ? current[attribute] : current.getAttribute(attribute);
		      if(typeof _value === "string" && _value.length > 0){
		        if(!!value){
		          var condition =
		            type === "=" ?
		          _value === value :
		            type === "!=" ?
		          _value != value :
		            type === "*=" ?
		          _value.indexOf(value) >= 0 :
		            type === "~=" ?
		          (" " + _value + " ").indexOf(value) >= 0:
		            type === "^=" ?
		          _value.indexOf(value) === 0 :
		            type === "$=" ?
		          _value.slice(-value.length) === value:
		            type === "|=" ?
		          _value === value ||  _value.substring(0,value.length+1) === value+"-" :
		            false;
		          condition && returnElements.push(current);
		        }else{
		          returnElements.push(current);
		        }
		      }
		    }
		    return returnElements;
	    },
		rotator : function(data, cookieName) {
			var ary = [];
			var data = data.data;
			for(var i = 0; i < data[0].length; i++) {
				if(ads.compareTime(data[0][i][2], data[0][i][3])) {
					ary.push(data[0][i]);
				}
			}
			if(data.length - 1) {
				var vnad = [];
				for(var i = 0; i < data[1].length; i++) {
					if(ads.compareTime(data[1][i][2], data[1][i][3])) {
						vnad.push(data[1][i]);
					}
				}
				//if(ary.length < data[0].length) {
				for(var i = 0; i < vnad.length; i++) {
					ary.push(vnad[i]);
				}
				//}
			}
			return ary;
		},
		setCookie : function(name, value, expires, path, domain, secure) {
			// set time, it's in milliseconds
			var today = new Date();
			today.setTime(today.getTime());

			/*
			 if the expires variable is set, make the correct
			 expires time, the current script below will set
			 it for x number of days, to make it for hours,
			 delete * 24, for minutes, delete * 60 * 24
			 */
			if(expires) {
				expires = expires * 1000 * 60 * 60 * 24;
			}
			var expires_date = new Date(today.getTime() + (expires));

			document.cookie = name + "=" + escape(value) + ((expires) ? ";expires=" + expires_date.toGMTString() : "") + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ((secure) ? ";secure" : "");
		},
		getCookie : function(name) {
			var re = new RegExp(name + '=([^;]+)');
			var val = re.exec(document.cookie);
			return val == null || val == NaN ? null : val[1]
		},
		getIndex : function(times, name, length) {
			ads.setCookie(name, times);
			var index = times % length;
			return index;
		},
		compareTime : function(start, end) {
			if(!start && !end) {
				return true;
			}
			var date = new Date;
			var start = new Date(start + " 09:00:00");
			var end = new Date(new Date(end + " 09:00:00").getTime() + 1000 * 60 * 60 * 24);
			return date > start && date < end;
		},
		throttle : function(fn, delay) {//http://remysharp.com/2010/07/21/throttling-function-calls/
			var timer = null;
			return function() {
				var context = this, args = arguments;
				clearTimeout(timer);
				timer = setTimeout(function() {
					fn.apply(context, args);
				}, delay);
			};
		},
		getScript : function(url, callback) {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			if(script.readyState) {
				script.onreadystatechange = function() {
					if(script.readyState == 'loaded' || script.readyState == 'complete') {
						script.onreadystatechange = null;
						if(callback)
							callback();
						script.parentNode.removeChild(script);
					}
				}
			} else {
				script.onload = function() {
					if(callback)
						callback();
					script.parentNode.removeChild(script);
				}
			}
			script.src = url;
			document.getElementsByTagName('head')[0].appendChild(script);
		},
		getSwfObject : function(id){
			var el = document.getElementById(id)
			return ads.ie?el.firstChild:el.getElementsByTagName('embed')[0];
		},
		getEventTarget:function(e){
			var evt = e || window.event;
			var target = evt.target || evt.srcElement;
			return target;
		},
		onVideoLoaded:function(id){
			document.getElementById(id).style.top = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - 336 + "px"
		},
		onVideoClosed:function(id){
			var player = document.getElementById(id)
			player.parentNode.removeChild(player)
		},
		onNewVideoClosed:function(id){
			var player = document.getElementById(id)
			ads.animate(player,{
						width: "22px"
					},{
						duration : 500,
						easing : "easeOutCirc"
			});
		},
		onNewVideoComplete:function(id){
			this.onNewVideoPause.pause = 1;
			ads.onNewVideoClosed(id);
		},
		onNewVideoPause:function(id,state){
			this.onNewVideoPause.pause = state;
		}
	};
	ads.cssProps = {
		// normalize float css property
		"float" : ads.supports.cssFloat ? "cssFloat" : "styleFloat"
	};
	ads.fx = function(elem, options, prop) {
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		if(!options.orig)
			options.orig = {};
	};
	ads.fx.prototype = {
		update : function() {(ads.fx.step[this.prop] || ads.fx.step._default)(this);

			if(this.options.step)
				this.options.step.call(this.elem, this.now, this);

		},
		custom : function(from, to, unit) {
			this.startTime = (new Date()).getTime();
			this.start = from;
			this.end = to;
			this.unit = unit;
			// || this.unit || "px";
			this.now = this.start;
			this.pos = this.state = 0;

			var self = this;
			function t(gotoEnd) {
				return self.step(gotoEnd);
			}


			t.elem = this.elem;

			if(t() && ads.timers.push(t) == 1) {
				ads.timerId = setInterval(function() {
					var timers = ads.timers;

					for(var i = 0; i < timers.length; i++)
					if(!timers[i]())
						timers.splice(i--, 1);

					if(!timers.length) {
						clearInterval(ads.timerId);
					}
				}, 50);
			}
		},
		step : function(gotoEnd) {
			var t = (new Date()).getTime();
			if(gotoEnd || t >= this.options.duration + this.startTime) {
				this.now = this.end;
				this.pos = this.state = 1;
				this.update();

				this.options.curAnim[this.prop] = true;

				var done = true;
				for(var i in this.options.curAnim)
				if(this.options.curAnim[i] !== true)
					done = false;

				if(done) {
					if(this.options.complete)
						this.options.complete.call(this.elem);
				}
				return false;
			} else {
				var n = t - this.startTime;
				this.state = n / this.options.duration;
				this.pos = this.options.easing(n, 0, 1, this.options.duration);
				this.now = this.start + ((this.end - this.start) * this.pos);
				this.update();
			}
			return true;
		}
	};

	ads.fx.step = {

		opacity : function(fx) {
			ads.setStyle(fx.elem, {
				opacity : fx.now
			});
		},
		_default : function(fx) {
			try {
				if(fx.elem.style && fx.elem.style[fx.prop] != null)
					fx.elem.style[fx.prop] = fx.now + fx.unit;
				else
					fx.elem[fx.prop] = fx.now;
			} catch (e) {
			}
		}
	}
	ads.init();
})(window);

/**
 * sina flash class
 * @version 1.1.4.2
 * @author [sina ui]zhangping1@
 * @update 2008-7-7
 */
var sinaFlash = function(V, x, X, Z, v, z, i, c, I, l, o){
    var w = this;
    if (!document.createElement || !document.getElementById) {
        return
    }
    w.id = x ? x : '';
    var O = function(I, i){
        for (var l = 0; l < I.length; l++) {
            if (I[l] == i) {
                return l
            }
        }
        return -1
    }, C = '8.0.42.0';
    if (O(['eladies.sina.com.cn', 'ent.sina.com.cn'], document.domain) > -1) {
        w.ver = C
    }
    else {
        w.ver = v ? v : C
    }
    w.ver = w.ver.replace(/\./g, ',');
    w.__classid = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
    w.__codebase = "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=" + w.ver;
    w.width = X;
    w.height = Z;
    w.movie = V;
    w.src = w.movie;
    w.bgcolor = z ? z : '';
    w.quality = c ? c : "high";
    w.__pluginspage = "http://www.macromedia.com/go/getflashplayer";
    w.__type = "application/x-shockwave-flash";
    w.useExpressInstall = (typeof(i) == "boolean") ? i : false;
    w.xir = I ? I : window.location;
    w.redirectUrl = l ? l : window.location;
    w.detectKey = (typeof(o) == "boolean") ? o : true;
    w.escapeIs = false;
    w.__objAttrs = {};
    w.__params = {};
    w.__embedAttrs = {};
    w.__flashVars = [];
    w.__flashVarsStr = "";
    w.__forSetAttribute("id", w.id);
    w.__objAttrs["classid"] = w.__classid;
    w.__forSetAttribute("codebase", w.__codebase);
    w.__forSetAttribute("width", w.width);
    w.__forSetAttribute("height", w.height);
    w.__forSetAttribute("movie", w.movie);
    w.__forSetAttribute("quality", w.quality);
    w.__forSetAttribute("pluginspage", w.__pluginspage);
    w.__forSetAttribute("type", w.__type);
    w.__forSetAttribute("bgcolor", w.bgcolor)
};
sinaFlash.prototype = {
    getFlashHtml: function(){
        var I = this, i = '<object ';
        for (var l in I.__objAttrs) {
            i += l + '="' + I.__objAttrs[l] + '"' + ' '
        }
        i += '>\n';
        for (var l in I.__params) {
            i += '	<param name="' + l + '" value="' + I.__params[l] + '" \/>\n'
        }
        if (I.__flashVarsStr != "") {
            i += '	<param name="flashvars" value="' + I.__flashVarsStr + '" \/>\n'
        }
        i += '	<embed ';
        for (var l in I.__embedAttrs) {
            i += l + '="' + I.__embedAttrs[l] + '"' + ' '
        }
        i += '><\/embed>\n<\/object>';
        return i
    },
    __forSetAttribute: function(I, i){
        var l = this;
        if (typeof(I) == "undefined" || I == '' || typeof(i) == "undefined" || i == '') {
            return
        }
        I = I.toLowerCase();
        switch (I) {
            case "classid":
                break;
            case "pluginspage":
                l.__embedAttrs[I] = i;
                break;
            case "onafterupdate":
            case "onbeforeupdate":
            case "onblur":
            case "oncellchange":
            case "onclick":
            case "ondblClick":
            case "ondrag":
            case "ondragend":
            case "ondragenter":
            case "ondragleave":
            case "ondragover":
            case "ondrop":
            case "onfinish":
            case "onfocus":
            case "onhelp":
            case "onmousedown":
            case "onmouseup":
            case "onmouseover":
            case "onmousemove":
            case "onmouseout":
            case "onkeypress":
            case "onkeydown":
            case "onkeyup":
            case "onload":
            case "onlosecapture":
            case "onpropertychange":
            case "onreadystatechange":
            case "onrowsdelete":
            case "onrowenter":
            case "onrowexit":
            case "onrowsinserted":
            case "onstart":
            case "onscroll":
            case "onbeforeeditfocus":
            case "onactivate":
            case "onbeforedeactivate":
            case "ondeactivate":
            case "codebase":
                l.__objAttrs[I] = i;
                break;
            case "src":
            case "movie":
                l.__embedAttrs["src"] = i;
                l.__params["movie"] = i;
                break;
            case "width":
            case "height":
            case "align":
            case "vspace":
            case "hspace":
            case "title":
            case "class":
            case "name":
            case "id":
            case "accesskey":
            case "tabindex":
            case "type":
                l.__objAttrs[I] = l.__embedAttrs[I] = i;
                break;
            default:
                l.__params[I] = l.__embedAttrs[I] = i
        }
    },
    __forGetAttribute: function(i){
        var I = this;
        i = i.toLowerCase();
        if (typeof I.__objAttrs[i] != "undefined") {
            return I.__objAttrs[i]
        }
        else 
            if (typeof I.__params[i] != "undefined") {
                return I.__params[i]
            }
            else 
                if (typeof I.__embedAttrs[i] != "undefined") {
                    return I.__embedAttrs[i]
                }
                else {
                    return null
                }
    },
    setAttribute: function(I, i){
        this.__forSetAttribute(I, i)
    },
    getAttribute: function(i){
        return this.__forGetAttribute(i)
    },
    addVariable: function(I, i){
        var l = this;
        if (l.escapeIs) {
            I = escape(I);
            i = escape(i)
        }
        if (l.__flashVarsStr == "") {
            l.__flashVarsStr = I + "=" + i
        }
        else {
            l.__flashVarsStr += "&" + I + "=" + i
        }
        l.__embedAttrs["FlashVars"] = l.__flashVarsStr
    },
    getVariable: function(I){
        var o = this, i = o.__flashVarsStr;
        if (o.escapeIs) {
            I = escape(I)
        }
        var l = new RegExp(I + "=([^\\&]*)(\\&?)", "i").exec(i);
        if (o.escapeIs) {
            return unescape(RegExp.$1)
        }
        return RegExp.$1
    },
    addParam: function(I, i){
        this.__forSetAttribute(I, i)
    },
    getParam: function(i){
        return this.__forGetAttribute(i)
    },
    write: function(i){
        var I = this;
        if (typeof i == "string") {
            document.getElementById(i).innerHTML = I.getFlashHtml()
        }
        else 
            if (typeof i == "object") {
                i.innerHTML = I.getFlashHtml()
            }
    }
};
// doU.js
// (c) 2011, Laura Doktorova
// https://github.com/olado/doT
//
// doU is an extraction and slight modification of an excellent
// templating function from jQote2.js (jQuery plugin) by aefxx
// (http://aefxx.com/jquery-plugins/jqote2/).
//
// Modifications:
// 1. nodejs support
// 2. allow for custom template markers
// 3. only allow direct invocation of the compiled function
//
// Licensed under the MIT license.

(function() {
	var doU = { version : '0.1.2' };

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = doU;
	} else {
		this.doU = doU;
	}

	doU.templateSettings = {
		begin : '{{',
		end : '}}',
		varname : 'it'
	};

	doU.template = function(tmpl, conf) {
		conf = conf || doU.templateSettings;
		var str = '', tb = conf.begin, te = conf.end, m, l,
			arr = tmpl.replace(/\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\n\t]|(\/\*[\s\S]*?\*\/)/g, '')
				.split(tb).join(te +'\x1b')
				.split(te);

		for (m=0,l=arr.length; m < l; m++) {
			str += arr[m].charAt(0) !== '\x1b' ?
			"out+='" + arr[m].replace(/(\\|["'])/g, '\\$1') + "'" : (arr[m].charAt(1) === '=' ?
			';out+=(' + arr[m].substr(2) + ');' : (arr[m].charAt(1) === '!' ?
			';out+=(' + arr[m].substr(2) + ").toString().replace(/&(?!\\w+;)/g, '&#38;').split('<').join('&#60;').split('>').join('&#62;').split('" + '"' + "').join('&#34;').split(" + '"' + "'" + '"' + ").join('&#39;').split('/').join('&#x2F;');" : ';' + arr[m].substr(1)));
		}

		str = ('var out="";'+str+';return out;')
			.split("out+='';").join('')
			.split('var out="";out+=').join('var out=');

		try {
			return new Function(conf.varname, str);
		} catch (e) {
			if (typeof console !== 'undefined') console.log("Could not create a template function: " + str);
			throw e;
		}
	};
}());
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
    var initializing = false, fnTest = /xyz/.test(function(){
        xyz;
    }) ? /\b_super\b/ : /.*/;
    
    // The base Class implementation (does nothing)
    this.Class = function(){
    };
    
    // Create a new Class that inherits from this class
    Class.extend = function(prop){
        var _super = this.prototype;
        
        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;
        
        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
            typeof _super[name] == "function" &&
            fnTest.test(prop[name]) ? (function(name, fn){
                return function(){
                    var tmp = this._super;
                    
                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];
                    
                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                    
                    return ret;
                };
            })(name, prop[name]) : prop[name];
        }
        
        // The dummy class constructor
        function Class(){
            // All construction is actually done in the init method
            if (!initializing && this.init) 
                this.init.apply(this, arguments);
        }
        
        // Populate our constructed prototype object
        Class.prototype = prototype;
        
        // Enforce the constructor to be what we expect
        Class.constructor = Class;
        
        // And make this class extendable
        Class.extend = arguments.callee;
        
        return Class;
    };
})();
// written by Dean Edwards, 2005
// with input from Tino Zijdel, Matthias Miller, Diego Perini

// http://dean.edwards.name/weblog/2005/10/add-event/

function addEvent(element, type, handler) {
	function fun(e){
		var a = e.currentTarget, b = e.relatedTarget;
		if(!elContains(a, b) && a!=b){
			handler.call(e.currentTarget,e);
		}
	} 
	if (element.addEventListener) {
		if(type=='mouseenter'){
			element.addEventListener('mouseover', fun, false);
		}else if(type=='mouseleave'){
			element.addEventListener('mouseout', fun, false);
		}else{
			element.addEventListener(type, handler, false);
		}
	} else {
		// assign each event handler a unique ID
		if (!handler.$$guid) handler.$$guid = addEvent.guid++;
		// create a hash table of event types for the element
		if (!element.events) element.events = {};
		// create a hash table of event handlers for each element/event pair
		var handlers = element.events[type];
		if (!handlers) {
			handlers = element.events[type] = {};
			// store the existing event handler (if there is one)
			if (element["on" + type]) {
				handlers[0] = element["on" + type];
			}
		}
		// store the event handler in the hash table
		handlers[handler.$$guid] = handler;
		// assign a global event handler to do all the work
		element["on" + type] = handleEvent;
	}
};
// a counter used to create unique IDs
addEvent.guid = 1;

function removeEvent(element, type, handler) {
	if (element.removeEventListener) {
		element.removeEventListener(type, handler, false);
	} else {
		// delete the event handler from the hash table
		if (element.events && element.events[type]) {
			delete element.events[type][handler.$$guid];
		}
	}
};

function handleEvent(event) {
	var returnValue = true;
	// grab the event object (IE uses a global event object)
	event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
	// get a reference to the hash table of event handlers
	var handlers = this.events[event.type];
	// execute each event handler
	for (var i in handlers) {
		this.$$handleEvent = handlers[i];
		if (this.$$handleEvent(event) === false) {
			returnValue = false;
		}
	}
	return returnValue;
};

function fixEvent(event) {
	// add W3C standard event methods
	event.preventDefault = fixEvent.preventDefault;
	event.stopPropagation = fixEvent.stopPropagation;
	return event;
};
fixEvent.preventDefault = function() {
	this.returnValue = false;
};
fixEvent.stopPropagation = function() {
	this.cancelBubble = true;
};

function elContains(a, b){
	try{
		return a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16);
	}catch(e){}
}/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true,
	rBackslash = /\\/g,
	rNonWord = /\W/;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var m, set, checkSet, extra, ret, cur, pop, i,
		prune = true,
		contextXML = Sizzle.isXML( context ),
		parts = [],
		soFar = selector;
	
	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec( "" );
		m = chunker.exec( soFar );

		if ( m ) {
			soFar = m[3];
		
			parts.push( m[1] );
		
			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	if ( parts.length > 1 && origPOS.exec( selector ) ) {

		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );

		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}
				
				set = posProcess( selector, set );
			}
		}

	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {

			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ?
				Sizzle.filter( ret.expr, ret.set )[0] :
				ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

			set = ret.expr ?
				Sizzle.filter( ret.expr, ret.set ) :
				ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray( set );

			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}

		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );

		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}

		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}

	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function( results ) {
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function( expr, set ) {
	return Sizzle( expr, null, null, set );
};

Sizzle.matchesSelector = function( node, expr ) {
	return Sizzle( expr, null, null, [node] ).length > 0;
};

Sizzle.find = function( expr, context, isXML ) {
	var set;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var match,
			type = Expr.order[i];
		
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			var left = match[1];
			match.splice( 1, 1 );

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace( rBackslash, "" );
				set = Expr.find[ type ]( match, context, isXML );

				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( "*" ) :
			[];
	}

	return { set: set, expr: expr };
};

Sizzle.filter = function( expr, set, inplace, not ) {
	var match, anyFound,
		old = expr,
		result = [],
		curLoop = set,
		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				var found, item,
					filter = Expr.filter[ type ],
					left = match[1];

				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;

					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;

								} else {
									curLoop[i] = false;
								}

							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );

			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw "Syntax error, unrecognized expression: " + msg;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],

	match: {
		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},

	leftMatch: {},

	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},

	attrHandle: {
		href: function( elem ) {
			return elem.getAttribute( "href" );
		},
		type: function( elem ) {
			return elem.getAttribute( "type" );
		}
	},

	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !rNonWord.test( part ),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},

		">": function( checkSet, part ) {
			var elem,
				isPartStr = typeof part === "string",
				i = 0,
				l = checkSet.length;

			if ( isPartStr && !rNonWord.test( part ) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}

			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},

		"": function(checkSet, part, isXML){
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
		},

		"~": function( checkSet, part, isXML ) {
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
		}
	},

	find: {
		ID: function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		},

		NAME: function( match, context ) {
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [],
					results = context.getElementsByName( match[1] );

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},

		TAG: function( match, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( match[1] );
			}
		}
	},
	preFilter: {
		CLASS: function( match, curLoop, inplace, result, not, isXML ) {
			match = " " + match[1].replace( rBackslash, "" ) + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}

					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},

		ID: function( match ) {
			return match[1].replace( rBackslash, "" );
		},

		TAG: function( match, curLoop ) {
			return match[1].replace( rBackslash, "" ).toLowerCase();
		},

		CHILD: function( match ) {
			if ( match[1] === "nth" ) {
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				match[2] = match[2].replace(/^\+|\s*/g, '');

				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}
			else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},

		ATTR: function( match, curLoop, inplace, result, not, isXML ) {
			var name = match[1] = match[1].replace( rBackslash, "" );
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			// Handle if an un-quoted value was used
			match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},

		PSEUDO: function( match, curLoop, inplace, result, not ) {
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);

				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

					if ( !inplace ) {
						result.push.apply( result, ret );
					}

					return false;
				}

			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},

		POS: function( match ) {
			match.unshift( true );

			return match;
		}
	},
	
	filters: {
		enabled: function( elem ) {
			return elem.disabled === false && elem.type !== "hidden";
		},

		disabled: function( elem ) {
			return elem.disabled === true;
		},

		checked: function( elem ) {
			return elem.checked === true;
		},
		
		selected: function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}
			
			return elem.selected === true;
		},

		parent: function( elem ) {
			return !!elem.firstChild;
		},

		empty: function( elem ) {
			return !elem.firstChild;
		},

		has: function( elem, i, match ) {
			return !!Sizzle( match[3], elem ).length;
		},

		header: function( elem ) {
			return (/h\d/i).test( elem.nodeName );
		},

		text: function( elem ) {
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc) 
			// use getAttribute instead to test this case
			return "text" === elem.getAttribute( 'type' );
		},
		radio: function( elem ) {
			return "radio" === elem.type;
		},

		checkbox: function( elem ) {
			return "checkbox" === elem.type;
		},

		file: function( elem ) {
			return "file" === elem.type;
		},
		password: function( elem ) {
			return "password" === elem.type;
		},

		submit: function( elem ) {
			return "submit" === elem.type;
		},

		image: function( elem ) {
			return "image" === elem.type;
		},

		reset: function( elem ) {
			return "reset" === elem.type;
		},

		button: function( elem ) {
			return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
		},

		input: function( elem ) {
			return (/input|select|textarea|button/i).test( elem.nodeName );
		}
	},
	setFilters: {
		first: function( elem, i ) {
			return i === 0;
		},

		last: function( elem, i, match, array ) {
			return i === array.length - 1;
		},

		even: function( elem, i ) {
			return i % 2 === 0;
		},

		odd: function( elem, i ) {
			return i % 2 === 1;
		},

		lt: function( elem, i, match ) {
			return i < match[3] - 0;
		},

		gt: function( elem, i, match ) {
			return i > match[3] - 0;
		},

		nth: function( elem, i, match ) {
			return match[3] - 0 === i;
		},

		eq: function( elem, i, match ) {
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function( elem, match, i, array ) {
			var name = match[1],
				filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );

			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || Sizzle.getText([ elem ]) || "").indexOf(match[3]) >= 0;

			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;

			} else {
				Sizzle.error( name );
			}
		},

		CHILD: function( elem, match ) {
			var type = match[1],
				node = elem;

			switch ( type ) {
				case "only":
				case "first":
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					if ( type === "first" ) { 
						return true; 
					}

					node = elem;

				case "last":
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					return true;

				case "nth":
					var first = match[2],
						last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}
					
					var doneName = match[0],
						parent = elem.parentNode;
	
					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 

						parent.sizcache = doneName;
					}
					
					var diff = elem.nodeIndex - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},

		ID: function( elem, match ) {
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},

		TAG: function( elem, match ) {
			return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
		},
		
		CLASS: function( elem, match ) {
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},

		ATTR: function( elem, match ) {
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},

		POS: function( elem, match, i, array ) {
			var name = match[2],
				filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function( array, results ) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
} catch( e ) {
	makeArray = function( array, results ) {
		var i = 0,
			ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );

		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}

			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder, siblingCheck;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			return a.compareDocumentPosition ? -1 : 1;
		}

		return a.compareDocumentPosition(b) & 4 ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// If the nodes are siblings (or identical) we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

// Utility function for retreiving the text value of an array of DOM nodes
Sizzle.getText = function( elems ) {
	var ret = "", elem;

	for ( var i = 0; elems[i]; i++ ) {
		elem = elems[i];

		// Get the text from text nodes and CDATA nodes
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
			ret += elem.nodeValue;

		// Traverse everything else, except comment nodes
		} else if ( elem.nodeType !== 8 ) {
			ret += Sizzle.getText( elem.childNodes );
		}
	}

	return ret;
};

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime(),
		root = document.documentElement;

	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);

				return m ?
					m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
						[m] :
						undefined :
					[];
			}
		};

		Expr.filter.ID = function( elem, match ) {
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );

	// release memory in IE
	root = form = null;
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function( match, context ) {
			var results = context.getElementsByTagName( match[1] );

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";

	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {

		Expr.attrHandle.href = function( elem ) {
			return elem.getAttribute( "href", 2 );
		};
	}

	// release memory in IE
	div = null;
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle,
			div = document.createElement("div"),
			id = "__sizzle__";

		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}
	
		Sizzle = function( query, context, extra, seed ) {
			context = context || document;

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && !Sizzle.isXML(context) ) {
				// See if we find a selector to speed up
				var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );
				
				if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
					// Speed-up: Sizzle("TAG")
					if ( match[1] ) {
						return makeArray( context.getElementsByTagName( query ), extra );
					
					// Speed-up: Sizzle(".CLASS")
					} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
						return makeArray( context.getElementsByClassName( match[2] ), extra );
					}
				}
				
				if ( context.nodeType === 9 ) {
					// Speed-up: Sizzle("body")
					// The body element only exists once, optimize finding it
					if ( query === "body" && context.body ) {
						return makeArray( [ context.body ], extra );
						
					// Speed-up: Sizzle("#ID")
					} else if ( match && match[3] ) {
						var elem = context.getElementById( match[3] );

						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Handle the case where IE and Opera return items
							// by name instead of ID
							if ( elem.id === match[3] ) {
								return makeArray( [ elem ], extra );
							}
							
						} else {
							return makeArray( [], extra );
						}
					}
					
					try {
						return makeArray( context.querySelectorAll(query), extra );
					} catch(qsaError) {}

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var oldContext = context,
						old = context.getAttribute( "id" ),
						nid = old || id,
						hasParent = context.parentNode,
						relativeHierarchySelector = /^\s*[+~]/.test( query );

					if ( !old ) {
						context.setAttribute( "id", nid );
					} else {
						nid = nid.replace( /'/g, "\\$&" );
					}
					if ( relativeHierarchySelector && hasParent ) {
						context = context.parentNode;
					}

					try {
						if ( !relativeHierarchySelector || hasParent ) {
							return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
						}

					} catch(pseudoError) {
					} finally {
						if ( !old ) {
							oldContext.removeAttribute( "id" );
						}
					}
				}
			}
		
			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		// release memory in IE
		div = null;
	})();
}

(function(){
	var html = document.documentElement,
		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector,
		pseudoWorks = false;

	try {
		// This should fail with an exception
		// Gecko does not error, returns false instead
		matches.call( document.documentElement, "[test!='']:sizzle" );
	
	} catch( pseudoError ) {
		pseudoWorks = true;
	}

	if ( matches ) {
		Sizzle.matchesSelector = function( node, expr ) {
			// Make sure that attribute selectors are quoted
			expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			if ( !Sizzle.isXML( node ) ) {
				try { 
					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
						return matches.call( node, expr );
					}
				} catch(e) {}
			}

			return Sizzle(expr, null, null, [node]).length > 0;
		};
	}
})();

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	// Also, make sure that getElementsByClassName actually exists
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}
	
	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function( match, context, isXML ) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	// release memory in IE
	div = null;
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;

			elem = elem[dir];

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;
			
			elem = elem[dir];

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}

					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

if ( document.documentElement.contains ) {
	Sizzle.contains = function( a, b ) {
		return a !== b && (a.contains ? a.contains(b) : true);
	};

} else if ( document.documentElement.compareDocumentPosition ) {
	Sizzle.contains = function( a, b ) {
		return !!(a.compareDocumentPosition(b) & 16);
	};

} else {
	Sizzle.contains = function() {
		return false;
	};
}

Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833) 
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function( selector, context ) {
	var match,
		tmpSet = [],
		later = "",
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE

window.Sizzle = Sizzle;

})();
(function() {
	var div = document.createElement('div');
	div.style.display = "none";
	div.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[0], select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
	ads = ads ? ads : {};

	ads.support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace : div.firstChild.nodeType === 3,

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody : !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize : !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText insted)
		style : /red/.test(a.getAttribute("style")),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized : a.getAttribute("href") === "/a",

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity : /^0.55$/.test(a.style.opacity),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat : !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn : div.getElementsByTagName("input")[0].value === "on",

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected : opt.selected,

		// Will be defined later
		deleteExpando : true,
		optDisabled : false,
		checkClone : false,
		noCloneEvent : true,
		noCloneChecked : true,
		boxModel : null,
		inlineBlockNeedsLayout : false,
		shrinkWrapBlocks : false,
		reliableHiddenOffsets : true
	};
	ads.isWindow = function(obj) {
		return obj && typeof obj === "object" && "setInterval" in obj;
	};
	ads.offset = {
		initialize : function() {
			var body = document.body, container = document.createElement("div"), innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat(jQuery.css(body, "marginTop")) || 0, html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";

			ads.extend(container.style, {
				position : "absolute",
				top : 0,
				left : 0,
				margin : 0,
				border : 0,
				width : "1px",
				height : "1px",
				visibility : "hidden"
			});

			container.innerHTML = html;
			body.insertBefore(container, body.firstChild);
			innerDiv = container.firstChild;
			checkDiv = innerDiv.firstChild;
			td = innerDiv.nextSibling.firstChild.firstChild;

			this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
			this.doesAddBorderForTableAndCells = (td.offsetTop === 5);

			checkDiv.style.position = "fixed";
			checkDiv.style.top = "20px";

			// safari subtracts parent border width here which is 5px
			this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);
			checkDiv.style.position = checkDiv.style.top = "";

			innerDiv.style.overflow = "hidden";
			innerDiv.style.position = "relative";

			this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

			this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);

			body.removeChild(container);
			ads.offset.initialize = jQuery.noop;
		},
		bodyOffset : function(body) {
			var top = body.offsetTop, left = body.offsetLeft;

			ads.offset.initialize();

			if(ads.offset.doesNotIncludeMarginInBodyOffset) {
				top += parseFloat(ads.css(body, "marginTop")) || 0;
				left += parseFloat(ads.css(body, "marginLeft")) || 0;
			}

			return {
				top : top,
				left : left
			};
		},
		setOffset : function(elem, options, i) {
			var position = ads.css(elem, "position");

			// set position first, in-case top/left are set even on static elem
			if(position === "static") {
				elem.style.position = "relative";
			}

			//var curElem = jQuery( elem ),
			var curOffset = ads.offset(elem), curCSSTop = ads.css(elem, "top"), curCSSLeft = ads.css(elem, "left"), calculatePosition = (position === "absolute" || position === "fixed") && ads.inArray("auto", [curCSSTop, curCSSLeft]) > -1, props = {}, curPosition = {}, curTop, curLeft;

			// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
			if(calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}

			if(ads.isFunction(options)) {
				options = options.call(elem, i, curOffset);
			}

			if(options.top != null) {
				props.top = (options.top - curOffset.top) + curTop;
			}
			if(options.left != null) {
				props.left = (options.left - curOffset.left) + curLeft;
			}

			if("using" in options) {
				options.using.call(elem, props);
			} else {
				curElem.css(props);
			}
		}
	};
	ads.isNaN = function(obj) {
		return obj == null || !rdigit.test(obj) || isNaN(obj);
	};
	ads.each = function(object, callback, args) {
		var name, i = 0, length = object.length, isObj = length === undefined || ads.isFunction(object);

		if(args) {
			if(isObj) {
				for(name in object ) {
					if(callback.apply(object[name], args) === false) {
						break;
					}
				}
			} else {
				for(; i < length; ) {
					if(callback.apply(object[i++], args) === false) {
						break;
					}
				}
			}

			// A special, fast, case for the most common use of each
		} else {
			if(isObj) {
				for(name in object ) {
					if(callback.call(object[name], name, object[name]) === false) {
						break;
					}
				}
			} else {
				for(var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {
				}
			}
		}

		return object;
	};
	// Check for digits
	var rdigit = /\d/;
	function getWindow(elem) {
		return ads.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
	}

	if("getBoundingClientRect" in document.documentElement) {
		ads.offSet = function(selector) {
			var elem = typeof selector === "string" ? Sizzle(selector)[0] : selector, box;

			if(!elem || !elem.ownerDocument) {
				return null;
			}

			if(elem === elem.ownerDocument.body) {
				return ads.offset.bodyOffset(elem);
			}

			try {
				box = elem.getBoundingClientRect();
			} catch(e) {
			}

			var doc = elem.ownerDocument, docElem = doc.documentElement;

			// Make sure we're not dealing with a disconnected DOM node
			if(!box || !Sizzle.contains(docElem, elem)) {
				return box ? {
					top : box.top,
					left : box.left
				} : {
					top : 0,
					left : 0
				};
			}

			var body = doc.body, win = getWindow(doc), clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0, scrollTop = (win.pageYOffset || ads.support.boxModel && docElem.scrollTop || body.scrollTop ), scrollLeft = (win.pageXOffset || ads.support.boxModel && docElem.scrollLeft || body.scrollLeft), top = box.top + scrollTop - clientTop, left = box.left + scrollLeft - clientLeft;

			return {
				top : top,
				left : left
			};
		};
	} else {
		ads.offSet = function(selector) {

			var elem = typeof selector === "string" ? Sizzle(selector)[0] : selector;

			if(!elem || !elem.ownerDocument) {
				return null;
			}

			if(elem === elem.ownerDocument.body) {
				return ads.offset.bodyOffset(elem);
			}

			ads.offset.initialize();

			var computedStyle, offsetParent = elem.offsetParent, prevOffsetParent = elem, doc = elem.ownerDocument, docElem = doc.documentElement, body = doc.body, defaultView = doc.defaultView, prevComputedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle, top = elem.offsetTop, left = elem.offsetLeft;

			while(( elem = elem.parentNode) && elem !== body && elem !== docElem) {
				if(ads.offset.supportsFixedPosition && prevComputedStyle.position === "fixed") {
					break;
				}
				computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
				top -= elem.scrollTop;
				left -= elem.scrollLeft;

				if(elem === offsetParent) {
					top += elem.offsetTop;
					left += elem.offsetLeft;

					if(ads.offset.doesNotAddBorder && !(ads.offset.doesAddBorderForTableAndCells && rtable.test(elem.nodeName))) {
						top += parseFloat(computedStyle.borderTopWidth) || 0;
						left += parseFloat(computedStyle.borderLeftWidth) || 0;
					}
					prevOffsetParent = offsetParent;
					offsetParent = elem.offsetParent;
				}

				if(ads.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible") {
					top += parseFloat(computedStyle.borderTopWidth) || 0;
					left += parseFloat(computedStyle.borderLeftWidth) || 0;
				}
				prevComputedStyle = computedStyle;
			}

			if(prevComputedStyle.position === "relative" || prevComputedStyle.position === "static") {
				top += body.offsetTop;
				left += body.offsetLeft;
			}

			if(ads.offset.supportsFixedPosition && prevComputedStyle.position === "fixed") {
				top += Math.max(docElem.scrollTop, body.scrollTop);
				left += Math.max(docElem.scrollLeft, body.scrollLeft);
			}

			return {
				top : top,
				left : left
			};
		};
	}

	var heightWidth = ["height", "width"];
	ads.each(["Height", "Width"], function(i, name) {
		var type = name.toLowerCase();
		ads[type] = function(elem, size) {
			if(ads.isWindow(elem)) {
				// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
				// 3rd condition allows Nokia support, as it supports the docElem prop but not CSS1Compat
				var docElemProp = elem.document.documentElement["client" + name];
				return elem.document.compatMode === "CSS1Compat" && docElemProp || elem.document.body["client" + name] || docElemProp;

				// Get document width or height
			} else if(elem.nodeType === 9) {
				// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
				return Math.max(elem.documentElement["client" + name], elem.body["scroll" + name], elem.documentElement["scroll" + name], elem.body["offset" + name], elem.documentElement["offset" + name]);

				// Get or set width or height on the element
			} else if(size === undefined) {
				var orig = ads.css(elem, type), ret = parseFloat(orig);

				return ads.isNaN(ret) ? orig : ret;

				// Set the width or height on the element (default to pixels if value is unitless)
			} else {
				return this.css(type, typeof size === "string" ? size : size + "px");
			}
		}
	})
	var leftTop = ["Left", "Top"];
	for(var i = 0; i < leftTop.length; i++) {
		var method = "scroll" + leftTop[i];

		ads[method] = function(elem, val) {
			var win;

			if(!elem) {
				return null;
			}

			if(val !== undefined) {
				// Set the scroll offset
				return this.each(function() {
					win = getWindow(this);

					if(win) {
						win.scrollTo(!i ? val : ads.scrollLeft(win), i ? val : ads.scrollTop(win));

					} else {
						this[method] = val;
					}
				});
			} else {
				win = getWindow(elem);

				// Return the scroll offset
				return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset"] : ads.support.boxModel && win.document.documentElement[method] || win.document.body[method] : elem[method];
			}
		};
	};

	ads.belowthefold = function(element, settings) {
		var fold = ads.height(window) + ads.scrollTop(window);
		return fold <= ads.offSet(element).top - settings.threshold;
	};
	ads.abovethetop = function(element, settings) {
		var top = ads.scrollTop(window);
		return top >= ads.offSet(element).top + ads.height(element) + settings.threshold;
	};
	/*ads.rightofscreen = function(element, settings) {
	 var fold = ads.width(window) + ads.scrollLeft(window);
	 return fold <= ads.offSet(element).left - settings.threshold;
	 };
	 ads.leftofscreen = function(element, settings) {
	 var left = ads.scrollLeft(window);
	 return left >= ads.offSet(element).left + ads.width(element) + settings.threshold;
	 };*/
	ads.inViewPort = function(element, settings) {
		var element = typeof element === "string" ? Sizzle(element)[0] : element;
		if(!element) {
			return false;
		}
		return !ads.belowthefold(element, settings) && !ads.abovethetop(element, settings);
	};
})();
/**
 * @author nttdocomo
 */
(function() {
	ads.insertAfter = function(newEl, targetEl) {
		var parentEl = targetEl.parentNode;

		if(parentEl.lastChild == targetEl) {
			parentEl.appendChild(newEl);
		} else {
			parentEl.insertBefore(newEl, targetEl.nextSibling);
		}
	}
	ads.cleanArr = function(arr){
		for(var i =arr.length-1;i>-1;i--){
			if(!arr[i] || arr[i] == ''){
				arr.splice(i,1);
			}
		}
	}
	ads.que = {};
	ads.startShow = function(type, data) {
		/*var type = type.replace(/^[a-z]/, function(val) {
		 return val.toUpperCase();
		 });
		 if(data.data) {
		 var data = data;
		 ads.newAds(type, data);
		 }*/
		if(ads[type])
			return ads[type](data);
	}
	var adsWithOutPosition = {
		"fullscreen" : true,
		"plp" : true,
		"lmt" : true,
		"rotatorDl" : true,
		"dl" : true,
		"window" : true,
		"sinaHouseBanner" : true
	}
	ads.displayAds = function() {
		ads.showAScreen();
	}
	ads.showAds = function(adsData) {
		if(ads.flashChecker.f) {
			if(!ads.dataRest) {
				ads.dataRest = adsData;
				ads.displayAds(adsData);
				addEvent(window, 'scroll', ads.throttle(ads.displayAds, 100));
			}
		}
	};
	ads.threshold = {
		threshold : 100
	};
	ads.loopAds = function(el, data) {
		el.innerHTML='';
		for(var i = 0; i < data.length; i++) {
			var item = data[i];
			if(item) {
				try{
					if(item[0] == undefined || item[0].params.location!='extendibleBtn'){
						var container = document.createElement('div');
						ads.cleanArr(item);
						container.className = "col row-"+item.length + " cf";
						for(var j = 0; j < item.length; j++) {
							var ad = ads.startShow(item[j].type, item[j]);
							if(ad){
								if(item.length>1){
									if(j>0 && item[0].type == "banner"){
										ads.setStyle(ad,{'marginLeft':"10px"});
									}
									if(item[0].type == "text"){
										ads.setStyle(ad,{'float':"left","display":"block","width":(99/item.length)+"%"});
									}
								}
								container.appendChild(ad);
							}
						}
					}else{
						var container=ads.extendibleBtn(data,'createBox'),
							container_ul=container.getElementsByTagName('ul')[0];
						for(var j = 0; j < item.length; j++) {
							var list=item[j].params.list;
							for(var x = 0; x < list.length; x++){
								ad=ads.extendibleBtn(list[x],'createLi',(x+1));
								container_ul.appendChild(ad);
							}
						}
					}
					if(container.children.length){
						el.appendChild(container);
						item[0].params.location=='extendibleBtn' ? ads.extendibleBtn(data,'addEvents',container_ul) : null;
						if(item[0].type == "exnamed"){
							container.parentNode.parentNode.style.position = 'relative';
						}
					}
				}catch(e){}
			}
		}
	}
	ads.showAScreen = function() {
		if(ads.dataRest) {
			var adsData = ads.dataRest;
			ads.dataRest={};
			//ads.ret = {};
			for(var name in adsData) {
				var data = ads.Data[name];
				if(name != "t00"){
					var selector = '#' + name;
					var el = document.getElementById(name)
					if(ads.inViewPort(selector, ads.threshold)) {
						ads.loopAds(el, data)
					} else {
						ads.dataRest[name] = data;
					}
					
				} else {
					for (var i = 0; i < data.length; i++){
						var item = data[i];
						if(ads.hasOwnProperty(item.type)){
							if(item.type == "window"){
								item.params.name = "PopWin_"+i;
							}
						   ads[item.type](item);						
						}
//						else{
//						   console.log(item.type+"\u5e7f\u544a\u7c7b\u578b\u4e0d\u5b58\u5728");
//						}
					}
				}
			}
		}
	}
	ads.newAds = function(type, data, el, action, style) {
		if(ads[type]) {
			if(ads[type].dependence) {
				ads._getDependence(type, function() {
					var ad = ads.newAds(type, data, el, action, style);
				});
			} else if(ads[type].required && ads[type].required.length) {
				ads.getRequired(type, function() {
					var ad = ads.newAds(type, data, el, action, style);
				});
			} else {
				// ads is surly loaded. the que is clean!
				var ad = new ads[type](data, el, action, style);
			}

		} else {
			if(!ads.que[type]) {
				// ads not loaded. load it
				ads.que[type] = [];
				ads.getAds(type);
			}
			// now ads is still loading, store its callbacks in que!
			ads.que[type].push(function() {
				var ad = ads.newAds(type, data, el, action, style);
			});
		}
	};
	ads._getDependence = function(type, fn) {
		var typeDepend = ads[type].dependence, //parentClass
		extObj = ads[type].extObj;
		if(ads[typeDepend] && ads[typeDepend].extend) {
			// won't happen
			var requried = ads[type].extObj.required;
			ads[type] = ads[typeDepend].extend(ads[type].extObj);
			if(requried)
				ads[type].required = requried;
			fn();
		} else {
			if(!ads.que[typeDepend]) {
				// parent ads is not loaded. load it
				ads.que[typeDepend] = [];
				ads.getAds(typeDepend);
			}
			// now ads is still loading, store its callbacks in que!
			ads.que[typeDepend].push(function() {
				// parent loaded, load child
				if(ads[type].dependence) {
					var requried = ads[type].extObj.required;
					ads[type] = ads[typeDepend].extend(ads[type].extObj);
					if(requried)
						ads[type].required = requried;
				}
				fn();
			});
		}
	};
	ads.getRequired = function(type, fn) {
		var required = ads[type].required.shift();
		if(!ads[required] || !ads[required].extend) {// required not loaded?
			if(!ads.que[required]) {
				ads.que[required] = [];
				ads.getAds(required);
			}
			ads.que[required].push(function() {
				fn();
			});
		} else {
			fn();
		}
	}
	ads.getAds = function(type) {
		var uri = (ads.config.host || '') + (ads.config.path || '') + type.replace(/./g, function(a) {
			return a.toLowerCase()
		}) + ".js";
		ads.ajax({
			url : uri
		}, function() {
			ads.exeQue(type)
		});
	}
	ads.exeQue = function(type) {
		if(ads[type]) {
			ads.que[type] = ads.que[type] || [];
			var typeDepend = ads[type].dependence;
			if(typeDepend) {
				// parent needed!
				ads._getDependence(type, function() {
					ads.exeQue(type);
				});
			} else if(ads[type].required && ads[type].required.length) {
				// requirement needed!!!
				var required = ads[type].required.shift();
				if(!ads[required] || !ads[required].extend) {// required not loaded?
					if(!ads.que[required]) {
						ads.que[required] = [];
						ads.getAds(required);
					}
					ads.que[required].push(function() {
						ads.exeQue(type);
					});
				} else {
					ads.exeQue(type);
				}
			} else {
				var x;
				while( x = ads.que[type].shift()) {
					x();
				}
			}
		};
	}
	ads.ajax = function(s, callback) {
		var script, head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
		script = document.createElement("script");
		script.async = "async";
		if(s.scriptCharset) {
			script.charset = s.scriptCharset;
		}
		script.src = s.url;

		// Attach handlers for all browsers
		script.onload = script.onreadystatechange = function(_, isAbort) {
			if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
				// Handle memory leak in IE
				script.onload = script.onreadystatechange = null;
				// Remove the script
				if(head && script.parentNode) {
					head.removeChild(script);
				}
				// Dereference the script
				script = undefined;
				// Callback if not abort
				if(!isAbort) {
					callback(200, "success");
				}
			}
		};
		// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
		// This arises when a base node is used (#2709 and #4378).
		head.insertBefore(script, head.firstChild);

		/*
		 abort: function () {
		 if (script) {
		 script.onload(0, 1);
		 }
		 }*/

	};
})();
(function() {
	ads.text = function(data){
		var text = new ads.Text(data.params)
		return text.el;
		/*var grid = document.getElementById(data.grid);
		grid.appendChild(text.el)*/
	}
	ads.Text = Class.extend({
		init : function(data) {
			var snippet = '<a href="{{=it.link}}" target="_blank" style="color:{{=it.color}}">{{=it.text}}<a>';
			var doUCompiled = doU.template(snippet);
			var div = document.createElement('div');
			div.innerHTML = doUCompiled(data);
			this.el = div.firstChild;
		}
	});
})();
(function() {
	ads.multitext = function(data){
		var multitext = new ads.multiText(data);
		return multitext.el;	
	}
	ads.multiText = Class.extend({
		init : function(data) {
			this.el = ads.createElement('div',null,{
				border:data.border || '1px solid #CCCCCC',
				clear:'both',
				textAlign:'center',
				overflow:'hidden',
				width:data.width+'px' || '950px',	
				height:data.height+'px' || '50px'	
			});
			var warp = document.createElement('ul');
	        ads.setStyle(warp,{margin:data.margin});
	        this.el.appendChild(warp);
			for(var i = 0 ;i < data.params.length;i++){
				if(data.params[i].text){
					var li = ads.createElement('li', null, {
							width : data.textwidth+'px' || '160px',
							lineHeight:data.lineHeight+'px' || '25px',
							margin:data.textmargin || '0px 40px',
							"float":"left",
							"fontSize":"12px"
					}, null);
					var a = ads.createElement('a', {
						href : data.params[i].link,
						target : '_blank'
					}, {
						color : data.params[i].color
					}, li);
					a.innerHTML = data.params[i].text;
					warp.appendChild(li);
				}
			}
			
		}
	});
})();
/**
 * @author ningxiao
 */
(function(){
	ads.multirow = function(data){
		var multirow = new ads.multiRow(data);
		return multirow.el;	
	}
	ads.multiRow = function(data){
		this.el = document.createElement("div");
		var bannerobj = null,data = data.params,index = data.list.length-1;
		this.el.style.cssText = "width:"+data.width+"px;height:"+data.height+"px;overflow:hidden;"
		for(var i in data.list){
			if(data.list[i].src){
				data.list[i].height = data.height;
				bannerobj = new ads.Banner(data.list[i]).el;
				ads.setStyle(bannerobj,{'float':'left','marginRight': data.marginRight+"px"});
				this.el.appendChild(bannerobj);
				index = bannerobj;
			}
		}
		ads.setStyle(index,{'marginRight':"0px"});
	};	
})();
/**
 * @author nttdocomo
 */
(function() {
	ads.banner = function(data){
		var text = new ads.Banner(data.params);
		return text.el;
		/*var grid = document.getElementById(data.grid);
		grid.appendChild(text.el);*/
	}
	ads.Banner = Class.extend({
		init : function(data) {
			var isSwf = (/\.swf$/i).test(data.src);
			this.el = document.createElement('div');
			this.el.className="leju-ads";
			
			ads.setStyle(this.el,{width:data.width ? data.width+"px" : 0,height:data.height ? data.height+"px":0})
			if(isSwf){
				if(!data.flashvars){
    				data.flashvars ={"adlink":data.link || ""};
				} else {
					if(!data.flashvars.adlink){
						data.flashvars["adlink"]=data.link || "";
					}
				}
				this.swf(data);
			} else {
				this.image(data);
			}
		},
		swf:function(data){
			var swfUrl = data.src, id = data.id || "", width = data.width || "100%", height = data.height || "100%", version = data.version || "7", flashvars = data.flashvars || "", params = data.params || {wmode:'transparent'}, attributes = data.attributes || "", bgcolor = data.bgcolor || "", quality = data.quality || "high", useExpressInstall = data.useExpressInstall || false
			var swf = new sinaFlash(swfUrl, id, width, height, version, useExpressInstall, bgcolor, quality);
			if (flashvars) {
                for (var i in flashvars) {
                    if ("adlink" == i) {
                        swf.addVariable(i, escape(flashvars[i]));
                    }
                    else {
                        swf.addVariable(i, flashvars[i]);
                    }
                }
            }
            if (params) {
                for (var i in params) {
                    swf.addParam(i, params[i]);
                }
            }
			swf.__forSetAttribute("id",data.id)
            swf.__forSetAttribute("width","100%")
            swf.__forSetAttribute("height","100%");
            this.el.className += " banner-" + width;
			this.el.innerHTML = swf.getFlashHtml();
		},
		image:function(data){
			var width = data.width ? data.width+"px" : "100%",
				height = data.height ? data.height+"px" : "100%",
				src = data.src ||"" ,
				link = data.link ||"";
			this.el.className += " banner-" + data.width;
			this.el.innerHTML = '<a href="'+link+'" style="border:none;" target="_blank"><img alt="" style="border:none;width:'+width+';height:'+height+';" width="'+data.width+'" heigth="'+data.height+'"  src="'+src+'" /></a>';
		}
	});
})();
/**
 * @author nttdocomo
 */
(function() {
	ads.exbanner = function(data){
		var exbanner = new ads.exBanner(data.params);
		return exbanner.el;
	}
	ads.exBanner = Class.extend({
		init:function(data){
			this.data = data;
			this.create();
		},
		create : function() {
			var self = this;
			var data = self.data;
			self.before = new ads.Banner({
				src : data[0].src,
				width : data[0].width,
				params:{wmode:'opaque'},
				height : data[0].height
			});
			ads.setStyle(self.before.el,{width:data[0].width+"px"});
			var isSwf = (/\.swf$/i).test(data[1].src);
			if(isSwf){
				self.after = new ads.Banner({
					src : data[1].src,
					width : data[1].width,
					height : data[1].height,
					params:{wmode:'opaque'},
					flashvars:{
						"adlink":data[1].link
					}
				});
			}else{
				self.after = new ads.Banner({
					src : data[1].src,
					width : data[1].width,
					height : data[1].height,
					link:data[1].link
				});
			}
			addEvent(self.after.el, 'mouseleave', function() {
				ads.setStyle(self.before.el, {
					visibility : 'visible',
					height : data[0].height + 'px'
				});
				ads.setStyle(this, {
					visibility : 'hidden'
				})
			})
			addEvent(self.before.el, 'mouseenter', function() {
				ads.setStyle(self.after.el, {
					visibility : 'visible'
				});
				ads.setStyle(this, {
					visibility : 'hidden',
					height : data[1].height + 'px'
				})
			})
			ads.setStyle(self.after.el,{visibility:"hidden",zIndex:"999",position:"absolute",top:"0px"})
			var div = document.createElement('div');
			div.appendChild(self.before.el);
			div.appendChild(self.after.el);
			this.el = div;
			ads.setStyle(this.el,{position:"relative"})
		}
	})
})();
/**
 * @author nttdocomo
 */
(function() {
	ads.fp = function(data) {
		/*var div = ads.createElement('div', {
			className : "fp"
		}, null, document.body)*/
		var fp = new ads.Fp(data.params);
		return fp.el
	}
	ads.Fp = (function() {
		ads.init();
		var isSupportCss3 = supports('borderRadius') && supports('boxShadow');
		return Class.extend({
			init : function(data) {
				this.version = "7";
				this.slideIndex = 0;
				this.effect = ['easeOutBack', 'easeOutQuint', 'easeOutBounce'];
				this.data = data;
				this.create();
			},
			create : function() {
				var self = this;
				var len = this.data.length;

				if(!isSupportCss3) {

					var pics = [], urls = [], widths = [], heights = [];

					var flaArrSrc = {
							"w160h70" : "http://static.jiaju.com/jiaju/com/ad/js/swf/fp160x70.swf",
							"w160h90" : "http://i0.sinaimg.cn/hs/zjwei/base/swf/picshow_160x90.swf",
							"w250h70" : "http://static.jiaju.com/jiaju/com/ad/js/swf/fp250x70.swf"
						};
						
					for(var i = 0; i < len; i++) {
						if(this.data[i]) {
							pics.push(this.data[i].src);
							urls.push(escape(this.data[i].link));
							widths.push(this.data[i].width);
							heights.push(this.data[i].height);
						}
					}
					
					var flaObj = function(){
						var flaSrc = '', 
						    flaWidth = widths[0], 
						    flaHeight = heights[0];

						if( (widths[0] == 160) && (heights[0] == 90)) {
							flaSrc = flaArrSrc['w160h90'];
							flaWidth = '165';
							flaHeight = '95';
						} else if( (widths[0] == 160) && (heights[0] == 70) ) {
							flaSrc = flaArrSrc['w160h70'];
							flaWidth = '164';
							flaHeight = '74';
						} else if( (widths[0] == 250) && (heights[0] == 70) ) {
							flaSrc = flaArrSrc['w250h70'];
							flaWidth = '250';
							flaHeight = '70';
						}
						return {
							'src' : flaSrc,
							'w' : flaWidth,
							'h' : flaHeight
						}
					}();
					
					var settings = {
						src : flaObj['src'],
						width : flaObj['w'],
						height : flaObj['h'],
						flashvars : {
							ad_num : len == 1 ? 2 : len,
							pic_width : widths[0],
							pic_height : heights[0],
							flip_time : "300",
							pause_time : "4000",
							wait_time : "1000",
							pics : pics.join("§"),
							urls : urls.join("§"),
							def_pic : this.data[len - 1].src,
							def_link : escape(this.data[len - 1].link)
						},
						params : {
							menu : "false",
							wmode : "transparent"
						}
					}

					self.data = settings;


					var fp = new ads.Banner(self.data);
					ads.setStyle(fp.el, {
						width : flaObj['w']+'px',
						height : flaObj['h']+'px',
						"float" : 'left',
						overflow : 'hidden'
					});
					this.el = fp.el;
					return;
				} else {

					this.el = ads.createElement('div', {className:"fp"}, {
						width : this.data[0].width+'px',
						height : this.data[0].height+'px',
						position : 'relative',
						"float" : 'left',
						overflow : 'hidden'
					}, this.el);
					var container = this.container = ads.createElement('ul', null, {
						position : 'absolute',
						padding : '0px',
						margin : '0px'
					}, this.el);
					var fragment = document.createDocumentFragment();
					this.liArray = [];
					for(var i = 0; i < len; i++) {
						if(this.data[i]) {
							var li = ads.createElement('li', null, {
								display : 'block'
							}, null);
							var a = ads.createElement('a', {
								href : this.data[i].link,
								target : '_blank'
							}, {
								backgroundImage : 'url(' + this.data[i].src + ')',
								width : this.data[i].width+'px',
								height : this.data[i].height+'px',
								display : 'block'
							}, li);
							this.liArray.push(li);
						}
					}
					this.container.appendChild(this.liArray[this.slideIndex]);
					var btnStyle = {
						borderWidth : '5px',
						borderStyle : 'solid',
						position : 'absolute',
						bottom : '3px',
						height : '0',
						cursor : 'pointer',
						display : 'none'
					};
					var upSlide = this.upSlide = ads.createElement('div', null, ads.extend(btnStyle, {
						borderColor : 'transparent #fff transparent transparent',
						right : '13px'
					}), this.el);
					var downSlide = this.downSlide = ads.createElement('div', null, ads.extend(btnStyle, {
						borderColor : 'transparent transparent transparent #fff',
						right : '0'
					}), this.el);
					addEvent(this.el, 'mouseenter', function() {
						ads.setStyle(self.upSlide, {
							display : 'block'
						});
						ads.setStyle(self.downSlide, {
							display : 'block'
						});
					});
					addEvent(this.el, 'mouseleave', function() {
						ads.setStyle(self.upSlide, {
							display : 'none'
						});
						ads.setStyle(self.downSlide, {
							display : 'none'
						});
					});
					addEvent(upSlide, 'click', function() {
						self.slide(-1);
					});
					addEvent(downSlide, 'click', function() {
						self.slide(1);
					});

					addEvent(upSlide, 'mouseenter', function() {
						ads.setStyle(this, {
							borderColor : 'transparent #000 transparent transparent'
						});
					});
					addEvent(upSlide, 'mouseleave', function() {
						ads.setStyle(this, {
							borderColor : 'transparent #fff transparent transparent'
						});
					});

					
					addEvent(downSlide, 'mouseenter', function() {
						ads.setStyle(this, {
							borderColor : 'transparent transparent transparent #000'
						});
					});
					addEvent(downSlide, 'mouseleave', function() {
						ads.setStyle(this, {
							borderColor : 'transparent transparent transparent #fff'
						});
					});
					container.appendChild(fragment);
					this.startSlide();
				}
			},
			slide : function(direction) {
				if(!this.animateLock) {
					clearInterval(this.timerId);
					this.animateLock = true;
					var self = this;
					var index = this.slideIndex = this.slideIndex + direction;
					if(index < 0) {
						this.slideIndex = index = this.liArray.length - 1;
					}
					if(index == this.liArray.length) {
						this.slideIndex = index = 0;
					}
					var cloneNode = this.liArray[this.slideIndex].cloneNode(true);
					this.container.appendChild(cloneNode);

					ads.animate(this.container, {
						top : -(this.data[0].height) + 'px'
					}, {
						duration : 700,
						easing : this.effect[Math.floor(Math.random() * this.effect.length)],
						complete : function() {
							this.removeChild(this.firstChild);
							ads.setStyle(this, {
								top : '0px'
							});
							self.animateLock = false;
							self.startSlide();
						}
					});
				}
			},
			startSlide : function() {
				var self = this;
				this.timerId = setInterval(function() {
					self.slide(1);
				}, 4000);
			}
		});
	})();
})();
(function() {
	ads.lunbobanner = function(data) {
		var lunbobanner = new ads.Rotator(data.params);
		if(lunbobanner.el) {
			return lunbobanner.el;
		}
		/*var grid = document.getElementById(data.grid);
		 grid.appendChild(lunbobanner.el)*/
	};
	ads.Rotator = Class.extend({
		init : function(data) {
			this.updateData(data);
		},
		create : function() {
			this.data = {
				src : this.data.src,
				width : this.data.width,
				height : this.data.height,
				flashvars : {
					adlink : this.data.link
				},
				link:this.data.link
			}
			var rotator = new ads.Banner(this.data)
			this.el = rotator.el;
			this.el.className += " lunbo-"+this.data.width;
		},
		updateData : function(data) {
			this.config(data);
			this.data = data;
			var url = document.location.href;
			var cookiename = 'SinaRot' + escape(url.substr(url.indexOf('/', 7), 2) + url.substring(url.lastIndexOf('/')));
			if(!this.data.length)
				return;
			if( typeof (ads.globalRotatorId) == 'undefined' || ads.globalRotatorId == null) {
				var times = ads.getCookie(cookiename);
				this.times = times === null ? Math.floor(Math.random() * this.data.length) : ++times;
				ads.globalRotatorId = this.times;
			}
			this.index = ads.getIndex(ads.globalRotatorId, cookiename, this.data.length);
			this.data = this.data[this.index];
			if(this.data) {
				this.create();
			}
		},
		config : function(data) {
			if(data.setting) {
				var setting = data.setting;
				this.width = parseInt(setting.width);
				this.height = parseInt(setting.height);
				this.wraperStyle = setting;
				this.settings = {
					width : this.width,
					height : this.height
				}
			}
		}
	})
})();
/**
 * @author nttdocomo
 */
(function() {
	ads.lunxianbanner = function(data) {
		var marqueen = new ads.Marqueen(data.params);
		return marqueen.el;
	}
	ads.Marqueen = Class.extend({
		init : function(data) {
			this.index=0;
			this.data = data;
			this.el = document.createElement('div');
			this.updateIndex();
			return this.el;
		},
		create : function() {
			var self = this;
			var temp = {
				src : this.data[this.index].src,
				width : this.data[this.index].width,
				height : this.data[this.index].height,
				flashvars : {
					adlink : this.data[this.index].link
				}
			};
			//return new ads.Banner(temp);
			if(this.data.length - 1) {
				setTimeout(function() {
					self.updateIndex();
				}, 3000);
			}
			this.el.innerHTML = "";
			this.el.appendChild((new ads.Banner(temp)).el);
			return
		},
		updateIndex : function() {
			var url = document.location.href;
			var cookiename = 'SinaMar' + escape(url.substr(url.indexOf('/', 7), 2) + url.substring(url.lastIndexOf('/')));
			if( typeof (ads.globalMarqueenId) == 'undefined' || ads.globalMarqueenId == null) {
				var times = ads.getCookie(cookiename);
				this.times = (times === null || times == 'undefined') ? Math.floor(Math.random() * this.data.length) : ++times;
				ads.globalMarqueenId = this.times;
			} else {
				this.times++;
			}
			this.index = this.data.length==1?0:ads.getIndex(this.times, cookiename, this.data.length);
			this.create();
		}
	});
})();
/**
 * @author nttdocomo
 */
ads.tearpage = function(data){
	var tearpage = new ads.Tearpage(data);
};
ads.Tearpage = Class.extend({
    init: function(data){
    	var self = this;
        this.data = data.params;
        this.el = (new ads.Banner(this.data)).el;
        ads.setStyle(this.el,{position:"absolute",right:"0px",top:"0px",zIndex:this.data.zIndex});
        if(this.data.delay){
        	setTimeout(function(){
        		document.body.appendChild(self.el)
        	},this.data.delay || 1000)
        }
    }
});
/**
 * @author nttdocomo
 */
(function() {
	ads.onetwo = function(data) {
		var onetwo = new ads.OneTwo(data.params)
		return onetwo.el;
		/*var grid = document.getElementById(data.grid);
		grid.appendChild(onetwo.el)*/
	};
	ads.OneTwo = Class.extend({
		init : function(data) {
			this.data = data
			this.create();
		},
		create : function(data) {
			this.el = ads.createElement('div', {
				id : "pdps" + (new Date).getTime()
			}, {
				width : '950px',
				height : '96px',
				margin : '0 auto',
				overflow : 'hidden'
			});
			var styles = {
				'width' : '585px',
				'height' : '90px',
				'float' : 'left',
				'margin' : '4px 14px'
			}
			this.fp_l = new ads.Fp(this.data[0], this.el);
			var rotator;
			if(this.data[1].length) {
				rotator = new ads.Rotator(this.data[1], this.el);
			} else {
				rotator = new ads.Banner(this.data[1], this.el);
			}
			ads.setStyle(rotator.el,styles);
			this.el.appendChild(rotator.el);
			this.fp_r = new ads.Fp(this.data[2], this.el);
		}
	})
})();
/**
 * @author ningxiao
 */
(function() {
	var minWidth, expandWidth,mainWidth,data,mainDiv,leftDl,rightDl,mainId="main-"+(new Date).getTime(),
			leftDlId = "left-"+(new Date).getTime(),
			rightDlId = "right-"+(new Date).getTime(),
			top;
	var createElement = function (data){
		var mainData = {
			"id" : mainId,
			"src" : "http://www.sinaimg.cn/hs/lingyun/adsswf/Main_B.swf",
			"link" : data.link[0],
			"width" : data.width[2],
			"height" : data.height,
			"flashvars" : {
				showArray : data.src[2],
				adlink : data.link[0],
				playeTime:"10"
			},
			"params":{wmode:'transparent',allowscriptaccess:'always'}
		}
		var leftData = {
			"id" : leftDlId,
			"src" : "http://www.sinaimg.cn/hs/lingyun/adsswf/LeftButton_B.swf",
			"link" : data.link[0],
			"width" : data.width[0],
			"height" : data.height,
			"flashvars" : {
				showArray : [data.src[0], data.src[1]].join(','),
				adlink : data.link[0]
			},
			"params":{wmode:'transparent',allowscriptaccess:'always'}
		}
		var rightData = {
			"id" : rightDlId,
			"src" : "http://www.sinaimg.cn/hs/lingyun/adsswf/RightButton_B.swf",
			"link" : data.link[1],
			"width" : data.width[0],
			"height" : data.height,
			"flashvars" : {
				showArray : [data.src[0], data.src[1]].join(','),
				adlink : data.link[1]
			},
			"params":{wmode:'transparent',allowscriptaccess:'always'}
		}
		mainDiv = (new ads.Banner(mainData)).el;
		mainDiv.id = "mainDiv";
		leftDl = (new ads.Banner(leftData)).el;
		leftDl.id = "leftDiv";
		rightDl = (new ads.Banner(rightData)).el;
		rightDl.id = "rightDiv";
		ads.setStyle(mainDiv, {
			position : "absolute",
			top : top + "px",
			left : (document.documentElement.clientWidth-data.width[2])/2 +"px",
			zIndex:data.zIndex,
			display:"none"
		});
		ads.setStyle(leftDl, {
			position : "absolute",
			top : top + "px",
			zIndex:data.zIndex,
			left : (document.documentElement.clientWidth-data.width[2])/2 - data.width[1] +"px"
		});
		ads.setStyle(rightDl, {
			position : "absolute",
			top : top + "px",
			zIndex:data.zIndex,
			right : (document.documentElement.clientWidth-data.width[2])/2 - data.width[1] +"px"
		});
		document.body.appendChild(mainDiv);
		document.body.appendChild(leftDl);
		document.body.appendChild(rightDl);
	}
	ads.door = function(data) {
		data = data.params;
		top = data.top;
		minWidth = data.width[0] + "px";
		expandWidth = data.width[1] + "px",
		mainWidth = data.width[2] + "px",
		createElement(data)
	}
	var alreadyShow = '';
	//排列顺序左 中 右
	var isPlay = false;
	//是否第一次加载
	var SdivW;
	//竖放广告宽
	var SswfUrl;
	//播放广告位置
	var SdivWa;
	//竖放广告最大宽
	var SdivH;
	//竖放广告高
	var HdivW;
	//横放广告宽
	var HdivH;
	//横放广告高

	/** 横幅广告播放完成执行删除,并且将开关设为true*/
	ads.deleteMain = function() {
		ads.animate(mainDiv,{
			"width" : '0px'
		},{
			duration : 1000,
			easing : 'easeOutQuint',
			complete : function() {
				ads.setStyle(this,{"display":"none"})
			}
		})
		isPlay = true;
	}
	/** 滑入右边的swf触发播放横幅广告*/
	ads.slideAdvertising = function(isheng, uiButton) {
		if(isheng && alreadyShow == '') {
			alreadyShow = uiButton;
			ads.setStyle(mainDiv,{"display":"block","width":"0px"});
			ads.animate(mainDiv,{
				"width" : mainWidth
			},{
				duration : 1000,
				easing : 'easeOutQuint'
			})			
			if(uiButton == 'left') {
				setSwfMaix(isheng, 'leftDiv', expandWidth);
			} else {
				setSwfMaix(isheng, 'rightDiv', expandWidth);
			}
		}
		if(!isheng && alreadyShow != '') {
			alreadyShow = '';
			if(uiButton === 'left') {
				setSwfMaix(isheng, 'leftDiv', minWidth);
			} else {
				setSwfMaix(isheng, 'rightDiv', minWidth);
			}
		}
	}
	/**公用的复位修改js实现*/
	function setSwfMaix(isheng, objectID, width) {
		var swfObject = ads.getSwfObject(objectID == 'leftDiv' ? 'rightDiv' : 'leftDiv');
		if(isheng) {
			swfObject.onMouseMove()
		} else {
			swfObject.onMouseLeave()
		}
		var leftDiv = document.getElementById('leftDiv');
		var rightDiv = document.getElementById('rightDiv');
		leftDiv.style.width = width;
		rightDiv.style.width = width;
	}

})();
/**
 * @author nttdocomo
 */
(function() {
	var leftMiniDl, rightMiniDl, top = '10px', banner;
	var dls = [leftMiniDl, rightMiniDl];
	function creaCloseBtn(el) {
		var closeBtn = ads.createElement('div', {
			"className" : 'close_btn'
		}, null, el)
	}

	function createElement(data, align, delay) {
		var el = new ads.Banner(data).el;
		el.style.position = 'absolute';
		el.style[align] = '0px';
		el.style.top = top;
		el.id = align + "_miniDl";
		addEvent(el, 'mouseenter', function() {
			banner.style.display = 'block';
		})
		addEvent(el, 'mouseleave', function() {
			banner.style.display = 'none';
		})
		setTimeout(function(){
           document.body.appendChild(el);			
		},delay)
		creaCloseBtn(el);
		return el;
	}

	function createBanner(data,zindex) {
		var el = new ads.Banner(data).el;
		ads.setStyle(el, {
			position : 'absolute',
			top : '10px',
			left : (document.body.clientWidth - 950) / 2 + 'px',
			display : 'none',
			zIndex : zindex
		});
		el.id = "centerkl";
		banner = el;
        document.body.appendChild(el);			
	}


	ads.miniDl = function(data) {
		var align = ['left', 'right'];
		var src = data.params.src;
		var delay = data.params.delay || 1000;
		var zindex = data.params.zIndex || 1000;
		for(var i = 0, len = src.length; i < len - 1; i++) {
			dls[i] = createElement({
				src : src[i],
				width : '25',
				height : '300',
				flashvars : {
					link : data.params.link
				}
			}, align[i], delay)
		}
		addEvent(document, 'click', function(e) {
			var target = ads.getEventTarget(e);
			if(target.className === 'close_btn' && /miniDl/.test(target.parentNode.id)) {
				for(var i = 0, len = dls.length; i < len; i++) {
					dls[i].parentNode.removeChild(dls[i])
				}
				if(document.getElementById("centerkl").style.display != "none" ){
					document.getElementById("centerkl").parentNode.removeChild(document.getElementById("centerkl"));
				}
			}
		})
		createBanner({
			src : src[2],
			width : '950',
			height : '70',
			flashvars : {
				link : data.params.link
			}
		},zindex);
	}
})();
/**
 * @author nttdocomo
 * modi by lvbing for jiaju background
 */
(function() {
	var bgAd = '',top = "31px";
	try{
		var next = document.getElementById("topnav").nextSibling;
		while(next.nodeType!=1){
			next = next.nextSibling;
		}
		var divNew = document.createElement('div');
		divNew.id = "backgroundAd";
		document.body.insertBefore(divNew, next);
		bgAd = document.getElementById("backgroundAd");
	}catch(e){
		bgAd = document.body;
		top = "0px";
	}
	ads.bg = function(data) {
		var data = data.params;
		ads.setStyle(document.body, {
			background : 'url(' + data.src + ') no-repeat scroll center '+top+' #fff'
		});
		var el = ads.createElement('a', {
			href : data.link,
			target : '_blank'
		}, {
			display : 'block',
			width : 950+"px",
			height:data.height+"px",
			margin:'0 auto',
			textIndent:'-99999px'
		},bgAd,'prepend');
		el.innerHTML = data.text
		if(data.closebtn){
			var closeBtn = ads.createElement('div',"", {
				backgroundColor : "black",
    			color : "white",
    			position : "absolute",
    			right : 0,
    			top : top,
    			lineHeight : "18px",
    			cursor : "pointer"
			},bgAd,'prepend');
			closeBtn.innerHTML = "关闭背景";
			addEvent(closeBtn, 'click', function(){
				el.parentNode.removeChild(el);
				document.body.style.background = "none";
				closeBtn.parentNode.removeChild(closeBtn);
	        });
		}
	}
})();/**
 * @author river
 */
(function() {
	ads.video = function(data){
		var newvideo = new ads.newVideo(data.params);
		return newvideo.outwraper;
	}
	ads.newvideo = function(data){
		var newvideo = new ads.newVideo(data.params);
		return newvideo.outwraper;
	}
	ads.newVideo = Class.extend({
		init:function(data){
			this.data = data;
			var self = this;
			var data = self.data;
			var delaytime = /^\d+$/.test(data.delay) ? data.delay : 13000;
			setTimeout(function(){
				self.create();
			},delaytime)			
		},
		create : function() {
			var self = this,hidevideos;
			var data = self.data;
			var showtime = data.time || 10000;
			var delaytime = /^\d+$/.test(data.delay) ? data.delay : 13000;
			//创建最外围层设定over
			self.outwraper = ads.createElement('div',null, {
				height: '306px',
				position: ads.ie6?'absolute':'fixed',
				width: '22px',
				right:'0',
				overflow: 'hidden',
				zIndex:'3',
				top:ads.ie6?(document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - 336 + "px":document.documentElement.clientHeight - 336 + "px"
			},document.body,null);

			//大框架
			self.wraper = ads.createElement('div',null, {
				background: '#eee',
				height: '306px',
				position: 'relative',
				width: '306',
				left:'22px'
			},self.outwraper,null);
			//边角
			self.outer = ads.createElement('div',null, {
				background: 'url("http://www.sinaimg.cn/hs/lingyun/adsswf/video_sidebar.png") no-repeat scroll 0 0',
				bottom: '5px',
				height: '166px',
				left: '-22px',
				position: 'absolute',
				width: '22px',
				zIndex:'1010',
				cursor:'pointer'
			},self.wraper,null);
			//视频box
			self.inter_box = ads.createElement('div',null,{
				height: '306px',
				overflow:'hidden',
				width: '314px'
			},self.wraper,null);
			//视频
			//var id = 'player'+(new Date).getTime();
			var datechar = (new Date).getTime();
			var id = 'player'+datechar;
			var objid = 'video'+datechar;
			var objname = 'videoname'+datechar;
			self.outwraper.id=id;
			var videoparam = {
				id : objid,
			    name : objname,
				src : "http://static.jiaju.com/jiaju/com/ad/js/swf/SinaPlayer.swf",
				width : 314,
				height : 306,
				params:{wmode:'transparent',allowscriptaccess:'always'},
				flashvars : {
					flv : data.flv,
					imageurl:data.imageurl || "http://www.sinaimg.cn/hs/lingyun/adsswf/videoImage.jpg",
					onload : "ads.onVideoLoaded",
					onclose : "ads.onNewVideoClosed",
					oncomplete :"ads.onNewVideoComplete",
					onpause :"ads.onNewVideoPause",
					link : escape(data.link),
					containerID:id
				}
			}
			//插入事件
			//激活
			addEvent(self.outer, 'mouseover', function(ev) {
				var e=ev || event;
				openbox();
				if(document.all){
					e.cancelBubble=true;
				}else{
					e.stopPropagation();
				}
			});
			//addEvent(self.outer, 'mouseout', function(ev) {
			//	var e=ev || event;
			//	console.log('e:',e);
			//	ads.onNewVideoClosed(id);
			//	if(document.all){
			//		e.cancelBubble=true;
			//	}else{
			//		e.stopPropagation();
			//	}
			//});
			//清除限时隐藏
			//限时隐藏
			addEvent(self.wraper, 'mouseout', function() {
				if(ads.onNewVideoPause.pause==1){
					hidevideos = setTimeout(function(){
						ads.onNewVideoClosed(id);
					})
				};
			});
			addEvent(self.wraper, 'mouseover', function() {
				clearTimeout(hidevideos);
			});
			//重置或者滚动
			if(ads.ie6){
				addEvent(window, 'scroll',function() {
					getposition()
				});
				addEvent(window, 'resize', function() {
					getposition()
				});
			}
			//打开的按钮
			var openbox = function(){ 
				ads.animate(self.outwraper, {
						 width: "337px"
				}, {
						duration : 500,
						easing : "easeOutCirc"
				});
			}
			// 关闭的函数
			//var closebox = function(){
			//	console.log(document[objname]);
			//	var play = document[objname][0];
			//	//alert(document.getElementById(objid));
			//	play.player(false);
			//	ads.animate(self.outwraper, {
			//			width: "22px"
			//		}, {
			//			duration : 500,
			//			easing : "easeOutCirc"
			//	})
			//}
			//获取位置
			var getposition = function(){ 
				ads.animate(self.outwraper, {
						top:(document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - 336 + "px"
				}, {
						duration : 500,
						easing : "easeOutCirc"
				})
			}
			
			//开始执行初始化
			//延迟
//			showvideos = setTimeout(function(){
			self.inter_ad = new ads.Banner(videoparam);
			self.inter_box.appendChild(self.inter_ad.el);
		  	ads.animate(self.outwraper, {
					 width: "337px"
			}, {
					duration : 500,
					easing : "easeOutCirc"
			});
//			},delaytime)
			//hidevideos = setTimeout(function(){
				//closebox();
			//},parseInt(showtime)+parseInt(delaytime));
		}
	})
	
})();
/**
 * @author nttdocomo
 */
ads.Base = Class.extend({
    init: function(data, el, action, style){
        this.type = data.type;
        var position;
        if (data.pdps) {
            this.pdps = data.positionMark ? data.positionMark : data.pdps.replace(/;|,|\|/g, '');
            position = this.position = ads.position[this.pdps];
        }
        if (position && position.selector) {
            var element = Sizzle(position.selector);
            this.el = element.length ? element[0] : (el || document.body);
            this.action = position.action || null;
            this.exStyle = style || position.style || {};
            this.updateData(data);
        }
        else {
            this.el = el || document.body;
            this.action = action || null;
            this.exStyle = style || {};
            this.updateData(data);
        }
    },
    updateData: function(data){
        this.data = data;
        if (this.data) 
            this.create();
    },
    create: function(){
        var url = (/\.swf$/i).test(this.data.swfUrl);
        this.id = this.id ? this.id : "pdps" + (++ads.id);
        this.wraper = this.wraper ? this.wraper : ads.createElement('div', {
            id: this.id,
            className: 'leju-ads'
        }, ads.extend(this.wraperStyle || {}, this.exStyle), this.el, this.action);
        if (url && ads.flashChecker.f) {
            this.swf();
        }
        else {
            if (this.type == 'video') 
                return;
            if (!ads.flashChecker.f) {
                this.data.swfUrl = 'http://d1.leju.com/ia/1103/30/053801_9223.jpg';//TODO use config file
            }
            this.image();
        }
        this.dom = this.wraper.firstChild;
    },
    closeAll: function(){
        this.wraper.style.display = "none";
    },
    swf: function(){
        var data = this.data;
        if (data.swfUrl) {
            var swfUrl = data.swfUrl, id = data.id || this.id, width = data.width || "", height = data.height || "", version = data.version || "7", flashvars = data.flashvars || "", params = data.params || "", attributes = data.attributes || "", bgcolor = data.bgcolor || "", quality = data.quality || "high", useExpressInstall = data.useExpressInstall || false;
            var swf = new sinaFlash(swfUrl, id, width, height, version, useExpressInstall, bgcolor, quality);
            if (flashvars) {
                for (var i in flashvars) {
                    if ("adlink" == i) {
                        swf.addVariable(i, escape(flashvars[i]));
                    }
                    else {
                        swf.addVariable(i, flashvars[i]);
                    }
                }
            }
            if (params) {
                for (var i in params) {
                    swf.addParam(i, params[i]);
                }
            }
            swf.write(this.id);
            this.swfObj = swf;
        }
    },
    image: function(){
        var data = this.data;
        if (data.swfUrl) {
            var swfUrl = data.swfUrl, width = data.width || "", height = data.height || "", adlink = data.flashvars ? (data.flashvars.adlink || "http://www.baidu.com/") : "http://www.baidu.com/";//TODO use config file
            this.wraper.innerHTML = '<a target="_blank" href="' + adlink + '"><img src="' + swfUrl + '" height="' + height + '" width="' + width + '"></a>';
        }
    },
    createClossBtn: function(position, inWraper){
        var psStyle = {
            top: '-17px',
            left: '0px'
        };
        var self = this;
        switch (position) {
            case 'rt':
                psStyle = {
                    top: '0',
                    right: '0'
                }
        };
        this.closeBtn = ads.createElement('div', null, ads.extend({
            background: 'url("http://src.house.sina.com.cn/imp/imp/deal/82/5a/9/58c0acc6e64ca01aaa50d5b95eb_p1_mk1.png") no-repeat scroll 0 -22px transparent',
            height: '19px',
            width: '57px',
            position: 'absolute',
            cursor: 'pointer'
        }, psStyle), this.wraper);
        addEvent(this.closeBtn, 'click', function(){
            self.closeAll();
        })
    }
});
/**
 * @author nttdocomo
 */
(function() {
	ads.fullscreen = function(data) {
		var fullscreen = new ads.Fullscreen(data.params);
		return fullscreen.wraper;
	}
	ads.Fullscreen = ads.Base.extend({
		create : function() {
			var self = this;

			self.wraper = ads.createElement('div', null, {
				width : '950px',
				margin : '0 auto',
				height : '0px',
				display : 'none',
				position : 'relative'
			}, self.el, self.action);
			self.iframe = ads.createElement('iframe', {
				id : 'interstitialframe',
				width : this.data.width || 950,
				height : this.data.height || 450,
				scrolling : 'no',
				frameBorder : '0',
				marginheight : '0',
				marginwidth : '0',
				topmargin : '0',
				leftmargin : '0',
				src : "http://d1.sina.com.cn/d1images/fullscreen/fullscreenv4.html?"+this.data.link+"${}"+this.data.src
			}, null, self.wraper);

			if(self.iframe.attachEvent) {
				self.iframe.attachEvent("onload", function() {

					self.delayId = setTimeout(function() {
						self.show();
					}, self.data.delay || 1000);

				});
			} else {
				self.iframe.onload = function() {
					if(self.data.delay) {
						self.delayId = setTimeout(function() {
							self.show();
						}, self.data.delay || 1000);
					} else {
						self.show();
					}
				};
			}
		},
		createCloseBtn : function() {
			var self = this;
			if(self.data.closebtn) {
				self.closeBtn = ads.createElement('div', null, {
					background : 'url("http://src.house.sina.com.cn/imp/imp/deal/82/5a/9/58c0acc6e64ca01aaa50d5b95eb_p1_mk1.png") no-repeat scroll 0px 0px transparent',
					height : '20px',
					width : '57px',
					position : 'absolute',
					cursor : 'pointer'
				}, self.wraper); ads.setStyle(self.closeBtn, {
					top : '0px',
					right : '0px'
				}), addEvent(self.closeBtn, 'click', function() {
					self.closeAll();
				})
			}
		},
		createReplayBtn : function() {

			var self = this;
			if(self.data.replay) {
				this.wraper = this.wraper ? this.wraper : document.body;
				this.replayBtn = ads.createElement('div', null, {
					background : 'url("http://src.house.sina.com.cn/imp/imp/deal/82/5a/9/58c0acc6e64ca01aaa50d5b95eb_p1_mk1.png") no-repeat scroll -28px -46px transparent',
					height : '57px',
					width : '20px',
					position : 'absolute',
					cursor : 'pointer'
				}, document.body); ads.setStyle(this.replayBtn, {
					top : this.wraper.offsetTop + 'px',
					left : (document.body.clientWidth - 950) / 2 + 950 + 'px'
				}), addEvent(this.replayBtn, 'click', function() {
					self.show();
				}),addEvent(window,'resize',function(){
		        	ads.setStyle(self.replayBtn, {
						left : (document.body.clientWidth - 950) / 2 + 950 + 'px'
					});
		        });
			}
		},
		closeAll : function() {
			var self = this;

			if(self.replayBtn) {
				ads.setStyle(self.replayBtn, {
					display : 'block'
				});
			} else {
				self.createReplayBtn();
			}
			ads.setStyle(self.wraper, {
				display : 'none',
				height : '0px'
			});
		},
		show : function() {
			var self = this;
			if(self.replayBtn) {
				ads.setStyle(self.replayBtn, {
					display : 'none'
				});
			}
			ads.setStyle(self.wraper, {
				display : 'block',
				height : (self.data.height || 450) + 'px'
			});
			if(this.closeBtn) {
				ads.setStyle(self.closeBtn, {
					display : 'block'
				});
			} else {
				self.createCloseBtn();
			}
			self.timerId = setTimeout(function() {
				self.closeAll();
			}, self.data.playtime || 8000);
		}
	})
})();
/**
 * @author nttdocomo
 */
(function() {
	ads.window = function(data) {
		return new ads.Window(data.params)
	}
	ads.Window = Class.extend({
		init : function(data) {
			this.data = data;
			var self = this;
			this.order = parseInt(this.data.name.split("_")[1]);
			this.left = 300*this.order+20;
			this.param = "width=300,height=250,top=100,left="+this.left;
			this.srcType = /.(\w+)$/.exec(this.data.src)[1];
			this.link = "http://jiaju.sina.com.cn/d1images/pu/pu1.html?"+this.data.link+";"+this.srcType+";"+this.data.src;
			setTimeout(function(){self.create()},15000);
		},
		create : function() {
			var self = this;
			open(self.link, (window.name != self.data.name) ? self.data.name : "", self.param);
			/*window.onload = function(){
				console.log('onload')
			}
			addEvent(window, 'load', function() {
				console.log('ok')
				open(self.data.link, (window.name != self.data.name) ? self.data.name : "", self.param);
			});*/
		}
	})
})();
/**
 * @author Linlin
 */ 
(function() {
	ads.bottombanner = function(data) {
			var bottomBanner = new ads.BottomBanner(data.params);
	}
	ads.closeBtn = Class.extend({
		createCloseBtn:function(){
			var psStyle = {
	            top: '5px',
	            left: '0px'
	        };
	        var self = this;
	        switch (this.data.type) {
	            case 'rt':
	                psStyle = {
	                    top: '0',
	                    right: '0'
	                }
	        };
	        this.closeBtn = ads.createElement('div', null, ads.extend({
	            background: 'url("http://img.house.sina.com.cn/a/png/close.png") no-repeat scroll transparent',
	            height: '15px',
	            width: '15px',
	            position: 'absolute',
	            cursor: 'pointer'
	        }, psStyle), this.el);
	        addEvent(this.closeBtn, 'click', function(){
	            self.remove();
	        })
		},
		remove:function(){
			this.el.parentNode.removeChild(this.el)
		}
	})
	ads.BottomBanner = ads.closeBtn.extend({
		init: function(data){
			this.data = data;
			this.el = (new ads.Banner(this.data)).el;
	   	  	var style = {position:"absolute",zIndex:parseInt(this.data.zIndex)+10};
	        if(this.data.left){
	        	style.left=this.data.left+"px"
	        }else if(this.data.right){
	        	style.right=this.data.right+"px"
	        }else{
	        	//style.left = (document.body.clientWidth - 950) / 2 + 'px'
	        	style.left = '50%';
	        	style.marginLeft='-475px';
	        }
	        ads.setStyle(this.el,style);
	       	if(this.data.closebtn){
	        	this.createCloseBtn()
	        }
	        var self = this;
	        setTimeout(function(){
	        	document.body.appendChild(self.el);
	        	self.scroll();
	        },self.data.delay||8000);
		},
		scroll : function() {
			ads.setStyle(this.el, {
				top : (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - this.el.clientHeight - this.data.bottom + "px"
			});

			var self = this;
			addEvent(window, 'scroll', ads.throttle(function() {
				ads.animate(self.el, {
					top : (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - self.el.clientHeight - self.data.bottom + "px"
				}, {
					duration : 500,
					easing : "easeOutCirc"
				})
			}, 200));
			addEvent(window, 'resize', ads.throttle(function() {
				ads.animate(self.el, {
					top : (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - self.el.clientHeight - self.data.bottom + "px"
				}, {
					duration : 500,
					easing : "easeOutCirc"
				})
			}, 200));
			/*addEvent(self.closeBtn, 'click', function() {
				self.closeAll();
			});*/
		}
		
	})
})();

/**
 * @author nttdocomo
 * data processing
 */
(function() {
	ads.Data = {};
	var allTypes = {};
	var positionRex = /(t\d{1,2}\-\d{1,2})\-(\d{1})/i;
	var req = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
	ads.reformLunxunbanner = function() {
		ads.lunxunbannerData  = randomOrder(ads.lunxunbannerDataBeforeSort);//随机排列data数据
	}
	function initLunxunBanner(data){//拼装lunxunbanner
		ads.hasLunxunbanner = true;
		ads.lunxunbannerDataBeforeSort = ads.lunxunbannerDataBeforeSort || [];
		data.type = data.params.type='banner';
		ads.lunxunbannerDataBeforeSort.push(data);
	}
	function initDataRow(item){
		var params = [];
		params[item.order - 1] = item.params;
		item.params = params;
	}
	function pushDataIntoRow(item){
		ads.Data[item.grid][item.col - 1][item.row - 1].params[item.order - 1] = item.params;
	}
	//随机改变数组的排序
	function randomOrder (targetArray)
	{
		var arrayLength = targetArray.length
		//先创建一个正常顺序的数组
		var tempArray1 = new Array();
	
		for (var i = 0; i < arrayLength; i ++)
		{
			tempArray1 [i] = i
		}
		//再根据上一个数组创建一个随机乱序的数组
		var tempArray2 = new Array();
	
		for (var i = 0; i < arrayLength; i ++)
		{
			//从正常顺序数组中随机抽出元素
			tempArray2 [i] = tempArray1.splice (Math.floor (Math.random () * tempArray1.length) , 1)
		}
		//
		//最后创建一个临时数组存储 根据上一个乱序的数组从targetArray中取得数据
		var tempArray3 = new Array();
	
		for (var i = 0; i < arrayLength; i ++)
		{
			tempArray3 [i] = targetArray [tempArray2 [i]]
		}
		//
		//返回最后得出的数组
		return tempArray3
	}
	//json数组排序 从小到大
	function jsonOrder(array,key){  //array - json数组 key - 按照json.key的顺序排序
		var temp;
		for (var i = 1; i < array.length; i++) {
			for (var j = array.length - 1; j >= i; j--) {
				if (array[j][key] < array[j-1][key]) {//如果当前元素值比前一个元素小，就更换两个元素的位置，否则继续循环
					temp = array[j - 1];//把前一个元素值存到临时变量中
					array[j - 1] = array[j];//把当前元素值赋给前一个元素，实现连个元素位置的互调，大的在后面，小的在前面
					array[j] = temp
				}
			}
		}
		return array;
	}
	function MergerItem(itemArray,location){
		var list=[];
		var itemafter={},
			orderPosition,
			needOrder=false;
		itemafter.pdps = itemArray[0].pdps;
		itemafter.position = itemArray[0].position;
		itemafter.params = {};
		itemafter.params.location = location;
		if(location!="extendibleBtn"){
			for(var i = 0; i < itemArray.length; i++){	
				var listi={};
				listi.width = itemArray[i].params.list_width;
				listi.src = itemArray[i].params.list_src;
				listi.esrc = itemArray[i].params.list_esrc;
				listi.text = itemArray[i].params.text;
				listi.link = itemArray[i].params.list_link;
				if(/\-/g.test(itemArray[i].position) && itemArray[i].position.split('-').length>2){
					needOrder=true;
					orderPosition=itemArray[i].position.split('-');
					orderPosition=orderPosition[2];
					listi.orderPosition = orderPosition;
				}
				listi.position = itemArray[i].position;
				list.push(listi);
			}
			itemafter.type = "closet";
			itemafter.params.height = itemArray[0].params.height;
			itemafter.params.width = itemArray[0].params.width;
			itemafter.params.spacing = itemArray[0].params.spacing;
			itemafter.params.cheight = itemArray[0].params.cheight;
			itemafter.params.cwidth = itemArray[0].params.cwidth;
			itemafter.params.delay = itemArray[0].params.delay;
			itemafter.params.padding = itemArray[0].params.padding;
			itemafter.params.background = itemArray[0].params.background;
		}else{
			for(var i = 0; i < itemArray.length; i++){
				var listi={};
				listi.size1 = itemArray[i].params.size[0];
				listi.size2 = itemArray[i].params.size[1];
				listi.src1 = itemArray[i].params.src[0];
				listi.src2 = itemArray[i].params.src[1];
				listi.text = itemArray[i].params.text;
				listi.link = itemArray[i].params.link;
				if(/\-/g.test(itemArray[i].position) && itemArray[i].position.split('-').length>2){
					needOrder=true;
					orderPosition=itemArray[i].position.split('-');
					orderPosition=orderPosition[2];
					listi.orderPosition = orderPosition;
				}
				list.push(listi);
			}
			itemafter.type = "extendibleBtn";
		}
		itemafter.params.list = needOrder ? jsonOrder(list,'orderPosition') : list;
		return itemafter
	}
	function formatbottomdata(data){//获取品牌视窗（下）数据创建bottomDataBeforeSort数组
		ads.hasbottom = true;
		ads.bottomDataBeforeSort = ads.bottomDataBeforeSort || [];
		ads.bottomDataBeforeSort.push(data);
	}
	function formattopdata(data){//获取品牌视窗（下）数据创建topDataBeforeSort数组
		ads.hastop = true;
		ads.topDataBeforeSort = ads.topDataBeforeSort || [];
		ads.topDataBeforeSort.push(data);
	}
	function formatoverlaydata(data){//获取品牌视窗数据创建overlayDataBeforeSort数组
		ads.hasoverlay = true;
		ads.overlaySign = false;
		if (!ads.overlayPosition){
			ads.overlayPosition = [];
			ads.overlayPosition[0] = data.position.split("-")[0];
			ads.overlayDataBeforeSort = [];
			ads.overlayDataBeforeSort[0] = [];
			ads.overlayDataBeforeSort[0].push(data);
		}
		else{
			for(var i = 0;i<ads.overlayPosition.length;i++){
				if(data.position.split("-")[0] == ads.overlayPosition[i]){
					ads.overlayDataBeforeSort[i].push(data);
					ads.overlaySign = true;
				}
			}
			if(!ads.overlaySign){
				ads.overlayPosition.push(data.position.split("-")[0]);
				var olPosition = ads.overlayPosition.length-1;
				ads.overlayDataBeforeSort[olPosition] = ads.overlayDataBeforeSort[olPosition] ||[];
				ads.overlayDataBeforeSort[olPosition].push(data);
			}
		}
		// ads.overlayDataBeforeSort = ads.overlayDataBeforeSort || [];
		// ads.overlayDataBeforeSort.push(data);
	}
	function formatextendibleBtndata(data){//扩展按钮
		ads.hasextendibleBtn = true;
		ads.extendibleBtnDataBeforeSort = ads.extendibleBtnDataBeforeSort || [];
		ads.extendibleBtnDataBeforeSort.push(data);
	}
	function MatchHouseinfo(id){
		if(ads.config.houseId){
			for(var i = 0; i < id.length; i++) {
				if(id[i]==ads.config.houseId){
					return true;
				}
			}
		}
		return false;
	}
	/**
     * 格式化数据入口
     * @param {Array} response 广告数据数组
     */
	ads.formatData = function(response) {/**/
		for(var i = 0; i < response.length; i++) {
			var item = response[i]/**广告的相关信息对象*/
			var hid = item.params.hid;
			if(hid){//匹配楼盘信息
				if(!MatchHouseinfo(hid)){
					continue;
				};
			}
			var type = item.type = item.params.type || item.params[0].type || '';/*为每个广告数据添加type属性*/
			if(type=='lunxunbanner'){
				ads.config.lunxunList = ads.config.lunxunList||[];
				item.position = item.position.toLowerCase().replace(/\-null/i,'');
				ads.config.lunxunList.push(item.position.split('-')[0]);
				item.position="";
			}
			//如果是B开头的，后面加-1-1
			var re = /^[BD]\d{2}$/;
			if (item.position && re.test(item.position))
			{
				
				item.position += '-1-1'; 
				
			}


			if(type=='ppsc_bottom'){//如果类型是品牌视窗(下)，做提取处理
				formatbottomdata(item)
			}else if(type=='ppsc_overlay'){//如果类型是黄金条，做提取处理
				formatoverlaydata(item)
			}else if(type=='ppsc_top'){//如果类型是品牌视窗(上)，做提取处理
				formattopdata(item)
			}else if(type=='extendibleBtn'){//扩展按钮
				formatextendibleBtndata(item);
			}else{
				if(item.position){/**去的广告页面位置position:"t01-1-2"*/
						item.position = item.position.toLowerCase().replace(/\-null/i,'')/*将position末尾出现的null删除*/
						var posArray = item.position.split('-')/*按照'-'将position字段拆分为数组*/
						item.grid = posArray[0];/*为每个广告数据添加grid属性，其值为position字段拆分后数组的第一个元素*/
						item.col = posArray[1];/*为每个广告数据添加col属性，其值为position字段拆分后数组的第二个元素*/
						item.row = posArray[2] || 1;/*为每个广告数据添加row属性，其值为position字段拆分后数组的第三个元素，如果该元素不存在，则默认为1*/
					  item.order = posArray[3] || 1;/*为每个广告数据添加order属性，其值为position字段拆分后数组最后一个元素，如果该元素不存在，则默认为1*/
				}
				delete item.params.type;
				if (item.grid && item.grid != "t00" && item.grid != "fd"){/**to是浮动窗口*/
					ads.Data[item.grid] = ads.Data[item.grid] || [];/**检测data是否有对象*/
					ads.Data[item.grid][item.col - 1] = ads.Data[item.grid][item.col-1] || [];
					if(ads.Data[item.grid][item.col - 1][item.row - 1]){
						switch(ads.Data[item.grid][item.col - 1][item.row - 1].type){
							case "fp":
								pushDataIntoRow(item);
								break;
							case "lunbobanner":
								pushDataIntoRow(item);
								break;
							case "lunxianbanner":
								pushDataIntoRow(item);
								break;
							case "lunxunbanner":
								initLunxunBanner(item,i);
								break;
							default:
								ads.Data[item.grid][item.col - 1][item.row - 1] = item
						}
					} else {
						ads.Data[item.grid][item.col - 1][item.row - 1] = item
						switch(item.type){
							case "fp":
								initDataRow(item)
								break;
							case "lunbobanner":
								initDataRow(item)
								break;
							case "lunxianbanner":
								initDataRow(item)
								break;
							default:
								ads.Data[item.grid][item.col - 1][item.row - 1] = item
						}
					}
				} else {
					if(type=='lunxunbanner'){
						initLunxunBanner(item);
					}else{
						/*如果不是占位广告，则直接将数据push如最终的广告数据数组里*/
						ads.Data["t00"] = ads.Data["t00"] || [];
						ads.Data["t00"].push(item);
					}
				}	
			}
			
		}
		if(ads.hasLunxunbanner && ads.config.lunxunList && ads.config.lunxunList.length>0){
			ads.reformLunxunbanner();//重新排列data数据
			for(var i = 0; i < ads.lunxunbannerData.length; i++) {
				ads.Data[ads.config.lunxunList[i]]=ads.Data[ads.config.lunxunList[i]]?ads.Data[ads.config.lunxunList[i]]:[];
				var temarr = [];
				temarr.push(ads.lunxunbannerData[i]);
				ads.Data[ads.config.lunxunList[i]].push(temarr);
			}//将data拼入ads.Data
		}
		if(ads.hasbottom){
			var itemok = MergerItem(ads.bottomDataBeforeSort,'bottom');
			var posArray = itemok.position.split('-')/*按照'-'将position字段拆分为数组*/
			var position = posArray[0];
			ads.Data[position]=ads.Data[position]?ads.Data[position]:[];
			var temarr = [];
			temarr.push(itemok);
			ads.Data[position].push(temarr);
		}
		if(ads.hastop){
			var itemok = MergerItem(ads.topDataBeforeSort,'top');
			var posArray = itemok.position.split('-')/*按照'-'将position字段拆分为数组*/
			var position = posArray[0];
			ads.Data[position]=ads.Data[position]?ads.Data[position]:[];
			var temarr = [];
			temarr.push(itemok);
			ads.Data[position].push(temarr);
		}
		if(ads.hasoverlay){
			for (var overlaylist = 0; overlaylist < ads.overlayDataBeforeSort.length; overlaylist++) {
				var itemok = MergerItem(ads.overlayDataBeforeSort[overlaylist],'overlay');
				var posArray = itemok.position.split('-')/*按照'-'将position字段拆分为数组*/
				var position = posArray[0].toLowerCase();
				ads.Data[position]=ads.Data[position]?ads.Data[position]:[];
				var temarr = [];
				temarr.push(itemok);
				ads.Data[position][posArray[1]-1] = temarr;
			 };
		}
		if(ads.hasextendibleBtn){
			var itemok = MergerItem(ads.extendibleBtnDataBeforeSort,'extendibleBtn');
			var posArray = itemok.position.split('-')/*按照'-'将position字段拆分为数组*/
			var position = posArray[0].toLowerCase();
			ads.Data[position]=ads.Data[position]?ads.Data[position]:[];
			var temarr = [];
			temarr.push(itemok);
			ads.Data[position][posArray[1]-1] = temarr;
		}
		ads.showAds(ads.Data)/*开始渲染广告*/
	}
	ads.processReqChange = function(response) {
		/***console.log(response)*/
		ads.formatData(response.data);
	}
	/**
	 * ajax请求数据成功的回调数据处理函数<br/>
	 */
	ads.xmlLoaded = function(){
		/***请求的状态有5个值：0=未初始化；1=正在加载；2=已经加载；3=交互中；4=完成；  */
		if(req.readyState == 4) {
			/**200对应OK，如404=未找到网页  */
			if(req.status == 200) {
				/**加上圆括号的目的是迫使eval函数在处理转化为对象 里面的data属性值。 返回json对象*/
				var response = eval('(' + req.responseText + ')').data;
				//document.getElementById('json').value = req.responseText;
				ads.formatData(response);
			} else {
				alert('There was a problem retrieving the XML data:\n' + req.statusText);
			}
		}
	}
	/**
	 * 传入url加载josn
	 **/
	ads.loadXMLDoc = function(url) {
		req.onreadystatechange = ads.xmlLoaded;
		req.open('GET', url, true);
		req.send();
	}
})();
/**
 * @author Chris
 */
(function() {
	ads.exfullscreen = function(data) {
		var exfullscreen = new ads.ExFullscreen(data.params);
		return exfullscreen.el;
	}
	ads.ExFullscreen = ads.Base.extend({
		init: function(data){
			this.data = data;
			this.create();
		},
		create : function() {
			var self = this;
			this.el = document.createElement('div');
			this.wrap = [];
			this.fsobj = [];
			this.fsa = [];
			this.wrap[0] = ads.createElement('div',{id : 'exfssmall'},{
				width : this.data[0].width + 'px',
				height : this.data[0].height + 'px',
				margin : '0 auto',
				overflow : 'hidden',
				clear : 'both'
			},this.el,self.action);//action如果改成'before',ie67就出不来
			this.wrap[1] = ads.createElement('div',{id : 'exfsbig'},{
				width : this.data[1].width + 'px',
				height : '0px',
				margin : '0 auto',
				overflow : 'hidden',
				clear : 'both',
				position: 'relative',
				display : 'none'
			},this.el,self.action);//action如果改成'before',ie67就出不来
			for(var i=0,len=this.data.length; i<len; i++){
				if(this.data[i].src.lastIndexOf('.swf') != -1){
					
					this.fsobj[i] = new ads.Banner(this.data[i]).el;
					this.wrap[i].appendChild(this.fsobj[i]);
				}
				else{				
					//先创建一个a，插入到div
					this.fsa[i] = ads.createElement('a',{
						href : this.data[i].link,
						target : '_blank'
					}, null, this.wrap[i], null);
					//再创建一个img，追加到a里
					this.fsobj[i] = ads.createElement('img',{src : this.data[i].src},{
						width : this.data[i].width,
						height : this.data[i].height,
						border : 'none'
					},this.fsa[i],null );
				}
			}
			this.show();
		},
		small2big: function(callback){
			var self = this;
			if(self.replayBtn){
				ads.setStyle(self.replayBtn, {
					display: 'none'
				});
			}
			ads.animate(self.wrap[0], {
				height : "0px"
			},{
				duration: 1200,
				easing: "easeOutCirc"
			});
			setTimeout(function(){
				self.wrap[1].style.display = 'block';
				ads.animate(self.wrap[1], {
					height : self.data[1].height + 'px'
				},{
					duration: 2000,
					easing: "easeOutCirc"
				});
				if(this.closeBtn){
					ads.setStyle(self.closeBtn, {
						display: 'block'
					});
				}else{
					self.createCloseBtn();
				}				
				if(callback){
					self.callbackTimer = setTimeout(function(){callback()},8000);
				}
			},1200);				
		},
		big2small: function(){
			var self = this;
			if(self.callbackTimer){
				clearTimeout(self.callbackTimer);
			}
			if(self.closeBtn){
				ads.setStyle(self.closeBtn, {
					display: 'none'
				});
			}
			ads.animate(self.wrap[1], {
				height : '0px'
			},{
				duration: 1800,
				easing: "easeOutCirc"
			});
			setTimeout(function(){
				ads.animate(self.wrap[0], {
					height : self.data[0].height
				},{
					duration: 800,
					easing: "easeOutCirc"
				});
				if(self.replayBtn){
					ads.setStyle(self.replayBtn, {
						display: 'block'
					});
				}else{
					self.createReplayBtn();
				}				
			},1800)			
		},
		createCloseBtn: function(){
			var self = this;
			self.closeBtn = ads.createElement('div', null, {
				background : 'url("http://src.house.sina.com.cn/imp/imp/deal/82/5a/9/58c0acc6e64ca01aaa50d5b95eb_p1_mk1.png") no-repeat scroll 0px 0px transparent',
				height : '20px',
				width : '57px',
				position : 'absolute',
				cursor : 'pointer'
			}, self.wrap[1]); ads.setStyle(self.closeBtn, {
				top : '0px',
				right : '0px'
			}), addEvent(self.closeBtn, 'click', function() {
				self.big2small();
			})
		},
		createReplayBtn: function(){
			var self = this;
			this.wraper = this.wrap[0] ? this.wrap[0] : document.body;
			this.replayBtn = ads.createElement('div', null, {
				background : 'url("http://src.house.sina.com.cn/imp/imp/deal/82/5a/9/58c0acc6e64ca01aaa50d5b95eb_p1_mk1.png") no-repeat scroll -28px -46px transparent',
				height : '57px',
				width : '20px',
				position : 'absolute',
				cursor : 'pointer'
			}, document.body); ads.setStyle(this.replayBtn, {
				top : this.wraper.offsetTop + 'px',
				left : (document.body.clientWidth - 950) / 2 + 950 + 'px'
			}), addEvent(this.replayBtn, 'click', function() {
				self.small2big(function(){self.big2small()});
			}),addEvent(window,'resize',function(){
	        	ads.setStyle(self.replayBtn, {
					left : (document.body.clientWidth - 950) / 2 + 950 + 'px'
				});
	        });			
		},
		show : function() {
			var self = this;
			setTimeout(function(){
				self.small2big(function(){self.big2small()});	
			},2500)
		}
	})
})();
(function() {
	ads.keyword = function(data) {
		var key = new ads.Key(data);
	}
	ads.Key = function(data){
			var keyobj = data.params;
			var inputList = ads.getElementsByAttribute('input[adsdefault]');
			if(keyobj.text){
				for(var i=0,ci;ci = inputList[i++];){
	                ci.value = keyobj.text;
	            }
            }
	}
})();
(function() {
	ads.floatads = function(data) {
		var floatads = new ads.Floatads(data.params);
	}
	ads.sdlCreate = Class.extend({
		init:function(src,attributes,link,ds,delay,zindex,eventType){
			var self = this;
			this.dl = [];
			this.dataStyle = [];
			for (var i = 0; i<2;i++){
				this.dataStyle[i] = this.settingWHT(attributes[i],ds[i]);
				var dataAttrs = {
					src:src[i],
					width:/^\d+/.exec(this.dataStyle[i].width),
					height:/^\d+/.exec(this.dataStyle[i].height)
				}
				link?dataAttrs.link = link:"";
				this.dataStyle[i].position = "fixed";
				this.dl[i] = new ads.Banner(dataAttrs).el;
			}
			this.top = /^\d+/.exec(this.dataStyle[0].top);
			this.dl[1].style.display = "none";
			this.el = document.createElement('div');

			ads.setStyle(this.el,this.dataStyle[0]);
			this.el.style.zIndex = zindex||'9999';
			this.el.appendChild(this.dl[0]);
			this.el.appendChild(this.dl[1]);
			setTimeout(function(){
	           document.body.appendChild(self.el);			
			},delay||8000);
			if(eventType != 'click'){
				if(src[1]) {
					addEvent(this.dl[0],'mouseenter',function(){
						self.el.style.width = self.dataStyle[1].width;
						self.dl[0].style.display = "none";
						self.dl[1].style.display = "block";
					});
					addEvent(this.dl[1],'mouseleave',function(){
						self.el.style.width = self.dataStyle[0].width;
						self.dl[0].style.display = "block";
						self.dl[1].style.display = "none";
					});
				}
			}
		},
		settingWHT:function(a,d){
			var k = 0,wht={};
			for (i in a){
				if(/^\d+$/.test(a[i]) || a[i] == ""){
					if(/^\d+$/.test(a[i])){wht[i] = a[i]+"px"}
					else{
						wht[i] = d[k]?d[k]+"px":d[k];
					}
				}else {wht[i] = a[i]}
				k++;
			}
			return wht;
		},
		creaCloseBtn:function() {
			this.closeBtn = ads.createElement('div', {
				"className" : 'close_btn'
			}, null, this.el);
			ads.setStyle(this.closeBtn, {
				background: 'url("http://src.house.sina.com.cn/imp/imp/deal/82/5a/9/58c0acc6e64ca01aaa50d5b95eb_p1_mk1.png") no-repeat scroll -27px -112px transparent',
	            height: '15px',
	            width: '15px',
	            position: 'absolute',
	            cursor: 'pointer'
	        });
			this.closeBtn.style.top = this.dataStyle[0].height;
			this.dataStyle[0].left?this.closeBtn.style.left = 0:this.closeBtn.style.right = 0;
		},
		pcreateCloseBtn:function(){
			var psStyle = {
	            top: '0px',
	            left: '0px'
	        };
	        var self = this;
	        this.closeBtn = ads.createElement('div', null, ads.extend({
	            background: 'url("http://img.house.sina.com.cn/a/png/close.png") no-repeat scroll 0 0 transparent',
	            height: '16px',
	            width: '16px',
	            position: 'absolute',
	            cursor: 'pointer'
	        }, psStyle), this.el);
	        addEvent(this.closeBtn, 'click', function(){
	            self.closeAll(self.el);
	        })
		},
		closeAll: function(el){
			el.parentNode.removeChild(el);
		},
		scroll:function(){
			ads.animate(this.el, {
				top: (document.documentElement.scrollTop || document.body.scrollTop) + parseInt(this.top) + "px"
			},{
				duration: 500,
				easing: "easeOutCirc"
			});
		},
		pscroll : function() {
			ads.setStyle(this.el, {
				top : (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - (/^\d+/.exec(this.dataStyle[0].height)) - (/^\d+/.exec(this.dataStyle[1].bottom)) + "px"
			});
			var self = this;
			addEvent(window, 'scroll', ads.throttle(function() {
				ads.animate(self.el, {
					top : (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - self.el.clientHeight - (/^\d+/.exec(self.dataStyle[1].bottom)) + "px"
				}, {
					duration : 500,
					easing : "easeOutCirc"
				})
			}, 200));
			addEvent(window, 'resize', ads.throttle(function() {
				ads.animate(self.el, {
					top : (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - self.el.clientHeight - (/^\d+/.exec(self.dataStyle[1].bottom)) + "px"
				}, {
					duration : 500,
					easing : "easeOutCirc"
				})
			}, 200));
		}
	});
	ads.Floatads = Class.extend({
		init: function(data){
			this.data = data;
			this.create();
		},
		create: function(){
			var self = this;
			var srcLength = this.data.src.length;
			var defStyle = [["25","300","60","0","",""],["100","300","60","0","",""]];/*width,height,top,left,right,bottom*/
			if(srcLength == 1){
				if(this.data.eventType == "click"){
					defStyle = [["200","200"],["20","200","0","150"]];
				    var leftlength,idTime;
					this.leftdl = new ads.sdlCreate(this.data.src[0],this.data.attributes,this.data.link,defStyle,this.data.delay,this.data.zIndex,this.data.eventType);
					var largdiv = this.leftdl.dl[0];
					var smalldiv = this.leftdl.dl[1];
			    	var data = this.data;
					smalldiv.style.overflow="hidden";
					var nowStyle = this.leftdl.dataStyle;
					var media = this.leftdl.el;
					media.isclick = false;
					media.style.position = 'fixed';
					media.style.width = "";
					media.style.height = "";
					media.style.top = getheight(parseInt(nowStyle[0].height));
					media.style.right = (document.body.clientWidth - parseInt(nowStyle[0].width))/2 + 'px';
					media.style.zIndex = '9999';
					media.style.cursor = 'pointer';
					if(ads.ie6){
						media.style.position = 'absolute';
						addEvent(window, 'scroll',ads.throttle(function(){
							divplay();
						}, 200));
					}
					addEvent(window, 'resize', ads.throttle(function(){
						divplay();			
					}, 10));
					if(this.data.closebtn) {
						var closediv = document.createElement('div');
						closediv.style.backgroundImage = 'url(http://src.house.sina.com.cn/imp/imp/deal/82/5a/9/58c0acc6e64ca01aaa50d5b95eb_p1_mk1.png)';
						closediv.style.backgroundPosition = '-0px -65px';
						closediv.style.height = '40px';
						closediv.style.width = '25px';					
						closediv.style.position = 'absolute';
						closediv.style.top = (parseInt(nowStyle[1].height)*1+20)+'px';
						closediv.style.zIndex = '9999';
						closediv.style.display='none';
						media.appendChild(closediv);
						//流媒体小图关闭
						addEvent(closediv, 'click',function(){
							media.parentNode.removeChild(media);
						});					
					}
					var contrdiv = document.createElement('div');
					contrdiv.style.backgroundImage = 'url(http://src.house.sina.com.cn/imp/imp/deal/82/5a/9/58c0acc6e64ca01aaa50d5b95eb_p1_mk1.png)';
					contrdiv.style.backgroundPosition = '0px 0px';
					contrdiv.style.height = '20px';
					contrdiv.style.width = '57px';
					contrdiv.style.top = '0px';					
					contrdiv.style.right = '0px';
					contrdiv.style.position = 'absolute';
					contrdiv.style.zIndex = '9999';
					media.appendChild(contrdiv);
					//流媒体大图关闭
					addEvent(contrdiv, 'click', ads.throttle(function(){
						timefun();
					}, 20));
					idTime = window.setTimeout(timefun,(data.playtime||5)*1000+(data.delay||8000));
					//addEvent(window,'scroll',ads.throttle(function(){
						//self.leftdl.scroll(self.leftdl.el)},300));
				}else{
					if (!(this.data.attributes[0] instanceof Array)){ //飘流瓶
						defStyle = [["150","150","","150","","0"],["300","150","","150","","0"]];
						this.leftdl = new ads.sdlCreate(this.data.src[0],this.data.attributes,this.data.link,defStyle,this.data.delay,this.data.zIndex);
						this.leftdl.el.style.bottom = "";
						this.leftdl.dl[0].style.marginBottom = "0px";
						this.leftdl.dl[1].style.marginBottom = "0px";
						if(this.data.closebtn){
				        	this.leftdl.pcreateCloseBtn()
				        }
						var selfDataStyle = this.leftdl.dataStyle;
						var top = document.documentElement.clientHeight - (/^\d+/.exec(selfDataStyle[0].height)) - 60 + "px";
						ads.setStyle(this.leftdl.el, {
							top : top
						});
						addEvent(window, 'resize', ads.throttle(function(){
							var top = document.documentElement.clientHeight - (/^\d+/.exec(selfDataStyle[0].height)) - 60 + "px";
							ads.setStyle(self.leftdl.el, {
								top : top
							});
						}));

						//ie6 position
						if(ads.ie6){
							self.leftdl.el.style.position = 'absolute';
							addEvent(window, 'scroll', ads.throttle(function(){
								var top = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - (/^\d+/.exec(selfDataStyle[0].height)) - 60 + "px";
								ads.setStyle(self.leftdl.el, {
									top : top
								});	
							}));
						}	        
				        // this.leftdl.pscroll();
					}else{
						//单边
						if((!this.data.attributes[0][0].left) && this.data.attributes[0][0].right){
							defStyle = [["25","300","60","","0",""],["100","300","60","","0",""]];
						}
						this.leftdl = new ads.sdlCreate(this.data.src[0],this.data.attributes[0],this.data.link,defStyle,this.data.delay,this.data.zIndex);
						if(this.data.closebtn) {
							this.leftdl.creaCloseBtn();
							addEvent(this.leftdl.closeBtn,'click',function(){
								self.leftdl.closeAll(self.leftdl.el);
							});
						}
						if(ads.ie6){
							self.leftdl.el.style.position = "absolute";
							addEvent(window,'scroll',ads.throttle(function(){
								self.leftdl.scroll(self.leftdl.el)
							},300));
						}
						
						self.leftdl.el.style.width = self.leftdl.dataStyle[0].width;
						self.leftdl.dl[0].style.display = "none";
						self.leftdl.dl[1].style.display = "block";
						var tt = (this.data.playtime||5)*1000 + (this.data.delay||8000);
						var t = setTimeout(function(){
							self.leftdl.el.style.width = self.leftdl.dataStyle[0].width;
							self.leftdl.dl[0].style.display = "block";
							self.leftdl.dl[1].style.display = "none";
						},tt);
						addEvent(self.leftdl.dl[1],'mouseenter',function(){
							clearTimeout(t);
						});
					}
				}
			}else {
				this.miniDl = [];
				this.miniDl[0] = new ads.sdlCreate(this.data.src[0],this.data.attributes[0],this.data.link,defStyle,this.data.delay,this.data.zIndex);
				
				delete this.data.attributes[0][0].left; 
				delete this.data.attributes[0][1].left;
				defStyle = [["25","300","60","0",""],["100","300","60","0",""]];
				this.miniDl[1] = new ads.sdlCreate(this.data.src[1],this.data.attributes[0],this.data.link,defStyle,this.data.delay,this.data.zIndex);
				
				if(this.data.closebtn){
					this.miniDl[0].creaCloseBtn();
					this.miniDl[1].creaCloseBtn();
					addEvent(this.miniDl[0].closeBtn,'click',function(){
						self.miniDl[0].closeAll(self.miniDl[0].el);
						self.miniDl[1].closeAll(self.miniDl[1].el);
					});
					addEvent(this.miniDl[1].closeBtn,'click',function(){
						self.miniDl[0].closeAll(self.miniDl[0].el);
						self.miniDl[1].closeAll(self.miniDl[1].el);
					});
				}
				
				if(srcLength == 2){//双边
					if(ads.ie6){
						self.miniDl[0].el.style.position = 'absolute';
						self.miniDl[1].el.style.position = 'absolute';
						addEvent(window,'scroll',ads.throttle(function(){
							self.miniDl[0].scroll(self.miniDl[0].el)},300));
						addEvent(window,'scroll',ads.throttle(function(){
							self.miniDl[1].scroll(self.miniDl[1].el)},300));
					}
					var tt = (this.data.playtime||5)*1000 + (this.data.delay||8000);
					var t = [];
					for(var i=0;i<2;i++){
						self.miniDl[i].el.style.width = self.miniDl[i].dataStyle[1].width;
						self.miniDl[i].dl[0].style.display = "none";
						self.miniDl[i].dl[1].style.display = "block";
					}	
					t[0] = setTimeout(function(){
						self.miniDl[0].el.style.width = self.miniDl[0].dataStyle[0].width;
						self.miniDl[0].dl[0].style.display = "block";
						self.miniDl[0].dl[1].style.display = "none";
					},tt);
					addEvent(self.miniDl[0].dl[1],'mouseenter',function(){
						clearTimeout(t[0]);
					});
					t[1] = setTimeout(function(){
						self.miniDl[1].el.style.width = self.miniDl[1].dataStyle[0].width;
						self.miniDl[1].dl[0].style.display = "block";
						self.miniDl[1].dl[1].style.display = "none";
					},tt);
					addEvent(self.miniDl[1].dl[1],'mouseenter',function(){
						clearTimeout(t[1]);
					});
				}
				// if(srcLength == 3){//跨栏
				// 	var banner = new ads.Banner({
				// 		src : this.data.src[2],
				// 		width : this.data.attributes[1].width||'950',
				// 		height : this.data.attributes[1].height||'70',
				// 		flashvars : {
				// 			link : this.data.link
				// 		}
				// 	}).el;
				// 	ads.setStyle(banner, {
				// 		position : 'absolute',
				// 		top : this.data.attributes[1].top?this.data.attributes[1].top+"px":'10px',
				// 		left : (document.body.clientWidth - (/^\d+/.exec(banner.style.width))) / 2 + 'px',
				// 		display : 'none',
				// 		zIndex : this.data.zIndex || "9999"
				// 	});
				// 	banner.id = "centerkl";
			 //        document.body.appendChild(banner);
				// 	this.miniDl[0].el.id = "left_miniDl";
				// 	this.miniDl[1].el.id = "right_miniDl";
				// 	var kualanDural = (this.data.playtime||5)*1000;
				// 	for(var i = 0; i < 2; i++) {
				// 		if(kualanDural > 0) {
				// 			addEvent(this.miniDl[i].el, 'mouseleave', function() {								
				// 				banner.kualanTime = setTimeout(function() {banner.style.display = 'none';}, kualanDural);
				// 			});
				// 		} else {							
				// 			addEvent(this.miniDl[i].el, 'mouseleave', function() {
				// 				banner.kualanTime = setTimeout(function() {banner.style.display = 'none';}, kualanDural);
				// 			});
				// 		}
				// 		addEvent(this.miniDl[i].el, 'mouseenter', function() {
				// 				if(banner.kualanTime) {
				// 					clearTimeout(banner.kualanTime);
				// 				}
				// 				banner.style.display = 'block';
				// 		});
						
				// 		addEvent(this.miniDl[i].closeBtn,'click',function(){
				// 			if(document.getElementById("centerkl").style.display != "none" ){
				// 				document.getElementById("centerkl").parentNode.removeChild(document.getElementById("centerkl"));
				// 			}
				// 		});
				// 	}
				// 	addEvent(window, 'resize', ads.throttle(function() {
				// 		ads.animate(banner, {
				// 			left : (document.body.clientWidth - (/^\d+/.exec(banner.style.width))) / 2 + 'px'
				// 		}, {
				// 			duration : 500,
				// 			easing : "easeOutCirc"
				// 		})
				// 	}, 200));					
				// }
			}
			function getheight(height){
				var toph = media.isclick?(document.documentElement.clientHeight - parseInt(nowStyle[1].bottom) - height - 60):(document.documentElement.clientHeight - height)/2;
				if(!ads.ie6){
					return toph+'px';
				}else{
					return (document.documentElement.scrollTop || document.body.scrollTop) +toph+'px';
				}
			}
			function divplay(){
				leftlength = media.isclick?(nowStyle[1].left||nowStyle[1].right):(document.body.clientWidth - parseInt(nowStyle[0].width))/2+'px';
				toplength = media.isclick?parseInt(nowStyle[1].height):parseInt(nowStyle[0].height);
				if(nowStyle[1].left) {
					media.style.right="";
					ads.animate(media, {left:leftlength,top:getheight(toplength)},{duration: 500,easing: "easeOutCirc"});
				} else {
					ads.animate(media, {right:leftlength,top:getheight(toplength)},{duration: 500,easing: "easeOutCirc"});
				}
			}
			function timefun(){
				media.isclick = !media.isclick;
	            if(media.isclick){
		            window.clearTimeout(idTime);
		            idTime = null;
				    contrdiv.style.backgroundPosition = '0px -46px';
				    contrdiv.style.height = '20px';
				    contrdiv.style.width = '25px';
				    contrdiv.style.top = nowStyle[1].height;
		            largdiv.style.display='none';
		            smalldiv.style.display='block';
					if(data.closebtn) {
						closediv.style.display='block';
					}
	            }else{
				    contrdiv.style.backgroundPosition = '0px 0px';
				    contrdiv.style.height = '20px';
				    contrdiv.style.width = '57px';
				    contrdiv.style.top = '0px';
					contrdiv.style.right = '0px';
	            	largdiv.style.display='block';
		            smalldiv.style.display='none';
					if(data.closebtn) {
						closediv.style.display='none';
					}
	            	idTime = window.setTimeout(timefun,(data.playtime||5)*1000);
	            }
	            divplay();
			}
		}
	})
})();/**
 * @author ???
 */
(function() {
	ads.extendibleBtn = function(data,createType,liEQ){
		var text = new ads.ExtendibleBtn(data,createType,liEQ);
		return text.el;
	},
	ads.ExtendibleBtn = Class.extend({
		init : function(data,createType,liEQ) {
			var that=this;
			return that[createType](data,that,liEQ);
		},
		createStyle:function(data){
			var img2_width=data[0][0]['params']['list'][0]['size2'][0];
			var styleStr=".extendibleBtn{width:950px;overflow:hidden;text-align:left;position:relative;padding-bottom:9px;border-bottom:none;background:#fafafa;}" //background:url(js/ads-new/js/image/extendibleBtn.png) 0 162px repeat-x;
				+".extendibleBtn{width:950px;overflow:hidden;text-align:left;position:relative;background:url(http://static.jiaju.com/jiaju/com/images/ad/extendibleBtn.png) 0 162px repeat-x;padding-bottom:9px;border-bottom:none;}"
				+".extendibleBtn .extendibleBtnBox{background:#fff;position:relative;border:#d9d9d9 1px solid;}"
				+".extendibleBtn .extendibleBtnMain{padding:20px 0;position:relative;margin:0 auto;width:946px;overflow:hidden;background:#fafafa;}"   //background:url(js/ads-new/js/image/extendibleBtn.png) 0 -9px repeat-x;
				+".extendibleBtn ul{list-style:none;width:500%;margin:0;padding:0 0 0 24px;position:relative;}"
				+".extendibleBtn li,.extendibleBtn li a{float:left;display:inline;}"
				+".extendibleBtn li{margin:0 25px 0 0;position:relative;left:0;top:0;z-index:1;background:#fafafa;}"
				+".extendibleBtn li a,.extendibleBtn li a{-webkit-transition:all 0.3s ease;-moz-transition:all 0.3s ease;-ms-transition:all 0.3s ease;-o-transition:all 0.3s ease;transition:all 0.3s ease;margin-right:0;}"
				+".extendibleBtn li a.large{width:0;overflow:hidden;margin-right:0;filter:alpha(opacity=0);opacity:0;-webkit-transition:all 0.6s ease;-moz-transition:all 0.6s ease;-ms-transition:all 0.6s ease;-o-transition:all 0.6s ease;transition:all 0.6s ease;}"
				+".extendibleBtn li a.large img{width:0;}"
				+".extendibleBtn li img{display:block;border:none;}"
				+".extendibleBtn li:hover,.extendibleBtn li.thisOn{margin-right:0;padding-right:35px;}"
				+".extendibleBtn li:hover a,.extendibleBtn li.thisOn a{margin-right:30px;}"
				+".extendibleBtn li.thisOn a.large,.extendibleBtn li:hover a.large{margin-right:0;opacity:1;}"
				+".extendibleBtn li.thisOn a.large img,.extendibleBtn li:hover a.large img{width:100%;}"
				+".extendibleBtn:nth-child(1) li:hover .large{width:"+img2_width+"px;}"
				+".extendibleBtn li{-webkit-transition:all 0.3s ease;-moz-transition:all 0.3s ease;-ms-transition:all 0.3s ease;-o-transition:all 0.3s ease;transition:all 0.3s ease;}"
				+".extendibleBtn li:hover,.extendibleBtn li.thisOn{-webkit-transition:all 0.6s ease;-moz-transition:all 0.6s ease;-ms-transition:all 0.6s ease;-o-transition:all 0.6s ease;transition:all 0.6s ease;opacity:1;}"
				+".extendibleBtn:nth-child(1) .li5:hover,.extendibleBtn:nth-child(1) .li5.thisOn{margin-left:-740px;}"
				+".extendibleBtn:nth-child(1) .li4:hover,.extendibleBtn:nth-child(1) .li4.thisOn{margin-left:-555px;}"
				+".extendibleBtn:nth-child(1) .li3:hover,.extendibleBtn:nth-child(1) .li3.thisOn{margin-left:-370px;}"
				+".extendibleBtn:nth-child(1) .li2:hover,.extendibleBtn:nth-child(1) .li2.thisOn{margin-left:-185px;}"
				+".extendibleBtn li:hover a,.extendibleBtn li.thisOn a{-webkit-transition:width 0.4s ease,opacity 1s ease;-moz-transition:width 0.4s ease,opacity 1s ease;-ms-transition:width 0.4s ease,opacity 1s ease;-o-transition:width 0.4s ease,opacity 1s ease;transition:width 0.4s ease,opacity 1s ease;}"
				+".clearfix:after{visibility:hidden;display:block;font-size:0;clear:both;height:0;content:' '}"
				+".clearfix{zoom:1}";
			if(document.all){
				var $style = document.createStyleSheet();
				document.createStyleSheet();
				$style.cssText = styleStr;
			}else{
				var $style=ads.createElement('style',{'innerHTML':styleStr,"type":"text/css"},null,document.getElementsByTagName('head')[0]);
			}
		},
		createBox:function(data,that,boxID){
			that.createStyle(data);
			that.el = ads.createElement('div',{'className':'leju-ads'});
			var $extendibleBtn=ads.createElement('div',{'id':(boxID ? boxID : '')+'_extendibleBtn','className':'extendibleBtn'},null,that.el),
				$extendibleBtnBox=ads.createElement('div',{'className':'extendibleBtnBox'},null,$extendibleBtn),
				$extendibleBtnMain=ads.createElement('div',{'className':'extendibleBtnMain'},null,$extendibleBtnBox),
				$ul=ads.createElement('ul',{'className':'clearfix'},null,$extendibleBtnMain);
			that.el=that.el;
			return that.el;
		},
		createLi:function(data,that,liEQ){
			var src1=data.src1,
				src2=data.src2,
				size1=data.size1,
				size2=data.size2,
				href=data.link,
				title=data.text ? data.text : '';

			var $li=ads.createElement('li',{'className':'clearfix li'+liEQ,'title':title},null),
				$a1=ads.createElement('a',{'href':href,'target':'_blank'},null,$li),
				$img1=ads.createElement('img',{'src':src1,'width':size1[0],'height':size1[1],'alt':title},null,$a1),
				$a2=ads.createElement('a',{'href':href,'target':'_blank','className':'large'},null,$li),
				$img2=ads.createElement('img',{'src':src2,'height':size2[1],'title':title},null,$a2);
			that.el=$li;
			return that.el;
		},
		myAnimate:function(obj,endStyle,timeLong,callBack){ //简易动画
			var getStyle=function(obj,attribute){ // 返回最终样式函数，兼容IE和DOM，设置参数：元素对象、样式特性
				return obj.currentStyle?obj.currentStyle[attribute]:document.defaultView.getComputedStyle(obj,false)[attribute];
			};
			var self=obj,
				actionTimes=0,
				action=setInterval(function(){
					actionTimes++;
					for(var i in endStyle){
						var unit=(endStyle[i]+'').match(/(px)|(%)|(em)|(deg)/g);
						unit=unit ? unit : '';
						endVal=parseFloat(endStyle[i]);
						var key=i,
							endVal=parseFloat(endStyle[i]);
						var speed=0;
						var nowVal=getStyle(self,key);
						if(key=='width' || key=='hegight'){
							nowVal = parseFloat(nowVal=='auto' ? self.clientHeight : nowVal);
						}else{
							nowVal = parseFloat(nowVal);
						}
						var isAdd=nowVal>endVal ? false : true;
						if(nowVal!=endVal){
							speed=(endVal-nowVal)/(timeLong ? timeLong/1000 : 6);
							key=='opacity' ? null : speed = speed> 0 ? Math.ceil(speed):Math.floor(speed);
							self.style[key]=nowVal+speed+unit;
							key=="opacity" ? self.style['filter']="alpha(opacity="+(nowVal+speed)*100+")" : null;
							if(key=="opacity"){
								if(isAdd && nowVal>0.99){
									clearInterval(action);
									for(var j in endStyle){
										var k=j,v=endStyle[j];
										self.style[k]=v;
										self.style['filter']="alpha(opacity=100)";
									}
								}else if(!isAdd && nowVal<0.01){
									clearInterval(action);
									for(var j in endStyle){
										var k=j,v=endStyle[j];
										self.style[k]=v;
										self.style['filter']="alpha(opacity=0)";
									}
								}
							}
						}else{
							clearInterval(action);
							for(var j in endStyle){
								var k=j,v=endStyle[j];
								self.style[k]=v;
							}
						}
					}
				},30);
			return action;
		},
		addEvents:function(data,that,target){
			var isSupportCss3 = supports('transition');

			function stopBubbling(event){   //阻止冒泡
				if (event.stopPropagation){
					event.stopPropagation();//在基于firefox内核的浏览器中支持做法stopPropagation
				}else{
					event.cancelBubble = true;//基于ie的写法
				}
			}

			/**
			 * 用于检查一个对象是否包含在另外一个对象中
			 * @method contains
			 * @param {string} parentNode 父节点
			 * @param {string} childNode 子节点
			 */
			function contains(parentNode, childNode) {
				if (parentNode.contains) {
					return parentNode != childNode && parentNode.contains(childNode); }
				else {
					return !!(parentNode.compareDocumentPosition(childNode) & 16);
				}
			}
			/**
			 * 用于检查鼠标是否真正从外部移入或者移出对象的
			 * @method checkHover
			 * @param {string} e 当前的事件对象
			 * @param {string} target 目标对象
			 * @param {string} relatedTarget 属性代表的就是鼠标刚刚离开的那个节点，当触发mouseout事件时它代表的是鼠标移向的那个对象。
			 * 由于MSIE不支持这个属性，不过它有代替的属性，分别是 fromElement和toElement
			 */
			function checkHover(e,target){
				var rel = getEvent(e).relatedTarget ,
					from = getEvent(e).fromElement ,
					to = getEvent(e).toElement;
				if (getEvent(e).type=="mouseover")  {
					return !contains(target,rel||from) && !( (rel||from)===target );
				} else {
					return !contains(target,rel||to) && !( (rel||to)===target );
				}
			}
			/**
			 * 用于在MSIE或者FF下返回一个可用的event对象
			 * @method getEvent
			 * @param {string} e 当前的事件对象
			 */
			function getEvent(e){
				return e||window.event;
			}

			var extendibleBtn=target,
				li=extendibleBtn.getElementsByTagName('li');
			if(!isSupportCss3){
				for(var i=0;i<li.length;i++){
					(function(i){
						if(li[i]){
							li[i].style['marginLeft']='0';
							li[i].getElementsByTagName('a')[1].style['opacity']='0';
							li[i].getElementsByTagName('a')[1].style['width']='0';
							var interval_liLeft,interval_imgWidth;

							addEvent(li[i],'mouseover',function(e){
								clearInterval(interval_liLeft);
								clearInterval(interval_imgWidth);
								var tagget=e.toElement;
								var self=this,
									large=self.getElementsByTagName('a')[1],
									speed=0;
								self.className+=' thisOn';
								interval_liLeft=that.myAnimate(self,{'marginLeft':(-185*i)+'px'},4300);
								interval_imgWidth=that.myAnimate(large,{'width':'700px','opacity':1},4300);
								stopBubbling(e);
							});

							addEvent(li[i],'mouseout',function(e){
								clearInterval(interval_liLeft);
								clearInterval(interval_imgWidth);
								var tagget=e.toElement;
								var self=this;
								large=self.getElementsByTagName('a')[1],
									selfClass=self.className;
								if(checkHover(e,self) && tagget && tagget.tagName.toLocaleLowerCase != 'li'){
									interval_liLeft=that.myAnimate(self,{'marginLeft':'0px'},4300);
									interval_imgWidth=that.myAnimate(large,{'width':'0px','opacity':0},6200);
								}
								selfClass=selfClass.replace(/\sthisOn/g,'');
								self.className=selfClass;
								stopBubbling(e);
							});
						}
					})(i)
				}
			}
		}
	});
})();/**
 * @author hujinglin
 */
(function() {
	ads.closet = function(data){
		var obj = new ads.Closet(data.params);
		return obj.el;
	}
	ads.Closet = Class.extend({
		init: function(data) {
			this.el = document.createElement('div');
			this.el.className = "leju-ads";	
			data.delay = data.delay || 500;					//弹出层持续时间
			data.height = data.height || 0;					//外层容器高度
			data.width = data.width || 0;					//外层容器宽度
			data.cheight = data.cheight || 0;				//大图高度
			data.cwidth = data.cwidth || 0;					//大图宽度
			data.spacing = data.spacing || 8;				//小图间距
			//外层容器
			var closetCon = ads.createElement(
			'div', '', {
				width: data.width+"px",
				position: 'relative'
			}, this.el, 'append');
			//处理大图位置数据
			closetCon.style['overflow'] = "hidden";
			//品牌小图容器
			var brandCon = ads.createElement('div', '', {
				overflow: 'hidden',
				zoom: '1'
			}, closetCon, 'append');
			//品牌大图容器
			var bannerCon = ads.createElement('div', '', {
				width: data.cwidth+"px",
				height: data.cheight + "px",
				display: 'none',
				overflow: 'hidden',
				position: 'absolute',
				top: 0,
				left: 0,
				zIndex: 99
			}, closetCon, 'append');
			bannerCon.timeOutX = {};
			var brandList = [];
			var bannerList = [];
			var nowList = "0";
			//创建品牌小图和大图元素
			for(var i=0; data.list[i]; i++) {
				var bannerData = {
					width: data.list[i].width || 150,
					height: data.height || 60,
					src: data.list[i].src,
					link: data.list[i].link,
					flashvars:{adlink: data.link}
				}
				brandList[i] = new ads.Banner(bannerData).el;
				ads.setStyle(brandList[i].firstChild,{textDecoration:"none"});
				var bannerTxt = ads.createElement('span','',{
					textAlign : "center",
					display : "block",
					color : "#999",
					fontWeight:"bold"
				},brandList[i].firstChild, 'append');
				bannerTxt.innerHTML = data.list[i].text;
				ads.setStyle(brandList[i], {
					height: parseInt(data.height) + 20 + "px",
					cssFloat: 'left',
					styleFloat: 'left',
					overflow: 'hidden',
					marginRight: data.spacing+'px',
					marginBottom: "0"
				});
				brandCon.appendChild(brandList[i]);
				bannerData.src = data.list[i].esrc;
				bannerData.width = data.cwidth;
				bannerData.height = data.cheight;
				bannerList[i] = new ads.Banner(bannerData).el;
				addEvent(brandList[i], 'mouseover', function(i) {
					return function() {
						nowList = i;
						clearTimeout(bannerCon.timeOutX);
				 		if(bannerCon.firstChild) {
				 			bannerCon.removeChild(bannerCon.firstChild);
				 		}
				 		bannerCon.appendChild(bannerList[i]);
				 		bannerCon.style['display'] = 'block';
				 		for(var j=0; data.list[j]; j++) {
							var btxt = brandList[j].firstChild.lastChild;
							btxt.style.color = "#999";
							btxt.style.backgroundColor = "#fff";
						}
				 		btxt = brandList[i].firstChild.lastChild;
				 		btxt.style.color = "#fff";
				 		btxt.style.backgroundColor = "#999";
					}
				}(i));
				addEvent(brandList[i], 'mouseout', function(i) {
					return function() {
						bannerCon.timeOutX = setTimeout(function() {
							var btxt = brandList[i].firstChild.lastChild;
							btxt.style.color = "#999";
							btxt.style.backgroundColor = "#fff";
							bannerCon.style['display'] = 'none';
							closetCon.style['margin'] = "0 0 0 0";
						}, data.delay);
					}
				}(i));
			}
			addEvent(bannerCon, 'mouseover', function() {
				clearTimeout(bannerCon.timeOutX);
				var btxt = brandList[nowList].firstChild.lastChild;
				btxt.style.color = "#fff";
				btxt.style.backgroundColor = "#999";
			});
			addEvent(bannerCon, 'mouseout', function() {
				bannerCon.timeOutX = setTimeout(function() {
					bannerCon.style['display'] = 'none';
					closetCon.style['margin'] = "0 0 0 0";
					for(var i=0; data.list[i]; i++) {
						var btxt = brandList[i].firstChild.lastChild;
						btxt.style.color = "#999";
						btxt.style.backgroundColor = "#fff";
					}
				}, data.delay);
			});
			brandList[i-1].style['marginRight'] = '0';
		}
	});
})();
/**
 * @author Linlin
 */ 
(function() {
	ads.exnamed = function(data) {
		var exnamed = new ads.exNamed(data.params);
		return exnamed.el;
	}
	ads.exNamed = Class.extend({
		init: function(data){
			this.data = data;
			var self = this;
			this.el = document.createElement('div');
			var fnStyle = [{width:130,height:25},{width:200,height:100}];
			this.dl = [];
			for (var i = 0; i <2 ; i++) {
				fnStyle[i].width = /^\d+/.test(this.data.attributes[i].width)?this.data.attributes[i].width:fnStyle[i].width;
				fnStyle[i].height = /^\d+/.test(this.data.attributes[i].height)?this.data.attributes[i].height:fnStyle[i].height;
				var dataAttrs = {
					src:this.data.src[i],
					width:fnStyle[i].width,
					height:fnStyle[i].height
				}
				if(i){
					dataAttrs = {
						src:this.data.src[i],
						width:0,
						height:0
					}
				}
				this.data.link?dataAttrs.link = this.data.link:"";
				this.dl[i] = new ads.Banner(dataAttrs).el;
				this.el.appendChild(this.dl[i]);
				addEvent(this.dl[i],'mouseenter',function(){
					ads.animate(self.dl[1], {
						height : fnStyle[1].height + 'px',
						width : fnStyle[1].width + 'px'
					},{
						duration: "fast",
						easing: "easeOutCirc"
					});
				});
				addEvent(this.dl[i],'mouseleave',function(){
					ads.animate(self.dl[1], {
						height : 0,
						width : 0
					},{
						duration: "fast",
						easing: "easeOutCirc"
					});
				});
			};
			ads.setStyle(this.dl[0],{position:"absolute",top:"0px",right:"0px",zIndex:this.data.zIndex*3||3});
			ads.setStyle(this.dl[1],{position:"absolute",top:fnStyle[0].height+"px",fontSize:"0",lineHeight:"0",right:"0px",zIndex:this.data.zIndex*3||3});
		}
	})
})();
/**
 * @author river
 * @13.14.10
 */
(function() {
	ads.addHTML = function(data){
		var addHTML = new ads.AddHTML(data.params);
		return addHTML.wraper;
	}
	ads.AddHTML = Class.extend({
		init:function(data){
			this.data = data;
			this.create();
		},
		create : function() {
			var self = this;
			var data = self.data;
			var height = data.height || 70;
			var width = data.width || 950;
			data.html = data.html || "";
			self.wraper = ads.createElement('div',null, {
				width: width+'px',
				height: height+'px',
				overflow: 'hidden'
			},null,null);
			if(data.html){
				self.wraper.innerHTML = data.html;
			}
		}
	})
})();

//焦点图
(function() {
    ads.focus = function(data) {
        var focus = new ads.Focus(data);
    };
    ads.Focus = function(data) {
        var id = data.params.wrapId || "focal01",
            box = document.getElementById(id);
        if (box && data.params.src && data.params.src.lastIndexOf(".jpg") != -1) {
            var width = (data.params.width || 300) + "px",
                height = (data.params.height || 345) + "px",
                alt = data.params.alt,
                src = data.params.src,
                link = data.params.link,
                wrap = box.getElementsByTagName("ul")[0],
                btnWarp =box.getElementsByTagName('ol')[0],
                count = wrap.getElementsByTagName("li").length,
                li = document.createElement("li"),
                btnLi = document.createElement("li");

            li.innerHTML = '<a href="' + data.params.link + '"><img width="' + width + '" height="' + height + '" src="' + data.params.src + '" alt="' + data.params.alt + '"></a>';
            count++;
            wrap.appendChild(li);
            btnWarp.appendChild(btnLi);
            // return h.appendChild(n);
        }
    };
})();
/**
 * @author nttdocomo
 */
(function() {
	ads.plp = function(data) {
		var plp = new ads.Plp(data.params);
	}
	ads.closeBtn = Class.extend({
		createCloseBtn:function(){
			var psStyle = {
	            top: '-19px',
	            left: '0px'
	        };
	        var self = this;
	        switch (this.data.type) {
	            case 'rt':
	                psStyle = {
	                    top: '0',
	                    right: '0'
	                }
	        };
	        this.closeBtn = ads.createElement('div', null, ads.extend({
	            background: 'url("http://www.sinaimg.cn/hs/sinahouse/images/adb.png") no-repeat scroll 0 -22px transparent',
	            height: '19px',
	            width: '57px',
	            position: 'absolute',
	            cursor: 'pointer'
	        }, psStyle), this.el);
	        addEvent(this.closeBtn, 'click', function(){
	            self.remove();
	        })
		},
		remove:function(){
			this.el.parentNode.removeChild(this.el)
		}
	})
	ads.Plp = ads.closeBtn.extend({
		init:function(data){
			this.data = data;
			this.data.height = "300";
			this.data.width = "100";
			this.data.params = {wmode:'transparent'};
	        this.el = (new ads.Banner(this.data)).el;
	        var style = {position:"absolute",zIndex:this.data.zIndex};
	        if(this.data.left){
	        	style.left=this.data.left+"px"
	        }
	        if(this.data.right){
	        	style.right=this.data.right+"px"
	        }
	        ads.setStyle(this.el,style);
	        if(this.data.closebtn){
	        	this.createCloseBtn()
	        }
			document.body.appendChild(this.el)
			this.scroll();
		},
		scroll : function() {
			ads.setStyle(this.el, {
				top : (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - this.el.clientHeight - this.data.bottom + "px"
			});

			var self = this;
			addEvent(window, 'scroll', ads.throttle(function() {
				ads.animate(self.el, {
					top : (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - self.el.clientHeight - self.data.bottom + "px"
				}, {
					duration : 500,
					easing : "easeOutCirc"
				})
			}, 200));
			addEvent(window, 'resize', ads.throttle(function() {
				ads.animate(self.el, {
					top : (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight - self.el.clientHeight - self.data.bottom + "px"
				}, {
					duration : 500,
					easing : "easeOutCirc"
				})
			}, 200));
			/*addEvent(self.closeBtn, 'click', function() {
				self.closeAll();
			});*/
		}
	})
})();
/**
 * @author Chris
 */
(function() {
	ads.exfullscreen = function(data) {
		var exfullscreen = new ads.ExFullscreen(data.params);
		return exfullscreen.el;
	}
	ads.ExFullscreen = ads.Base.extend({
		init: function(data){
			this.data = data;
			this.create();
		},
		create : function() {
			var self = this;
			this.el = document.createElement('div');
			this.wrap = [];
			this.fsobj = [];
			this.fsa = [];
			this.wrap[0] = ads.createElement('div',{id : 'exfssmall'},{
				width : this.data[0].width + 'px',
				height : this.data[0].height + 'px',
				margin : '0 auto',
				overflow : 'hidden',
				clear : 'both'
			},this.el,self.action);//action如果改成'before',ie67就出不来
			this.wrap[1] = ads.createElement('div',{id : 'exfsbig'},{
				width : this.data[1].width + 'px',
				height : '0px',
				margin : '0 auto',
				overflow : 'hidden',
				clear : 'both',
				position: 'relative',
				display : 'none'
			},this.el,self.action);//action如果改成'before',ie67就出不来
			for(var i=0,len=this.data.length; i<len; i++){
				if(this.data[i].src.lastIndexOf('.swf') != -1){
					
					this.fsobj[i] = new ads.Banner(this.data[i]).el;
					this.wrap[i].appendChild(this.fsobj[i]);
				}
				else{				
					//先创建一个a，插入到div
					this.fsa[i] = ads.createElement('a',{
						href : this.data[i].link,
						target : '_blank'
					}, null, this.wrap[i], null);
					//再创建一个img，追加到a里
					this.fsobj[i] = ads.createElement('img',{src : this.data[i].src},{
						width : this.data[i].width,
						height : this.data[i].height,
						border : 'none'
					},this.fsa[i],null );
				}
			}
			this.show();
		},
		small2big: function(callback){
			var self = this;
			if(self.replayBtn){
				ads.setStyle(self.replayBtn, {
					display: 'none'
				});
			}
			ads.animate(self.wrap[0], {
				height : "0px"
			},{
				duration: 1200,
				easing: "easeOutCirc"
			});
			setTimeout(function(){
				self.wrap[1].style.display = 'block';
				ads.animate(self.wrap[1], {
					height : self.data[1].height + 'px'
				},{
					duration: 2000,
					easing: "easeOutCirc"
				});
				if(this.closeBtn){
					ads.setStyle(self.closeBtn, {
						display: 'block'
					});
				}else{
					self.createCloseBtn();
				}				
				if(callback){
					self.callbackTimer = setTimeout(function(){callback()},8000);
				}
			},1200);				
		},
		big2small: function(){
			var self = this;
			if(self.callbackTimer){
				clearTimeout(self.callbackTimer);
			}
			if(self.closeBtn){
				ads.setStyle(self.closeBtn, {
					display: 'none'
				});
			}
			ads.animate(self.wrap[1], {
				height : '0px'
			},{
				duration: 1800,
				easing: "easeOutCirc"
			});
			setTimeout(function(){
				ads.animate(self.wrap[0], {
					height : self.data[0].height
				},{
					duration: 800,
					easing: "easeOutCirc"
				});
				if(self.replayBtn){
					ads.setStyle(self.replayBtn, {
						display: 'block'
					});
				}else{
					self.createReplayBtn();
				}				
			},1800)			
		},
		createCloseBtn: function(){
			var self = this;
			self.closeBtn = ads.createElement('div', null, {
				background : 'url("http://src.house.sina.com.cn/imp/imp/deal/82/5a/9/58c0acc6e64ca01aaa50d5b95eb_p1_mk1.png") no-repeat scroll 0px 0px transparent',
				height : '20px',
				width : '57px',
				position : 'absolute',
				cursor : 'pointer'
			}, self.wrap[1]); ads.setStyle(self.closeBtn, {
				top : '0px',
				right : '0px'
			}), addEvent(self.closeBtn, 'click', function() {
				self.big2small();
			})
		},
		createReplayBtn: function(){
			var self = this;
			this.wraper = this.wrap[0] ? this.wrap[0] : document.body;
			this.replayBtn = ads.createElement('div', null, {
				background : 'url("http://src.house.sina.com.cn/imp/imp/deal/82/5a/9/58c0acc6e64ca01aaa50d5b95eb_p1_mk1.png") no-repeat scroll -28px -46px transparent',
				height : '57px',
				width : '20px',
				position : 'absolute',
				cursor : 'pointer'
			}, document.body); ads.setStyle(this.replayBtn, {
				top : this.wraper.offsetTop + 'px',
				left : (document.body.clientWidth - 950) / 2 + 950 + 'px'
			}), addEvent(this.replayBtn, 'click', function() {
				self.small2big(function(){self.big2small()});
			}),addEvent(window,'resize',function(){
	        	ads.setStyle(self.replayBtn, {
					left : (document.body.clientWidth - 950) / 2 + 950 + 'px'
				});
	        });			
		},
		show : function() {
			var self = this;
			setTimeout(function(){
				self.small2big(function(){self.big2small()});	
			},2500)
		}
	})
})();
