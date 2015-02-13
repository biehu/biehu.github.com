//link move
$('.sidebar li a, .topbar li a, .cat-posts h4 a').hover(function() {$(this).stop().animate({'left': '8px'}, 'fast');
}, function() {$(this).stop().animate({'left': '0px'}, 'fast');});
//tab
$('#tab-title span').click(function(){$(this).addClass("selected").siblings().removeClass();$("#tab-content > ul").slideUp('800').eq($('#tab-title span').index(this)).slideDown('800');});
//tie tu
function comment_image() {var URL = prompt('请输入图片的URL地址:', 'http://');if (URL) {document.getElementById('comment').value = document.getElementById('comment').value + '[img]' + URL + '[/img]';}}
//滑动到顶部
$('#foot_copyright span').click(function(){$('html,body').animate({scrollTop: '0px'}, 800);return false;});
//左侧滑动到顶部
var s= $('#shangxia').offset().top;$(window).scroll(function (){$("#shangxia").animate({top : $(window).scrollTop() + s + "px" },{queue:false,duration:500});});
$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
$('#shang').click(function(){$body.animate({scrollTop: '0px'}, 800);});
$('#comt').click(function(){$body.animate({scrollTop:$('#addcomment').offset().top}, 800);});
$('#xia').click(function(){$body.animate({scrollTop:$('#foot_copyright').offset().top}, 800);});
//外链新窗口打开
$("a[href*='http://w.epinv.com'],a[href*='javascript'],a:has(img),a[href*=#]").attr("rel","inlinks");
$("a[rel!='inlinks']").click(function(){window.open(this.href);return false;});
//存档页面jQ伸缩
$('#expand_collapse,.archives-yearmonth').css({cursor:"s-resize"});
$('#archives ul li ul.archives-monthlisting').hide();
$('#archives ul li ul.archives-monthlisting:first').show();
$('#archives ul li span.archives-yearmonth').click(function(){$(this).next().slideToggle('fast');return false;});
$('#expand_collapse').toggle(
function(){
$('#archives ul li ul.archives-monthlisting').slideDown('fast');
},
function(){
$('#archives ul li ul.archives-monthlisting').slideUp('fast');
});