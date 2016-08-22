/*
  * 日期插件 * 
*/
;
(function($){
    var defaults = {
        theme: "ios7",
        mode: "scroller",
        display: "bottom",
        animate: ""       
    };
    $.fn.extend ({
        "picker" : function(opts){
    var _this = this;
    var c_url = document.location.pathname.split("www")[0]+"www/css/iscroll.css";
    var s_url = document.location.pathname.split("www")[0]+"www/js/iscroll.js";
    _css = document.createElement('link');
    _css.id = "iscroll_css";
    _css.rel = 'stylesheet';
    _css.href = c_url;
    //
    _script = document.createElement('script');
    _script.id = "iscroll_js";
    _script.type = 'text/javascript';
    _script.charset = 'utf-8';
    _script.async = false;
    _script.src = s_url;
    var fs = document.getElementsByTagName('script');
    for(var i = 0; i<fs.length;i++){
        
        if (fs[i].src.indexOf("frameworks.ui.js") > -1) {
                fs[i].parentNode.insertBefore(_css, fs[i]);
                fs[i].parentNode.insertBefore(_script, fs[i]);
            }
        }
        _script.onload = function(){
            _this.mobscroll(opts);
        }
    },
    "mobscroll" : function(opts){
    var options = $.extend(defaults, opts);
    $('.um-scroller-' + options.preset).scroller('destroy').scroller(
                    $.extend(options, defaults)
                );
            }
        });
})(jQuery)
