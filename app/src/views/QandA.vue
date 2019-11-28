<template>
  <div class="q-and-a">
    <div class="top">轮播图</div>
    <div class="main">
      <div class="one">
        <div class="ask">
          <i class="fa fa-pencil-square-o"></i>
        </div>
        <div class="search"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QandA"
};
</script>
<style lang="less" scoped>
@import "../assets/style/base.less";
.q-and-a {
  width: 100%;

  .top {
    width: 100%;
    height: 400px;
  }
  .main {
    width: 100%;

    .one {
      padding: 0 30px;
      display: flex;
      justify-content: space-between;

      .ask,
      .search {
        height: 150px;
        width: 330px;
        background-color: @themeColor;
        border-radius: 20px;
      }
      .ask {
        background-color: #f0f4fe;
        font-size: #7591d5;
      }
      .search {
        background-color: #fcf0f0;
        color: #ef90a0;
      }
    }
  }
}
</style>