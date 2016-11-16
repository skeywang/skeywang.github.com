function getStyle(obj,name){
    return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
}
function move(obj,json,options){
    //options {easing:1 duration:2 complete:fn}
    options=options || {};
    options.duration = options.duration || '800';
    options.easing =options.easing || 'ease-out';
    clearInterval(obj.timer);
    var start={};
    var dis={};
    for(var name in json){
        start[name] = parseFloat(getStyle(obj,name));
        dis[name] = json[name]-start[name];
    }
    var count = Math.floor(options.duration/30);
    var n =0;
    obj.timer=setInterval(function(){
        n++;
        for(var name in json){
            switch (options.easing){
                case 'linear':
                    var a = n/count;
                    var cur = dis[name]*a;
                    break;
                case 'ease-in':
                    var a = n/count;
                    var cur = dis[name]*a*a*a;
                    break;
                case 'ease-out':
                    var a = 1-n/count;
                    var cur = dis[name]*(1-a*a*a);
                    break;
            }

            if(name=='opacity'){
                obj.style.opacity=start[name]+cur;
                obj.style.filter='alpha(opacity:'+(start[name]+cur)*100+')';
            }else{
                obj.style[name]=start[name]+cur+'px';
            }
        }
        if(n==count){
            clearInterval(obj.timer);
            options.complete && options.complete();
        }
    },30);
}