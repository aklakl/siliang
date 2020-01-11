/**
 * Created by mingli on 20191219.
 */
console.log("start loading commonUtils");
import auth from './auth';


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
//commonUtils.routerBeforeEach = 
commonUtils.auth = auth;

//==========================================================
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

commonUtils.getTestResult =  function() {
   let result = {
    "resultData": [
            { 
              "sort":"4",
              "itemName":"流量计算参数4",
              "subitem":[ 
                { 
                    "sort":3,               
                    "unit":"",
                    "name":"流体类型",
                    "value":"蒸汽4"
                },
                { 
                    "sort":2,
                    "unit":"mm",
                    "name":"管道内径",
                    "value":"200"
                },
                { 
                    "sort":1,
                    "unit":"mm",
                    "name":"节流件开孔直径020",
                    "value":"1"
                }
              ]
          },
          { 
             "sort":"1",
             "itemName":"流量计算参数",
             "subitem":[ 
                { 
                   "sort":1,               
                   "unit":"",
                   "name":"流体类型",
                   "value":"蒸汽"
                },
                { 
                   "sort":2,
                   "unit":"mm",
                   "name":"管道内径",
                   "value":"100"
                },
                { 
                   "sort":3,
                   "unit":"mm",
                   "name":"节流件开孔直径020",
                   "value":"50"
                }
             ]
          },
          { 
             "sort":"2",
             "itemName":"工艺参数",
             "subitem":[ 
                { 
                   "sort":1,
                   "unit":"℃",
                   "name":"工艺温度",
                   "value":"48"
                },
                { 
                   "sort":2,
                   "unit":"mm",
                   "name":"工作压力（表压）",
                   "value":"0.6"
                },
                { 
                   "sort":3,
                   "unit":"mm",
                   "name":"节流件差压值",
                   "value":"4000"
                }
             ]
          },
     { 
             "sort":"3",
             "itemName":"计算结果",
             "subitem":[ 
                { 
                   "sort":1,
                   "unit":"(m3/h)",
                   "name":"工况体积流量qv",
                   "value":"119.891"
                },
                { 
                   "sort":2,
                   "unit":"(kg/h)",
                   "name":"质量流量qm",
                   "value":"0.6"
                }
    
             ]
          }
    ]
    };
  
  return result;
}

//==========================================================

/*
export default commonUtil = function(){
  console.log('loaded commonUtils Success');
  return commonUtils;
};  
*/
export default commonUtils;

console.log("end loading commonUtils");
