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

//获取url后面的参数
function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i'); // 匹配目标参数
    let result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
    if (result != null) {
        return decodeURIComponent(result[2]);
    } else {
        return null;
    }
};

// 冒泡排序
function bubbleSort(arr3) {
　　var low = 0;
　　var high= arr.length-1; //设置变量的初始值
　　var tmp,j;
　　while (low < high) {
　　　　for (j= low; j< high; ++j) {         //正向冒泡,找到最大者
　　　　　　if (arr[j]> arr[j+1]) {
　　　　　　　　tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
　　　　　　}
　　　　}
　　　　--high;  //修改high值, 前移一位
　　　　for (j=high; j>low; --j) {          //反向冒泡,找到最小者
　　　　　　if (arr[j]<arr[j-1]) {
　　　　　　　　tmp = arr[j]; arr[j]=arr[j-1];arr[j-1]=tmp;
　　　　　　}
　　　　}　
　　　　++low;  //修改low值,后移一位
　　}
　　return arr3;
};

function descendingSort(arr) {
    arr.sort(function (x,y) {
        return y-x;
    });
    return arr;
};

//获取数组中最大值，es5写法
function getArrMax(arr) {
    return Math.max.apply(Math, arr)
};

//获取数组中最大值，es6写法
function getArrMaxVal(arr) {
    return Math.max(...arr);
};

// 去除数组中的重复项
function unique(arr) {
        var newArr = [];
        var l = arr.length;
        for (var i = 0; i < l; i++){
            for (var j = i + 1; j < l; j++)
            {
                if (arr[i] === arr[j]) j = ++i;
            }
            newArr.push(arr[i]);
        }
        return newArr;
};

// 获取一个区间的随机整数
// @param n : 区间的最小值
// @param m : 区间的最大值
function rnd(n, m){
    var random = Math.floor(Math.random()*(m-n+1)+n);
    return random;
};


//ajax
//ajax({//示例
//  url:'',
//  type:'post',
//  data:'',
//  closeToForm:false,
//  dataType:'json',
//  headers:{},
//  xhr:function(xhr){
//      console.log(xhr);
//  },
//  progress:function(ev){
//      console.log(ev);
//  },
//  success:function(data){
//      console.log(data);
//  },
//  error:function(data){
//      console.log(data);
//  },
//});
function ajax(json){
    var str='';

    json.type=json.type.toLowerCase()||'get';
    json.dataType=json.dataType.toLowerCase()||'json';

    if(!json.closeToForm&&json.data&&Type(json.data)=='object'){
        for(var attr in json.data){
            str+=attr+'='+json.data[attr]+'&';
        }
        json.data=str.substring(0,str.length-1);
    }

    var xhr=null;

    try{
        xhr=new XMLHttpRequest();
    }catch(e){
        xhr=new window.ActiveXObject('Microsoft.XMLHTTP');
    }

    if(json.xhr&&Type(json.xhr)=='function'){
        xhr=json.xhr(xhr);
    }

    if(xhr.upload&&json.progress&&Type(json.progress)=='function'){
        bind(xhr.upload,'progress',json.progress);
    }

    if(json.type=='get'&&json.data){
        json.url+='?'+json.data;
    }

    xhr.open(json.type,json.url,true);

    if(json.type=='get'){
        xhr.send();
    }else{
        if(!json.closeToForm)xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        if(json.headers&&Type(json.headers)=='object'){
            for(var attr in json.headers){
                xhr.setRequestHeader(attr,json.headers[attr]);
            }
        }
        xhr.send(json.data);
    }

    json.before&&Type(json.before)=='function'&&json.before(xhr);
    xhr.onreadystatechange=function(){
        var data=null;

        if(xhr.readyState==4){
            if(xhr.status==200){
                try{
                    switch(json.dataType){
                        case 'text':
                                data=xhr.responseText;
                            break;
                        case 'json':
                                data=JSON.parse(xhr.responseText);
                            break;
                        case 'html':
                                var oDiv=document.createElement('div');

                                oDiv.setAttribute('dataType','html');
                                oDiv.innerHTML=xhr.responseText;
                                data=oDiv;
                            break;
                        case 'script':
                                var oScript=document.createElement('script');

                                oScript.setAttribute('dataType','script');
                                oScript.innerHTML=xhr.responseText;
                                document.body.appendChild(oScript);
                                data=oScript;
                            break;
                    }

                }catch(e){
                    console.log(e);
                }
                json.after&&Type(json.after)=='function'&&json.after(xhr,data);
                json.success&&Type(json.success)=='function'&&json.success(data);
            }else{
                json.error&&Type(json.error)=='function'&&json.error(xhr.status);
            }
        }
    };
};
export {
    isEmpty,
    lTrim,
    trim,
    rTrim,
    isNumber,
    customEvent,
    getQueryString,
    bubbleSort,
    descendingSort,
    getArrMax,
    getArrMaxVal,
    unique,
    rnd,
    ajax
}
