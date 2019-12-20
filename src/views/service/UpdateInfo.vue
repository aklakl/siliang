<template>
  <div>
    <group>
      <x-input title="昵称" v-if="type==='nickName'" v-model="infoFrom.nickName" placeholder="请输入"></x-input>
      <x-input title="公司" v-if="type==='company'" v-model="infoFrom.company" placeholder="请输入"></x-input>
    </group>
    <div style="padding:15px;">
      <flexbox>
        <flexbox-item>
          <x-button type="default" @click.native="cancel">取消</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary" @click.native="submit">确认</x-button>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { Group, XInput, Flexbox, FlexboxItem, XButton } from "vux";
import { updateMyInfo } from "@/api/service";
export default {
  name: "UpdateInfo",
  components: {
    Group,
    XInput,
    Flexbox,
    FlexboxItem,
    XButton
  },
  data() {
    return {
      type: this.$route.query.type,
      infoFrom: {
        nickName: this.$route.params.nickName,
        company: this.$route.params.company
      }
    };
  },
  created() {},
  methods: {
    cancel() {
      this.$router.push("/service/myinfo");
    },
    submit() {
      if (this.type === "nickName") {
        if (!this.infoFrom.nickName) {
          this.$vux.toast.text("昵称不能为空");
        } else {
          this.update();
        }
      } else if (this.type === "company") {
        if (!this.infoFrom.company) {
          this.$vux.toast.text("公司名不能为空");
        } else {
          this.update();
        }
      }
    },
    update() {
      this.$vux.loading.show({
        text: "提交中..."
      });
      updateMyInfo(this.infoFrom)
        .then(result => {
          this.$vux.loading.hide();
          this.$router.push("/service/myinfo");
        })
        .catch(err => {
          this.$vux.loading.hide();
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>