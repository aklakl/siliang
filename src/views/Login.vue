<template>
  <div class="loginBg">
    <div class="reg-main">
      <div class="logo">
        <img src="@/assets/logo.jpg" height="70px" alt />
      </div>
      <group style="padding-right: 15px;">
        <x-input
          placeholder="请输入手机号"
          v-model.trim="regFrom.mobile"
          ref="mobile"
          is-type="china-mobile"
        >
          <span slot="right" v-if="!sendAuthCode">{{auth_time}}s 后重新获得</span>
          <span
            slot="right"
            @click="getCode"
            v-if="sendAuthCode"
            style="cursor: pointer;color:#666666"
          >获取验证码</span>
        </x-input>
        <!-- :is-type="validCode" -->
        <x-input placeholder="请输入验证码" ref="code" v-model.number="regFrom.code"></x-input>
      </group>
      <div class="reg-button">
        <x-button @click.native="regHandle" type="primary">同意协议并登录</x-button>
        <!-- <p @click="toAgreement" style="margin-top:20px;cursor: pointer;">账户密码登录</p> -->
      </div>
    </div>
    <div class="reg-foot">
      <divider>其他登录方式</divider>
      <svg-icon icon-class="weixin" @click.native="winxinLogin"></svg-icon>
      <p>
        注册/登录即代表同意
        <span style="text-decoration: underline;">《思量用户使用协议》</span>
      </p>
    </div>
    <div v-transfer-dom>
      <loading :show="loading" text></loading>
    </div>
  </div>
</template>

<script>
import {
  Divider,
  Alert,
  Loading,
  XInput,
  Group,
  XButton,
  TransferDomDirective as TransferDom
} from "vux";
import { getCheckCode } from "@/api/login";
import { isweixin, getUserCode, getWXCode } from "@/utils/weixin";
export default {
  name: "login",
  components: {
    Divider,
    Alert,
    Loading,
    XInput,
    Group,
    XButton
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      loading: false,
      regFrom: {
        mobile: "",
        code: ""
      },
      // validCode: function (value) {
      //   return {
      //     valid: value.length === 4,
      //     msg: '验证码不正确'
      //   }
      // },
      // validPass: function(value) {
      //   var re = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      //   //判断字符串是否为数字和字母组合
      //   return {
      //     valid: re.test(value),
      //     msg: "6-20字母数字组合!"
      //   };
      // },
      sendAuthCode: true /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */,
      auth_time: 0 /*倒计时 计数器*/
    };
  },
  created() {
    if (getWXCode("code")) {
      this.$store.dispatch("WXLogin", getWXCode("code")).then(() => {
        if (localStorage.getItem("post")) {
          this.$router.push(localStorage.getItem("post"));
        } else {
          this.$router.push({ name: "index" });
        }
      });
    }
  },
  methods: {
    winxinLogin() {
      if (isweixin()) {
        getUserCode();
      }
    },
    // 验证
    getCode() {
      if (!this.regFrom.mobile || !this.$refs.mobile.valid) {
        this.$vux.toast.text("手机号格式有误");
      } else {
        this.loading = true;
        getCheckCode("login", this.regFrom.mobile)
          .then(response => {
            this.loading = false;
            this.sendAuthCode = false;
            this.auth_time = 60;
            var auth_timetimer = setInterval(() => {
              this.auth_time--;
              if (this.auth_time <= 0) {
                this.sendAuthCode = true;
                clearInterval(auth_timetimer);
              }
            }, 1000);
          })
          .catch(err => {
            this.loading = false;
          });
      }
    },
    regHandle() {
      if (!this.regFrom.mobile || !this.$refs.mobile.valid) {
        this.$vux.toast.text("手机号格式有误");
      } else if (!this.regFrom.code || isNaN(this.regFrom.code)) {
        this.$vux.toast.text("验证码格式有误");
      } else {
        this.loading = true;
        this.$store
          .dispatch("Login", this.regFrom)
          .then(() => {
            this.loading = false;
             console.log(this.$route.params , this.$route.params.redirect)
            if (this.$route.params && this.$route.params.redirect) {
              this.$router.push({ path: this.$route.params.redirect });
            } else {
              this.$router.push({ name: "index" });
            }
          })
          .catch(() => {
            this.loading = false;
          });
      }
    }
    // toAgreement() {
    //   this.$router.push({ name: "agreement" });
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.loginBg {
  padding: 15px;
  background: #ffffff;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;

  .reg-main {
    flex: 1 0 auto;
  }
  .logo {
    margin-top: 30%;
    width: 100%;
    text-align: center;
  }
  .weui-cell {
    height: 55px;
    font-size: 1.5rem;
  }
  .reg-button {
    padding: 30px 15px 10px;
    text-align: center;
    color: #666;
    .weui-btn:after {
      border: none;
    }
  }
  .reg-foot {
    text-align: center;
    color: #c7cacc;
    flex: 0 0 auto;
    margin-bottom: 50px;
    font-size: 13px;
    .vux-divider {
      color: #999999;
    }
    .svg-icon {
      font-size: 40px;
      color: #333333;
      border: 1px solid rgb(221, 219, 219);
      border-radius: 50%;
      padding: 8px;
      margin: 15px 15px 20px;
    }
  }
}
</style>
