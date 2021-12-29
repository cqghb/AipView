const systemConstant = require("@/components/constant/systemConstant");
const moment =  require("moment");
// 表格数据格式化策略
let tableDataFormatStrategy = {
	formatDate: function (row, item){// 时间格式化
		let type = item.type;// 列数据类型
		let name = item.prop;// 列英文名称
		let format = item.format;// 格式
		// 设置默认格式
		format = format ? format : systemConstant.common.YYYY_MM_DD_HH_mm_ss;
		if(systemConstant.dataType.DATE==type && row[name]){// 这里在再次判断是为了防止将非日期类型数据用这个方法来格式化
			return moment(row[name]).format(format);
		} else {
			return row[name];
		}
		
	}// TODO 其他数据格式化方法写在后面 
}

let tableDataFormat = function(){
	
}

tableDataFormat.prototype.format = function(row, item){
	let self = this;
	let strategy = item.formatDate;
	let type = item.type;
	let name = item.prop;// 列英文名称
	if(systemConstant.dataType.DATE==type){
		return tableDataFormatStrategy[strategy].apply(this, arguments);
	} else if(systemConstant.dataType.TEXT==type){
		
	} else {
		return row[name];
	}
	
}
// 函数导出
module.exports = {
	tableDataFormat: tableDataFormat
}