<template>
  <div class="myInfo">
    <group>
      <cell title="头像" is-link @click.native="toUpdate('avatar')">
        <span slot class="avatar">
          <img :src="info.avatarUrl" alt v-if="info.avatarUrl" />
          <img src="@/assets/touxiang.png" alt v-else />
        </span>
        <input
          type="file"
          name="file"
          accept="image/*"
          style="display:none"
          @change="changeImage($event)"
          ref="avatarInput"
        />
      </cell>
      <cell title="昵称" :value="info.nickName" is-link @click.native="toUpdate('nickName')"></cell>
      <cell title="手机号" :value="info.mobile" is-link @click.native="toUpdate('mobile')"></cell>
      <cell title="公司名称" :value="info.company" is-link @click.native="toUpdate('company')"></cell>
      <cell title="积分" :value="info.score" is-link @click.native="toUpdate('points')"></cell>
      <cell title="会员类型" :value="changeName(userType,info.type)"></cell>
    </group>
    <div style="padding: 15px 15px 0;">
      <x-button v-if="!isSign||isSign===0" @click.native="toSign" type="primary">签到</x-button>
      <x-button v-if="isSign===1" disabled>已签到</x-button>
    </div>
    <div style="padding: 15px;">
      <x-button @click.native="logout">退出</x-button>
    </div>
  </div>
</template>

<script>
import { Group, Cell, XButton } from "vux";
import { getMyinfo, getIssign, Sign } from "@/api/service";
import { userType, changeName } from "@/utils/selectList";
import { getToken } from "@/utils/auth";
export default {
  name: "MyInfo",
  components: {
    Group,
    Cell,
    XButton
  },
  data() {
    return {
      userType,
      info: {},
      isSign: 0
    };
  },
  created() {
    // alert(getToken())
    if (getToken()) {
      this.getInfo();
      this.getSign();
    } else {
      localStorage.setItem("post", this.$router.history.current.fullPath);
      this.$router.push('/');
    }
  },
  methods: {
    changeName,
    getInfo() {
      getMyinfo().then(res => {
        this.info = res;
      });
    },
    getSign() {
      getIssign().then(res => {
        this.isSign = res.issign;
      });
    },
    toSign() {
      Sign().then(res => {
        this.getInfo();
        this.getSign();
      });
    },
    toUpdate(val) {
      if (val === "avatar") {
        this.$refs.avatarInput.click();
      } else if (val === "nickName") {
        this.$router.push({
          name: "UpdateInfo",
          query: { type: "nickName" },
          params: { nickName: this.info.nickName }
        });
      } else if (val === "company") {
        this.$router.push({
          name: "UpdateInfo",
          query: { type: "company" },
          params: { company: this.info.company }
        });
      } else if (val === "mobile") {
        this.$router.push({
          name: "UpdatePhone"
        });
      } else if (val === "points") {
        this.$router.push({
          name: "GetPoints"
        });
      }
    },
    changeImage(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      var that = this;
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        that.$router.push({
          name: "ImgCropper",
          params: { img: e.target.result }
        });
      };
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.myInfo {
  // background: #f4f4f4;
  .avatar {
    border-radius: 50%;
    img {
      width: 45px;
      height: 45px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
}
</style>