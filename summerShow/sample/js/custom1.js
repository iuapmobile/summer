$isWeb = true
$(function() {
    $pageReady();
});

function $pageReady() {
    var __company = {
        id : "600588",
        drug:'深海鱼肝油',
        drug_ingre: '鱼油是指富含EPA（二十碳五稀酸）、DHA（二十二碳六稀酸）的鱼体内的油脂。 普通鱼体内含EPA、DHA数量极微，只有寒冷地区深海里的鱼，如三文鱼、沙丁鱼等体内EPA、DHA含量极高，而且陆地其他动物体内几乎不含EPA、DHA。因此选用深海鱼来提练EPA及DHA。',
        drug_func: '鱼油对于威胁人类健康与寿命的多种疾病如肿瘤、心脑血管疾病以及免疫功能失调所引起的一些疾病有着明显的防治作用，因此鱼油可以延长人的寿命。',
        drug_store:'千金大药店',
        order_status:'订单支付',
        order_info:{
            price:'￥20',
            number:1,
            date:'2015-05-21',
            paymethod:'货到付款',
            payoptions:{
                anon:true,
                others:false,
                times:false
            }
        },
        orders:[
            {name:'zzz',age:22},
            {name:'zzy',age:24},
            {name:'zzk',age:23}
        ]

    };
    UM.load(__company);
    $('#option1').click(function(){
        $alert(UM.CurrentModel.toJSON());
    });
    $('#option2').click(function(){
        $alert(UM.CurrentModel.toJSON());
        $view('drug_store').set_value('九芝堂');
        $view('date').set_value('2014-01-20');
        $view('paymethod').set_value('在线支付');
        $view('payOthers').set_value(true);
        $alert(UM.CurrentModel.toJSON());
    });

    $('#option3').click(function(){
        $alert(UM.CurrentModel.toJSON());
        $model().set("drug_store", "同仁堂");
        $model().set("drug", "深海预感");
        $model('order_info').set('number',2);
        $model('order_info').set('date','2018-03-21');
        $model('order_info').set('paymethod','货到付款');
        $model('order_info.payoptions').set('others',false);
        $alert(UM.CurrentModel.toJSON());
    });


}
