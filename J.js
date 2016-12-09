;(function(window) {
	window.J = {};
	J.getFileExtension = function(filename){
		return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
	};
	J.deepEmptyArray = function(arr){
		arr.length = 0;
	};
	J.emptyArray = function(arr){
		arr = [];
	};
})(window);
