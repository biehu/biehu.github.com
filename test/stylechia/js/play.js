/*
 * Swiper 2.1 - Mobile Touch Slider
 * http://www.idangero.us/sliders/swiper/
 *
 * Copyright 2012-2013, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Updated on: August 22, 2013
*/
var Swiper=function(f,b){function g(a){return document.querySelectorAll?document.querySelectorAll(a):jQuery(a)}function h(){var c=y-l;b.freeMode&&(c=y-l);b.slidesPerView>a.slides.length&&(c=0);0>c&&(c=0);return c}function n(){function c(c){var d=new Image;d.onload=function(){a.imagesLoaded++;if(a.imagesLoaded==a.imagesToLoad.length&&(a.reInit(),b.onImagesReady))b.onImagesReady(a)};d.src=c}a.browser.ie10?(a.h.addEventListener(a.wrapper,a.touchEvents.touchStart,z,!1),a.h.addEventListener(document,a.touchEvents.touchMove,
A,!1),a.h.addEventListener(document,a.touchEvents.touchEnd,B,!1)):(a.support.touch&&(a.h.addEventListener(a.wrapper,"touchstart",z,!1),a.h.addEventListener(a.wrapper,"touchmove",A,!1),a.h.addEventListener(a.wrapper,"touchend",B,!1)),b.simulateTouch&&(a.h.addEventListener(a.wrapper,"mousedown",z,!1),a.h.addEventListener(document,"mousemove",A,!1),a.h.addEventListener(document,"mouseup",B,!1)));b.autoResize&&a.h.addEventListener(window,"resize",a.resizeFix,!1);t();a._wheelEvent=!1;if(b.mousewheelControl){void 0!==
document.onmousewheel&&(a._wheelEvent="mousewheel");try{WheelEvent("wheel"),a._wheelEvent="wheel"}catch(d){}a._wheelEvent||(a._wheelEvent="DOMMouseScroll");a._wheelEvent&&a.h.addEventListener(a.container,a._wheelEvent,N,!1)}b.keyboardControl&&a.h.addEventListener(document,"keydown",O,!1);if(b.updateOnImagesReady){document.querySelectorAll?a.imagesToLoad=a.container.querySelectorAll("img"):window.jQuery&&(a.imagesToLoad=g(a.container).find("img"));for(var e=0;e<a.imagesToLoad.length;e++)c(a.imagesToLoad[e].getAttribute("src"))}}
function t(){if(b.preventLinks){var c=[];document.querySelectorAll?c=a.container.querySelectorAll("a"):window.jQuery&&(c=g(a.container).find("a"));for(var d=0;d<c.length;d++)a.h.addEventListener(c[d],"click",P,!1)}if(b.releaseFormElements)for(c=document.querySelectorAll?a.container.querySelectorAll("input, textarea, select"):g(a.container).find("input, textarea, select"),d=0;d<c.length;d++)a.h.addEventListener(c[d],a.touchEvents.touchStart,Q,!0);if(b.onSlideClick)for(d=0;d<a.slides.length;d++)a.h.addEventListener(a.slides[d],
"click",R,!1);if(b.onSlideTouch)for(d=0;d<a.slides.length;d++)a.h.addEventListener(a.slides[d],a.touchEvents.touchStart,S,!1)}function v(){if(b.onSlideClick)for(var c=0;c<a.slides.length;c++)a.h.removeEventListener(a.slides[c],"click",R,!1);if(b.onSlideTouch)for(c=0;c<a.slides.length;c++)a.h.removeEventListener(a.slides[c],a.touchEvents.touchStart,S,!1);if(b.releaseFormElements)for(var d=document.querySelectorAll?a.container.querySelectorAll("input, textarea, select"):g(a.container).find("input, textarea, select"),
c=0;c<d.length;c++)a.h.removeEventListener(d[c],a.touchEvents.touchStart,Q,!0);if(b.preventLinks)for(d=[],document.querySelectorAll?d=a.container.querySelectorAll("a"):window.jQuery&&(d=g(a.container).find("a")),c=0;c<d.length;c++)a.h.removeEventListener(d[c],"click",P,!1)}function O(c){var b=c.keyCode||c.charCode;if(37==b||39==b||38==b||40==b){for(var e=!1,f=a.h.getOffset(a.container),h=a.h.windowScroll().left,g=a.h.windowScroll().top,m=a.h.windowWidth(),l=a.h.windowHeight(),f=[[f.left,f.top],[f.left+
a.width,f.top],[f.left,f.top+a.height],[f.left+a.width,f.top+a.height]],p=0;p<f.length;p++){var r=f[p];r[0]>=h&&(r[0]<=h+m&&r[1]>=g&&r[1]<=g+l)&&(e=!0)}if(!e)return}if(k){if(37==b||39==b)c.preventDefault?c.preventDefault():c.returnValue=!1;39==b&&a.swipeNext();37==b&&a.swipePrev()}else{if(38==b||40==b)c.preventDefault?c.preventDefault():c.returnValue=!1;40==b&&a.swipeNext();38==b&&a.swipePrev()}}function N(c){var d=a._wheelEvent,e;c.detail?e=-c.detail:"mousewheel"==d?e=c.wheelDelta:"DOMMouseScroll"==
d?e=-c.detail:"wheel"==d&&(e=Math.abs(c.deltaX)>Math.abs(c.deltaY)?-c.deltaX:-c.deltaY);b.freeMode?(k?a.getWrapperTranslate("x"):a.getWrapperTranslate("y"),k?(d=a.getWrapperTranslate("x")+e,e=a.getWrapperTranslate("y"),0<d&&(d=0),d<-h()&&(d=-h())):(d=a.getWrapperTranslate("x"),e=a.getWrapperTranslate("y")+e,0<e&&(e=0),e<-h()&&(e=-h())),a.setWrapperTransition(0),a.setWrapperTranslate(d,e,0),k?a.updateActiveSlide(d):a.updateActiveSlide(e)):0>e?a.swipeNext():a.swipePrev();b.autoplay&&a.stopAutoplay();
c.preventDefault?c.preventDefault():c.returnValue=!1;return!1}function T(a){for(var d=!1;!d;)-1<a.className.indexOf(b.slideClass)&&(d=a),a=a.parentElement;return d}function R(c){a.allowSlideClick&&(c.target?(a.clickedSlide=this,a.clickedSlideIndex=a.slides.indexOf(this)):(a.clickedSlide=T(c.srcElement),a.clickedSlideIndex=a.slides.indexOf(a.clickedSlide)),b.onSlideClick(a))}function S(c){a.clickedSlide=c.target?this:T(c.srcElement);a.clickedSlideIndex=a.slides.indexOf(a.clickedSlide);b.onSlideTouch(a)}
function P(b){if(!a.allowLinks)return b.preventDefault?b.preventDefault():b.returnValue=!1,!1}function Q(a){a.stopPropagation?a.stopPropagation():a.returnValue=!1;return!1}function z(c){b.preventLinks&&(a.allowLinks=!0);if(a.isTouched||b.onlyExternal)return!1;var d;if(d=b.noSwiping)if(d=c.target||c.srcElement){d=c.target||c.srcElement;var e=!1;do-1<d.className.indexOf(b.noSwipingClass)&&(e=!0),d=d.parentElement;while(!e&&d.parentElement&&-1==d.className.indexOf(b.wrapperClass));!e&&(-1<d.className.indexOf(b.wrapperClass)&&
-1<d.className.indexOf(b.noSwipingClass))&&(e=!0);d=e}if(d)return!1;G=!1;a.isTouched=!0;u="touchstart"==c.type;if(!u||1==c.targetTouches.length){b.loop&&a.fixLoop();a.callPlugins("onTouchStartBegin");u||(c.preventDefault?c.preventDefault():c.returnValue=!1);d=u?c.targetTouches[0].pageX:c.pageX||c.clientX;c=u?c.targetTouches[0].pageY:c.pageY||c.clientY;a.touches.startX=a.touches.currentX=d;a.touches.startY=a.touches.currentY=c;a.touches.start=a.touches.current=k?d:c;a.setWrapperTransition(0);a.positions.start=
a.positions.current=k?a.getWrapperTranslate("x"):a.getWrapperTranslate("y");k?a.setWrapperTranslate(a.positions.start,0,0):a.setWrapperTranslate(0,a.positions.start,0);a.times.start=(new Date).getTime();x=void 0;0<b.moveStartThreshold&&(M=!1);if(b.onTouchStart)b.onTouchStart(a);a.callPlugins("onTouchStartEnd")}}function A(c){if(a.isTouched&&!b.onlyExternal&&(!u||"mousemove"!=c.type)){var d=u?c.targetTouches[0].pageX:c.pageX||c.clientX,e=u?c.targetTouches[0].pageY:c.pageY||c.clientY;"undefined"===
typeof x&&k&&(x=!!(x||Math.abs(e-a.touches.startY)>Math.abs(d-a.touches.startX)));"undefined"!==typeof x||k||(x=!!(x||Math.abs(e-a.touches.startY)<Math.abs(d-a.touches.startX)));if(x)a.isTouched=!1;else if(c.assignedToSwiper)a.isTouched=!1;else if(c.assignedToSwiper=!0,a.isMoved=!0,b.preventLinks&&(a.allowLinks=!1),b.onSlideClick&&(a.allowSlideClick=!1),b.autoplay&&a.stopAutoplay(),!u||1==c.touches.length){a.callPlugins("onTouchMoveStart");c.preventDefault?c.preventDefault():c.returnValue=!1;a.touches.current=
k?d:e;a.positions.current=(a.touches.current-a.touches.start)*b.touchRatio+a.positions.start;if(0<a.positions.current&&b.onResistanceBefore)b.onResistanceBefore(a,a.positions.current);if(a.positions.current<-h()&&b.onResistanceAfter)b.onResistanceAfter(a,Math.abs(a.positions.current+h()));b.resistance&&"100%"!=b.resistance&&(0<a.positions.current&&(c=1-a.positions.current/l/2,a.positions.current=0.5>c?l/2:a.positions.current*c),a.positions.current<-h()&&(d=(a.touches.current-a.touches.start)*b.touchRatio+
(h()+a.positions.start),c=(l+d)/l,d=a.positions.current-d*(1-c)/2,e=-h()-l/2,a.positions.current=d<e||0>=c?e:d));b.resistance&&"100%"==b.resistance&&(0<a.positions.current&&(!b.freeMode||b.freeModeFluid)&&(a.positions.current=0),a.positions.current<-h()&&(!b.freeMode||b.freeModeFluid)&&(a.positions.current=-h()));if(b.followFinger){b.moveStartThreshold?Math.abs(a.touches.current-a.touches.start)>b.moveStartThreshold||M?(M=!0,k?a.setWrapperTranslate(a.positions.current,0,0):a.setWrapperTranslate(0,
a.positions.current,0)):a.positions.current=a.positions.start:k?a.setWrapperTranslate(a.positions.current,0,0):a.setWrapperTranslate(0,a.positions.current,0);(b.freeMode||b.watchActiveIndex)&&a.updateActiveSlide(a.positions.current);b.grabCursor&&(a.container.style.cursor="move",a.container.style.cursor="grabbing",a.container.style.cursor="-moz-grabbin",a.container.style.cursor="-webkit-grabbing");D||(D=a.touches.current);H||(H=(new Date).getTime());a.velocity=(a.touches.current-D)/((new Date).getTime()-
H)/2;2>Math.abs(a.touches.current-D)&&(a.velocity=0);D=a.touches.current;H=(new Date).getTime();a.callPlugins("onTouchMoveEnd");if(b.onTouchMove)b.onTouchMove(a);return!1}}}}function B(c){x&&a.swipeReset();if(!b.onlyExternal&&a.isTouched){a.isTouched=!1;b.grabCursor&&(a.container.style.cursor="move",a.container.style.cursor="grab",a.container.style.cursor="-moz-grab",a.container.style.cursor="-webkit-grab");a.positions.current||0===a.positions.current||(a.positions.current=a.positions.start);b.followFinger&&
(k?a.setWrapperTranslate(a.positions.current,0,0):a.setWrapperTranslate(0,a.positions.current,0));a.times.end=(new Date).getTime();a.touches.diff=a.touches.current-a.touches.start;a.touches.abs=Math.abs(a.touches.diff);a.positions.diff=a.positions.current-a.positions.start;a.positions.abs=Math.abs(a.positions.diff);var d=a.positions.diff,e=a.positions.abs;c=a.times.end-a.times.start;5>e&&(300>c&&!1==a.allowLinks)&&(b.freeMode||0==e||a.swipeReset(),b.preventLinks&&(a.allowLinks=!0),b.onSlideClick&&
(a.allowSlideClick=!0));setTimeout(function(){b.preventLinks&&(a.allowLinks=!0);b.onSlideClick&&(a.allowSlideClick=!0)},100);if(a.isMoved){a.isMoved=!1;var f=h();if(0<a.positions.current)a.swipeReset();else if(a.positions.current<-f)a.swipeReset();else if(b.freeMode){if(b.freeModeFluid){var e=1E3*b.momentumRatio,d=a.positions.current+a.velocity*e,g=!1,F,m=20*Math.abs(a.velocity)*b.momentumBounceRatio;d<-f&&(b.momentumBounce&&a.support.transitions?(d+f<-m&&(d=-f-m),F=-f,G=g=!0):d=-f);0<d&&(b.momentumBounce&&
a.support.transitions?(d>m&&(d=m),F=0,G=g=!0):d=0);0!=a.velocity&&(e=Math.abs((d-a.positions.current)/a.velocity));k?a.setWrapperTranslate(d,0,0):a.setWrapperTranslate(0,d,0);a.setWrapperTransition(e);b.momentumBounce&&g&&a.wrapperTransitionEnd(function(){if(G){if(b.onMomentumBounce)b.onMomentumBounce(a);k?a.setWrapperTranslate(F,0,0):a.setWrapperTranslate(0,F,0);a.setWrapperTransition(300)}});a.updateActiveSlide(d)}(!b.freeModeFluid||300<=c)&&a.updateActiveSlide(a.positions.current)}else{E=0>d?"toNext":
"toPrev";"toNext"==E&&300>=c&&(30>e||!b.shortSwipes?a.swipeReset():a.swipeNext(!0));"toPrev"==E&&300>=c&&(30>e||!b.shortSwipes?a.swipeReset():a.swipePrev(!0));f=0;if("auto"==b.slidesPerView){for(var d=Math.abs(k?a.getWrapperTranslate("x"):a.getWrapperTranslate("y")),q=g=0;q<a.slides.length;q++)if(m=k?a.slides[q].getWidth(!0):a.slides[q].getHeight(!0),g+=m,g>d){f=m;break}f>l&&(f=l)}else f=p*b.slidesPerView;"toNext"==E&&300<c&&(e>=0.5*f?a.swipeNext(!0):a.swipeReset());"toPrev"==E&&300<c&&(e>=0.5*f?
a.swipePrev(!0):a.swipeReset())}if(b.onTouchEnd)b.onTouchEnd(a);a.callPlugins("onTouchEnd")}else{a.isMoved=!1;if(b.onTouchEnd)b.onTouchEnd(a);a.callPlugins("onTouchEnd");a.swipeReset()}}}function I(c,d,e){function f(){g+=m;if(p="toNext"==l?g>c:g<c)k?a.setWrapperTranslate(Math.round(g),0):a.setWrapperTranslate(0,Math.round(g)),a._DOMAnimating=!0,window.setTimeout(function(){f()},1E3/60);else{if(b.onSlideChangeEnd)b.onSlideChangeEnd(a);k?a.setWrapperTranslate(c,0):a.setWrapperTranslate(0,c);a._DOMAnimating=
!1}}if(a.support.transitions||!b.DOMAnimation){k?a.setWrapperTranslate(c,0,0):a.setWrapperTranslate(0,c,0);var h="to"==d&&0<=e.speed?e.speed:b.speed;a.setWrapperTransition(h)}else{var g=k?a.getWrapperTranslate("x"):a.getWrapperTranslate("y"),h="to"==d&&0<=e.speed?e.speed:b.speed,m=Math.ceil((c-g)/h*(1E3/60)),l=g>c?"toNext":"toPrev",p="toNext"==l?g>c:g<c;if(a._DOMAnimating)return;f()}a.updateActiveSlide(c);if(b.onSlideNext&&"next"==d)b.onSlideNext(a,c);if(b.onSlidePrev&&"prev"==d)b.onSlidePrev(a,c);
if(b.onSlideReset&&"reset"==d)b.onSlideReset(a,c);("next"==d||"prev"==d||"to"==d&&!0==e.runCallbacks)&&W()}function W(){a.callPlugins("onSlideChangeStart");if(b.onSlideChangeStart)if(b.queueStartCallbacks&&a.support.transitions){if(a._queueStartCallbacks)return;a._queueStartCallbacks=!0;b.onSlideChangeStart(a);a.wrapperTransitionEnd(function(){a._queueStartCallbacks=!1})}else b.onSlideChangeStart(a);b.onSlideChangeEnd&&(a.support.transitions?b.queueEndCallbacks?a._queueEndCallbacks||(a._queueEndCallbacks=
!0,a.wrapperTransitionEnd(b.onSlideChangeEnd)):a.wrapperTransitionEnd(b.onSlideChangeEnd):b.DOMAnimation||setTimeout(function(){b.onSlideChangeEnd(a)},10))}function U(){for(var b=a.paginationButtons,d=0;d<b.length;d++)a.h.removeEventListener(b[d],"click",V,!1)}function V(b){var d;b=b.target||b.srcElement;for(var e=a.paginationButtons,f=0;f<e.length;f++)b===e[f]&&(d=f);a.swipeTo(d)}if(document.body.__defineGetter__&&HTMLElement){var s=HTMLElement.prototype;s.__defineGetter__&&s.__defineGetter__("outerHTML",
function(){return(new XMLSerializer).serializeToString(this)})}window.getComputedStyle||(window.getComputedStyle=function(a,b){this.el=a;this.getPropertyValue=function(b){var d=/(\-([a-z]){1})/g;"float"===b&&(b="styleFloat");d.test(b)&&(b=b.replace(d,function(a,b,c){return c.toUpperCase()}));return a.currentStyle[b]?a.currentStyle[b]:null};return this});Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){for(var e=b||0,f=this.length;e<f;e++)if(this[e]===a)return e;return-1});if((document.querySelectorAll||
window.jQuery)&&"undefined"!==typeof f&&(f.nodeType||0!==g(f).length)){var a=this;a.touches={start:0,startX:0,startY:0,current:0,currentX:0,currentY:0,diff:0,abs:0};a.positions={start:0,abs:0,diff:0,current:0};a.times={start:0,end:0};a.id=(new Date).getTime();a.container=f.nodeType?f:g(f)[0];a.isTouched=!1;a.isMoved=!1;a.activeIndex=0;a.activeLoaderIndex=0;a.activeLoopIndex=0;a.previousIndex=null;a.velocity=0;a.snapGrid=[];a.slidesGrid=[];a.imagesToLoad=[];a.imagesLoaded=0;a.wrapperLeft=0;a.wrapperRight=
0;a.wrapperTop=0;a.wrapperBottom=0;var J,p,y,E,x,l,s={mode:"horizontal",touchRatio:1,speed:300,freeMode:!1,freeModeFluid:!1,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,slidesPerView:1,slidesPerGroup:1,simulateTouch:!0,followFinger:!0,shortSwipes:!0,moveStartThreshold:!1,autoplay:!1,onlyExternal:!1,createPagination:!0,pagination:!1,paginationElement:"span",paginationClickable:!1,paginationAsRange:!0,resistance:!0,scrollContainer:!1,preventLinks:!0,noSwiping:!1,noSwipingClass:"swiper-no-swiping",
initialSlide:0,keyboardControl:!1,mousewheelControl:!1,mousewheelDebounce:600,useCSS3Transforms:!0,loop:!1,loopAdditionalSlides:0,calculateHeight:!1,updateOnImagesReady:!0,releaseFormElements:!0,watchActiveIndex:!1,visibilityFullFit:!1,offsetPxBefore:0,offsetPxAfter:0,offsetSlidesBefore:0,offsetSlidesAfter:0,centeredSlides:!1,queueStartCallbacks:!1,queueEndCallbacks:!1,autoResize:!0,resizeReInit:!1,DOMAnimation:!0,loader:{slides:[],slidesHTMLType:"inner",surroundGroups:1,logic:"reload",loadAllSlides:!1},
slideElement:"div",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",wrapperClass:"swiper-wrapper",paginationElementClass:"swiper-pagination-switch",paginationActiveClass:"swiper-active-switch",paginationVisibleClass:"swiper-visible-switch"};b=b||{};for(var q in s)if(q in b&&"object"===typeof b[q])for(var C in s[q])C in b[q]||(b[q][C]=s[q][C]);else q in b||(b[q]=s[q]);a.params=b;b.scrollContainer&&(b.freeMode=!0,b.freeModeFluid=!0);b.loop&&(b.resistance=
"100%");var k="horizontal"===b.mode;a.touchEvents={touchStart:a.support.touch||!b.simulateTouch?"touchstart":a.browser.ie10?"MSPointerDown":"mousedown",touchMove:a.support.touch||!b.simulateTouch?"touchmove":a.browser.ie10?"MSPointerMove":"mousemove",touchEnd:a.support.touch||!b.simulateTouch?"touchend":a.browser.ie10?"MSPointerUp":"mouseup"};for(q=a.container.childNodes.length-1;0<=q;q--)if(a.container.childNodes[q].className)for(C=a.container.childNodes[q].className.split(" "),s=0;s<C.length;s++)C[s]===
b.wrapperClass&&(J=a.container.childNodes[q]);a.wrapper=J;a._extendSwiperSlide=function(c){c.append=function(){b.loop?(c.insertAfter(a.slides.length-a.loopedSlides),a.removeLoopedSlides(),a.calcSlides(),a.createLoop()):a.wrapper.appendChild(c);a.reInit();return c};c.prepend=function(){b.loop?(a.wrapper.insertBefore(c,a.slides[a.loopedSlides]),a.removeLoopedSlides(),a.calcSlides(),a.createLoop()):a.wrapper.insertBefore(c,a.wrapper.firstChild);a.reInit();return c};c.insertAfter=function(d){if("undefined"===
typeof d)return!1;b.loop?(d=a.slides[d+1+a.loopedSlides],a.wrapper.insertBefore(c,d),a.removeLoopedSlides(),a.calcSlides(),a.createLoop()):(d=a.slides[d+1],a.wrapper.insertBefore(c,d));a.reInit();return c};c.clone=function(){return a._extendSwiperSlide(c.cloneNode(!0))};c.remove=function(){a.wrapper.removeChild(c);a.reInit()};c.html=function(a){if("undefined"===typeof a)return c.innerHTML;c.innerHTML=a;return c};c.index=function(){for(var b,e=a.slides.length-1;0<=e;e--)c===a.slides[e]&&(b=e);return b};
c.isActive=function(){return c.index()===a.activeIndex?!0:!1};c.swiperSlideDataStorage||(c.swiperSlideDataStorage={});c.getData=function(a){return c.swiperSlideDataStorage[a]};c.setData=function(a,b){c.swiperSlideDataStorage[a]=b;return c};c.data=function(a,b){return b?(c.setAttribute("data-"+a,b),c):c.getAttribute("data-"+a)};c.getWidth=function(b){return a.h.getWidth(c,b)};c.getHeight=function(b){return a.h.getHeight(c,b)};c.getOffset=function(){return a.h.getOffset(c)};return c};a.calcSlides=function(c){var d=
a.slides?a.slides.length:!1;a.slides=[];a.displaySlides=[];for(var e=0;e<a.wrapper.childNodes.length;e++)if(a.wrapper.childNodes[e].className)for(var f=a.wrapper.childNodes[e].className.split(" "),g=0;g<f.length;g++)f[g]===b.slideClass&&a.slides.push(a.wrapper.childNodes[e]);for(e=a.slides.length-1;0<=e;e--)a._extendSwiperSlide(a.slides[e]);d&&(d!==a.slides.length||c)&&(v(),t(),a.updateActiveSlide(),b.createPagination&&a.params.pagination&&a.createPagination(),a.callPlugins("numberOfSlidesChanged"))};
a.createSlide=function(c,d,e){d=d||a.params.slideClass;e=e||b.slideElement;e=document.createElement(e);e.innerHTML=c||"";e.className=d;return a._extendSwiperSlide(e)};a.appendSlide=function(b,d,e){if(b)return b.nodeType?a._extendSwiperSlide(b).append():a.createSlide(b,d,e).append()};a.prependSlide=function(b,d,e){if(b)return b.nodeType?a._extendSwiperSlide(b).prepend():a.createSlide(b,d,e).prepend()};a.insertSlideAfter=function(b,d,e,f){return"undefined"===typeof b?!1:d.nodeType?a._extendSwiperSlide(d).insertAfter(b):
a.createSlide(d,e,f).insertAfter(b)};a.removeSlide=function(c){if(a.slides[c]){if(b.loop){if(!a.slides[c+a.loopedSlides])return!1;a.slides[c+a.loopedSlides].remove();a.removeLoopedSlides();a.calcSlides();a.createLoop()}else a.slides[c].remove();return!0}return!1};a.removeLastSlide=function(){return 0<a.slides.length?(b.loop?(a.slides[a.slides.length-1-a.loopedSlides].remove(),a.removeLoopedSlides(),a.calcSlides(),a.createLoop()):a.slides[a.slides.length-1].remove(),!0):!1};a.removeAllSlides=function(){for(var b=
a.slides.length-1;0<=b;b--)a.slides[b].remove()};a.getSlide=function(b){return a.slides[b]};a.getLastSlide=function(){return a.slides[a.slides.length-1]};a.getFirstSlide=function(){return a.slides[0]};a.activeSlide=function(){return a.slides[a.activeIndex]};var K=[],L;for(L in a.plugins)b[L]&&(q=a.plugins[L](a,b[L]))&&K.push(q);a.callPlugins=function(a,b){b||(b={});for(var e=0;e<K.length;e++)if(a in K[e])K[e][a](b)};a.browser.ie10&&!b.onlyExternal&&(k?a.wrapper.classList.add("swiper-wp8-horizontal"):
a.wrapper.classList.add("swiper-wp8-vertical"));b.freeMode&&(a.container.className+=" swiper-free-mode");a.initialized=!1;a.init=function(c,d){var e=a.h.getWidth(a.container),f=a.h.getHeight(a.container);if(e!==a.width||f!==a.height||c){a.width=e;a.height=f;l=k?e:f;e=a.wrapper;c&&a.calcSlides(d);if("auto"===b.slidesPerView){var g=0,h=0;0<b.slidesOffset&&(e.style.paddingLeft="",e.style.paddingRight="",e.style.paddingTop="",e.style.paddingBottom="");e.style.width="";e.style.height="";0<b.offsetPxBefore&&
(k?a.wrapperLeft=b.offsetPxBefore:a.wrapperTop=b.offsetPxBefore);0<b.offsetPxAfter&&(k?a.wrapperRight=b.offsetPxAfter:a.wrapperBottom=b.offsetPxAfter);b.centeredSlides&&(k?(a.wrapperLeft=(l-this.slides[0].getWidth(!0))/2,a.wrapperRight=(l-a.slides[a.slides.length-1].getWidth(!0))/2):(a.wrapperTop=(l-a.slides[0].getHeight(!0))/2,a.wrapperBottom=(l-a.slides[a.slides.length-1].getHeight(!0))/2));k?(0<=a.wrapperLeft&&(e.style.paddingLeft=a.wrapperLeft+"px"),0<=a.wrapperRight&&(e.style.paddingRight=a.wrapperRight+
"px")):(0<=a.wrapperTop&&(e.style.paddingTop=a.wrapperTop+"px"),0<=a.wrapperBottom&&(e.style.paddingBottom=a.wrapperBottom+"px"));var m=0,q=0;a.snapGrid=[];a.slidesGrid=[];for(var n=0,r=0;r<a.slides.length;r++){var f=a.slides[r].getWidth(!0),s=a.slides[r].getHeight(!0);b.calculateHeight&&(n=Math.max(n,s));var t=k?f:s;if(b.centeredSlides){var u=r===a.slides.length-1?0:a.slides[r+1].getWidth(!0),w=r===a.slides.length-1?0:a.slides[r+1].getHeight(!0),u=k?u:w;if(t>l){for(w=0;w<=Math.floor(t/(l+a.wrapperLeft));w++)0===
w?a.snapGrid.push(m+a.wrapperLeft):a.snapGrid.push(m+a.wrapperLeft+l*w);a.slidesGrid.push(m+a.wrapperLeft)}else a.snapGrid.push(q),a.slidesGrid.push(q);q+=t/2+u/2}else{if(t>l)for(w=0;w<=Math.floor(t/l);w++)a.snapGrid.push(m+l*w);else a.snapGrid.push(m);a.slidesGrid.push(m)}m+=t;g+=f;h+=s}b.calculateHeight&&(a.height=n);k?(y=g+a.wrapperRight+a.wrapperLeft,e.style.width=g+"px",e.style.height=a.height+"px"):(y=h+a.wrapperTop+a.wrapperBottom,e.style.width=a.width+"px",e.style.height=h+"px")}else if(b.scrollContainer)e.style.width=
"",e.style.height="",n=a.slides[0].getWidth(!0),g=a.slides[0].getHeight(!0),y=k?n:g,e.style.width=n+"px",e.style.height=g+"px",p=k?n:g;else{if(b.calculateHeight){g=n=0;k||(a.container.style.height="");e.style.height="";for(r=0;r<a.slides.length;r++)a.slides[r].style.height="",n=Math.max(a.slides[r].getHeight(!0),n),k||(g+=a.slides[r].getHeight(!0));s=n;a.height=s;k?g=s:(l=s,a.container.style.height=l+"px")}else s=k?a.height:a.height/b.slidesPerView,g=k?a.height:a.slides.length*s;f=k?a.width/b.slidesPerView:
a.width;n=k?a.slides.length*f:a.width;p=k?f:s;0<b.offsetSlidesBefore&&(k?a.wrapperLeft=p*b.offsetSlidesBefore:a.wrapperTop=p*b.offsetSlidesBefore);0<b.offsetSlidesAfter&&(k?a.wrapperRight=p*b.offsetSlidesAfter:a.wrapperBottom=p*b.offsetSlidesAfter);0<b.offsetPxBefore&&(k?a.wrapperLeft=b.offsetPxBefore:a.wrapperTop=b.offsetPxBefore);0<b.offsetPxAfter&&(k?a.wrapperRight=b.offsetPxAfter:a.wrapperBottom=b.offsetPxAfter);b.centeredSlides&&(k?(a.wrapperLeft=(l-p)/2,a.wrapperRight=(l-p)/2):(a.wrapperTop=
(l-p)/2,a.wrapperBottom=(l-p)/2));k?(0<a.wrapperLeft&&(e.style.paddingLeft=a.wrapperLeft+"px"),0<a.wrapperRight&&(e.style.paddingRight=a.wrapperRight+"px")):(0<a.wrapperTop&&(e.style.paddingTop=a.wrapperTop+"px"),0<a.wrapperBottom&&(e.style.paddingBottom=a.wrapperBottom+"px"));y=k?n+a.wrapperRight+a.wrapperLeft:g+a.wrapperTop+a.wrapperBottom;e.style.width=n+"px";e.style.height=g+"px";m=0;a.snapGrid=[];a.slidesGrid=[];for(r=0;r<a.slides.length;r++)a.snapGrid.push(m),a.slidesGrid.push(m),m+=p,a.slides[r].style.width=
f+"px",a.slides[r].style.height=s+"px"}if(a.initialized){if(a.callPlugins("onInit"),b.onFirstInit)b.onInit(a)}else if(a.callPlugins("onFirstInit"),b.onFirstInit)b.onFirstInit(a);a.initialized=!0}};a.reInit=function(b){a.init(!0,b)};a.resizeFix=function(c){a.callPlugins("beforeResizeFix");a.init(b.resizeReInit||c);if(!b.freeMode)b.loop?a.swipeTo(a.activeLoopIndex,0,!1):a.swipeTo(a.activeIndex,0,!1);else if((k?a.getWrapperTranslate("x"):a.getWrapperTranslate("y"))<-h()){c=k?-h():0;var d=k?0:-h();a.setWrapperTransition(0);
a.setWrapperTranslate(c,d,0)}a.callPlugins("afterResizeFix")};a.destroy=function(c){a.browser.ie10?(a.h.removeEventListener(a.wrapper,a.touchEvents.touchStart,z,!1),a.h.removeEventListener(document,a.touchEvents.touchMove,A,!1),a.h.removeEventListener(document,a.touchEvents.touchEnd,B,!1)):(a.support.touch&&(a.h.removeEventListener(a.wrapper,"touchstart",z,!1),a.h.removeEventListener(a.wrapper,"touchmove",A,!1),a.h.removeEventListener(a.wrapper,"touchend",B,!1)),b.simulateTouch&&(a.h.removeEventListener(a.wrapper,
"mousedown",z,!1),a.h.removeEventListener(document,"mousemove",A,!1),a.h.removeEventListener(document,"mouseup",B,!1)));b.autoResize&&a.h.removeEventListener(window,"resize",a.resizeFix,!1);v();b.paginationClickable&&U();b.mousewheelControl&&a._wheelEvent&&a.h.removeEventListener(a.container,a._wheelEvent,N,!1);b.keyboardControl&&a.h.removeEventListener(document,"keydown",O,!1);b.autoplay&&a.stopAutoplay();a.callPlugins("onDestroy");a=null};b.grabCursor&&(a.container.style.cursor="move",a.container.style.cursor=
"grab",a.container.style.cursor="-moz-grab",a.container.style.cursor="-webkit-grab");a.allowSlideClick=!0;a.allowLinks=!0;var u=!1,M,G=!0,D,H;a.swipeNext=function(c){!c&&b.loop&&a.fixLoop();a.callPlugins("onSwipeNext");var d=c=k?a.getWrapperTranslate("x"):a.getWrapperTranslate("y");if("auto"==b.slidesPerView)for(var e=0;e<a.snapGrid.length;e++){if(-c>=a.snapGrid[e]&&-c<a.snapGrid[e+1]){d=-a.snapGrid[e+1];break}}else d=p*b.slidesPerGroup,d=-(Math.floor(Math.abs(c)/Math.floor(d))*d+d);d<-h()&&(d=-h());
if(d==c)return!1;I(d,"next");return!0};a.swipePrev=function(c){!c&&b.loop&&a.fixLoop();!c&&b.autoplay&&a.stopAutoplay();a.callPlugins("onSwipePrev");c=Math.ceil(k?a.getWrapperTranslate("x"):a.getWrapperTranslate("y"));var d;if("auto"==b.slidesPerView){d=0;for(var e=1;e<a.snapGrid.length;e++){if(-c==a.snapGrid[e]){d=-a.snapGrid[e-1];break}if(-c>a.snapGrid[e]&&-c<a.snapGrid[e+1]){d=-a.snapGrid[e];break}}}else d=p*b.slidesPerGroup,d*=-(Math.ceil(-c/d)-1);0<d&&(d=0);if(d==c)return!1;I(d,"prev");return!0};
a.swipeReset=function(){a.callPlugins("onSwipeReset");var c=k?a.getWrapperTranslate("x"):a.getWrapperTranslate("y"),d=p*b.slidesPerGroup;h();if("auto"==b.slidesPerView){for(var e=d=0;e<a.snapGrid.length;e++){if(-c===a.snapGrid[e])return;if(-c>=a.snapGrid[e]&&-c<a.snapGrid[e+1]){d=0<a.positions.diff?-a.snapGrid[e+1]:-a.snapGrid[e];break}}-c>=a.snapGrid[a.snapGrid.length-1]&&(d=-a.snapGrid[a.snapGrid.length-1]);c<=-h()&&(d=-h())}else d=0>c?Math.round(c/d)*d:0;b.scrollContainer&&(d=0>c?c:0);d<-h()&&
(d=-h());b.scrollContainer&&l>p&&(d=0);if(d==c)return!1;I(d,"reset");return!0};a.swipeTo=function(c,d,e){c=parseInt(c,10);a.callPlugins("onSwipeTo",{index:c,speed:d});b.loop&&(c+=a.loopedSlides);var f=k?a.getWrapperTranslate("x"):a.getWrapperTranslate("y");if(!(c>a.slides.length-1||0>c)){var g;g="auto"==b.slidesPerView?-a.slidesGrid[c]:-c*p;g<-h()&&(g=-h());if(g==f)return!1;I(g,"to",{index:c,speed:d,runCallbacks:!1===e?!1:!0});return!0}};a._queueStartCallbacks=!1;a._queueEndCallbacks=!1;a.updateActiveSlide=
function(c){if(a.initialized&&0!=a.slides.length){a.previousIndex=a.activeIndex;0<c&&(c=0);"undefined"==typeof c&&(c=k?a.getWrapperTranslate("x"):a.getWrapperTranslate("y"));if("auto"==b.slidesPerView){if(a.activeIndex=a.slidesGrid.indexOf(-c),0>a.activeIndex){for(var d=0;d<a.slidesGrid.length-1&&!(-c>a.slidesGrid[d]&&-c<a.slidesGrid[d+1]);d++);var e=Math.abs(a.slidesGrid[d]+c),f=Math.abs(a.slidesGrid[d+1]+c);a.activeIndex=e<=f?d:d+1}}else a.activeIndex=b.visibilityFullFit?Math.ceil(-c/p):Math.round(-c/
p);a.activeIndex==a.slides.length&&(a.activeIndex=a.slides.length-1);0>a.activeIndex&&(a.activeIndex=0);if(a.slides[a.activeIndex]){a.calcVisibleSlides(c);e=RegExp("\\s*"+b.slideActiveClass);f=RegExp("\\s*"+b.slideVisibleClass);for(d=0;d<a.slides.length;d++)a.slides[d].className=a.slides[d].className.replace(e,"").replace(f,""),0<=a.visibleSlides.indexOf(a.slides[d])&&(a.slides[d].className+=" "+b.slideVisibleClass);a.slides[a.activeIndex].className+=" "+b.slideActiveClass;b.loop?(d=a.loopedSlides,
a.activeLoopIndex=a.activeIndex-d,a.activeLoopIndex>=a.slides.length-2*d&&(a.activeLoopIndex=a.slides.length-2*d-a.activeLoopIndex),0>a.activeLoopIndex&&(a.activeLoopIndex=a.slides.length-2*d+a.activeLoopIndex)):a.activeLoopIndex=a.activeIndex;b.pagination&&a.updatePagination(c)}}};a.createPagination=function(c){b.paginationClickable&&a.paginationButtons&&U();var d="",e=a.slides.length;b.loop&&(e-=2*a.loopedSlides);for(var f=0;f<e;f++)d+="<"+b.paginationElement+' class="'+b.paginationElementClass+
'"></'+b.paginationElement+">";a.paginationContainer=b.pagination.nodeType?b.pagination:g(b.pagination)[0];a.paginationContainer.innerHTML=d;a.paginationButtons=[];document.querySelectorAll?a.paginationButtons=a.paginationContainer.querySelectorAll("."+b.paginationElementClass):window.jQuery&&(a.paginationButtons=g(a.paginationContainer).find("."+b.paginationElementClass));c||a.updatePagination();a.callPlugins("onCreatePagination");if(b.paginationClickable)for(c=a.paginationButtons,d=0;d<c.length;d++)a.h.addEventListener(c[d],
"click",V,!1)};a.updatePagination=function(c){if(b.pagination&&!(1>a.slides.length)){if(document.querySelectorAll)var d=a.paginationContainer.querySelectorAll("."+b.paginationActiveClass);else window.jQuery&&(d=g(a.paginationContainer).find("."+b.paginationActiveClass));if(d&&(d=a.paginationButtons,0!=d.length)){for(var e=0;e<d.length;e++)d[e].className=b.paginationElementClass;var f=b.loop?a.loopedSlides:0;if(b.paginationAsRange){a.visibleSlides||a.calcVisibleSlides(c);c=[];for(e=0;e<a.visibleSlides.length;e++){var h=
a.slides.indexOf(a.visibleSlides[e])-f;b.loop&&0>h&&(h=a.slides.length-2*a.loopedSlides+h);b.loop&&h>=a.slides.length-2*a.loopedSlides&&(h=a.slides.length-2*a.loopedSlides-h,h=Math.abs(h));c.push(h)}for(e=0;e<c.length;e++)d[c[e]]&&(d[c[e]].className+=" "+b.paginationVisibleClass);b.loop?d[a.activeLoopIndex].className+=" "+b.paginationActiveClass:d[a.activeIndex].className+=" "+b.paginationActiveClass}else b.loop?d[a.activeLoopIndex].className+=" "+b.paginationActiveClass+" "+b.paginationVisibleClass:
d[a.activeIndex].className+=" "+b.paginationActiveClass+" "+b.paginationVisibleClass}}};a.calcVisibleSlides=function(c){var d=[],e=0,f=0,g=0;k&&0<a.wrapperLeft&&(c+=a.wrapperLeft);!k&&0<a.wrapperTop&&(c+=a.wrapperTop);for(var h=0;h<a.slides.length;h++){var e=e+f,f="auto"==b.slidesPerView?k?a.h.getWidth(a.slides[h],!0):a.h.getHeight(a.slides[h],!0):p,g=e+f,m=!1;b.visibilityFullFit?(e>=-c&&g<=-c+l&&(m=!0),e<=-c&&g>=-c+l&&(m=!0)):(g>-c&&g<=-c+l&&(m=!0),e>=-c&&e<-c+l&&(m=!0),e<-c&&g>-c+l&&(m=!0));m&&
d.push(a.slides[h])}0==d.length&&(d=[a.slides[a.activeIndex]]);a.visibleSlides=d};a.autoPlayIntervalId=void 0;a.startAutoplay=function(){if("undefined"!==typeof a.autoPlayIntervalId)return!1;b.autoplay&&!b.loop&&(a.autoPlayIntervalId=setInterval(function(){a.swipeNext(!0)||a.swipeTo(0)},b.autoplay));b.autoplay&&b.loop&&(a.autoPlayIntervalId=setInterval(function(){a.swipeNext()},b.autoplay));a.callPlugins("onAutoplayStart")};a.stopAutoplay=function(){a.autoPlayIntervalId&&clearInterval(a.autoPlayIntervalId);
a.autoPlayIntervalId=void 0;a.callPlugins("onAutoplayStop")};a.loopCreated=!1;a.removeLoopedSlides=function(){if(a.loopCreated)for(var b=0;b<a.slides.length;b++)!0===a.slides[b].getData("looped")&&a.wrapper.removeChild(a.slides[b])};a.createLoop=function(){if(0!=a.slides.length){a.loopedSlides=b.slidesPerView+b.loopAdditionalSlides;for(var c="",d="",e=0;e<a.loopedSlides;e++)c+=a.slides[e].outerHTML;for(e=a.slides.length-a.loopedSlides;e<a.slides.length;e++)d+=a.slides[e].outerHTML;J.innerHTML=d+J.innerHTML+
c;a.loopCreated=!0;a.calcSlides();for(e=0;e<a.slides.length;e++)(e<a.loopedSlides||e>=a.slides.length-a.loopedSlides)&&a.slides[e].setData("looped",!0);a.callPlugins("onCreateLoop")}};a.fixLoop=function(){if(a.activeIndex<a.loopedSlides){var c=a.slides.length-3*a.loopedSlides+a.activeIndex;a.swipeTo(c,0,!1)}else a.activeIndex>a.slides.length-2*b.slidesPerView&&(c=-a.slides.length+a.activeIndex+a.loopedSlides,a.swipeTo(c,0,!1))};a.loadSlides=function(){var c="";a.activeLoaderIndex=0;for(var d=b.loader.slides,
e=b.loader.loadAllSlides?d.length:b.slidesPerView*(1+b.loader.surroundGroups),f=0;f<e;f++)c="outer"==b.loader.slidesHTMLType?c+d[f]:c+("<"+b.slideElement+' class="'+b.slideClass+'" data-swiperindex="'+f+'">'+d[f]+"</"+b.slideElement+">");a.wrapper.innerHTML=c;a.calcSlides(!0);b.loader.loadAllSlides||a.wrapperTransitionEnd(a.reloadSlides,!0)};a.reloadSlides=function(){var c=b.loader.slides,d=parseInt(a.activeSlide().data("swiperindex"),10);if(!(0>d||d>c.length-1)){a.activeLoaderIndex=d;var e=Math.max(0,
d-b.slidesPerView*b.loader.surroundGroups),f=Math.min(d+b.slidesPerView*(1+b.loader.surroundGroups)-1,c.length-1);0<d&&(d=-p*(d-e),k?a.setWrapperTranslate(d,0,0):a.setWrapperTranslate(0,d,0),a.setWrapperTransition(0));if("reload"===b.loader.logic){for(var g=a.wrapper.innerHTML="",d=e;d<=f;d++)g+="outer"==b.loader.slidesHTMLType?c[d]:"<"+b.slideElement+' class="'+b.slideClass+'" data-swiperindex="'+d+'">'+c[d]+"</"+b.slideElement+">";a.wrapper.innerHTML=g}else{for(var g=1E3,h=0,d=0;d<a.slides.length;d++){var l=
a.slides[d].data("swiperindex");l<e||l>f?a.wrapper.removeChild(a.slides[d]):(g=Math.min(l,g),h=Math.max(l,h))}for(d=e;d<=f;d++)d<g&&(e=document.createElement(b.slideElement),e.className=b.slideClass,e.setAttribute("data-swiperindex",d),e.innerHTML=c[d],a.wrapper.insertBefore(e,a.wrapper.firstChild)),d>h&&(e=document.createElement(b.slideElement),e.className=b.slideClass,e.setAttribute("data-swiperindex",d),e.innerHTML=c[d],a.wrapper.appendChild(e))}a.reInit(!0)}};a.calcSlides();0<b.loader.slides.length&&
0==a.slides.length&&a.loadSlides();b.loop&&a.createLoop();a.init();n();b.pagination&&b.createPagination&&a.createPagination(!0);b.loop||0<b.initialSlide?a.swipeTo(b.initialSlide,0,!1):a.updateActiveSlide(0);b.autoplay&&a.startAutoplay()}};
Swiper.prototype={plugins:{},wrapperTransitionEnd:function(f,b){function g(){f(h);h.params.queueEndCallbacks&&(h._queueEndCallbacks=!1);if(!b)for(var v=0;v<t.length;v++)h.h.removeEventListener(n,t[v],g,!1)}var h=this,n=h.wrapper,t=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"];if(f)for(var v=0;v<t.length;v++)h.h.addEventListener(n,t[v],g,!1)},getWrapperTranslate:function(f){var b=this.wrapper,g,h,n=window.WebKitCSSMatrix?new WebKitCSSMatrix(window.getComputedStyle(b,
null).webkitTransform):window.getComputedStyle(b,null).MozTransform||window.getComputedStyle(b,null).OTransform||window.getComputedStyle(b,null).MsTransform||window.getComputedStyle(b,null).msTransform||window.getComputedStyle(b,null).transform||window.getComputedStyle(b,null).getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,");g=n.toString().split(",");this.params.useCSS3Transforms?("x"==f&&(h=16==g.length?parseFloat(g[12]):window.WebKitCSSMatrix?n.m41:parseFloat(g[4])),"y"==
f&&(h=16==g.length?parseFloat(g[13]):window.WebKitCSSMatrix?n.m42:parseFloat(g[5]))):("x"==f&&(h=parseFloat(b.style.left,10)||0),"y"==f&&(h=parseFloat(b.style.top,10)||0));return h||0},setWrapperTranslate:function(f,b,g){var h=this.wrapper.style;f=f||0;b=b||0;g=g||0;this.params.useCSS3Transforms?this.support.transforms3d?h.webkitTransform=h.MsTransform=h.msTransform=h.MozTransform=h.OTransform=h.transform="translate3d("+f+"px, "+b+"px, "+g+"px)":(h.webkitTransform=h.MsTransform=h.msTransform=h.MozTransform=
h.OTransform=h.transform="translate("+f+"px, "+b+"px)",this.support.transforms||(h.left=f+"px",h.top=b+"px")):(h.left=f+"px",h.top=b+"px");this.callPlugins("onSetWrapperTransform",{x:f,y:b,z:g})},setWrapperTransition:function(f){var b=this.wrapper.style;b.webkitTransitionDuration=b.MsTransitionDuration=b.msTransitionDuration=b.MozTransitionDuration=b.OTransitionDuration=b.transitionDuration=f/1E3+"s";this.callPlugins("onSetWrapperTransition",{duration:f})},h:{getWidth:function(f,b){var g=window.getComputedStyle(f,
null).getPropertyValue("width"),h=parseFloat(g);if(isNaN(h)||0<g.indexOf("%"))h=f.offsetWidth-parseFloat(window.getComputedStyle(f,null).getPropertyValue("padding-left"))-parseFloat(window.getComputedStyle(f,null).getPropertyValue("padding-right"));b&&(h+=parseFloat(window.getComputedStyle(f,null).getPropertyValue("padding-left"))+parseFloat(window.getComputedStyle(f,null).getPropertyValue("padding-right")));return h},getHeight:function(f,b){if(b)return f.offsetHeight;var g=window.getComputedStyle(f,
null).getPropertyValue("height"),h=parseFloat(g);if(isNaN(h)||0<g.indexOf("%"))h=f.offsetHeight-parseFloat(window.getComputedStyle(f,null).getPropertyValue("padding-top"))-parseFloat(window.getComputedStyle(f,null).getPropertyValue("padding-bottom"));b&&(h+=parseFloat(window.getComputedStyle(f,null).getPropertyValue("padding-top"))+parseFloat(window.getComputedStyle(f,null).getPropertyValue("padding-bottom")));return h},getOffset:function(f){var b=f.getBoundingClientRect(),g=document.body,h=f.clientTop||
g.clientTop||0,g=f.clientLeft||g.clientLeft||0,n=window.pageYOffset||f.scrollTop;f=window.pageXOffset||f.scrollLeft;document.documentElement&&!window.pageYOffset&&(n=document.documentElement.scrollTop,f=document.documentElement.scrollLeft);return{top:b.top+n-h,left:b.left+f-g}},windowWidth:function(){if(window.innerWidth)return window.innerWidth;if(document.documentElement&&document.documentElement.clientWidth)return document.documentElement.clientWidth},windowHeight:function(){if(window.innerHeight)return window.innerHeight;
if(document.documentElement&&document.documentElement.clientHeight)return document.documentElement.clientHeight},windowScroll:function(){if("undefined"!=typeof pageYOffset)return{left:window.pageXOffset,top:window.pageYOffset};if(document.documentElement)return{left:document.documentElement.scrollLeft,top:document.documentElement.scrollTop}},addEventListener:function(f,b,g,h){f.addEventListener?f.addEventListener(b,g,h):f.attachEvent&&f.attachEvent("on"+b,g)},removeEventListener:function(f,b,g,h){f.removeEventListener?
f.removeEventListener(b,g,h):f.detachEvent&&f.detachEvent("on"+b,g)}},setTransform:function(f,b){var g=f.style;g.webkitTransform=g.MsTransform=g.msTransform=g.MozTransform=g.OTransform=g.transform=b},setTranslate:function(f,b){var g=f.style,h=b.x||0,n=b.y||0,t=b.z||0;g.webkitTransform=g.MsTransform=g.msTransform=g.MozTransform=g.OTransform=g.transform=this.support.transforms3d?"translate3d("+h+"px,"+n+"px,"+t+"px)":"translate("+h+"px,"+n+"px)";this.support.transforms||(g.left=h+"px",g.top=n+"px")},
setTransition:function(f,b){var g=f.style;g.webkitTransitionDuration=g.MsTransitionDuration=g.msTransitionDuration=g.MozTransitionDuration=g.OTransitionDuration=g.transitionDuration=b+"ms"},support:{touch:window.Modernizr&&!0===Modernizr.touch||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&!0===Modernizr.csstransforms3d||function(){var f=document.createElement("div");return"webkitPerspective"in f.style||"MozPerspective"in
f.style||"OPerspective"in f.style||"MsPerspective"in f.style||"perspective"in f.style}(),transforms:window.Modernizr&&!0===Modernizr.csstransforms||function(){var f=document.createElement("div").style;return"transform"in f||"WebkitTransform"in f||"MozTransform"in f||"msTransform"in f||"MsTransform"in f||"OTransform"in f}(),transitions:window.Modernizr&&!0===Modernizr.csstransitions||function(){var f=document.createElement("div").style;return"transition"in f||"WebkitTransition"in f||"MozTransition"in
f||"msTransition"in f||"MsTransition"in f||"OTransition"in f}()},browser:{ie8:function(){var f=-1;"Microsoft Internet Explorer"==navigator.appName&&null!=/MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent)&&(f=parseFloat(RegExp.$1));return-1!=f&&9>f}(),ie10:window.navigator.msPointerEnabled}};(window.jQuery||window.Zepto)&&function(f){f.fn.swiper=function(b){b=new Swiper(f(this)[0],b);f(this).data("swiper",b);return b}}(window.jQuery||window.Zepto);
"undefined"!==typeof module&&(module.exports=Swiper);/**
 * jQuery Roundabout - v2.1.1
 * http://fredhq.com/projects/roundabout
 *
 * Moves list-items of enabled ordered and unordered lists long
 * a chosen path. Includes the default "lazySusan" path, that
 * moves items long a spinning turntable.
 *
 * Terms of Use // jQuery Roundabout
 * 
 * Open source under the BSD license
 *
 * Copyright (c) 2011, Fred LeBlanc
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without 
 * modification, are permitted provided that the following conditions are met:
 * 
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *   - Redistributions in binary form must reproduce the above 
 *     copyright notice, this list of conditions and the following 
 *     disclaimer in the documentation and/or other materials provided 
 *     with the distribution.
 *   - Neither the name of the author nor the names of its contributors 
 *     may be used to endorse or promote products derived from this 
 *     software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE 
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
 * POSSIBILITY OF SUCH DAMAGE.
 */
(function($) {
	"use strict";
	
	var defaults, internalData, methods;

	// add default shape
	$.extend({
		roundaboutShapes: {
			def: "lazySusan",
			lazySusan: function (r, a, t) {
				return {
					x: Math.sin(r + a), 
					y: (Math.sin(r + 3*Math.PI/2 + a) / 8) * t, 
					z: (Math.cos(r + a) + 1) / 2,
					scale: (Math.sin(r + Math.PI/2 + a) / 2) + 0.5
				};
			}
		}
	});

	defaults = {
		bearing: 0.0,
		tilt: 0.0,
		minZ: 100,
		maxZ: 280,
		minOpacity: 0.4,
		maxOpacity: 1.0,
		minScale: 0.4,
		maxScale: 1.0,
		duration: 600,
		btnNext: null,
		btnNextCallback: function() {},
		btnPrev: null,
		btnPrevCallback: function() {},
		btnToggleAutoplay: null,
		btnStartAutoplay: null,
		btnStopAutoplay: null,
		easing: "swing",
		clickToFocus: true,
		clickToFocusCallback: function() {},
		focusBearing: 0.0,
		shape: "lazySusan",
		debug: false,
		childSelector: "li",
		startingChild: null,
		reflect: false,
		floatComparisonThreshold: 0.001,
		autoplay: false,
		autoplayDuration: 1000,
		autoplayPauseOnHover: false,
		autoplayCallback: function() {},
		enableDrag: false,
		dropDuration: 600,
		dropEasing: "swing",
		dropAnimateTo: "nearest",
		dropCallback: function() {},
		dragAxis: "x",
		dragFactor: 4,
		triggerFocusEvents: true,
		triggerBlurEvents: true,
		responsive: false
	};

	internalData = {
		autoplayInterval: null,
		autoplayIsRunning: false,
		animating: false,
		childInFocus: -1,
		touchMoveStartPosition: null,
		stopAnimation: false,
		lastAnimationStep: false
	};

	methods = {

		// starters
		// -----------------------------------------------------------------------

		// init
		// starts up roundabout
		init: function(options, callback, relayout) {
			var settings,
			    now = (new Date()).getTime();

			options   = (typeof options === "object") ? options : {};
			callback  = ($.isFunction(callback)) ? callback : function() {};
			callback  = ($.isFunction(options)) ? options : callback;
			settings  = $.extend({}, defaults, options, internalData);

			return this
				.each(function() {
					// make options
					var self = $(this),
					    childCount = self.children(settings.childSelector).length,
					    period = 360.0 / childCount,
					    startingChild = (settings.startingChild && settings.startingChild > (childCount - 1)) ? (childCount - 1) : settings.startingChild,
					    startBearing = (settings.startingChild === null) ? settings.bearing : 360 - (startingChild * period),
					    holderCSSPosition = (self.css("position") !== "static") ? self.css("position") : "relative";

					self
						.css({  // starting styles
							padding:   0,
							position:  holderCSSPosition
						})
						.addClass("roundabout-holder")
						.data(  // starting options
							"roundabout",
							$.extend(
								{},
								settings,
								{
									startingChild: startingChild,
									bearing: startBearing,
									oppositeOfFocusBearing: methods.normalize.apply(null, [settings.focusBearing - 180]),
									dragBearing: startBearing,
									period: period
								}
							)
						);

					// bind based on settings if this init call was not a relayout
					if (!relayout) {
						// bind click-to-focus
						if (settings.clickToFocus) {
							self
								.children(settings.childSelector)
								.each(function(i) {
									$(this)
										.bind("click.roundabout", function() {
											var degrees = methods.getPlacement.apply(self, [i]);

											if (!methods.isInFocus.apply(self, [degrees])) {
												methods.stopAnimation.apply($(this));
												if (!self.data("roundabout").animating) {
													methods.animateBearingToFocus.apply(self, [degrees, self.data("roundabout").clickToFocusCallback]);
												}
												return false;
											}
										});
								});
						}

						// bind next buttons
						if (settings.btnNext) {
							$(settings.btnNext)
								.bind("click.roundabout", function() {
									if (!self.data("roundabout").animating) {
										methods.animateToNextChild.apply(self, [self.data("roundabout").btnNextCallback]);
									}
									return false;
								});
						}

						// bind previous buttons
						if (settings.btnPrev) {
							$(settings.btnPrev)
								.bind("click.roundabout", function() {
									methods.animateToPreviousChild.apply(self, [self.data("roundabout").btnPrevCallback]);
									return false;
								});
						}

						// bind toggle autoplay buttons
						if (settings.btnToggleAutoplay) {
							$(settings.btnToggleAutoplay)
								.bind("click.roundabout", function() {
									methods.toggleAutoplay.apply(self);
									return false;
								});
						}

						// bind start autoplay buttons
						if (settings.btnStartAutoplay) {
							$(settings.btnStartAutoplay)
								.bind("click.roundabout", function() {
									methods.startAutoplay.apply(self);
									return false;
								});
						}

						// bind stop autoplay buttons
						if (settings.btnStopAutoplay) {
							$(settings.btnStopAutoplay)
								.bind("click.roundabout", function() {
									methods.stopAutoplay.apply(self);
									return false;
								});
						}

						// autoplay pause on hover
						if (settings.autoplayPauseOnHover) {
							self
								.bind("mouseenter.roundabout.autoplay", function() {
									methods.stopAutoplay.apply(self, [true]);
								})
								.bind("mouseleave.roundabout.autoplay", function() {
									methods.startAutoplay.apply(self);
								});
						}

						// drag and drop
						if (settings.enableDrag) {
							// on screen
							if (!$.isFunction(self.drag)) {
								if (settings.debug) {
									alert("You do not have the drag plugin loaded.");
								}
							} else if (!$.isFunction(self.drop)) {
								if (settings.debug) {
									alert("You do not have the drop plugin loaded.");
								}
							} else {
								self
									.drag(function(e, properties) {
										var data = self.data("roundabout"),
										    delta = (data.dragAxis.toLowerCase() === "x") ? "deltaX" : "deltaY";
										methods.stopAnimation.apply(self);
										methods.setBearing.apply(self, [data.dragBearing + properties[delta] / data.dragFactor]);
									})
									.drop(function(e) {
										var data = self.data("roundabout"),
										    method = methods.getAnimateToMethod(data.dropAnimateTo);
										methods.allowAnimation.apply(self);
										methods[method].apply(self, [data.dropDuration, data.dropEasing, data.dropCallback]);
										data.dragBearing = data.period * methods.getNearestChild.apply(self);
									});
							}

							// on mobile
							self
								.each(function() {
									var element = $(this).get(0),
									    data = $(this).data("roundabout"),
									    page = (data.dragAxis.toLowerCase() === "x") ? "pageX" : "pageY",
									    method = methods.getAnimateToMethod(data.dropAnimateTo);

									// some versions of IE don't like this
									if (element.addEventListener) {
										element.addEventListener("touchstart", function(e) {
											data.touchMoveStartPosition = e.touches[0][page];
										}, false);

										element.addEventListener("touchmove", function(e) {
											var delta = (e.touches[0][page] - data.touchMoveStartPosition) / data.dragFactor;
											e.preventDefault();
											methods.stopAnimation.apply($(this));
											methods.setBearing.apply($(this), [data.dragBearing + delta]);
										}, false);

										element.addEventListener("touchend", function(e) {
											e.preventDefault();
											methods.allowAnimation.apply($(this));
											method = methods.getAnimateToMethod(data.dropAnimateTo);
											methods[method].apply($(this), [data.dropDuration, data.dropEasing, data.dropCallback]);
											data.dragBearing = data.period * methods.getNearestChild.apply($(this));
										}, false);
									}
								});
						}

						// responsive
						if (settings.responsive) {
							$(window).resize(function() {
								methods.relayoutChildren.apply(self);
							});
						}
					}

					// start children
					methods.initChildren.apply(self, [callback, relayout]);
				});
		},


		// initChildren
		// applys settings to child elements, starts roundabout
		initChildren: function(callback, relayout) {
			var self = $(this),
			    data = self.data("roundabout");

			callback = callback || function() {};
			
			self.children(data.childSelector).each(function(i) {
				var startWidth, startHeight, startFontSize,
				    degrees = methods.getPlacement.apply(self, [i]);

				// on relayout, grab these values from current data
				if (relayout) {
					startWidth = $(this).data("roundabout").startWidth;
					startHeight = $(this).data("roundabout").startHeight;
					startFontSize = $(this).data("roundabout").startFontSize;
				}

				// apply classes and css first
				$(this)
					.addClass("roundabout-moveable-item")
					.css("position", "absolute");

				// now measure
				$(this)
					.data(
						"roundabout",
						{
							startWidth: startWidth || $(this).width(),
							startHeight: startHeight || $(this).height(),
							startFontSize: startFontSize || parseInt($(this).css("font-size"), 10),
							degrees: degrees,
							backDegrees: methods.normalize.apply(null, [degrees - 180]),
							childNumber: i,
							currentScale: 1,
							parent: self
						}
					);
			});

			methods.updateChildren.apply(self);

			// start autoplay if necessary
			if (data.autoplay) {
				methods.startAutoplay.apply(self);
			}

			self.trigger('ready');
			callback.apply(self);
			return self;
		},



		// positioning
		// -----------------------------------------------------------------------

		// updateChildren
		// move children elements into their proper locations
		updateChildren: function() {
			return this
				.each(function() {
					var self = $(this),
					    data = self.data("roundabout"),
					    inFocus = -1,
					    info = {
							bearing: data.bearing,
							tilt: data.tilt,
							stage: {
								width: Math.floor($(this).width() * 0.9),
								height: Math.floor($(this).height() * 0.9)
							},
							animating: data.animating,
							inFocus: data.childInFocus,
							focusBearingRadian: methods.degToRad.apply(null, [data.focusBearing]),
							shape: $.roundaboutShapes[data.shape] || $.roundaboutShapes[$.roundaboutShapes.def]
					    };

					// calculations
					info.midStage = {
						width: info.stage.width / 2,
						height: info.stage.height / 2
					};

					info.nudge = {
						width: info.midStage.width + (info.stage.width * 0.05),
						height: info.midStage.height + (info.stage.height * 0.05)
					};

					info.zValues = {
						min: data.minZ,
						max: data.maxZ,
						diff: data.maxZ - data.minZ
					};

					info.opacity = {
						min: data.minOpacity,
						max: data.maxOpacity,
						diff: data.maxOpacity - data.minOpacity
					};

					info.scale = {
						min: data.minScale,
						max: data.maxScale,
						diff: data.maxScale - data.minScale
					};

					// update child positions
					self.children(data.childSelector)
						.each(function(i) {
							if (methods.updateChild.apply(self, [$(this), info, i, function() { $(this).trigger('ready'); }]) && (!info.animating || data.lastAnimationStep)) {
								inFocus = i;
								$(this).addClass("roundabout-in-focus");
							} else {
								$(this).removeClass("roundabout-in-focus");
							}
						});

					if (inFocus !== info.inFocus) {
						// blur old child
						if (data.triggerBlurEvents) {
							self.children(data.childSelector)
								.eq(info.inFocus)
									.trigger("blur");
						}

						data.childInFocus = inFocus;

						if (data.triggerFocusEvents && inFocus !== -1) {
							// focus new child
							self.children(data.childSelector)
								.eq(inFocus)
									.trigger("focus");
						}
					}

					self.trigger("childrenUpdated");
				});
		},


		// updateChild
		// repositions a child element into its new position
		updateChild: function(childElement, info, childPos, callback) {
			var factors,
			    self = this,
			    child = $(childElement),
			    data = child.data("roundabout"),
			    out = [],
			    rad = methods.degToRad.apply(null, [(360.0 - data.degrees) + info.bearing]);

			callback = callback || function() {};

			// adjust radians to be between 0 and Math.PI * 2
			rad = methods.normalizeRad.apply(null, [rad]);

			// get factors from shape
			factors = info.shape(rad, info.focusBearingRadian, info.tilt);

			// correct
			factors.scale = (factors.scale > 1) ? 1 : factors.scale;
			factors.adjustedScale = (info.scale.min + (info.scale.diff * factors.scale)).toFixed(4);
			factors.width = (factors.adjustedScale * data.startWidth).toFixed(4);
			factors.height = (factors.adjustedScale * data.startHeight).toFixed(4);

			// update item
			child
				.css({
					left: ((factors.x * info.midStage.width + info.nudge.width) - factors.width / 2.0).toFixed(0) + "px",
					top: ((factors.y * info.midStage.height + info.nudge.height) - factors.height / 2.0).toFixed(0) + "px",
					width: factors.width + "px",
					height: factors.height + "px",
					opacity: (info.opacity.min + (info.opacity.diff * factors.scale)).toFixed(2),
					zIndex: Math.round(info.zValues.min + (info.zValues.diff * factors.z)),
					fontSize: (factors.adjustedScale * data.startFontSize).toFixed(1) + "px"
				});
			data.currentScale = factors.adjustedScale;

			// for debugging purposes
			if (self.data("roundabout").debug) {
				out.push("<div style=\"font-weight: normal; font-size: 10px; padding: 2px; width: " + child.css("width") + "; background-color: #ffc;\">");
				out.push("<strong style=\"font-size: 12px; white-space: nowrap;\">Child " + childPos + "</strong><br />");
				out.push("<strong>left:</strong> " + child.css("left") + "<br />");
				out.push("<strong>top:</strong> " + child.css("top") + "<br />");
				out.push("<strong>width:</strong> " + child.css("width") + "<br />");
				out.push("<strong>opacity:</strong> " + child.css("opacity") + "<br />");
				out.push("<strong>height:</strong> " + child.css("height") + "<br />");
				out.push("<strong>z-index:</strong> " + child.css("z-index") + "<br />");
				out.push("<strong>font-size:</strong> " + child.css("font-size") + "<br />");
				out.push("<strong>scale:</strong> " + child.data("roundabout").currentScale);
				out.push("</div>");

				child.html(out.join(""));
			}

			// trigger event
			child.trigger("reposition");
			
			// callback
			callback.apply(self);

			return methods.isInFocus.apply(self, [data.degrees]);
		},



		// manipulation
		// -----------------------------------------------------------------------

		// setBearing
		// changes the bearing of the roundabout
		setBearing: function(bearing, callback) {
			callback = callback || function() {};
			bearing = methods.normalize.apply(null, [bearing]);

			this
				.each(function() {
					var diff, lowerValue, higherValue,
					    self = $(this),
					    data = self.data("roundabout"),
					    oldBearing = data.bearing;

					// set bearing
					data.bearing = bearing;
					self.trigger("bearingSet");
					methods.updateChildren.apply(self);

					// not animating? we're done here
					diff = Math.abs(oldBearing - bearing);
					if (!data.animating || diff > 180) {
						return;
					}

					// check to see if any of the children went through the back
					diff = Math.abs(oldBearing - bearing);
					self.children(data.childSelector).each(function(i) {
						var eventType;

						if (methods.isChildBackDegreesBetween.apply($(this), [bearing, oldBearing])) {
							eventType = (oldBearing > bearing) ? "Clockwise" : "Counterclockwise";
							$(this).trigger("move" + eventType + "ThroughBack");
						}
					});
				});

			// call callback if one was given
			callback.apply(this);
			return this;
		},


		// adjustBearing
		// change the bearing of the roundabout by a given degree
		adjustBearing: function(delta, callback) {
			callback = callback || function() {};
			if (delta === 0) {
				return this;
			}

			this
				.each(function() {
					methods.setBearing.apply($(this), [$(this).data("roundabout").bearing + delta]);
				});

			callback.apply(this);
			return this;
		},


		// setTilt
		// changes the tilt of the roundabout
		setTilt: function(tilt, callback) {
			callback = callback || function() {};

			this
				.each(function() {
					$(this).data("roundabout").tilt = tilt;
					methods.updateChildren.apply($(this));
				});

			// call callback if one was given
			callback.apply(this);
			return this;
		},


		// adjustTilt
		// changes the tilt of the roundabout
		adjustTilt: function(delta, callback) {
			callback = callback || function() {};

			this
				.each(function() {
					methods.setTilt.apply($(this), [$(this).data("roundabout").tilt + delta]);
				});

			callback.apply(this);
			return this;
		},



		// animation
		// -----------------------------------------------------------------------

		// animateToBearing
		// animates the roundabout to a given bearing, all animations come through here
		animateToBearing: function(bearing, duration, easing, passedData, callback) {
			var now = (new Date()).getTime();

			callback = callback || function() {};

			// find callback function in arguments
			if ($.isFunction(passedData)) {
				callback = passedData;
				passedData = null;
			} else if ($.isFunction(easing)) {
				callback = easing;
				easing = null;
			} else if ($.isFunction(duration)) {
				callback = duration;
				duration = null;
			}

			this
				.each(function() {
					var timer, easingFn, newBearing,
					    self = $(this),
					    data = self.data("roundabout"),
					    thisDuration = (!duration) ? data.duration : duration,
					    thisEasingType = (easing) ? easing : data.easing || "swing";

					// is this your first time?
					if (!passedData) {
						passedData = {
							timerStart: now,
							start: data.bearing,
							totalTime: thisDuration
						};
					}

					// update the timer
					timer = now - passedData.timerStart;

					if (data.stopAnimation) {
						methods.allowAnimation.apply(self);
						data.animating = false;
						return;
					}

					// we need to animate more
					if (timer < thisDuration) {
						if (!data.animating) {
							self.trigger("animationStart");
						}

						data.animating = true;

						if (typeof $.easing.def === "string") {
							easingFn = $.easing[thisEasingType] || $.easing[$.easing.def];
							newBearing = easingFn(null, timer, passedData.start, bearing - passedData.start, passedData.totalTime);
						} else {
							newBearing = $.easing[thisEasingType]((timer / passedData.totalTime), timer, passedData.start, bearing - passedData.start, passedData.totalTime);
						}

						newBearing = methods.normalize.apply(null, [newBearing]);
						data.dragBearing = newBearing;

						methods.setBearing.apply(self, [newBearing, function() {
							setTimeout(function() {  // done with a timeout so that each step is displayed
								methods.animateToBearing.apply(self, [bearing, thisDuration, thisEasingType, passedData, callback]);
							}, 0);
						}]);

					// we're done animating
					} else {
						if (data.animating) {
							self.trigger("animationEnd");
						}

						data.lastAnimationStep = true;

						bearing = methods.normalize.apply(null, [bearing]);
						methods.setBearing.apply(self, [bearing]);
						data.animating = false;
						data.lastAnimationStep = false;
						data.dragBearing = bearing;

						callback.apply(self);
					}
				});

			return this;
		},


		// animateToNearbyChild
		// animates roundabout to a nearby child
		animateToNearbyChild: function(passedArgs, which) {
			var duration = passedArgs[0],
			    easing = passedArgs[1],
			    callback = passedArgs[2] || function() {};

			// find callback
			if ($.isFunction(easing)) {
				callback = easing;
				easing = null;
			} else if ($.isFunction(duration)) {
				callback = duration;
				duration = null;
			}

			return this
				.each(function() {
					var j, range,
					    self = $(this),
					    data = self.data("roundabout"),
					    bearing = (!data.reflect) ? data.bearing % 360 : data.bearing,
					    length = self.children(data.childSelector).length;

					if (!data.animating) {
						// reflecting, not moving to previous || not reflecting, moving to next
						if ((data.reflect && which === "previous") || (!data.reflect && which === "next")) {
							// slightly adjust for rounding issues
							bearing = (Math.abs(bearing) < data.floatComparisonThreshold) ? 360 : bearing;

							// clockwise
							for (j = 0; j < length; j += 1) {
								range = {
									lower: (data.period * j),
									upper: (data.period * (j + 1))
								};
								range.upper = (j === length - 1) ? 360 : range.upper;

								if (bearing <= Math.ceil(range.upper) && bearing >= Math.floor(range.lower)) {
									if (length === 2 && bearing === 360) {
										methods.animateToDelta.apply(self, [-180, duration, easing, callback]);
									} else {
										methods.animateBearingToFocus.apply(self, [range.lower, duration, easing, callback]);
									}
									break;
								}
							}
						} else {
							// slightly adjust for rounding issues
							bearing = (Math.abs(bearing) < data.floatComparisonThreshold || 360 - Math.abs(bearing) < data.floatComparisonThreshold) ? 0 : bearing;

							// counterclockwise
							for (j = length - 1; j >= 0; j -= 1) {
								range = {
									lower: data.period * j,
									upper: data.period * (j + 1)
								};
								range.upper = (j === length - 1) ? 360 : range.upper;

								if (bearing >= Math.floor(range.lower) && bearing < Math.ceil(range.upper)) {
									if (length === 2 && bearing === 360) {
										methods.animateToDelta.apply(self, [180, duration, easing, callback]);
									} else {
										methods.animateBearingToFocus.apply(self, [range.upper, duration, easing, callback]);
									}
									break;
								}
							}
						}
					}
				});
		},


		// animateToNearestChild
		// animates roundabout to the nearest child
		animateToNearestChild: function(duration, easing, callback) {
			callback = callback || function() {};

			// find callback
			if ($.isFunction(easing)) {
				callback = easing;
				easing = null;
			} else if ($.isFunction(duration)) {
				callback = duration;
				duration = null;
			}

			return this
				.each(function() {
					var nearest = methods.getNearestChild.apply($(this));
					methods.animateToChild.apply($(this), [nearest, duration, easing, callback]);
				});
		},


		// animateToChild
		// animates roundabout to a given child position
		animateToChild: function(childPosition, duration, easing, callback) {
			callback = callback || function() {};

			// find callback
			if ($.isFunction(easing)) {
				callback = easing;
				easing = null;
			} else if ($.isFunction(duration)) {
				callback = duration;
				duration = null;
			}

			return this
				.each(function() {
					var child,
					    self = $(this),
					    data = self.data("roundabout");

					if (data.childInFocus !== childPosition && !data.animating) {
						child = self.children(data.childSelector).eq(childPosition);
						methods.animateBearingToFocus.apply(self, [child.data("roundabout").degrees, duration, easing, callback]);
					}
				});
		},


		// animateToNextChild
		// animates roundabout to the next child
		animateToNextChild: function(duration, easing, callback) {
			return methods.animateToNearbyChild.apply(this, [arguments, "next"]);
		},


		// animateToPreviousChild
		// animates roundabout to the preious child
		animateToPreviousChild: function(duration, easing, callback) {
			return methods.animateToNearbyChild.apply(this, [arguments, "previous"]);
		},


		// animateToDelta
		// animates roundabout to a given delta (in degrees)
		animateToDelta: function(degrees, duration, easing, callback) {
			callback = callback || function() {};

			// find callback
			if ($.isFunction(easing)) {
				callback = easing;
				easing = null;
			} else if ($.isFunction(duration)) {
				callback = duration;
				duration = null;
			}

			return this
				.each(function() {
					var delta = $(this).data("roundabout").bearing + degrees;
					methods.animateToBearing.apply($(this), [delta, duration, easing, callback]);
				});
		},


		// animateBearingToFocus
		// animates roundabout to bring a given angle into focus
		animateBearingToFocus: function(degrees, duration, easing, callback) {
			callback = callback || function() {};

			// find callback
			if ($.isFunction(easing)) {
				callback = easing;
				easing = null;
			} else if ($.isFunction(duration)) {
				callback = duration;
				duration = null;
			}

			return this
				.each(function() {
					var delta = $(this).data("roundabout").bearing - degrees;
					delta = (Math.abs(360 - delta) < Math.abs(delta)) ? 360 - delta : -delta;
					delta = (delta > 180) ? -(360 - delta) : delta;

					if (delta !== 0) {
						methods.animateToDelta.apply($(this), [delta, duration, easing, callback]);
					}
				});
		},


		// stopAnimation
		// if an animation is currently in progress, stop it
		stopAnimation: function() {
			return this
				.each(function() {
					$(this).data("roundabout").stopAnimation = true;
				});
		},


		// allowAnimation
		// clears the stop-animation hold placed by stopAnimation
		allowAnimation: function() {
			return this
				.each(function() {
					$(this).data("roundabout").stopAnimation = false;
				});
		},



		// autoplay
		// -----------------------------------------------------------------------

		// startAutoplay
		// starts autoplaying this roundabout
		startAutoplay: function(callback) {
			return this
				.each(function() {
					var self = $(this),
					    data = self.data("roundabout");

					callback = callback || data.autoplayCallback || function() {};

					clearInterval(data.autoplayInterval);
					data.autoplayInterval = setInterval(function() {
						methods.animateToNextChild.apply(self, [callback]);
					}, data.autoplayDuration);
					data.autoplayIsRunning = true;
					
					self.trigger("autoplayStart");
				});
		},


		// stopAutoplay
		// stops autoplaying this roundabout
		stopAutoplay: function(keepAutoplayBindings) {
			return this
				.each(function() {
					clearInterval($(this).data("roundabout").autoplayInterval);
					$(this).data("roundabout").autoplayInterval = null;
					$(this).data("roundabout").autoplayIsRunning = false;
					
					// this will prevent autoplayPauseOnHover from restarting autoplay
					if (!keepAutoplayBindings) {
						$(this).unbind(".autoplay")
					}
					
					$(this).trigger("autoplayStop");
				});
		},
		
		
		// toggleAutoplay
		// toggles autoplay pause/resume
		toggleAutoplay: function(callback) {
			return this
				.each(function() {
					var self = $(this),
					    data = self.data("roundabout");

					callback = callback || data.autoplayCallback || function() {};

					if (!methods.isAutoplaying.apply($(this))) {
						methods.startAutoplay.apply($(this), [callback]);
					} else {
						methods.stopAutoplay.apply($(this), [callback]);
					}
				});
		},


		// isAutoplaying
		// is this roundabout currently autoplaying?
		isAutoplaying: function() {
			return (this.data("roundabout").autoplayIsRunning);
		},


		// changeAutoplayDuration
		// stops the autoplay, changes the duration, restarts autoplay
		changeAutoplayDuration: function(duration) {
			return this
				.each(function() {
					var self = $(this),
					    data = self.data("roundabout");

					data.autoplayDuration = duration;

					if (methods.isAutoplaying.apply(self)) {
						methods.stopAutoplay.apply(self);
						setTimeout(function() {
							methods.startAutoplay.apply(self);
						}, 10);
					}
				});
		},



		// helpers
		// -----------------------------------------------------------------------		

		// normalize
		// regulates degrees to be >= 0.0 and < 360
		normalize: function(degrees) {
			var inRange = degrees % 360.0;
			return (inRange < 0) ? 360 + inRange : inRange;
		},


		// normalizeRad
		// regulates radians to be >= 0 and < Math.PI * 2
		normalizeRad: function(radians) {
			while (radians < 0) {
				radians += (Math.PI * 2);
			}

			while (radians > (Math.PI * 2)) {
				radians -= (Math.PI * 2);
			}

			return radians;
		},


		// isChildBackDegreesBetween
		// checks that a given child's backDegrees is between two values
		isChildBackDegreesBetween: function(value1, value2) {
			var backDegrees = $(this).data("roundabout").backDegrees;

			if (value1 > value2) {
				return (backDegrees >= value2 && backDegrees < value1);
			} else {
				return (backDegrees < value2 && backDegrees >= value1);
			}
		},


		// getAnimateToMethod
		// takes a user-entered option and maps it to an animation method
		getAnimateToMethod: function(effect) {
			effect = effect.toLowerCase();

			if (effect === "next") {
				return "animateToNextChild";
			} else if (effect === "previous") {
				return "animateToPreviousChild";
			}

			// default selection
			return "animateToNearestChild";
		},
		
		
		// relayoutChildren
		// lays out children again with new contextual information
		relayoutChildren: function() {
			return this
				.each(function() {
					var self = $(this),
					    settings = $.extend({}, self.data("roundabout"));

					settings.startingChild = self.data("roundabout").childInFocus;
					methods.init.apply(self, [settings, null, true]);
				});
		},


		// getNearestChild
		// gets the nearest child from the current bearing
		getNearestChild: function() {
			var self = $(this),
			    data = self.data("roundabout"),
			    length = self.children(data.childSelector).length;

			if (!data.reflect) {
				return ((length) - (Math.round(data.bearing / data.period) % length)) % length;
			} else {
				return (Math.round(data.bearing / data.period) % length);
			}
		},


		// degToRad
		// converts degrees to radians
		degToRad: function(degrees) {
			return methods.normalize.apply(null, [degrees]) * Math.PI / 180.0;
		},


		// getPlacement
		// returns the starting degree for a given child
		getPlacement: function(child) {
			var data = this.data("roundabout");
			return (!data.reflect) ? 360.0 - (data.period * child) : data.period * child;
		},


		// isInFocus
		// is this roundabout currently in focus?
		isInFocus: function(degrees) {
			var diff,
			    self = this,
			    data = self.data("roundabout"),
			    bearing = methods.normalize.apply(null, [data.bearing]);

			degrees = methods.normalize.apply(null, [degrees]);
			diff = Math.abs(bearing - degrees);

			// this calculation gives a bit of room for javascript float rounding
			// errors, it looks on both 0deg and 360deg ends of the spectrum
			return (diff <= data.floatComparisonThreshold || diff >= 360 - data.floatComparisonThreshold);
		}
	};


	// start the plugin
	$.fn.roundabout = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === "object" || $.isFunction(method) || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error("Method " + method + " does not exist for jQuery.roundabout.");
		}
	};
})(jQuery);/*
* Lazy Load - jQuery plugin for lazy loading images
*
* Copyright (c) 2007-2009 Mika Tuupola
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
* Project home:
*   http://www.appelsiini.net/projects/lazyload
*
* Version:  1.5.0
*
*/
(function ($) {
    $.fn.lazyload = function (options) {
        var settings = {
            threshold: 0,
            failurelimit: 0,
            event: "scroll",
            effect: "show",
            container: window
        };
        if (options) {
            $.extend(settings, options);
        }
        /* Fire one scroll event per scroll. Not one scroll event per image. */
        var elements = this;
        if ("scroll" == settings.event) {
            $(settings.container).on("scroll", function (event) {
            	//elements = $('img[data-original]');
                var counter = 0;
                // console.log(elements)
                elements.each(function () {
                    /*if ($.abovethetop(this, settings) || $.leftofbegin(this, settings)) {

                    } else */if (!$.belowthefold(this, settings)) {
                        $(this).trigger("appear");
                    } else {
                        if (counter++ > settings.failurelimit) {
                            return false;
                        }
                    }
                });
                /* Remove image from array so it is not looped next time. */
                var temp = $.grep(elements, function (element) {
                    return !element.loaded;
                });
                elements = $(temp);
            });
        }
        
        this.each(function (i) {
            var self = this;
            //É¾³ýµÄ´úÂë
            /* When appear is triggered load original image. */
            $(self).one("appear", function () {
                if (!this.loaded) {
            		//console.log($(self))
                    $("<img />").bind("load", function () {
					    $(self).hide().attr("src", $(self).data("original"))[settings.effect](settings.effectspeed).removeAttr('data-original');
					    self.loaded = true;
					})
					.attr("src", $(self).data("original"));
                };
                $(self).hide().attr("src", $(self).data("original"))[settings.effect](settings.effectspeed).removeAttr('data-original');
            });
            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if ("scroll" != settings.event) {
                $(self).bind(settings.event, function (event) {
                    if (!self.loaded) {
                        $(self).trigger("appear");
                    }
                });
            }
        });
        /* Force initial check if images should appear. */
        $(settings.container).trigger(settings.event);
        return this;
    };
    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */
    $.belowthefold = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).height() + $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return fold <= $(element).offset().top - settings.threshold;
    };
    $.rightoffold = function (element, settings) {
        return false;
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).width() + $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left + $(settings.container).width();
        }
        return fold <= $(element).offset().left - settings.threshold;
    };
    $.abovethetop = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top;
        }
        return fold >= $(element).offset().top + settings.threshold + $(element).height();
    };
    $.leftofbegin = function (element, settings) {
        return false;
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left;
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };
    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() */
    $.extend($.expr[':'], {
        "below-the-fold": "$.belowthefold(a, {threshold : 0, container: window})",
        "above-the-fold": "!$.belowthefold(a, {threshold : 0, container: window})",
        "right-of-fold": "$.rightoffold(a, {threshold : 0, container: window})",
        "left-of-fold": "!$.rightoffold(a, {threshold : 0, container: window})"
    });
})(jQuery);/**
 * jQuery Plugin to obtain touch gestures
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010)
 */
;(function($, undefined){
   $.fn.touchwipe = function(settings) {
     var config = {
            min_move_x: 50,
            min_move_y: 20,
            wipeLeft: function() { },
            wipeRight: function() { },
            preventDefaultEvents: false
     };
     
     if (settings) $.extend(config, settings);
 
     this.each(function() {
         var startX;
         var startY;
         var isMoving = false;
         var directionLocked = null;

         function cancelTouch() {
             this.removeEventListener('touchmove', onTouchMove);
             startX = null;
             isMoving = false;
             directionLocked = false;
         }  
         
         function onTouchMove(e) {
             if(config.preventDefaultEvents) {
                 e.preventDefault();
             }
             if(isMoving) {
                 var x = e.changedTouches ? e.changedTouches[0].clientX: e.clientX;
                 var y = e.changedTouches ? e.changedTouches[0].clientY: e.clientY;
                 var dx = startX - x;
                 var dy = startY - y;
                 
                var absDistX = Math.abs(dx);
                var absDistY = Math.abs(dy);

                if (directionLocked === "y") {
                    return
                } else {
                    if (directionLocked === "x") {
                        e.preventDefault()
                    } else {
                        absDistX = Math.abs(dx);
                        absDistY = Math.abs(dy);
                        if (absDistX < 4) {
                            return
                        }
                        if (absDistY > absDistX ) {
                            dx = 0;
                            directionLocked = "y";
                            return
                        } else {
                            e.preventDefault();
                            directionLocked = "x"
                        }
                    }
                }

                if(absDistX >= config.min_move_x) {
                    cancelTouch();
                    if(dx > 0) {
                        config.wipeLeft();
                    }
                    else {
                        config.wipeRight();
                    }
                 }
             }
         }
         
         function onTouchStart(e)
         {
             if (e.touches.length == 1) {
                 startX = e.changedTouches ? e.changedTouches[0].clientX: e.clientX;
                 startY = e.changedTouches ? e.changedTouches[0].clientY: e.cl;
                 isMoving = true;
                 directionLocked = false;
                 this.addEventListener('touchmove', onTouchMove, false);
             }
         }       
         if ('ontouchstart' in document.documentElement) {
             this.addEventListener('touchstart', onTouchStart, false);
         }
     });
 
     return this;
   };
 })(jQuery);


 var designerUl = $('.star .swiper-container ul');
    designerUl.roundabout({
        autoplay : true,
        autoplayDuration : 5000,
        autoplayPauseOnHover : true,
        minScale: 0.2,
        btnPrev: '.star .pre-arrow',
        btnNext: '.star .next-arrow',
        autoplayCallback : function(){
            $('.star .bottom-des').attr('href', $(this).find('.roundabout-in-focus a').attr('href'));
            $('.star .bottom-des').html($(this).find('.roundabout-in-focus').data('des'));
        },
        clickToFocusCallback : function(){
            $('.star .bottom-des').attr('href', $(this).find('.roundabout-in-focus a').attr('href'));
            $('.star .bottom-des').html($(this).find('.roundabout-in-focus').data('des'));
        },
        btnPrevCallback : function(){
            $('.star .bottom-des').attr('href', $(this).find('.roundabout-in-focus a').attr('href'));
            $('.star .bottom-des').html($(this).find('.roundabout-in-focus').data('des'));
        },
        btnNextCallback : function(){
            $('.star .bottom-des').attr('href', $(this).find('.roundabout-in-focus a').attr('href'));
            $('.star .bottom-des').html($(this).find('.roundabout-in-focus').data('des'));
        }
    });

    designerUl.touchwipe({
        wipeLeft: function() {
            $('.star .next-arrow').trigger('click');
        },
        wipeRight: function() {
            $('.star .pre-arrow').trigger('click');
        }
    })