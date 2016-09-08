//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// include : UMP.Web.EventMgr | UMP.Web.AttrEventMgr
// Author gct@yonyou.com
//-----------------------------------------------------------------------
UMP.Web.Mvc.Controller = function UMP$Web$Mvc$Controller(bindingInfo) {
    this._bindingInfo = bindingInfo;
    //1个控件有且仅有1个绑定字段
    //1个绑定字段可能对应N个控件

    //1、监听模型，修改控件
    this.regDataBind();

    //2、监听控件，修改模型
    this.regDataCollect();
}
//Public Method
function UMP$Web$Mvc$Controller$regDataBind() {
    //监听模型，修改控件
    for (cid in this._bindingInfo) {
        var bdInfo = this._bindingInfo[cid]["data-bindfield"];
        var bdextInfo = this._bindingInfo[cid]["data-bindfield-ext"];
        var path = bdInfo["data-bindfield"];
        var modelName = bdInfo["model"];
        var fieldName = bdInfo["field"];

        if ($model(modelName)) {
            $model(modelName).on("change", fieldName, function(sender, args) {
                //修改控件
                debugger;
                var cids = UM.CurrentBindingInfo2[args["data-bindfield"]];
                var val;
                var element;
                //jquery对象
                var elem;
                //dom对象
                var category;
                //控件类别
                var id;
                //控件id
                var options;
                var radios;
                for (var i = 0, len = cids.length; i < len; i++) {
                    val = args["value"];
                    element = $('#' + cids[i]);
                    elem = element[0];
                    id = elem.id;
                    category = (elem.getAttribute('data-um-jControl') || elem.nodeName).toLowerCase();
                    if (category == 'input' &&  elem.type == 'checkbox') {
                        category = elem.type;
                        //如果是元素是单选框或是复选框，那么category代表的就不是input了，而是input的type类型;
                    }
                    switch(category) {
                        case 'input':
                        case 'textarea':
                            elem.value = val;
                            element.trigger('change',{'modelchange':true});
                            break;
                        case 'select':
                            ( options = element.find('option[value=' + val + ']')).length ? (options[0].selected = true && element.trigger('change',{'modelchange':true})) : alert('id为'+ id+'的Select控件在更改绑定值时找不到value为' + val + '的option!');
                            element.trigger('change',{'modelchange':true});
                            break;
                        case 'checkbox':
                            elem.checked = val;
                            element.trigger('change',{'modelchange':true});
                            break;
                        case 'radioset':
                            ( radios = element.find('input[type=radio][value=' + val + ']')).length ? (radios[0].checked = true && $(radios[0]).trigger('change',{'modelchange':true})) : alert('id为'+ id+'的RadioSet控件在更改绑定值时找不到value为' + val + '的单选框!');

                            break;
                        case 'label':
                        default:
                            element.html(val);
                            element.trigger('change',{'modelchange':true});
                    }

                }
                /*var val;
                 var element;
                 for(var i = 0, len = cids.length; i < len; i++){
                 val = args["value"];
                 element = $('#'+cids[i]);
                 if(element[0].nodeName == 'LABEL'){
                 element.text(val);
                 } else {
                 element.val(val);
                 }
                 //$("#"+cids[i]).val(val);
                 //$("#"+cids[i]).val(val) || $("#" + cids[i]).text(val);
                 }*/
            });
        }

    }
    /*
     $model("loginModel").on("user", function(){
     var fdVal = $model("loginModel").get("user");
     var ids = $findViewId("loginModel","user");
     for(var i=0,len=ids.length;i<len;i++){
     var id = ids[i];
     var view = $view(id);
     if(view){
     view.set("value", fdVal);
     }else{
     alert("找到id为"+id+"的控件")
     }
     }

     });
     */
}

function UMP$Web$Mvc$Controller$regDataCollect() {
    //监听控件，修改模型
    for (var cid in this._bindingInfo) {
        var bdInfo = this._bindingInfo[cid]["data-bindfield"];
        var bdextInfo = this._bindingInfo[cid]["data-bindfield-ext"];
        var paths = bdInfo["data-bindfield"];
        var modelName = bdInfo["model"];
        var fieldName = bdInfo["field"];
        var element;
        var elem;
        if ($view(cid)) {
            $('#' + cid).on("change", function(data) {
                debugger;
                var elem = this;
                var element = $(this);
                //jquery对象
                var radioName;
                var id = elem.id;
                var cid = element.attr("id");
                var category = (elem.getAttribute('data-um-jControl') || elem.nodeName).toLowerCase();
                var val = '';
                var bdInfo = UM.CurrentBindingInfo[cid]["data-bindfield"];
                var bdextInfo = UM.CurrentBindingInfo[cid]["data-bindfield-ext"];
                var paths = bdInfo["data-bindfield"];
                var modelName = bdInfo["model"];
                var fieldName = bdInfo["field"];
                if(category == 'input' && (elem.type == 'checkbox')){
                    category = elem.type;   //如果是元素是复选框，那么category代表的就不是input了，而是input的type类型;
                }
                switch(category) {
                    case 'input':
                    case 'textarea':
                    case 'select':
                        val = elem.value;
                        break;
                    case 'checkbox':
                        val = elem.checked;
                        break;
                    case 'radioset':
                        radioName = $view(id).get_name();
                        val = element.find('input:radio[name='+ radioName+ ']:checked').val();
                        break;
                    case 'label':
                    default:
                        val = elem.textContent;
                }
                $model(modelName).set(fieldName, val,false);
            });
        }

    }

}

function UMP$Web$Mvc$Controller$databind1() {
    var paths = this._bindingInfo.bindfield.splite(".");
    var val = "";
    if (paths.lenght == 1) {
        val = $uw.cm.model()[this._bindingInfo.bindfield];
    } else {
        curValue = $uw.model();
        for (var i = 0, len = paths.length; i < len; i++) {
            curValue = curValue[paths[i]];
            if (curValue == undefined) {
                alert("不存在字段" + paths[i]);
            }
        }
        val = curValue;
    }

    $("#" + this._bindingInfo.id)
    if ($("#"+this._bindingInfo.id)[0].tagName.toLowerCase() == "input")
        $("#" + this._bindingInfo.id).val(val);
    else
        $("#" + this._bindingInfo.id).html(val);
}

function UMP$Web$Mvc$Controller$findViewId(model, field) {
    var ids = [];
    if (this._bindingInfo) {
        for (id in this._bindingInfo) {
            var info = this._bindingInfo[id]
            if (info["Model"] == model && info["Field"] == field) {
                ids.push(info);
            }
        }
    }
    return ids;
}

function UMP$Web$Mvc$Controller$findFieldName(id) {
    var info = this._bindingInfo["id"];
    if (info) {
        return info;
    } else {
        alert("未找到id为" + id + "控件的绑定信息");
    }

}

UMP.Web.Mvc.Controller.prototype = {
    regDataBind : UMP$Web$Mvc$Controller$regDataBind,
    regDataCollect : UMP$Web$Mvc$Controller$regDataCollect,
    //databind : UMP$Web$Mvc$Controller$databind,
    findViewId : UMP$Web$Mvc$Controller$findViewId,
    findFieldName : UMP$Web$Mvc$Controller$findFieldName

};
UMP.Web.Mvc.Controller.registerClass('UMP.Web.Mvc.Controller');