/*
    Common Util 2.9.1
    
    Copyright (c) 2011 STRAIGHTLINE<http://straightline.jp/> All rights reserved.
*/

/*
---------------------------------------------------------------------------------------------------
    Common Function
---------------------------------------------------------------------------------------------------
*/
function getWindowSize() {
    var obj = new Object();
    var scrollBarWidth = 17;
    if (Browser.ie) {
        obj.x = (document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth) + scrollBarWidth;
        obj.y = (document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight) + scrollBarWidth;
    } else {
        obj.x = window.innerWidth;
        obj.y = window.innerHeight;
    }
    return obj;
}

function getDocumentSize() {
    var obj = new Object();
    obj.x = document.documentElement.scrollWidth || document.body.scrollWidth;
    obj.y = document.documentElement.scrollHeight || document.body.scrollHeight;
    return obj;
}
/*
---------------------------------------------------------------------------------------------------
description: A Class that provides a cross-browser history-management functionaility, using the browser hash to store the application's state

license: MIT-style

authors:
- Arieh Glazer
- Dave De Vos
- Digitarald

requires:
- core/1.3: [Object,Class,Class.Extras,Element,Element.Event,Element.Style]

provides: [HashListener]
---------------------------------------------------------------------------------------------------
*/
(function($){

Element.NativeEvents['hashchange'] =  2;

HashListener = new Class({
	Implements : [Options,Events],
	options : {
		blank_page : 'blank.html',
		start : false
	},
	iframe : null,
	currentHash : '',
	firstLoad : true,
	handle : false,
	useIframe : (Browser.ie && (typeof(document.documentMode)=='undefined' || document.documentMode < 8)),
	ignoreLocationChange : false,
	initialize : function(options){
		var $this=this;
			
		this.setOptions(options);
		
		// Disable Opera's fast back/forward navigation mode
		if (Browser.opera && window.history.navigationMode) {
			window.history.navigationMode = 'compatible';
		}

		
		 // IE8 in IE7 mode defines window.onhashchange, but never fires it...
        if (
			('onhashchange' in window) &&
            (typeof(document.documentMode) == 'undefined' || document.documentMode > 7)
		   ){
                // The HTML5 way of handling DHTML history...
				window.addEvent('hashchange' , function () {
					var hash = $this.getHash();
					if (hash == $this.currentHash) {
						return;
					}
					$this.fireEvent('hashChanged',hash);
					$this.fireEvent('hash-changed',hash);
				});
        } else  {
			if (this.useIframe){
				this.initializeHistoryIframe();
			} 
        } 
		
		window.addEvent('unload', function(event) {
			$this.firstLoad = null;
		});
		
		if (this.options.start) this.start();
	},
	initializeHistoryIframe : function(){
		var hash = this.getHash(), doc;
		this.iframe = new IFrame({
			src		: this.options.blank_page,
			styles	: { 
				'position'	: 'absolute',
				'top'		: 0,
				'left'		: 0,
				'width'		: '1px', 
				'height'	: '1px',
				'visibility': 'hidden'
			}
		}).inject(document.body);

		doc	= (this.iframe.contentDocument) ? this.iframe.contentDocument  : this.iframe.contentWindow.document;
		doc.open();
		doc.write('<html><body id="state">' + hash + '</body></html>');
		doc.close();
		return;
	},
	checkHash : function(){
		var hash = this.getHash(), ie_state, doc;
		if (this.ignoreLocationChange) {
			this.ignoreLocationChange = false;
			return;
		}

		if (this.useIframe){
			doc	= (this.iframe.contentDocument) ? this.iframe.contentDocumnet  : this.iframe.contentWindow.document;
			ie_state = doc.body.innerHTML;
			
			if (ie_state!=hash){                
                this.setHash(ie_state);				
                hash = ie_state;                
			} 
		}		
		if (this.currentHash == hash) {
			return;
		}
		this.currentHash = hash;
		
		this.fireEvent('hashChanged',hash);
		this.fireEvent('hash-changed',hash);
	},
	setHash : function(newHash){
		window.location.hash = this.currentHash = newHash;
		
		if (
			('onhashchange' in window) &&
            (typeof(document.documentMode) == 'undefined' || document.documentMode > 7)
		   ) return;

		//this.fireEvent('hashChanged',newHash);
		//this.fireEvent('hash-changed',newHash);
	},
	getHash : function(){
		var m;
		if (Browser.firefox){
			m = /#(.*)$/.exec(window.location.href);
			return m && m[1] ? m[1] : '';
		}else if (Browser.safari || Browser.chrome){
			return decodeURI(window.location.hash.substr(1));
		}else{
			return window.location.hash.substr(1);
		}
	},
	setIframeHash: function(newHash) {
		var doc	= (this.iframe.contentDocument) ? this.iframe.contentDocumnet  : this.iframe.contentWindow.document;
		doc.open();
		doc.write('<html><body id="state">' + newHash + '</body></html>');
		doc.close();
		
	},
	updateHash : function (newHash){
		if (document.id(newHash)) {
			this.debug_msg(
				"Exception: History locations can not have the same value as _any_ IDs that might be in the document,"
				+ " due to a bug in IE; please ask the developer to choose a history location that does not match any HTML"
				+ " IDs in this document. The following ID is already taken and cannot be a location: "
				+ newHash
			);
		}
		
		this.ignoreLocationChange = true;
		
		if (this.useIframe) this.setIframeHash(newHash);
		else this.setHash(newHash);
	},
	start : function(){
	    this.handle = this.checkHash.periodical(100, this);
	},
	stop : function(){
		clearInterval(this.handle);
	}
});

})(document.id);

/* 
---------------------------------------------------------------------------------------------------
    HTML5Audio
---------------------------------------------------------------------------------------------------
*/
var HTML5Audio = new Class({
	Implements: [Options,Events],
    audio: null,
    options: {
        oggSrc: null,
        mp3Src: null,
        onPlayed: function() {},
        onStoped: function() {}
    },
    initialize: function(options) {
        this.setOptions(options);
        if (!!(document.createElement('audio').canPlayType)) {
            this.audio = new Audio('');
            this.audio.autoplay = false;
            this.audio.volume = 0;
            if(this.audio.canPlayType){
                var canPlayOgg = ('' != this.audio.canPlayType('audio/ogg'));
                var canPlayMp3 = ('' != this.audio.canPlayType('audio/mpeg'));
                if(canPlayOgg){
                    this.audio.src = this.options.oggSrc;
                }else if(canPlayMp3){
                    this.audio.src = this.options.mp3Src;
                }
            }
        }
    },
    
    get: function(key) {
        if (this.audio) {
            return this.audio[key];
        } else {
            return null;
        }
    },
    
    play: function() {
        if (this.audio) {
            this.audio.load();
            if (this.audio.volume == 0) {
                this.audio.volume = 1;
            }
            this.audio.play();
            this.fireEvent('played');
        }
    },
    
    resume: function() {
        if (this.audio) {
            if (this.audio.volume == 0) {
                this.audio.volume = 1;
            }
            this.audio.play();
            this.fireEvent('played');
        }
    },
    
    pause: function() {
        if (this.audio) {
            this.audio.pause();
            this.fireEvent('stoped');
        }
    },
    
    stop: function() {
        if (this.audio) {
            if(!this.audio.ended){
                this.audio.pause();
                this.audio.currentTime = 0;
                this.fireEvent('stoped');
            }
        }
    },
    
    autoPlay: function() {
        if (this.audio) {
            this.audio.autoplay = false;
        }
    },
    
    mute: function() {
        if (this.audio) {
            this.audio.muted = true;
        }
    
    },
    
    unmute: function() {
        if (this.audio) {
            this.audio.muted = false;
        }
    
    },
    
    loop: function() {
        if (this.audio) {
            if (this.audio.loop == true || this.audio.loop == false) {
                this.audio.loop = true;
            } else {
                this.audio.addEventListener('ended', function() {
                    this.currentTime = 0;
                    this.play();
                }, false);
            }
        }
    }
});

/* 
---------------------------------------------------------------------------------------------------
    Anchor Effect
---------------------------------------------------------------------------------------------------
*/
var AnchorEffect = new Class({
    Implements: Options,
    options: {
        anchorSelector: 'a',
        backgroundImageSelector: null,
        enterDuration: 300,
        enterTransition: 'expo:out',
        leaveDuration: 300,
        leaveTransition: 'expo:out',
        color: '#bbbbbb',
        colorWhenSameColor: '#999999',
        imgOpacity: 0.7,
        offsetX: 0,
        offsetY: 0
    },
    initialize: function(options) {
        this.setOptions(options);
        
        if (Browser.ie6) {
            return;
        }
        $$(this.options.anchorSelector).each(function(a) {
            if (a.retrieve('defaultColor') == null) {
                a.store('defaultColor', a.getStyle('color'));
                
                a.addEvents({
                    mouseenter: function() {
                        var color = this.options.color;
                        if (a.retrieve('defaultColor') == color) {
                            color = this.options.colorWhenSameColor;
                        }
                        a.set('tween', {
                            property: 'color',
                            duration: this.options.enterDuration,
                            transition: this.options.enterTransition,
                            link: 'cancel'
                        }).get('tween').start(color);
                        if (this.options.imgOpacity < 1) {
                            a.getElements('img').each(function(img) {
                                img.set('tween', {
                                    property: 'opacity',
                                    duration: this.options.enterDuration,
                                    transition: this.options.enterTransition,
                                    link: 'cancel'
                                }).get('tween').start(this.options.imgOpacity);
                            }.bind(this));
                        }
                    }.bind(this),
                    
                    mouseleave: function() {
                        a.set('tween', {
                            property: 'color',
                            duration: this.options.leaveDuration,
                            transition: this.options.leaveTransition,
                            link: 'cancel'
                        }).get('tween').start(a.retrieve('defaultColor'));
                        if (this.options.imgOpacity < 1) {
                            a.getElements('img').each(function(img) {
                                img.set('tween', {
                                    property: 'opacity',
                                    duration: this.options.leaveDuration,
                                    transition: this.options.leaveTransition,
                                    link: 'cancel'
                                }).get('tween').start(1);
                            }.bind(this));
                        }
                    }.bind(this)
                });
            }
        }.bind(this));
        
        $$(this.options.backgroundImageSelector).each(function(element) {
            element.addEvents({
                mouseenter: function() {
                    element.set('tween', {
                        property: 'opacity',
                        duration: this.options.leaveDuration,
                        transition: this.options.leaveTransition,
                        link: 'cancel'
                    }).get('tween').start(this.options.imgOpacity);
                }.bind(this),
                mouseleave: function() {
                    element.set('tween', {
                        property: 'opacity',
                        duration: this.options.leaveDuration,
                        transition: this.options.leaveTransition,
                        link: 'cancel'
                    }).get('tween').start(1);
                }.bind(this)
            });
        }.bind(this));
        
        var fxScroll = new Fx.Scroll(window, {
            //wheelStops: false,
            duration: 'long',
            transition: 'expo:out',
            offset: {
                x: this.options.offsetX,
                y: this.options.offsetY
            }
        });
        $$('a[href^=#]:not([href=#])').each(function(anchor) {
            if (anchor.retrieve('anchorScrollEvent') == null) {
                anchor.store('anchorScrollEvent', function(event) {
                    event.stop();
                    var id = anchor.get('href').slice(1);
                    var element = $(id);
                    if (element) {
                        fxScroll.toElement(element);
                    }
                })
                anchor.addEvent('click', anchor.retrieve('anchorScrollEvent'));
            }
        });
    }
});

/* 
---------------------------------------------------------------------------------------------------
    Image Caption
---------------------------------------------------------------------------------------------------
*/
var ImageCaption = new Class({
    Implements: Options,
    options: {
        imgSelector: null,
        imgCaptionAttr: 'alt'
    },
    initialize: function(options) {
        this.setOptions(options);
        
        $$(this.options.imgSelector).each(function(img) {
            if (img.getParent('.img-caption-wrapper') == null) {
                var span = new Element('span');
                span.wraps(img);
                span.set('class', img.get('class'));
                span.addClass('img-caption-wrapper');
                img.set('class', '');
                var width = img.getSize().x || img.get('height').toInt();
                var text = img.get(this.options.imgCaptionAttr);
                if (text) {
                    var caption = new Element('span', {
                        'class': 'img-caption',
                        text: text,
                        styles: {
                            width: width
                        }
                    });
                    span.adopt(caption);
                }
            }
        }.bind(this));
    }
});

/*
---------------------------------------------------------------------------------------------------
    Fixed Element
---------------------------------------------------------------------------------------------------
*/
var FixedElement = new Class({
    Implements: Options,
    scrollTimer: null,
    resizeTimer: null,
    fixedElements: null,
    options: {
        containerIdName: 'wrapper',
        fixedSelector: '.fixed',
        limitBottomIdName: 'footer',
        smoothMove: true,
        offsetTop: 0,
        offsetBottom: 0,
        duration: 800,
        scrollDelay: 1000,
        transition: 'expo:out'
    },
    initialize: function(options) {
        this.setOptions(options);
        
        this.fixedElements = $$(this.options.fixedSelector);
        this.fixedElements.each(function(element) {
            element.store('defaultTop', element.getCoordinates($(this.options.containerIdName)).top);
            element.store('defaultMarginTop', element.getStyle('margin-top').toInt());
            element.store('defaultPosition', element.getStyle('position'));
            element.set('tween', {
                property: 'margin-top',
                duration: this.options.duration,
                transition: this.options.transition,
                link: 'cancel'
            });
        }.bind(this));
        
        this.adjust.apply(this);
        
        if (this.options.duration == 0 || this.options.smoothMove == false) {
            this.options.scrollDelay = 0;
        }
        window.addEvents({
            scroll: function() {
                clearTimeout(this.scrollTimer);
                this.scrollTimer = (function() {
                    this.adjust.apply(this);
                }.bind(this)).delay(this.options.scrollDelay);
            }.bind(this),
            
            resize: function() {
                clearTimeout(this.resizeTimer);
                this.resizeTimer = (function() {
                    this.adjust.apply(this);
                }.bind(this)).delay(200);
            }.bind(this)
        });
    },
    
    adjust: function() {
        this.fixedElements.each(function(element) {
            var elementCoordinates = element.getCoordinates($(this.options.containerIdName));
            var elementTop = elementCoordinates.top;
            var elementBottom = elementCoordinates.bottom;
            //var elementHeight = element.getComputedSize().totalHeight + element.getStyle('top'). toInt();
            var elementHeight = element.getComputedSize().totalHeight;
            var top = window.getScrollTop();
            var bottom = top + getWindowSize().y;
            var h = getWindowSize().y;

            if (this.options.smoothMove == false && h < elementHeight) {
                element.setStyles({
                    position: element.retrieve('defaultPosition'),
                    top: 'auto'
                });
            } else {
            
                if (
                    (top - elementTop < 0 || top > elementBottom) ||
                    h > elementHeight
                ) {
                    var posTop = top;
                    if (this.options.limitBottomIdName) {
                        var limitBottomElement = $(this.options.limitBottomIdName);
                        if (limitBottomElement) {
                            var limitBottomElementCoordinates = limitBottomElement.getCoordinates($(this.options.containerIdName));
                            var limitBottom = limitBottomElementCoordinates.bottom;
                            var posBottom = posTop + element.getComputedSize().totalHeight + element.getStyle('top'). toInt();
                            if (posBottom > limitBottom) {
                                posTop = posTop - (posBottom - limitBottom) - this.options.offsetBottom;
                            }
                        }
                    }
                    
                    posTop = posTop - element.retrieve('defaultTop');
                    if (posTop < 0) { 
                        posTop = element.retrieve('defaultMarginTop');
                    } else {
                        posTop += this.options.offsetTop;
                    }
                    
                    if (this.options.smoothMove) {
                        element.get('tween').start(posTop);
                    } else {
                        if (element.retrieve('defaultTop') > top) {
                            element.setStyles({
                                position: element.retrieve('defaultPosition'),
                                top: 'auto'
                            });
                        } else {
                            element.setStyles({
                                position: 'fixed',
                                top: this.options.offsetTop
                            });
                        }
                    }
                }
            }
        }.bind(this));
    }
});

/*
---------------------------------------------------------------------------------------------------
    Fixed Global Nav
---------------------------------------------------------------------------------------------------
*/
var FixedGlobalNav = new Class({
    Implements: Options,
    resizeTimer: null,
    options: {
        wrapperIdName: 'wrapper',
        baseIdName: 'global-nav',
        fixedIdName: 'fixed-global-nav',
        duration: 200,
        transition: 'sine:in:out',
        slideInOut: false,
        slideInOutOffset: 10,
        delay: 500,        
        opacity: 0.9
    },
    initialize: function(options) {
        this.setOptions(options);
        
        var fixedElement = $(this.options.fixedIdName);
        if (fixedElement == null) {
            return;
        }
        if (Browser.ie6 || Browser.Platform.ios || Browser.Platform.android) {
            fixedElement.destroy();
            return;
        }
        
        if (this.options.slideInOut == false) {
            this.options.delay = 0;
        }
        var fixedWrapper = new Element('div', {
            id: 'fixed-global-nav-wrapper',
            styles: {
                position: 'fixed',
                display: 'none',
                top: 0,
                left: 0,
                opacity: 0,
                'z-index': 9998
            }
        });
        if (Browser.ie6 || Browser.Platform.ios || Browser.Platform.android) {
            fixedWrapper.setStyle('position', 'absolute');
        }
        fixedWrapper.wraps(fixedElement);
        fixedElement.setStyle('display', 'block');
        fixedWrapper.store('defaultDisplay', fixedWrapper.getStyle('display'));
        fixedWrapper.set('morph', {
            duration: this.options.duration,
            transition: this.options.transition,
            link: 'cancel'
        });

        fixedWrapper.store('backTimer', true);
        fixedWrapper.addEvents({
            mouseenter: function() {
                clearTimeout(fixedWrapper.retrieve('backTimer'));
                fixedWrapper.store('backTimer', null);
                fixedWrapper.store('mouseover', true);
                fixedWrapper.get('morph').start({
                    opacity: 1,
                    top: 0
                });
            }.bind(this),
            mouseleave: function() {
                var timer = (function() {
                    fixedWrapper.get('morph').start({
                        opacity: this.options.opacity,
                        top: this.options.slideInOut ? - fixedWrapper.getSize().y + this.options.slideInOutOffset : 0
                    });
                }.bind(this)).delay(this.options.delay);
                fixedWrapper.store('mouseover', null);
                fixedWrapper.store('backTimer', timer);
            }.bind(this)
        });
        
        this.toggle.apply(this);
        
        window.addEvents({
            scroll: function() {
                this.toggle.apply(this);
            }.bind(this),
            
            resize: function() {
                clearTimeout(this.resizeTimer);
                this.resizeTimer = (function() {
                    this.toggle.apply(this);
                }.bind(this)).delay(200);
            }.bind(this)
        });
    },
    
    toggle: function() {
        var baseBottom = $(this.options.baseIdName).getCoordinates().bottom;
        var fixedWrapper = $('fixed-global-nav-wrapper');
        fixedWrapper.setStyle('width', $(this.options.wrapperIdName).getComputedSize().totalWidth);
        
        if (fixedWrapper.getStyle('position') == 'absolute') {
            fixedWrapper.setStyle('margin-top', window.getScrollTop());
        }
        
        if (window.getScrollTop() > baseBottom) {
            if (fixedWrapper.retrieve('firstLoad') == null) {
                
                fixedWrapper.setStyles({
                    display: 'block',
                    top: 0
                });
                fixedWrapper.get('morph').start({
                    opacity: this.options.opacity,
                    top: 0
                }).chain(
                    function() {
                        fixedWrapper.store('firstLoad', true);
                        fixedWrapper.get('morph').start({
                            opacity: this.options.opacity,
                            top: this.options.slideInOut ? - fixedWrapper.getSize().y + this.options.slideInOutOffset : 0
                        });
                    }.bind(this)
                );
            } else {
                fixedWrapper.setStyle('display', 'block');
                if (fixedWrapper.retrieve('mouseover') == true) {
                    fixedWrapper.get('morph').start({
                        opacity: 1,
                        top: 0
                    });
                } else {
                    fixedWrapper.get('morph').start({
                        opacity: this.options.opacity,
                        top: this.options.slideInOut ? - fixedWrapper.getSize().y + this.options.slideInOutOffset : 0
                    });
                }
            }
        } else {
            clearTimeout(fixedWrapper.retrieve('backTimer'));
            fixedWrapper.store('backTimer', null);
            fixedWrapper.get('morph').start({
                opacity: 0,
                top: this.options.slideInOut ? - fixedWrapper.getSize().y + this.options.slideInOutOffset : 0
            }).chain(function() {
                fixedWrapper.store('mouseover', null);
                fixedWrapper.setStyle('display', 'none');
            }.bind(this));
        }
    }
});

/*
---------------------------------------------------------------------------------------------------
    Ajax
---------------------------------------------------------------------------------------------------
*/
var Ajax = new Class({
	Implements: [Options,Events],
    hashListner: null,
    options: {
        baseURL: null,
        ajaxSelector: '.ajax',
        ajaxTitleIdName: 'ajax-title',
        ajaxFocused: false,
        ajaxLeave: false,
        ajaxToggle: false,
        ajaxFormSelector: '.ajax',
        resultContainerIdName: null,
        resultContainerOpacity: 0.3,
        resultFormContainerIdName: null,
        formRequireMessage: 'This field is required.',
        withHash: false,
        manageHistory: false,
        autoLoad: false,
		onLoading: function(){},
		onLoaded: function(){}
    },
    initialize: function(options) {
        this.setOptions(options);
        
        if (Browser.Platform.ios || Browser.Platform.android) {
            this.options.autoLoad = false;
        }
        if (Browser.ie6 || Browser.ie7) {
            this.options.withHash = false;
        }
        
        if (this.options.baseURL) {
            this.options.baseURL = this.options.baseURL.replace(/\/$/, '');
            
            if (this.options.withHash) {
                this.hashListner = new HashListener();
                if (this.options.manageHistory) {
                    this.hashListner.addEvent('hashChanged',function(hash){
                        this.load.apply(this);
                    }.bind(this));
                    this.hashListner.currentHash = this.hashListner.getHash();
                    this.hashListner.start();
                    
                    var hash = this.hashListner.getHash().replace(/^!/, '');
                    if (hash != '' && hash != '/') {
                        if (this.options.resultContainerIdName) {
                            var resultContainerElement = $(this.options.resultContainerIdName);
                            if (resultContainerElement) {
                                resultContainerElement.setStyle('opacity', 0);
                            }
                        }
                        this.load.apply(this);
                    }
                }
            }
        }
    },
    
    load: function(element, event) {
    
        var anchor = null;
        if (element) {
            if (event) {
                anchor = event.target || element;
            } else {
                anchor = element;
            }
            if (anchor.get('tag') != 'a') {
                anchor = element.getParent('a') || element.getElement('a');
            }
            if (anchor == null && element.get('tag') == 'a') {
                anchor = element;
            }
        }
        
        var url = null;
        var hash = null;
        if (anchor) {
            url = anchor.get('href');
        } else {
            if (this.options.baseURL && this.hashListner) {
                url = this.options.baseURL + this.hashListner.getHash().replace(/^!/, '');
                anchor = $(document.body).getElement('a[href=' + url + ']');
            }
        }
        if (url == null || url.match(/\.(gif|jpg|jpeg|png|zip)$/i)) {
            return;
        }
        
        var trackURL = null;
        if (url.match(/^\?/)) {
            if (event) {
                event.stop();
            }
            trackURL = url;
            if (this.options.baseURL && this.options.withHash) {
                hash = '!/' + url;
            }
            var location = window.location.href;
            var splitURL = location.split('?');
            splitURL = splitURL[0].split('#');
            url = splitURL[0] + url;
        } else {
            if (this.options.baseURL) {
                var splitURL = url.split(this.options.baseURL);
                if (splitURL.length > 1) {
                    if (event) {
                        event.stop();
                    }
                    trackURL = splitURL[1];
                    if (this.options.withHash) {
                        hash = '!' + splitURL[1];
                    }
                } else {
                    return true;
                }
            } else {
                if (event) {
                    event.stop();
                }
            }
        }
        
        if ((element == null && url) || (element && element.retrieve('requesting') == null)) {
            var id = null;
            if (anchor) {
                id = anchor.get('id');
            }
            var resultContainerElement = null;
            if (this.options.resultContainerIdName) {
                resultContainerElement = $(this.options.resultContainerIdName);
            } else if (id) {
                resultContainerElement = $(id + '-result');
            }
            
            if (element && element.retrieve('refElement') != null) {
                element.retrieve('refElement').destroy();
                element.store('refElement', null);
            } else if ($(url)) {
                var newElement = $(url);
                new Fx.Scroll(window, {
                    transition: 'expo:out',
                    onComplete: function() {
                        if (hash) {
                            if (this.hashListner) {
                                this.hashListner.stop();
                                this.hashListner.setHash(hash);
                                this.hashListner.start();
                                var title = newElement.retrieve('ajaxTitle');
                                if (title) {
                                    $(document).title = title;
                                }                                
                            }
                        }                    
                    }.bind(this)
                }).toElement(newElement);
                if (this.options.ajaxFocused) {
                    $$('.ajax-focused').each(function(focusedElement) {
                        focusedElement.removeClass('ajax-focused');
                    });
                    $$('a[href=' + url + ']').each(function(focusedElement) {
                        focusedElement.addClass('ajax-focused');
                    });
                }
            } else {
                var request = new Request({
                    method: 'get',
                    url: url,
                    onRequest: function() {
                        this.fireEvent('loading');
                        if ($('ajax-loader')) {
                            $('ajax-loader').set('tween', {
                                property: 'opacity'
                            }).get('tween').start(1);
                        } else {
                            $(document.body).adopt(new Element('div', {
                                id: 'ajax-loader'
                            }));
                        }
                        if (element) {
                            element.store('requesting', true);
                            element.addClass('ajax-loading');
                        }
                        if (resultContainerElement && resultContainerElement.getStyle('opacity') != 0) {
                            resultContainerElement.setStyle('opacity', this.options.resultContainerOpacity);
                        }
                    }.bind(this),
                    onSuccess: function(text, xml) {
                        if (Object.prototype.hasOwnProperty.call(window, '_gaq') && trackURL) {
                            _gaq.push(['_trackPageview', trackURL]);
                        }
                    
                        if ($('ajax-loader')) {
                            $('ajax-loader').set('tween', {
                                property: 'opacity'
                            }).get('tween').start(0).chain(
                                function() {
                                    $('ajax-loader').destroy();
                                }
                            );
                        }
                    
                        if (element) {
                            element.store('requesting', null);
                        }
                        var newElement = new Element('span', { html: text });
                        newElement.set('id', url);
                        
                        if (resultContainerElement) {
                            resultContainerElement.setStyle('opacity', 1);
                            resultContainerElement.set('html', '');
                            resultContainerElement.adopt(newElement);
                            if (resultContainerElement.retrieve('toggleElement')) {
                                resultContainerElement.retrieve('toggleElement').store('refElement', newElement);
                            }
                        } else {
                            newElement.inject(element, 'before');
                        }
                        
                        var titleElement = newElement.getElementById(this.options.ajaxTitleIdName);
                        var title = null;
                        if (titleElement) {
                            title = titleElement.get('text');
                            titleElement.destroy();
                            newElement.store('ajaxTitle', title);
                        }
                        
                        if (element && (element.hasClass('ajax-leave') || this.options.ajaxLeave)) {
                            element.removeClass('ajax-loading');
                        } 
                        if (element && (element.hasClass('ajax-toggle') || this.options.ajaxToggle)) {
                            element.removeClass('ajax-loading');
                            element.store('refElement', newElement);
                            if (resultContainerElement) {
                                resultContainerElement.store('toggleElement', element);
                            }
                        }
                        if (
                            element &&
                            element.hasClass('ajax-leave') == false && this.options.ajaxLeave == false &&
                            element.hasClass('ajax-toggle') == false && this.options.ajaxToggle == false
                        ) {
                            element = element.destroy();
                        }
                        this.run();
                        
                        if (this.options.ajaxFocused) {
                            $$('.ajax-focused').each(function(focusedElement) {
                                focusedElement.removeClass('ajax-focused');
                            });
                            $$('a[href=' + url + ']').each(function(focusedElement) {
                                focusedElement.addClass('ajax-focused');
                            });
                        }
                        
                        this.fireEvent('loaded');
                        
                        if (hash == '' || hash == '/') {
                            if (this.hashListner) {
                                this.hashListner.stop();
                                this.hashListner.setHash('');
                                this.hashListner.start();
                                if (title) {
                                    $(document).title = title;
                                }
                            }
                        } else if (hash) {
                            if (this.hashListner) {
                                this.hashListner.stop();
                                this.hashListner.setHash(hash);
                                this.hashListner.start();
                                if (title) {
                                    $(document).title = title;
                                }
                            }
                        }
                        
                        if (resultContainerElement) {
                            if (resultContainerElement.getCoordinates().top < window.getScrollTop()) {
                                new Fx.Scroll(window, {
                                    transition: 'expo:out'
                                }).toElement(resultContainerElement);
                            }
                        }
                    }.bind(this),
                    onFailure: function(xhr) {
                        if ($('ajax-loader')) {
                            $('ajax-loader').set('tween', {
                                property: 'opacity'
                            }).get('tween').start(0).chain(
                                function() {
                                    $('ajax-loader').destroy();
                                }
                            );
                        }
                        if (element) {
                            element.set('html', 'error');
                        }
                    }
                });
                request.send('ajax=1');
            }
        }
    },
    
    run: function() {
        var ajax = $$(this.options.ajaxSelector);
        
        ajax.each(function(element) {
            if (element.retrieve('clickEvent') == null) {
                element.store('clickEvent', function(event) {
                    this.load.apply(this, [element, event]);
                }.bind(this));
                element.addEvent('click', element.retrieve('clickEvent'));
                if (
                    this.options.autoLoad ||
                    (!Browser.Platform.ios && element.hasClass('ajax-autoload'))
                ) {
                    if (element.retrieve('scrollEvent') == null) {
                        element.store('scrollEvent', function() {
                            Function.attempt(function(){
                                if (window.getScrollTop() + window.getSize().y > element.getCoordinates().top) {
                                    this.load.apply(this, [element]);
                                    window.removeEvent('scroll', element.retrieve('scrollEvent'));
                                }
                            }.bind(this));
                        }.bind(this));
                        window.addEvent('scroll', element.retrieve('scrollEvent'));
                        element.retrieve('scrollEvent')();
                    }
                }
            }
        }.bind(this));
        
        var submits = new Array();
        var ajaxForm = $$(this.options.ajaxFormSelector);
        
        ajaxForm.each(function(form) {
            if (form.retrieve('submitEvent') == null) {
            
                var submit = form.getElement('input[type=submit]');
                if (submit) {
                    submits.push(submit);
                    submit.store('defaultValue', submit.get('value'));
                    var ajaxElement = new Element('input', {
                        type: 'hidden',
                        name: 'ajax',
                        value: 1
                    });
                    form.adopt(ajaxElement);
                    var result = null;
                    if (this.options.resultFormContainerIdName) {
                        result = $(this.options.resultFormContainerIdName);
                    }
                    if (result == null) {
                        result = new Element('div', {
                            'class': 'ajax-form-result'
                        });
                        result.inject(submit, 'before');
                    }
                    
                    new Form.Validator.Inline(form);                    
                    new Form.Request(form, result, {
                        evalScripts: false,
                        useSpinner: false,
                        url: form.get('action'),
                        method: form.get('method'),                            
                        onSend: function() {
                            submit.setProperty('disabled', true); 
                            submit.setProperty('value', 'Please wait...');
                        },
                        onSuccess: function(text, xml) {
                            submit.setProperty('disabled', false); 
                            submit.setProperty('value', submit.retrieve('defaultValue'));
                            this.fireEvent('loaded');
                        }.bind(this)
                    });
                    form.store('submitEvent', true);
                }
            }
        }.bind(this));
        
        window.addEvent('unload', function() {
            submits.each(function(submit) {
                submit.setProperty('disabled', false);
            });
        });
    }
});

/* 
---------------------------------------------------------------------------------------------------
    Modal Window
---------------------------------------------------------------------------------------------------
*/
var ModalWindow = new Class({
	Implements: [Options,Events],
    resizeTimer: null,
    fixedElement: null,
    overlay: null,
    ajaxLoader: null,
    box: null,
    options: {
        fixedContainerIdName: 'wrapper',
        modalSelector: '.modal',
        backText: 'Back',
        overlayOpacity: 0.7,
		onLoaded: function(){},      // after request
		onComplete: function(){},    // animation complete
		onClosed: function(){},
		onSizeChanged: function(){}
    },
    initialize: function(options) {
        this.setOptions(options);
        this.fixedElement = $(this.options.fixedContainerIdName);
        if (this.fixedElement) {
            this.fixedElement.store('defaultPosition', this.fixedElement.getStyle('position'));
        }
        window.addEvents({
            resize: function() {
                clearTimeout(this.resizeTimer);
                this.resizeTimer = (function() {
                    this.adjust.apply(this);
                }.bind(this)).delay(200);
            }.bind(this)
        });
    },
    
    run: function() {
        $$(this.options.modalSelector).each(function(element) {
            if (element.retrieve('clickEvent') == null) {
                element.store('clickEvent', function(event) {
        			event.stop();
                    this.open.apply(this, [element]);
                }.bind(this));
                element.addEvent('click', element.retrieve('clickEvent'));
            }
        }.bind(this));
    },
    
    open: function(target) {
        if (this.overlay == null) {
            if (this.fixedElement) {
                this.fixedElement.setStyle('position', 'fixed');
            }
            this.overlay = new Element('div', {
                id: 'modal-overlay',
                styles: {
                    width: $(document.body).getScrollSize().x,
                    height: $(document.body).getScrollSize().y,
                    opacity: this.options.overlayOpacity
                }
            });
            $(document.body).adopt(this.overlay);
            
            this.ajaxLoader = new Element('div', {
                id: 'modal-loader'
            });
            $(document.body).adopt(this.ajaxLoader);
            
            this.box = new Element('div', {
                id: 'modal-box',
                styles: {
                    opacity: 0
                }
            });
            var back = new Element('div', {
                id: 'modal-back',
                text: this.options.backText,
                events: {
                    'click': function() {
                        this.close.apply(this);
                    }.bind(this)
                }
            });
            $(document.body).adopt(this.box);
            
            if (target.get('href')) {
                var request = new Request({
                    method: 'get',
                    url: target.get('href'),
                    onSuccess: function(text, xml) {
                        var newElement = new Element('div', {
                            html: text
                        });
                        var modalBoxInner = new Element('div', { 'id': 'modal-box-inner' });
                        modalBoxInner.adopt(newElement);
                        this.box.adopt(modalBoxInner, back);
                        
                        this.fireEvent('loaded');
                        
                        var boxHeight = Math.max(this.box.getSize().y, window.getHeight());
                        this.box.setStyle('height', 0);
                        new Fx.Morph(this.box, {
                            transition: 'expo:out',
                            onComplete: function() {
                                this.overlay.addEvent('click', function() {
                                    this.close.apply(this);
                                }.bind(this));
                                
                                this.adjust.apply(this);
                                
                                this.fireEvent('complete');
                            }.bind(this)
                        }).start({
                            opacity: 1,
                            height: boxHeight
                        });
                        this.ajaxLoader = this.ajaxLoader.destroy();
                    }.bind(this)
                })
                request.send('ajax=1');
            }
        }
    },
    
    close: function() {
        this.overlay.set('tween', {
            property: 'opacity',
            transition: 'expo:out',
            onComplete: function() {
                this.fireEvent('closed');
                if (this.overlay) {
                    this.overlay = this.overlay.destroy();
                }
            }.bind(this)
        }).get('tween').start(0);
        this.box.set('tween', {
            property: 'opacity',
            transition: 'expo:out',
            link: 'ignore',
            onComplete: function() {
                if (this.box) {
                    this.box = this.box.destroy();
                }
            }.bind(this)
        }).get('tween').start(0);
        if (this.fixedElement) {
            this.fixedElement.setStyle('position', this.fixedElement.retrieve('defaultPosition'));
        }
    },
    
    adjust: function() {
        if (this.box) {
            this.box.setStyle('height', 'auto');
            var boxHeight = Math.max(this.box.getSize().y, getWindowSize().y);
            this.box.setStyle('height', boxHeight);
        }
        if (this.overlay) {
            this.overlay.setStyles({
                width: 'auto',
                height: 'auto'
            });
            this.overlay.setStyles({
                width: getDocumentSize().x,
                height: getDocumentSize().y
            });
        }
        if (this.box || this.overlay) {
            this.fireEvent('sizeChanged');
        }
    }
});

/*
---------------------------------------------------------------------------------------------------
    Popup Image
---------------------------------------------------------------------------------------------------
*/
var PopupImage = new Class({
	Implements: [Options,Events],
    resizeTimer: null,
    loader: null,
    overlay: null,
    imgHrefIndex: 0,
    imgAnchors: new Array(),
    imgWrapper: null,
    toggle: null,
    prevNav: null,
    nextNav: null,
    options: {
        popupGroupSelector: '.popup-group',
        popupSectionSelector: '.popup-section',
        popupDescriptionSelector: '.popup-description',
        allAnchorScan: false,
        minWidth: 300,
        minHeight: 300,
        navOpacity: 0.5,
        hoverNavOpacity: 1,
        videoOpacity: 0.5,
        hoverVideoOpacity: 1,
        overlayOpacity: 0.7,
        popupVideo: true,
        margin: 100
    },
    initialize: function(options){
        this.setOptions(options);
        
        window.addEvents({
            resize: function() {
                clearTimeout(this.resizeTimer);
                this.resizeTimer = (function() {
                    this.resize.apply(this);
                }.bind(this)).delay(300);
            }.bind(this),
            scroll: function() {
                this.adjust.apply(this);
            }.bind(this)
        });
    },
    
    run: function() {
        var elements = new Array();
        if (this.options.allAnchorScan) {
            elements = $$('a');
        } else {
            elements = $$('img, .force-popup');
        }
        elements.each(function(element) {
            if (element.retrieve('popUpSetting') == null) {
                element.store('popUpSetting', true);
                var anchor = (element.get('tag') == 'a') ? element : element.getParent('a');
                if (anchor) {
                    var href = anchor.get('href');
                    if (
                        href.match(/\.(gif|jpg|jpeg|png)$/i) ||
                        href.match(/youtu\.be/i)
                    ) {
                        if (href.match(/youtu\.be/i)) {
                            var duration = Browser.ie6 ? 0 : 500;
                            var opacity = (Browser.ie && Browser.version < 9) ? 1 : this.options.videoOpacity;
                            var span = new Element('span', {
                                'class': 'popup-video',
                                styles: {
                                    position: (Browser.ie && Browser.version < 9) ? 'static' : 'absolute',
                                    opacity: opacity
                                }
                            });
                            anchor.adopt(span);
                            if (Browser.ie && Browser.version < 9) {
                                span.setStyles({
                                    'margin-top': - element.getSize().y / 2 - span.getSize().y / 2 ,
                                    'margin-left': element.getSize().x / 2 - span.getSize().x / 2
                                });
                            } else {
                                anchor.setStyle('position', 'relative');
                                span.setStyles({
                                    top: '50%',
                                    left: '50%'
                                });
                            }
                            anchor.addEvents({
                                mouseenter: function() {
                                    span.set('tween', {
                                        property: 'opacity',
                                        transition: 'expo:out',
                                        link: 'cancel'
                                    }).get('tween').start(this.options.hoverVideoOpacity);
                                }.bind(this),
                                mouseleave: function() {
                                    span.set('tween', {
                                        property: 'opacity',
                                        transition: 'expo:out',
                                        link: 'cancel'
                                    }).get('tween').start(opacity);
                                
                                }.bind(this)
                            });
                        }
                        if (href.match(/youtu\.be/i) && this.options.popupVideo == false) {
                            // none
                        } else {
                            anchor.store('popupClickEvent', function(event) {
                                event.stop();
                                if (this.overlay == null) {
                                    
                                    this.overlay = new Element('div', {
                                        'id': 'popup-img-overlay',
                                        styles: { 
                                            position: (Browser.ie6 || Browser.Platform.ios) ? 'absolute' : 'fixed',
                                            opacity: 0,
                                            width: '100%',
                                            height: '100%'
                                        }
                                    });
                                    $(document.body).adopt(this.overlay);
                                    
                                    this.adjust.apply(this);
    
                                    this.overlay.setStyle('opacity', this.options.overlayOpacity);
                                    this.loadImage(href, element);
                                }
                            }.bind(this));
                            anchor.addEvent('click', anchor.retrieve('popupClickEvent'));
                        }
                    }
                }
            }
        }.bind(this));
    },

    loadImage: function(href, element) {
        var duration = Browser.ie6 ? 0 : 500;
        
        if (this.loader == null) {
            this.loader = new Element('div', {
                'id': 'popup-img-loader',
                styles: { 
                    opacity: 0
                }
            });
            if (Browser.Platform.ios) {
                this.loader.setStyle('top', window.getScrollTop() + getWindowSize().y / 2);
            }            
            $(document.body).adopt(this.loader);
            this.loader.set('tween', {
                property: 'opacity',
                duration: duration,
                transition: 'expo:out',
                link: 'cancel'
            }).get('tween').start(1);
            if (element && this.imgAnchors.length == 0) {
                var group = element.getParent(this.options.popupGroupSelector);
                if (group) {
                    var groupElements = new Array();
                    if (this.options.allAnchorScan) {
                        groupElements = group.getElements('a');
                    } else {
                        groupElements = group.getElements('img, .force-popup');
                    }
                    if (groupElements.length > 1) {
                        groupElements.each(function(curElement) {
                            var anchor = (curElement.get('tag') == 'a') ? curElement : curElement.getParent('a');
                            if (anchor) {
                                var curHref = anchor.get('href');
                                if (
                                    curHref.match(/\.(gif|jpg|jpeg|png)$/i) ||
                                    (curHref.match(/youtu\.be/i) && this.options.popupVideo)
                                ) {
                                    this.imgAnchors.push(anchor);
                                }
                            }
                        }.bind(this));
                    }
                }
            }
            this.imgAnchors.each(function(imgAnchor, index) {
                var imgHref = imgAnchor.get('href');
                if (href == imgHref) {
                    this.imgHrefIndex = index;
                }
            }.bind(this));
            
            var loadComplete = function(isImg) {

                if (this.loader) {
                    this.loader.set('tween', {
                        property: 'opacity',
                        duration: duration,
                        transition: 'expo:out',
                        link: 'cancel',
                        onComplete: function() {
                            if (this.loader) {
                                this.loader = this.loader.destroy();
                            }
                        }.bind(this)
                    }).get('tween').start(1);
                }
            
                var imgLoaded = function() {
                
                    this.imgWrapper = new Element('div', {
                        id: 'popup-img-wrapper',
                        styles: { 
                            position: (Browser.ie6 || Browser.Platform.ios) ? 'absolute' : 'fixed',
                            opacity: 0 
                        }
                    });
                    
                    var img = null;
                    if (isImg) {
                        img = new Element('img', { 
                            src: href
                        });
                    } else {
                        var youtubeId = href.split('http://youtu.be/')[1];
                        img = new Element('iframe', {
                            width: 854,
                            height: 510,
                            src: 'http://www.youtube.com/embed/' + youtubeId + '?rel=0',
                            frameborder: 0
                        });
                    }
                    this.imgWrapper.adopt(img);

                    if (element) {
                        var description = null;
                        var parent = element.getParent(this.options.popupSectionSelector);
                        if (parent) {
                            var descriptionElement = parent.getElement(this.options.popupDescriptionSelector);
                            if (descriptionElement) {
                                description = description.get('html');
                            }
                        } else {
                            description = element.get('alt');
                        }
                        if (description) {
                            this.imgWrapper.adopt(new Element('div', {
                                id: 'popup-description',
                                html: description
                            }));
                        }
                    }
                    
                    if (this.imgAnchors.length > 0) {
                        this.imgWrapper.setStyle('cursor', 'pointer');
                        this.imgWrapper.addEvent('click', function() {
                            this.next.apply(this);
                        }.bind(this));
                    }
                    
                    $(document.body).adopt(this.imgWrapper);
                    img.store('defaultSize', img.getSize());
                    img.setStyle('display', 'none');
                    
                    this.imgWrapper.store('img', img);

                    if (this.imgAnchors.length > 0) {
                        if (this.prevNav == null) {
                            this.prevNav = new Element('div', {
                                'id': 'popup-img-prev',
                                styles: { 
                                    position: (Browser.ie6 || Browser.Platform.ios) ? 'absolute' : 'fixed',
                                    opacity: 0 
                                },
                                events: {
                                    'click': function(event) { this.prev.apply(this); }.bind(this),
                                    'mouseenter': function() {
                                        if (this.prevNav) {
                                            this.prevNav.get('tween').start(this.options.hoverNavOpacity);
                                        }
                                    }.bind(this),
                                    'mouseleave': function() {
                                        if (this.prevNav) {
                                            this.prevNav.get('tween').start(this.options.navOpacity);
                                        }
                                    }.bind(this)
                                }
                            });
                            $(document.body).adopt(this.prevNav);
                            this.prevNav.set('tween', {
                                property: 'opacity',
                                duration: duration,
                                transition: 'expo:out',
                                link: 'cancel'
                            }).get('tween').start(this.options.navOpacity);
                        }
                        if (this.nextNav == null) {
                            this.nextNav = new Element('div', {
                                'id': 'popup-img-next',
                                styles: { 
                                    position: (Browser.ie6 || Browser.Platform.ios) ? 'absolute' : 'fixed',
                                    opacity: 0 
                                },
                                events: {
                                    'click': function(event) { this.next.apply(this); }.bind(this),
                                    'mouseenter': function() {
                                        if (this.nextNav) {
                                            this.nextNav.get('tween').start(this.options.hoverNavOpacity);
                                        }
                                    }.bind(this),
                                    'mouseleave': function() {
                                        if (this.nextNav) {
                                            this.nextNav.get('tween').start(this.options.navOpacity);
                                        }
                                    }.bind(this)
                                }
                            });
                            $(document.body).adopt(this.nextNav);
                            this.nextNav.set('tween', {
                                property: 'opacity',
                                duration: duration,
                                transition: 'expo:out',
                                link: 'cancel'
                            }).get('tween').start(this.options.navOpacity);
                        }
                    }
                    
                    if (this.toggle == null) {
                        this.toggle = new Element('div', {
                            'id': 'popup-img-toggle',
                            styles: { 
                                position: (Browser.ie6 || Browser.Platform.ios) ? 'absolute' : 'fixed',
                                opacity: 0 
                            },
                            events: {
                                'click': function(event) { this.close.apply(this); }.bind(this),
                                'mouseenter': function() {
                                    if (this.toggle) {
                                        this.toggle.get('tween').start(this.options.hoverNavOpacity);
                                    }
                                }.bind(this),
                                'mouseleave': function() {
                                    if (this.toggle) {
                                        this.toggle.get('tween').start(this.options.navOpacity);
                                    }
                                }.bind(this)
                            }
                        });
                        $(document.body).adopt(this.toggle);
                        this.toggle.set('tween', {
                            property: 'opacity',
                            duration: duration,
                            transition: 'expo:out',
                            link: 'cancel'
                        }).get('tween').start(this.options.navOpacity);
                    }
                    (function() {
                        img.setStyle('display', 'block');
                        this.resize.apply(this);
                        this.imgWrapper.set('tween', {
                            property: 'opacity',
                            duration: duration,
                            transition: 'expo:out',
                            onComplete: function() {
                                if (this.overlay) {
                                    this.overlay.addEvent('click', function() {
                                        this.close.apply(this);
                                    }.bind(this));
                                }
                            }.bind(this)
                        }).get('tween').start(1);
                    }.bind(this)).delay(Browser.ie6 ? 100: 0);
                }.bind(this);
                            
                if (this.imgWrapper) {
                    this.imgWrapper.set('tween', {
                        property: 'opacity',
                        duration: duration,
                        transition: 'expo:out',
                        link: 'ignore',
                        onComplete: function() {
                            if (this.imgWrapper) {
                                this.imgWrapper = this.imgWrapper.destroy();
                            }
                            imgLoaded();
                        }.bind(this)
                    }).get('tween').start(0);
                } else {
                    imgLoaded();
                }
            }.bind(this);
            
            if (href.match(/\.(gif|jpg|jpeg|png)$/i)) {
                new Asset.images([href], {
                    onComplete: function() {
                        loadComplete(true);
                    }.bind(this)
                });
            } else {
                loadComplete();
            }
        } else {
            if (Browser.Platform.ios) {
                this.loader.setStyle('top', window.getScrollTop() + getWindowSize().y / 2);
            }            
        }
    },
    
    next: function() {
        var element = null;
        var href = null;
        if (this.imgHrefIndex + 1 == this.imgAnchors.length) {
            element = this.imgAnchors[0];
        } else {
            element = this.imgAnchors[this.imgHrefIndex + 1];
        }
        href = element.get('href');
        this.loadImage(href, element);
    },
    
    prev: function() {
        var element = null;
        var href = null;
        if (this.imgHrefIndex - 1 < 0) {
            element = this.imgAnchors[this.imgAnchors.length - 1];
        } else {
            element = this.imgAnchors[this.imgHrefIndex - 1];
        }
        href = element.get('href');
        this.loadImage(href, element);
    },
    
    close: function() {
        if (this.overlay.getStyle('opacity') < this.options.overlayOpacity) {
            return;
        }
        
        var duration = Browser.ie6 ? 0 : 500;
        this.imgAnchors = new Array();
        
        this.overlay.set('tween', {
            property: 'opacity',
            duration: duration,
            transition: 'expo:out',
            link: 'ignore',
            onComplete: function() {
                if (this.overlay) {
                    this.overlay = this.overlay.destroy();
                }
            }.bind(this)
        }).get('tween').start(0);
        this.toggle.set('tween', {
            property: 'opacity',
            duration: duration,
            transition: 'expo:out',
            link: 'ignore',
            onComplete: function() {
                if (this.toggle) {
                    this.toggle = this.toggle.destroy();
                }
            }.bind(this)
        }).get('tween').start(0);
        if (this.prevNav) {
            this.prevNav.set('tween', {
                property: 'opacity',
                duration: duration,
                transition: 'expo:out',
                link: 'ignore',
                onComplete: function() {
                    if (this.prevNav) {
                        this.prevNav = this.prevNav.destroy();
                    }
                }.bind(this)
            }).get('tween').start(0);
        }
        if (this.nextNav) {
            this.nextNav.set('tween', {
                property: 'opacity',
                duration: duration,
                transition: 'expo:out',
                link: 'ignore',
                onComplete: function() {
                    if (this.nextNav) {
                        this.nextNav = this.nextNav.destroy();
                    }
                }.bind(this)
            }).get('tween').start(0);
        }
        this.imgWrapper.set('tween', {
            property: 'opacity',
            duration: duration,
            transition: 'expo:out',
            link: 'ignore',
            onComplete: function() {
                if (this.imgWrapper) {
                    this.imgWrapper = this.imgWrapper.destroy();
                }
            }.bind(this)
        }).get('tween').start(0);
    },

    resize: function() {
        var w = getDocumentSize().x;
        var h = getWindowSize().y;
        
        if (this.imgWrapper) {
            var img = this.imgWrapper.retrieve('img');
            var imgSize = img.retrieve('defaultSize');
            if (imgSize.x < 30 || imgSize.y < 30) {
                imgSize = img.getSize();
            }
            var rate = Math.min((w - this.options.margin * 2) / imgSize.x, (h - this.options.margin * 2) / imgSize.y, 1);
            if ((Browser.Platform.ios || Browser.Platform.android) && img.get('tag') != 'img') {
                imgSize.x = 376;
                imgSize.y = 212;
                rate = 1;
            }
            img.setStyles({
                width: Math.floor(imgSize.x * rate),
                height: Math.floor(imgSize.y * rate)
            });
        }
        if (this.prevNav) {
            this.prevNav.setStyle('height', h);
        }
        if (this.nextNav) {
            this.nextNav.setStyle('height', h);
        }
        if (this.imgWrapper || this.prev || this.next) {
            this.adjust.apply(this);
        }
    },
    
    adjust: function() {
        var w = getDocumentSize().x;
        var h = getWindowSize().y;
        
        if (this.imgWrapper) {
            var size = this.imgWrapper.getSize();
            var top = h / 2 - size.y / 2;
            var left = w / 2 - size.x / 2;
            if (this.imgWrapper.getStyle('position') == 'absolute') {
                top += window.getScrollTop();
            }
            this.imgWrapper.setStyles({
                top: top,
                left: left
            });
        }
        if (this.toggle && this.toggle.getStyle('position') == 'absolute') {
            this.toggle.setStyles({
                top: window.getScrollTop()
            });
        }
        if (this.prevNav && this.prevNav.getStyle('position') == 'absolute') {
            this.prevNav.setStyles({
                top: window.getScrollTop()
            });
        }
        if (this.nextNav && this.nextNav.getStyle('position') == 'absolute') {
            this.nextNav.setStyles({
                top: window.getScrollTop()
            });
        }
        if (this.overlay) {
            if (this.overlay.getStyle('position') == 'absolute') {
                this.overlay.setStyles({
                    width: 'auto',
                    height: 'auto'
                });
                this.overlay.setStyles({
                    width: getDocumentSize().x,
                    height: getDocumentSize().y
                });
            }
        }
    }
});


/*
---------------------------------------------------------------------------------------------------
    Popup Window
---------------------------------------------------------------------------------------------------
*/
var PopupWindow = new Class({
	Implements: [Options,Events],
    options: {
        popupWindowSelector: '.popup-window',
        width: 640,
        height: 480
    },
    initialize: function(options) {
        this.setOptions(options);
    },
    
    run: function() {
        $$(this.options.popupWindowSelector).each(function(popup) {
            if (popup.retrieve('popupWindowSetting') == null) {
                popup.store('popupWindowSetting', true);
                if (popup.retrieve('clickEvent')) {
                    popup.removeEvent('click', popup.retrieve('clickEvent'));
                }
                popup.store('clickEvent', function(event) {
                    event.stop();
                    var popupSize = popup.get('popup-size');    // popup-size="width:height"
                    var anchor = null;
                    if (popup.get('tag') == 'a') {
                        anchor = popup;
                    } else {
                        anchor = popup.getElement('a');
                    }
                    var url = null;
                    if (anchor) {
                        url = new URI(anchor.get('href'));
                    }
                    if (url) {
                        var values = new Array();
                        if (popupSize) {
                            values = popupSize.split(':');
                        } else {
                            values.push(this.options.width);
                            values.push(this.options.height);
                        
                        }
                        var popupWindow = open(url.setData({compact: 1}, true), 'popup', 'width=' + values[0] + ',height=' + values[1] + ',scrollbars=yes');
                        (function() { popupWindow.focus() }).delay(100);
                    }
                }.bind(this));
                popup.addEvent('click', popup.retrieve('clickEvent'));
            }
        }.bind(this));
    
    }
});

/* 
---------------------------------------------------------------------------------------------------
    Slide
---------------------------------------------------------------------------------------------------
*/
var Slide = new Class({
	Implements: [Options,Events],
    wrapper: null,
    isSliding: false,
    scrollTimer: null,
    resizeTimer: null,
    mouseOver: false,
    animationType: {
        fade: 0,
        slide: 1,
        hSlide: 2,
        vSlide: 3,      // disable
        loopHSlide: 4,
        loopVSlide: 5   // disable
    },    
    side: {
        inside: 0,
        outside: 1
    },    
    options: {
        clearGif: null,
        animationType: 0,
        slideContainerSelector: '.slide',
        slideItemSelector: '.slide-item',
        alignCenter: false,
        withNav: true,
        withPageNav: true,
        positionPageNav: 0,
        focusCurrent: false,
        nonActiveOpacity: 0.3,
        hoverNav: true,
        navOpacity: 0.5,
        hoverNavOpacity: 1,
        alwaysDisplayNav: false,
        considerDistance: true,
        fadeDuration: 500,
        fadeTransition: 'sine:in:out',
        moveDuration: 500,
        moveTransition: 'expo:out',
        autoResize: true,
        slideAutoRotateSelector: '.slide-rotate',
        autoRotate: false,
        rotatePeriodical: 5000,
        draggable: true,
		onImgLoaded: function(){},
		onFirstLoaded: function(){},
		onFirstAnimationComplete: function(){},
		onSizeChanged: function(){},
		onLoopComplete: function(){}
    },
    
    initialize: function(options) {
        this.setOptions(options);
        this.wrapper = $('wrapper');
    },
    
    run: function() {
        if (
            this.options.animationType == this.animationType.vSlide ||
            this.options.animationType == this.animationType.loopVSlide
        ) {
            alert('disable!');
        }

        var slideContainers = $$(this.options.slideContainerSelector);
        var resizeSlideContainers = new Array();
        if (slideContainers.length == 0) {
            this.fireEvent('firstLoaded');
            this.fireEvent('firstAnimationComplete');
            return;
        }
        slideContainers.each(function(slide, index) {
            if (slide.retrieve('loaded') == null) {
                slide.store('loaded', true);
                resizeSlideContainers.push(slide);
                slide.setStyle('opacity', 0);
                slide.addClass('slide');
                slide.store('slideItems', slide.getElements(this.options.slideItemSelector));
                /*
                if (slide.retrieve('slideItems').length == 1) {
                    if (this.options.animationType == this.animationType.loopHSlide) {
                        this.options.animationType = this.animationType.hSlide
                    }
                }
                */
                var slideInner = new Element('div', { 
                    'class': 'slide-inner'
                });
                slideInner.adopt(slide.retrieve('slideItems'));
                slide.adopt(slideInner);
                slide.store('slideInner', slideInner);
								//var  = slideInner.setStyle("marginLeft");
                
                var slidePageNav = null;
                if (
                    this.options.withPageNav && 
                    this.options.animationType != this.animationType.loopHSlide &&
                    slide.retrieve('slideItems').length > 1
                ) {
                    slidePageNav = new Element('div', {
                        'class': 'slide-page-nav',
                        styles: { position: 'relative', opacity: 0, visibility: 'visible' }
                    });
                }
                slide.retrieve('slideItems').each(function(slideItem, index) {
                    slideItem.addClass('slide-item');
                    if (
                        this.options.animationType == this.animationType.fade ||
                        this.options.animationType == this.animationType.hSlide ||
                        this.options.animationType == this.animationType.loopHSlide
                    ) {
                        slideItem.setStyles({
                            opacity: 0
                        });
                    }
                    if (this.options.animationType == this.animationType.slide) {
                        if (this.options.focusCurrent) {
                            if (index == 0) {
                                opacity = 1;
                            } else {
                                opacity = this.options.nonActiveOpacity;
                            }
                            slideItem.setStyle('opacity', opacity);
                        }
                    }
                    
                    if (
                        this.options.withPageNav && 
                        this.options.animationType != this.animationType.loopHSlide &&
                        slide.retrieve('slideItems').length > 1
                    ) {
                        var slidePageNo = new Element('span', {
                            'class': 'slide-page-no',
                            styles: { opacity: this.options.navOpacity, visibility: 'visible' },
                            events: {
                                'click': function() {
                                    this.slide.apply(this, [slide, index]);
                                }.bind(this),
                                'mouseenter': function() {
                                    slidePageNo.set('tween', {
                                        property: 'opacity',
                                        duration: 500,
                                        transition: 'expo:out',
                                        link: 'cancel',
                                        onComplete: function() {
                                            slidePageNo.setStyle('visibility', 'visible');
                                        }
                                    }).get('tween').start(this.options.hoverNavOpacity);
                                }.bind(this),
                                'mouseleave': function() {
                                    if (!slidePageNo.hasClass('slide-page-no-focused')) {
                                        slidePageNo.get('tween').start(this.options.navOpacity);
                                    }
                                }.bind(this)
                            }
                        });
                        slidePageNo.adopt(new Element('span', { text: index + 1 }));
                        slideItem.store('slidePageNo', slidePageNo);
                        slidePageNav.adopt(slidePageNo);
                    }

                }.bind(this));
                
                if (this.options.withNav && slide.retrieve('slideItems').length > 1) {
                    var opacity = 0;
                    if (this.options.hoverNav || this.options.alwaysDisplayNav) {
                        opacity = this.options.navOpacity;
                    }
                    var defaultOpacity = 0;
                    if (this.options.alwaysDisplayNav) {
                        defaultOpacity = this.options.navOpacity;
                    }
                    var slidePrev = new Element('div', {
                        'class': 'slide-prev',
                        styles: { position: 'relative', float: 'left', opacity: defaultOpacity, visibility: 'visible' },
                        text: 'prev',
                        events: {
                            'click': function() {
                                this.prev.apply(this, [slide, true]);
                            }.bind(this),
                            'mouseenter': function() {
                                slidePrev.store('isTweening', true);
                                slidePrev.set('tween', {
                                    property: 'opacity',
                                    transition: 'expo:out',
                                    link: 'cancel',
                                    onComplete: function() {
                                        slidePrev.store('isTweening', null);
                                        slidePrev.setStyle('visibility', 'visible');
                                    }
                                }).get('tween').start(this.options.hoverNavOpacity);
                            }.bind(this),
                            'mouseleave': function() {
                                slidePrev.set('tween', {
                                    property: 'opacity',
                                    transition: 'expo:out',
                                    link: 'cancel'
                                }).get('tween').start(opacity);
                            }.bind(this)
                        }
                    });
                    slide.store('slidePrev', slidePrev);
                    slide.adopt(slidePrev);
                    
                    var slideNext = new Element('div', {
                        'class': 'slide-next',
                        text: 'next',
                        styles: { position: 'relative', float: 'right', opacity: defaultOpacity, visibility: 'visible' },
                        events: {
                            'click': function(i) {
                                //this.next.apply(this, [slide, true]);
																var ml = slide.getChildren(".slide-inner")[0].getStyle("marginLeft");
																console.log(ml);
																
                            }.bind(this),
                            'mouseenter': function() {
                                slideNext.store('isTweening', true);
                                slideNext.set('tween', {
                                    property: 'opacity',
                                    transition: 'expo:out',
                                    link: 'cancel',
                                    onComplete: function() {
                                        slideNext.store('isTweening', null);
                                        slideNext.setStyle('visibility', 'visible');
                                    }
                                }).get('tween').start(this.options.hoverNavOpacity);
                            }.bind(this),
                            'mouseleave': function() {
                                slideNext.set('tween', {
                                    property: 'opacity',
                                    transition: 'expo:out',
                                    link: 'cancel'
                                }).get('tween').start(opacity);
                            }.bind(this)
                        }
                    });
                    slide.store('slideNext', slideNext);
                    slide.adopt(slideNext);
                }
                
                if (slidePageNav) {
                    slide.adopt(slidePageNav);
                    slide.store('slidePageNav', slidePageNav);
                }

                this.resize.apply(this, [slide, false, 0]);
                
                if (Browser.ie6) {
                    slide.retrieve('slideItems').each(function(slideItem) {
                        slideItem.getElements('img').each(function(img) {
                            if (
                                this.options.animationType == this.animationType.hSlide ||
                                this.options.animationType == this.animationType.loopHSlide
                            ) {
                                img.setStyle('opacity', 0);
                            }
                        }.bind(this));
                    }.bind(this));
                } else {
                    slide.retrieve('slideItems').each(function(slideItem) {
                        slideItem.store('imgs', slideItem.getElements('img'));
                        slideItem.retrieve('imgs').each(function(img) {
                            img.store('src', img.get('src'));
                            //img.set('src', this.options.clearGif);
                            if (
                                this.options.animationType == this.animationType.hSlide ||
                                this.options.animationType == this.animationType.loopHSlide
                            ) {
                                img.setStyle('opacity', 0);
                            }
                        }.bind(this));
                    }.bind(this));
                }
                
                if (
                    this.options.animationType == this.animationType.fade ||
                    this.options.animationType == this.animationType.slide
                ) {
                    this.options.draggable = false;
                    this.slide.apply(this, [slide, 0, true]);
                } else if (
                    this.options.animationType == this.animationType.hSlide ||
                    this.options.animationType == this.animationType.loopHSlide
                ) {
                    this.allImgLoad.apply(this, [slide]);
                    if (
                        this.options.withPageNav && 
                        this.options.animationType != this.animationType.loopHSlide &&
                        slide.retrieve('slideItems').length > 1
                    ) {
                        var slidePageNo = slide.retrieve('slideItems')[0].retrieve('slidePageNo');
                        if (slidePageNo) {
                            slidePageNo.addClass('slide-page-no-focused');
                            slidePageNo.setStyle('opacity', this.options.hoverNavOpacity);
                        }
                    }
                }

                new Fx.Tween(slide, {
                    property: 'opacity',
                    duration: this.options.fadeDuration,
                    transition: this.options.fadeTransition,
                    onComplete: function() {
                        if (slidePageNav) {
                            new Fx.Tween(slidePageNav, {
                                property: 'opacity',
                                duration: this.options.fadeDuration,
                                transition: this.options.fadeTransition,
                                onComplete: function() {
                                    if ((slide.hasClass(this.options.slideAutoRotateSelector) || this.options.autoRotate) && this.options.rotatePeriodical > 0) {
                                        slidePageNav.addEvents({
                                            mouseenter: function() {
                                                this.stopRotate.apply(this, [slide]);
                                                this.mouseOver = true;
                                            }.bind(this),
                                            mouseleave: function() {
                                                this.startRotate.apply(this, [slide]);
                                                this.mouseOver = false;
                                            }.bind(this)
                                        });
                                    }
                                }.bind(this)
                            }).start(1);
                        }
                        if (slidePrev && slideNext && (this.options.alwaysDisplayNav == false && this.options.hoverNav)) {
                            slide.addEvents({
                                'mouseenter': function() {
                                    var slideNextOpacity = this.options.navOpacity;
                                    var slidePrevOpacity = this.options.navOpacity;
                                    if (slidePrev.retrieve('isTweening')) {
                                        slidePrevOpacity = this.options.hoverNavOpacity;
                                    }
                                    if (slideNext.retrieve('isTweening')) {
                                        slideNextOpacity = this.options.hoverNavOpacity;
                                    }
                                    slidePrev.set('tween', {
                                        property: 'opacity',
                                        transition: 'expo:out',
                                        link: 'cancel'
                                    }).get('tween').start(slidePrevOpacity);
                                    slideNext.set('tween', {
                                        property: 'opacity',
                                        transition: 'expo:out',
                                        link: 'cancel'
                                    }).get('tween').start(slideNextOpacity);
                                }.bind(this),
                                'mouseleave': function() {
                                    slidePrev.set('tween', {
                                        property: 'opacity',
                                        transition: 'expo:out',
                                        link: 'cancel'
                                    }).get('tween').start(0);
                                    slideNext.set('tween', {
                                        property: 'opacity',
                                        transition: 'expo:out',
                                        link: 'cancel'
                                    }).get('tween').start(0);
                                }.bind(this)
                            });
                        }
                        
                        if (slide.retrieve('slideItems').length > 1) {
                            if (this.options.draggable) {
                                var stopClickElements = slideInner.getElements('a');
                                stopClickElements.each(function(element) {
                                    element.store('stopClickEvent', function(event) {
                                        event.stop();
                                    });
                                });
                                var clientX = 0;
                                var limitLeft = slide.retrieve('slideItems')[slide.retrieve('slideItems').length - 1].getCoordinates(slideInner).left;
                                var stopTimer = null;
                                var isDraggable = false;
                                if (Browser.Platform.ios) {
                                    var startX = 0;
                                    var clientY = 0;
                                    var startY = 0;
                                    var skipDefault = false;
                                    var skipSlide = false;
                                    slideInner.addEvents({
                                        touchstart: function(event) {
                                            skipDefault = false;
                                            skipSlide = false;
                                            clearTimeout(stopTimer);
                                            if (
                                                event.target.get('tag') != 'object' && 
                                                event.target.get('tag') != 'embed' && 
                                                event.target.get('tag') != 'video'
                                            ) {
                                                isDraggable = true;
                                                var touch = event.touches[0];
                                                clientX = touch.pageX;
                                                startX = touch.pageX;
                                                clientY = touch.pageY;
                                                startY = touch.pageY;
                                            } else {
                                                isDraggable = false;
                                            }
                                        }.bind(this),
                                        touchmove: function(event) {
                                            if (isDraggable == false) {
                                                return false;
                                            }
                                            if (slide.retrieve('isSliding') == null) {
                                                var touch = event.touches[0];
                                                if (Math.abs(startY - touch.pageY) > 150) {
                                                    skipSlide = true;
                                                }
                                                if (
                                                    (Math.abs(startX - touch.pageX) > 15 || skipDefault) &&
                                                    skipSlide == false
                                                ) {
                                                    event.preventDefault();
                                                    if (skipDefault == false) {
                                                        clearTimeout(stopTimer);
                                                        stopClickElements.each(function(element) {
                                                            element.removeEvent('click', element.retrieve('popupClickEvent'));
                                                            element.addEvent('click', element.retrieve('stopClickEvent'));
                                                        });
                                                        skipDefault = true;
                                                    }
                                                    var left = slideInner.getStyle('margin-left').toInt() + touch.pageX - clientX;
                                                    if (- left > 0 && - left < limitLeft) {
                                                        slideInner.setStyle('margin-left', left);
                                                    } else {
                                                        slideInner.setStyle('margin-left', slideInner.getStyle('margin-left').toInt() + ((touch.pageX - clientX) * 0.4));
                                                    }
                                                }
                                                clientX = touch.pageX;
                                                clientY = touch.pageY;
                                            }
                                        }.bind(this),
                                        touchend: function(event) {
                                            if (isDraggable == false) {
                                                return false;
                                            }
                                            if (skipDefault) {
                                                this.scanSlideItem.apply(this, [slide]);
                                                stopTimer = (function() {
                                                    stopClickElements.each(function(element) {
                                                        element.removeEvent('click', element.retrieve('stopClickEvent'));
                                                        if (element.retrieve('popupClickEvent')) {
                                                            element.addEvent('click', element.retrieve('popupClickEvent'));
                                                        }
                                                    });
                                                }).delay(300 * 2);
                                            }
                                        }.bind(this)
                                    });
                                } else {
                                    slide.retrieve('slideItems').each(function(dragSlideItem) {
                                        if (dragSlideItem.getElements('object, embed, video').length == 0) {
                                    
                                            new Drag(dragSlideItem, {
                                                snap: 0,
                                                onStart : function(element, event){
                                                    if (
                                                        event.target.get('tag') != 'object' && 
                                                        event.target.get('tag') != 'embed' && 
                                                        event.target.get('tag') != 'video'
                                                    ) {
                                                        isDraggable = true;
                                                        clientX = event.client.x;
                                                    } else {
                                                        isDraggable = false;
                                                    }
                                                }.bind(this),
                                                onSnap : function(element){
                                                    if (isDraggable == false) {
                                                        return false;
                                                    }
                                                    clearTimeout(stopTimer);
                                                    stopClickElements.each(function(element) {
                                                        element.removeEvent('click', element.retrieve('popupClickEvent'));
                                                        element.addEvent('click', element.retrieve('stopClickEvent'));
                                                    });
                                                }.bind(this),
                                                onDrag : function(el, event){
                                                    if (isDraggable == false) {
                                                        return false;
                                                    }
                                                    if (slide.retrieve('isSliding') == null) {
                                                        var left = slideInner.getStyle('margin-left').toInt() + event.client.x - clientX;
                                                        if (- left > 0 && - left < limitLeft) {
                                                            slideInner.setStyle('margin-left', left);
                                                        } else {
                                                            slideInner.setStyle('margin-left', slideInner.getStyle('margin-left').toInt() + ((event.client.x - clientX) * 0.4));
                                                        }
                                                        clientX = event.client.x;
                                                    }
                                                }.bind(this),
                                                onComplete: function(el, event){
                                                    if (isDraggable == false) {
                                                        return false;
                                                    }
                                                    if (slide.retrieve('isSliding') == null) {
                                                        this.scanSlideItem.apply(this, [slide]);
                                                    }
                                                    stopTimer = (function() {
                                                        stopClickElements.each(function(element) {
                                                            element.removeEvent('click', element.retrieve('stopClickEvent'));
                                                            if (element.retrieve('popupClickEvent')) {
                                                                element.addEvent('click', element.retrieve('popupClickEvent'));
                                                            }
                                                        });
                                                    }).delay(300 * 2);
                                                }.bind(this)
                                            });
                                        }
                                    }.bind(this));
                                }
                            }
                            
                            slide.retrieve('slideItems').each(function(slideItem, index) {
                                if (this.options.animationType != this.animationType.loopHSlide) {
                                    if (this.options.draggable == false) {
                                        if (slideItem.getElement('object') == null) { 
                                            slideItem.setStyle('cursor', 'pointer');
                                            if (
                                                this.options.animationType == this.animationType.fade ||
                                                this.options.animationType == this.animationType.slide
                                            ) {
                                                slideItem.addEvent('click', function(event) {
                                                    if (event.target.get('tag') != 'a' && event.target.getParent('a') == null) {
                                                        this.next.apply(this, [slide]);
                                                    }
                                                }.bind(this));
                                            } else if (
                                                this.options.animationType == this.animationType.hSlide
                                            ) {
                                                slideItem.addEvent('click', function(event) {
                                                    if (event.target.get('tag') != 'a' && event.target.getParent('a') == null) {
                                                        this.slide.apply(this, [slide, index]);
                                                    }
                                                }.bind(this));
                                            }
                                        }
                                    }
                                }
                                if (slide.hasClass(this.options.slideAutoRotateSelector) || this.options.autoRotate) {
                                    if (this.options.rotatePeriodical > 0) {
                                        slide.addEvents({
                                            mousedown: function() {
                                                this.stopRotate.apply(this, [slide]);
                                                this.mouseOver = true;
                                            }.bind(this),
                                            mouseenter: function() {
                                                this.stopRotate.apply(this, [slide]);
                                                this.mouseOver = true;
                                            }.bind(this),
                                            mouseleave: function() {
                                                this.startRotate.apply(this, [slide]);
                                                this.mouseOver = false;
                                            }.bind(this)
                                        });
                                    }
                                    this.startRotate.apply(this, [slide]);
                                }
                            }.bind(this));
                        }
                    }.bind(this)
                }).start(1);
            }
            if (index + 1 == slideContainers.length) {
                if (this.options.autoResize) {
                    window.addEvents({
                        resize: function() {
                            clearTimeout(slide.retrieve('resizeTimer'));
                            var resizeTimer = (function() {
                                resizeSlideContainers.each(function(resizeSlide) {
                                    this.resize.apply(this, [resizeSlide]);
                                }.bind(this));
                            }.bind(this)).delay(200);
                            slide.store('resizeTimer', resizeTimer);
                        }.bind(this)
                    });
                }
                this.fireEvent('firstLoaded');
            }
        }.bind(this));
    },
    
    scanSlideItem: function(slide) {
        var slideItems = slide.retrieve('slideItems');
        var slideInner = slide.retrieve('slideInner');
        var index = 0;
        var position = - slideInner.getStyle('margin-left').toInt();
        for (var i = 0; i < slideItems.length; i++) {
            var slideItem = slideItems[i];
            if (position < 0) {
                break;
            } else if (i + 1 == slideItems.length) {
                index = i;
                break;
            } else {
                var nextSlideItem = slideItems[i + 1];
                var left = slideItem.getCoordinates(slideInner).left;
                var nextLeft = nextSlideItem.getCoordinates(slideInner).left;
                if (left <= position && nextLeft >= position) {
                    if (Math.abs(left - position) < Math.abs(nextLeft - position)) {
                        index = i;
                    } else {
                        index = i + 1;
                    }
                    break;
                }
            }
        }
        this.slide.apply(this, [slide, index, false, true, true]);
    },

    setLoopSlideItem: function(slide, targetIndex, animation) {
        var slideItems = slide.retrieve('slideItems');
        var slideInner = slide.retrieve('slideInner');
        var curIndex = slide.retrieve('curIndex');
        if (curIndex == null) {
            curIndex = 0;
        }
        var viewSize = slide.getSize().x;
        var slideInnnerViewSize = 0;
        var emptySize = 0;
        // prev
        if (
            targetIndex < curIndex ||
            (curIndex == 0 && targetIndex == slideItems.length - 1)
        ) {
            if (this.options.alignCenter) {
                slideInnnerViewSize = slideItems[curIndex].getCoordinates(slideInner).left;
                emptySize = viewSize - slideInnnerViewSize;
                if (emptySize == viewSize) {
                    emptySize = slideItems[targetIndex].getComputedSize().totalWidth;
                }
                if (this.options.alignCenter) {
                    emptySize = emptySize - (viewSize / 2 - slideItems[targetIndex].getComputedSize().totalWidth / 2);
                }
                if (emptySize > 0) {
                    while(emptySize > 0) {
                        var slideItem = slide.retrieve('slideItems').pop();
                        slideItem.inject(slideInner, 'top');
                        slideInner.setStyle('margin-left', slideInner.getStyle('margin-left').toInt() - slideItem.getComputedSize().totalWidth);
                        slide.retrieve('slideItems').unshift(slideItem);
                        emptySize = emptySize - slideItem.getComputedSize().totalWidth;
                        targetIndex++;
                        curIndex++;
                        if (targetIndex >= slideItems.length) {
                            targetIndex = 0;
                        }
                        if (curIndex >= slideItems.length) {
                            curIndex = 0;
                        }
                    }
                    slide.store('curIndex', curIndex);
                    this.fireEvent('loopComplete');
                }
                return targetIndex;
            } else {
                if (curIndex == 0 && targetIndex == slideItems.length - 1) {
                    var slideItem = slide.retrieve('slideItems').pop();
                    slideItem.inject(slideInner, 'top');
                    slideInner.setStyle('margin-left', slideInner.getStyle('margin-left').toInt() - slideItem.getSize().x);
                    slide.retrieve('slideItems').unshift(slideItem);
                    slide.store('curIndex', 1);
                    this.fireEvent('loopComplete');                    
                    return 0;
                } else {
                    return targetIndex;
                }
            }
        // next
        } else {
            slideInnnerViewSize = slideItems.getLast().getCoordinates(slideInner).right - slideItems[targetIndex].getCoordinates(slideInner).left;
            emptySize = viewSize - slideInnnerViewSize;
            if (this.options.alignCenter) {
                emptySize = emptySize - (viewSize / 2 - slideItems[targetIndex].getComputedSize().totalWidth / 2);
            }
            if (emptySize > 0) {
                while(emptySize > 0) {
                    var slideItem = slide.retrieve('slideItems').shift();
                    if (animation) {
                        slideItem.setStyle('opacity', 0);
                    }
                    slideInner.adopt(slideItem);
                    slideInner.setStyle('margin-left', slideInner.getStyle('margin-left').toInt() + slideItem.getComputedSize().totalWidth);
                    if (animation) {
                        slideItem.set('tween', {
                            property: 'opacity',
                            duration: this.options.fadeDuration,
                            transition: this.options.fadeTransition
                        }).get('tween').start(1);
                    }
                    slide.retrieve('slideItems').push(slideItem);
                    emptySize = emptySize - slideItem.getComputedSize().totalWidth;
                    targetIndex--;
                    curIndex--;
                    if (targetIndex < 0) {
                        targetIndex = 0;
                    }
                    if (curIndex < 0) {
                        curIndex = 0;
                    }
                }
                slide.store('curIndex', curIndex);
                this.fireEvent('loopComplete');                
            }
            return targetIndex;
        }
    },
    
    slide: function(slide, index, isFirst, stopDragNext, loopFadeIn) {
        var mode = slide.retrieve('slideMode');
        slide.store('slideMode', null);
        
        if (slide.retrieve('isSliding') == null) {
            slide.store('isSliding', true);
            
            if (this.options.animationType == this.animationType.loopHSlide) {
                index = this.setLoopSlideItem.apply(this, [slide, index, loopFadeIn]);
            }
            
            if (slide.hasClass(this.options.slideAutoRotateSelector) || this.options.autoRotate) {
                this.stopRotate.apply(this, [slide]);
            }
            
            var targetSlideItem = slide.retrieve('slideItems')[index];

            if (targetSlideItem) {
                var curIndex = slide.retrieve('curIndex');
                // first load
                if (
                    (this.options.animationType == this.animationType.hSlide || this.options.animationType == this.animationType.loopHSlide) &&
                    curIndex == null
                ) {
                    curIndex = 0;
                }
                if (index == curIndex) {
                    if (stopDragNext != true) {
                        slide.store('isSliding', null);
                        this.next(slide);
                        return;
                    }
                }
                var curSlideItem = slide.retrieve('slideItems')[curIndex];
                var imgs = targetSlideItem.retrieve('imgs') || targetSlideItem.getElements('img');
                var srcs = new Array();
                var loadingImg = false;
                imgs.each(function(img) {
                    srcs.push(img.retrieve('src') || img.get('src'));
                    if (loadingImg == false && img.retrieve('loaded') == null) {
                        loadingImg = true;
                    }
                });
                
                var imgLoaded = function() {
                
                    var slideInner = slide.retrieve('slideInner');
                    var duration = 0;
                    var isNext = true;
                    
                    if (this.options.animationType == this.animationType.fade) {
                        duration = this.options.fadeDuration;
                        targetSlideItem.setStyle('display', 'block');
                        var left = targetSlideItem.getCoordinates(slideInner).left;
                        if (left > 0) {
                            targetSlideItem.setStyle('margin-left', - left);
                        }
                        if (curSlideItem) {
                            curSlideItem.setStyle('margin-left', - curSlideItem.getCoordinates(slideInner).left);
                        
                        }
                        new Fx.Tween(targetSlideItem, {
                            property: 'opacity',
                            duration: this.options.fadeDuration,
                            transition: this.options.fadeTransition,
                            onComplete: function() {
                                slide.store('isSliding', null);
                                if (
                                    (slide.hasClass(this.options.slideAutoRotateSelector) || this.options.autoRotate) &&
                                    this.mouseOver == false
                                ) {
                                    this.startRotate.apply(this, [slide]);
                                }
                                if (isFirst) {
                                    this.fireEvent('firstAnimationComplete');
                                }                                
                            }.bind(this)
                        }).start(1);
                        if (curSlideItem) {
                            new Fx.Tween(curSlideItem, {
                                property: 'opacity',
                                duration: this.options.fadeDuration,
                                transition: this.options.fadeTransition,
                                onComplete: function() {
                                    targetSlideItem.setStyle('margin-left', 0);
                                    curSlideItem.setStyle('display', 'none');
                                }
                            }).start(0);
                        }
                    } else if (
                        this.options.animationType == this.animationType.slide ||
                        this.options.animationType == this.animationType.hSlide ||
                        this.options.animationType == this.animationType.loopHSlide
                    ) {
                        var unFocusOpacity = 1;
                        if (
                            this.options.focusCurrent &&
                            (index != curIndex && stopDragNext != true)
                        ) {
                            unFocusOpacity = this.options.nonActiveOpacity;
                        }
                        var offset = 1
                        if (
                            this.options.considerDistance && stopDragNext != true
                        ) {
                            offset = Math.abs(index - curIndex);
                            if (offset > 1) {
                                offset = offset * 0.5;
                            }
                        }
                        duration = this.options.moveDuration * offset;
                        var transition = this.options.moveTransition;
                        if (stopDragNext) {
                            duration = 300;
                            transition = 'expo:out';
                        }
                        if (curSlideItem) {
                            var slideInnerLeft = - targetSlideItem.getCoordinates(slideInner).left;
                            if (
                                mode && 
                                (this.options.animationType == this.animationType.hSlide ||
                                this.options.animationType == this.animationType.loopHSlide)
                            ) {
                                var curSlideInnerLeft = slideInner.getStyle('margin-left').toInt();
                                var targetSlideSize = targetSlideItem.getSize();
                                var curSlideSize = curSlideItem.getSize();
                                
                                if (curIndex == slide.retrieve('slideItems').length - 1) {
                                    if (mode == 'prev') {
                                        targetSlideSize = slide.retrieve('slideItems')[curIndex - 1].getSize();
                                    } else {
                                        slideInnerLeft = - curSlideItem.getCoordinates(slideInner).left - curSlideSize.x;
                                    }
                                } else {
                                    slideInnerLeft = - targetSlideItem.getCoordinates(slideInner).left;
                                }
                                
                                // next
                                if (mode == 'next') {
                                    if (curSlideInnerLeft - slideInnerLeft > getWindowSize().x) {
                                        slideInnerLeft = curSlideInnerLeft + (getWindowSize().x - curSlideSize.x);
                                        isNext = false;
                                        duration = this.options.moveDuration;
                                    } else {
                                        if (curIndex == slide.retrieve('slideItems').length - 1) {
                                            slideInnerLeft = - targetSlideItem.getCoordinates(slideInner).left;
                                        }
                                    }
                                // prev
                                } else if (mode == 'prev') {
                                    var prevMargin = - curSlideInnerLeft + slideInnerLeft - targetSlideSize.x;
                                    if (prevMargin > 0) {
                                        slideInnerLeft = curSlideInnerLeft + prevMargin;
                                        isNext = false;
                                        duration = this.options.moveDuration;
                                    }
                                }
                            }

                            if (this.options.alignCenter) {
                                var slideSize = slide.getSize();
                                var targetSlideItemSize = targetSlideItem.getComputedSize();
                                slideInnerLeft = slideInnerLeft + slideSize.x / 2 - targetSlideItemSize.totalWidth / 2;
                            }
                            new Fx.Tween(slideInner, {
                                property: 'margin-left',
                                duration: duration,
                                transition: transition
                            }).start(slideInnerLeft).chain(
                                function() {
                                    slide.store('isSliding', null);                                            
                                    if (
                                        (slide.hasClass(this.options.slideAutoRotateSelector) || this.options.autoRotate) &&
                                        this.mouseOver == false
                                    ) {
                                        this.startRotate.apply(this, [slide]);
                                    }
                                    if (isFirst) {
                                        this.fireEvent('firstAnimationComplete');
                                    }
                                }.bind(this)
                            );
                            if (this.options.focusCurrent) {
                                new Fx.Tween(targetSlideItem, {
                                    property: 'opacity',
                                    duration: duration,
                                    transition: this.options.fadeTransition
                                }).start(1);
                                new Fx.Tween(curSlideItem, {
                                    property: 'opacity',
                                    duration: duration,
                                    transition: this.options.fadeTransition
                                }).start(unFocusOpacity);
                            }
                        } else {
                            slide.store('isSliding', null);                        
                            if (
                                (slide.hasClass(this.options.slideAutoRotateSelector) || this.options.autoRotate) &&
                                this.mouseOver == false
                            ) {
                                this.startRotate.apply(this, [slide]);
                            }
                            if (isFirst) {
                                this.fireEvent('firstAnimationComplete');
                            }
                        }
                    }
                    
                    if (isNext) {
                        var targetSlidePageNo = targetSlideItem.retrieve('slidePageNo');
                        if (targetSlidePageNo) {
                            targetSlidePageNo.addClass('slide-page-no-focused');
                            new Fx.Tween(targetSlidePageNo, {
                                property: 'opacity',
                                transition: 'expo:out'
                            }).start(1);
                        }
                        if (curSlideItem) {
                            var curSlidePageNo = curSlideItem.retrieve('slidePageNo');
                            if (curSlidePageNo) {
                                curSlidePageNo.removeClass('slide-page-no-focused');
                                new Fx.Tween(curSlidePageNo, {
                                    property: 'opacity',
                                    transition: 'expo:out'
                                }).start(this.options.navOpacity);
                            }
                        }
                        slide.store('curIndex', index);
                        this.fireEvent('imgLoaded', [index + 1, slide.retrieve('slideItems').length]);
                    } else {
                        this.fireEvent('imgLoaded', [curIndex, slide.retrieve('slideItems').length]);
                    }
                    this.resize.apply(this, [slide, true, duration]);
                }.bind(this);
                
                if (loadingImg) {
                    var slideLoader = new Element('div', { 'class': 'slide-loader' });
                    slide.adopt(slideLoader);
                    slideLoader.position({
                        relativeTo: slide
                    });
                    new Asset.images(srcs, {
                        onProgress: function(counter, index) {
                            var img = imgs[index];
                            if (img.retrieve('src')) {
                                img.set('src', img.retrieve('src'));
                            }
                            img.set('title', null);
                            img.store('loaded', true);
                            img.setStyle('opacity', 1);
                        },
                        onComplete: function() {
                            new Fx.Tween(slideLoader, {
                                property: 'opacity',
                                transition: 'expo:out',
                                onComplete: function() {
                                    slideLoader = slideLoader.destroy();
                                }
                            }).start(0);
                            imgLoaded();
                        }.bind(this)
                    });
                } else {
                    imgLoaded();
                }
            }
        }
    },
    
    allImgLoad: function(slide) {

        var slideLoader = null;
        var loadCount = 0;
        slide.retrieve('slideItems').each(function(slideItem, itemIndex) {
            var imgs = slideItem.retrieve('imgs') || slideItem.getElements('img');
            var srcs = new Array();
            imgs.each(function(img) {
                srcs.push(img.retrieve('src') || img.get('src'));
            }.bind(this));
            
            var imgLoaded = function() {
                if (loadCount == slide.retrieve('slideItems').length) {
                    if (slideLoader) {
                        new Fx.Tween(slideLoader, {
                            property: 'opacity',
                            duration: this.options.fadeDuration,
                            transition: this.options.fadeTransition,
                            onComplete: function() {
                                this.fireEvent('firstAnimationComplete');
                                slideLoader = slideLoader.destroy();
                            }.bind(this)
                        }).start(0);
                    }
                }
            
                var opacity = 0;
                var curIndex = slide.retrieve('curIndex') || 0;
                if (this.options.focusCurrent) {
                    if (itemIndex == curIndex) {
                        opacity = 1;
                    } else {
                        opacity = this.options.nonActiveOpacity;
                    }
                } else {
                    opacity = 1;
                }
                new Fx.Tween(slideItem, {
                    property: 'opacity',
                    duration: this.options.fadeDuration,
                    transition: this.options.fadeTransition
                }).start(opacity);
                
                if (loadCount == slide.retrieve('slideItems').length) {
                    this.resize.apply(this, [slide, true]);
                }
            }.bind(this);
            
            (function() {
                if (srcs.length > 0) {
                    if (slideLoader == null) {
                        slideLoader = new Element('div', { 'class': 'slide-loader' });
                        slide.adopt(slideLoader);
                        slideLoader.position({
                            relativeTo: slide
                        });
                    }
                    new Asset.images(srcs, {
                        onProgress: function(counter, index) {
                            var img = imgs[index];
                            if (img.retrieve('src')) {
                                img.set('src', img.retrieve('src'));
                            }
                            img.set('title', null);
                            img.setStyle('opacity', 1);
                            img.store('loaded', true);
                        }.bind(this),
                        onComplete: function() {
                            if (itemIndex == 0 && this.options.alignCenter) {
                                var curIndex = slide.retrieve('curIndex') || 0;
                                var targetSlideItem = slide.retrieve('slideItems')[curIndex];
                                var slideInner = slide.retrieve('slideInner');
                                var slideSize = slide.getSize();
                                var targetSlideItemSize = targetSlideItem.getComputedSize();
                                slide.retrieve('slideInner').setStyle('margin-left', 
                                    - targetSlideItem.getCoordinates(slideInner).left + 
                                    slideSize.x / 2 - targetSlideItemSize.totalWidth / 2
                                );
                            }
                            loadCount++;
                            imgLoaded();
                        }.bind(this)
                    });
                } else {
                    loadCount++;
                    imgLoaded();            
                }
            }.bind(this)).delay(250 * itemIndex);
        }.bind(this));

    },
    
    resize: function(slide, animation, duration) {
        var slides = new Array();
        if (slide == null) {
            slides = $$(this.options.slideContainerSelector);
        } else {
            slides.push(slide);
        }
        slides.each(function(slide) {
            var curSlideSize = slide.getComputedSize();
            var curIndex = slide.retrieve('curIndex') || 0;
            if (slide.retrieve('slideItems')) {
                var slideItems = slide.retrieve('slideItems');
                var curSlideItem = slideItems[curIndex];
                var slideInner = slide.retrieve('slideInner');
                var slidePrev = slide.retrieve('slidePrev');
                var slideNext = slide.retrieve('slideNext');
                var slidePageNav = slide.retrieve('slidePageNav');
                var baseSize = null;
                var slideWidth = 'auto';
                var slideHeight = 'auto';
                var innerWidth = 0;
                var innerHeight = 0;

                if (
                    this.options.animationType == this.animationType.hSlide ||
                    this.options.animationType == this.animationType.loopHSlide
                ) {
                    if (Browser.ie6) {
                        slideWidth = '100%';
                    }
                    slide.setStyle('width', slideWidth);
                    var slideParent = slide.getParent();
                    if (slideParent) {
                        slideWidth = slideParent.getSize().x - 
                            slide.getStyle('margin-left').toInt() - 
                            slide.getStyle('margin-right').toInt() - 
                            slideParent.getStyle('padding-left').toInt() - 
                            slideParent.getStyle('padding-right').toInt();
                    }
                }
                
                slideItems.each(function(slideItem) {
                    var size = slideItem.getComputedSize();
                    innerWidth += size.totalWidth
                    innerHeight = Math.max(innerHeight, size.totalHeight);
                }.bind(this));
                var curSlideItemSize = curSlideItem.getComputedSize();
                if (
                    this.options.animationType == this.animationType.fade ||
                    this.options.animationType == this.animationType.slide
                ) {
                    innerHeight = curSlideItemSize.totalHeight;
                    slideWidth = curSlideItemSize.totalWidth;
                } else if (this.options.animationType == this.animationType.loopHSlide) {
                    var emptyLeft = 0;
                    if (this.options.alignCenter) {
                        emptyLeft = slide.getSize().x / 2 - curSlideItemSize.totalWidth / 2;
                    }
                    var innerLeft = 0;
                    var isLoop = false;
                    if (this.options.alignCenter) {
                        if (curIndex == 0) {
                            while (emptyLeft > innerLeft) {
                                var slideItem = slide.retrieve('slideItems').pop();
                                slideItem.inject(slideInner, 'top');
                                slideInner.setStyle('margin-left', slideInner.getStyle('margin-left').toInt() - slideItem.getComputedSize().totalWidth);
                                slide.retrieve('slideItems').unshift(slideItem);
                                innerLeft = innerLeft + slideItem.getComputedSize().totalWidth;
                                curIndex++;
                                slide.store('curIndex', curIndex);
                                isLoop = true;
                            }
                        }
                    }
                    slideItems = slide.retrieve('slideItems');
                    while (
                        slide.getSize().x > innerWidth - slideItems.getLast().getComputedSize().totalWidth - innerLeft || 
                        slide.getSize().x > innerWidth - slideItems[0].getComputedSize().totalWidth - innerLeft
                    ) {
                        slideItems.each(function(slideItem) {
                            var cloneSlideItem = slideItem.clone();
                            slide.retrieve('slideItems').push(cloneSlideItem);
                            slideInner.adopt(cloneSlideItem);
                            innerWidth = innerWidth + cloneSlideItem.getComputedSize().totalWidth;
                        }.bind(this));
                        isLoop = true;
                    }
                    if (isLoop) {
                        this.fireEvent('loopComplete');
                    }
                }

                slideHeight = innerHeight;
                if (this.options.positionPageNav == this.side.outside && slidePageNav) {
                    slideHeight = slideHeight + slidePageNav.getComputedSize().totalHeight;
                }
        
                var sizeChanged = function() {
                    if (slideWidth != curSlideSize.totalWidth || slideHeight != curSlideSize.totalHeight) {
                        this.fireEvent('sizeChanged');
                    }
                }.bind(this);
                
                if (duration == null) {
                    duration = this.options.moveDuration;
                }
                if (slide.retrieve('firstResized') == null) {
                    slide.store('firstResized', true);
                    duration = 0;
                }
                if (
                    this.options.animationType == this.animationType.hSlide ||
                    this.options.animationType == this.animationType.loopHSlide
                ) {
                    slideInner.setStyle('width', innerWidth);
                    slide.setStyle('width', slideWidth);
                    if (duration == 0) {
                        slideInner.setStyles({
                            height: innerHeight
                        });
                        slide.setStyles({
                            height: slideHeight
                        });
                        sizeChanged();
                    } else {
                        new Fx.Tween(slideInner, {
                            property: 'height',
                            duration: duration,
                            transition: this.options.moveTransition
                        }).start(innerHeight);
                        new Fx.Tween(slide, {
                            property: 'height',
                            duration: duration,
                            transition: this.options.moveTransition,
                            onComplete: function() {
                                sizeChanged();
                            }.bind(this)
                        }).start(slideHeight);
                    }
                } else {
                    if (duration == 0) {
                        slideInner.setStyles({
                            width: innerWidth,
                            height: innerHeight
                        });
                        slide.setStyles({
                            width: slideWidth,
                            height: slideHeight
                        });
                        sizeChanged();
                    } else {
                        new Fx.Morph(slideInner, {
                            duration: duration,
                            transition: this.options.moveTransition
                        }).start({
                            width: innerWidth,
                            height: innerHeight
                        });
                        new Fx.Morph(slide, {
                            duration: duration,
                            transition: this.options.moveTransition,
                            onComplete: function() {
                                sizeChanged();
                            }.bind(this)
                        }).start({
                            width: slideWidth,
                            height: slideHeight
                        });
                    }
                }
                if (slidePrev && slideNext) {
                    if (duration == 0) {
                        slidePrev.setStyles({
                            top:  - innerHeight,
                            height: innerHeight
                        });
                        slideNext.setStyles({
                            top:  - innerHeight,
                            height: innerHeight
                        });
                    } else {
                        new Fx.Morph(slidePrev, {
                            duration: duration,
                            transition: this.options.moveTransition
                        }).start({
                            top:  - innerHeight,
                            height: innerHeight
                        });
                        
                        new Fx.Morph(slideNext, {
                            duration: duration,
                            transition: this.options.moveTransition
                        }).start({
                            top:  - innerHeight,
                            height: innerHeight
                        });
                    }
                }
                if (slidePageNav) {
                    if (this.options.positionPageNav == this.side.inside) {
                        slidePageNav.setStyle('top', - slidePageNav.getSize().y);
                    }
                }
            }
        }.bind(this));
    },
    
    next: function(slide, navClicked) {
        var curIndex = slide.retrieve('curIndex');
        if (navClicked) {
            slide.store('slideMode', 'next');
        }
        if (curIndex + 1 < slide.retrieve('slideItems').length) {
            this.slide.apply(this, [slide, curIndex + 1]);
        } else {
            this.slide.apply(this, [slide, 0]);
        }
    },
    
    prev: function(slide, navClicked) {
        var curIndex = slide.retrieve('curIndex');
        if (navClicked) {
            slide.store('slideMode', 'prev');
        }
        if (curIndex - 1 >= 0) {
            this.slide.apply(this, [slide, curIndex - 1]);
        } else {
            this.slide.apply(this, [slide, slide.retrieve('slideItems').length - 1]);
        }
    },
    
    startRotate: function(slide) {
        var relative = this.wrapper;
        if (this.wrapper) {
            relative = $(document.body);
        }
        if (slide.retrieve('timer') == null) {
            var timer = (function() {
                var coordinates = slide.getCoordinates(relative);
                if (
                    window.getScrollTop() + getWindowSize().y > coordinates.top &&
                    window.getScrollTop() < coordinates.bottom
                ) {
                    this.next.apply(this, [slide]);
                }
            }.bind(this)).periodical(this.options.rotatePeriodical);
            slide.store('timer', timer);
        }
    },
    
    stopRotate: function(slide) {
        var slideContainers = new Array();
        if (slide == null) {
            slideContainers = $$(this.options.slideContainerSelector);
        } else {
            slideContainers.push(slide);
        }
    
        slideContainers.each(function(slide) {
            if (slide.retrieve('timer')) {
                clearTimeout(slide.retrieve('timer'));
                slide.store('timer', null);
            }
        }.bind(this));
    }
});

/* 
---------------------------------------------------------------------------------------------------
    Scrollbar
---------------------------------------------------------------------------------------------------
*/
var Scrollbar = new Class({
	Implements: [Options],
    resizeTimer: null,
	options: {
		wheel: true,
        autoResize: false,
        scrollSelector: '.scroll',
        expandHeight: false,
        knobOpacity: 0.3,
        hideScrollBar: false,
        scrollAmount: 100
	},
	
	initialize: function(options) {
		this.setOptions(options);
    },
    
    run: function() {
        $$(this.options.scrollSelector).each(function(scroll) {
            if (scroll.getParent('.scroll-root') == null) {
                var scrollRoot = new Element('div', {
                    'class': 'scroll-root'
                });
                scroll.store('scrollRoot', scrollRoot);
                
                var scrollWrapper = new Element('div', {
                    'class': 'scroll-wrapper',
                    styles: {
                        overflow: 'hidden'
                    }
                });
                if (this.options.expandHeight) {
                    scrollWrapper.setStyle('height', getWindowSize().y);
                }
                scroll.store('scrollWrapper', scrollWrapper);
                scrollWrapper.wraps(scroll);
                scrollRoot.wraps(scrollWrapper);
                
                var scrollBar = new Element('div',{
                    'class': 'scrollbar',
                    styles: {
                        height: scrollWrapper.getSize().y
                    }
                });
                scroll.store('scrollBar', scrollBar);
                scrollRoot.adopt(scrollBar);
                var knob = new Element('div',{
                    'class': 'scroll-knob',
                    styles: {
                        width: scrollBar.getSize().x,
                        opacity: this.options.knobOpacity
                    }
    			});
                var knobFx = new Fx.Tween(knob, {
                    property: 'opacity',
                    link: 'cancel',
                    transition: 'expo:out',
                    duration: 'short'
                });
                scroll.store('knobFx', knobFx);
                var knobActive = false;
                knob.addEvents({
                    'mouseenter': function() {
                        knobFx.start(1);
                    }.bind(this),
                    'mouseleave': function() {
                        if (knobActive == false) {
                            knobFx.start(this.options.knobOpacity);
                        }
                    }.bind(this),
                    mousedown: function() {
                        knobActive = true;
                        knobFx.start(1);
                        if ($(document.body).retrieve('knobMouseUpEvent') == null) {
                            $(document.body).store('knobMouseUpEvent', function(event) {
                                knobFx.start(this.options.knobOpacity);
                            }.bind(this));
                        }
                        $(document.body).addEvent('mouseup', $(document.body).retrieve('knobMouseUpEvent'));
                    }.bind(this),
                    mouseup: function() {
                        knobActive = false;
                        knobFx.start(this.options.knobOpacity);
                        $(document.body).removeEvent('mouseup', $(document.body).retrieve('knobMouseUpEvent'));
                    }.bind(this)
                });
                scroll.store('knob', knob);
                scrollBar.adopt(knob);
                scroll.addClass('scroll');
                
                scrollBar.setStyle('height', scrollWrapper.getSize().y);
                if (this.options.hideScrollBar) {
                    scrollBar.store('defaultWidth', scrollBar.getSize().x);
                    scrollBar.setStyles({
                        width: 0,
                        left: scrollWrapper.getSize().x,
                        padding: 0,
                        overflow: 'hidden'

                    });
                    scrollRoot.addEvents({
                        mouseenter: function() {
                            scrollBar.set('tween', {
                                property: 'width',
                                duration: 500,
                                transition: 'expo:out'
                            }).get('tween').start(scrollBar.retrieve('defaultWidth'));
                        },
                        mouseleave: function() {
                            scrollBar.set('tween', {
                                property: 'width',
                                duration: 500,
                                transition: 'expo:out'
                            }).get('tween').start(0);
                        }
                    });   
                }
                
                var steps = scrollWrapper.getScrollSize().y - scrollWrapper.getSize().y;
                scrollWrapper.scrollTo(0,0);
                if (steps <= 0) {
                    scrollBar.setStyle('display', 'none');
                    knob.setStyle('display', 'none');
                }
                var knobScrollFx = new Fx.Tween(knob, {
                    property: 'top',
                    link: 'cancel',
                    transition: 'expo:out',
                    onComplete: function() {
                        knobFx.start(this.options.knobOpacity);
                    }.bind(this)
                });
                scroll.store('knobScrollFx', knobScrollFx);
                var scrollWrapperFx = new Fx.Scroll(scrollWrapper, {
                    link: 'cancel',
                    transition: 'expo:out',
                    wheelStops: false
                });
                scroll.store('scrollWrapperFx', scrollWrapperFx);

                var prevPos = 0;
                var slider = new Slider(scrollBar, knob, {	
                    initialStep: 0,
        			mode: 'vertical',
        			onChange: function(step){
                        if (scroll.retrieve('slider') == null) {
                            return;
                        }
                        var x = 0;
        				var y = step;
        				scrollWrapperFx.start(x, y);
        			}.bind(this),
                    onTick: function(pos){
                        if (typeOf(pos) != 'number') {
                            return;
                        }
                        if (scroll.retrieve('slider') == null) {
                            prevPos = 0;
                            return;
                        }
                        if (prevPos != pos && scroll.retrieve('resizeSlider') == null) {
                            knobFx.start(1);
                            knobScrollFx.start(pos);
                        }
                        prevPos = pos;
                    }.bind(this)
        		});
                this.resize.apply(this, [[scroll]]);
                scroll.store('resizeSlider', true);
                slider.setRange([0, steps]);
                slider.set(0);
                Function.attempt(function(){
                    return slider.autosize();
                });                
                scroll.store('resizeSlider', null);                                
                scroll.store('slider', slider);
                
                scrollRoot.removeEvent('mousewheel', scrollRoot.retrieve('mouseWheelEvent'));
                scrollRoot.store('mouseWheelEvent', function(event) {
        			event.stop();
        			var step = slider.step + ((event.wheel > 0) ? -1 : 1) * this.options.scrollAmount;	
        			slider.set(step);					
                }.bind(this));
                scrollRoot.addEvent('mousewheel', scrollRoot.retrieve('mouseWheelEvent'));
                if (Browser.Platform.ios) {
                    var startStep = 0;
                    var startY = 0;
                    var moved = false;
                    scrollRoot.store('touchStartEvent', function(event) {

                        event.preventDefault();
                        var touch = event.touches[0];
                        moved = false;
            		    startStep = slider.step;
            		    startY = touch.pageY;
                    });
                    scrollRoot.store('touchMoveEvent', function(event) {
                        event.preventDefault();
                        moved = true;
                        var touch = event.touches[0];
                        var deffY = touch.pageY - startY;
                        var step = startStep - deffY;
            			slider.set(step);					
                    });
                    scrollRoot.store('touchEndEvent', function(event) {
                        event.preventDefault();
                        if (moved == false) {
                            var clickEvent = document.createEvent('MouseEvents');
                            clickEvent.initEvent('click', false, true);
                            event.target.dispatchEvent(clickEvent);
                        }
                    });
                    scrollRoot.addEvent('touchstart', scrollRoot.retrieve('touchStartEvent'));
                    scrollRoot.addEvent('touchmove', scrollRoot.retrieve('touchMoveEvent'));
                    scrollRoot.addEvent('touchend', scrollRoot.retrieve('touchEndEvent'));
                }
            }
        }.bind(this));
        if (this.options.autoResize) {
            this.autoResize.apply(this);
        }
	},
    
    resize: function(scrolls) {
        if (scrolls == null || scrolls.length == 0) {
            scrolls = $$(this.options.scrollSelector);
        }
        scrolls.each(function(scroll) {
            if (scroll == null) {
                return;
            }
            var scrollWrapper = scroll.retrieve('scrollWrapper');
            if (scrollWrapper == null) {
                clearTimeout(this.resizeTimer);
                this.resizeTimer = null;
                return;                
            }
            if (this.options.expandHeight) {
                scrollWrapper.setStyle('height', getWindowSize().y);
            }
            
            var scrollBar = scroll.retrieve('scrollBar');
            var knob = scroll.retrieve('knob');
            var slider = scroll.retrieve('slider');
            var steps = scrollWrapper.getScrollSize().y - scrollWrapper.getSize().y;
            var curSteps = null;
            if (slider) {
                curSteps = slider.range;
            }
            if (curSteps != steps) {
                if (steps <= 0) {
                    scrollBar.setStyle('display', 'none');
                    knob.setStyle('display', 'none');
                } else {
                    scrollBar.setStyles({
                        display: 'block',
                        height: scrollWrapper.getSize().y
                    });
                    if (this.options.hideScrollBar) {
                        scrollBar.setStyles({
                            left: scrollWrapper.getSize().x
                        });
                    }
                    knob.setStyle('display', 'block');
                    var knobHeight = Math.floor(scrollBar.getSize().y * (scrollWrapper.getSize().y / scrollWrapper.getScrollSize().y));
                    knob.setStyle('height', knobHeight);
                }
                if (slider) {
                    var step = slider.step;
                    scroll.store('resizeSlider', true);
                    slider.setRange([0, steps]);
                    slider.set(step);
                    Function.attempt(function(){
                        return slider.autosize();
                    });                
                    scroll.store('resizeSlider', null);
                }
            }
        }.bind(this));
    },
    
    cancel: function(scrolls) {
        if (scrolls == null || scrolls.length == 0) {
            scrolls = $$(this.options.scrollSelector);
        }
        scrolls.each(function(scroll) {
            if (scroll == null) {
                return;
            }
            scroll.retrieve('knobFx').cancel();
            scroll.retrieve('scrollWrapperFx').cancel();
            scroll.retrieve('knobScrollFx').cancel();
        }.bind(this));
    },
    
    autoResize: function() {
        if (this.resizeTimer == null) {
            this.resizeTimer = (function() {
                var scrolls = $$(this.options.scrollSelector);
                if (scrolls.length > 0) {
                    this.resize.apply(this, [scrolls]);
                } else {
                    clearTimeout(this.resizeTimer);
                    this.resizeTimer = null;
                }
            }.bind(this)).periodical(200);
            
            this.resize.apply(this, [$$(this.options.scrollSelector)]);
        }
    }
});

/*
---------------------------------------------------------------------------------------------------
    DropDown Menu
---------------------------------------------------------------------------------------------------
*/
var DropDownMenu = new Class({
	Implements: [Options,Events],
    options: {
        duration: 250,
        transition: 'expo:out',
        delay: 500,
        opacity: 1,
        dropDownSelector: '.dropdown',
        dropDownWidth: 'auto'
    },
    initialize: function(options) {
        this.setOptions(options);
        
        $$(this.options.dropDownSelector).each(function(dropdown) {

            if (this.options.dropDownWidth == 'full') {
                dropdown.setStyles('position', 'relative');
                if (Browser.ie6) {
                    dropdown.setStyle('width', '100%');
                }
            }
            dropdown.getElements('li').each(function(parent) {
            
                parent.addClass(this.options.dropDownSelector + '-parent');
                if (this.options.dropDownWidth == 'auto') {
                    parent.setStyle('position', 'relative');
                }
                
                var child = parent.getElement('ul');
                if (child) {
                    if (this.options.dropDownWidth == 'full') {
                        child.setStyle('width', dropdown.getComputedSize().totalWidth);
                    }
                    child.store('defaultHeight', child.getDimensions({computeSize:true}).totalHeight);
                    child.setStyles({
                        position: 'absolute',
                        left: 0,
                        display: 'none',
                        overflow: 'hidden',
                        height: 0,
                        opacity: 0,
                        'z-index': 1
                    });
                    parent.addEvents({
                        mouseenter: function() {
                            clearTimeout(dropdown.retrieve('backTimer'));
                            dropdown.store('backTimer', null);
                        
                            if (dropdown.retrieve('activeChild')) {
                                this.hideMenu.apply(this, [dropdown.retrieve('activeChild')]);
                                dropdown.store('activeChild', null);
                            }
                            
                            dropdown.store('activeChild', child);
                            child.setStyle('display', 'block');
                            child.set('morph', {
                                duration: this.options.duration,
                                transition: this.options.transition,
                                link: 'cancel'
                            }).get('morph').start({
                                opacity: this.options.opacity,
                                height: child.retrieve('defaultHeight')
                            });
                        }.bind(this),
                        
                        mouseleave: function() {
                            var timer = (function() {
                                this.hideMenu.apply(this, [child]);
                                dropdown.store('activeChild', null);
                            }.bind(this)).delay(this.options.delay);
                            dropdown.store('backTimer', timer);
                        }.bind(this)
                    });
                }
            }.bind(this));
        }.bind(this));
    },
    
    hideMenu: function(child) {
        child.set('morph', {
            duration: this.options.duration * 3,
            transition: this.options.transition,
            link: 'cancel'
        }).get('morph').start({
            opacity: 0,
            height: 0
        });
    }
    
});

/* 
---------------------------------------------------------------------------------------------------
    Background
---------------------------------------------------------------------------------------------------
*/
var Background = new Class({
	Implements: [Options,Events],
    isSliding: false,
    scrollTimer: null,
    resizeTimer: null,
    container: null,
    backgrounds: new Array(),
    backgroundImages: new Array(),
    options: {
        containerIdName: 'background-container',
        backgroundSelector: '.background',
        duration: 1000,
        transition: 'sine:in:out',
        stretching: true,
        showAll: true,
        marginTop: 0,
        marginLeft: 0,
		onImgLoading: function(){},
		onImgLoaded: function(){},
		onAnimationComplete: function(){}
    },
    initialize: function(options) {
        this.setOptions(options);
        
        this.container = $(this.options.containerIdName);
        if (this.container == null) {
            this.container = new Element('div', {
                'id': this.options.containerIdName
            });
        }
    },

    run: function() {
        this.backgrounds = $$(this.options.backgroundSelector);
        this.backgrounds = this.backgrounds.dispose();
        this.container.adopt(this.backgrounds);
        this.backgrounds.each(function(background, index) {
            background.setStyles({
                position: 'fixed',
                top: 0,
                width: '100%',
                overflow: 'hidden',
                'z-index': -10
            })
            if (Browser.ie6 || Browser.Platform.ios) {
                background.setStyle('position', 'absolute');
            }
            var backgroundImage = background.getElement('img');
            backgroundImage.addClass('background-image');
            backgroundImage.addClass('background-trim');
            if (backgroundImage.retrieve('src') == null) {
                backgroundImage.store('src', backgroundImage.get('src'));
            }
            backgroundImage.set('src', null);
            backgroundImage.setStyles({
                position: 'absolute',
                top: 0,
                'z-index': index,
                opacity: 0
            });
            this.backgroundImages.push(backgroundImage);
            
        }.bind(this));
        
        this.container.store('curIndex', null);
        
        this.adjust.apply(this);
        
        if (this.container.retrieve('background-setting') == null) {
            this.container.store('background-setting', true);
            window.addEvents({
                resize: function() {
                    clearTimeout(this.resizeTimer);
                    this.resizeTimer = (function() {
                        this.adjust.apply(this);
                    }.bind(this)).delay(200);
                }.bind(this),
                scroll: function() {
                    var index = 0;
                    if (this.container) {
                        index = this.container.retrieve('curIndex');
                    }
                    this.scrollImg.apply(this, [index]);
                }.bind(this)
            });
            
            if (this.options.showAll) {
                var draggable = false;
    
                var startX = 0;
                var startY = 0;
                var curLeft = 0;
                var curTop = 0;
                var cursor = this.container.getStyle('cursor');
                this.container.addEvents({
                    mousedown: function(event) {
                        event.stop();
                        if (this.backgroundImages.length > 0) {
                            var curIndex = this.container.retrieve('curIndex');
                            var img = this.backgroundImages[curIndex || 0];
                            startX = event.client.x;
                            startY = event.client.y;
                            curLeft = img.getStyle('margin-left').toInt();
                            curTop = img.getStyle('margin-top').toInt();
                            draggable = true;
                        }
                    }.bind(this),
                    mousemove: function(event) {
                        if (draggable) {
                            if (this.backgroundImages.length > 0) {
                                this.container.setStyle('cursor', 'move');
                                var windowSize =  getWindowSize();
                                var containerSize = this.container.getSize();
                                var containerWidth = containerSize.x || windowSize.x;
                                var containerHeight = containerSize.y || windowSize.y;
                                var containerCoordinates = this.container.getCoordinates($('wrapper') || $(document.body));
                                var mouseX = event.client.x - containerCoordinates.left;
                                var mouseY = event.client.y - containerCoordinates.top;
                                var curIndex = this.container.retrieve('curIndex');
                                var img = this.backgroundImages[curIndex || 0];
                                clearTimeout(img.retrieve('timer'));
                                img.addClass('background-animating');
                                if (img.hasClass('background-trim') && img.retrieve('animation') == null) {
                                    var imgSize = img.getSize();
                                    var minLeft = - (imgSize.x - containerWidth);
                                    var maxLeft = 0;
                                    var left = curLeft - (startX - event.client.x);
                                    if (left < minLeft) {
                                        left = minLeft;
                                    } else if (left > maxLeft) {
                                        left = maxLeft;
                                    }
                                    var minTop = - (imgSize.y - containerHeight);
                                    var maxTop = 0;
                                    var top = curTop - (startY - event.client.y);
                                    if (top < minTop) {
                                        top = minTop;
                                    } else if (top > maxTop) {
                                        top = maxTop;
                                    }
                                    img.setStyles({
                                        'margin-top': top,
                                        'margin-left': left
                                    });
                                }
                                img.store('timer', (function() {
                                    img.removeClass('background-animating');
                                }).delay(100));
                            }
                        }
                    }.bind(this),
                    mouseup: function(event) {
                        this.container.setStyle('cursor', cursor);
                        draggable = false;
                    }.bind(this),
                    mouseleave: function() {
                        this.container.setStyle('cursor', cursor);
                        draggable = false;
                    },
                    click: function(event) {
                        if (startX == event.client.x && startY == event.client.y) {
                            this.backgroundImages.each(function(img) {
                                if (img.hasClass('background-trim')) {
                                    img.removeClass('background-trim');
                                } else {
                                    img.addClass('background-trim');
                                }
                            });
                            this.stretchImg.apply(this, [this.container.retrieve('curIndex') || 0, true]);
                        }
                    }.bind(this)
                });
            }
        }
    },
    
    adjust: function(index, curIndex) {
        //$(document.body).setStyle('overflow', 'hidden');
        
        var containerSize = this.container.getSize();
        var w = containerSize.x || getDocumentSize().x;
        var h = containerSize.y || getWindowSize().y;
        if (Browser.Platform.ios) {
            h = '100%';
        }
        this.backgrounds.each(function(background) {
            background.setStyles({
                height: h
            });
            if (this.options.marginTop || this.options.marginLeft) {
                if (Browser.Platform.ios) {
                    h = background.getSize().y;
                }
                background.setStyles({
                    'margin-top': this.options.marginTop,
                    'margin-left': this.options.marginLeft,
                    width: w - this.options.marginLeft * 2,
                    height: h - this.options.marginTop * 2
                });
            }
        }.bind(this));

        this.slide.apply(this, [index, curIndex]);

        //$(document.body).setStyle('overflow', 'visible');        
    },
    
    stretchImg: function(index, animation) {
        var background = this.backgrounds[0];
        if (background == null) {
            return;
        }
        var containerSize = this.container.getSize();
        var w = containerSize.x || getDocumentSize().x;
        var h = containerSize.y || getWindowSize().y;
        var imgs = new Array();
        
        if (index != null) {
            if (index < this.backgroundImages.length) {
                var img = this.backgroundImages[index];
                imgs.push(img);
            }
        } else {
            imgs = this.backgroundImages;
        }
        imgs.each(function(img) {
            var imgSize = img.getSize();
            if (this.options.stretching) {
                var rate = 0;
                var imgWidth = 0;
                var imgHeight = 0;
                if (this.options.showAll && img.hasClass('background-trim') == false) {
                    rate = Math.min(w / imgSize.x, h / imgSize.y);
                    imgWidth = Math.floor(imgSize.x * rate);
                    imgHeight = Math.floor(imgSize.y * rate);
                } else {
                    rate = Math.max(w / imgSize.x, h / imgSize.y);
                    imgWidth = Math.floor(imgSize.x * rate);
                    imgHeight = Math.floor(imgSize.y * rate);
                }
                if (animation == true) {
                    img.addClass('background-animating');
                    img.store('animation', true);
                    img.set('morph', {
                        duration: 1000,
                        transition: 'expo:in:out',
                        link: 'cancel',
                        onComplete: function() {
                            img.store('animation', null);
                        }
                    }).get('morph').start({
                        width: imgWidth,
                        height: imgHeight,
                        'margin-top': (h / 2) - (imgHeight / 2),
                        'margin-left': (w / 2) - (imgWidth / 2)
                    }).chain(
                        function() {
                            img.removeClass('background-animating');
                        }
                    );
                } else {
                    img.setStyles({
                        width: imgWidth,
                        height: imgHeight,
                        'margin-top': (h / 2) - (imgHeight / 2),
                        'margin-left': (w / 2) - (imgWidth / 2)
                    });
                }
            } else {
                img.setStyles({
                    'margin-left': (w / 2) - (imgSize.x / 2)
                });
            }
        }.bind(this));
    },
    
    slide: function(index, curIndex) {
        if (this.isSliding == false) {
            this.isSliding = true;
            
            var wrapper = $('wrapper');
            if (index == null) {
                if (this.container.retrieve('curIndex') == null) {
                    index = 0;
                } else {
                    index = this.container.retrieve('curIndex');
                }
            }
            if (curIndex == null) {
                if (this.container.retrieve('curIndex') != null) {
                    curIndex = this.container.retrieve('curIndex');
                }
            }
            if (index == curIndex) {
                this.isSliding = false;                        
                this.stretchImg(index);
                return;
            }
            var img = this.backgroundImages[index];
            if (img) {
                new Asset.images([img.retrieve('src')], {
                    onProgress: function(counter, index) {
                        this.fireEvent('imgLoading');
                    }.bind(this),
                    onComplete: function() {
                        
                        this.scrollImg(index);
                        img.set('src', img.retrieve('src'));
                        img.addClass('background-animating');
                        new Fx.Tween(img, {
                            property: 'opacity',
                            duration: this.options.duration,
                            transition: this.options.transition,
                            onComplete: function() {
                                img.removeClass('background-animating');
                                this.isSliding = false;
                                this.fireEvent('animationComplete', [ index, curIndex ]);
                            }.bind(this)
                        }).start(1);
                        if (curIndex != null && this.backgroundImages[curIndex]) {
                            this.backgroundImages[curIndex].addClass('background-animating');
                            new Fx.Tween(this.backgroundImages[curIndex], {
                                property: 'opacity',
                                duration: this.options.duration,
                                transition: this.options.transition,
                                onComplete: function() {
                                    this.backgroundImages[curIndex].removeClass('background-animating');
                                }.bind(this)
                            }).start(0);
                        }
                        this.container.store('curIndex', index);
                        this.stretchImg(index);
                        this.fireEvent('imgLoaded', [ index, curIndex ]);
                    }.bind(this)
                });
            } else {
                this.isSliding = false;            
                this.fireEvent('imgLoaded', [ index, curIndex ]);        
                this.fireEvent('animationComplete', [ index, curIndex ]);
            }
        }
    },
    
    next: function() {
        var curIndex = this.container.retrieve('curIndex');
        if (curIndex + 1 < this.backgroundImages.length) {
            this.adjust.apply(this, [curIndex + 1, curIndex]);
        } else {
            this.adjust.apply(this, [0, curIndex]);
        }
    },
    
    prev: function() {
        var curIndex = this.container.retrieve('curIndex');
        if (curIndex - 1 >= 0) {
            this.adjust.apply(this, [curIndex - 1, curIndex]);
        } else {
            this.adjust.apply(this, [this.backgroundImages.length - 1, 0]);
        }
    },
    
    scrollImg: function(index) {
        if (Browser.ie6) {
            if (index < this.backgrounds.length) {
                var imgWrapper = this.backgrounds[index];
                if (imgWrapper) {
                    imgWrapper.setStyles({
                        top: window.getScrollTop(),
                        left: window.getScrollLeft()
                    });
                }
            }
        }
    },
    
    clear: function() {
        this.container.empty();
        if (this.container.retrieve('mousemoveEvent')) {
            $(document.body).removeEvent('mousemove', this.container.retrieve('mousemoveEvent'));
        }
        this.backgrounds = new Array();
        this.backgroundImages = new Array();
    }
});

