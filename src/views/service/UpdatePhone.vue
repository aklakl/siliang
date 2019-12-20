<template>
  <div>
    <group style="padding-right: 15px;">
      <x-input
        placeholder="请输入新手机号"
        v-model.trim="updateFrom.phone"
        ref="phone"
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
      <x-input placeholder="请输入验证码" ref="code" v-model.number="updateFrom.code"></x-input>
    </group>
    <div style="padding:15px;">
      <flexbox>
        <flexbox-item>
          <x-button type="default" @click.native="cancel">取消</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary" @click.native="submitHandle">确认</x-button>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { Group, XInput, Flexbox, FlexboxItem, XButton } from "vux";
import { updatePhone } from "@/api/service";
import { getCheckCode } from "@/api/login";
export default {
  name: "UpdatePhone",
  components: {
    Group,
    XInput,
    Flexbox,
    FlexboxItem,
    XButton
  },
  data() {
    return {
      updateFrom: {
        phone: "",
        code: ""
      },
      sendAuthCode: true /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */,
      auth_time: 0 /*倒计时 计数器*/
    };
  },
  created() {},
  methods: {
    cancel() {
      this.$router.push("/service/myinfo");
    },
        // 验证
    getCode() {
      if (!this.updateFrom.phone || !this.$refs.phone.valid) {
        this.$vux.toast.text("手机号格式有误");
      } else {
        this.loading = true;
        getCheckCode("change", this.updateFrom.phone)
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
    submitHandle() {
      if (!this.updateFrom.phone || !this.$refs.phone.valid) {
        this.$vux.toast.text("手机号格式有误");
      } else if (!this.updateFrom.code || isNaN(this.updateFrom.code)) {
        this.$vux.toast.text("验证码格式有误");
      } else {
        this.$vux.loading.show({
          text: "提交中..."
        });
        updatePhone(this.updateFrom)
          .then(result => {
            this.$vux.loading.hide();
            this.$router.push("/service/myinfo");
          })
          .catch(err => {
            this.$vux.loading.hide();
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>