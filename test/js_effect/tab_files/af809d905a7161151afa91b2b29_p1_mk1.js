  (function() {
      //  标签切换

      var hideHeight = $('.main-nav').height(),
          showHeight = 85;

      var Tab = function(element, options) {
          this.element = $(element);

          this.secondText = options.secondText;

          if (options.type === 'bind') {

              this.element.hover($.proxy(this.show, this));
          } else {
              this.show('start');
              $('#j-nav').animate({
                    height: hideHeight
                }, 100);
          }

      };



      Tab.prototype.show = function(type) {
          var $this = this.element;
          var $ul = $this.closest('ul');

          var selector = '#' + $this.attr('data-link');
          var $target = $(selector);
          
          if (type !== 'start') {
          
          
              // 导航没有二级菜单，二级菜单就隐藏
            
            if ($target.length === 0 || $target.find('li').length === 0) {
                $('#j-nav').animate({
                    height: hideHeight
                }, 100);
                
            }
            else {
                $('#j-nav').animate({
                    height: showHeight
                }, 100);
                this.setSecondNavPostion($target);
            }
          this.activate($target, $target.parent());
        }

          this.activate($this, $ul);
      };

      Tab.prototype.setSecondNavPostion = function(content) {
          var linkHalfWidth = this.element.width() / 2,
              linkLeft = this.element.offset().left,
              contentHalfWidth = content.width() / 2,
              secondLinkLeft = linkLeft + linkHalfWidth - contentHalfWidth,
              windowWidth = $('body').width();

          if (contentHalfWidth > linkLeft + linkHalfWidth) {
              content.css('left', 0);
              return;
          }

          if (linkLeft + linkHalfWidth + contentHalfWidth > windowWidth) {
              content.css('right', 0);
              return;
          }

          content.css('left', secondLinkLeft);



      };

      Tab.prototype.activate = function(element, container) {

          var $active = container.find('.active');
          $active.removeClass('active');
          element.addClass('active');
      };


      $.fn.tab = function(options) {
          return this.each(function() {
              new Tab(this, options);
          });
      };






      var changeNavInit = function() {
          $('#j-main-nav li a').tab({
              type: 'bind'
          });

      };



      changeNavInit();



      window.changeNav = function(text, secondText) {
          $("#j-main-nav li a:contains('" + text + "')").tab({
              type: 'do',
              secondText: secondText
          });
      };



      window.setNav = function(text, secondText) {
          $('#j-nav').mouseleave(function() {
              changeNav(text, secondText);
          });


          changeNav(text, secondText);
      };


  })();