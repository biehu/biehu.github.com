        (function NTES_Nav(){
            function $_G(id){
                return document.getElementById(id);
            }
            function clickselect(e){
                e = e || window.event;
                e.cancelBubble = true;
                var name = this.innerHTML;
                var txt = document.createTextNode(name);
                selected.removeChild(selected.firstChild);
                selected.appendChild(txt);
                select_main.style.display = "none";
                var title = this.getAttribute("title");
                $_G("siteName").value = title;
                if (title == "论坛") {
					document.hyformnew.action = "http://www.search.hc360.com/cgi-bin/fb";
				}
				else {
					document.hyformnew.action = "http://www.search.hc360.com/cgi-bin/seinterface.cgi";
				}
            }
            function a_mouseover () {
                this.className = "active";
            }
            function a_mouseout () {
                this.className = "";
            }
            $_G("divSelect").innerHTML = '<input id="siteName" type="hidden" value="行业资讯" name="class"/><div id="select_area"  class="select_box"><span id="selected" class="search_site">资讯</span><div id="select_main" class="select_list"><a title="行业资讯">资讯</a><a title="求购信息">求购</a><a title="供应信息">供应</a><a title="企业库">企业</a><a title="技术文章">技术</a><a title="论坛">论坛</a></div></div>';
            var select_area = $_G("select_area"), 
			selected = $_G("selected"), 
			select_main = $_G("select_main"), 
			select_list = select_main.getElementsByTagName("a"), 
			len = select_list.length;
            select_area.onclick = select_main.onmouseover = function(){
                select_main.style.display = "block";
            }
            select_main.onmouseout = function(){
                select_main.style.display = "none";
            }
            for (var i = 0; i < len; i++) {
                select_list[i].onclick = clickselect;
                select_list[i].onmouseover = a_mouseover;
                select_list[i].onmouseout = a_mouseout;
            }
        })();
