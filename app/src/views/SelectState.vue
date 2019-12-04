<template>
  <div class="select-state">
    <div class="header">
      <div class="status-bar"></div>
      <div class="navigation">
        <i class="fa fa-angle-left" @click="back"></i>状态编辑
      </div>
    </div>
    <!-- 状态选择 -->
    <div class="state-wrap">
      <div class="state-title">
        <a
          href="javascript:;"
          @click="com='PreparePregnancy'"
          :class="{on: com=='PreparePregnancy'}"
        >备孕中</a>
        <a href="javascript:;" @click="com='Pregnancy'" :class="{on: com=='Pregnancy'}">怀孕中</a>
        <a href="javascript:;" @click="com='Born'" :class="{on: com=='Born'}">已出生</a>
      </div>
      <keep-alive>
        <!-- is 等于哪个组件名，就在这渲染哪个组件 -->
        <component :is="com"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import PreparePregnancy from "../components/PreparePregnancy";
import Pregnancy from "../components/Pregnancy";
import Born from "../components/Born";

export default {
  name: "SelectState",
  components: {
    PreparePregnancy,
    Pregnancy,
    Born
  },
  data() {
    return {
      com: "PreparePregnancy"
    };
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/style/base.less";
.header {
  // margin: 0 30px;
  padding: 0 30px;
  background-color: @themeColor;
  .status-bar {
    height: 40px;
  }
  .navigation {
    height: 88px;
    line-height: 88px;
    color: white;
    text-align: center;
    font-size: 36px;
    .fa-angle-left {
      font-size: 80px;
      vertical-align: top;
      color: #ccc;
      float: left;
    }
  }
}
.state-wrap {
  background-color: #f5f5f5;
  height: 100vh;
  // padding: 0 30px;
}
.state-title {
  height: 120px;
  padding: 0 30px;
  background-color: #f1f1f1;
  align-items: center;
  justify-content: space-around;
  display: flex;
  a {
    width: 200px;
    height: 70px;
    line-height: 70px;
    color: white;
    border-radius: 35px;
    text-align: center;
    background-color: #d4d4d4;
    font-size: 26px;
    &.on {
      background-color: @themeColor;
    }
  }
}
</style>