

// 多个属性运动框架

function animate(obj,json,fn) {   // obj：运动对象 ， json：目标样式属性值 fn：回调函数
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
         var flag = true;  // 用来判断是否停止定时器 
        for(var attr in json){   // attr  属性     json[attr]  值
            // 计算步长        用 target 位置 减去当前的位置  除以 10
             var current = parseInt(getStyle(obj,attr));  // 数值
             var step = ( json[attr] - current) / 10;  // 步长  用目标位置 - 现在的位置 / 10
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            obj.style[attr] = current  + step + "px" ;
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
    },30)
}