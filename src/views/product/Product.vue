<template>
  <div class="product">
    <div class="business-list">
      <!-- <p style="text-align:center;" v-if="serviceLoading">
        <inline-loading></inline-loading>
        <span style="vertical-align:middle;display:inline-block;font-size:14px;">加载中</span>
      </p>-->
      <!-- <div class="no-data" v-if="servicelist.length===0">暂无数据</div> -->
      <div>
        <scroller
          lock-x
          @on-scroll-bottom="onScrollBottom"
          ref="scrollerBottom"
          :scroll-bottom-offst="200"
        >
          <div class="no-data" v-if="proList.length===0">暂无数据</div>
          <div class="box2" v-else>
            <div
              class="media"
              @click="toDetail(item.productId)"
              v-for="(item,index) in proList"
              :key="index"
            >
              <div class="media-left">
                <img :src="item.imgUrl" class="img" alt />
              </div>
              <div class="media-body business-content">
                <h3>{{item.title}}</h3>
                <p>{{item.summary}}</p>
              </div>
            </div>
            <load-more tip="加载中" v-if="onFetching"></load-more>
            <divider v-if="isLast">已经到底啦</divider>
          </div>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import { shareWX } from "@/api/login";
import { getToken } from "@/utils/auth";
import {
  isweixin,
  getUserCode,
  getWXCode,
  getShareUserCode
} from "@/utils/weixin";
import { Scroller, Divider, LoadMore } from "vux";
import { getProList } from "@/api/product";
export default {
  name: "Product",
  components: {
    Scroller,
    Divider,
    LoadMore
  },
  data() {
    return {
      page: {
        pageNo: 1,
        pageSize: "10"
      },
      proList: [],
      onFetching: false,
      isLast: true
    };
  },
  created() {},
  mounted() {
    this.page.pageNo = 1;
    this.getList();
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({ top: 0 });
    });
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
      const data = {
        url: window.document.location.href,
        type: 1,
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
            desc: "产品介绍", // 分享描述
            link: linkUrl, // 分享链接
            imgUrl: "https://m.bjslck.com/share/share_2.jpg",
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
            desc: "产品介绍", // 分享描述
            link: linkUrl, // 分享链接
            imgUrl: "https://m.bjslck.com/share/share_2.jpg",
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
    getList() {
      getProList(this.page).then(res => {
        this.proList.push(...res.productList);
        this.isLast = res.isLast;
        this.onFetching = false;
      });
    },
    toDetail(id) {
      window.location.href = "/detail/" + id;
    },
    onScrollBottom() {
      if (this.onFetching || this.isLast) {
        // do nothing
      } else {
        this.onFetching = true;
        setTimeout(() => {
          this.page.pageNo = Number(this.page.pageNo) + 1;
          this.getList();
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset();
          });
          if (this.isLast) {
            this.onFetching = false;
          }
        }, 2000);
      }
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
.business-list {
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
  width: 35%;
  height: 90px;
  .img {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    // border-radius: 8px;
    // object-fit: cover;
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
