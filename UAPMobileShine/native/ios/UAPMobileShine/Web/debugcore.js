var sys = require('sys');
var require = require('requirejs');
require(["Frameworks/json","Frameworks/UMP.MACore","Frameworks/UMP.Container","Frameworks/UMP.Web","CustomerContentController","CustomerContentControllerEx"], function(obj) {  
sys.debug("libs loaded...");
var start=function(x) {
debugger;
new UMP.UI.WebApp.Controller.customer().onLoad();
sys.debug("call func end...");
 }; 
	start();
 });
