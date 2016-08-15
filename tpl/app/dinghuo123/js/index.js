var list = [
	{
		content: "img/img1.jpg"
	}, 
	{
		content: "img/img2.jpg"
	}, 
	{
		content: "img/img3.jpg"
	},
	{
		content: "img/img4.jpg"
	}
];
var islider = new iSlider({
	type: 'pic',
	data: list,
	dom: document.getElementById("iSlider-wrapper"),
	isLooping: true,
	animateType: 'default',
	isAutoplay: true,
	animateTime: 800
});
islider.addDot();

var jsonArray ={
	 a:[
	    {         
	    	"img": "img/news1.png",   
	        "detail": "莎拉公主 奥地利水晶项链 天使类水晶项链",
	        "format": "6个规格",
	        "price": 20.24
	    }, {
	        "img": "img/news2.png",
	        "detail": "仙恩红茶 金骏眉茶叶 中国味礼盒",
	        "format": "2个规格",
	        "price": 82.63
	    },{
	    	"img": "img/news3.png",
	        "detail": "忆江南龙井茶",
	        "format": "2个规格",
	        "price": 140.01
	    },{
	        "img": "img/news4.png",
	       "detail": "大益普知味(3年陈)普洱茶饼(熟茶)",
	        "format": "2个规格",
	        "price": 59.55
	    }
	],
	 b:[
	    {         
	    	"img": "img/news5.png",   
	        "detail": "海飞丝去屑洗发露丝质柔滑型",
	        "format": "6个规格",
	        "price": 20.24
	    }, {
	        "img": "img/news6.png",
	        "detail": "美的（Midea） EM7KCGW3-NR 微波炉 微电脑 平板 薄膜按键",
	        "format": "2个规格",
	        "price": 82.63
	    },{
	    	"img": "img/news7.png",
	        "detail": "烫底料冒菜调料底料",
	        "format": "2个规格",
	        "price": 140.01
	    },{
	        "img": "img/news8.png",
	       "detail": "第九极 2014专柜品质 新款夏装 男士衬衫 男短袖衬衫休闲衬衣",
	        "format": "2个规格",
	        "price": 59.55
	    },{
	    	"img": "img/news3.png",
	        "detail": "烫底料冒菜调料底料",
	        "format": "2个规格",
	        "price": 140.01
	    },{
	        "img": "img/news4.png",
	       "detail": "第九极 2014专柜品质 新款夏装 男士衬衫 男短袖衬衫休闲衬衣",
	        "format": "2个规格",
	        "price": 59.55
	    }
	],
	 c:[
	    {
	        "img": "img/news6.png",
	        "detail": "美的（Midea） EM7KCGW3-NR 微波炉 微电脑 平板 薄膜按键",
	        "format": "2个规格",
	        "price": 82.63
	    },{
	    	"img": "img/news7.png",
	        "detail": "烫底料冒菜调料底料",
	        "format": "2个规格",
	        "price": 140.01
	    },{
	        "img": "img/news8.png",
	       "detail": "第九极 2014专柜品质 新款夏装 男士衬衫 男短袖衬衫休闲衬衣",
	        "format": "2个规格",
	        "price": 59.55
	    },{
	    	"img": "img/news3.png",
	        "detail": "烫底料冒菜调料底料",
	        "format": "2个规格",
	        "price": 140.01
	    },{
	        "img": "img/news4.png",
	       "detail": "第九极 2014专柜品质 新款夏装 男士衬衫 男短袖衬衫休闲衬衣",
	        "format": "2个规格",
	        "price": 59.55
	    }
	],
	 d:[
		{
	    	"img": "img/news3.png",
	        "detail": "忆江南龙井茶",
	        "format": "2个规格",
	        "price": 140.01
	    },{
	        "img": "img/news4.png",
	       "detail": "大益普知味(3年陈)普洱茶饼(熟茶)",
	        "format": "2个规格",
	        "price": 59.55
	    }
	],
	e:[
		{
	    	"number": "DH-O-20160715-001718",
	    	"state":"已完成",
	        "num": "数量：1",
	        "time": "时间：2016-07-21 10:45:37",
	        "price": "金额：138.60（未付款）"
	    },{
	    	"number": "DH-O-20160715-001718",
	    	"state":"代发货确定",
	        "num": "数量：3",
	        "time": "时间：2016-07-21 10:45:37",
	        "price": "金额：138.60（未付款）"
	    },{
	    	"number": "DH-O-20160715-001718",
	    	"state":"带订单审核",
	        "num": "数量：5",
	        "time": "时间：2016-07-21 10:45:37",
	        "price": "金额：138.60（未付款）"
	    },{
	    	"number": "DH-O-20160715-001718",
	    	"state":"待定单审核",
	        "num": "数量：6",
	        "time": "时间：2016-07-21 10:45:37",
	        "price": "金额：138.60（未付款）"
	    },{
	    	"number": "DH-O-20160715-001718",
	    	"state":"已完成",
	        "num": "数量：1",
	        "time": "时间：2016-07-21 10:45:37",
	        "price": "金额：138.60（未付款）"
	    },{
	    	"number": "DH-O-20160715-001718",
	    	"state":"代发货确定",
	        "num": "数量：3",
	        "time": "时间：2016-07-21 10:45:37",
	        "price": "金额：138.60（未付款）"
	    }
	],
	f:[
		{
	    	"img": "img/icon5.png",
	    	"state":"业务消息",
	        "con": "暂无内容",
	    },{
	    	"img": "img/icon6.png",
	    	"state":"系统公告",
	        "con": "暂无内容",
	    },{
	    	"img": "img/icon7.png",
	    	"state":"最新通知",
	        "con": "关于微信订货端正式上线通知",
	    },{
	    	"img": "img/icon8.png",
	    	"state":"政策发文",
	        "con": "关于交易手续费优惠政策的通知",
	    },{
	    	"img": "img/icon9.png",
	    	"state":"营销物料",
	        "con": "新品上市易拉宝营销物料",
	    },{
	    	"img": "img/icon10.png",
	    	"state":"公司制度",
	        "con": "员工请假制度通知",
	    },
	]
}

var arrText = doT.template($("#list").text());
$("#um-list").html(arrText(jsonArray.a));		
$("#um-list1").html(arrText(jsonArray.b));
var arrText2 = doT.template($("#list2").text());	
$("#um-list2").html(arrText2(jsonArray.e));
var arrText3 = doT.template($("#list3").text());	
$("#um-list3").html(arrText3(jsonArray.f));

$('.um-tabbar li').click(function(){
	switch($(this).index())
	{
		case 0:
		  $("#um-list1").html(arrText(jsonArray.b));
		  break;
		case 1:
		  $("#um-list1").html(arrText(jsonArray.d));
		  break;
	    case 2:
		  $("#um-list1").html(arrText(jsonArray.c));
		  break;
		case 3:
		  $("#um-list1").html(arrText(jsonArray.a));
		  break;
		default:alert('你好');
	}
})


function topage(id) {
	UM.page.changePage({target:id})
}
