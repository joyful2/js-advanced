 
// 多个属性运动框架  添加回调函数
function animate(obj,json,fn) {  //   obj：运动对象 ， json：目标样式属性值 fn：回调函数
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true;  // 用来判断是否停止定时器  
        for(var attr in json){   
   
            var current = 0;
            if(attr == "opacity")
            {
                current = parseInt(getStyle(obj,attr)*100);
            }
            else
            {
                current = parseInt(getStyle(obj,attr)); // 数值
            }
     
            var step = ( json[attr] - current) / 10;  // 步长  用目标位置 - 现在的位置 / 10
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //判断透明度
            if(attr == "opacity")  // 判断用户有没有输入 opacity
            {
                if("opacity" in obj.style)  // 判断 我们浏览器是否支持opacity
                {
                    // obj.style.opacity
                    obj.style.opacity = (current + step) /100;
                }
                else
                {  // obj.style.filter = alpha(opacity = 30)
                    obj.style.filter = "alpha(opacity = "+(current + step)+")";
                    console.log(current);
                }
            }
            else if(attr == "zIndex")
            {
                obj.style.zIndex = json[attr];
            }
            else
            {
                obj.style[attr] = current  + step + "px" ;
            }

            if(current != json[attr])  // 只要其中一个不满足条件 就不应该停止定时器  这句一定遍历里面
            {
                flag =  false;
            }
        }
        if(flag)  // 用于判断定时器的条件
        {
            clearInterval(obj.timer);
             if(fn)   
            {
                fn();  
            }
        }
    },5)
}
function getStyle(obj,attr) {  
    if(obj.currentStyle)  // ie 等
    {
        return obj.currentStyle[attr];   
    }
    else
    {
        return window.getComputedStyle(obj,null)[attr];  // w3c 浏览器
    }
}