(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
}(window, function (window, noGlobal) {
    var i = {};
    window.im = i;
    return im;
}))
+ function (w, i, s) {
    if (!i) {
        i = {};
        w.im = i;
    }
    i.login = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.login";
        s.callServiceEx(params);
    };
    i.logout = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.logout";
        s.callService(params);
    };
}(window, im, summer);