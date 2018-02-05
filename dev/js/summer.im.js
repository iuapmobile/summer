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
    var e = {};
    window.im = e;
    return im;
}))
+ function (w, e, s) {
    if (!e) {
        e = {};
        w.im = e;
    }
    e.login = function (json, successFn, errFn) {
        json["callback"] = successFn;
        json["error"] = errFn;
        s.callService("YYIM.login", json, false);
    };
    e.logout = function (json, successFn, errFn) {
        json["callback"]=successFn;
        json["error"]=errFn;
        s.callService("YYIM.logout", json, false);
    };
}(window, im, summer);