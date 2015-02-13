var lightbox = Class.create();  

lightbox.prototype = {
       yPos : 0,
       xPos : 0,
      //构造方法,ctrl为创建该对象的元素
       initialize: function(ctrl) {
              //将该元素的链接赋值给this.content
              this.content = ctrl.href;
              //为该元素添加onclick事件activate方法
              Event.observe(ctrl, 'click', this.activate.bindAsEventListener(this), false);
              ctrl.onclick = function(){return false;};
       },

       //当单击链接时
       activate: function(){
              if (browser == 'Internet Explorer'){//判断为IE浏览器
                     this.getScroll();
                     this.prepareIE('100%', 'hidden');
                     this.setScroll(0,0);
                     this.hideSelects('hidden');//隐藏所有的<select>标记
              }
              //调用该类中的displayLightbox方法
              this.displayLightbox("block");
      },

      prepareIE: function(height, overflow){
            bod = document.getElementsByTagName('body')[0];
            bod.style.height = height;
            bod.style.overflow = overflow;
  
            htm = document.getElementsByTagName('html')[0];
            htm.style.height = height;
            htm.style.overflow = overflow; 
      },

      hideSelects: function(visibility){
           selects = document.getElementsByTagName('select');
           for(i = 0; i < selects.length; i++) {
                   selects[i].style.visibility = visibility;
            }
      },

      getScroll: function(){
            if (self.pageYOffset) {
                    this.yPos = self.pageYOffset;
            } else if (document.documentElement && document.documentElement.scrollTop){
                    this.yPos = document.documentElement.scrollTop; 
            } else if (document.body) {
                    this.yPos = document.body.scrollTop;
            }
      },

      setScroll: function(x, y){
            window.scrollTo(x, y); 
      },

      displayLightbox: function(display){
            //将覆盖层显示
            $('overlay').style.display = display;
            //将高亮层显示
            $('lightbox').style.display = display;
            //如果不是隐藏状态,则调用该类中的loadInfo方法
            if(display != 'none') this.loadInfo();
      },

      //该方法发送Ajax请求
      loadInfo: function() {
            //当请求完成后调用本类中processInfo方法
            var myAjax = new Ajax.Request(
          this.content,
          {method: 'get', parameters: "", onComplete: this.processInfo.bindAsEvent Listener (this)}
           );

      },
      // 将返回的文本信息显示到高亮层上
      processInfo: function(response){
           //获得返回的文本数据
           var result = response.responseText;
           //显示到高亮层
           info = "<div id='lbContent'>" + result + "</div>";
           //在info元素前插入一个元素
           new Insertion.Before($('lbLoadMessage'), info)
           //改变该元素的class name的值
           $('lightbox').className = "done"; 
           //调用本类中actions方法
           this.actions();
           var ctrl=$('lightbox');
           //为高亮层添加事件处理方法reset
          Event.observe(ctrl, 'click', this.reset.bindAsEventListener(this), false);
           ctrl.onclick = function(){return false;};
      },
      //恢复初始状态 
      reset:function(){
            //隐藏覆盖层
           $('overlay').style.display="none";
           //清空返回数据
            $('lbContent').innerHTML="";
            //隐藏高亮层
           $('lightbox').style.display="none";
     },
     // Search through new links within the lightbox, and attach click event
     actions: function(){
           lbActions = document.getElementsByClassName('lbAction');
           for(i = 0; i < lbActions.length; i++) {
                   Event.observe(lbActions[i], 'click', this[lbActions[i].rel].bindAs EventListener(this), false);
                   lbActions[i].onclick = function(){return false;};
           }

     }
}
