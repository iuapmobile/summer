
$context = null;
/*
<contexts>
  <context id="order" from-type="mbe" filter="" iscascade="false">
    <field id="a" type="string"/>
    <field id="b" type="string"/>
    <field id="c" type="string"/>
    <fieldset id="lines" from="orderline" type="string" relation="n" parent-field="" child-field="" from-type="mbe" iscascade="false">
      <field id="la" type="string"/>
      <field id="lb" type="string"/>
      <field id="lc" type="string"/>
    </fieldset>
  </context>
</contexts>
*/
//1、每一个Context有tag attributes fields组成
//1、每一个Field有tag attributes组成
$$$orderUNode= {
	tag:"context",
	namespace:"com.yonyou.um",
	attributes:{id:"order", from_type:"mbe", filter:"", iscascade:"false"},
	fields:{
		a:{tag:"field", attributes:{id:"a", type:"string"}},
		b:{tag:"field", attributes:{id:"b", type:"string"}},
		c:{tag:"field", attributes:{id:"c", type:"string"}},
		lines:{
			tag:"fieldset",
			attributes:{id:"lines", from:"soline", type:"string", relation:"n", parent_field:"", child_field:"", from_type:"mbe", iscascade:"false"},
			fields:{
				la:{tag:"field", attributes:{id:"la", type:"string"}},
				lb:{tag:"field", attributes:{id:"lb", type:"string"}},
				lc:{tag:"field", attributes:{id:"lc", type:"string"}},
				detail:{
					tag:"fieldset",
					attributes:{id:"detail", from:"linedetail", type:"string", relation:"n", parent_field:"", child_field:"", from_type:"mbe", iscascade:"false"},
					fields:{
						da:{tag:"field", attributes:{id:"da", type:"string"}},
						db:{tag:"field", attributes:{id:"db", type:"string"}},
						dc:{tag:"field", attributes:{id:"dc", type:"string"}}
					}			
				}
			}
		},
		cust:{
			tag:"fieldset",
			attributes:{id:"cust", from:"customer", type:"string", relation:"1", parent_field:"", child_field:"", from_type:"mbe", iscascade:"false"},
			fields:{
				ca:{tag:"field", attributes:{id:"ca", type:"string"}},
				cb:{tag:"field", attributes:{id:"cb", type:"string"}},
				cc:{tag:"field", attributes:{id:"cc", type:"string"}}
			}
		}	
	}
};


$um$createContextDefine = function(id, metaData){
	var entity = new UMP.UI.Mvc.Entity("context");
	
	for(var key in metaData.attributes){
		entity.attr(key,metaData.attributes[key]);
	}

	for(var key in metaData.fields){
		var tag = metaData.fields[key].tag;
		if(tag=="field"){
			var prop = $um$createProperty4fd(metaData.fields[key]);
			entity.addProperty(prop);
		}else if(tag=="fieldset"){
			var prop = $um$createProperty4fdset(metaData.fields[key]);
			entity.addProperty(prop);
		}

	}
	return entity;
}
$um$initEntity = function(entity, id, metaData){
	
	entity.namespace(metaData.namespace);
	
	for(var key in metaData.attributes){
		entity.attr(key,metaData.attributes[key]);
	}

	for(var key in metaData.fields){
		var tag = metaData.fields[key].tag;
		if(tag=="field"){
			var prop = $um$createProperty4fd(metaData.fields[key]);
			entity.addProperty(prop);
		}else if(tag=="fieldset"){
			var prop = $um$createProperty4fdset(metaData.fields[key]);
			entity.addProperty(prop);
		}

	}
	return entity;
}

$um$createProperty4fd = function(metaData){
    if(metaData.tag=="field"){
        var prop = new UMP.UI.Mvc.Property("field");
	    for(var key in metaData.attributes){
		    prop.attr(key,metaData.attributes[key]);
	    }
		return prop;
	}else{
	    alert("$um$createProperty4fd Error!");
	    return null;
	}
}
$um$createProperty4fdset = function(metaData){
    if(metaData.tag=="fieldset"){
        var fdset = new UMP.UI.Mvc.Entity("fieldset");
		
		fdset.namespace(metaData.namespace);
		
	    for(var key in metaData.attributes){
		    fdset.attr(key,metaData.attributes[key]);
	    }
		
		for(var key in metaData.fields){
		    if(metaData.fields[key].tag=="field"){
			    var obj = $um$createProperty4fd(metaData.fields[key]);
				fdset.addProperty(obj);
			}else if(metaData.fields[key].tag=="fieldset"){
			    var obj = $um$createProperty4fdset(metaData.fields[key]);
				fdset.addProperty(obj);
			}
	    }
		return fdset;
	}else{
	    alert("$um$createProperty4fdset Error!");
	    return null;
	}
}
$$$json = {
		a:1,
		b:2,
		c:3,
		lines:[
			{la:12,lb:13,lc:14,detail:[{da:1001,db:1002,dc:1003},{da:2001,db:2002,dc:2003}]},
			{la:22,lb:23,lc:24,detail:[{da:1004,db:1005,dc:1006},{da:2004,db:2005,dc:2006}]}
		],
		cust:{ca:"112",cb:"ab23",cc:"dept1"}		
};
/*
so._rows = [{a:1,b:2,c:3}];
var soline={};
soline._rows=[{la:11,lb:22,lc:33},{la:111,lb:222,lc:333}];
so.addLink({"soline":soline});//so._links ={lines:soline};


so.get_lines().getRow(1);//so._soline
*/



_$um$isField = function(obj){
	//number,boolean,string,function,object,undefined
	if(typeof(obj) == "number" || typeof(obj)=="boolean" || typeof(obj)=="string"){
		return true;
	}else if(typeof(obj) == "object"){ 
		return false;
	}else if(typeof(obj) == "function"){
		return false;
	}
}

_$um$isArray = function(obj){	
	if(obj instanceof Array)
		return true;
	else
		return false;
}

//-------------------------------------------------------- CRUD Load-------------------------------------------------------- Begin
//$面向开发人员  _$面向平台内部
_$um$CRUD$load = function(ctx,json,entity){//相当于数据加载过程--------------------------------------------------------load    	
    if(entity==null){//no context define 兼容老的没有entity定义的情况		
		/*************************** $console.log begin *************************************/	
			try{
				var strlog = "[info] _$um$CRUD$load(ctx,json,entity)....正在执行，此时entity==null,将return null";
				$console.log(strlog);
				strlog = "接下来在xxxControllerBase中的$context将是一个json，而不是一个强类型的context,通常这是由于没有产生context代码引起的";
				$console.log(strlog);
				strlog = "在xxxcontroller中的ctx和$context="+$jsonToString(json);
				$console.log(strlog);
			}catch(e){
				$console.alert("Log Exception:" + e.stack);
			}
		/*************************** $console.log end ***************************************/	
		return null;
	}
	
	if(json == null){
		/*************************** $console.log begin *************************************/	
			try{
				var strlog = "[info] _$um$CRUD$load(ctx,json,entity)....正在执行,此时json==null,这基本不可能,将return ctx";
				$console.log(strlog);
			}catch(e){
				$console.alert("Log Exception:" + e.stack);
			}
		/*************************** $console.log end ***************************************/	
		return ctx;	
	}
	
	if(entity.tag()=="context"){
		_$um$CRUD$loadFieldSet1(ctx, json, entity);		
	}else if(entity.tag()=="fieldset"){
		_$um$CRUD$loadFieldSet(ctx, key, json, entity);
	}
	
	ctx.unload();
	ctx.json(json);//将原始的json加入强类型Context中
	
	/*************************** $console.log begin *************************************/	
		try{
			var strlog = "[info] _$um$CRUD$load(ctx,json,entity)....执行完毕,数据加载过程完毕,即将返回一个强类型的Context，此时ctx.unload()=="+ctx.unload();			
			strlog += ";此时$jsonToString(json)=="+$jsonToString(json);
			$console.log(strlog);
			
		}catch(e){
			$console.alert("Log Exception:" + e.stack);
		}
	/*************************** $console.log end ***************************************/
	return ctx;	
}

_$um$CRUD$loadFieldSet = function(ctx, key, json, entity){
	var fieldset = entity.property(key);
	var relation = fieldset.attr("relation");
	if(relation){
		//本应relation做严格检查，鉴于原生没有做检查，暂不根据relation做检查，而根据json来做动态加载
		//if(relation=="n"){
		if(json[key] instanceof Array){
			var ctxN = new UMP.UI.Mvc.ContextTable(key,fieldset);
			_$um$CRUD$loadFieldSetN(ctxN, json[key], fieldset);
			ctx.addLink(key, ctxN);
		//}else if(relation=="1"){
		}else if(typeof(json[key]) =="object"){
			var ctx1 = new UMP.UI.Mvc.Context(key,fieldset);
			_$um$CRUD$loadFieldSet1(ctx1, json[key], fieldset);
			ctx.addLink(key, ctx1);
		}else{
			alert(ctx.id()+"的字段"+ key + "不支持relation为" +entity.property(key).attr("relation").toString());
		}
	}else{
		alert(ctx.id()+"的字段"+ key + "没有定义relation，请检查Context定义");
	}
}

_$um$CRUD$loadFieldSetN = function (ctxN,jsonArray,entity){
    if(!jsonArray)
		return;
	if(!_$um$isArray(jsonArray)){
		$alert(entity.id() + "在Context定义中表达1:N，但其对应的json数据不是一个数组,而是" + $jsonToString(jsonArray));
		return;
	}
	/*
	if(isReload){
		ctxN.clear();//先清空
	}
	*/
	for(var i=0,len=jsonArray.length;i<len;i++){
		var ctx1 = new UMP.UI.Mvc.Context(entity.id(), entity);
		_$um$CRUD$loadFieldSet1(ctx1, jsonArray[i], entity);
		ctxN.add(ctx1);
	}	
}
_$um$CRUD$loadFieldSet1 = function(ctx,json,entity){
    if(!json) return;

	if(!entity) entity = ctx.md;
	/*
	if(isReload){
		ctx.clear();//先清空
	}
	*/
	for(var key in json){
		if(entity.property(key)==null){//规则1：entity中没有定义，不处理			
			ctx.addUserData(key, json[key]);			
		}else{
			if(entity.property(key).tag()=="field"){
				var newfield = new UMP.UI.Mvc.Field(key, json[key], entity.property(key));
				ctx.addField(key, newfield);
			}else if(entity.property(key).tag()=="fieldset"){
				_$um$CRUD$loadFieldSet(ctx, key, json, entity);
			}
		}
	}	
}
//-------------------------------------------------------- CRUD unLoad-------------------------------------------------------- End


_$um$CRUD$Context2JSON = function(ctx){//-----------controller结束的时候，由强类型context转化成json
	if(ctx.entity().tag() == "context"){
		return _$um$CRUD$fieldset12json(ctx);	
	}else if(ctx.entity().tag() == "fieldset"){
		return _$um$CRUD$FieldSet2JSON(ctx);
	}else{
		alert("_$um$CRUD$Context2JSON出错！不支持参数ctx这种类型，ctx.entity().tag()==" + ctx.entity().tag());
	}
}

_$um$CRUD$FieldSet2JSON = function(fset){
    if(!fset) return {};
	
	if(fset instanceof UMP.UI.Mvc.ContextTable){
		return _$um$CRUD$fieldsetN2json(fset);
	}else if(fset instanceof UMP.UI.Mvc.Context){
		return _$um$CRUD$fieldset12json(fset);	
	}else{
		debugger;
		alert("Exception in _$um$CRUD$FieldSet2JSON method ,\n\n the Context[" + fset.id() +"] con not be translated to a json because of fset.contextType() == " + fset.contextType());
	}
}
_$um$CRUD$fieldsetN2json = function(fset){
    var json = [];
	
	//var array = fset.field(fset.id());
	var array = fset.rows();
	for(var i=0,len=array.length;i<len;i++){    
	    var fset1 = array[i];
		var obj = _$um$CRUD$fieldset12json(fset1);
		json.push(obj);
	}	
    return json;
}
_$um$CRUD$fieldset12json = function(ctx){
    var json = {};    
    for(var key in ctx.fields()){
	    var fd = ctx.field(key);
		if(fd instanceof UMP.UI.Mvc.Field){
		    json[key] = fd.get();
		}else if(fd instanceof UMP.UI.Mvc.ContextTable || fd instanceof UMP.UI.Mvc.Context){
		    var obj = _$um$CRUD$FieldSet2JSON(fd);
	        json[key] = obj;
		}else{
			alert("_$um$CRUD$fieldset12json()出错! "+ctx.id()+"的字段"+key+"是一个不支持类型");
		}
	}
	
	//handle the userData
	if(ctx.getUserDataKeys()){
		for(var i=0,len = ctx.getUserDataKeys().length;i<len;i++){
			var ukey = ctx.getUserDataKeys()[i];
			json[ukey] = ctx[ukey];
		}
	}
	return json;
}

_$um$CRUD$field2json = function(fd){
    var json = {};
	if(fd instanceof UMP.UI.Mvc.Field){
		json[key] = fd.get();
	}else{
		alert("_$um$CRUD$field2json()时传入参数不是一个UMP.UI.Mvc.Field类型的对象");
	}
	return json;
}











$um$callAction = function(actionid,actionFun){
	alert("$um$callAction executing.....");
}