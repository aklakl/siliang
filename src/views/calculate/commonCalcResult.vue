<template>
  <div class="Result">
    <!-- title -->
    <div class="title">
      <p>
        <span>北京思量测控设备有限公司</span>
      </p>
      <p>
        <span style="font-size:14px;">流量计量在线校准云计算平台</span>
      </p>
    </div>
    <!-- banner -->
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


    <!-- resultContent html dom-->
    <div id="resultContent">
      <!--
      <div class="subTitle">testTile</div>
      <div class="flex-box">
        <div class="vux-flexbox vux-flex-row" >
          <div class="vux-flexbox-item">
            <div class="flex-left" >
            <b>testleft工况密度</b>
            </div>
          </div>
          <div class="vux-flexbox-item">
            <div class="flex-right" >
              <span class="resNum"> testright </span>
            </div>
          </div>
        </div>
      </div>
      -->
    </div>

    <!--
    <div class="flex-right">
      <span class="resNum">{{resultObj.resultData}}</span>
    </div>
    {{resultObj}}
    -->

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
      vueClass:"data-v-bda26580",
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
    console.log("fnLoadData start");
    this.fnLoadData(this.calcRes.resultData);
    console.log("fnLoadData end");

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
    fnLoadData(result){
      console.log("fn_loadData.result="+JSON.stringify(result));
      //let vueClass= "data-v-bda26580";
      var datas = result;
      /*
      //test
      for(let i=0; i <datas.length;i++){
        let html = "<div "+vueClass+" class='subTitle'>流量计参数"+i+"</div>"
                 + "<div "+vueClass+" class='flex-box'> "+i+"</div>";
        jquery("#resultContent").append(html );
      }
      */
      
      for(let i=0; i <datas.length;i++){
        let htmlTitle = this.fnConcatenateTitle(datas[i]);
        jquery("#resultContent").append(htmlTitle);
        for(let j =0; j<datas[i].subitem.length;j++){
          let htmlBox = this.fnConcatenateBox(datas[i].subitem[j]);
          jquery("#resultContent").append(htmlBox);
        }
        //jquery("#resultContent").append(html);
      }
      console.log("fnLoadData Finish");
    },
    fnConcatenateTitle(data){
      let htmlTitle = "<div class='subTitle'>"+data["itemName"]+"</div>";
      //console.log("htmlTitle = "+ htmlTitle);
      let r = htmlTitle.replace(/class=/gi, ""+this.vueClass+" class=");
      //console.log("r = "+ r);
      return r;
    },
    fnConcatenateBox(data){
      let htmlBox = " <div class='flex-box'> "
                + "   <div class='vux-flexbox vux-flex-row' >"
                + "     <div class='vux-flexbox-item'>"
                + "       <div class='flex-left' >"
                + "         <b class='placeHolderforTest'>" +data["name"]+ "</b>"
                + "       </div>"
                + "     </div>"
                + "     <div class='vux-flexbox-item'>"
                + "       <div class='flex-right' >"
                + "         <span class='resNum'> "+ data["value"] +" " +data["unit"]+"</span>"
                + "       </div>"
                + "     </div>"
                + "   </div>"
                + " </div>";
      //console.log("htmlBox = "+ htmlBox);
      let r = htmlBox.replace(/class=/g, ""+this.vueClass+" class=");
      //console.log("r = "+ r);
      return r;
    },
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