var Douban = new Object();

var trace = function(o){
    if(0){
        if(!window.console || !window.console.firebug){
            console = {firebug:'pass',info:function(s){
                if(!$('#_c').length)
                    $('<textarea id="_c"></textarea>').css('position','absolute').appendTo('#header');
                $('#_c')[0].value += s.toSring?s.toSring():s;
            }}
        }
        console.info(o);
    }
}

Douban.EventMonitor = function(){
	this.listeners = new Object();
}
Douban.EventMonitor.prototype.broadcast=function(widgetObj, msg, data){
	var lst = this.listeners[msg];
	if(lst != null){
		for(var o in lst){
			lst[o](widgetObj, data);
		}
	}
}
Douban.EventMonitor.prototype.subscribe=function(msg, callback){
	var lst = this.listeners[msg];
	if (lst) {
		lst.push(callback);
	} else {
		this.listeners[msg] = [callback];
	}
}
Douban.EventMonitor.prototype.unsubscribe=function(msg, callback){
	var lst = this.listener[msg];
	if (lst != null){
		lst = lst.filter(function(ele, index, arr){return ele!=callback;});
	}
}

// Page scope event-monitor obj.
var event_monitor = new Douban.EventMonitor();

function load_event_monitor(root) {
    var re = /a_(\w+)/;
    var fns = {};
    $(".j", root).each(function(i) {
        var m = re.exec(this.className);
        if (m) {
            var f = fns[m[1]];
            if (!f) {
                f = eval("Douban.init_"+m[1]);
                fns[m[1]] = f;
            }
            f && f(this);
        }
    });
}

$(function() {
	load_event_monitor(document);
});

Douban.prettify_form = function(form) {
	$('input:submit', form).each(function(i) {
		var btn = $('<a href="#" class="butt"></a>').text($(this).val());
		btn.click(function() {
			cleanTip();
			form.submit();
			return false;
		});
		$(this).hide().after(btn);
	});
}

var get_form_fields = function(form) {
	var param = {};
	$(':input', form).each(function(i){
		var name = this.name;
		if (this.type == 'radio') {
			if (this.checked) param[name] = this.value;
        } else if (this.type == 'checkbox') {
			if (this.checked) param[name] = this.value;
		} else if (this.type == 'submit'){
			if (/selected/.test(this.className)) param[name] = this.value;
		} else {
			if (name) param[name] = this.value;
		}
		if(/notnull/.test(this.className) && this.value == ''){
			$(this).prev().addClass('errnotnull');
			param['err'] = 'notnull';
		}
	});
	if(!param['wish'] && !param['do'] && !param['collect'] && !param['save'] && /interest$/.test(form.action)){
		param['collect'] = 'do';
	}
	return param;
}

var remote_submit_json = function(form, func, disable) {
    var fvalue = get_form_fields(form);
    if(fvalue['err'] == undefined){
        if(disable != false){
            $(':submit',form).attr('disabled', 1);
            $('textarea',form).attr('disabled', 1);
        }
        $.post(form.action, fvalue, function(ret){
            var json = eval('('+ret+')'); func(json);
        });
    }
}

/* entry vote button */
Douban.init_evb = function(o) {
	var eid = $(o).attr("id").split("-")[1];
	$(o).submit(function() {
		var url = "/j/entry/" + eid + "/vote";
		$.post(url, function(ret) {
			var r = eval("("+ret+")");
			event_monitor.broadcast(this, "entry_"+eid+"_voted", r);
			$(o).text("你的投票已经提交，谢谢。")
			$("#nf-"+eid).hide();
			$("#nf_s-"+eid).hide();
		});
		return false;
	});
}

/* entry vote count */
Douban.init_evc = function(o) {
	var eid = $(o).attr("id").split("-")[1];
	event_monitor.subscribe("entry_"+eid+"_voted", function(caller, data) {
		var count = data.rec_count;
		if (count) {
			$(o).text(""+count+"人推荐").removeClass("hidden");
		}
	});
}

/* entry nointerest button */
Douban.init_enb = function(o) {
	var eid = $(o).attr("id").split("-")[1];
	$(o).submit(function() {
		var url = "/j/entry/" + eid + "/nointerest";
		$.post(url, function(ret) {
			$(o).text("你的投票已经提交，谢谢。");
			$("#a_evb-"+eid+",#evb_s-"+eid).hide();
		});
		return false;
	});
}

var voteuse_act = function(useful, id, type) {
	if (useful) {
		url = "/j/" + type + "/" + id + "/useful";
	} else {
		url = "/j/" + type + "/" + id + "/useless";
	}
	$.post(url, {}, function(sjson){
		var ret = eval('('+sjson+')');
		if (ret.result) {
			$('#voteuse_'+id).html('<span class="m gtleft">你的投票已经提交，谢谢。</span>');
			$('#userate_'+id).html('<p id="userate_%s" class="pl">' + ret.usecount + '/' + ret.totalcount + '的人觉得此评论有用:</p>');
		}
		return false;
	});
}

var voteuseful = function(id) {
	var _ = id.split('-');
    var type = (_[0]=='d')?"doulist":"review";
	return voteuse_act(true, _[1], type);
}
var voteuseless = function(id) {
	var _ = id.split('-');
    var type = (_[0]=='d')?"doulist":"review";
	return voteuse_act(false, _[1], type);
}

/* blog entry folding */
Douban.init_bef = function(o) {
	var eid = $(o).attr('id').split('entry-')[1];
	var unfolder = $('.unfolder',o),folder = $('.folder',o);
	var s = $('.entry-summary',o), f = $('.entry-full',o);

	unfolder.hover(function(){
		$(this).find("img").attr("src","/pics/arrow0.gif");
	},function(){
		$(this).find("img").attr("src","/pics/arrow2.gif");
	});
	folder.hover(function(){
		$(this).find("img").attr("src","/pics/arrow1.gif");
	},function(){
		$(this).find("img").attr("src","/pics/arrow3.gif");
	});

	unfolder.click(function(){
		if(f.text() == ""){
			var loadtip = $('<div class="loadtip">正在载入...</div>');
			var loadhl = setTimeout(function(){$('.source',o).before(loadtip);}, 200);
			var url = '/j/entry/'+eid+'/';
			$.getJSON(url, function(j){
				clearTimeout(loadhl);
				loadtip.hide();
                $.post(url+'view', {});
				f.html(j.content).find('a').attr('target','_blank');
				f.show();
				s.hide();
			});
		}else{
			f.show();
			s.hide();
		}
		unfolder.hide();
		folder.show();
		return false;
	});
	folder.click(function(){
		s.show();
		f.hide();
		folder.hide();
		unfolder.show();
	});
}

Douban.init_unfolder_n = function(o){
	$(o).click(function(){
		var rid = $(o).attr('id').split('-')[1];
		var url = '/j/note/'+rid+'/full';
		$.getJSON(url, function(r) {
			$('#note_'+rid+'_short').hide();
			$('#note_'+rid+'_full').html(r.html);
			$('#note_'+rid+'_full').show();
			$('#note_'+rid+'_footer').show();
			$('#naf-'+rid).hide();
			$('#nau-'+rid).show();
			load_event_monitor($('#note_'+rid+'_full'));
		});
		return false;
	});
	$(o).hover(function(){
		$(this).find("img").attr("src","/pics/arrow0.gif");
	},function(){
		$(this).find("img").attr("src","/pics/arrow2.gif");
	});
}

Douban.init_folder_n = function(o){
	$(o).click(function(){
		var rid = $(o).attr('id').split('-')[1];
		$('#note_'+rid+'_full').hide();
		$('#note_'+rid+'_short').show();
		$('#note_'+rid+'_footer').hide();
		$(o).hide();
		$('#naf-'+rid).show();
	});
	$(o).hover(function(){
		$(this).find("img").attr("src","/pics/arrow1.gif");
	},function(){
		$(this).find("img").attr("src","/pics/arrow3.gif");
	});
}

Douban.init_unfolder = function(o){
	$(o).click(function(){
		var rid = $(o).attr('id').split('-')[1];
		var url = '/j/review/'+rid+'/fullinfo';
		$.getJSON(url, function(r) {
			$('#review_'+rid+'_short').hide();
			$('#review_'+rid+'_full').html(r.html);
			$('#review_'+rid+'_full').show();
			$('#af-'+rid).hide();
			$('#au-'+rid).show();
			load_event_monitor($('#review_'+rid+'_full'));
		});
		return false;
	});
	$(o).hover(function(){
		$(this).find("img").attr("src","/pics/arrow0.gif");
	},function(){
		$(this).find("img").attr("src","/pics/arrow2.gif");
	});
}

Douban.init_folder = function(o){
	$(o).click(function(){
		var rid = $(o).attr('id').split('-')[1];
		$('#review_'+rid+'_full').hide();
		$('#review_'+rid+'_short').show();
		$(o).hide();
		$('#af-'+rid).show();
	});
	$(o).hover(function(){
		$(this).find("img").attr("src","/pics/arrow1.gif");
	},function(){
		$(this).find("img").attr("src","/pics/arrow3.gif");
	});
}

/* blog entry voters folding */
Douban.init_bevf = function(o) {
	var eid = $(o).attr('id').split('bevs-')[1];
	var h = $('.voters_header',o);
	if (!h.length) return;
	h.hover(function(){$(this).addClass('clickable_title');},
		function(){$(this).removeClass('clickable_title');});
    var v = $('#vsl',o);
	var l = $('.link', o);
	var m = $('#more_voters',o);

    var fn = function(e) {
		var f = $(".mv",o);
		if (f.length) {
			var d = f.toggle().css('display');
			l.text(d=='none' ? "更多推荐者" : "隐藏");
			if (m.length)
				m.toggle().css('display');
		} else {
			t=$('<li>正在装载...</li>');
			if (v.length) {
				v.append(t);
			} else {
				h.after(v=$('<ul id="vsl" class="user-list pl indent"></ul>'));
				v.append(t);
			}
			var url = '/j/entry/'+eid+'/voters?start=8';
			$.getJSON(url, function(j) {
				t.css('display','none');
				t.before($(j.html));
				if (m.length) {
					m.css('display','none');
				}
			});
			$('.link', o).text("隐藏");
		}
		return false;
	}
	h.click(fn);
	l.click(fn);
};

Douban.init_guidelink = function(o) {
	$(o).click(function() {
		window.open('/help/guide1', '', 'width=640,height=400');
		return false;
	});
};

Douban.init_closelink = function(o) {
	$('<a href="#">关闭</a>').appendTo($(o)).click(function() {
		window.close();
		return false;
	});
};

function ext_links() {
	es = $('.entry-summary');
	es.each(function (i) {
		var a = $(es[i]).find('a');
		a.each(function (j) {
			a[j].target = '_blank';
		});
	});
}

Douban.init_confirm_link = function(o) {
	if(!o.name){
		$(o).click(function(){
			var text = o.title || $(o).text();
			return confirm("真的要"+text+"?");
		});
	} else {
		var _ = o.name.split('-');
		var link = $(o).attr('href').split('/');
		var pid = link[0] != 'http:' ? link[2] : link[4];
		var url = '/j/rec_comment';
		$(o).click(function(){
			var bln = confirm("真的要删除?");
			if(bln){
				$.getJSON(url,{rid: _[1], del_comment: _[2]}, function(){
					$(o).parent().parent().parent().remove();
				})
			}
			return false;
		})
	}
}

var populate_tag_btns = function(title, div, tags, hash){
	if (tags.length) {
		var p = $('<p style="line-height:180%" class="pl">'+title+'<br/></p>');
		$.each(tags, function(i,tag) {
			var btn = $('<span class="tagbtn"/>').addClass(hash[tag.toLowerCase()]?'rdact':'gract').text(tag);
			p.append(btn).append(' &nbsp; ');
		});
		div.append(p);
	}
}

Douban.init_interest_form = function(form) {
	$(":submit",form).click(function(){
		$(this).addClass('selected');
	});
	var btns = {}, selected = {};
	var select = function(tl) {
		if (btns[tl]) {
			selected[tl] = true;
			$.each(btns[tl], function(i, btn) {
				$(btn).removeClass('gract').addClass('rdact');
			});
		}
	}
	var deselect = function(tl) {
		if (btns[tl]) {
			delete selected[tl];
			$.each(btns[tl], function(i, btn) {
				$(btn).removeClass('rdact').addClass('gract');
			});
		}
	}
	var update = function() {
		var tags = $.trim(form.tags.value.toLowerCase()).split(' '), hash = {};
		$.each(tags, function(i, t){
			if (t != '') { select(t); hash[t] = true; }
		});
		for (t in selected) { if (!hash[t]) deselect(t) }
	};

	update();
	form.tags.focus();

	$(form).submit(function() {
		var sid = $(this).attr('action').split('/')[3];
		remote_submit_json(this, function(data){
			$("#collect_form_"+sid).html('')
			if ($('#src_pbtn', form).length) {
				window.location.href = window.location.href.split('?')[0];
			}else{
				close_dialog();
			}
		});
		$('input', '#submits').hide();
		$('td', '#submits').append('<span class="m">正在保存...</span>');
		return false;
	});
	$(form.cancel).click(function(){
	    var sid = $(form).attr('action').split('/')[3];
		$("#collect_form_"+sid).html('');
	});

	$('.tagbtn', form).each(function(i){
		var tl = $(this).text().toLowerCase();
		if (btns[tl]) btns[tl].push(this);
		else btns[tl] = [this];
	}).click(function(){
		var tag = $(this).text();
		var tags = $.trim(form.tags.value).split(' '), present=false, tl=tag.toLowerCase(), i;
		tags = $.grep(tags, function(t, i){
			if (t.toLowerCase() == tl) {
				deselect(tl); present=true; return false;
			} else return true;
		});
		if (!present) { tags.push(tag); select(tl); }
		var content = tags.join(' ');
		form.tags.value = (content.length > 1) ? content+' ' : content;
		form.tags.focus();
	});

	$(form.tags).keyup(update);
}

Douban.init_stars = function(o){
	var ratewords = {1:'很差', 2:'较差', 3:'还行', 4:'推荐', 5:'力荐'};
	var lighten_stars = function(i) {
		var rating = $(':hidden', o).attr('value') || 0;
		$('#rating #stars img', o).each(function(j){
			this.src = '/pics/' + ((j<i) ? 'sth' : ((j<rating) ? 'st' : 'nst')) + '.gif';
		});
		if (i != 0) {
			$('#rating #rateword', o).text(ratewords[i]);
		} else {
			$('#rating #rateword', o).text(rating ? ratewords[rating] : '');
		}
	}

	lighten_stars(0);
	$('#rating img', o).mouseover(function(){
		lighten_stars(this.id.charAt(4));
	});
	if($(':hidden', o).attr('name') == 'rating'){
		$('#rating img', o).click(function(){
			var rating = this.id.charAt(4);
			$(':hidden', o).attr('value', rating);
			lighten_stars(rating);
		});
	}
	$('#rating #stars', o).mouseout(function(){
		lighten_stars(0);
	});
}

Douban.init_show_add_friend = function(o) {
    var uid = $(o).attr('id').split('showaf_')[1];
    $(o).click(function() {
        url="/j/people/"+uid+"/friendform";
        $.get(url, {}, function(ret) {
            friend_form_update(ret, uid);
        });
        return false;
    });
}

Douban.init_tries_to_listen = function(o) {
    var m = $(o).attr('name');
    $(o).click(function(){
        var isFF=!document.all;
        if(m!=''){
            var _ = m.split('-')
            var w = _[0];
            var h = _[1];
        }
        else{
            var w = 384;
            var h = 450;
        }
        var left = (screen.width-w)/2;
        var top = isFF?(screen.height-h)/2:50;
        window.open($(o).attr('href'),'','width='+w+',height='+h+',top='+top+',left='+left+',scrollbars=0,resizable=0,status=1');
        return false;
    });
}

Douban.init_discover = function(o){
    $(o).submit(function(form) {
    	var cat = "";
    	cat = $(":radio:checked")[0].value;
    	if (cat == "event"){
    		$("#discover_s").attr("action","/event/search");
    	}else if (cat == "group"){
            $("#discover_s").attr("action","/group/search?q="+$("#discover_text").value);
        }else{
            $("#discover_s").attr("action","/subject_search");
        }
    });
}

var friend_form_update = function(data, uid) {
    $("#divac").html(data);
    $("#submitac").submit(function(form){
        form.action = "/j/people/"+uid+"/friend";
        remote_submit_json(form,function(r) {
            $("#divac").hide().prev().html(r['html']);
            load_event_monitor($(data));
        });
        return false;
    });
    $("#cancelac").click(function(){
        $("#divac").html("");
    });
}

Douban.init_review_full = function(o) {
    var i = $(o).attr('id').split('_');
    var rid = i[1];
    var stype = i[2];
    $('.link', o).click(function(){
        var url = '/j/review/'+rid+'/'+stype;
        $.getJSON(url, function(r) {
            $(o).html(r.html);
            load_event_monitor($(o));
        });
        return false;
   });
}

Douban.init_show_login = function(o){
    $(o).click(function(){
        show_dialog($("#pop_login").html())
        $("#dialog .pop_email").focus()
        return false;
    });
}

Douban.init_hideme = function(o){
    $(o).click(function(){
        $(this).parent().parent().parent().hide();
    });
}

Douban.init_more = function(o){
    $(o).click(function(){
        lastObj = $(this).prev().find("input");
        ids = /(.*_)(\d+)$/.exec( lastObj.attr("id"));
        id = ids[1] + (parseInt(ids[2]) + 1);
        a = lastObj.clone();
        a.attr("value","");
        $(this).before('<br/>').before(a);
        a.attr('id',id).attr('name',id).wrap('<span></span>');
    })
}

Douban.init_search_text = function(o){
    if(!o.value || o.value == o.title){
        $(o).addClass("greyinput");
        o.value = o.title;
    }
    $(o).focus(function(){
        $(o).removeClass("greyinput");
        if(o.value == o.title) o.value = "";
    });
    $(o).blur(function(){
        if(!o.value){
            $(o).addClass("greyinput");
            o.value = o.title;
        }
    });
}

Douban.init_checkreg = function(o){
    $(o).find('.butt').click(function(){
        var check = true;
        $(o).find('input').each(function(){
            if(this.type!='submit' && this.type!='button'){
                if(this.value == ''){
                    $(this).next().css('display','inline');
                    check = false;
                }else{
                    $(this).next().css('display','none');
                }
            }
        });
        return check;
    });
}
function cleanTip(){
    if($("#page_focus")[0].title == $("#page_focus")[0].value){
        $("#page_focus")[0].value = '';
    }
}
Douban.init_submit_link = function(o){
	$(o).click(function(){
		$(o).parent().submit();
	});
}

var nowmenu = null;
var hidemenu = function(a){
	a.find('.down').css('display','inline');
	a.find('.up').hide();
	a.next().hide();
	nowmenu = null;
	$('body').unbind('mousedown');
}
var openmenu = function(a){
	if(nowmenu != null){
		hidemenu(nowmenu);
	}
	a.find('.up').css('display','inline');
	a.find('.down').hide();
	a.next().show();
	nowmenu = a;
	$('body').mousedown(function(){
		if(a.parent().attr('rel') != 'on'){
			hidemenu(a);
		}
	});
}
$(function(){
    $("a","#dsearch").each(function(){
        $(this).click(function(){
            urls = $(this).attr("href").split("?cat=");
            $("#ssform").attr("action", urls[0]);
            if(urls[1] != undefined){
                $('<input type="hidden" name="cat" value="' + urls[1] + '" />').appendTo($("#ssform"));
            }
            cleanTip();
            $("#ssform").submit();
            return false;
        });
    });
    $('.arrow').click(function(){
        if($(this).find('.up').is(':hidden')){
            openmenu($(this));
        }else{
            hidemenu($(this));
        }
        this.blur();
    });

    $('.arrow').parent().hover(function(){
        $(this).attr('rel','on');
    },function(){
        $(this).attr('rel','off');
    })
})

var show_dialog = function(div) {
    if($('#dialog').length) return;
    $('body').append('<div id="overlay"></div><div id="dialog"></div>');
    if(div != null){
        $('#dialog').html(div);
    }else{
        $('#dialog').html("<div class='loadpop'>正在载入，请稍候...</div>");
    }
    set_overlay();
}

var set_overlay = function(){
    var oheight = ($.browser.msie?11:26),
        dialog=$('#dialog')[0],
        w=dialog.offsetWidth,
        left=(document.body.offsetWidth-w)/2+'px';
    
    $('#overlay').css({height:dialog.offsetHeight+oheight,width:w+26,left:left});
    dialog.style.left=left;
}
var close_dialog = function() {
    $('#overlay').unbind('click');
    $('#dialog,#overlay,.bgi').remove();
    if (typeof document.body.style.maxHeight == "undefined") {//if IE6
        $('body','html').css({height: 'auto', width: 'auto'});
        $('html').css('overflow', '');
    }
    document.onkeydown = '';
    return false;
}
var refine_dialog = function(){
	var agent = navigator.userAgent.toLowerCase();
	var top = 0.5 * ($.viewport_size()[1] - $('#dialog')[0].offsetHeight) + 140;
	$('#dialog,#overlay').css('top', top);
    set_overlay();
}
var bgi_dialog = function(){
    $('.bgi').remove();
    if(!$.browser.msie){
        $('<iframe></iframe>').addClass('bgi').css('height',$('#dialog')[0].offsetHeight).insertAfter($('#dialog'));
    }
}

Douban.init_collect_btn = function(o) {
    $(o).click(function(){
        if($('#hiddendialog').length){
            show_dialog($('#hiddendialog').html());
            load_event_monitor($('#dialog'));
        }else{
            show_dialog(null);
            var _ = $(this).attr('name').split('-');
            var btn_type = _[0], sid = _[1], rating = _[2];
            var url = '/j/subject/'+sid+'/interest';
            $.get(url, rating && {rating:rating} , function(ret) {
                if($('#dialog').length){
                    var r = eval('('+ret+')');
                    var html = $('<div></div>').html(r['html']);
                    var tags = r['tags'];
                    var content = tags.join(' ');
                    $('input[@name=tags]', html).val((content.length > 1)? content + ' ' : content)
                    var hash = {};
                    $.each(tags, function(i,tag){hash[tag.toLowerCase()]=true;});
                    populate_tag_btns('我的标签:', $('#mytags', html), r['my_tags'], hash);
                    populate_tag_btns("豆瓣成员常用的标签:", $('#populartags', html), r['popular_tags'], hash);
                    if (btn_type == 'pbtn') $('form', html).append('<div id="src_pbtn"></div>');
                    $('#dialog').html(html);
                    refine_dialog();
                    load_event_monitor(html);
                }
            });
        }
        return false;
    });
}

Douban.init_nine_collect_btn = function(o) {
    $(o).click(function(){
        var _ = $(this).attr('name').split('-');
        var btn_type = _[0], sid = _[1], interest = _[2];
        var url = '/j/subject/'+sid+'/interest';
        $.getJSON(url, interest && {interest: interest}, function(r) {
            var html = $('<div></div>').html(r.html);
            var tags = r.tags;
            var content = tags.join(' ');
            $('input[@name=tags]', html).val((content.length > 1)? content + ' ' : content);
            var hash = {};
            $.each(tags, function(i,tag){hash[tag.toLowerCase()]=true;});
            populate_tag_btns('我的标签(点击添加):', $('#mytags', html), r.my_tags, hash);
            populate_tag_btns("豆瓣成员常用的标签(点击添加):", $('#populartags', html), r.popular_tags, hash);
            if (btn_type == 'pbtn')
                $('form', html).append('<div id="src_pbtn"></div>');
            $("#collect_form_"+sid).html("").append('<p class="ul"></p>').append(html);
            load_event_monitor($("#collect_form_"+sid));
        });
        return false;
    });
}
Douban.init_rec_btn= function(o) {
    var _ = $(o).attr('name').split('-');
    var url = '/j/recommend';
    var rdialog = 'rdialog-' + _[1] + '-' + _[2];
    var uid;
    var f = function(){
        uid = ((_[1] == 'I')&&(_[2]==undefined)) ? $('input',$(o).parent())[0].value : _[2];
        rec = (_[3]==undefined) ? '':_[3]
        var fcs = function(type){
            if(type == 'I'){
                var s = $('.text','#dialog');
                if(s.length)
                {
                    if(s[0].value.length){s[1].focus();}
                    else{s[0].focus();}
                }
            }else{
                $('#dialog').find(':submit').focus();
            }
        }
        if($('#' + rdialog).length){
            show_dialog($('#' + rdialog).html());
            load_event_monitor('#dialog');
            fcs(_[1]);
        }else{
            $.getJSON(url, {type:_[1], uid:uid, rec:rec}, function(r){
                show_dialog(r.html);
                if(_[1]!='I'){
                    var rechtml = $('<div id="'+rdialog+'"></div>');
                    rechtml.html(r.html).appendTo('body').hide();
                }
                load_event_monitor('#dialog');
                fcs(_[1]);
            });
        }
        return false;
    }
    $(o).click(f);
    if(_[1] == 'I'){
        $(o).parent().parent().submit(f);
    }
}

Douban.init_rec_form = function(form) {
    form.onsubmit = function(){
        remote_submit_json(this, function(data){
            $('#dialog').html('<div class="loadpop m">推荐已提交</div>');
            set_overlay();
            $('#rec_url_text').attr('value','http://');
                setTimeout(function(){
                $('#dialog, #overlay').fadeOut(close_dialog);
                if($(':hidden',form)[0].value == "I"){
                    document.location.reload();
                }
            },400);
        });
        return false;
    }
    $(form).set_len_limit(140);
}


Douban.init_rec_reply = function(o){
    var _ = o.name.split('-');
    var url = '/j/rec_comment';
    if(!o.rev){
        $(o).attr('rev', 'unfold');
    }
    $(o).click(function(){
        if(o.rev != 'unfold'){
            $(o).parent().parent().next().remove();
            $(o).html($(o).attr('rev'));
            o.rev = 'unfold';
        }else{
            $.getJSON(url, {rid: _[2], type: _[3], n:_[4]}, function(r){
                $('<div class="recreplylst"></div>').insertAfter($(o).parent().parent()).html(r.html);
                load_event_monitor($(o).parent().parent().next());
                $(o).attr('rev', $(o).html()).text('隐藏回应');
            })
        }
        return false;
    })
}

Douban.init_reply_form = function(form){
    $(form).attr('action', $(form).attr('rev'));
    $(form).submit(function(){
        remote_submit_json(this, function(r){
            var replst = $(form).parent();
            $(replst).html(r.html);
            load_event_monitor(replst);
            var a = $('<span style="margin-left:53px"><a href="javascript:void(0)">添加回应</a></span>');
            $('form', replst).hide().after(a);
            a.click(function(){
                $(this).prev().show();
                $(this).remove();
            })
        });
        $(':submit',form).attr('disabled', 1);
        return false;
    })
    $(form).set_len_limit(140);
}

Douban.init_noti_form = function(form){
    $(":submit",form).click(function(){
        $(this).addClass('selected');
    });
    $(form).attr('action','/j/request/');
    $(form).submit(function(){
        action_ext = "?nid="+form.nid.value + "&extra="+form.extra.value;
        form.confirm.disabled = true;
        if (/selected/.test(form.confirm.className)) {action_ext = action_ext+"&confirm=y";}
        form.ignore.disabled = true;
        if (/selected/.test(form.ignore.className)) {action_ext = action_ext+"&ignore=y";}
        form.action = form.action+action_ext;
        remote_submit_json(this, function(r){
            $(form).parent().html(r.html);
        });
        return false;
    });
}

Douban.init_editable = function(o){
    var disp = $('#display',o), form = $('form',o)[0], a = $('a','#edi');
    var show = function(t){
        if(t != undefined){
            disp.text(t);
            if (disp.text() == ''){
                a.text('点击添加描述').addClass('album_photo');
            }else{
                a.text('修改').removeClass('album_photo');
            }
        }
        disp.show();
        $(form).hide();
        $('#edi').show();
    } 
    show(disp.text());
    if(form.name) $(form).set_len_limit(form.name);
    $(form).submit(function(){
        remote_submit_json(form, function(r){
            show(r.desc);
        })
        $('textarea',form)[0].value="正在保存...";
        return false;
    })
    $('.cancel',form).click(function(){show()});
    $('#edi',o).click(function(){
        $('#display,#edi').hide();
        $('input,textarea','form').attr('disabled',0);
        $('textarea',o)[0].value = disp.text();
        $(form).show();
        $('textarea',o).focus();
        return false;
    })
}

Douban.init_show_video = function(o){
    var eid = paras($(o).attr('href'))['from'];
    $(o).css('position','relative').attr('href','javascript:void(0)').attr('target','');
    var overlay = $('<div></div>').addClass('video_overlay');
    $(o).append($('<br/>'));
    $('div',o).append(overlay);
    var fhtml = $('img',o).attr('name');
    $(o).click(function(){
        var closebtn = $('<a href="javascript:void(0)">缩进</a>');
        if(eid != undefined) $.get("/j/recommend?from=" + eid);
        closebtn.click(function(){
            $(o).show();
            $(this).prev().remove();
            $(this).remove();
        })

        $(o).after(closebtn).after($('<em>'+fhtml+'</em>'));
        $(o).hide();
    })
}

Douban.init_morerec = function(o){
    $(o).click(function(){
        var n = $(o).parent().next();
        if(n.is(':hidden')){ n.show()} else {n.next().show()}
        $(o).remove();
    })
}
$.viewport_size = function(){
	var size = [0, 0];
	if (typeof window.innerWidth != 'undefined'){
		size = [window.innerWidth, window.innerHeight];
	}else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0){
		size = [document.documentElement.clientWidth, document.documentElement.clientHeight];
	}else{
		size = [document.body.clientWidth, document.body.clientHeight];
	}
	return size;
}

jQuery.fn.extend({
    set_len_limit : function(limit){
        var s = this.find(':submit');
        var oldv = s.attr('value');
        var check = function(){
            if(this.value && this.value.length > limit){
                s.attr('disabled',1).attr('value','字数不能超过'+limit+'字');
            } else {
                s.attr('disabled',0).attr('value', oldv);
            }
        }
        $('textarea', this).focus(check).blur(check).keydown(check).keyup(check);
    },

    set_caret: function(){
        if(!$.browser.msie) return;
        var initSetCaret = function(){this.p = document.selection.createRange().duplicate()};
        this.click(initSetCaret).select(initSetCaret).keyup(initSetCaret);
    },

    insert_caret:function(t){
        var o = this[0];
        if(document.all && o.createTextRange && o.p){
            var p=o.p;
            p.text = p.text.charAt(p.text.length-1) == '' ? t+'' : t;
        } else if(o.setSelectionRange){
            var s=o.selectionStart;
            var e=o.selectionEnd;
            var t1=o.value.substring(0,s);
            var t2=o.value.substring(e);
            o.value=t1+t+t2;
            o.focus();
            var len=t.length;
            o.setSelectionRange(s+len,s+len);
            o.blur();
        } else {
            o.value+=t;
        }
    },
    
    get_sel:function(){
        var o = this[0];
        return document.all && o.createTextRange && o.p ? 
            o.p.text : o.setSelectionRange ? 
            o.value.substring(o.selectionStart,o.selectionEnd) : '';
    }
})
var check_form = function(form){
    var _re = true;
    $(':input',form).each(function(){
        if((/notnull/.test(this.className) && this.value == '')
            || (/most/.test(this.className) && this.value && this.value.length>/most(\d*)/.exec(this.className)[1]))
        {
            $(this).next().show();
            _re = false;
        }else{
            if(/attn/.test($(this).next().attr('className'))) $(this).next().hide();
        }
    })
    return _re;
}
var paras = function(s){
    var o = {};
    if(s.indexOf('?') == -1) return {};
    var vs = s.split('?')[1].split('&');
    for(var i=0;i<vs.length;i++){
        if(vs[i].indexOf('=') != -1){
            var k = vs[i].split('=');
            eval('o.'+k[0]+'="'+k[1]+'"');
        }
    }
    return o;
}

