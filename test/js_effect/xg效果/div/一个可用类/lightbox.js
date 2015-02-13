var lightbox = Class.create();  

lightbox.prototype = {
       yPos : 0,
       xPos : 0,
      //���췽��,ctrlΪ�����ö����Ԫ��
       initialize: function(ctrl) {
              //����Ԫ�ص����Ӹ�ֵ��this.content
              this.content = ctrl.href;
              //Ϊ��Ԫ�����onclick�¼�activate����
              Event.observe(ctrl, 'click', this.activate.bindAsEventListener(this), false);
              ctrl.onclick = function(){return false;};
       },

       //����������ʱ
       activate: function(){
              if (browser == 'Internet Explorer'){//�ж�ΪIE�����
                     this.getScroll();
                     this.prepareIE('100%', 'hidden');
                     this.setScroll(0,0);
                     this.hideSelects('hidden');//�������е�<select>���
              }
              //���ø����е�displayLightbox����
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
            //�����ǲ���ʾ
            $('overlay').style.display = display;
            //����������ʾ
            $('lightbox').style.display = display;
            //�����������״̬,����ø����е�loadInfo����
            if(display != 'none') this.loadInfo();
      },

      //�÷�������Ajax����
      loadInfo: function() {
            //��������ɺ���ñ�����processInfo����
            var myAjax = new Ajax.Request(
          this.content,
          {method: 'get', parameters: "", onComplete: this.processInfo.bindAsEvent Listener (this)}
           );

      },
      // �����ص��ı���Ϣ��ʾ����������
      processInfo: function(response){
           //��÷��ص��ı�����
           var result = response.responseText;
           //��ʾ��������
           info = "<div id='lbContent'>" + result + "</div>";
           //��infoԪ��ǰ����һ��Ԫ��
           new Insertion.Before($('lbLoadMessage'), info)
           //�ı��Ԫ�ص�class name��ֵ
           $('lightbox').className = "done"; 
           //���ñ�����actions����
           this.actions();
           var ctrl=$('lightbox');
           //Ϊ����������¼�������reset
          Event.observe(ctrl, 'click', this.reset.bindAsEventListener(this), false);
           ctrl.onclick = function(){return false;};
      },
      //�ָ���ʼ״̬ 
      reset:function(){
            //���ظ��ǲ�
           $('overlay').style.display="none";
           //��շ�������
            $('lbContent').innerHTML="";
            //���ظ�����
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
