<template>
  <div class="Result">
    <div class="title">
      <p>
        <span>北京思量测控设备有限公司</span>
      </p>
      <p>
        <span style="font-size:14px;">流量计量在线校准云计算平台</span>
      </p>
    </div>
    <div class="flex-box">
      <flexbox>
        <flexbox-item :span="4">
          <div class="flex-left">
            <span style="font-size:18px;">流量计算结果</span>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="time">计算日期：{{resultObj.time}}</span>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="subTitle">流量计参数</div>
    <div class="flex-box">
      <flexbox>
        <flexbox-item>
          <div class="flex-left">
            <b>节流件名称</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{changeKeyName(jieliuNamelist,resultObj.jieliu_zhuangzhi)}}</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="flex-left">
            <b>管道内径D20</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.guandao_koujing}}(mm)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="flex-left">
            <b>节流件开孔直径d20</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.jieliujian_koujing}}(mm)</span>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="subTitle">工艺参数</div>
    <div class="flex-box">
      <flexbox v-if="resultObj.single_gas_type">
        <flexbox-item>
          <div class="flex-left">
            <b>流体名称</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{getName(resultObj.single_gas_type)}}</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.gk_sheshi_wendu">
        <flexbox-item>
          <div class="flex-left">
            <b>工作温度</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.gk_sheshi_wendu}}(℃)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.gongzuo_yali">
        <flexbox-item>
          <div class="flex-left">
            <b>工作压力(表压)</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.gongzuo_yali}}(MPa)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="flex-left">
            <b>节流件差压值</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.gongkuang_chaya}}(Pa)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.atm_pressure">
        <flexbox-item>
          <div class="flex-left">
            <b>当地大气压</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.atm_pressure}}(MPa)</span>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="subTitle">计算结果</div>
    <div class="flex-box">
      <flexbox>
        <flexbox-item>
          <div class="flex-left">
            <b>
              工况体积流量q
              <SUB>v</SUB>
            </b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.tiji_liuliang}}(m3/h)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.biaokuang_liuliang_0">
        <flexbox-item>
          <div class="flex-left">
            <b>
              0度标况体积流量q
              <SUB>v0</SUB>
            </b>
          </div>
        </flexbox-item>
        <flexbox-item :span="4">
          <div class="flex-right">
            <span class="resNum">{{resultObj.biaokuang_liuliang_0}}(Nm3/h)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.biaokuang_liuliang_20">
        <flexbox-item>
          <div class="flex-left">
            <b>
              20度标况体积流量q
              <SUB>v20</SUB>
            </b>
          </div>
        </flexbox-item>
        <flexbox-item :span="4">
          <div class="flex-right">
            <span class="resNum">{{resultObj.biaokuang_liuliang_20}}(Hm3/h)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="flex-left">
            <b>
              质量流量q
              <SUB>m</SUB>
            </b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.zhiliang_liuliang}}(kg/h)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.zhengqi_hanzhi">
        <flexbox-item>
          <div class="flex-left">
            <b>焓值</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.zhengqi_hanzhi}}(MJ/h)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="flex-left">
            <b>工况密度</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.zhengqi_midu}}(kg/m3)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.dszs">
        <flexbox-item>
          <div class="flex-left">
            <b>体积发热量</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.dszs}}(MJ/m3)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="flex-left">
            <b>雷诺数</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.red_xishu}}</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="flex-left">
            <b>流出系数C</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.liuchu_xishu}}</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="flex-left">
            <b>可膨胀系数</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.kepengzhang_xishu}}</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="flex-left">
            <b>粘度</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.jiezhi_niandu}}(mPa.s)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="flex-left">
            <b>等熵指数</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.dszs}}</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="flex-left">
            <b>节流件压力损失</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.yasun}}(Pa)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="flex-left">
            <b>不确定度</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.buquedingshu}}</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.e_double">
        <flexbox-item>
          <div class="flex-left">
            <b>
              能量流量q
              <SUB>E</SUB>
            </b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.e_double}}(MJ/h)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.natural_gas_oc_fz">
        <flexbox-item>
          <div class="flex-left">
            <b>工况压缩系数</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.natural_gas_oc_fz}}</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m0">
        <flexbox-item>
          <div class="flex-left">
            <b>空气Air</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m0}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m1">
        <flexbox-item>
          <div class="flex-left">
            <b>氮气N2</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m1}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m2">
        <flexbox-item>
          <div class="flex-left">
            <b>氧气O2</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m2}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m3">
        <flexbox-item>
          <div class="flex-left">
            <b>氦气He</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m3}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m4">
        <flexbox-item>
          <div class="flex-left">
            <b>氢气H2</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m4}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m5">
        <flexbox-item>
          <div class="flex-left">
            <b>氩气Ar</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m5}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m6">
        <flexbox-item>
          <div class="flex-left">
            <b>一氧化碳CO</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m6}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m7">
        <flexbox-item>
          <div class="flex-left">
            <b>二氧化碳CO2</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m7}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m8">
        <flexbox-item>
          <div class="flex-left">
            <b>硫化氢H2S</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m8}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m9">
        <flexbox-item>
          <div class="flex-left">
            <b>氨气NH3</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m9}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m10">
        <flexbox-item>
          <div class="flex-left">
            <b>甲烷CH4</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m10}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m11">
        <flexbox-item>
          <div class="flex-left">
            <b>乙烷C2H6</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m11}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m12">
        <flexbox-item>
          <div class="flex-left">
            <b>丙烷C3H8</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m12}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m13">
        <flexbox-item>
          <div class="flex-left">
            <b>丁烷C4H10</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m13}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m14">
        <flexbox-item>
          <div class="flex-left">
            <b>乙烯C2H4</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m14}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m15">
        <flexbox-item>
          <div class="flex-left">
            <b>乙炔C2H2</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m15}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m16">
        <flexbox-item>
          <div class="flex-left">
            <b>丙烯C3H6</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m16}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m17">
        <flexbox-item>
          <div class="flex-left">
            <b>丁烯C4H8</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m17}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.m18">
        <flexbox-item>
          <div class="flex-left">
            <b>氯气CL2</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.m18}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n0">
        <flexbox-item>
          <div class="flex-left">
            <b>甲烷</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n0}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n1">
        <flexbox-item>
          <div class="flex-left">
            <b>乙烷</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n1}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n2">
        <flexbox-item>
          <div class="flex-left">
            <b>丙烷</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n2}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n3">
        <flexbox-item>
          <div class="flex-left">
            <b>正丁烷</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n3}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n4">
        <flexbox-item>
          <div class="flex-left">
            <b>异丁烷</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n4}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n5">
        <flexbox-item>
          <div class="flex-left">
            <b>正戊烷</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n5}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n6">
        <flexbox-item>
          <div class="flex-left">
            <b>异戊烷</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n6}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n7">
        <flexbox-item>
          <div class="flex-left">
            <b>2.2-甲基丙烷</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n7}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n8">
        <flexbox-item>
          <div class="flex-left">
            <b>己烷</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n8}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n9">
        <flexbox-item>
          <div class="flex-left">
            <b>2-甲基戊烷</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n9}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n10">
        <flexbox-item>
          <div class="flex-left">
            <b>3-甲基戊烷</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n10}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n11">
        <flexbox-item>
          <div class="flex-left">
            <b>2.2-甲基丁烷</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n11}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n12">
        <flexbox-item>
          <div class="flex-left">
            <b>2.3-甲基丁烷</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n12}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n13">
        <flexbox-item>
          <div class="flex-left">
            <b>庚烷</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n13}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n14">
        <flexbox-item>
          <div class="flex-left">
            <b>辛烷</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n14}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n15">
        <flexbox-item>
          <div class="flex-left">
            <b>环己烷</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n15}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n16">
        <flexbox-item>
          <div class="flex-left">
            <b>甲基环己烷</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n16}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n17">
        <flexbox-item>
          <div class="flex-left">
            <b>苯</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n17}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n18">
        <flexbox-item>
          <div class="flex-left">
            <b>甲苯C7H8</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n18}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n19">
        <flexbox-item>
          <div class="flex-left">
            <b>氢气H2</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n19}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n20">
        <flexbox-item>
          <div class="flex-left">
            <b>一氧化碳CO</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n20}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n21">
        <flexbox-item>
          <div class="flex-left">
            <b>硫化氢H2S</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n21}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n22">
        <flexbox-item>
          <div class="flex-left">
            <b>氦气He</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n22}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n23">
        <flexbox-item>
          <div class="flex-left">
            <b>氩气Ar</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n23}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n24">
        <flexbox-item>
          <div class="flex-left">
            <b>氮气N2</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n24}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n25">
        <flexbox-item>
          <div class="flex-left">
            <b>氧气O2</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n25}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n26">
        <flexbox-item>
          <div class="flex-left">
            <b>二氧化碳CO2</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n26}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.n27">
        <flexbox-item>
          <div class="flex-left">
            <b>水蒸汽H2O</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.n27}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox v-if="resultObj.wdt_reset">
        <flexbox-item>
          <div class="flex-left">
            <b>湿度</b>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-right">
            <span class="resNum">{{resultObj.wdt_reset}}(%)</span>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import { shareWX } from "@/api/login";
import { shareWXResult } from "@/api/calculate";
import { Flexbox, FlexboxItem } from "vux";
import { mapGetters } from "vuex";
import { changeKeyName } from "@/utils/selectList";
import {
  isweixin,
  getUserCode,
  getWXCode,
  getShareUserCode
} from "@/utils/weixin";
export default {
  name: "Result",
  components: {
    Flexbox,
    FlexboxItem
  },
  computed: {
    ...mapGetters(["calcRes"])
  },
  data() {
    return {
      pp: this.$route.query.pp,
      msgId: "",
      resultObj: Object,
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
      typelist: [
        {
          key: "1",
          value: "蒸汽",
          child: [
            { key: "9", value: "过热蒸汽" },
            { key: "10", value: "饱和蒸汽-温度" },
            { key: "11", value: "饱和蒸汽-压力" }
          ]
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
      ]
    };
  },
  mounted() {
    if (this.pp) {
      shareWXResult(this.pp).then(res => {
        this.msgId = res.msgId;
        this.resultObj = res.results;
        if (!localStorage.getItem("openId")) {
          if (isweixin()) {
            if (!getWXCode("code")) {
              getShareUserCode();
            } else {
              this.$store.dispatch("WXLogin", getWXCode("code")).then(res => {
                window.document.location.reload();
              });
            }
          }
        } else {
          this.getWxJsSignatureInfo(localStorage.getItem("openId"));
        }
      });
    } else {
      this.msgId = this.calcRes.msgId;
      this.resultObj = this.calcRes;
      if (!localStorage.getItem("openId")) {
        if (isweixin()) {
          if (!getWXCode("code")) {
            getShareUserCode();
          } else {
            this.$store.dispatch("WXLogin", getWXCode("code")).then(res => {
              window.document.location.reload();
            });
          }
        }
      } else {
        this.getWxJsSignatureInfo(localStorage.getItem("openId"));
      }
    }
  },
  methods: {
    changeKeyName,
    getName(val) {
      let name = "";
      this.typelist.forEach(item => {
        if (item.key === this.resultObj.fluid_type) {
          name = changeKeyName(item.child, val);
        }
      });
      return name;
    },
    getWxJsSignatureInfo(openId) {
      const data = {
        url: window.document.location.href,
        type: 0,
        msgId: this.msgId,
        openId: openId
      };
      shareWX(data).then(res => {
        let linkUrl = res.shareUrl;
        wx.config({
          // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: "wxe167dc1911e20130", // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名，见附录1
          jsApiList: [
            "onMenuShareAppMessage",
            "onMenuShareTimeline",
            "updateTimelineShareData",
            "updateAppMessageShareData"
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          //当前客户端版本是否支持指定JS接口,分享到朋友圈,分享给朋友
        });
        wx.ready(function() {
          //朋友圈
          wx.updateTimelineShareData({
            title: "北京思量测控设备有限公司", // 分享标题
            desc: "流量计量云算平台", // 分享描述
            link: linkUrl, // 分享链接
            imgUrl: "https://m.bjslck.com/share/share_1.jpg",
            success: function(res) {
              // alert("分享成功");
            },
            cancel: function(res) {
              // alert('已取消');
            },
            fail: function(res) {
              // alert(JSON.stringify(res));
            }
          });

          //朋友
          wx.updateAppMessageShareData({
            title: "北京思量测控设备有限公司", // 分享标题
            desc: "流量计量云算平台", // 分享描述
            link: linkUrl, // 分享链接
            imgUrl: "https://m.bjslck.com/share/share_1.jpg",
            success: function(res) {
              // alert("分享成功");
            },
            cancel: function(res) {
              // alert('已取消');
            },
            fail: function(res) {
              // alert(JSON.stringify(res));
            }
          });
        });
      });
    }
  }
};
</script>
<style scoped lang="less">
.Result {
  .title {
    margin: 15px;
    text-align: center;
    color: #00ae66;
    font-weight: bold;
    font-size: 16px;
    p {
      line-height: 25px;
    }
  }
  .subTitle {
    background: #00ae66;
    color: #ffffff;
    font-weight: bold;
    font-size: 14px;
    padding: 5px 10px;
    margin-bottom: 10px;
  }
  .flex-box {
    padding: 0 15px;
    margin-bottom: 10px;
  }
  .flex-left {
    text-align: left;
    .time {
      font-size: 12px;
      color: #00ae66;
    }
  }
  .flex-right {
    text-align: right;
    .resNum {
      color: #999999;
    }
  }
}
</style>