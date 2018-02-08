(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document
            ? factory(global, true)
            : function (w) {
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
})) + function (w, i, s) {
    if (!i) {
        i = {};
        w.im = i;
    }
    i.login = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.login";
        s.callServiceEx(params, successFn, errFn);
    };
    i.logout = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.logout";
        s.callServiceEx(params, successFn, errFn);
    };
    i.createGroup = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.createGroup";
        s.callServiceEx(params, successFn, errFn);
    };
    i.getChatGroups = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.getChatGroups";
        s.callServiceEx(params, successFn, errFn);
    };
    i.chat = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.chat";
        s.callServiceEx(params, successFn, errFn);
    };
    i.registerMessageObserver = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.registerMessageObserver";
        s.callServiceEx(params, successFn, errFn);
    };
    i.getRecentContacters = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.getRecentContacters";
        s.callServiceEx(params, successFn, errFn);
    };
    i.fetchAccountMessages = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.fetchAccountMessages";
        s.callServiceEx(params, successFn, errFn);
    };
    i.openFaceToFace = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.openFaceToFace";
        s.callServiceEx(params, successFn, errFn);
    };
    i.deleteGroup = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.deleteGroup";
        s.callServiceEx(params, successFn, errFn);
    };
    i.getChatGroupMember = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.getChatGroupMember";
        s.callServiceEx(params, successFn, errFn);
    };
    i.groupKickMember = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.groupKickMember";
        s.callServiceEx(params, successFn, errFn);
    };
    i.forwardMessage = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.forwardMessage";
        s.callServiceEx(params, successFn, errFn);
    };
    i.groupAddMember = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.groupAddMember";
        s.callServiceEx(params, successFn, errFn);
    };
    i.updateUserInfo = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.updateUserInfo";
        s.callServiceEx(params, successFn, errFn);
    };
    i.fetchMessages = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.fetchMessages";
        s.callServiceEx(params, successFn, errFn);
    };
    i.setStickTop = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.setStickTop";
        s.callServiceEx(params, successFn, errFn);
    };
    i.setNoDisturb = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.setNoDisturb";
        s.callServiceEx(params, successFn, errFn);
    };
    i.deleteChat = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.deleteChat";
        s.callServiceEx(params, successFn, errFn);
    };
    i.deleteMessage = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.deleteMessage";
        s.callServiceEx(params, successFn, errFn);
    };
    i.joinGroup = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.joinGroup";
        s.callServiceEx(params, successFn, errFn);
    };
    i.setSilenceMode = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.setSilenceMode";
        s.callServiceEx(params, successFn, errFn);
    };
    i.isSilenceMode = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.isSilenceMode";
        s.callServiceEx(params, successFn, errFn);
    };
    i.searchByKey = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.searchByKey";
        s.callServiceEx(params, successFn, errFn);
    };
    i.updateMessageReaded = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.updateMessageReaded";
        s.callServiceEx(params, successFn, errFn);
    };
    i.chatSearch = function (json, successFn, errFn) {
        var params = {
            "params": json
        };
        params["method"] = "YYIM.chatSearch";
        s.callServiceEx(params, successFn, errFn);
    };
}(window, im, summer);