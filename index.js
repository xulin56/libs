function idDom(id) {
    return document.getElementById(id);
};

//获取class类名的参数dom
function classDom(Class){
    return document.getElementsByClassName(Class)[0];
};

//获取document里的所有div，返回的是个数组
function tagDom(dom){
    return document.getElementsByTagName(dom);
};

//获取document里的第一个参数dom
function QSDom(dom){
    return document.querySelector(dom);
};

//获取document里所有的参数dom，返回是个数组
function QSADom(dom){
    return document.querySelectorAll(dom);
};

//创建一个dom
function createDom(dom){
    return document.createElement(dom);
};

//创建一个文本
function createtxt(txt){
    return document.createTextNode(txt)
}

//将obj1添加到obj中
function addDom(obj,obj1){
    obj.appendChild(obj1);
};

//将参数obj节点添加到document的body里
function addBody(obj){
    document.body.appendChild(obj);
};

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
var cookie = {
    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    },
    setCookie: function (cname, cvalue) {
        document.cookie = cname + "=" + cvalue;
    },
    clearCookie: function (cname) {
        var myDate = new Date();
        myDate.setTime(-1000);//设置过期时间
        document.cookie = cname + "=''; expires=" + myDate.toGMTString();
    }
};

//判断网络连接与断开
function isOnline(onlineCb,offlineCb) {
    let el = document.body;    
    if (el.addEventListener) {    
       window.addEventListener("online", function () { 
         onlineCb();
     }, true);    
       window.addEventListener("offline", function () {    
         offlineCb();
     }, true);    
    }    
    else if (el.attachEvent) {    
       window.attachEvent("ononline", function () {    
         onlineCb();
     });    
       window.attachEvent("onoffline", function () {    
         offlineCb();
     });    
    }    
    else {    
       window.ononline = function () {    
         onlineCb();
     };    
       window.onoffline = function () {    
         offlineCb();
     };    
    }
};


//localStorage和localSession封装
var Store=function(){
    this.name='Store';
};
Store.prototype={
    init:function(options){
        this.store=function(){
            return options.type;
        };
        return this;
    },
    set:function(key,value){
        var type=Type(value);

        switch(type){
            case 'object':
                            this.store().setItem(key,JSON.stringify(value));
                        break;
            case 'array':
                            this.store().setItem(key,'['+value+']');
                        break;
            case 'function'://如果是函数先用eval()计算执行js代码
                            this.store().setItem(key,value);
                        break;
            default :
                            this.store().setItem(key,value);
        }

    },
    get:function(key){
        var value=this.store().getItem(key);

        try{
            value=JSON.parse(value);
        }catch(e){}
        return value;
    },
    getAll:function(){
        var json={};
        var value='';

        for(var attr in this.store()){
            try{
                value=JSON.parse(this.store()[attr]);
            }catch(e){}
            json[attr]=value;
        }
        return  json;
    },
    remove:function(key){
        this.store().removeItem(key);
    },
    clear:function(){
        this.store().clear();
    },
};
var lStore=new Store().init({
    'type':window.localStorage,
});

var sStore=new Store().init({
    'type':window.sessionStorage,
});


//判断设备跳转不同地址
function goPage(moHref,pcHref){
    var reg=/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;

    window.location.href=navigator.userAgent.match(reg)?moHref:pcHref;
};

//根据设备宽度来写相对布局,
//最小1rem=100px(宽度为375px屏幕下),3.75rem=100%;
//根据375屏幕下换算来布局
//小于375屏幕根节点字体大小与375屏幕保持一致，注意宽度的溢出
function htmlFontSize(){
    function change(){
        var fontSize=document.documentElement.clientWidth/3.75;

        if(fontSize<100)fontSize=100;
        if(fontSize>208)fontSize=208;
        document.getElementsByTagName('html')[0].style.fontSize=fontSize+'px';
    };
    change();
    window.onresize=change;
};

//判断是否是手机浏览器
function isPhone(){
    var reg=/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
    return window.navigator.userAgent.match(reg)?true:false;
};

//判断是否是微信浏览器
function isWeixin(){
    var reg=/(micromessenger)/i;
    return window.navigator.userAgent.match(reg)?true:false;
};

//绑定事件，可重复绑定('事件名称'必须加引号)
function bind(obj,evname,fn){
    if(obj.addEventListener){
        obj.addEventListener(evname,fn,false);
    }else{
        obj.attachEvent('on'+evname,function(){
            fn.call(obj);
        });
    }
};

//取消绑定，可重复取消('事件名称'必须加引号)
function unbind(obj,evname,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(evname,fn,false);
    }else{
        obj.detachEvent('on'+evname,fn);
    }
};

//获取字符串中的数组
function findNum(str) {
    let arr = [];
    let tmp = '';
    for(var i=0;i<str.length;i++){
        if(str.charAt(i)<='9' && str.charAt(i)>0){
            tmp += str.charAt(i);
        }else {
            if(tmp) {
                arr.push(tmp);
                tmp = '';
            }
        }
        
    }
    if(tmp) {
        arr.push(tmp);
        tmp = '';
    }
    return arr;
};
// export {
//     idDom,
//     classDom,
//     tagDom,
//     QSDom,
//     QSADom,
//     createDom,
//     createtxt,
//     addDom,
//     addBody,
//     isEmpty,
//     lTrim,
//     trim,
//     rTrim,
//     isNumber,
//     customEvent,
//     getQueryString,
//     bubbleSort,
//     descendingSort,
//     getArrMax,
//     getArrMaxVal,
//     unique,
//     rnd,
//     ajax,
//     cookie,
//     isOnline,
//     lStore,
//     sStore,
//     goPage,
//     htmlFontSize,
//     isPhone,
//     isWeixin,
//     bind,
//     unbind
// }
