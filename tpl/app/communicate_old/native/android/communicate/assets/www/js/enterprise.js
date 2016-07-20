/*req.allCompany = {
    url: "http://opentest.yonyoutelecom.cn/mobile/getAllCompany.do",
    params: {
        account: userInfo.account,
        start: 0,
        size: 35,
        sortBy: "id",
        sortOrder: "desc",
        q: "",
        _: "9"
    }
};
req.doAudit = {
    url: "http://opentest.yonyoutelecom.cn/mobile/doAudit.do",
    params: {
        account: userInfo.account,
        id: "",
        status: "",
        auditMsg: ""
    }
}*/
var data = {
    "flag": "000000",
    "data": {
        "totalItemNum": 1,
        "items": [
            {
                "gift": 75,
                "createtime": "2015-05-20 15:19:49",
                "amount": 0,
                "organizationcode": "",
                "carriername": "北-京-创-业-公-司 222333",
                "companytel": "",
                "auditor": "",
                "isvname": "畅捷通信息技术股份有限公司",
                "applicationname": "工作圈",
                "id": 3134,
                "state": "1",
                "auditingstatus": "1",
                "contacts": "张天霸",
                "email": "housj@chanjet.com",
                "remarks": "待审核"
            },
            {
                "gift": 75,
                "createtime": "2015-06-20 15:19:49",
                "amount": 0,
                "organizationcode": "",
                "carriername": "北-京-微-软 666888",
                "companytel": "",
                "auditor": "",
                "isvname": "微软中国",
                "applicationname": "win10",
                "id": 3334,
                "state": "2",
                "auditingstatus": "2",
                "contacts": "侯少 静",
                "email": "housj@chanjet.com",
                "remarks": "审核不通过"
            },
            {
                "gift": 75,
                "createtime": "2015-05-25 15:19:49",
                "amount": 0,
                "organizationcode": "",
                "carriername": "腾-讯 223388",
                "companytel": "",
                "auditor": "",
                "isvname": "腾讯科技",
                "applicationname": "微信",
                "id": 3434,
                "state": "1",
                "auditingstatus": "1",
                "contacts": "侯少 静",
                "email": "housj@chanjet.com",
                "remarks": "待审核"
            },
            {
                "gift": 75,
                "createtime": "2015-06-25 15:19:49",
                "amount": 0,
                "organizationcode": "",
                "carriername": "百-度 112233",
                "companytel": "",
                "auditor": "",
                "isvname": "百度科技",
                "applicationname": "百度地图",
                "id": 3534,
                "state": "3",
                "auditingstatus": "3",
                "contacts": "侯少 静",
                "email": "housj@chanjet.com",
                "remarks": "已审核"
            },
            {
                "gift": 99,
                "createtime": "2015-09-25 15:19:49",
                "amount": 0,
                "organizationcode": "",
                "carriername": "百-度 112233",
                "companytel": "",
                "auditor": "",
                "isvname": "百度科技",
                "applicationname": "百度钱包",
                "id": 3534,
                "state": "1",
                "auditingstatus": "1",
                "contacts": "侯少静",
                "email": "housj@chanjet.com",
                "remarks": "待审核"
            }
        ]
    },
    "desc": "success"
};
function init_callback() {

    //var data = $ctx.param("result");
    data = $stringToJSON(data);
    allJson = data.data["items"];
    console.log(allJson);
    render("allCompany", allJson);
}
var id = setTimeout(init_listener, 300);

function init_listener() {
    var pnode = $("#allCompany"),
        li = pnode.find("li"),
        count = 0;
    if (li.length === 0) {
        clearTimeout(id);
        id = setTimeout(init_listener, 300);
        return;
    }
    // 每个li元素下的checkbox监听
    pnode.on("change", "input[type=checkbox]", function (e) {
        if (this.checked) {
            count++;
        } else {
            count--;
        }
        $(".collect .um-orange").html(count);
    })
    // ISV详情
    pnode.on("click", "a", function (e) {
        var index = $(this).closest("li").index();
        render("isvDetail", allJson[index]);
    })
    // 全选按钮
    $(".collect").find("input[type=checkbox]").on("change", function () {
        if (this.checked) {
            pnode.find("input[type=checkbox]").prop("checked", true);
            count = pnode.find("li").length;
            $(".collect .um-orange").html(count);
        } else {
            count=0;
            pnode.find("input[type=checkbox]").prop("checked", false);
            $(".collect .um-orange").html(0);
        }
    })
}

function doAudit_callback() {
    //$alert($ctx.getString());
    var result = $ctx.param("result");
    result = $stringToJSON(result);
    if (result.desc === "success") {
        $alert("审核成功");
    } else {
        $alert("审核失败");
    }
}

// allJson 存储初始化大块数据
var allJson = allJson || {};
// 所有数据id集合
var ids = [];

$(function () {
    $("#status").find(".agree-btn").on("click", function () {
        $("#astatus").find(".choice").html($("#status").find("input:radio:checked").next().next().html());
    })

    // 过滤字段的拼接
   /* $("#filter").find(".agree-btn").on("click", function () {
        var str = filterStr();
        $alert(filterStr());
        req.allCompany.params.q = str;
        requestData(req.allCompany.url, req.allCompany.params, "init_callback()");
    })*/
    // 处理被选择数据的ID成字符串
    function dealIds() {
        var li = $("#allCompany").find("li");
        if (li.length === 0) {
            $alert("请等待数据解析完全");
            return;
        }
        var ids = [];
        $.each(li, function () {
            var id = $(this).find("input:checkbox:checked").siblings(".none").html();
            id && ids.push(id);
        })
        //req.doAudit.params.id = ids.toString();
        return ids;
    }

    // 调用同意审批和拒绝审批
    var $main_footer = $("#main .um-footer");
    $main_footer.find(".refuse-btn").on("click", function () {
        var ids = dealIds();
        var items = data.data.items;
        for (var i = 0; i < items.length; i++) {
            var id = items[i].id.toString();
            var index = i;
            if (ids.indexOf(id) != -1) {
                console.log(index);
                items[index].state = '2';
                items[index].auditingstatus = '2';
                items[index].remarks = '审核不通过';
            }
        }
        $(".collect").find("input[type=checkbox]").prop('checked', false);
        count = 0;
        $(".collect .um-orange").html(0);
        init_callback();
        /*req.doAudit.params.status = 2;
         requestData(req.doAudit.url, req.doAudit.params, "doAudit_callback()")*/

    })

    $main_footer.find(".agree-btn").on("click", function () {

        var ids = dealIds();
        var items = data.data.items;
        for (var i = 0; i < items.length; i++) {
            var id = items[i].id.toString();
            var index = i;
            if (ids.indexOf(id) != -1) {
                console.log(index);
                items[index].state = '3';
                items[index].auditingstatus = '3';
                items[index].remarks = '已审核';
            }
        }
        $(".collect").find("input[type=checkbox]").prop('checked', false);
        count = 0;
        $(".collect .um-orange").html(0);
        init_callback();
    })
/*应用详情的同意与拒绝按钮*/
    $("#isvDetail").find(".refuse-btn").on("click", function () {
        var currentId = $('#isvDetail').find('.none').html();
        var items = data.data.items;
        for (var j = 0; j < items.length; j++) {
            var id = items[j].id.toString();
            var index = j;
            if (id == currentId) {
                items[index].state = '2';
                items[index].auditingstatus = '2';
                items[index].remarks = '审核未通过';
                break;
            }
        }
        $('#isvDetail').removeClass('active');
        $('#main').addClass('active');
        init_callback();
    });
    $("#isvDetail").find(".agree-btn").on("click", function () {
        var currentId = $('#isvDetail').find('.none').html();
        var items = data.data.items;
        for (var j = 0; j < items.length; j++) {
            var id = items[j].id.toString();
            var index = j;
            if (id == currentId) {
                items[index].state = '3';
                items[index].auditingstatus = '3';
                items[index].remarks = '已审核';
                break;
            }
        }
        $('#isvDetail').removeClass('active');
        $('#main').addClass('active');
        init_callback();
    })
/*筛选界面的确认删选条件*/
    $('#filter').find('.agree-btn').on('click', function () {
       var $startTime=$('#filter').find('.form-control').eq(0).val();

       var  $endTime=$('#filter').find('.form-control').eq(0).val();
        var $status=$('#astatus').find('.choice').html();
        switch ($status){
            case '待审核':
                $status=1;
                break;
            case '已认证' :
                $status=3;
                break;
            case '审核未通过':
                $status=2;
                break;
            default :
                $status=4;//全部时状态为4
        }
        var $isv=$('#isv').find('.choice').html();
        var $appname=$('#appname').find('.choice').html();
        var filterItems=data.data.items;
        var statusItems=[];
        var isvItems=[];
        var appnameItems=[];
        /*状态过滤*/
        if($status==4){
            statusItems=filterItems;
        }else {
            for(var k=0;k<filterItems.length;k++){
                var item=filterItems[k];
                var status=item.state;
                var index=k;
                if(status==$status){
                    statusItems.push(filterItems[index]);
                }
            }
        }
        /*ISV过滤*/
        if($isv=='全部'){
            isvItems=statusItems
        }else {
            for(var k=0;k<statusItems.length;k++){
                var item=statusItems[k];
                var isv=item.isvname;
                var index=k;

                if(isv==$isv){
                    isvItems.push(statusItems[index]);
                }
            }
        }
        /*appname 过滤*/
        if($appname=='全部'){
            appnameItems=isvItems
        }else {
            for(var k=0;k<isvItems.length;k++){
                var item=isvItems[k];
                var appname=item.applicationname;
                var index=k;
                if(appname==$appname){
                    appnameItems.push(isvItems[index]);
                }
            }
        }
        /*company过滤*/
       /* if($company=='全部'){
            companyItems=appnameItems
        }else {
            for(var k=0;k<appnameItems.length;k++){
                var item=appnameItems[k];
                var appname=item.applicationname;
                var company=item.
                var index=k;
                if($company==$appname){
                    companyItems.push(appnameItems[index]);
                }
            }
        }*/
        /*时间过滤*/
        var timeItems=[];
        if($startTime==''&& $endTime==''){
            timeItems=appnameItems
        }else if($startTime==''&& $endTime){

            for(var k=0;k<appnameItems.length;k++){

                var item=appnameItems[k];
                var createTime=new Date(item.createtime).getTime();
                if(createTime<$endTime){
                    timeItems.push(appnameItems[index]);
                }
            }
        }else if($startTime&& $endTime==''){

            for(var k=0;k<appnameItems.length;k++){
                var item=appnameItems[k];
                var createTime=new Date(item.createtime).getTime();
                if(createTime>$startTime){
                    timeItems.push(appnameItems[index]);
                }
            }
        }else {
            $endTime=new Date($endTime).getTime();
            $startTime=new Date($startTime).getTime();
            for(var k=0;k<appnameItems.length;k++){
                var item=appnameItems[k];
                var createTime=new Date(item.createtime).getTime();
                if(createTime>$startTime && createTime<$endTime){
                    timeItems.push(appnameItems[index]);
                }
            }
        }
        data.data.items=timeItems;
        init_callback();
        data.data.items=filterItems;
    });
    /*单一过滤条件筛选*/
    function filter(arry,state,newArry,$state){
        for(var k=0;k<arry.length;k++){
            var item=arry[k];
            var state=item.state;

            var index=k;

            if(state==$state){
                newArry.push(arry[index]);
            }
        }
        return newArry;
    }
    function init() {
        var str = "",
            dataInput = $(".make").find("input[type=date]");
        start = new Date().format("yyyy-MM-dd hh:mm:ss"),
            end = new Date(new Date() - 24 * 60 * 60 * 1000).format("yyyy-MM-dd hh:mm:ss");

        dataInput.eq(0).val(new Date().toLocaleString());
        dataInput.eq(1).val(new Date(new Date() - 24 * 60 * 60 * 1000).toLocaleString());

      /*  str += "c.create_time>='" + start + ";";
        str += "'c.create_time<='" + end + "';";
        req.allCompany.params.q = str;*/
        init_callback()
        //requestData(req.allCompany.url, req.allCompany.params, "init_callback()");
    }

    init();
})

function $pageReady() {
}