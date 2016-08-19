/*
  * 日期插件 * 
*/
;
(function($){
    $.fn.picker = function (opts){
        return this.each(function () {
            var defaults = {'date': {preset: 'date'},'datetime': {preset: 'datetime'},'time': {preset: 'time'},'select': {preset: 'select'}};
            var options = $.extend(defaults, opts);
            init(options);
            function init (options){
                $.each(options,function(name,value){
                    console.log(name);
                    $('.um-scroller-' + name).scroller('destroy').scroller(
                        $.extend(value, {
                            theme: "ios7",
                            mode: "scroller",
                            display: "bottom",
                            animate: ""
                        })
                    );
                });
            }
        });
    }
})(jQuery)