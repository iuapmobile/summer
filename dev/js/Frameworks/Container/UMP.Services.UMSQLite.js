
//___________________________________________________________________________________________________ UMP.Services.Sqlite
//Sqlite相关服务
/*
*/ 
Type.registerNamespace('UMP.Services');
UMP.Services.Sqlite = function UMP$Services$Sqlite(){
	this.UMSQLite_execSql = "UMSQLite.execSql";
	this.UMSQLite_query = "UMSQLite.query";
	this.UMSQLite_queryByPage = "UMSQLite.queryByPage";
	this.UMSQLite_exist = "UMSQLite.exist";
	this.UMSQLite_openDB = "UMSQLite.openDB";	
}
function UMP$Services$Sqlite$execSql(args){
/*
    var sql = "CREATE TABLE person (_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, xclass VARCHAR)";
    var param = {
       db : dbname,
       sql : sql
    }    
    $sqlite.execSql(param);
*/
	if($isJSONObject(args)){
		if($isEmpty(args["db"])){
			alert("请输入参数db");
			return;
		}
		if($isEmpty(args["sql"])){
			alert("请输入参数sql");
			return;
		}
		return $service.call(this.UMSQLite_execSql, args, true);
	}else{
		alert("参数不是一个有效的JSONObject，请使用execSql({...})形式的API");
	}
	
}

//查询记录并分页返回
//参数db：必选 数据库名字  
//参数sql：必选   查询sql语句  
//参数startIndex： 可选  起始记录数索引 默认0
//参数endIndex：  可选  结束记录索引（含） 默认9
function UMP$Services$Sqlite$query(args){
	/*
	$sqlite.query({
       "db" : dbname,
       "sql" : sql,
       "startIndex" : 0,   //从第几条记录开始
       "endIndex" : 9   //到第几条记录结束(含)    
    });
	*/
	if($isJSONObject(args)){
		/*
		if($isEmpty(args["startIndex"])){
			args["startIndex"] = 0;
		}
		if($isEmpty(args["endIndex"])){
			args["endIndex"] = 9;
		}
		*/
		return $service.call(this.UMSQLite_query, args, true);
	}else{
		alert("参数不是一个有效的JSONObject，请使用query({...})形式的API");
	}
}

//查询返回指定页面的数据
//参数db：必选 数据库名字  
//参数sql：必选   查询sql语句  
//参数pagesize：  可选  每页记录数 默认10
//参数pageIndex： 可选  指定页码 默认0
function UMP$Services$Sqlite$queryByPage(args){
/*
    $sqlite.queryByPage({
       "db" : dbName,
       "sql" : sql,
       "pageSize" : pageSize,   //pageIndex=页号，从0开始
       "pageIndex" : pageNo //pageSize=每页的记录数，从1开始
    })
*/
	if($isJSONObject(args)){
		if($isEmpty(args["pageSize"])){
			args["pageSize"] = 10;
		}
		if($isEmpty(args["pageIndex"])){
			args["pageIndex"] = 0;
		}
		return $service.call(this.UMSQLite_queryByPage, args, true);
	}else{
		alert("参数不是一个有效的JSONObject，请使用queryByPage({...})形式的API");
	}
	
}
function UMP$Services$Sqlite$exist(args){
	if($isJSONObject(args)){
		if($isEmpty(args["db"])){
			alert("请输入参数db");
			return;
		}
		return $service.call(this.UMSQLite_exist, args, true);
	}else{
		alert("参数不是一个有效的JSONObject，请使用exist({...})形式的API");
	}
}
UMP.Services.Sqlite.prototype = {
	open:function(json){
		return this.openOrCreateDB(json);
	},
	openOrCreateDB:function(json){
		if($isJSONObject(json) && $isEmpty(json["db"])){	
			return $service.call(this.UMSQLite_openDB, json, false);
		}else{
			alert("参数不是一个有效的JSONObject，请确保参数是一个有效的JSON且含有db键值");
		}
	},
	openDB:function(args){
		if($isJSONObject(args) && $isEmpty(args["db"])){			
			return $service.call(this.UMSQLite_openDB, args, false);
		}else{
			alert("参数不是一个有效的JSONObject，请使用openDB({...})形式的API");
		}
	},
	//delDB:UMP$Services$Sqlite$delDB,
	execSql:UMP$Services$Sqlite$execSql,
	query:UMP$Services$Sqlite$query,	//查询（默认分页）
	queryByPage:UMP$Services$Sqlite$queryByPage,//查询指定页的数据
	exist : UMP$Services$Sqlite$exist
};
UMP.Services.Sqlite.registerClass('UMP.Services.Sqlite');
var $sqlite = new UMP.Services.Sqlite();
