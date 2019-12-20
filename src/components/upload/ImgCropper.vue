<template>
  <div class="cropper-content">
    <div class="cropper" style="text-align:center" :style="{height:height+'px'}">
      <vue-cropper autoCrop :img="imgUrl" ref="cropper" centerBox fixed :fixedNumber="[1,1]" />
    </div>
    <div class="cropper-button">
      <flexbox>
        <flexbox-item>
          <x-button type="default" @click.native="cancel">取消</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary" @click.native="finish">完成</x-button>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { Loading, Flexbox, FlexboxItem, XButton } from "vux";
import { uploadFile, updateMyInfo } from "@/api/service";
export default {
  name: "ImgCropper",
  components: {
    Loading,
    Flexbox,
    FlexboxItem,
    XButton
  },
  data() {
    return {
      height: window.screen.availHeight,
      imgUrl: this.$route.params.img
    };
  },
  created() {},
  methods: {
    cancel() {
      this.$router.push("/service/myinfo");
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    finish() {
      this.$vux.loading.show({
        text: "提交中..."
      });
      this.$refs.cropper.getCropBlob(data => {
        const now = new Date();
        const fileName = now.getTime()+".jpg";
        uploadFile(data,fileName).then(resule => {
          const obj = {
            avatarUrl: resule.imgUrl
          };
          updateMyInfo(obj)
            .then(result => {
              this.$vux.loading.hide();
              this.$router.push("/service/myinfo");
            })
            .catch(err => {
              this.$vux.loading.hide();
            });
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
// 截图
.cropper-content {
  position: relative;
  .cropper-button {
    padding: 0 20px;
    position: fixed;
    bottom: 20px;
    width: 100%;
  }
  .cropper {
    width: auto;
  }
  .show-preview {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    width: 70px;
    height: 50px;
    .preview {
      overflow: hidden; // border-radius: 50%;
      border: 1px solid #cccccc;
      background: #cccccc;
      margin-left: 40px;
    }
  }
}
</style>