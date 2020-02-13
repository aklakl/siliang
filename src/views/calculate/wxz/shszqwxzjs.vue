<template>
  <div class="input">
    <div class="title">水和水蒸汽物性值计算</div>
    <group>
      <selector
        placeholder="请选择"
        v-model="inputFrom.Fluid_Type"
        title="流体类型"
        name="type"
        :options="typelist"
        @on-change="onChange"
        direction="rtl"
        text-align="right"
      ></selector>
      <selector
        placeholder="请选择"
        v-if="namelist&&namelist.length>0"
        v-model="inputFrom.SingleGasType"
        title="流体名称"
        name="name"
        :options="namelist"
        direction="rtl"
        text-align="right"
      ></selector>

      <x-input
        v-if="inputFrom.SingleGasType!='10'"
        v-model="inputFrom.AtmPressure"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
        title="当地大气压"
      >
        <span slot="right" class="unitSpan">MPa</span>
      </x-input>

      <x-input
        v-model="inputFrom.Gk_Sheshi_wendu_float"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
        title="工作温度"
      >
        <span slot="right" class="unitSpan">℃</span>
      </x-input>

      <x-input
        v-model="inputFrom.gongzuo_yali_float"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
        title="工作压力（表压）"
      >
        <span slot="right" class="unitSpan">MPa</span>
      </x-input>
      
    </group>

    <div style="padding:15px;">
      <flexbox>
        <flexbox-item>
          <x-button type="primary" @click.native="clearData">清空</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary" @click.native="submit">计算</x-button>
        </flexbox-item>
      </flexbox>
    </div>
    <br />
  </div>
</template>

<script>
import {
  Cell,
  Flexbox,
  FlexboxItem,
  Group,
  XButton,
  XInput,
  Selector
} from "vux";
import { addCalc, detailCalc } from "@/api/calculate";
import { getToken } from "@/utils/auth";
export default {
  name: "Input",
  components: {
    Cell,
    Flexbox,
    FlexboxItem,
    Group,
    XButton,
    XInput,
    Selector
  },
  data() {
    return {
      inputFrom: this.initData(),
      /*
      inputFrom: {
        Fluid_Type: "",
        SingleGasType: "",
        // mt_comp: "",
        // baohezhengqi_type: "1",
        Yasuosuanfa: "1",
        jieliu_zhuangzhi_uchar: "",
        guandao_koujing_set_float: "",
        guandao_caizhi_leixing_uchar: "",
        jieliujian_koujing_set_float: "",
        jieliujian_caizhi_leixing_uchar: "",
        dangdi_daqiya_float: "",
        gongzuo_yali_float: "",
        dangdi_daqiya_float:"",
        FlowMeter_Type:"",
        FlowInputUnit:"",
        DpLrv:"",
        DpUrv:"",
        DesignTemp:"",
        DesignPres:"",
        gongzuo_yali_float:"",
        AtmPressure:"",
        Gk_Sheshi_wendu_float:"",
        GasHumidity:"",
        Flow_Input_mA_float:"",
        RefTemp:"",
        RefPres:"",
        AtmPressure:"",
        RefDenisty:"",
        StdCompression:"",
        OpeCompression:"",
        
        PulseAverageFactor:"",

        m0: "",
        m1: "",
        m2: "",
        m3: "",
        m4: "",
        m5: "",
        m6: "",
        m7: "",
        m8: "",
        m9: "",
        m10: "",
        m11: "",
        m12: "",
        m13: "",
        m14: "",
        m15: "",
        m16: "",
        m17: "",
        m18: "",
        m19: "",
        n0: "",
        n1: "",
        n2: "",
        n3: "",
        n4: "",
        n5: "",
        n6: "",
        n7: "",
        n8: "",
        n9: "",
        n10: "",
        n11: "",
        n12: "",
        n13: "",
        n14: "",
        n15: "",
        n16: "",
        n17: "",
        n18: "",
        n19: "",
        n20: "",
        n21: "",
        n22: "",
        n23: "",
        n24: "",
        n25: "",
        n26: "",
        n27: "",
        AtmPressure: "",
        RefDenisty: "",
        ref_viscosity: "",
        ref_isentropic: "",
        StdCompression: "",
        OpeCompression: "",
        DenistyDeg20: "",
        LiquidExpansion: ""
      },
      */
      typelist: [
        {
          key: "1",
          value: "蒸汽",
          child: [
            //流体名称	下拉框	流体类型=蒸汽 时的下拉框内容：9过热蒸汽、10饱和蒸汽－温度、11饱和蒸汽－压力
            { key: "9", value: "过热蒸汽" },
            { key: "10", value: "饱和蒸汽－温度" },
            { key: "11", value: "饱和蒸汽－压力" }
          ]
        },
        { key: "2", value: "水" }
      ],
      namelist: [],
      //流量计名称 
      lljmclist: [
        { key: "1", value: "XXXX流量计名称" },
        { key: "2", value: "脉冲输出流量计" },
        { key: "3", value: "线性电流输出流量计" },
        { key: "4", value: "差压电流输出流量计" }
        
      ],
      //流量信号单位	选择项	m3/h  kg/h  t/h  Nm3/h  Hm3/h共5个选项
      llxhdwlist:[
        { key: "1", value: "m3/h" },
        { key: "2", value: "kg/h" },
        { key: "3", value: "t/h" },
        { key: "4", value: "Nm3/h" },
        { key: "5", value: "Hm3/h" }
        
      ],

      ysnumberlist: [
        { key: "1", value: "AGA-NX19" },
        { key: "2", value: "AGA8-92DC" },
        { key: "3", value: "AGA8-SGERG88" },
        { key: "4", value: "GB/T17747.2" },
        { key: "5", value: "GB/T17747.3-1999" }
        // "AGA8-92DC",
        // "AGA8-SGERG88",
        // "GB/T17747.2",
        // "GB/T17747.3-1999"
      ],
      jieliuNamelist: [
        { key: "1", value: "角接取压孔板" },
        { key: "2", value: "法兰取压孔板" },
        { key: "3", value: "D D/2 取压孔板" },
        { key: "4", value: "ISA1932喷嘴" },
        { key: "5", value: "长径喷嘴" },
        { key: "6", value: "粗铸收缩段文丘里" },
        { key: "7", value: "机械加工收缩段文丘里" },
        { key: "8", value: "粗焊铁板收缩段文丘里" },
        { key: "9", value: "文丘里喷嘴" },
        { key: "10", value: "1/4 圆孔板" },
        { key: "11", value: "锥形孔板" }
      ],
      pipeMatelist: [
        { key: "1", value: "10号钢" },
        { key: "2", value: "20号钢" },
        { key: "3", value: "不锈钢 1Cr18Ni9Ti" },
        { key: "4", value: "15号钢 A3" },
        { key: "5", value: "45号钢" },
        { key: "6", value: "灰口铸铁" },
        { key: "7", value: "12CrMoV" },
        { key: "8", value: "10CrMo910" },
        { key: "9", value: "12CrMo" },
        { key: "10", value: "1Cr13" },
        { key: "11", value: "2Cr13" },
        { key: "12", value: "Cr5Mo" },
        { key: "13", value: "Cr17" },
        { key: "14", value: "15CrMo" }
      ]
    };
  },
  created() {
    this.inputFrom.FlowMeter_Type = "2";
    if (!getToken()) {
      localStorage.setItem("post", this.$router.history.current.fullPath);
      this.$router.push("/");
    } else {
      detailCalc().then(res => {
        console.log(res);
        if (res && res.results && res.results.Fluid_Type) {
          this.inputFrom = res.results;
        }
      });
    }
  },
  methods: {
    onChange(val) {
      if (val === "7") { //7=天然气
        this.inputFrom.Yasuosuanfa = "1";
      }else{
        this.inputFrom.Yasuosuanfa = "";
      }

      this.typelist.map(item => {
        if (item.key === val) {
          if (item.child) {
            this.namelist = item.child;
          } else {
            this.namelist = [];
            this.inputFrom.SingleGasType = "";
          }
          return;
        }
      });
   
    },
    onChange_Yasuosuanfa(val){
      //console.log(" val === 1 => " + val === "1");
      //console.log("before this.inputFrom.Yasuosuanfa = " + this.inputFrom.Yasuosuanfa);
      this.inputFrom.Yasuosuanfa = val;
    },
    submit() {
      commonUtils.form.commonSubmit(this);
      /*
      this.$vux.loading.show({
        text: "提交中..."
      });
      addCalc(this.inputFrom)
        .then(result => {
          console.log(result);
          this.$store.commit("CALC_RES", result);
          this.$router.push("/calculate/result");
          this.$vux.loading.hide();
          this.clearData();
        })
        .catch(err => {
          this.$vux.loading.hide();
          this.clearData();
        });
        */
    },
    initData() {
      let inputFrom =  {
        type_uchar:"4", 
        Fluid_Type: "",
        SingleGasType: "",
        // mt_comp: "",
        // baohezhengqi_type: "1",
        Yasuosuanfa: "1",
        jieliu_zhuangzhi_uchar: "",
        guandao_koujing_set_float: "",
        guandao_caizhi_leixing_uchar: "",
        jieliujian_koujing_set_float: "",
        jieliujian_caizhi_leixing_uchar: "",
        dangdi_daqiya_float: "",
        gongzuo_yali_float: "",
        dangdi_daqiya_float:"",
        FlowMeter_Type:"",
        FlowInputUnit:"",
        DpLrv:"",
        DpUrv:"",
        DesignTemp:"",
        DesignPres:"",
        gongzuo_yali_float:"",
        AtmPressure:"",
        Gk_Sheshi_wendu_float:"",
        GasHumidity:"",
        Flow_Input_mA_float:"",
        RefTemp:"",
        RefPres:"",
        AtmPressure:"",
        RefDenisty:"",
        StdCompression:"",
        OpeCompression:"",
        PulseAverageFactor:"",
        m0: "",
        m1: "",
        m2: "",
        m3: "",
        m4: "",
        m5: "",
        m6: "",
        m7: "",
        m8: "",
        m9: "",
        m10: "",
        m11: "",
        m12: "",
        m13: "",
        m14: "",
        m15: "",
        m16: "",
        m17: "",
        m18: "",
        m19: "",
        n0: "",
        n1: "",
        n2: "",
        n3: "",
        n4: "",
        n5: "",
        n6: "",
        n7: "",
        n8: "",
        n9: "",
        n10: "",
        n11: "",
        n12: "",
        n13: "",
        n14: "",
        n15: "",
        n16: "",
        n17: "",
        n18: "",
        n19: "",
        n20: "",
        n21: "",
        n22: "",
        n23: "",
        n24: "",
        n25: "",
        n26: "",
        n27: "",
        AtmPressure: "",
        RefDenisty: "",
        ref_viscosity: "",
        ref_isentropic: "",
        StdCompression: "",
        OpeCompression: "",
        DenistyDeg20: "",
        LiquidExpansion: ""
      };
      return 

    },
    clearData() {
      this.inputFrom = this.initData();
      /*
      this.inputFrom = {
        Fluid_Type: "",
        SingleGasType: "",
        // mt_comp: "",
        // baohezhengqi_type: "1",
        yasuo_xishu_suanfa: "1",
        jieliu_zhuangzhi_uchar: "",
        guandao_koujing_set_float: "",
        guandao_caizhi_leixing_uchar: "",
        jieliujian_koujing_set_float: "",
        jieliujian_caizhi_leixing_uchar: "",
        dangdi_daqiya_float: "",
        FlowMeter_Type:"",
        FlowInputUnit:"",
        gongzuo_yali_float: "",
        Gk_Sheshi_wendu_float: "",
        GasHumidity: "",
        Pluse_Freq_Display_float: "",
        m0: "",
        m1: "",
        m2: "",
        m3: "",
        m4: "",
        m5: "",
        m6: "",
        m7: "",
        m8: "",
        m9: "",
        m10: "",
        m11: "",
        m12: "",
        m13: "",
        m14: "",
        m15: "",
        m16: "",
        m17: "",
        m18: "",
        m19: "",
        n0: "",
        n1: "",
        n2: "",
        n3: "",
        n4: "",
        n5: "",
        n6: "",
        n7: "",
        n8: "",
        n9: "",
        n10: "",
        n11: "",
        n12: "",
        n13: "",
        n14: "",
        n15: "",
        n16: "",
        n17: "",
        n18: "",
        n19: "",
        n20: "",
        n21: "",
        n22: "",
        n23: "",
        n24: "",
        n25: "",
        n26: "",
        n27: "",
        ref_temp: "",
        RefPres: "",
        AtmPressure: "",
        RefDenisty: "",
        ref_viscosity: "",
        ref_isentropic: "",
        StdCompression: "",
        OpeCompression: "",
        DenistyDeg20: "",
        LiquidExpansion: ""
      };
      */
    }
    // getValue(ref) {
    //   this.$vux.alert.show({
    //     title: "getFullValue",
    //     content: this.$refs[ref].getFullValue()
    //   });
    // }
  }
};
</script>
<style scoped lang="less">
.ltzfTitle {
  padding: 10px 15px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-weight: bold;
  &:before {
    // background: #fcf8fe;
    // margin: 10px 15px;
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #d9d9d9;
    color: #d9d9d9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
  }
}
</style>