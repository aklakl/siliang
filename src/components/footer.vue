<template>
  <div class="footer">
    <div class="mint-popup" style="left:10px;z-index: 2001;">
      <ul>
        <li>流量计算</li>
        <li>物性值计算</li>
        <li style=" border-bottom:none">设计计算</li>
      </ul>
    </div>
    <tab>
      <tab-item>流量计算</tab-item>
      <tab-item selected>产品计算</tab-item>
      <tab-item>服务计算</tab-item>
    </tab>
  </div>
</template>

<script>
import { Tab, TabItem, Tabbar, TabbarItem } from "vux";
export default {
  name: "footer",
  components: {
    Tab,
    TabItem,
    Tabbar,
    TabbarItem
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #ddd;
  .vux-tab-item {
    background: #f7f7fa;
  }
}
.mint-popup {
  position: fixed;
  bottom: 50px;
  background: #f7f7fa;
  border: 1px solid #ddd;
  width: 35%;
  // padding: 5px 0;
  li {
    text-align: center;
    border-bottom: 1px solid #ddd;
    line-height: 25px;
    padding: 10px;
  }
}
.mint-popup:before {
  display: inline-block;
  width: 0;
  height: 0;
  border: solid transparent;
  border-width: 10px;
  border-top-color: #ddd;
  content: "";
  position: absolute;
  bottom: -20px;
  left: 45%;
}
</style>
