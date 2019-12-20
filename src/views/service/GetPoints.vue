<template>
  <div class="points">
    <h2>怎么获得积分</h2>
    <p style="position: relative;">
      1、签到一次获得10个积分
      <x-button
        class="button"
        mini
        v-if="!isSign||isSign===0"
        @click.native="toSign"
        type="primary"
      >签到</x-button>
      <x-button class="button" v-if="isSign===1" disabled>已签到</x-button>
    </p>
    <p style="position: relative;">
      2、晒产品一次获得50个积分
      <x-button mini class="button" @click.native="toNext('M')" type="primary">晒产品</x-button>
    </p>
    <p>3、注册用户可获得1000个积分</p>
    <p>4、购买产品可获得积分：</p>
    <div style="text-indent: 25px;">
      <p>一台流量计算机产品 获得100个积分</p>
      <p>一台一体化产品 获得300个积分</p>
      <p>一台皮托产品 获得400个积分</p>
    </div>
    <p style="position: relative;">
      5、在线咨询获得50个积分
      <x-button mini class="button" @click.native="toNext('C')" type="primary">在线咨询</x-button>
    </p>
    <h2>积分怎么用</h2>
    <p>
      积分可用于兑换礼品，兑换礼品请联系思量测控客服
      <br />联系电话 010-61516260
    </p>
  </div>
</template>

<script>
import { XButton } from "vux";
import { getIssign, Sign } from "@/api/service";
import { getToken } from "@/utils/auth";
export default {
  name: "GetPoints",
  components: {
    XButton
  },
  data() {
    return {
      isSign: 0
    };
  },
  created() {
    if (getToken()) {
      this.getSign();
    } else {
      localStorage.setItem("post", this.$router.history.current.fullPath);
      this.$router.push('/');
    }
  },
  methods: {
    getSign() {
      getIssign().then(res => {
        this.isSign = res.issign;
      });
    },
    toSign() {
      Sign().then(res => {
        this.getSign();
      });
    },
    toNext(val) {
      if (val === "M") {
        this.$router.push({
          name: "Moments"
        });
      } else if (val === "C") {
        this.$router.push({
          name: "Consult"
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.points {
  padding: 20px;
  p {
    line-height: 3em;
  }
  h2 {
    text-align: center;
  }
  .button {
    position: absolute;
    top: 0;
    right: 20px;
    width: 110px;
    line-height: 2em !important;
  }
}
</style>
