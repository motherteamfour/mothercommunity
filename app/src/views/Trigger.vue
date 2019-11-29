<template>
  <div class="resource">
    <div class="top">
      <span class="goback" @click="goback()">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </span>
      <h3>当前状态选择</h3>
      <span></span>
    </div>
    <div class="mainbody">
      <div class="middle">
        <div class="prepare">sss</div>
        <div>
          <div class="proceed">bbb</div>
          <div class="birth">xxx</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";

.top {
  width: 750px;
  height: 80px;
  background: @themeColor;
  padding-top: 40px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  h3 {
    /* width: 80%; */
    width: 70%;
    color: white;
    font-weight: 500;
    font-size: 36px;
    /*  margin-bottom: 10px; */
    letter-spacing: 2px;
    /* line-height: 80px; */
  }
  i {
    color: white;
    font-size: 54px;
  }
}
.mainbody {
  width: 100%;
  height: calc(100vh - 160px);
  background: gainsboro;
  display: flex;
  justify-content: center;
  align-items: center;
  .middle {
    width: 600px;
    height: 600px;
    background: gold;
  }
}
</style>