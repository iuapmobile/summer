// Initialize your app
var myApp = new Framework7({
	animateNavBackIcon: true
});

// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
	// Enable dynamic Navbar
	dynamicNavbar: true,
	// Enable Dom Cache so we can use all inline pages
	domCache: true
});
var photoBrowserPhotos = [{
	url: 'img/p1.jpg',
	caption: 'Amazing beach in Goa, India'
}, 'img/p2.jpg', 'img/p3.jpg', {
	url: 'img/p4.jpg',
	caption: 'I met this monkey in Chinese mountains'
}, {
	url: 'img/p5.jpg',
	caption: 'Beautiful mountains in Zhangjiajie, China'
}];
var photoBrowserStandalone = myApp.photoBrowser({
	photos: photoBrowserPhotos
});
myApp.onPageInit('services', function(page) {
	$$('.ks-pb-standalone').on('click', function() {
		photoBrowserStandalone.open();
	});
});
var formMsg;
if(formMsg = localStorage["formMsg"]) {
		formMsg = JSON.parse(formMsg);
	}else {
		formMsg = {
			nickname:"fire12344",
			email:"3411994@qq.com",
			blog:"www.hul.github.com/frw",
			psw:"ererefda",
			tel:"13911043888",
			birthday:"1991/4/21",
			age:"21",
			gender:"男",
			like:"篮球"
		}
	}
var init = function() {
	$$("#save").hide();
	
	$$("#formMsg").find("input").each(function(){
		var name = $$(this).attr("name"),
		formValue = formMsg[name];
		if(name && formValue) {
			$$(this).val(formValue);
		} 
	})

	$$("#gender").html(formMsg["gender"]);
	$$("#like").html(formMsg["like"]);
	readonly();
}
init();
$$("#logout").on("click", function(){
	myApp.confirm('您确定要退出 ?',function() {
		myApp.alert("退出成功");
		setTimeout(function(){
			window.location.href="about:blank";
		},800);
	});
})
function readonly() {
	$$("#formMsg").find("input").each(function(){
  		$$(this).attr("disabled","disabled");
	})
}
function removeReadonly() {
	$$("#formMsg").find("input").each(function(){
  		$$(this).removeAttr("disabled");
	})
}
$$("#edit").on("click",function(){
	removeReadonly();
	$$(this).hide();
	$$("#save").show();
})
$$("#genderChoice").find("input").on("change",function(){
	if(this.checked) {
		$$("#gender").html(this.value);
	}
})
$$("#likeChoice").on("change",function(){
	var arr =[];
	$$(this).find("input[type=checkbox]").each(function(){
		if(this.checked)
		arr.push(this.value);
	})
	
	$$("#like").html(arr);
})

$$("#save").on("click",function(){
	$$(this).hide();
	$$("#edit").show();
	var data = {

	};
	$$("#formMsg").find("input").each(function(){
		var name = $$(this).attr("name"),
		formValue = formMsg[name];
		if(name && formValue) {
			data[name] = $$(this).val();
		} 
	})
	data["gender"] = $$("#gender").html();
	data["like"] = $$("#like").html();
	localStorage["formMsg"] = JSON.stringify(data);
	readonly();
})
