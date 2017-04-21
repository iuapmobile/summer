(function(w,s,$s,prefix){
	//构建函数,用作实例化
    s.umRef = function(){};
    //储值对象，用作判断重复性
    var refManager = {
        refs : {},
        exec : function(id, data){
            this.refs[id].callback(data);
            delete this.refs[id]; 
        }
    };
    //summer追加的方法，用作公用    
    s.openRef = function(json,fn){
        var ref = new s.umRef();
        var info = s.getSysInfo();
        ref.param = {
            ref_id : "Fn" + $s.UUID(),//Fn_CA12BA
            ref_winId : info.winId,
            ref_frameId : info.frameId,
            ref_callBack : prefix + ".refCallBack"
        };
        ref.callback = fn;
        refManager.refs[ref.param.ref_id] = ref;
        json.pageParam = json.pageParam || {};
        json.pageParam.refParam = ref.param;
        s.openWin(json);
    };
    // summer的回调方法，用作下个页面的调用
    s.refCallBack = function (id,data){
        refManager.exec(id,data);
    };
    
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
    };
})(window,summer,$summer,"summer");