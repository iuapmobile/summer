//summer API
+function (w, s) {
    if (!s) {
        s = {};
        w.summer = s;
    }
    s.window = {
        openFrame: function (json, successFn, errFn) {
            json["animation"] = json["animation"] || {};
            json["pageParam"] = json["pageParam"] || {};

            if (json["rect"] && !json["position"]) {
                json["position"] = {};
                json["position"].left = json["rect"].x;
                json["position"].top = json["rect"].y;
                json["position"].width = json["rect"].w;
                json["position"].height = json["rect"].h;

            }
            if (json["name"] && !json["id"]) {
                json["id"] = json["name"];
            }
            if (json["alert"]) {
                $summer.alert(json);
                delete json["alert"];
            }
            return s.callCordova('summer-plugin-frame.XFrame', 'openFrame', json, successFn, errFn);
        },
        closeFrame: function (json, successFn, errFn) {
            return s.callCordova('summer-plugin-frame.XFrame', 'closeFrame', json, successFn, errFn);
        },
        openFrameGroup: function (json, successFn, errFn) {
            return s.callCordova('summer-plugin-frame.XFrame', 'openFrameGroup', json, successFn, errFn);
        },
        closeFrameGroup: function (json, successFn, errFn) {
            return s.callCordova('summer-plugin-frame.XFrame', 'closeFrameGroup', json, successFn, errFn);
        },
        setFrameGroupAttr: function (json, successFn, errFn) {
            return s.callCordova('summer-plugin-frame.XFrame', 'setFrameGroupAttr', json, successFn, errFn);
        },
        setFrameGroupIndex: function (json, successFn, errFn) {
            return s.callCordova('summer-plugin-frame.XFrame', 'setFrameGroupIndex', json, successFn, errFn);
        },
        openWin: function (json, successFn, errFn) {
			if(!json["animation"]){
        		json["animation"]={
				    type:"push", 
				    subType:"from_right", 
				    duration:300 
				};
        	}
            return s.callCordova('summer-plugin-frame.XFrame', 'openWin', json, successFn, errFn);
        },
        // ios下，退出登录，关闭其他页面
        initializeWin: function (json, successFn, errFn) {
            if ($summer.os == "ios") {
                return s.callCordova('summer-plugin-frame.XFrame', 'initializeWin', json, successFn, errFn);
            } else if ($summer.os == "android") {
                if (json.id && json.url && json.toId) {
                    summer.openWin({"id": json.id, "url": json.url, "isKeep": false});
                    summer.closeToWin({id: json.toId});
                }
            }
        },
        // ios下，重新挂载事件监听
        addEventListener: function (json, successFn, errFn) {
            if ($summer.os == "ios") {
                return s.callCordova('summer-plugin-frame.XFrame', 'addEventListener', json, successFn, errFn);
            } else if ($summer.os == "android") {
            	if (json.event && json.handler) {
            		var handler = json.handler.replace(/\(|\)/g,'');
					document.addEventListener(json.event, eval("("+ handler +")"), false);
            	}
            }
        },
        createWin: function (json, successFn, errFn) {
            return s.callCordova('summer-plugin-frame.XFrame', 'createWin', json, successFn, errFn);
        },
        getOpenWinTime: function (json, successFn, errFn) {
            return s.callCordova("summer-plugin-frame.XFrame", "getOpenWinTime", json, successFn, errFn)
        },
        showWin: function (json, successFn, errFn) {
            return s.callCordova('summer-plugin-frame.XFrame', 'showWin', json, successFn, errFn);
        },
		setWinAttr: function (json, successFn, errFn) {
            return s.callCordova('summer-plugin-frame.XFrame', 'setWinAttr', json, successFn, errFn);
        },
        closeWin: function (json, successFn, errFn) {
            //support closeWin('xxx') and closeWin({id:'xxx'})
            if (typeof json == "string") {
                json = {"id": json};
            } else if (typeof json == "undefined") {
                json = {}
            }
            return s.callCordova('summer-plugin-frame.XFrame', 'closeWin', json, successFn, errFn);
        },
        closeToWin: function (json, successFn, errFn) {
            //support closeWin('xxx') and closeWin({id:'xxx'})
            if (typeof json == "string") {
                json = {"id": json};
            } else if (typeof json == "undefined") {
                json = {};
            }
            return s.callCordova('summer-plugin-frame.XFrame', 'closeToWin', json, successFn, errFn);
        },
        getSysInfo: function (json, successFn, errFn) {
            //support closeWin('xxx') and closeWin({id:'xxx'})
            if (typeof json == "string") {
                json = alert("parameter json is required json object type, but is string type");
            }
            var param = json || {
                    systemType: "android",//"ios"
                    systemVersion: 7,// ios--> 7    android-->21
                    statusBarAppearance: true,//false
                    fullScreen: true,
                    pageParam: {param0: 123, param1: "abc"},
                    screenWidth: "",
                    screenHeight: "",
                    winId: "",
                    winWidth: "",
                    winHeight: "",
                    frameId: "",
                    frameWidth: "",
                    frameHeight: "",
                    statusBarHeight: "",
                    statusBarStyle: "",
                    appParam: "",
                };
            return JSON.parse(s.callSync('SummerDevice.getSysInfo', param));

        },
        setFrameAttr: function (json, successFn, errFn) {
            if (s.canrequire())
                return s.cordova.require('summer-plugin-frame.XFrame').setFrameAttr(json, successFn, errFn);
        },
        winParam: function (json, successFn, errFn) {
            if (s.canrequire())
                return s.cordova.require('summer-plugin-frame.XFrame').winParam(json, successFn, errFn);
        },
        frameParam: function (json, successFn, errFn) {
            if (s.canrequire())
                return s.cordova.require('summer-plugin-frame.XFrame').frameParam(json, successFn, errFn);
        },
        setRefreshHeaderInfo: function (json, successFn, errFn) {
            if (s.canrequire())
                return s.cordova.require('summer-plugin-frame.XFrame').setRefreshHeaderInfo(json, successFn, errFn);
        },
        refreshHeaderLoadDone: function (json, successFn, errFn) {
            if (s.canrequire())
                return s.cordova.require('summer-plugin-frame.XFrame').refreshHeaderLoadDone(json, successFn, errFn);
        },
        refreshHeaderBegin: function (json, successFn, errFn) {
            if (s.canrequire()) {
                return s.cordova.require("summer-plugin-frame.XFrame").refreshHeaderBegin(json, successFn, errFn)
            }
        },
        setRefreshFooterInfo: function (json, successFn, errFn) {
            if (s.canrequire())
                return s.cordova.require('summer-plugin-frame.XFrame').setRefreshFooterInfo(json, successFn, errFn);
        },
        refreshFooterLoadDone: function (json, successFn, errFn) {
            if (s.canrequire())
                return s.cordova.require('summer-plugin-frame.XFrame').refreshFooterLoadDone(json, successFn, errFn);
        },
        refreshFooterBegin: function (json, successFn, errFn) {
            if (s.canrequire()) {
                return s.cordova.require("summer-plugin-frame.XFrame").refreshFooterBegin(json, successFn, errFn)
            }
        },
        hideLaunch: function (json, successFn, errFn) {
            return s.callCordova('summer-plugin-frame.XFrame', 'removeStartPage', json, successFn, errFn);
        },
        setTabbarIndex: function (json, successFn, errFn) {
            return s.callCordova('summer-plugin-frame.XFrame', 'setTabbarItemSelect', json, successFn, errFn);
        }
    };


    //核心API直接通过 summer.xxx()访问
    s.openFrame = s.window.openFrame;
    s.closeFrame = s.window.closeFrame;
    s.openWin = s.window.openWin;
    s.initializeWin = s.window.initializeWin;
    s.addEventListener = s.window.addEventListener;
	s.setWinAttr = s.window.setWinAttr;
    s.createWin = s.window.createWin;
    s.getOpenWinTime = s.window.getOpenWinTime;
    s.showWin = s.window.showWin;
    s.closeWin = s.window.closeWin;
    s.closeToWin = s.window.closeToWin;
    s.getSysInfo = s.window.getSysInfo;
    s.winParam = s.window.winParam;
    s.frameParam = s.window.frameParam;
    s.setFrameAttr = s.window.setFrameAttr;
    s.setRefreshHeaderInfo = s.window.setRefreshHeaderInfo;
    s.refreshHeaderLoadDone = s.window.refreshHeaderLoadDone;
    s.refreshHeaderBegin = s.window.refreshHeaderBegin;
    s.setRefreshFooterInfo = s.window.setRefreshFooterInfo;
    s.refreshFooterLoadDone = s.window.refreshFooterLoadDone;
    s.refreshFooterBegin = s.window.refreshFooterBegin;
    s.openFrameGroup = s.window.openFrameGroup;
    s.closeFrameGroup = s.window.closeFrameGroup;
    s.setFrameGroupAttr = s.window.setFrameGroupAttr;
    s.setFrameGroupIndex = s.window.setFrameGroupIndex;
    s.hideLaunch = s.window.hideLaunch;
    s.setTabbarIndex = s.window.setTabbarIndex;

    s.showProgress = function (json) {
        if (!s.canrequire()) return;
        var invoker = summer.require('summer-plugin-service.XService');
        json = json || {};
        invoker.call("UMJS.showLoadingBar", json);
    };
    s.hideProgress = function (json) {
        if (!s.canrequire()) return;
        var invoker = summer.require('summer-plugin-service.XService');
        json = json || {};
        invoker.call("UMJS.hideLoadingBar", json);
    };
    s.toast = function (json) {
        if (!s.canrequire()) return;
        var invoker = summer.require('summer-plugin-service.XService');
        json = json || {};
        invoker.call("UMJS.toast", json);
    };
    //upload方法
    s.upload = function (json, sFn, eFn, headers) {
        var fileURL = json.fileURL,
            type = json.type,
            params = json.params;
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options.mimeType = type;

        options.params = params;
        options.httpMethod = "POST";
        options.headers = headers || {};

        var ft = new FileTransfer();
        var SERVER = json.SERVER;
        ft.upload(fileURL, encodeURI(SERVER), sFn, eFn, options);
    };
	 //多图多文件批量上传 
    s.multiUpload= function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMFile.multiUpload', json, false);
    };
    s.eval = function (script) {
        var t = setTimeout("try{eval(" + script + ")}catch(e){alert(e)}", 10);
    };
    //仅支持当前Win中的 各个frame和当前win之间的相互执行脚本
    s.execScript = function (json) {
        /*{
         winId:'xxx',
         frameId:'yyy',
         script:'do()'
         }*/
        if (typeof json == "object") {
            //json.execFn = "summer.eval"
            if (json.script) {
                json.script = "try{" + json.script + "}catch(e){alert(e)}";
            } else {
                alert("the parameter script of the execScript function is " + json.script);
            }
        }
        if (s.canrequire()) {
            //return s.require('summer-plugin-frame.XFrame').execScript(json,null,null);
            return this.callCordova('summer-plugin-frame.XFrame', 'execScript', json, null, null);
        }
    };

    //持久化本地存储
    var umStorage = function (type) {
        type = type || "localStorage";
        if (type == "localStorage") {
            if (!window.localStorage) {
                alert('your device do not support the localStorage');
                return;
            }
            return window.localStorage;
        } else if (type == "sessionStorage") {
            if (!window.sessionStorage) {
                alert('your device do not support the sessionStorage');
                return;
            }
            return window.sessionStorage;
        } else if (type == "application") {
            return {
                setItem: function (key, value) {
                    var json = {
                        key: key,
                        value: value
                    };
                    return s.callSync("SummerStorage.writeApplicationContext", JSON.stringify(json));
                },
                getItem: function (key) {
                    var json = {
                        key: key
                    };
                    return s.callSync("SummerStorage.readApplicationContext", JSON.stringify(json));
                }
            };
        } else if (type == "configure") {
            return {
                setItem: function (key, value) {
                    var json = {
                        key: key,
                        value: typeof value == "string" ? value : JSON.stringify(value)
                    };
                    return s.callSync("SummerStorage.writeConfigure", JSON.stringify(json));
                },
                getItem: function (key) {
                    var json = {
                        key: key
                    };
                    return s.callSync("SummerStorage.readConfigure", JSON.stringify(json));
                }
            };
        } else if (type == "window") {
            return {
                setItem: function (key, value) {
                    var json = {
                        key: key,
                        value: typeof value == "string" ? value : JSON.stringify(value)
                    };
                    return s.callSync("SummerStorage.writeWindowContext", JSON.stringify(json));
                },
                getItem: function (key) {
                    var json = {
                        key: key
                    };
                    return s.callSync("SummerStorage.readWindowContext", JSON.stringify(json));
                }
            };
        }
    };
    s.setStorage = function (key, value, storageType) {
        var v = value;
        if (storageType != "configure") {
            //storageType == "configure" 是为原生提供的配置，callAction时原生读取，所以不能obj- str-处理
            if (typeof v == 'object') {
                v = JSON.stringify(v);
                v = 'obj-' + v;
            } else {
                v = 'str-' + v;
            }
        }
        var ls = umStorage(storageType);
        if (ls) {
            ls.setItem(key, v);
        }
    };
    s.getStorage = function (key, storageType) {
        var ls = umStorage(storageType);
        if (ls) {
            var v = ls.getItem(key);
            if (!v) {
                return;
            }
            if (storageType != "configure") {
                if (v.indexOf('obj-') === 0) {
                    v = v.slice(4);
                    return JSON.parse(v);
                } else if (v.indexOf('str-') === 0) {
                    return v.slice(4);
                } else {
                    return v;
                }
            } else {
                return v;
            }
        }
    };

    s.setAppStorage = function (key, value) {
        return s.setStorage(key, value, "application");
    };
    s.getAppStorage = function (key) {
        return s.getStorage(key, "application");
    };
    /*
     s.writeConfig = function(key, value){
     return s.setStorage(key, value, "configure");
     };
     s.readConfig = function(key){
     return s.getStorage(key, "configure");
     };
     */
    s.setWindowStorage = function (key, value) {
        return s.setStorage(key, value, "window");
    };
    s.getWindowStorage = function (key) {
        return s.getStorage(key, "window");
    };

    s.rmStorage = function (key) {
        var ls = umStorage();
        if (ls && key) {
            ls.removeItem(key);
        }
    };
    s.clearStorage = function () {
        var ls = umStorage();
        if (ls) {
            ls.clear();
        }
    };

    s.sysInfo = function (json, successFn, errFn) {
        if (s.canrequire())
            return s.cordova.require('summer-plugin-frame.XService').sysInfo(json, successFn, errFn);
    };
    //app upgrade API
    s.getAppVersion = function (json) {
        return s.callSync('XUpgrade.getAppVersion', json || {});
    };
    s.upgradeApp = function (json, successFn, errFn) {
        return s.callCordova('summer-plugin-core.XUpgrade', 'upgradeApp', json, successFn, errFn);
    };
    s.getVersion = function (json) {
        var ver = s.callSync('XUpgrade.getVersion', json || {});
        if (typeof ver == "string") {
            return JSON.parse(ver);
        } else {
            alert("getVersion' return value is not string!");
            return ver;
        }
    };
    s.upgrade = function (json, successFn, errFn) {
        return s.callCordova('summer-plugin-core.XUpgrade', 'upgrade', json, successFn, errFn);
    };
    //退出
    s.exitApp = function (json, successFn, errFn) {
        return s.callCordova('summer-plugin-core.XUpgrade', 'exitApp', json || {}, successFn, errFn);
    };

    s.collectInfos = function (json) {
        var APMPARAMS = ["login", json];
        cordova.require("summer-plugin-apm.SummerAPM").insertAction(APMPARAMS, function (args) {
        }, function (args) {
        });
    };
    //安卓手动获取权限
    s.getPermission = function (json, successFn, errFn) {
        if ($summer.os == 'android') {
            return s.callCordova('summer-plugin-service.XService', 'getPermission', json, successFn, errFn);
        }
    };
}(window, summer);
