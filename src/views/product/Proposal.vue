<template>
  <div class="product">
    <div v-html="detail" class="detail"></div>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import { shareWX } from "@/api/login";
import { getToken } from "@/utils/auth";
import { getProposal } from "@/api/product";
import {
  isweixin,
  getUserCode,
  getWXCode,
  getShareUserCode
} from "@/utils/weixin";
export default {
  name: "Proposal",
  data() {
    return {
      type: this.$route.params.type,
      detail: "",
      msgId: ""
    };
  },
  created() {},
  mounted() {
    this.proposal();
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
  },
  methods: {
    getWxJsSignatureInfo(openId) {
      let shareData = {
        title: "",
        imgUrl: ""
      };
      if (this.type === "resol") {
        shareData = {
          title: "解决方案",
          imgUrl: "https://m.bjslck.com/share/share_3.jpg"
        };
      } else if (this.type === "succ") {
        shareData = {
          title: "成功案例",
          imgUrl: "https://m.bjslck.com/share/share_4.jpg"
        };
      } else if (this.type === "use") {
        shareData = {
          title: "使用说明",
          imgUrl: "https://m.bjslck.com/share/share_5.jpg"
        };
      } else if (this.type === "about") {
        shareData = {
          title: "思考社会价值，量准工业流量",
          imgUrl: "https://m.bjslck.com/share/share_6.jpg"
        };
      } else if (this.type === "join") {
        shareData = {
          title: "加入我们",
          imgUrl: "https://m.bjslck.com/share/share_7.jpg"
        };
      }
      const data = {
        url: window.document.location.href,
        type: 2,
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
            desc: shareData.title, // 分享描述
            link: linkUrl, // 分享链接
            imgUrl: shareData.imgUrl,
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
            desc: shareData.title, // 分享描述
            link: linkUrl, // 分享链接
            imgUrl: shareData.imgUrl,
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
    },
    proposal() {
      getProposal(this.type).then(res => {
        this.detail = res.detailHtml;
        this.msgId = res.msgId;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.detail {
  padding: 20px;
  img {
    width: 100% !important;
  }
}
</style>
