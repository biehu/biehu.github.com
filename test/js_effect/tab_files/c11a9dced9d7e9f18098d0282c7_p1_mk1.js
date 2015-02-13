// 焦点图

                // ---------------
                
            
                
                (function () {
                    
                    var Focus = function (element) {
                        this.element = element;
                    };
                    
                    Focus.prototype.show = function (type) {

                        var link = $('#j-focus-img-small-pics-list').find('a'),
                            selectedIndex = link.index(this.element);
                            
                            if (type === 'next') {
                                selectedIndex < link.length - 1 ? selectedIndex += 1 : selectedIndex = 0;
                            }
                            
                            if (type === 'prev') {
                                selectedIndex > 0 ? selectedIndex -= 1 : selectedIndex = link.length - 1;
                            }
                        
                        $('#j-focus-img-big-pics').find('li').hide().eq(selectedIndex).fadeIn();
                        link.removeClass();
  link.eq(selectedIndex).addClass('focus-img-small-on');                
                        
                            
                    };
                    
                    Focus.prototype.next = function () {
                        this.show('next');
                    };
                    
                    Focus.prototype.prev = function () {
                        this.show('prev');
                    };
                    
                    
                    $.fn.focus = function ( option ) {
                        return this.each(function () {
                          var $this = $(this);
                          var data  = $this.data('focus');
                    
                          if (!data) $this.data('focus', (data = new Focus($this)));
                    
                          if (typeof option == 'string') data[option]();
                        })
                      };
                      
                      
                      var timer,
                      
                      autoPlay = function () {
                          if (timer) {
                              clearInterval(timer);
                          }
                          
                          timer = setInterval(function(){
                              $('.focus-img-small-on').focus('next');
                           }, 5000);
                      },
                      
                       init = function(){
                           
                           autoPlay();
                          $('#j-focus-img-small-pics-list').delegate('a', 'click', function(){
                              $(this).focus('show');
                              autoPlay();
                              return false;
                          });
                          
                          $('#j-focus-img-prev').click(function(){
                              $('.focus-img-small-on').focus('prev');
                              autoPlay();
                              return false;
                              
                          });
                          
                          $('#j-focus-img-next').click(function(){
                              $('.focus-img-small-on').focus('next');
                              autoPlay();
                              return false;
                              
                          });
                          
                         
                      };
                    
                    init();
                    
                    
                    
                })();
                
                // 家居微电影左右切换
                // ----------------------
                
                
                var imgPlay=(function(){
    var current=0;
    var duration=16;//一次变化需要的次数
    var scrollInterval;
    var focusPic=$('#j-list');
    var focusPicList = focusPic.find('ul');
    var focusPicItem = focusPicList.find('li');
    var allWidth = focusPicItem.outerWidth(true) * focusPicItem.length;
    var step=focusPic.width();//一次变化的宽度
    var scrollPaneNum= Math.floor(allWidth / step);//变化的屏数
    
    focusPicList.width(allWidth);
    
    
    
    //算法
    function cpu(t,b,c,d) {return c*((t=t/d-1)*t*t+1)+b;}
    
    return{
        init: function () {
            $('#j-prev').click(this.turnLeft);
            $('#j-next').click(this.turnRight);
        },
        
        turnRight:function(){
            current++;
            if(current>scrollPaneNum) current=scrollPaneNum;
            
            imgPlay.scroll();
            
            return false;
        },
        turnLeft:function(){
            
            current--;
            if(current<0) current=0;
            
            imgPlay.scroll();
            return false;
        },
        scroll:function(){
            var count=0;//一次变化的当前次数
            clearInterval(scrollInterval);

            //移动距离
            var begin_value=focusPic.scrollLeft();
            var chang_in_value=current*step-begin_value;

            //切换
            scrollInterval=setInterval(function(){
                focusPic.scrollLeft(cpu(count,begin_value,chang_in_value,duration));
                count++;
                if(count==duration){
                    clearInterval(scrollInterval);
                    scrollInterval=0;
                    count=0;
                    focusPic.scrollLeft(begin_value+chang_in_value);
                }
            },10);
        }
    }
})();

imgPlay.init();


// 模块切换数据
// ----------------------------

var LoadTab = function (rootSelector, url) {
    this.content = $(rootSelector).find('.section-content');
    this.link = $(rootSelector).find('a[data-id]');
    this.url = url;
    
    this.init();
    
    
};

LoadTab.prototype.init = function () {
    var self = this;
    
    this.link.click(function () {
        self.elem = $(this);
        self.changeLinkStyle();
        self.send();
        return false;
    });
};


LoadTab.prototype.changeLinkStyle = function () {
    this.link.css('color', 'inherit');
    this.elem.css('color', '#ff7e00');
};


LoadTab.prototype.send = function () {
   
    
    
    var id = this.elem.data('id'),
        self = this;
    
    $.ajax({
        'type': 'GET',
        'url': this.url + id,
        'dataType': 'jsonp',
        'success': function (data) {
            self.set(data);
        }
    
    });
};


LoadTab.prototype.set = function(data){
    
    if (data.success !== 1) {
		this.content.html('暂时没有数据！');
        return;
    }
    
    if (this.elem.data('htmlStr')) {
        this.content.html(this.elem.data('htmlStr'));
        return;
    }
    
    var d = data.data,
        len = d.length,
        i,
        htmlStr = '',
        item,
        name;
        
    for (i = 0; i < len; i += 1) {
        item = d[i];
        name = item['name'];
        
        if (name.length > 11) {
            name = name.substring(0, 11);
        }
        
       
        
        if (i === 0) {
            htmlStr += '<div class="img-arrange-big-pic">\
                                <a class="play-img" href="'+item['link']+'"><img src="'+item['pic']+'" width="340" height="263" alt=""><span class="play-btn"></span><strong><span title="'+ item['name']  +'">'+name+'</span></strong></a>\
                            </div><div class="img-arrange-small-pics">\
                                <ul>';
        
                        
        }
        
        else {
        
        htmlStr += '<li><a class="play-img" href="'+item['link']+'"><img src="'+item['pic']+'" width="165" height="130" alt=""><span class="play-btn"></span><strong><span title="'+ item['name']  +'">'+name+'</span></strong></a></li>';
        
        }
    }
    
    
    this.elem.data('htmlStr', htmlStr);
    
    this.content.html(htmlStr);

};

 new LoadTab('#j-look', 'http://supports.jiaju.sina.com.cn/video/index.php?mod=api&act=getData&lmlb=1&category_id=');
 
  new LoadTab('#j-buy', 'http://supports.jiaju.sina.com.cn/video/index.php?mod=api&act=getData&lmlb=3&category_id=');
  
   new LoadTab('#j-classroom', 'http://supports.jiaju.sina.com.cn/video/index.php?mod=api&act=getData&lmlb=4&category_id=');
