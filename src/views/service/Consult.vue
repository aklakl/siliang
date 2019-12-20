<template>
  <div class="consult">
    <group-title>现场环境</group-title>
    <img v-if="filesList.length<9" src="@/assets/addImg.png" class="addImg" @click="toUpload" />
    <input
      type="file"
      name="file"
      style="display:none"
      accept="image/*"
      multiple
      @change="changeImage($event)"
      ref="imageInput"
    />
    <div v-if="filesList.length>0">
      <ul class="my-gallery">
        <li v-for="(item,index) in filesList" :key="index">
          <div class="img-wapper">
            <x-icon type="ios-close" size="25" @click="removeImg(index)"></x-icon>
            <img class="previewer-demo-img" :src="item.src" @click="show(index)" />
          </div>
        </li>
      </ul>
      <div class="length">{{filesList.length}}/9</div>
    </div>
    <div v-transfer-dom>
      <previewer :list="filesList" ref="previewer" :options="options"></previewer>
    </div>
    <group>
      <x-textarea
        v-model="quesForm.param"
        placeholder="请输入您需要的产品参数"
        :show-counter="false"
        :rows="3"
        autosize
      ></x-textarea>
      <x-input v-model="quesForm.company" placeholder="请输入单位名称"></x-input>
      <x-input
        v-model.trim="quesForm.mobile"
        ref="mobile"
        is-type="china-mobile"
        placeholder="请输入您的联系电话，我们会尽快和您联系"
      ></x-input>
    </group>
    <div style="padding: 15px 15px 0;">
      <x-button @click.native="toQuestion" type="primary">咨询</x-button>
    </div>
    <img src="@/assets/phone.png" alt class="phoneImg" />
  </div>
</template>

<script>
import {
  Previewer,
  TransferDom,
  Flexbox,
  FlexboxItem,
  XTextarea,
  Group,
  XInput,
  XButton,
  GroupTitle
} from "vux";
import { uploadFile, question } from "@/api/service";
import { getToken } from "@/utils/auth";
export default {
  name: "Consult",
  directives: {
    TransferDom
  },
  components: {
    Previewer,
    Flexbox,
    FlexboxItem,
    XTextarea,
    Group,
    XInput,
    XButton,
    GroupTitle
  },
  data() {
    return {
      quesForm: {
        imgUrl: [],
        param: "",
        company: "",
        mobile: ""
      },
      filesList: [],
      interval: "",
      options: {
        getThumbBoundsFn(index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll(".previewer-demo-img")[
            index
          ];
          // get window scroll Y
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect();
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    };
  },
  created() {
    if (!getToken()) {
     localStorage.setItem('post', this.$router.history.current.fullPath)
     this.$router.push('/');
    }
  },
  methods: {
    toQuestion() {
      if (!this.quesForm.mobile || !this.$refs.mobile.valid) {
        this.$vux.toast.text("手机号格式有误");
      } else {
        this.$vux.loading.show({
          text: "提交中..."
        });
        this.filesList.forEach(item => {
          this.quesForm.imgUrl.push(item.src);
        });
        question(this.quesForm)
          .then(result => {
            this.$vux.loading.hide();
            this.filesList = [];
            this.quesForm = {
              imgUrl: [],
              param: "",
              company: "",
              mobile: ""
            };
          })
          .catch(err => {
            this.$vux.loading.hide();
            this.filesList = [];
            this.quesForm = {
              imgUrl: [],
              param: "",
              company: "",
              mobile: ""
            };
          });
      }
    },
    toUpload() {
      this.$refs.imageInput.click();
    },
    changeImage(e) {
      let files = e.target.files;
      if (files.length <= 0) {
        this.$vux.toast.text("请选择图片");
        return;
      } else if (files.length > 9 - this.filesList.length) {
        this.$vux.toast.text("最多上传9张图片");
        return;
      } else {
        for (var i = 0; i < files.length; i++) {
          const now = new Date();
          const fileName = now.getTime() + i + ".jpg";
          uploadFile(files[i], fileName).then(resule => {
            this.$nextTick(() => {
              this.filesList.push({ src: resule.imgUrl });
            });
          });
        }
        clearInterval(this.interval);
      }
    },
    removeImg(index) {
      this.filesList.splice(index, 1);
    },
    show(index) {
      this.$refs.previewer.show(index);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.consult {
  padding: 20px 0;
  .phoneImg {
    width: 80%;
    margin-top: 30px;
  }
  .addImg {
    width: 100px;
    margin: 15px 0 0 15px;
  }
  .length {
    font-size: 15px;
    text-align: right;
    margin-right: 20px;
  }
  //css代码
  .my-gallery {
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;
    margin-left: 10px;
    li {
      width: 30%;
      margin: 5px;
      // overflow: hidden;
      position: relative;
      .vux-x-icon {
        fill: #f70968;
        position: absolute;
        right: -5px;
        top: -5px;
        z-index: 5;
      }
    }
    .img-wapper {
      position: relative;
      padding-top: 100%; //重要的就是这个padding-top: 100%
    }
    .svg-icon {
      font-size: 80px;
    }

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 1px solid #f0eeee;
    }
  }
}
</style>