




//////////////////////////////////////////////////////////////////
// 在函数环境中执行js代码
function $UMP$eval(code) {
    if (!code) {
        return;
    }
    var srcCode = "(function() {\n" + code + "}) ();";
    eval(code);
}


