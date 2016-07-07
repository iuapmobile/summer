var customer;

 
function transfer(value) {
	//alert(value);
	customer = value;
	//alert(customer.name);
}


 
function save() {
	debugger;
	customer.name=customer.name + "[saved]";
	alert("save success");
	return customer;
}


 
function load() {
	debugger;
	var customer = {"name":"xyy","position":"programmer"};
	return customer;
}

function test(a) {
	return "test"+a;
}


