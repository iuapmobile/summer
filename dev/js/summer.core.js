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
			if(json["alert"]){
				$summer.alert(json);
				delete json["alert"];
			}

			return this.callCordova('summer-plugin-frame.XFrame','openFrame',json, successFn, errFn);
        },
        closeFrame : function(json, successFn, errFn){
			return this.callCordova('summer-plugin-frame.XFrame','closeFrame',json, successFn, errFn);
        },
        openWin : function(json, successFn, errFn){
			return this.callCordova('summer-plugin-frame.XFrame', 'openWin', json, successFn, errFn);
        },
        closeWin : function(json, successFn, errFn){
			//support closeWin('xxx') and closeWin({id:'xxx'})
			if(typeof json == "string"){
				json = {"id" : json};
			}else if(typeof json == "undefined"){
				json = {};
			}				
			return this.callCordova('summer-plugin-frame.XFrame', 'closeWin', json, successFn, errFn);
		},
		getSysInfo : function(json, successFn, errFn){
			//support closeWin('xxx') and closeWin({id:'xxx'})
			if(typeof json == "string"){
				json = alert("parameter json is required json object type, but is string type");
			}
			var param = json || {
				systemType:"android",//"ios"
				systemVersion:7,// ios--> 7    android-->21
				statusBarAppearance : true,//false
				fullScreen : true,
				pageParam : {param0:123,param1:"abc"},
				screenWidth:"",
				screenHeight:"",
				
				winId:"",
				winWidth:"",
				winHeight:"",
				
				frameId:"",
				frameWidth:"",
				frameHeight:"",
				
				appParam:"",
			};
			return s.callSync('SummerDevice.getSysInfo', param);
			
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
	
	s.getSysInfo = s.window.getSysInfo;

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

    s.eval = function(script){
    	var t = setTimeout("try{eval(" + script + ")}catch(e){alert(e)}", 10);
    };
	//仅支持当前Win中的 各个frame和当前win之间的相互执行脚本
	s.execScript = function(json){
		/*{
			winId:'xxx',
			frameId:'yyy',
			script:'do()'
		}*/
		if(typeof json == "object"){
			//json.execFn = "summer.eval"
			if(json.script){
				json.script = "try{"+json.script+"}catch(e){alert(e)}";
			}else{
				alert("the parameter script of the execScript function is " + json.script);
			}
		}
		if(s.canrequire()){
            //return s.require('summer-plugin-frame.XFrame').execScript(json,null,null);
			return this.callCordova('summer-plugin-frame.XFrame','execScript',json, null, null);
		}
    };
	
	//持久化本地存储	
	var umStorage = function(type){
		type = type || "localStorage";
		if(type == "localStorage"){
			if(!window.localStorage){
		        alert('your device do not support the localStorage');
				return;
		    }
			return window.localStorage;
		}else if(type == "sessionStorage"){
			if(!window.sessionStorage){
		        alert('your device do not support the sessionStorage');
				return;
		    }
			return window.sessionStorage;
		}else if(type == "application"){
			return {
				setItem : function(key, value){
					var json = {
						key: key,
						value: value
					};
					return this.callSync("SummerStorage.writeApplicationContext", JSON.stringify(json));
				},
				getItem : function(key){
					var json = {
						key: key
					};
					return this.callSync("SummerStorage.readApplicationContext", JSON.stringify(json));
				}				
			};
		}else if(type == "configure"){
			return {
				setItem : function(key, value){
					var json = {
						key: key,
						value: typeof value == "string" ? value : JSON.stringify(value)
					};
					return this.callSync("SummerStorage.writeConfigure", JSON.stringify(json));
				},
				getItem : function(key){
					var json = {
						key: key
					};
					return this.callSync("SummerStorage.readConfigure", JSON.stringify(json));
				}				
			};
		}else if(type == "window"){
			return {
				setItem : function(key, value){
					var json = {
						key: key,
						value: typeof value == "string" ? value : JSON.stringify(value)
					};
					return this.callSync("SummerStorage.writeWindowContext", JSON.stringify(json));
				},
				getItem : function(key){
					var json = {
						key: key
					};
					return this.callSync("SummerStorage.readWindowContext", JSON.stringify(json));
				}				
			};
		}
    };
	s.setStorage = function(key, value, storageType){
		var v = value;
		if(typeof v == 'object'){
			v = JSON.stringify(v);
			v = 'obj-'+ v;
		}else{
			v = 'str-'+ v;
		}
		var ls = umStorage(storageType);
		if(ls){
			ls.setItem(key, v);
		}
    };
	s.getStorage = function(key, storageType){
        var ls = umStorage(storageType);
        if(ls){
            var v = ls.getItem(key);
            if(!v){return;}
            if(v.indexOf('obj-') === 0){
                v = v.slice(4);
                return JSON.parse(v);
            }else if(v.indexOf('str-') === 0){
                return v.slice(4);
            }
        }
    };
	
	s.setAppStorage = function(key, value){
        return this.setStorage(key, value, "application");
    };
	s.getAppStorage = function(key){
        return this.getStorage("application");
    };
	
	s.writeConfig = function(key, value){
        return this.setStorage(key, value, "configure");
    };
	s.readConfig = function(key){
        return this.getStorage("configure");
    };
	
	s.setWindowStorage = function(key, value){
        return this.setStorage(key, value, "window");
    };
	s.getWindowStorage = function(key){
        return this.getStorage("window");
    };
	
    s.rmStorage = function(key){
        var ls = umStorage();
        if(ls && key){
            ls.removeItem(key);
        }
    };
    s.clearStorage = function(){
        var ls = umStorage();
        if(ls){
            ls.clear();
        }
    };
	
	s.sysInfo = function(json, successFn, errFn){
		if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XService').sysInfo(json, successFn, errFn);
	};
	s.addEventListener = function(json, successFn, errFn){
		if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XFrame').addEventListener(json, successFn, errFn);
	};
	
	//app upgrade API
	s.getAppVersion = function(json){
		return s.callSync('XUpgrade.getAppVersion', json || {});
	};
	s.upgradeApp = function(json, successFn, errFn){
		return s.callCordova('summer-plugin-core.XUpgrade', 'upgradeApp', json, successFn, errFn);
	};
	s.getVersion = function(json){
		var ver = s.callSync('XUpgrade.getVersion', json || {});
		if(typeof ver == "string"){
			return JSON.parse(versionInfo);
		}else{
			alert("getVersion' return value is not string!")
			return ver;
		}
	}
	s.upgrade = function(json, successFn, errFn){
		return s.callCordova('summer-plugin-core.XUpgrade', 'upgrade', json, successFn, errFn);
	};
	
	//网络请求服务
	s.ajax = function(json, successFn, errFn){
		if(json.type == "get"){
			return cordovaHTTP.get(json.url || "", json.param || {}, json.header || {}, successFn, errFn);
		}else if(json.type == "post"){
			return cordovaHTTP.post(json.url || "", json.param || {}, json.header || {}, successFn, errFn);
		}
	};
	s.get = function(url, param, header, successFn, errFn){
		return cordovaHTTP.get(url || "", param || {}, header || {}, successFn, errFn);
	};
	s.post = function(url, param, header, successFn, errFn){
		return cordovaHTTP.post(url || "", param || {}, header || {}, successFn, errFn);
	};

	s.call = function(string, successFn, errFn){
		return window.PhoneCaller.call(string, successFn, errFn);
	};
	
	s.getLocation=function(successFn, errFn){
		return navigator.geolocation.getCurrentPosition(successFn, errFn);
	};
	
	s.contacts ={
		find:function(json, successFn, errFn){	
			var options      = new ContactFindOptions();
			options.filter   = json.filter;
			options.multiple = json.multiple;
			options.desiredFields =[navigator.contacts.fieldType.id];
			options.hasPhoneNumber = json.hasPhoneNumber;
			var fields  =json.fieldType || [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
			return navigator.contacts.find(fields, successFn, errFn, options);
		},
		
		save:function(json, successFn, errFn){
			var contact = navigator.contacts.create();
			contact.displayName = json.displayName;
			contact.nickname = json.nickName;   
			return contact.save(successFn,errFn);
		}
	};


	s.writeFile=function(key,value){
		alert(123)
		return $cache.write(key,value)
	};
	
	s.readFile=function(key){
		alert(321)
		return $cache.read(key)
	};

	s.call=function(string){
		return $tel.call(string)
	};
	
	s.sms=function(string,content){
		return $tel.sendMsg({
		   "tel" : string,
		   "body" : content
		})
	};
	
	s.mail =function(string,title,content){
		return $tel.sendMail({
		   "receive" :string,
		   "title" : title,
		   "content" : content
		})
	};

	s.netState =function(){
		return $net.available();
	};
	
	s.netInfo =function(){
		return $net. getNetworkInfo();
	};

	s.getTimeZoneID=function(){
		return $device.getTimeZoneID()
	};
	
	s.getTimeZoneDisplayName=function(){
		return $device.getTimeZoneDisplayName()
	};
	
	s.Location=function(callback){
		return $device.getLocation({
	     "bindfield" : "location", 
	     "callback" :  callback,         
	     "single" : "true",
	     "isgetaddress" : "true", 
	     "network" : "true" 
		}) 
	};
    
    s.openView=function(url){
    	return $device.openWebView({
		    "url" : url
		});
    };
    
    s.getInternalMemoryInfo=function(){
    	return $device.getInternalMemoryInfo()
    }
    
    s.getExternalStorageInfo=function(){
    	return $device.getExternalStorageInfo()
    }
    
    s.getMemoryInfo=function(){
    	return $device.getMemoryInfo()
    }
    
    s.getDeviceInfo=function(){
    	return $device.getDeviceInfo()
    };

  	s.httpGet=function(url,callback,json,time){
  		return $service.get({
		   "url" : url,
		   "callback" :callback, 
		   "header":json || {},
		   "timeout" : time || ""
		})
  	};

  	s.httpPost=function(url,callback,data,json,time){
  		return $service.post({
		   "url" : url,
		   "callback" :callback,
		   "data" : data || {}, 
		   "header":json || {},
		   "timeout" : time || ""
		})
  	}
  	
    
	//加速计

	s.getAcceleration = function (onSuccess,onError){
		return navigator.accelerometer.getCurrentAcceleration(onSuccess,onError);
	};
	s.watchAcceleration = function (options,onSuccess,onError){
		var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);  
		return watchID;  
	};
	//手机信息
	s.model = function (){
		return device.model;
	};
	s.uuid  = function (){
		return device.uuid;
	};
	s.version = function (){
		return device.version;
	};
	s.platform = function(){
		return device.platform;
	};
	s.manufacturer = function (){
		return device.manufacturer;
	};
	s.serial = function (){
		return device.serial;
	};
	//电池状态
	s.batterystatus = function (fn){
		return window.addEventListener("batterystatus", fn, false);
	};
	//camera
	s.camera = function (json,ret,err){
		return navigator.camera.getPicture(ret,err,json);
	};
	//Inappbrowser
	s.inappbrowser = function(url, target, options){
		return cordova.InAppBrowser.open(url, target, options);
	};
}(window,summer);
