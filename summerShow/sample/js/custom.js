$isWeb = true
$(function() {
	$pageReady();
});

function $pageReady() {
	var __user = {
		name:'uap',
        pass: '123',
        anonAccess:false,
        info:{
            tel:'130********',
            postcode:'411400',
            date:'2014-01-14',
            address:'北京市海淀区XX街XX院XX号',
            delivery:'顺丰快递',
            payAnon:false, //匿名支付
            payOthers:true, //他人代付
            payStages:true, //分期支付
            state:'请尽快送达'

        }
	};
	UM.load(__user);


	$('#submit').click(function(){
		console.log(UM.CurrentModel.toJSON());
	});
	/*$('#option2').click(function(){
		console.log(UM.CurrentModel.toJSON());
		$view('drug_store').set_value('同仁大药');
		$view('date').set_value('2014-01-20');
		$view('paymethod').set_value('在线支付');
		$view('payOthers').set_value(true);
		console.log(UM.CurrentModel.toJSON());
	});
	$('#payOthers').on('change',function(){
        console.log('good');
    })
	$('#option3').click(function(){
		console.log(UM.CurrentModel.toJSON());
		$model().set("drug_store", "同仁大药");
		$model().set("drug", "深海鱼肝");
		$model('order_info').set('number',2);
		$model('order_info').set('date','2014-01-20');
		$model('order_info').set('paymethod','在线支付');
		$model('order_info.payoptions').set('others',true);
		console.log(UM.CurrentModel.toJSON());
	});*/


}
