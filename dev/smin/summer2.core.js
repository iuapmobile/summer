+function(w,s){
	s.openWin : function(json){
		return window.adrMininvoker.callSync("openWin",JSON.stringify(json));
	};
	s.closeWin : function(json){
		if(typeof json == "string"){
			json = {"id" : json};
		}else if(typeof json == "undefined"){
			json = {};
		}		
		return window.adrMininvoker.callSync("closeWin","");
	};
}(window,summer);