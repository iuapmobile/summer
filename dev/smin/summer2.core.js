;(function(w){
    w.summer = w.summer || {};
    (function(){
		document.addEventListener('DOMContentLoaded',function(){
			summer.trigger("init");
			summer.pageParam = window.localStorage;
			if(typeof summerready == "function")
				summerready();
			if(typeof summerReady == "function")
				summerReady();
			summer.trigger("ready");
			summer.trigger("aftershowwin");
		},false);
    })();
	var EventMgr = function() {
        this._events = {};
    };
    EventMgr.prototype.on = function(evtName, handler) {
        if (this._events[evtName] == undefined) {
            this._events[evtName] = [];
        }
        this._events[evtName].push(handler);
    };
    EventMgr.prototype.off = function(evtName, handler) {
        var handlers = this._events[evtName];
        if (typeof handler == "undefined") {
            delete handlers;
        } else {
            var index = -1;
            for (var i = 0, len = handlers.length; i < len; i++) {
                if (handler == handlers[i]) {
                    index = i;
                    break;
                }
            }
            if (index > 0)
                handlers.remove(index);
        }
    };
    EventMgr.prototype.trigger = function(evtName, sender, args) {
        try{
            var handlers = this._events[evtName];
			if(!handlers) return;
            var handler;
            args = args || {};
            for (var i=0,len=handlers.length; i < len; i++) {
                handler = handlers[i];
                handler(sender, args);
            }
        }catch(e){
            alert(e);
        }
    };
	var _ems = new EventMgr();
	w.summer.on = function(eName, fn){
		_ems.on(eName, fn);
	};
	w.summer.trigger = function(eName){
		_ems.trigger(eName);
	};
})(window);
+function(w,s){
	s.openWin = function(json){
		return window.adrMininvoker.callSync("openWin",JSON.stringify(json));
	};
	s.closeWin = function(json){
		if(typeof json == "string"){
			json = {"id" : json};
		}else if(typeof json == "undefined"){
			json = {};
		}		
		return window.adrMininvoker.callSync("closeWin","");
	};
    s.execScript = function (json) {
        if (typeof json == "object") {
            //json.execFn = "summer.eval"
            if (json.script) {
                json.script = "try{" + json.script + "}catch(e){alert(e)}";
            } else {
                alert("the parameter script of the execScript function is " + json.script);
            }
        }
        if (s.canrequire()) {
            return window.adrMininvoker.callSync("execScript",JSON.stringify(json));
        }
    };
}(window,summer);