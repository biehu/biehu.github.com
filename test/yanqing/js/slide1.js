
/*
顶部大图滚动
*/
var slide = (function() {
    var quadEaseOut;
    var doc = document;

    var $ = function(s){
        return document.getElementById(s);
    }
    /**
     获取索引值，工具类
     @param {Element} current 当前元素
     @param {Object} obj 元素集合
    **/
    var getIndex = function(current, obj) {
        for (var i=0; i<obj.length; i++) {
            if (obj[i] == current) {
                return i;
            }
        }
    };

    /**
     @param {Element} el 目标元素
    **/
    var siblings = function(el) {
        var r = [],
            n = el.parentNode.firstChild;
        for ( ; n; n = n.nextSibling ) {
            if ( n.nodeType === 1 && n !== el ) {
                r.push( n );
            }
        }
        return r;
    };

    /**
     设置 Slide 宽高
     @param {Element} el Slide 元素
     @param {Number} width Slide 宽度
     @param {Number} height Slide 高度
    **/
    var setSlideWH = function(el, width, height) {
        var styleW,
            styleH;
        if (width == '100%') {      // 自适应宽度
            styleW = '100%';
        } else {                    // 定宽
            styleW = width + 'px';
        }
        
        if (height == '100%') {     // 自适应高度
            styleH = '100%';
        } else {                    // 定高
            styleH = height + 'px';
        }
        
        el.style.width = styleW;
        el.style.height = styleH;

        
    };
    
    var readStyle = function(obj, name){
        if(obj.style[name]){
            return obj.style[name];
        }else if(obj.currentStyle){
            return obj.currentStyle[name]
        }else if(document.defaultView && document.defaultView.getComputedStyle){
            var d=document.defaultView.getComputedStyle(obj,null);
            return d.getPropertyValue(name)
        }else{
            return null
        }
    };
    var style = {
        setOpacity : function(obj,opacity){
            if(typeof(obj.style.opacity) != 'undefined'){
                obj.style.opacity = opacity;
            }else{
                obj.style.filter = 'Alpha(Opacity=' + (opacity*100) + ')';
            };
        }
    };
    /* 动画 */
    var extend = {
        /**
         渐显元素
         @param {Element} target 目标元素
        **/
        fadeIn : function(obj,time){
            if(readStyle(obj, 'display') == 'none'){
                obj.style.display = 'block';
            };
            style.setOpacity(obj,0);
            time = time || 200;
            var opacity = 0,step = time / 20;
            clearTimeout(obj.showT);
            obj.showT = setTimeout(function(){
                if(opacity >= 1) { style.setOpacity(obj,1); return; }
                opacity +=1/step;
                style.setOpacity(obj,opacity);
                obj.showT = setTimeout(arguments.callee,20);
            },20);
        },
        
        /**
         渐隐元素
         @param {Element} target 目标元素
        **/
        fadeOut : function(obj,time){
            time = time || 200;
            style.setOpacity(obj,1);
            var opacity = 1,step = time / 20;
            clearTimeout(obj.showT);
            obj.showT = setTimeout(function(){
                if(opacity <= 0){
                    obj.style.display = 'none'; 
                    style.setOpacity(obj,0);
                    return;
                };
                opacity -= 1/step;
                obj.showT = setTimeout(arguments.callee,20);
            },20);
        },
        /**
         动画元素
         @param {Element} target 目标元素
         @param {String} key target样式
         @param {Number} start key初始值
         @param {Number} end key结束值
         @param {Number} speed 速度
         @param {Function} endFn 结束时的回调
         @param {String} u 样式单位
        **/
        actPX : function(obj,key,start,end,speed,endFn,u){
          if(typeof(u) == 'undefined'){u = 'px'};
          clearTimeout(obj['_extend_actPX' + key.replace(/\-\.\=/,'_') + '_timeOut']);
          if(start > end){
            speed = - Math.abs(speed);
          }else{
            speed = Math.abs(speed);
          };
          var now = start;
          var length = end - start;
          obj['_extend_actPX' + key.replace(/\-\.\=/,'_') + '_timeOut'] = setTimeout(function(){
            now += speed;
            var space = end - now;
            if(start < end){
              if(space < length/3){
                speed = Math.ceil(space/3);
              };
              if(space <= 0){ 
                obj[key] = end + u;
                if(endFn){endFn()};
                return;
              };
            }else{
              if(space > length/3){
                speed = Math.floor(space/3);
              };
              if(space >= 0){ 
                obj[key] = end + u;
                if(endFn){endFn()};
                return;
              };
            };
            
            obj[key] = now + u;
            obj['_extend_actPX' + key.replace(/\-\.\=/,'_') + '_timeOut'] = setTimeout(arguments.callee,20);
            
          },20);
        }
    }
    /**
     配置
    **/
    var config = {
        imgData: [],                    // 初使化图片信息
        imgTargetId: '',                // 初使化 Slide 目标 ID
        imgWidth: '100%',               // 初使化图片宽度
        imgHeight: '100%',              // 初使化图片高度
        imgAuto: false,                 // 初使化自动播放
        imgInterval: 3000,              // 初使化间隔时间
        imgDataLen: 0,                  // 初使化图片数量
        goSwitch: true,                 // 鼠标悬停时切换状态
        index: 4,                       // 焦点所在索引值
        _index: 0,
        curImg: 5,
        indexShow : 5
    };

    /**
     生成并插入 Slide 结构
    **/
    

    var buildSlide = function() {
        // 注入 Slide 结构
        var panelHtml  = $('_slide').getElementsByTagName('ul')[0].innerHTML;
        var aLi = $('_slide').getElementsByTagName('ul')[0].getElementsByTagName('li');
        $('_slide').getElementsByTagName('ul')[0].innerHTML = panelHtml + panelHtml;
        
        // 设置宽高
        setSlideWH($(config.imgTargetId), config.imgWidth, config.imgHeight);
        $('_slide').getElementsByTagName('ul')[0].style.left = '-' + aLi[0].offsetWidth * 4 + 'px';
    };

    quadEaseOut = function (t, b, c, d, s) {
       return -c *(t/=d)*(t-2) + b;
    };
    var move = function(){
        //var e = this;
        clearTimeout(config.timer),
        config.t < 50 ? (boxMoveTo(Math.round(quadEaseOut(config.t += 3, config.b, config.c, 50))), config.timer=setTimeout(function(){move()}, 30)) : boxMoveTo(config.target)
    }
    var boxMoveTo = function(e){
        $('slide_list').style.left = e+"px"
    }

    //var dotNum = 0;
    var d  = false;
    var run = function(e, t){
        
        var slideList = $('slide_list').getElementsByTagName('li');
       // dotList = $("focus_dot").getElementsByTagName('li');
        
            slideList[config._index].className = '';
            for(var i=0; i<config.imgData*2; i++){
                slideList[i].className = '';
//                slideList[i].getElementsByTagName("p")[0].style.display = 'none';
                }

//          for(var i=0; i<config.imgData; i++){
//              dotList[i].className = '';
//              }
        e = e < 0 ? config.imgData - 1 : e > config.imgData ? 1 : e,
        config.target = -Math.abs(slideList[0].offsetWidth)*(config.index = e),
        config.t = 0,
        config.b = t ? config.target - slideList[0].offsetWidth : config.target + slideList[0].offsetWidth,
        config.c = config.target - config.b,
        
        move();
        
        config.curImg = config.index + 1 > 6 ? 1 : (config.index + 1);
        slideList[config.curImg].className = 'cur';
        var dotN = 0;
        if(config.index >= 4){
            dotN = config.index - 4;
        }else{
            dotN = config.curImg;
        }
//        dotList[dotN].className = "current";
        slideList[config.curImg].getElementsByTagName("p")[0].style.display = 'block';
        config._index = config.curImg;
    }

    
    /**
     自动切换
    **/
    var b = false, c = false, timerA = null;
    var autoSwitch = function() {
        var slideList = $('slide_list').getElementsByTagName('li');
        // 遍历触发器
        for (var i=0; i<config.imgDataLen; i++) {
            // 找到当前触发器
            if (slideList[i].className == 'cur') {
                // 获得当前触发器的索引
                config.index = getIndex(slideList[i], slideList);
            }
        }

        var autoFun = function() {
            if (config.goSwitch) {
                
                config.index = config.index == 5 ? 0 : config.index;

                if(!b){
                    b = true;
                    config.index = 0;
                }

                if(config.index == 3 && !c){
                    clearInterval(timerA);
                    timerA = setInterval(autoFun, 10000);
                    c = true;
                }else if(c){
                    c = false;
                    clearInterval(timerA);
                    timerA = setInterval(autoFun, config.imgInterval);
                }
                
                //console.log(config.index);                
                run(config.index, !1);              
                config.index += 1;
            }
            
        };
        
        timerA = setInterval(autoFun, config.imgInterval);
    };
    /**
     手指事件
    **/
    var touchFun = function(evt){
        var $ = function(o){ return document.querySelector(o)}, $$ = function(o){ return document.querySelectorAll(o)}, touchInfo = {startX:0, endX:0}, slide = $('#slide'), btnL = $('#sliderL'), btnR = $('#sliderR');
        slide.addEventListener('touchstart', function(evt) {
               evt.preventDefault();       
               if(evt.changedTouches.length == 0)  return;
               touchInfo.startX = evt.changedTouches[0].pageX;
        }, false);
        slide.addEventListener('touchend', function(evt) {
               evt.preventDefault();
               if(evt.changedTouches.length == 0) return;
               touchInfo.endX = evt.changedTouches[0].pageX; 
               var offset = touchInfo.endX - touchInfo.startX; 

               if(offset < 0) {
                    run(++config.index, !1)
               } else if(offset > 0) {
                   run(--config.index, !0)
               }else{
                    if(evt.target.parentNode.parentNode.className == 'cur'){
                        window.open(evt.target.parentNode.getAttribute('href'), '_blank');
                    }else{
                        return;
                    }
               }
        },false);
        
        
        btnL.addEventListener('touchend', function() {run(++config.index, !1)}, false)
        btnR.addEventListener('touchend', function() {run(--config.index, !0)}, false)
    };
    return {
        init: function(obj, e) {
            // 获取配置信息
            config.imgData = obj.data;                              // 设置图片信息
            config.imgTargetId = obj.targetId;                      // 设置 Slide 目标 ID
            config.imgWidth = obj.width || config.imgWidth;         // 设置图片宽度
            config.imgHeight = obj.height || config.imgHeight;      // 设置图片高度
            config.imgAuto = obj.auto || config.imgAuto;            // 设置自动播放
            config.imgInterval = obj.interval || config.imgInterval;// 设置间隔时间
            //config.imgDataLen = config.imgData.length;                // 设置图片数量
            
            // 生成 Slide 结构
            buildSlide();
            var slideList = $('slide_list').getElementsByTagName('li');
            $('slide_list').style.width = slideList[0].offsetWidth*slideList.length + 'px';
            slideList[config.curImg].className = 'cur';
            var btnL = $('sliderL'), btnR = $('sliderR'), btnClose = $('slidClosed');
            btnR.onclick = function(){  
                clearInterval(timerA);
                config.index += 1;
                run(config.index, !1)
            }
        
            btnL.onclick = function(){ 
                clearInterval(timerA);
                config.index -= 1;
                run(config.index, !0)
            }
            $('slide').onmouseover = function(event){
                config.index = Math.ceil(Math.abs(parseInt($('_slide').getElementsByTagName('ul')[0].style.left)/slideList[0].offsetWidth));
                clearInterval(timerA);
                timerA = null;
                event.stopPropagation();
            }
            $('slide').onmouseout = function(event){
                if (config.imgAuto) {
                    
                    autoSwitch();
                }
                config.index = config.curImg;
                event.stopPropagation();
            }
            if(/ipad;/i.test(navigator.userAgent.toLowerCase())){
                touchFun(e);
            }
            // 自动切换
            if (config.imgAuto) {
                autoSwitch();
            }

//             dotList = $("focus_dot").getElementsByTagName('li');
//        
//              var n;
//              for(n = 0; n < dotList.length; n++ ){
//                      dotList[n].index = n;
//                      dotList[n].onclick = function() {   
//                          if(config.curImg == this.index || config.curImg == this.index + 5) return;
//                          var n = 0;
//                          n = config.curImg > 4 ? 0 : config.curImg;
//                          
//                          if(this.index > n){
//                              run(this.index-1, !1);
//                          }else{
//                              run(this.index-1, !0)
//                          }
//                          config.curImg = this.index;
//                      }
//                  
//              }
        }
    }
})();
