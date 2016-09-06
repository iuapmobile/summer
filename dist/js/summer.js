/*
 * Summer JavaScript Library
 * Copyright (c) 2016 yonyou.com
 * Author: gct@yonyou.com go
 * Version: 3.0.0.20160823.2047
 */
;(function(w){
    w.$summer = {};
    w.summer = {};
    w.api = w.summer;
    (function(){
    	var url = document.location.pathname.split("www")[0]+"www/cordova.js";
        _script = document.createElement('script');
        _script.id = "cordova_js";
        _script.type = 'text/javascript';
        _script.charset = 'utf-8';
        _script.async = true;
        _script.src = url;
        _script.onload = function (e) {
            w.$summer["cordova"] = w.cordova;
            w.summer["cordova"] = w.cordova;

            document.addEventListener('deviceready', function(){
                //1、先通过cdv来获取页面参数
                summer.winParam(function(ret){
					//希望返回
					var ctx = {
						systemType:"android",//"ios"
						systemVersion:7,// ios--> 7    android-->21
						iOS7StatusBarAppearance:true,//false
						fullScreen:true,
						pageParam:{param0:123,param1:"abc"},
						screenWidth:"",
						screenHeight:"",
						
						winId:"",
						winWidth:"",
						winHeight:"",
						
						frameId:"",
						frameWidth:"",
						frameHeight:"",
						
						appParam:"",
					}
                    //alert(typeof ret)// --> object

                    if(typeof ret == "string"){
                        ret = $summer.strToJson(ret);

                    }
                    //alert($summer.jsonToStr(ret));
                    summer['pageParam'] = ret;//原生数据都放在summer对象上
                    //alert($summer.jsonToStr(summer.pageParam));

                    if(typeof summerready == "function")
                        summerready();
                    if(typeof summerReady == "function")
                        summerReady();  

                });         
            }, false);

        };
        if(navigator.platform.toLowerCase().indexOf("win")<0){
        	try{
//            document.currentScript.parentNode.insertBefore(_script, document.currentScript);
	            fs = document.getElementsByTagName('script')[0];
	            fs.parentNode.insertBefore(_script, fs);
        	}catch(e){
        		console.log(e)
        	}
        }else{
        	
        }
    })();
    
    if(navigator.platform.toLowerCase().indexOf("win")>-1){
    	//alert("DOMContentLoaded")
    	document.addEventListener('DOMContentLoaded',function(){
    		if(typeof summerready == "function")
                summerready();
            if(typeof summerReady == "function")
                summerReady();  
    	},false);
    }
    
    w.summer.require = function(mdlName){
        if(window.$summer["cordova"] != window.cordova){
           alert("---------warnning : init cordova is too late!")
           window.$summer["cordova"] = window.cordova;
           window.summer["cordova"] = window.cordova;
        }
        if(mdlName == "cordova"){
           return window.summer["cordova"];
        }else{
           return window.summer["cordova"].require(mdlName);
        }
	};
	w.summer.canrequire = function(){
        if(navigator.platform.toLowerCase().indexOf("win")>-1){
			return false;
		}
		return true;
	};
   
   w.$summer.require = w.summer.require;
})(window);

// JavaScript Base Type Extra API
;(function(){
    /**
    * 删除左右两端的空格
    */
    String.prototype.trim=function(){
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
    /**
    * 删除左边的空格
    */
    String.prototype.ltrim=function(){
        return this.replace(/(^\s*)/g, "");
    }
    /**
    * 删除右边的空格
    */
    String.prototype.rtrim=function(){
        return this.replace(/(\s*$)/g, "");
    }
    String.prototype.isNullOrEmpty=function(){
        if(typeof this == "undefined" || this === null){
            return true;
        }
        if(typeof this == "string" && this == ""){
            return true;
        }
        return false;
    }

    //给Number类型增加一个add方法，使用时直接用 .add 即可完成加法计算。
    Number.prototype.add = function (arg) {
        var accAdd = function(arg1, arg2){
            var r1, r2, m;
            try {
                r1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            return (arg1 * m + arg2 * m) / m;
        };

        return accAdd(arg, this);
    };

    //给Number类型增加一个sub方法，，使用时直接用 .sub 即可完成减法计算。
    Number.prototype.sub = function (arg) {
        return this.add(this, -arg);
    };

    //给Number类型增加一个mul方法，使用时直接用 .mul 即可完成乘法计算。
    Number.prototype.mul = function (arg) {
        var accMul = function (arg1, arg2) {
            var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length;
            }
            catch (e) {
            }
            try {
                m += s2.split(".")[1].length;
            }
            catch (e) {
            }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        };

        return accMul(arg, this);
    };

    //给Number类型增加一个div方法，，使用时直接用 .div 即可完成除法计算。
    Number.prototype.div = function (arg) {
        var accDiv = function(arg1,arg2){
            var t1 = 0, t2 = 0, r1, r2;
            try {
                t1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
            }
            try {
                t2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
            }
            with (Math) {
                r1 = Number(arg1.toString().replace(".", ""));
                r2 = Number(arg2.toString().replace(".", ""));
                return (r1 / r2) * pow(10, t2 - t1);
            }
        };
        return accDiv(this, arg);
    };

    Array.prototype.remove = function(i){
        if(isNaN(i) || i < 0 || i >= this.length){
            return this;
        }
        this.splice(i,1);
        return this;
    }
    Array.prototype.remove2 = function(i){
        if(isNaN(i))
            return this;
        if(i < 0 || i >= this.length)
            return this;
        else
            return this.slice(0,i).concat(this.slice(i+1,this.length));
    }
    Array.prototype.remove3 = function(dx){
        if(isNaN(dx) || dx > this.length){
            return false;
        }
        for(var i=0,n=0;i<this.length;i++){
            if(this[i]!=this[dx]){
                this[n++]=this[i];
            }
        }
        this.length-=1;
    }
    Array.prototype.insert = function (i, item){
      return this.splice(i, 0, item);
    }
    Date.prototype.format = function(format){
        // (new Date()).format("yyyy-MM-dd hh:mm:ss")
        var o = {
            "M+" : this.getMonth()+1, //month 
            "d+" : this.getDate(), //day 
            "h+" : this.getHours(), //hour 
            "m+" : this.getMinutes(), //minute 
            "s+" : this.getSeconds(), //second 
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter 
            "S" : this.getMilliseconds() //millisecond 
        }

        if(/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }

        for(var k in o) {
            if(new RegExp("("+ k +")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
            }
        }
        return format;
    }
})();

// $summer  API
;(function(){
    var u = window.$summer || {};
    var isAndroid = (/android/gi).test(navigator.appVersion);
    u.os = (function(env){
        var browser={
            info:function(){
                var ua = navigator.userAgent, app = navigator.appVersion;
                return { //移动终端浏览器版本信息
                    //trident: ua.indexOf('Trident') > -1, //IE内核
                    //presto: ua.indexOf('Presto') > -1, //opera内核
                    webKit: ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    //gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或uc浏览器
                    iPhone: ua.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                    iPad: ua.indexOf('iPad') > -1, //是否iPad
                    //webApp: ua.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
					platform: navigator.platform
                };
            }(),
            lang:(navigator.browserLanguage || navigator.language).toLowerCase()
        };
		if(browser.info.platform.toLowerCase().indexOf("win")>=0){
			return "pc"
		}else if(browser.info.android){
            return "android";
        }else if(browser.info.ios || browser.info.iPhone || browser.info.iPad){
            return "ios";
        }else{
			return "";
		}
    })(u);


    // u.isArray = function(obj){
    //     if(Array.isArray){
    //         return Array.isArray(obj);
    //     }else{
    //         return obj instanceof Array;
    //     }
    // };
    u.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }
    u.isFunction = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
    u.isEmptyObject = function(obj){
        if(JSON.stringify(obj) === '{}'){
            return true;
        }
        return false;
    };
    u.alert = function(msg){
        try{
            if(typeof msg == "string"){
                alert(msg);
            }else if(typeof msg == "object"){
                alert(u.jsonToStr(msg));
            }else{
                alert(msg);
            }
        }catch(e){
            alert(msg);
        }
    };
    //获取随机的唯一id，随机不重复，长度固定
    u.UUID = function(len){
        len = len || 6;
        len = parseInt(len,10);
        len = isNaN(len)?6:len;
        var seed = '0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ';
        var seedLen = seed.length - 1;
        var uid = '';
        while(len--){
            uid += seed[Math.round(Math.random()*seedLen)]
        }
        return uid;
    };

    window.$summer = window.$summer || u;
})();


//HTML DOM API by gct
;(function(window){
    var u = window.$summer || {};
    u.isElement = function(obj){
        return !!(obj && obj.nodeType == 1);
    };
    u.addEvt = function(el, name, fn, useCapture){
        if(!u.isElement(el)){
            console.warn('$summer.addEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if(el.addEventListener) {
            el.addEventListener(name, fn, useCapture);
        }
    };
    u.rmEvt = function(el, name, fn, useCapture){
        if(!u.isElement(el)){
            console.warn('$summer.rmEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if (el.removeEventListener) {
            el.removeEventListener(name, fn, useCapture);
        }
    };
    u.one = function(el, name, fn, useCapture){
        if(!u.isElement(el)){
            console.warn('$api.one Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        var that = this;
        var cb = function(){
            fn && fn();
            that.rmEvt(el, name, cb, useCapture);
        };
        that.addEvt(el, name, cb, useCapture);
    };
    u.dom = function(el, selector){
        if(arguments.length === 1 && typeof arguments[0] == 'string'){
            if(document.querySelector){
                return document.querySelector(arguments[0]);
            }
        }else if(arguments.length === 2){
            if(el.querySelector){
                return el.querySelector(selector);
            }
        }
    };
    u.domAll = function(el, selector){
        if(arguments.length === 1 && typeof arguments[0] == 'string'){
            if(document.querySelectorAll){
                return document.querySelectorAll(arguments[0]);
            }
        }else if(arguments.length === 2){
            if(el.querySelectorAll){
                return el.querySelectorAll(selector);
            }
        }
    };
    u.byId = function(id){
        return document.getElementById(id);
    };
    u.first = function(el, selector){
        if(arguments.length === 1){
            if(!u.isElement(el)){
                console.warn('$summer.first Function need el param, el param must be DOM Element');
                return;
            }
            return el.children[0];
        }
        if(arguments.length === 2){
            return this.dom(el, selector+':first-child');
        }
    };
    u.last = function(el, selector){
        if(arguments.length === 1){
            if(!u.isElement(el)){
                console.warn('$summer.last Function need el param, el param must be DOM Element');
                return;
            }
            var children = el.children;
            return children[children.length - 1];
        }
        if(arguments.length === 2){
            return this.dom(el, selector+':last-child');
        }
    };
    u.eq = function(el, index){
        return this.dom(el, ':nth-child('+ index +')');
    };
    u.not = function(el, selector){
        return this.domAll(el, ':not('+ selector +')');
    };
    u.prev = function(el){
        if(!u.isElement(el)){
            console.warn('$api.prev Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.previousSibling;
        if(node.nodeType && node.nodeType === 3){
            node = node.previousSibling;
            return node;
        }
    };
    u.next = function(el){
        if(!u.isElement(el)){
            console.warn('$api.next Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.nextSibling;
        if(node.nodeType && node.nodeType === 3){
            node = node.nextSibling;
            return node;
        }
    };
    u.closest = function(el, selector){
        if(!u.isElement(el)){
            console.warn('$api.closest Function need el param, el param must be DOM Element');
            return;
        }
        var doms, targetDom;
        var isSame = function(doms, el){
            var i = 0, len = doms.length;
            for(i; i<len; i++){
                if(doms[i].isEqualNode(el)){
                    return doms[i];
                }
            }
            return false;
        };
        var traversal = function(el, selector){
            doms = u.domAll(el.parentNode, selector);
            targetDom = isSame(doms, el);
            while(!targetDom){
                el = el.parentNode;
                if(el != null && el.nodeType == el.DOCUMENT_NODE){
                    return false;
                }
                traversal(el, selector);
            }

            return targetDom;
        };

        return traversal(el, selector);
    };
    u.contains = function(parent,el){
        var mark = false;
        if(el === parent){
            mark = true;
            return mark;
        }else{
            do{
                el = el.parentNode;
                if(el === parent){
                    mark = true;
                    return mark;
                }
            }while(el === document.body || el === document.documentElement);

            return mark;
        }
        
    };
    u.remove = function(el){
        if(el && el.parentNode){
            el.parentNode.removeChild(el);
        }
    };
    u.attr = function(el, name, value){
        if(!u.isElement(el)){
            console.warn('$api.attr Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length == 2){
            return el.getAttribute(name);
        }else if(arguments.length == 3){
            el.setAttribute(name, value);
            return el;
        }
    };
    u.removeAttr = function(el, name){
        if(!u.isElement(el)){
            console.warn('$api.removeAttr Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 2){
            el.removeAttribute(name);
        }
    };
    u.hasCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.hasCls Function need el param, el param must be DOM Element');
            return;
        }
        if(el.className.indexOf(cls) > -1){
            return true;
        }else{
            return false;
        }
    };
    u.addCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.addCls Function need el param, el param must be DOM Element');
            return;
        }
        if('classList' in el){
            el.classList.add(cls);
        }else{
            var preCls = el.className;
            var newCls = preCls +' '+ cls;
            el.className = newCls;
        }
        return el;
    };
    u.removeCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.removeCls Function need el param, el param must be DOM Element');
            return;
        }
        if('classList' in el){
            el.classList.remove(cls);
        }else{
            var preCls = el.className;
            var newCls = preCls.replace(cls, '');
            el.className = newCls;
        }
        return el;
    };
    u.toggleCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.toggleCls Function need el param, el param must be DOM Element');
            return;
        }
       if('classList' in el){
            el.classList.toggle(cls);
        }else{
            if(u.hasCls(el, cls)){
                u.addCls(el, cls);
            }else{
                u.removeCls(el, cls);
            }
        }
        return el;
    };
    u.val = function(el, val){
        if(!u.isElement(el)){
            console.warn('$api.val Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 1){
            switch(el.tagName){
                case 'SELECT':
                    var value = el.options[el.selectedIndex].value;
                    return value;
                    break;
                case 'INPUT':
                    return el.value;
                    break;
                case 'TEXTAREA':
                    return el.value;
                    break;
            }
        }
        if(arguments.length === 2){
            switch(el.tagName){
                case 'SELECT':
                    el.options[el.selectedIndex].value = val;
                    return el;
                    break;
                case 'INPUT':
                    el.value = val;
                    return el;
                    break;
                case 'TEXTAREA':
                    el.value = val;
                    return el;
                    break;
            }
        }
        
    };
    u.prepend = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.prepend Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterbegin', html);
        return el;
    };
    u.append = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.append Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforeend', html);
        return el;
    };
    u.before = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.before Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforebegin', html);
        return el;
    };
    u.after = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.after Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterend', html);
        return el;
    };
    u.html = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.html Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 1){
            return el.innerHTML;
        }else if(arguments.length === 2){
            el.innerHTML = html;
            return el;
        }
    };
    u.text = function(el, txt){
        if(!u.isElement(el)){
            console.warn('$api.text Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 1){
            return el.textContent;
        }else if(arguments.length === 2){
            el.textContent = txt;
            return el;
        }
    };
    u.offset = function(el){
        if(!u.isElement(el)){
            console.warn('$api.offset Function need el param, el param must be DOM Element');
            return;
        }
        var sl, st;
        if(document.documentElement){
            sl = document.documentElement.scrollLeft;
            st = document.documentElement.scrollTop;
        }else{
            sl = document.body.scrollLeft;
            st = document.body.scrollTop;
        }
        var rect = el.getBoundingClientRect();
        return {
            l: rect.left + sl,
            t: rect.top + st,
            w: el.offsetWidth,
            h: el.offsetHeight
        };
    };
    u.css = function(el, css){
        if(!u.isElement(el)){
            console.warn('$api.css Function need el param, el param must be DOM Element');
            return;
        }
        if(typeof css == 'string' && css.indexOf(':') > 0){
            el.style && (el.style.cssText += ';' + css);
        }
    };
    u.cssVal = function(el, prop){
        if(!u.isElement(el)){
            console.warn('$api.cssVal Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 2){
            var computedStyle = window.getComputedStyle(el, null);
            return computedStyle.getPropertyValue(prop);
        }
    };
    u.jsonToStr = function(json){
        if(typeof json === 'object'){
            return JSON && JSON.stringify(json);
        }else{
			alert("$summer.jsonToStr's parameter is not a json, it's typeof is " + typeof json);
		}
    };
    u.strToJson = function(str){
        if(typeof str === 'string'){
            return JSON && JSON.parse(str);
        }else{
            alert("$summer.strToJson's parameter is not a string, it's typeof is " + typeof str);
        }
    };
    //gct api
    u.winWidth = function(){
        return document.documentElement.offsetWidth || document.body.offsetWidth;
    };
    //gct api
    u.winHeight = function(){
        return document.documentElement.offsetHeight || document.body.offsetHeight;
    };
    /******************** HTML API END ********************/

   
    /******************** Native API BEGIN ********************/
	//20160810
	
    u.fixStatusBar = function(el){
        if(!u.isElement(el)){
            alert('$summer.fixStatusBar Function need el param, el param must be DOM Element');
			return;
        }
        // var strDM = api.systemType;
        // if (strDM == 'ios') {
        //     var strSV = api.systemVersion;
        //     var numSV = parseInt(strSV,10);
        //     var fullScreen = api.fullScreen;
        //     var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
        //     if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
        //         el.style.paddingTop = '20px';
        //     }
        // }
		if($summer.os == "ios" || $summer.os == "pc"){
			$(el).children().css("top","20px");
			var strSV = summer.systemVersion;
            var numSV = parseInt(strSV,10);
            var fullScreen = summer.fullScreen;
            var statusBarAppearance = summer.statusBarAppearance;
			
			//if (numSV >= 7 && !fullScreen && statusBarAppearance) {
			if (true) {
				el.style.paddingTop = '20px';
				$(el).children().css("top","20px");
			}
        }else{
			
		}
    };
    u.toast = function(title, text, time){
        // var opts = {};
        // var show = function(opts, time){
        //     api.showProgress(opts);
        //     setTimeout(function(){
        //         api.hideProgress();
        //     },time);
        // };
        // if(arguments.length === 1){
        //     var time = time || 500;
        //     if(typeof title === 'number'){
        //         time = title;
        //     }else{
        //         opts.title = title+'';
        //     }
        //     show(opts, time);
        // }else if(arguments.length === 2){
        //     var time = time || 500;
        //     var text = text;
        //     if(typeof text === "number"){
        //         var tmp = text;
        //         time = tmp;
        //         text = null;
        //     }
        //     if(title){
        //         opts.title = title;
        //     }
        //     if(text){
        //         opts.text = text;
        //     }
        //     show(opts, time);
        // }
        // if(title){
        //     opts.title = title;
        // }
        // if(text){
        //     opts.text = text;
        // }
        // time = time || 500;
        // show(opts, time);
    };
    u.post = function(/*url,data,fnSuc,dataType*/){
        // var argsToJson = parseArguments.apply(null, arguments);
        // var json = {};
        // var fnSuc = argsToJson.fnSuc;
        // argsToJson.url && (json.url = argsToJson.url);
        // argsToJson.data && (json.data = argsToJson.data);
        // if(argsToJson.dataType){
        //     var type = argsToJson.dataType.toLowerCase();
        //     if (type == 'text'||type == 'json') {
        //         json.dataType = type;
        //     }
        // }else{
        //     json.dataType = 'json';
        // }
        // json.method = 'post';
        // api.ajax(json,
        //     function(ret,err){
        //         if (ret) {
        //             fnSuc && fnSuc(ret);
        //         }
        //     }
        // );
    };
    u.get = function(/*url,fnSuc,dataType*/){
        // var argsToJson = parseArguments.apply(null, arguments);
        // var json = {};
        // var fnSuc = argsToJson.fnSuc;
        // argsToJson.url && (json.url = argsToJson.url);
        // //argsToJson.data && (json.data = argsToJson.data);
        // if(argsToJson.dataType){
        //     var type = argsToJson.dataType.toLowerCase();
        //     if (type == 'text'||type == 'json') {
        //         json.dataType = type;
        //     }
        // }else{
        //     json.dataType = 'text';
        // }
        // json.method = 'get';
        // api.ajax(json,
        //     function(ret,err){
        //         if (ret) {
        //             fnSuc && fnSuc(ret);
        //         }
        //     }
        // );
    };
	
    window.$summer = window.$summer || u;
    window.$api = window.$summer;
})(window);

//summerBridge 3.0.0.20160906
+function(w,s){
	/*  加上如下注释代码，ios无法再声明summerBridge
	if(typeof summerBridge == "undefined"){
		summerBridge = {
			callSync:function(){
				alert("请将执行的逻辑放入summerready中");
			}
		}
	}
	*/
	//1、兼容Android
    if(w.adrinvoker) alert(w.adrinvoker);
    var adrinvoker = {};
    if(w.adrinvoker && w.adrinvoker.call2) alert(w.adrinvoker.call2);

	//Asynchronous call run as corodva bridge
    adrinvoker.call = function(srvName, strJson){
		if(navigator.platform.toLowerCase().indexOf("win")>=0){
			alert("执行"+srvName+"完毕\n参数是："+strJson);
			return;
		}
		
		strJson = strJson || '{}';
		
		var plug = summer.require('summer-plugin-service.XService');
		plug.call(srvName,$summer.strToJson(strJson));
    }

	//Synchronous call as summer bridge
    adrinvoker.call2 = function(srvName, strJson){
		if(navigator.platform.toLowerCase().indexOf("win")>=0){
			alert("执行"+srvName+"完毕\n参数是："+strJson);
			return;
		}
		if(typeof summerBridge != "undefined"){
			return summerBridge.callSync(srvName,strJson);
		}else{
			alert("summerBridge is not defined by native successfully!");
		}
    }
    w.adrinvoker = adrinvoker;
	
	//2、兼容ios
	//ios Synchronous
	if(typeof CurrentEnvironment != "undefined"){
		if($summer.os == "ios"){
			CurrentEnvironment.DeviceType = CurrentEnvironment.DeviceIOS;
		}else if($summer.os == "android"){
			CurrentEnvironment.DeviceType = CurrentEnvironment.DeviceAndroid;
		}else{}
	}
	if(typeof UM_callNativeService == "undefined"){
		var UM_callNativeService = function(serviceType,strParams){//同步调用，和安卓统一接口
			return adrinvoker.call2(serviceType,strParams);
		}
	}else{
		alert("UM_callNativeService is exist! fatal error!");
		alert(UM_callNativeService);
	}
	w.UM_callNativeService = UM_callNativeService;
	
	//ios Asynchronous
	if(typeof UM_callNativeServiceNoraml == "undefined"){
		UM_callNativeServiceNoraml = function(serviceType,strParams){//异步调用，和安卓统一接口
			return adrinvoker.call(serviceType,strParams);
		}
	}else{
		alert("UM_callNativeServiceNoraml is exist! fatal error!");
		alert(UM_callNativeServiceNoraml);
	}
	w.UM_callNativeServiceNoraml = UM_callNativeServiceNoraml;	

	//3、
	s.callSync = function(serivceName, strJson){
		var strParam = strJson;
		if(typeof strJson == "object"){
			strParam = JSON.stringify(strJson);
		}else if(typeof strJson != "string"){
			strParam = strJson.toString();
		}
		try{
		return summerBridge.callSync(serivceName, strParam);
		}catch(e){
			if($summer.os == "pc"){
				return strJson;
			}
			alert(e);
		}
	}
	//20160815
	s.callCordova = function(cordovaPlugName, plugFnName, json, successFn, errFn){
		if(this.canrequire() && !this.__debug){
            var plug = this.cordova.require(cordovaPlugName);
			if(plug[plugFnName]){
				plug[plugFnName](json, successFn, errFn);
			}else{
				alert("the cordova plug["+cordovaPlugName+"]'s method[" + plugFnName + "] not implementation");
			}
		}else{
			console.log("the cordova plug["+cordovaPlugName+"]'s method[" + plugFnName + "] executed!");
		}
	}
	
}(window,summer);

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
		return s.callSync('XUpgrade.getVersion', json || {});
	};
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

(function(w,s,$s,prefix){
	//构建函数,用作实例化
    s.umRef = function(){}
    //储值对象，用作判断重复性
    var refManager = {
        refs : {},
        exec : function(id, data){
            this.refs[id].callback(data);
            delete this.refs[id]; 
        }
    }
    //summer追加的方法，用作公用    
    s.openRef = function(json,fn){
        var ref = new s.umRef();
        var info = s.getSysInfo();
        ref.param = {
            ref_id : "Fn" + $s.UUID(),//Fn_CA12BA
            ref_winId : info.winId,
            ref_frameId : info.frameId,
            ref_callBack : prefix + ".refCallBack"
        }
        ref.callback = fn;
        refManager.refs[ref.param.ref_id] = ref;
        json.pageParam = json.pageParam || {};
        json.pageParam["refParam"] = ref.param;
        s.openWin(json);
    }
    // summer的回调方法，用作下个页面的调用
    s.refCallBack = function (id,data){
        refManager.exec(id,data);
    }
    
    s.comleteRef = function(json){
        var str = json;
        if(typeof json == "object"){
            str = JSON.stringify(json);
        }else if(typeof json == "string"){
            str = "'" + json + "'";
        }
        var param = {};
        param.um_refId = s.pageParam.refParam.ref_id;
        param.um_winId = s.pageParam.refParam.ref_winId;
        param.um_frameId = s.pageParam.refParam.ref_frameId;
        param.um_callBack = s.pageParam.refParam.ref_callBack;// summer.refcallBack({})
        s.execScript({
            winId : param.um_winId,
            frameId : param.um_frameId,
            script :  param.um_callBack + "('"+param.um_refId+"',"+str+");"//  xxx({z:1})  xxx(zzzz)
        });
        s.closeWin();
    }
})(window,summer,$summer,"summer")