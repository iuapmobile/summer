//HTML DOM API by gct
;(function(window){
    var u = window.$summer || {};
    var isAndroid = (/android/gi).test(navigator.appVersion);
    u.os = (function(env){
        var browser={
            info:function(){
                var ua = navigator.userAgent, app = navigator.appVersion;
                return { //移动终端浏览器版本信息
                    webKit: ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    mobile: !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或uc浏览器
                    iPhone: ua.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                    iPad: ua.indexOf('iPad') > -1, //是否iPad
					platform: navigator.platform
                };
            }(),
            lang:(navigator.browserLanguage || navigator.language).toLowerCase()
        };
		if(browser.info.platform.toLowerCase().indexOf("win")>= 0 || browser.info.platform.toLowerCase().indexOf("mac")>= 0){
		    return "pc";
		}else if(browser.info.android){
            return "android";
        }else if(browser.info.ios || browser.info.iPhone || browser.info.iPad){
            return "ios";
        }else{
			return "";
		}
    })(u);
    u.strToJson = function(str){
        if(typeof str === 'string'){
            return JSON && JSON.parse(str);
        }else{
            console.log("$summer.strToJson's parameter is not a string, it's typeof is " + typeof str);
        }
    };
    u.jsonToStr = function(json){
        if(typeof json === 'object'){
            return JSON && JSON.stringify(json);
        }else{
			console.log("$summer.jsonToStr's parameter is not a json, it's typeof is " + typeof json);
		}
    };
    u.UUID = function(len){
        len = len || 6;
        len = parseInt(len,10);
        len = isNaN(len)?6:len;
        var seed = '0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ';
        var seedLen = seed.length - 1;
        var uid = '';
        while(len--){
            uid += seed[Math.round(Math.random()*seedLen)];
        }
        return uid;
    };
    u.isJSONObject = function (obj) {
		return Object.prototype.toString.call(obj) === '[object Object]';
	};
	u.isEmpty = function(obj){
		if(obj === undefined || obj === null || (obj.toString && obj.toString() === "")){
			return true;
		}
		return false;
	};
	u.checkIfExist = function(obj,paramNameArray,msg){
        for(var i=0,len=paramNameArray.length;i<len;i++){
            var key = paramNameArray[i];
            if(key in obj && $summer.isEmpty(obj[key])){
                var str = "参数["+paramNameArray[i]+"]不能为空";
                alert(msg ? msg + str : str);
                return false;
            }           
        }
        return true;
    };
})(window);