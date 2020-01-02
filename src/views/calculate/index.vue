<template>
  <div class="calcIndex">
    <div class="media" @click="toInput">
      <div class="media-left">
        <img src="@/assets/WechatIMG1015.jpeg" class="img" alt />
      </div>
      <div class="media-body business-content">
        <h3>标准节流装置——差压计算流量</h3>
        <p>输入节流装置参数、差压、温度、压力、计算流量</p>
      </div>
    </div>
    <div class="media" @click="toCrscyllj">
      <div class="media-left">
        <img src="@/assets/WechatIMG1016.jpeg" class="img" alt />
      </div>
      <div class="media-body business-content">
        <h3>插入式差压流量计——差压计算流量</h3>
        <p>输入流量计参数、差压、温度、压力、计算流量</p>
      </div>
    </div>
    <div class="media" @click="toMcscllj">
      <div class="media-left">
        <img src="@/assets/calc3.png" class="img" alt />
      </div>
      <div class="media-body business-content">
        <h3>脉冲输出流量计</h3>
        <p>输入流量计参数、脉冲值、温度、压力、计算流量</p>
      </div>
    </div>
    <div class="media" @click="toXxdlscllj">
      <div class="media-left">
        <img src="@/assets/calc4.png" class="img" alt />
      </div>
      <div class="media-body business-content">
        <h3>线性电流输出流量计</h3>
        <p>输入流量计参数、电流信号值、温度、压力、计算流量</p>
      </div>
    </div>
    <group>
      <!-- <cell title="流量计算" is-link @click.native="toInput"></cell> -->
      <cell title="流体物性值计算" ></cell>
          <div class="media" @click="tip">
            <div class="media-left">
              <img src="@/assets/WechatIMG1016.jpeg" class="img" alt />
            </div>
            <div class="media-body business-content">
              <h3>水蒸汽计算</h3>
              <p>输入流量计参数、电流信号值、温度、压力、计算流量</p>
            </div>
          </div>

          <div class="media" @click="tip">
            <div class="media-left">
              <img src="@/assets/WechatIMG1016.jpeg" class="img" alt />
            </div>
            <div class="media-body business-content">
              <h3>天然气计算</h3>
              <p>输入流量计参数、电流信号值、温度、压力、计算流量</p>
            </div>
          </div>

          <div class="media" @click="tip">
            <div class="media-left">
              <img src="@/assets/WechatIMG1016.jpeg" class="img" alt />
            </div>
            <div class="media-body business-content">
              <h3>其它气体、液体物性值计算</h3>
              <p>输入流量计参数、电流信号值、温度、压力、计算流量</p>
            </div>
          </div>

      <cell title="流量计设计计算" is-link @click.native="tip"></cell>
      <!--
      设计计算 标准节流装置 流量计算差压
      设计计算 标准节流装置 流量计算开孔径
      设计计算 皮托式流量计 流量计算差压
      -->
      <cell title="流量工程师工具箱" is-link @click.native="tip"></cell>
    </group>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import { Alert, Group, Cell } from "vux";
import { shareWX } from "@/api/login";
import { getToken } from "@/utils/auth";
import {
  isweixin,
  getUserCode,
  getWXCode,
  getShareUserCode
} from "@/utils/weixin";
export default {
  name: "index",
  components: {
    Alert,
    Cell,
    Group
  },
  data() {
    return {
      show2: false
    };
  },
  created() {},
  mounted() {
    if (getToken()) {
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
    tip() {
      this.$vux.alert.show({
        title: "温馨提示",
        content: "功能正在测试中..."
        // onShow() {
        //   console.log("Plugin: I'm showing");
        // },
        // onHide() {
        //   console.log("Plugin: I'm hiding now");
        // }
      });
    },
    toInput() {
      this.$router.push("/calculate/input");
    },
    toCrscyllj() {
      //插入式差压流量计  crscyllj
      this.$router.push("/calculate/crscyllj");
    },
    toMcscllj(){
      //脉冲输出流量计  mcscllj
      this.$router.push("/calculate/mcscllj");
    },
    toXxdlscllj(){
      //线性电流输出流量计  xxdlscllj
      this.$router.push("/calculate/xxdlscllj");
    },
    getWxJsSignatureInfo(openId) {
      const data = {
        url: window.document.location.href,
        type: 0,
        msgId: 0,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.no-data {
  padding: 0 10px 20px;
  text-align: center;
}
.calcIndex {
  padding: 15px;
  line-height: 24px;
  color: #666666;
  .media {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px 5px;
    border-bottom: 1px solid #f6f6f6;
    position: relative;
  }
}
.media-body,
.media-left,
.media-right {
  display: inline-block;
  vertical-align: top;
}
.media-left {
  width: 80px;
  height: 80px;
  .img {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    // border-radius: 8px;
    object-fit: cover;
  }
}

.business-content {
  width: 63%;
  padding-left: 10px;
  // padding-bottom: 30px;
  color: #999999;
  font-size: 12px;

  h3 {
    color: #333333;
    font-size: 15px;
    padding: 0;
    margin: 0;
  }
  p {
    padding: 0;
    margin: 0;
  }
  .price {
    color: #ff4141;
    font-size: 15px;
    font-weight: bold;
  }
}
</style>
