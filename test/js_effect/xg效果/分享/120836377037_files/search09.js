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
                if (title == "��̳") {
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
            $_G("divSelect").innerHTML = '<input id="siteName" type="hidden" value="��ҵ��Ѷ" name="class"/><div id="select_area"  class="select_box"><span id="selected" class="search_site">��Ѷ</span><div id="select_main" class="select_list"><a title="��ҵ��Ѷ">��Ѷ</a><a title="����Ϣ">��</a><a title="��Ӧ��Ϣ">��Ӧ</a><a title="��ҵ��">��ҵ</a><a title="��������">����</a><a title="��̳">��̳</a></div></div>';
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
