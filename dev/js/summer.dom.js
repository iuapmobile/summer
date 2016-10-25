
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
        
		var sysInfo=summer.getSysInfo();
        var strST=sysInfo.systemType;
        var strSV = sysInfo.systemVersion;
        var fullScreen = sysInfo.fullScreen;
        var statusBarAppearance = sysInfo.statusBarAppearance;
        var statusBarHeight = sysInfo.statusBarHeight;
        if((strST == "ios" && fullScreen && statusBarAppearance=='1') || strST == "pc"){        
                el.style.paddingTop = '20px';
                $(el).children().css("top","20px");
        }else if(strST == "android" && fullScreen && statusBarAppearance){
                el.style.paddingTop = '20px';
                $(el).children().css("top",'20px');
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
