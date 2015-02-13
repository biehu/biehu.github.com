var tID=0;
function ShowTabs(ID){
	 if(ID!=tID){   
        eval("document.getElementById('TabTitle"+[tID]+"').className='nfocus';");   
        eval("document.getElementById('TabTitle"+[ID]+"').className='focus';");   
        eval("document.getElementById('Tabs"+[tID]+"').style.display='none';");   
        eval("document.getElementById('Tabs"+[ID]+"').style.display='';");   
        tID=ID;   
    }   
}

function ShowTabs1(ID){
	 if(ID!=tID){   
        eval("document.getElementById('Tab1Title"+[tID]+"').className='nfocus';");   
        eval("document.getElementById('Tab1Title"+[ID]+"').className='focus';");   
        eval("document.getElementById('Tabs1_"+[tID]+"').style.display='none';");   
        eval("document.getElementById('Tabs1_"+[ID]+"').style.display='';");   
        tID=ID;   
    }   
}

function ShowTabs2(ID){
	 if(ID!=tID){   
        eval("document.getElementById('Tab2Title"+[tID]+"').className='nfocus';");   
        eval("document.getElementById('Tab2Title"+[ID]+"').className='focus';");   
        eval("document.getElementById('Tabs2_"+[tID]+"').style.display='none';");   
        eval("document.getElementById('Tabs2_"+[ID]+"').style.display='';");   
        tID=ID;   
    }   
}