var Store = function(){
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
        var type=dataType(value);

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
var check=new Store().init({
    'type':window.localStorage,
});

var sStore=new Store().init({
    'type':window.sessionStorage,
});


function Check() {
    this,name = 'Check'
}
Check.prototype = {

}