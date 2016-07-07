
//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
//-----------------------------------------------------------------------
// UMP Framework in webView
var splitestring="^**^"; //this will be removed  and in UMBinder.m also used
var CurrentEnvironment={};
CurrentEnvironment.DeviceIOS="ios";
CurrentEnvironment.DeviceAndroid="android";
CurrentEnvironment.DeviceWin8="win8";
CurrentEnvironment.DevicePC="pc";
CurrentEnvironment.DeviceType="ios";


var registerBindMap = new Map();
var bridge;
window.addEventListener('load', bindEventOnWebViewReadyForAndroid,false);
document.addEventListener('JavascriptBridgeReady', onBridgeReady, false);
function onBridgeReady(event) {
    bridge = event.bridge
    var uniqueId = 1;
    
    function log(message, data) {
        /*alert(message);
        var log = document.getElementById('log')
         var el = document.createElement('div')
         el.className = 'logLine'
         el.innerHTML = uniqueId++ + '. ' + message + (data ? ':<br/>' + JSON.stringify(data) : '')
         if (log.children.length) { log.insertBefore(el, log.children[0]) }
         else { log.appendChild(el) }
         */
    }
    bridge.init(function(message, responseCallback) {
                //responseCallback(data);
                });
    
    bridge.registerHandler('eventdispacher', function(key, responseCallback) {
                           var eventobject=stringToJSON(key);
                           var s= eventobject.source;
                           var pa;
                           for(var k in s){
                                pa=k+":"+eval("s."+k);
                           
                                registerBindMap.get(pa).call(this,eventobject.data);
                           }
                           
                           /*responseCallback(responseData)*/
                           });
    
    
    /*
     //send a message
     bridge.send("zjx", function(responseData) {});
     */
    
    /*
     //get model
     bridge.callHandler('getModel', 'CustomerBE', function(model) {
     alert(model);
     });
     */
    
    /*
     //updateModel
     bridge.callHandler('updateModel', "{FirstName:'gct'}", function(model) {
                       alert("updatemodel");
                       });
     */
    
    
    for(var i=0;i<registerBindMap.size();i++){
        var key = registerBindMap.arr[i].key;
        
        bridge.callHandler('modelEventBind', key, function(params) {
                           //alert(params);
                           });
    }
}

$$ActionAgent=function(){};
$$ActionAgent.prototype.call=function(controllerName, actionName, params){
    if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
        
        bridge.callHandler('callController', controllerName+":"+actionName+":"+params, function(params) {
                           //alert(params);
        });
    }else{
        UM_CallControllerInAndroidContainer(controllerName, actionName, params);
    }
}
var $$CurrentActionAgent=new $$ActionAgent();

$$ModelAgent=function(){};
$$ModelAgent.prototype.bind=function(eventName,modelname, fieldName, handler){
    //need modify
    modelname="CustomerSubmit";
    var key = eventName + ":" + modelname+"."+fieldName;
    //alert(key);
    registerBindMap.put(key,handler);    
}
var $$CurrentModelAgent=new $$ModelAgent();



///


//bindEventOnWebViewReady for android
function bindEventOnWebViewReadyForAndroid(){
    for(var i=0;i<registerBindMap.size();i++){
        var key = registerBindMap.arr[i].key;
        //call container.js bindEvent method.
        //...
    }
}


//callback funciton, dispacher event from native to webview
function dispacherEventToWebview(key) {
    var pa=key.split(splitestring);
    registerBindMap.get(pa[0]).call(this,pa[1]);
}



//call js controller from webview
function UM_CallControllerInAndroidContainer(controllername,actionName,params){
    
}

//call native method
//UM_CallAction("testUMContainerController","callByjs",params);


