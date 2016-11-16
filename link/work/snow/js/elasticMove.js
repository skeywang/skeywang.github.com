'use strict'
var left = 0;
var iSpeed = 0;
function move(obj,iTarget){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		iSpeed+=(iTarget-left)/5;
		iSpeed*=0.75;
		left+=iSpeed;
		obj.style.left = left+'px';
		if(Math.round(iSpeed)==0&&Math.round(left)==iTarget){
			clearInterval(obj.timer);
		}
	},30);
}