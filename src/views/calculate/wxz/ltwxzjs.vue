<template>
  <div class="input">
    <div class="title">流体物性值计算</div>
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
      <selector
        v-if="inputFrom.Fluid_Type==='7'"
        placeholder="请选择"
        v-model="inputFrom.Yasuosuanfa"
        @on-change="onChange_Yasuosuanfa"
        title="压缩系数算法"
        name="name"
        :options="ysnumberlist"
        direction="rtl"
        text-align="right"
      ></selector>

      <cell
        v-if="inputFrom.Fluid_Type==='5'"
        title="流体组份"
        class="ltzfTitle"
      ></cell>

      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m0"
        title="空气Air"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m1"
        title="氮气N2"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m2"
        title="氧气O2"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m3"
        title="氦气He"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m4"
        title="氢气H2"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m5"
        title="氩气Ar"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m6"
        title="一氧化碳CO"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m7"
        title="二氧化碳CO2"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m8"
        title="硫化氢H2S"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m9"
        title="氨气NH3"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m10"
        title="甲烷CH4"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m11"
        title="乙烷C2H6"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m12"
        title="丙烷C3H8"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m13"
        title="丁烷C4H10"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m14"
        title="乙烯C2H4"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m15"
        title="乙炔C2H2"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m16"
        title="丙烯C3H6"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m17"
        title="丁烯C4H8"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='5'"
        v-model="inputFrom.m18"
        title="氯气CL2"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>

      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n0"
        title="甲烷"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n1"
        title="乙烷"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n2"
        title="丙烷"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n3"
        title="正丁烷"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n4"
        title="异丁烷"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n5"
        title="正戊烷"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n6"
        title="异戊烷"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n7"
        title="2.2-甲基丙烷"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n8"
        title="己烷"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n9"
        title="2-甲基戊烷"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n10"
        title="3-甲基戊烷"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n11"
        title="2.2-甲基丁烷"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n12"
        title="2.3-甲基丁烷"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n13"
        title="庚烷"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n14"
        title="辛烷"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n15"
        title="环己烷"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n16"
        title="甲基环己烷"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n17"
        title="苯"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n18"
        title="甲苯C7H8"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n19"
        title="氢气H2"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n20"
        title="一氧化碳CO"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n21"
        title="硫化氢H2S"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n22"
        title="氦气He"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n23"
        title="氩气Ar"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n24"
        title="氮气N2"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n25"
        title="氧气O2"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n26"
        title="二氧化碳CO2"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-if="inputFrom.Fluid_Type==='7'&&inputFrom.Yasuosuanfa==='1'"
        v-model="inputFrom.n27"
        title="水蒸汽H2O"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
  <!--
      <selector
        placeholder="请选择"
        v-model="inputFrom.jieliu_zhuangzhi_uchar"
        title="节流件名称"
        name="name"
        :options="jieliuNamelist"
        direction="rtl"
        text-align="right"
      ></selector>
      <x-input
        v-model="inputFrom.guandao_koujing_set_float"
        title="20℃管道内径"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
        show-clear
      >
        <span slot="right" class="unitSpan">mm</span>
      </x-input>
      <selector
        placeholder="请选择"
        v-model="inputFrom.guandao_caizhi_leixing_uchar"
        title="管道材质"
        name="name"
        :options="pipeMatelist"
        text-align="right"
        direction="rtl"
      ></selector>
      <x-input
        v-model="inputFrom.jieliujian_koujing_set_float"
        title="20℃节流件开孔直径"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
        label-width="150px"
      >
        <span slot="right" class="unitSpan">mm</span>
      </x-input>
      <selector
        placeholder="请选择"
        v-model="inputFrom.jieliujian_caizhi_leixing_uchar"
        title="节流件材质"
        name="name"
        :options="pipeMatelist"
        text-align="right"
        direction="rtl"
      ></selector>
      -->
      
    </group>
    <br />
    <div class="title">工艺参数</div>
    <group>
      <selector
        readonly
        placeholder="请选择"
        v-model="inputFrom.FlowMeter_Type"
        title="流量计名称"
        name="name"
        :options="lljmclist"
        direction="rtl"
        text-align="right"
      ></selector>
      <selector
        readonly
        placeholder="请选择"
        v-model="inputFrom.FlowInputUnit"
        title="流量信号单位"
        name="name"
        :options="llxhdwlist"
        direction="rtl"
        text-align="right"
      ></selector>
      

      <x-input
        v-model="inputFrom.DpLrv"
        title="流量信号下量程"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">$inputFrom.FlowInputUnit</span>
      </x-input>
      <x-input
        v-model="inputFrom.DpUrv"
        title="流量信号上量程"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">$inputFrom.FlowInputUnit</span>
      </x-input>
      <x-input
        v-model="inputFrom.DesignTemp"
        title="设计温度"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">℃</span>
      </x-input>
      <x-input
        v-model="inputFrom.DesignPres"
        title="设计压力（表压）"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">MPa</span>
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
        v-if="inputFrom.fluid_type==='4'|| inputFrom.fluid_type==='5'||inputFrom.fluid_type==='6'"
        v-model="inputFrom.GasHumidity"
        title="湿度"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">%</span>
      </x-input>
      <x-input
        v-model="inputFrom.Flow_Input_mA_float"
        title="流量信号电流值"
        placeholder="请输入(大于等于4)"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">mA</span>
      </x-input>
      <x-input
        v-model="inputFrom.RefTemp"
        title="参比温度"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">℃</span>
      </x-input>
      <x-input
        v-model="inputFrom.RefPres"
        title="参比压力（绝压）"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">MPa</span>
      </x-input>
      <x-input
        v-model="inputFrom.AtmPressure"
        title="大气压"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">MPa</span>
      </x-input>
      <x-input
        v-model="inputFrom.RefDenisty"
        title="参比密度"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">kg/m3</span>
      </x-input>
      <x-input
        v-model="inputFrom.StdCompression"
        title="标况压缩系数"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      ></x-input>
      <x-input
        v-model="inputFrom.OpeCompression"
        title="工况压缩系数"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      ></x-input>
      <x-input
        v-model="inputFrom.DenistyDeg20"
        title="20℃液体密度"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">kg/m3</span>
      </x-input>
      <x-input
        v-model="inputFrom.LiquidExpansion"
        title="体胀系数"
        placeholder="请输入"
        placeholder-align="right"
        text-align="right"
      >
        <span slot="right" class="unitSpan">10^-3</span>
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
      typelist: [
        {
          //1蒸汽、2、水、3其它液体、4标准气体、5混合气体、6其他气体、7天然气
          key: "1",
          value: "蒸汽",
          child: [
            { key: "9", value: "过热蒸汽" },
            { key: "10", value: "饱和蒸汽－温度" },
            { key: "11", value: "饱和蒸汽－压力" }
          ]
          //流体类型=蒸汽 时的下拉框内容:8过热蒸汽、9饱和蒸汽－温度、10饱和蒸汽－压力
        },
        { key: "2", value: "水" },
        {
          key: "3",
          value: "其他液体"
        },
        {
          key: "4",
          value: "单一气体",
          child: [
            { key: "1", value: "空气" },
            { key: "2", value: "氮气" },
            { key: "3", value: "氧气" },
            { key: "4", value: "二氧化碳" },
            { key: "5", value: "一氧化碳" },
            { key: "6", value: "氢气" },
            { key: "7", value: "氩气" },
            { key: "8", value: "氯气" }
          ]
        },
        { key: "5", value: "混合气体" },

        { key: "6", value: "其它气体" },
        {
          key: "7",
          value: "天然气"
        }
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
    clearData() {
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