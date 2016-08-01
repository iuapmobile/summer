
//___________________________________________________________________________________________________ UMP.Services.DebugMgr
Type.registerNamespace('UMP.Services');
UMP.Services.DebugMgr = function(){
	this._jsList = {};
	this._del = {};
	this._body = null;
	this._debugArea = null;
}
UMP.Services.DebugMgr.prototype ={
	reg : function (id, key, handler){
		if(this._del[id]){
			return;
		}

		this._jsList[id] = handler;
		var li = document.createElement("li");
		var btn = document.createElement("button");
		btn.innerHTML = "点击此时可以调试>> " + key;
		btn.onclick = handler;
		li.style +="margin:10px"
		li.appendChild(btn);
		this.getDebugArea().appendChild(li); 
	},
	clear : function (){
		for(key in this._jsList){
			this._del[key] = "deleted";
			var script = document.querySelector("#"+key);
			var scriptP = script.parentNode;
			script.innerHTML = "";
			scriptP.removeChild(script);
		}

		this._jsList = {};
		this.getDebugArea().innerHTML = "";
	},
	insertJS : function (id, str){
		var script = document.createElement("script");
		script.innerHTML =str;
		script.id = id;
		script.um_id = id;
		this.getDebugArea().appendChild(script); 
	},
	getBody : function (){
		if(this._body == null){
			if(document){
				this._body = document.querySelector("body");
			}else{
				alet("no exist document, pls check it ?");
			}
		}
		return this._body;
	},
	getDebugArea : function (){
		if(this._debugArea == null){
			if(document){
				this._debugArea = document.createElement("ul");
				this.getBody().appendChild(this._debugArea); 
			}else{
				alet("no exist document, pls check it ?");
			}
		}
		return this._debugArea;
	}
}
UMP.Services.DebugMgr.registerClass('UMP.Services.DebugMgr');
$debugMgr= new UMP.Services.DebugMgr();
