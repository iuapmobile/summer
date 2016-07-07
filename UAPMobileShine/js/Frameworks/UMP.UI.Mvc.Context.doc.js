/**
 * @fileOverview 数据上下文
 * @author gct
 */

ContextType = function(){};
ContextType.prototype = {
    Context : 0,
	FieldSet1 : 1,
	FieldSetN : 2
}

/**
 * @name Context
 * @class Context
 * @constructor new UMP.UI.Mvc.Context(id, entity, json)
 * @param {String} id 组件配置（下面的参数为配置项，配置会写入属性，详细的配置说明请看属性部分）
 * @param {UMP.UI.Mvc.Entity} entity ，Context的定义对象，包含了Context的元数据信息
 * @param {JSON} Context对象加载的json对象
 */
Context = function(id, entity, json){
	this._id = id;
	this.__entity = entity;//元数据结构	
	this.__json = json;//context的json数据，由原生传递过来
	this.__baseClass = "UMP.UI.Mvc.Context";//记录类型
	if(entity){
		if(entity.tag().toLowerCase() == "context"){
			this._contextType = UMP.UI.Mvc.ContextType.Context;//用来标识当前的Context对象是1还是N
		}else if(entity.tag().toLowerCase() == "fieldset"){
			if(entity.attr("relation") == "1"){
				this._contextType = UMP.UI.Mvc.ContextType.FieldSet1;//用来标识当前的Context对象是1还是N
			}else if(entity.attr("relation") && entity.attr("relation").toLowerCase() == "n"){
				this._contextType = UMP.UI.Mvc.ContextType.FieldSetN;//用来标识当前的Context对象是1还是N
			}else{
				$alert("UMP.UI.Mvc.Context的构造函数出错！暂不支持类型定义为"+entity.tag()+"的fieldSet");
			}
		}else{
			$alert("UMP.UI.Mvc.Context的构造函数出错！暂不支持类型定义为"+entity.tag()+"的Context");
		}
	}
	this._fields={};//存放Field类型对象的字段
	this._links = {};//存放Context类型Fieldset对象的字典
	
	this._rows =[];// 1条或N条, Entity[] data  该数组存放的是 Entity 类型	
	
	
	this._userDataKeys =[];//存放用户自定义数据Key
	
	this._events = {};
	this.__CONST_EVENT_ONCHANGE = "onchange";
	
	if(this.__entity)
		this._id = this.__entity.id();
		
	this._disposed = false;//标示Action结束后，context是否需要提交原生Container
}
Context.prototype = {
    /** @lends Context.prototype*/
    /**
	* 获取当前Context对应的Context定义，该定义中包含了Context对应的元数据信息。
	* @returns {Entity} 返回当前Context对应的Context定义
	*/	
	entity: function(){return UMP$UI$Mvc$Context$entity.apply(this, arguments);},
		
    /**	
	* @private
	*/	
	json: function(){return UMP$UI$Mvc$Context$json.apply(this, arguments);},
	/**	
	* @private
	*/
	contextType: function(){return UMP$UI$Mvc$Context$contextType.apply(this, arguments);},
	
	/** @lends Context.prototype*/
    /**
	* 获取当前ContextTable的唯一标示
	* @returns {String} 返回当前ContextTable的唯一标示
	*/	
	id: function(){return UMP$UI$Mvc$Context$id.apply(this, arguments);},
	/**	
	* @private
	*/
	getFields: function(){},		
	
	/**	
	* @private
	*/
	fields: function(){},
	
	/**	
	* @private
	*/
	field: function(){},
	
	/** @lends Context.prototype*/
    /**
	* 获取当前Context的指定字段名的值	
	* @param {String} fName - 字段名
	* @returns {Object} 返回当前Context的指定字段名的值，可能是一个JS简单类型，也可能是一个Context对象或ContextTable对象
	*/
	get: function(fName){return UMP$UI$Mvc$Context$get.apply(this, arguments);},
	
	
	/** @lends Context.prototype*/
    /**
	* 设置当前Context的字段的值	
	* @param {String} fName - 字段名
	* @param {String} fValue - 字段值		
	*/
	set: function(fName, fValue){return UMP$UI$Mvc$Context$get.apply(this, arguments);},
	
	/** @lends Context.prototype*/
    /**
	* 获取或设置当前Context对象的值，只有fName参数为获取值，fName和fValue都存在时为设置值
	* @param {String} fName - 参数名
	* @param {String} fValue - 参数值	
	* @returns {Object} 只有fName参数时则返回指定字段的值
	*/	
	val: function(fName, fValue){return UMP$UI$Mvc$Context$val.apply(this, arguments);},
	
	/**	
	* @private
	*/
	length: function(){return UMP$UI$Mvc$Context$length.apply(this, arguments);},
	
	/**	
	* @private
	*/
	rows: function(){},
	
	/**	
	* @private
	*/
	row: function(){},
	
	/**	
	* @private
	*/
	rowSelector: function(){},
	
	/**	
	* @private
	*/
	addRow: function(){},
	
	/**	
	* @private
	*/
	addJSON: function(){},
	
	/**	
	* @private
	*/
	removeRow: function(){},
	
	/**	
	* @private
	*/
	removeRow2: function(){},
	
	has: function(){},
	
	/**
	* @private
	*/	
	addField: function(){},
	
	/**	
	* @private
	*/
	removeField: function(){},
	
	
	/**	
	* @private
	*/
	getUserDataKeys: function(){},
	
	/**	
	* @private
	*/
	addUserData: function(){},

	/**	
	* @private
	*/
	addLink: function(){},
	/**	
	* @private
	*/
	removeLink: function(){},
	
	//private method
	/**	
	* @private
	*/
	__getFieldValue: function(){},
	/**	
	* @private
	*/
	__setFieldValue: function(){},
	/**	
	* @private
	*/
	__getRowFieldValue: function(){},
	/**	
	* @private
	*/
	__setRowFieldValue: function(){},
	
	/**
	* 获取当前Context对象的参数对象	
	* @returns {void} 无
	*/
	params: function(){return UMP$UI$Mvc$Context$params.apply(this, arguments);},
	
	/**
	* 获取当前Context对象的指定参数		
	* @param {JSON} name - 参数名
	* @returns {void} 无
	*/
	param: function(name){return UMP$UI$Mvc$Context$param.apply(this, arguments);},
	
	/**
	* 加载Context对象对应的json数据	
	* @param {JSON} json - 行对应的json对象
	* @returns {void} 无
	*/
	load: function(){return UMP$UI$Mvc$Context$load.apply(this, arguments);},

	/**
	* 卸载当前Context所加载的JSON数据
	* @returns {JOSN} 返回当前Context所加载的JSON数据
	*/	
	unload: function(){return UMP$UI$Mvc$Context$unload.apply(this, arguments);},
	
	/**
	* 移除Context中所有数据
	* @returns {void} 无
	*/
	clear: function(){return UMP$UI$Mvc$Context$clear.apply(this, arguments);},
	
	/**
	* 销毁Context数据，使得当前数据上下文中的数据不更新至原生端，即JS中的Context的数据变更不会影响原生端	
	* @returns {void} 无
	*/
	dispose:function(){return UMP$UI$Mvc$Context$dispose.apply(this, arguments);},
	
	/**
	* 判断当前数据上下文的数据是否处于销毁状态	
	* @returns {void} 无
	*/
	isDisposed: function(){return UMP$UI$Mvc$Context$isDisposed.apply(this, arguments);},
	
	/**
	* 恢复当前数据上下文的正常状态，如果原来是销毁状态则取消。数据上下文可以正常更新至原生端。
	* @returns {void} 无
	*/
	restore: function(){return UMP$UI$Mvc$Context$restore.apply(this, arguments);},
	
	/**	
	* @private
	*/
	fireEvent: function(){}
};




/**
 * @name ContextTable
 * @class UMP.UI.Mvc.ContextTable
 * @constructor UMP.UI.Mvc.ContextTable(id, entity, json)
 * @param {String} id 组件配置（下面的参数为配置项，配置会写入属性，详细的配置说明请看属性部分）
 * @param {UMP.UI.Mvc.Entity} entity ，Context的定义对象，包含了Context的元数据信息
 * @example
 * var ct = new UMP.UI.Mvc.ContextTable(id, entity, json);
 */
ContextTable = function(id, entity, json){
	//Step 1：inherit the base class
    //com.yy.um.ContextTable.initializeBase(this);
	this._id = id;
	this.__entity= entity;
	this._rows =[];
	this.__json = json;
	this.__baseClass = "UMP.UI.Mvc.ContextTable";//记录类型
};
ContextTable.prototype = {	
	/**
	* 获取当前ContextTable的唯一标示
	* @returns {String} 返回当前ContextTable的唯一标示
	*/	
	id: function(){return UMP$UI$Mvc$ContextTable$id.apply(this, arguments);},
	
	/**
	* 获取当前ContextTable的对应的Entity对象
	* @returns {Entity} 返回当前ContextTable的对应的Entity对象
	*/	
	entity: function(){return UMP$UI$Mvc$ContextTable$entity.apply(this, arguments);},
	
	/**
	* 获取当前ContextTable通过框架CRUD最初加载的原始JSON数据
	* @returns {JSON} 返回当前ContextTable通过框架CRUD最初加载的原始JSON数据
	*/
	json: function(){return UMP$UI$Mvc$ContextTable$json.apply(this, arguments);},
	
	/**
	* 获取当前ContextTable的所有行数
	* @returns {int} 返回当前ContextTable的所有行数
	*/	
	length: function(){return UMP$UI$Mvc$ContextTable$length.apply(this, arguments);},
	
	/**
	* 获取当前ContextTable的所有行的对象	
	* @returns {Context} 该返回值对象应该是一个Context数组
	*/
	rows: function(){return UMP$UI$Mvc$ContextTable$rows.apply(this, arguments);},
	
	/**
	* 获取当前ContextTable的指定行的对象
	* @param {int} 索引号 - 根据指定的索引号，返回对象。该返回值对象应该是一个Context对象
	* @returns {Context} 该返回值对象应该是一个Context对象
	*/
	row: function(index){return UMP$UI$Mvc$ContextTable$row.apply(this, arguments);},
	
	/**
	* 获取指定行的指定字段
	* @param {int} index - 行索引号
	* @param {String} fieldName - 字段名	
	* @returns {Object} 该返回值可能是一个Object简单类型对象，也可能是一个Context对象
	*/
	get: function(index, fieldName){return UMP$UI$Mvc$ContextTable$get.apply(this, arguments);},
	
	/**
	* 设置指定行的指定字段
	* @param {int} rowIndex - 行索引号
	* @param {String} fieldName - 字段名
	* @param {String} fieldValue - 字段值	
	* @returns {void} 无
	*/
	set: function(rowIndex, fieldName, fieldValue){return UMP$UI$Mvc$ContextTable$set.apply(this, arguments);},
	
	/**
	* 向ContextTable中增加一行
	* @param {Object} json || Context - 1、可以是一个JSONObject 2、可以是一个UMP.UI.Mvc.Context对象	
	* @returns {void} 无
	*/
	add: function(json){return UMP$UI$Mvc$ContextTable$add.apply(this, arguments);},
	
	/**
	* 向ContextTable中增加一行，同add方法
	* @param {Object} json || Context - 1、可以是一个JSONObject 2、可以是一个UMP.UI.Mvc.Context对象		
	* @returns {void} 无
	*/
	addRow: function(json){return UMP$UI$Mvc$ContextTable$addRow.apply(this, arguments);},
	
	/**
	* 移除ContextTable中指定行
	* @param {int} index - 行索引	
	* @returns {void} 无
	*/
	remove: function(index){return UMP$UI$Mvc$ContextTable$remove.apply(this, arguments);},
	
	/**
	* 移除ContextTable中所有行
	* @param {int} index - 行索引
	* @returns {void} 无
	*/
	clear: function(index){return UMP$UI$Mvc$ContextTable$clear.apply(this, arguments);},
	
	/**
	* 加载指定行的json数据
	* @param {int} index - 行索引
	* @param {JSON} json - 行对应的json对象
	* @returns {void} 无
	*/
	load: function(index, json){return UMP$UI$Mvc$ContextTable$load.apply(this, arguments);},

	/**
	* 卸载当前ContextTable所加载的JSON数据
	* @returns {JOSN} 返回当前ContextTable所加载的JSON数据
	*/	
	unload: function(){return UMP$UI$Mvc$ContextTable$load.apply(this, arguments);},
	
};
