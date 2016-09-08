//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// include : UMP.Web.EventMgr | UMP.Web.AttrEventMgr
// Author gct@yonyou.com
//-----------------------------------------------------------------------

(function(window, undefined) {
    var UM = (function() {
        var UM = function() {
            this.CurrentModel = new UMP.Web.Mvc.Model();
            this.CurrentBindingInfo = {};
            this.CurrentBindingInfo2 = {};
            this.CurrentController = null;
            this.jcontrols = {};
        }
        UM.prototype = {
            model : function(fullName) {
                if (fullName == undefined) {
                    return this.CurrentModel;
                }
                var pathArray = fullName.split(".");
                var curModel = this.CurrentModel;
                for (var i = 0, len = pathArray.length; i < len; i++) {
                    curModel = curModel.get(pathArray[i]);
                }
                return curModel;
            },
            view : function(id) {
                return $("#" + id);
            },
            load : function(json) {//相当于数据加载过程------->load
                ctx = this.CurrentModel;
                if (json == null) {
                    return ctx;
                }

                this.loadModel(ctx, json);
                //初始化 CurrentModel
                this.initBindingInfo();
                //初始化绑定信息 CurrentBindingInfo
                this.initJControl();
                //初始化控件
                this.initController()
                this.dataBind(ctx, this.CurrentBindingInfo);
                //$alert(ctx.toJSON());
                return ctx;
            }
        };

        //-------------------------------------------------------- CRUD Load------------------------------------------------------- Begin
        //$面向开发人员  _$面向平台内部

        UM.prototype.initBindingInfo = function() {
            var curBindingInfo = this.CurrentBindingInfo;
            var curBindingInfo2 = this.CurrentBindingInfo2;
            $(document).find("[data-bindfield]").each(function() {
                var cid = $(this).attr("id");
                var bindfield = $(this).attr("data-bindfield");

                if (curBindingInfo2[bindfield] == null)
                    curBindingInfo2[bindfield] = [];
                curBindingInfo2[bindfield].push(cid);

                var bindfieldext = $(this).attr("data-bindfield-ext");
                //data-bindfield-ext="{{'background':'a.b.c.xxx'},{'width':'a.b.c.yyy'}}"
                if (cid) {
                    curBindingInfo[cid] = {};

                    var bd = {
                        "data-bindfield" : bindfield
                    };
                    if (bindfield.indexOf(".") < 0) {
                        bd["field"] = bindfield;
                    } else {
                        var paths = bindfield.split(".");
                        bd["field"] = paths[paths.length - 1];
                        bd["model"] = bindfield.substring(0, bindfield.lastIndexOf("."))
                    }

                    curBindingInfo[cid]["data-bindfield"] = bd;

                    curBindingInfo[cid]["data-bindfield-ext"] = $stringToJSON(bindfieldext);
                } else {
                    ////if(console != null)
                    //console.log("initBindingInfo...该控件没有指定id,该控件html为"+this.outerHTML);
                }
            });
        }

        UM.prototype.initJControl = function() {
            var curBindingInfo = this.CurrentBindingInfo;
            var elem;
            var category;
            for (var i in curBindingInfo) {
                if (curBindingInfo.hasOwnProperty(i)) {
                    elem = document.querySelector("#" + i);
                    category = (elem.getAttribute('data-um-jControl') || elem.nodeName).toLowerCase(); //控件类型
                    if(category == 'input' && (elem.type == 'radio' || elem.type == 'checkbox')){
                        category = elem.type;   //如果是元素是单选框或是复选框，那么category代表的就不是input了，而是input的type类型;
                    }
                    switch(category) {
                        case 'select':
                            this.jcontrols[i] = new UMP.Web.UI.Select(elem);
                            break;
                        case 'textarea':
                        case 'input':
                            this.jcontrols[i] = new UMP.Web.UI.Input(elem);
                            break;
                        case 'checkbox':
                            this.jcontrols[i] = new UMP.Web.UI.Checkbox(elem);
                            break;
                        case 'radioset':
                            this.jcontrols[i] = new UMP.Web.UI.RadioSet(elem);
                            break;
                        case 'label':
                        default:
                            this.jcontrols[i] = new UMP.Web.UI.Label(elem);
                    }
                }
            }

        }
        UM.prototype.initController = function() {
            debugger;
            this.CurrentController = new UMP.Web.Mvc.Controller(this.CurrentBindingInfo);
        }

        UM.prototype.unload = function(ctx) {//相当于数据卸载过程--------->unload
            return ctx.toJSON();
        }
        UM.prototype.loadCollection = function(ctxN, jsonArray) {
            if (!$isJSONArray(jsonArray)) {
                $alert("UM.loadCollection()中的jsonArray参数不是一个有效的JSONArray");
                return;
            }
            for (var i = 0, len = jsonArray.length; i < len; i++) {
                var ctx1 = new UMP.Web.Mvc.Model();
                this.loadModel(ctx1, jsonArray[i]);
                ctxN.add(ctx1);
            }
        }
        UM.prototype.loadModel = function(ctx, json) {
            if (!json)
                return;
            for (var key in json) {
                if ($isJSONObject(json[key])) {
                    var mid = "";
                    if (ctx.id() == null || ctx.id() == "") {
                        mid = key;
                    } else {
                        mid = ctx.id() + "." + key;
                    }

                    var ctx1 = new UMP.Web.Mvc.Model(mid);
                    this.loadModel(ctx1, json[key]);
                    ctx.add(key, ctx1);
                } else if ($isJSONArray(json[key])) {
                    var mid = "";
                    if (ctx.id() == null || ctx.id() == "") {
                        mid = key;
                    } else {
                        mid = ctx.id() + "." + key;
                    }
                    var ctxN = new UMP.Web.Mvc.Collection(mid);
                    this.loadCollection(ctxN, json[key]);
                    ctx.add(key, ctxN);
                } else {
                    ctx.add(key, json[key]);
                }
            }
        }
        UM.prototype.dataBind = function(ctx, bindingInfo) {//相当于数据加载过程------->load
            for (var cid in bindingInfo) {
                var dbinfo = bindingInfo[cid]["data-bindfield"]
                var field = dbinfo["data-bindfield"];
                var model = dbinfo["Model"];
                var field2 = dbinfo["Field"];
                var element = $("#" + cid);
                //jquery对象
                var elem = element[0];
                var id = elem.id;
                //dom对象
                var category = (elem.getAttribute('data-um-jControl') || elem.nodeName).toLowerCase();
                //控件类别;
                var val = '';
                var options;
                var radios;
                var initUI = function(){
                    switch(category) {
                        case 'input':
                        case 'textarea':
                            elem.value = val;
                            break;
                        case 'select':
                            ( options = element.find('option[value=' + val + ']')).length ? options[0].selected = true : alert('id为'+id+'select控件在初始绑定值时找不到value为' + val + '的option!');
                            break;
                        case 'checkbox':
                            elem.checked = val;
                            break;
                        case 'radioset':
                            ( radios = element.find('input[type=radio][value=' + val + ']')).length ?radios[0].checked = true : alert('id为'+id+'的RadioSet的控件在初始绑定值时找不到value为' + val + '的单选框!');
                            break;
                        case 'label':
                        default:
                            elem.innerHTML = val;
                    }
                };
                if (category == 'input' && (elem.type == 'radio' || elem.type == 'checkbox')) {
                    category = elem.type;
                    //如果是元素是单选框或是复选框，那么category代表的就不是input了，而是input的type类型;
                }

                if (field.indexOf(".") < 0) {
                    val = ctx.get(field);
                } else {
                    var paths = field.split(".");
                    var curM = ctx;
                    for (var i = 0, len = paths.length - 1; i < len; i++) {
                        curM = curM.get(paths[i]);
                    }
                    val = curM.get(paths[paths.length - 1]);
                }
                initUI();
            }
        }
        UM.prototype.dataCollect = function(ctx, json) {//相当于数据加载过程------->load
        }
        //-------------------------------------------------------- CRUD Load-------------------------------------------------------- End

        return new UM();
    })();
    window.UM = UM;

})(window);
//Public Global Variable
CurrentModel = function() {
}
//Public Global Method
$view = function(id) {
    return UM.jcontrols[id];
}
$model = function(fullName) {
    return UM.model(fullName);
}