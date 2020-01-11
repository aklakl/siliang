/**
 * Created by mingli on 20191219.
 */
console.log("start loading commonUtils");

var commonUtils = {}; 
commonUtils.Json = {};

////https://segmentfault.com/q/1010000009968702
commonUtils.Json.findKey = function(object,value) { 
	for (var prop in object) { 
		if (object.hasOwnProperty(prop)) { 
			if (object[prop] === value) 
			return prop; 
		} 
	} 
}

commonUtils.Json.isJsonString = function(object) {
    try {
        JSON.parse(object);
    } catch (e) {
        return false;
    }
    return true;
}
commonUtils.Json.isJson = function(obj) {
	if(typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length){
		console.log('isJSONObject');
 		return true
	}else{
		return false
	}
}
commonUtils.isMobile = function(){
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag;
}



commonUtils.getGlobal = function(p1,p2) {
  console.log("p1="+p1+"|p2="+p2);
  return "test";
}
commonUtils.testJson = function(jsonObj){
  let json = JSON.stringify(jsonObj);
  console.log('xuan json='+json);
}
commonUtils.testming =  function() {
	console.log("loaded testming Success");
}

/*
export default commonUtil = function(){
  console.log('loaded commonUtils Success');
  return commonUtils;
};  
*/
export default commonUtils;

console.log("end loading commonUtils");
