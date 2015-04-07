;(function(factory){
	// AMD && CMD
    if(typeof define === 'function'){
        define(factory)
	// CommonJS
	}else if(typeof module === 'object' && module.exports){
		module.exports = factory()
    // Global
    }else{
        window.connection_detect = factory()
    }
})(function(){

	var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || navigator.msConnection || {'type':0,'unknown':0}

	function detect(){
		var type = connection.type

		var key
		var rst

		// detect by navigator.connection
		if(!isNaN(+type)){ // 数字 或 数字字符串 , 1或'1'
			for (key in connection){
				if(connection[key] == type){
					rst = key.toLowerCase()
				}
			}
		}else if(typeof type == 'string'){ // 新标准直接返回 'wifi'等字符串，而不再是数字
			rst = type.toLowerCase()
		}else{
			rst = 'unknown'
		}

		// detect by navigator.onLine
		if(rst == 'unknown'){
			if(navigator.onLine === true){
				rst = 'online'
			}else if(navigator.onLine === false){
				rst = 'none'
			}
		}

		// 统一cellular和cell
		if(type == 'cell'){
			type = 'cellular'
		}

		return rst
	}

	return detect
	// 后期考虑todo 加入网络状态切换的事件
})