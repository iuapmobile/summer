//JavaScript Framework 2.0 Code
Type.registerNamespace('ss.st.productDetailControllerBase');
ss.st.productDetailControllerBase = function() {
    //Step 1：inherit the base class
    var args = {
        "context" : "",
        "controller" : "productDetailController",
        "namespace" : "ss.st"
    };
    ss.st.productDetailControllerBase.initializeBase(this,[args]);
}
ss.st.productDetailControllerBase.prototype = {
};
ss.st.productDetailControllerBase.registerClass('ss.st.productDetailControllerBase',UMP.UI.Mvc.ControllerBase);
