//判断一个object是否为{}
function isEmpty(obj){
    for(let key in obj) {
        if(obj.hasOwnProperty(key)){
            return false;
        }
    }
    return true;
};

//去除字符串左侧空格
function lTrim(val){
    return val.replace(/(^\s*)/g,"")
};

//去除字符串左右两边的空格
function trim(val){
   return val.replace(/(^\s*)|(\s*$)/gm, "")
};

//去除字符串右侧空格
function rTrim(val){
    return val.replace(/(\s*$)/g,"");
}

//判断是否为number类型
function isNumber(obj) {
    return typeof obj === 'number' && !isNaN(obj)
}

//自定义事件的实现
var customEvent={
	json:{},
	on:function(evName,fn){
		if(Type(this.json[evName])!='object'){
			this.json[evName]={};
		}
		if(Type(fn)=='function'){
			fn.id=soleString32();
			this.json[evName][fn.id]=fn;
		}
		return this;
	},
	emit:function(evName,data){
		var evFnArr=this.json[evName];

		if(Type(evFnArr)=='object'){
			for(var attr in this.json[evName]){
				if(Type(this.json[evName][attr])=='function'){
					this.json[evName][attr](data);
				}
			}
		}
		return this;
	},
	remove:function(evName,fn){
		var evFnArr=this.json[evName];

		if(Type(evName)=='string'&&Type(evFnArr)=='object'){
			if(Type(fn)=='function'){
				if(fn.id){
					delete this.json[evName][fn.id];
				}else{
					for(var attr in this.json[evName]){
						if(this.json[evName][attr]+''===fn+''){
							delete this.json[evName][attr];
							break;
						}
					}
				}
			}else{
				delete this.json[evName];
			}
		}
		return this;
	}
};
export {
    isEmpty,
    lTrim,
    trim,
    rTrim,
    isNumber,
    customEvent
}
