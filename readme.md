# connection_detect

## WHAT IS IT

对多版本的HTML5 connection API 的兼容性封装

## WHY USE IT

这个API修订过几次，现存`navigator.connection`对象主要有两种不同版本的实现

##### 老版本API，目前QQ浏览器的实现

	// contents of navigator.connection object
	{
  		"type": 3, // quirk : "3"
  		"UNKNOWN": 0, // inherit in some browsers
  		"ETHERNET": 1, // inherit in some browsers
  		"WIFI": 2, // inherit in some browsers
  		"CELL_2G": 3, // inherit in some browsers
  		"CELL_3G": 4 // inherit in some browsers
	}
	
##### 新版本API，目前Chrome for Andorid 、Firefox的实现

	// contents of navigator.connection object
	{
  		"type": "wifi", // inherit in firefox
  		"ontypechange" : null, // handler, // inherit in firefox
  		"addEventListener" : function{ [native code] }, // inherit
  		"removeEventListener" : function{ [native code] }, // inherit
  		"dispatchEvent" : function{ [native code] } // inherit
	}

这个简单的代码将它们封装兼容，另外还引入了`navigator.onLine`

## HOW TO USE

##### 直接引入

	<script src="connection_detect.js"></script>
	<script>
		connection_detect()
	</script>

##### 使用AMD|CMD

	<!--AMD的例子，CMD类似-->
	<script src="http://cdn.bootcss.com/require.js/2.1.15/require.min.js"></script>
	<script>
		require.config({
			base:'./'
		})
		require(['connection_detect'],function(connection_detect){
			connection_detect()
		})
	</script>

##### 返回值

可能的返回值，字符串 `unknown ethernet wifi cell_2g cell_3g cell_4g cellular online none` 中的一个

* cellula r表示是蜂窝数据网络下，但2\3\4G状态未知，某些情况下接口会返回cell，统一标准化为cellular
* unknown 是完全未知，甚至不知道是否有可用网络
* online 为用户目前有可用网络，但不清楚wifi\cellular
* none 为用户当前无可用网络