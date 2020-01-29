/**
 * Created by mingli on 20191219.
 */
console.log("start loading commonUtils");
import auth from './auth';
import { commonCalc,addCalc, detailCalc } from "@/api/calculate";


var commonUtils = {}; 
commonUtils.Json = {};
commonUtils.form = {};
commonUtils.form.commonCalc = commonCalc;
commonUtils.form.addCalc = addCalc;
commonUtils.form.detailCalc = detailCalc;

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
  let userAgent = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  console.log("userAgent = " + userAgent);
  let flag = !userAgent ? false : true; 
  return flag;
}
//commonUtils.routerBeforeEach = 
commonUtils.auth = auth;
commonUtils.form.commonSubmit = function(self){
    commonUtils.setCurrentVueComponent(self);
    self.$vux.loading.show({
        text: "提交中..."
    });
    commonCalc(self.inputFrom)
        .then(result => {
        console.log(result);
        self.$store.commit("CALC_RES", result);
        self.$router.push("/calculate/commonCalcResult");
        self.$vux.loading.hide();
        self.clearData();
        })
    .catch(err => {
        self.$vux.loading.hide();
        self.clearData();
    });
   /*
      this.$vux.loading.show({
        text: "提交中..."
      });
      commonCalc(this.inputFrom)
        .then(result => {
          console.log(result);
          this.$store.commit("CALC_RES", result);
          this.$router.push("/calculate/commonCalcResult");
          this.$vux.loading.hide();
          this.clearData();
        })
        .catch(err => {
          this.$vux.loading.hide();
          this.clearData();
        });
        */
}
commonUtils.currentVueComponent = {};
commonUtils.setCurrentVueComponent = function(self){
    commonUtils.currentVueComponent = self;
    //let currentVueComponent = JSON.stringify(self);
    //console.log("getCurrentVueComponent = "+currentVueComponent);
    return self;
}
commonUtils.getCurrentVueComponent = () => {
    return commonUtils.currentVueComponent;
}
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

commonUtils.getTestResultNew =  function() {
   let result = {
          "resultData": {
              "rd": [
                  {
                      "itemName": "流量计算参数",
                      "sort": "4",
                      "subitem": [
                          {
                              "name": "流量计名称",
                              "sort": 0,
                              "unit": "",
                              "value": "脉冲输出流量计"
                          },
                          {
                              "name": "仪表系数",
                              "sort": 1,
                              "unit": "(脉冲/m3)",
                              "value": "1"
                          }
                      ]
                  },
                  {
                      "itemName": "工艺参数",
                      "sort": "3",
                      "subitem": [
                          {
                              "name": "流体名称",
                              "sort": 2,
                              "unit": "",
                              "value": "空气"
                          },
                          {
                              "name": "工作温度",
                              "sort": 3,
                              "unit": "(℃)",
                              "value": "1"
                          },
                          {
                              "name": "工作压力（表压）",
                              "sort": 4,
                              "unit": "(MPa)",
                              "value": "1"
                          },
                          {
                              "name": "脉冲频率值",
                              "sort": 5,
                              "unit": "(Hz)",
                              "value": "1"
                          },
                          {
                              "name": "当地大气压",
                              "sort": 6,
                              "unit": "(MPa)",
                              "value": "1"
                          }
                      ]
                  },
                  {
                      "itemName": "计算结果",
                      "sort": "2",
                      "subitem": [
                          {
                              "name": "工况体积流量qv",
                              "sort": 1,
                              "unit": "(m3/h)",
                              "value": "0"
                          },
                          {
                              "name": "质量流量qm",
                              "sort": 2,
                              "unit": "(kg/h)",
                              "value": "0"
                          },
                          {
                              "name": "能量流量qE",
                              "sort": 3,
                              "unit": "（MJ?h）",
                              "value": "0"
                          },
                          {
                              "name": "工况密度",
                              "sort": 4,
                              "unit": "(kg/m3)",
                              "value": "1000"
                          },
                          {
                              "name": "焓值",
                              "sort": 5,
                              "unit": "（MJ/h）",
                              "value": "0"
                          }
                      ]
                  }
              ]
          },
          "time": "1985年01月28日 23:30"
  }
  return result;
}

commonUtils.getTestResultOld =  function() {
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

commonUtils.getTestResult = commonUtils.getTestResultNew;
//commonUtils.getTestResult = commonUtils.getTestResultOld;
//==========================================================

/*
export default commonUtil = function(){
  console.log('loaded commonUtils Success');
  return commonUtils;
};  
*/
export default commonUtils;

console.log("end loading commonUtils");
