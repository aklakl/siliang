<template>
  <div class="moments">
    <div v-if="isMy!=3" style=" margin-bottom: 15px;">
      <group-title>宝贝满足您的期待吗？说说你的使用心得</group-title>
      <x-button class="momentsButton" mini @click.native="toSubmit" type="primary">发送</x-button>
      <group>
        <selector
          placeholder="请选择"
          v-model="momentForm.product"
          text-align="right"
          title="产品名称"
          name="type"
          :value-map="['title', 'title']"
          :options="namelist"
          direction="rtl"
        ></selector>
        <x-input
          title="测量介质"
          text-align="right"
          v-model="momentForm.media"
          placeholder="请输入"
          placeholder-align="right"
        ></x-input>
        <x-input
          title="管道规格"
          text-align="right"
          v-model="momentForm.specs"
          placeholder="请输入"
          placeholder-align="right"
        ></x-input>
        <x-input
          title="工作温度"
          text-align="right"
          v-model="momentForm.temperature"
          placeholder="请输入"
          placeholder-align="right"
        ></x-input>
        <x-input
          title="工作压力"
          text-align="right"
          v-model="momentForm.pressure"
          placeholder="请输入"
          placeholder-align="right"
        >
          <span slot="right" class="unitSpan">MPa</span>
        </x-input>
        <x-input
          title="流量范围"
          text-align="right"
          v-model="momentForm.range"
          placeholder="请输入"
          placeholder-align="right"
        ></x-input>
        <x-textarea
          v-model="momentForm.param"
          text-align="right"
          placeholder="请说说您的使用心得"
          :show-counter="false"
          :rows="3"
          autosize
        ></x-textarea>
      </group>
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
      <div v-if="filesList.length>0" style="margin-top:15px;">
        <ul class="my-gallery">
          <li v-for="(item,index) in filesList" :key="index">
            <div class="img-wapper">
              <x-icon type="ios-close" size="25" @click="removeImg(index)"></x-icon>
              <img class="previewer-demo-img" :src="item.src" @click="show(filesList,index)" />
            </div>
          </li>
        </ul>
        <div class="length">{{filesList.length}}/9</div>
      </div>
    </div>
    <div style="border-top:1px solid #eceaea;text-align: right;">
      <x-button v-if="isMy===3||isMy===2" class="myMoment" mini @click.native="toMoment('all')">全部晒图</x-button>
      <x-button v-if="isMy===1" class="myMoment" mini @click.native="toMoment('my')">我的晒图</x-button>
    </div>

    <div class="comment-list">
      <div class="comment-con" v-for="(item,index) in momentList" :key="index">
        <!-- <div class="comment-headPic" @click="toMoment('other',item.uid)">
            <b>{{item.nickname}}</b>
        </div>-->
        <div class="comment-text">
          <h3 @click="toMoment('other',item.uid)">
            <b>{{item.nickname}}</b>
          </h3>
          <p>
            <b>产品名称：</b>
            {{item.product}}
          </p>
          <p>
            <b>测量介质：</b>
            {{item.media}}
          </p>
          <p>
            <b>管道规格：</b>
            {{item.specs}}
          </p>
          <p>
            <b>工作温度：</b>
            {{item.temperature}}
          </p>
          <p>
            <b>工作压力：</b>
            {{item.pressure}}Mpa
          </p>
          <p>
            <b>流量范围：</b>
            {{item.rangeinfo}}
          </p>
          <p>{{item.summary}}</p>
          <ul class="my-gallery">
            <li v-for="(i,inx) in item.imgUrls" :key="inx">
              <div class="img-wapper">
                <img
                  class="previewer-demo-img"
                  v-if="i"
                  :src="i"
                  @click="show(item.imgUrls,inx,'m')"
                />
              </div>
            </li>
          </ul>
          <p>{{item.time}}</p>
        </div>
      </div>
    </div>
    <infinite-loading spinner="waveDots" direction="bottom" @infinite="infiniteHandler">
      <div slot="no-results">
        <load-more :show-loading="false" background-color="#fbf9fe"></load-more>
      </div>
    </infinite-loading>
    <div v-transfer-dom>
      <previewer :list="previewerList" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>


<script>
import InfiniteLoading from "vue-infinite-loading";
import {
  Previewer,
  TransferDom,
  Flexbox,
  FlexboxItem,
  XTextarea,
  Group,
  XInput,
  XButton,
  GroupTitle,
  Selector,
  LoadMore
} from "vux";
import {
  uploadFile,
  allProName,
  addMoments,
  shareList,
  selfList,
  otherList
} from "@/api/service";
import { getToken } from "@/utils/auth";
export default {
  name: "Moments",
  directives: {
    TransferDom
  },
  components: {
    InfiniteLoading,
    Previewer,
    Flexbox,
    FlexboxItem,
    XTextarea,
    Group,
    XInput,
    XButton,
    GroupTitle,
    Selector,
    LoadMore
  },
  data() {
    return {
      namelist: [],
      momentForm: {
        imgUrl: [],
        param: "",
        product: "",
        media: "",
        specs: "",
        temperature: "",
        pressure: "",
        range: ""
      },
      filesList: [],
      previewerList: [],
      interval: "",
      page: {
        pageNo: 1,
        pageSize: "10"
      },
      momentList: [],
      onFetching: false,
      isLast: true,
      otherId: "",
      isMy: 1, //1 全部 // 2 我的 //3 其他人
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
    // alert(getToken())
    if (getToken()) {
      this.page.pageNo = 1;
      this.getProName();
      this.getList();
    } else {
      localStorage.setItem('post', this.$router.history.current.fullPath)
      this.$router.push('/');
    }
  },
  methods: {
    infiniteHandler($state) {
      if (this.isLast) {
        $state.complete();
      } else {
        this.page.pageNo = Number(this.page.pageNo) + 1;
        if (this.isMy === 1) {
          this.getList();
        } else if (this.isMy === 2) {
          this.getMyList();
        } else if (this.isMy === 3) {
          if (otherId) {
            this.getOtherList(this.otherId);
          }
        }
        $state.loaded();
        if (this.isLast) {
          $state.complete();
        }
      }
    },
    getList() {
      shareList(this.page).then(res => {
        this.momentList.push(...res.shareList);
        this.isLast = res.isLast;
      });
    },
    getMyList() {
      selfList(this.page).then(res => {
        this.momentList.push(...res.shareList);
        this.isLast = res.isLast;
      });
    },
    getOtherList(id) {
      otherList(id, this.page).then(res => {
        this.momentList.push(...res.shareList);
        this.isLast = res.isLast;
      });
    },
    toMoment(val, id) {
      if (val === "all") {
        this.isMy = 1;
        this.momentList = [];
        this.page.pageNo = 1;
        this.getList();
      } else if (val === "my") {
        this.isMy = 2;
        this.momentList = [];
        this.page.pageNo = 1;
        this.getMyList();
      } else if (val === "other") {
        if (id) {
          this.isMy = 3;
          this.momentList = [];
          this.page.pageNo = 1;
          this.getOtherList(id);
        }
      }
    },
    getProName() {
      allProName().then(res => {
        this.namelist = res.productList;
      });
    },
    toSubmit() {
      if (
        this.filesList &&
        this.filesList.length > 0 &&
        this.momentForm.param &&
        this.momentForm.product &&
        this.momentForm.media &&
        this.momentForm.range &&
        this.momentForm.specs &&
        this.momentForm.temperature &&
        this.momentForm.pressure
      ) {
        this.$vux.loading.show({
          text: "提交中..."
        });
        this.filesList.forEach(item => {
          this.momentForm.imgUrl.push(item.src);
        });
        addMoments(this.momentForm)
          .then(result => {
            this.$vux.loading.hide();
            this.filesList = [];
            this.momentForm = {
              imgUrl: [],
              param: "",
              product: "",
              media: "",
              specs: "",
              temperature: "",
              pressure: "",
              range: ""
            };
            this.momentList = [];
            this.page.pageNo = 1;

            if (this.isMy === 2) {
              this.getMyList();
            } else if (this.isMy === 1) {
              this.getList();
            }
          })
          .catch(err => {
            this.$vux.loading.hide();
            this.filesList = [];
            this.momentForm = {
              imgUrl: [],
              param: "",
              product: "",
              media: "",
              specs: "",
              temperature: "",
              pressure: "",
              range: ""
            };
          });
      } else {
        this.$vux.toast.text("您有未填项，请补全信息再发送");
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
    show(list, index, tag) {
      if ((tag = "m")) {
        list.map(item => {
          if (item) {
            this.previewerList.push({ src: item });
          }
        });
      } else {
        this.previewerList = list;
      }
      this.$refs.previewer.show(index);
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
.moments {
  background: #ffffff;
  padding: 20px 0;
  position: relative;
  .momentsButton {
    position: absolute;
    right: 20px;
    top: 25px;
    line-height: 2em !important;
  }
  .myMoment {
    margin: 15px 20px 0 0;
    line-height: 2em !important;
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
    margin-left: 10px;
    li {
      width: 28%;
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
  .comment-list {
    padding: 0 20px;
    .comment-con {
      padding: 10px 0;
      position: relative;
      .comment-headPic,
      .comment-text {
        vertical-align: top;
        display: inline-block;
      }
    }
    .rater {
      position: absolute;
      right: 0;
    }
    .comment-headPic {
      cursor: pointer;
      width: 35px;
      height: 35px;
      overflow: hidden;
      // background: #e5e5e5;
      // border-radius: 50%;

      img {
        display: block;
        width: auto;
        height: 100%;
        margin: 0 auto;
        border-radius: 50%;
        object-fit: cover;
        z-index: 1;
      }
    }
    .comment-text {
      width: 80%;
      line-height: 30px;
      h3 {
        margin: 0;
        padding: 0;
        font-size: 1.5rem;
      }
      .yellow {
        color: #ffc600;
      }
    }
  }
}
</style>