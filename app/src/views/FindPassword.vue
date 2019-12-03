<template>
  <div class="find-password">
    <div class="header">
      <div class="status-bar"></div>
      <div class="navigation">登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FindPassword"
};
</script>
<style lang="less" scoped>
@import "../assets/style/base.less";
.header {
  .status-bar,
  .navigation {
    width: 100%;
    background-color: @themeColor;
  }
  .status-bar {
    height: 40px;
  }
  .navigation {
    height: 88px;
    line-height: 88px;
    color: white;
    text-align: center;
    font-size: 36px;
  }
}
</style>