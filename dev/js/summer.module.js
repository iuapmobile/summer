/*
 * Summer JavaScript Library
 * Copyright (c) 2016 yonyou.com
 * Author: gct@yonyou.com
 * Version: 0.3.0.20161118.1526
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
    var $s = {};
    var s = {$:$s};
    if ( typeof define === "function" && define.amd ) {
        define( "summer", [], function() {
            return s;
        });
    }
    window.$summer = $s;
    window.summer = s;
    return s;
}))

