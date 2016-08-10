//summer API
+function(w,s){
	if(!s){
		s = {};
		w.summer = s;
	}
    s.window = {
        openFrame : function(json, successFn, errFn){
            json["animation"] = json["animation"] || {};
            json["pageParam"] = json["pageParam"] || {};

    		if(json["rect"] && !json["position"]){
    			json["position"] = {};
    			json["position"].left = json["rect"].x;
    			json["position"].top = json["rect"].y;
    			json["position"].width = json["rect"].w;
    			json["position"].height = json["rect"].h;

    		}
    		if(json["position"].width=="auto"){
    		    json["position"].width = $summer.offset(document.getElementsByTagName("body")[0]).w;
    		}
    		if(json["position"].height=="auto"){
    		    json["position"].height = $summer.offset(document.getElementsByTagName("body")[0]).h;
    		}

    		if(json["name"] && !json["id"]){
    			json["id"] = json["name"];
    		}
//            if(json["url"]){
//                var url = json["url"];
//                var idx = url.indexOf("www/html/");
//                if(idx < 0){
//                    if(url.indexOf("html/")==0){
//                        json["url"] = "www/" + json["url"];
//                    }else{
//                        json["url"] = "www/html/" + json["url"];
//                    }
//                }
//            }
			var _test = json["alert"];
			if(_test){
				$summer.alert(json);
				delete json["alert"];
			}
			if(s.canrequire())
				return s.cordova.require('summer-plugin-frame.XFrame').openFrame(json, successFn, errFn);
			//等价于return s.require('summer-plugin-frame.XFrame').openFrame(json, successFn, errFn);
        },
        closeFrame : function(json, successFn, errFn){
			if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XFrame').closeFrame(json, successFn, errFn);
        },
        openWin : function(json, successFn, errFn){
//            if(json["url"]){
//                var idx = json["url"].indexOf("www/html/");
//                if(idx < 0){
//                    json["url"] = "www/html/" + json["url"];
//                }
//            }
			if(s.canrequire())
                return s.cordova.require('summer-plugin-frame.XFrame').openWin(json, successFn, errFn);
        },
        closeWin : function(json, successFn, errFn){
			if(s.canrequire()){
				//support closeWin('xxx') and closeWin({id:'xxx'})
				if(typeof json == "string"){
					json = {"id" : json};
				}else if(typeof json == "undefined"){
					json = {};
				}				
				return s.cordova.require('summer-plugin-frame.XFrame').closeWin(json, successFn, errFn);
			}
		},
		getSysInfo : function(json, successFn, errFn){
			if(s.canrequire()){
				//support closeWin('xxx') and closeWin({id:'xxx'})
				if(typeof json == "string"){
					json = {"id" : json};
				}else if(typeof json == "undefined"){
					json = {};
				}				
				return s.cordova.require('summer-plugin-frame.XFrame').getSysInfo(json, successFn, errFn);
			}
		},
        setFrameAttr : function(json, successFn, errFn){
			if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XFrame').setFrameAttr(json, successFn, errFn);
        },
        winParam : function(json, successFn, errFn){
			if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XFrame').winParam(json, successFn, errFn);
        },
        frameParam : function(json, successFn, errFn){
			if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XFrame').frameParam(json, successFn, errFn);
        },
        setRefreshHeaderInfo : function(json, successFn, errFn){
			if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XFrame').setRefreshHeaderInfo(json, successFn, errFn);
        },
        refreshHeaderLoadDone : function(json, successFn, errFn){
			if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XFrame').refreshHeaderLoadDone(json, successFn, errFn);
        },
        setRefreshFooterInfo : function(json, successFn, errFn){
			if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XFrame').setRefreshFooterInfo(json, successFn, errFn);
        },
        refreshFooterLoadDone : function(json, successFn, errFn){
			if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XFrame').refreshFooterLoadDone(json, successFn, errFn);
        }
    };

    //核心API直接通过 summer.xxx()访问
    s.openFrame = s.window.openFrame;
    s.closeFrame = s.window.closeFrame;
    s.openWin = s.window.openWin;
    s.closeWin = s.window.closeWin;

    s.winParam = s.window.winParam;
    s.frameParam = s.window.frameParam;
    s.setFrameAttr = s.window.setFrameAttr;

    s.setRefreshHeaderInfo = s.window.setRefreshHeaderInfo;
    s.refreshHeaderLoadDone = s.window.refreshHeaderLoadDone;
    s.setRefreshFooterInfo = s.window.setRefreshFooterInfo;
    s.refreshFooterLoadDone = s.window.refreshFooterLoadDone;

    s.showProgress = function(json){
		if(!s.canrequire()) return;
    	var invoker = summer.require('summer-plugin-service.XService');
    	json = json || {};
        invoker.call("UMJS.showLoadingBar",json);
    };
    s.hideProgress = function(json){
		if(!s.canrequire()) return;
    	var invoker = summer.require('summer-plugin-service.XService');
    	json = json || {};
        invoker.call("UMJS.hideLoadingBar",json);
    };
	//仅支持当前Win中的 各个frame和当前win之间的相互执行脚本
	s.execScript = function(json){
		/*{
			winId:'xxx',
			frameId:'yyy',
			script:'do()'
		}*/
		if(s.canrequire())
            return s.require('summer-plugin-frame.XFrame').execScript(json,null,null);
    };
	
	//持久化本地存储
	s.setStorage = function(json, successFn, errFn) {
		if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XService').setStorage(json, successFn, errFn);
	};
	s.getStorage = function(json, successFn, errFn){
		if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XService').getStorage(json, successFn, errFn);
	};
	s.rmStorage = function(json, successFn, errFn){
		if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XService').rmStorage(json, successFn, errFn);
	};
	s.clearStorage = function(json, successFn, errFn){
		if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XService').clearStorage(json, successFn, errFn);
	};
	
	//应用级Storage
	s.setAppStorage = function(json, successFn, errFn){
		if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XService').setAppStorage(json, successFn, errFn);
	};
	s.getAppStorage = function(json, successFn, errFn){
		if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XService').getAppStorage(json, successFn, errFn);
	};
	s.rmAppStorage = function(json, successFn, errFn){
		if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XService').rmAppStorage(json, successFn, errFn);
	};
	s.clearAppStorage = function(json, successFn, errFn){
		if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XService').clearAppStorage(json, successFn, errFn);
	};
	
	s.callCordova = function(cordovaPlugName, plugFnName, json, successFn, errFn){
		if(s.canrequire() || true){
            var plug = s.cordova.require(cordovaPlugName);
			if(plug[plugFnName]){
				plug[plugFnName](json, successFn, errFn);
			}else{
				alert("the cordova plug ["+cordovaPlugName+"]'s method[" + plugFnName + "] not implementation");
			}
		}
	}
	
	s.sysInfo = function(json, successFn, errFn){
		if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XService').sysInfo(json, successFn, errFn);
	};
	s.addEventListener = function(json, successFn, errFn){
		if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XFrame').addEventListener(json, successFn, errFn);
	};
}(window,summer);
