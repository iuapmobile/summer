;(function (w) {
    w.$summer = w.$summer || {};
    w.summer = w.summer || {};
    w.api = w.summer;
    (function () {
        try {
            var summerDOMContentLoaded = function () {
                document.addEventListener('DOMContentLoaded', function () {
                    summer.trigger("init");
                    summer.pageParam = window.localStorage;
                    if (typeof summerready == "function")
                        summerready();
                    if (typeof summerReady == "function")
                        summerReady();
                    summer.trigger("ready");
                    summer.trigger("aftershowwin");
                }, false);
            }

            if ($summer.os == "pc" || !window.summerBridge) {
                summer.__debug = true;
                console.log("run by file:// protocol in debug Mode");
                summerDOMContentLoaded();
            } else {
                var url = "";
                if (document.location.href.indexOf("http") === 0) {
                    //1、webapp
                    var strFullPath = window.document.location.href;
                    var strPath = window.document.location.pathname;
                    var pos = strFullPath.indexOf(strPath);
                    var prePath = strFullPath.substring(0, pos); //domain name
                    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1); //site name
                    w.__$_CORDOVA_PATH = w.__$_CORDOVA_PATH || (prePath + postPath);
                    if ($summer.os == "android") {
                        //alert("android");
                        url = w.__$_CORDOVA_PATH + "/cordova/android/cordova.js";
                    } else if ($summer.os == "ios") {
                        //alert("ios");
                        url = w.__$_CORDOVA_PATH + "/cordova/ios/cordova.js";
                    } else {
                        //alert("请在移动设备上访问");
                        //url = path + "ios/cordova.js";
                    }

                } else {
                    //2、hybrid app
                    if (w.__$_CORDOVA_PATH) {
                        url = w.__$_CORDOVA_PATH + "www/cordova.js";
                    } else {
                        url = document.location.pathname.split("www")[0] + "www/cordova.js";
                    }
                }

                var _script = document.createElement('script');
                _script.id = "cordova_js";
                _script.type = 'text/javascript';
                _script.charset = 'utf-8';
                _script.async = true;
                _script.src = url;
                _script.onload = function (e) {
                    w.$summer.cordova = w.cordova;
                    w.summer.cordova = w.cordova;

                    document.addEventListener('deviceready', function () {
                        summer.trigger("init");//summer.on('init',function(){})

                        //1、先获取页面参数123
                        summer.winParam(function (ret) {
                            //希望返回
                            var ctx = {
                                systemType: "android",//"ios"
                                systemVersion: 7,// ios--> 7    android-->21
                                iOS7StatusBarAppearance: true,//false
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

                                appParam: "",
                            };
                            //alert(typeof ret)// --> object

                            if (typeof ret == "string") {
                                ret = $summer.strToJson(ret);

                            }
                            //alert($summer.jsonToStr(ret));
                            summer.pageParam = ret;//put the param in summer
                            if (summer.autoShowWin !== false) {
                                summer.showWin({});
                            }
                            if (typeof summerready == "function")
                                summerready();
                            else if (typeof summerReady == "function")
                                summerReady();
                            summer.trigger("ready");

                            summer.trigger("aftershowwin");
                        });
                    }, false);

                };
                _script.onerror = function (e) {
                    summer.__debug = true;
                    console.log("run by http:// protocol in debug Mode");
                    summerDOMContentLoaded();
                };
                //document.currentScript.parentNode.insertBefore(_script, document.currentScript);
                fs = document.getElementsByTagName('script')[0];
                fs.parentNode.insertBefore(_script, fs);

            }
        } catch (e) {
            console.log(e);
        }
    })();

    w.summer.require = function (mdlName) {
        if (window.$summer["cordova"] != window.cordova) {
            alert("---------warnning : init cordova is too late!");
            window.$summer["cordova"] = window.cordova;
            window.summer["cordova"] = window.cordova;
        }
        if (mdlName == "cordova") {
            return window.summer["cordova"];
        } else {
            return window.summer["cordova"].require(mdlName);
        }
    };
    w.summer.canrequire = function () {
        if (navigator.platform.toLowerCase().indexOf("win") > -1) {
            return false;
        }
        return true;
    };
    w.$summer.require = w.summer.require;

    var EventMgr = function () {
        this._events = {};
    };
    EventMgr.prototype.on = function (evtName, handler) {
        if (this._events[evtName] == undefined) {
            this._events[evtName] = [];
        }
        this._events[evtName].push(handler);
    };
    EventMgr.prototype.off = function (evtName, handler) {
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
    EventMgr.prototype.trigger = function (evtName, sender, args) {
        try {
            var handlers = this._events[evtName];
            if (!handlers) return;
            var handler;
            args = args || {};
            for (var i = 0, len = handlers.length; i < len; i++) {
                handler = handlers[i];
                handler(sender, args);
            }
        } catch (e) {
            alert(e);
        }
    };
    var _ems = new EventMgr();
    w.summer.on = function (eName, fn) {
        _ems.on(eName, fn);
    };
    w.summer.trigger = function (eName) {
        _ems.trigger(eName);
    };
})(window);
