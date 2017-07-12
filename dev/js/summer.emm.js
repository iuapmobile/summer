/*2017.3.8
 * Summer JavaScript Library
 * Copyright (c) 2016 yonyou.com
 * Author: Qhb@yonyou.com go
 * Version: 3.0.0.20170214.2047
 */

(function(global, factory){
    if ( typeof module === "object" && typeof module.exports === "object" ) {
     
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "jQuery requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }
}(window,function(window,noGlobal){
    var e = {};
    window.emm = e;
    return emm;
}))

+function(w,e,s){
    if(!e){
        e={};
        w.emm=e;
    }

    e.writeConfig = function(json,successFn,errFn){
        s.callService("UMEMMService.writeConfig", json, false)

    };
    e.autofind = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.autofind', json, false);
    };
    e.registerDevice = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.registerDevice', json, false);
    };
    e.login = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.login', json, false);
    };
    e.logout = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.logout', json, false);
    };
    e.getUserInfo = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.getUserInfo', json, false);
    };  
    e.modifyPassword = function(json,successFn,errFn){  
        json["callback"]=successFn;
        json["error"]=errFn;    
        return  s.callService('UMEMMService.modifyPassword', json, false);
    };
    e.modifyAvatar = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.modifyAvatar', json, false);
    };
    e.getApps = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.getApps', json, false);
    };
    e.getDocs = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.getDocs', json, false);
    };
    e.startStrategy = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.startStrategy', json, false);
    };
    e.stopStrategy = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.stopStrategy', json, false);
    };
    e.feedback = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.feedback', json, false);
    };
     e.installWebApp = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
		 json["__keepCallback"] = true;
        return  s.callService('UMEMMService.installWebApp', json, false);
    };
     e.openWebApp = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.openWebApp', json, false);
    };
     e.removeWebApp = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.removeWebApp', json, false);
    }
    
}(window,emm,summer);