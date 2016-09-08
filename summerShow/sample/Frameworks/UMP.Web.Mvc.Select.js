//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// include : UMP.Web.EventMgr | UMP.Web.AttrEventMgr
// Author gct@yonyou.com
//-----------------------------------------------------------------------

UMP.Web.UI.Select = function UMP$Web$UI$Select(element) {
    UMP.Web.UI.Select.initializeBase(this, [element]);
    var $elem = $(element);
    this.options = $elem.find('option');
    this.datasource = eval($elem.attr('data-um-source')) || [];
    //this.datasource = [{value:'北京市东城区东长安街XX号',text:'北京市东城区东长安街XX号'},{value:'北京市海淀区XX街XX院XX号',text:'北京市海淀区XX街XX院XX号'}];
    this.initialize();
}
function UMP$Web$UI$Select$initialize() {
    //UMP.Web.UI.Select.callBaseMethod(this, 'initialize');
    if(this.datasource.length && this.options){
        this.render_options();
    }

}

function UMP$Web$UI$Select$set_datasource(jsonArray){
    if($isJSONArray(jsonArray)){
        this.datasource = jsonArray;
        this.render_options();
    } else {
        return false;
    }

}

function UMP$Web$UI$Select$renderOptions(){
    var datasource = this.datasource;
    if($isJSONArray(datasource) && datasource.length){
        this.options.each(function(){
           var $this = $(this);
           var index = $this.index();
           var jsonItem = datasource[index] || {};
           jsonItem.value? (this.value = jsonItem['value']) : '';
           jsonItem.text? (this.textContent = jsonItem['text']): '';
        });
    } else {
        return false;
    }
}



function UMP$Web$UI$Select$set_value(val) {
    var oldValue = this.get_value();
    var changed_option;
    var len;
    if (val != oldValue) {
        changed_option = $(this._element).find('option[value=' + val + ']');
        len = changed_option.length;
        if (!len) {
            alert('此控件的OPTION元素不存在此value值!请重新设置');
            return;
        }
        changed_option[0].setAttribute('selected', true);
        this.set("value", val);
        var args = {
            "oldValue" : oldValue,
            "value" : val
        }
        $(this._element).trigger("change", args);
        //this.firechangeEvent(args);//触发DOM上的onchange
    }
}

function UMP$Web$UI$Select$get_value() {
    return this.get("value");
}

UMP.Web.UI.Select.prototype = {
    initialize : UMP$Web$UI$Select$initialize,
    set_datasource: UMP$Web$UI$Select$set_datasource,
    render_options: UMP$Web$UI$Select$renderOptions,
    get_value : UMP$Web$UI$Select$get_value,
    set_value : UMP$Web$UI$Select$set_value
}
UMP.Web.UI.Select.registerClass('UMP.Web.UI.Select', UMP.Web.Mvc.JControl);