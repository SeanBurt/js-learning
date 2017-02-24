;(function(window) {
	window.J = {};
	
	/******file start******/
	J.getFileExtension = function(filename) {
		return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
	};
	/******file end******/
	
	/******array start******/
	J.deepEmptyArray = function(arr) {
		arr.length = 0;
	};
	J.emptyArray = function(arr) {
		arr = [];
	};
	J.distinctArray = function(arr){
		var o = {};
	    	if (Array.isArray(arr) && arr.length > 0) {
			for (var i = 0, l = arr.length; i < l; i++) {
		    		o[arr[i]] = arr[i];
			}
			return Object.keys(o);
	    	}
	   	return [];
	};
	/******array end******/
	
	/******cookie start******/
	J.getCookie = function(sKey) {
		return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	};
	J.setCookie = function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
		if(!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
			return false;
		}
		var sExpires = "";
		if(vEnd) {
			switch(vEnd.constructor) {
				case Number:
					sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
					break;
				case String:
					sExpires = "; expires=" + vEnd;
					break;
				case Date:
					sExpires = "; expires=" + vEnd.toUTCString();
					break;
			}
		}
		document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
		return true;
	};
	J.delCookie = function(sKey, sPath, sDomain) {
		if(!sKey || !this.hasCookie(sKey)) {
			return false;
		}
		document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
		return true;
	};
	J.hasCookie = function(sKey) {
		return(new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	};
	J.getCookieKeys = function() {
		var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
		for(var nIdx = 0; nIdx < aKeys.length; nIdx++) {
			aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
		}
		return aKeys;
	};
	/******cookie end******/
	
	//获取屏幕可视窗口大小
	J.getVisibleScreen = function() {
		let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
			w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		return {
			'screenWidth': w,
			'screenHeight': h
		};
	};
	//获取滚动条滚动的距离
	J.getScrollDistance = function() {
		let y = window.pagYoffset || document.documentElement.scrollTop || document.body.scrollTop,
			x = window.pagXoffset || document.documentElement.scrollLeft || document.body.scrollLeft;
		return {
			'scrollX': x,
			'scrollY': y
		};
	};
})(window);
