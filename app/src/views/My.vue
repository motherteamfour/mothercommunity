<template>
  <div class="my">
    <div class="top">
      <h3>我的</h3>

      <div class="user">
        <div class="portrait">
          <p>头像</p>
          <!-- <img src="" alt=""> -->
        </div>
        <span class="username">辣妈676879</span><br>
        <span class="state">备孕中</span>
        <span class="address">四川 成都</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "My"
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.my {
  width: 750px;
  height: 100vh;
  background: rgb(248, 248, 248);
  overflow: hidden;
  .top {
    padding-top: 20px;
    width: 100%;
    height: 300px;
    background: @themeColor;
    border-bottom-left-radius: 460px 200px;
    border-bottom-right-radius: 460px 200px;
    h3 {
      text-align: center;
      color: white;
      font-weight: 300;
    }
    .user {
      width: 750px;
      height: 180px;
      /* background: greenyellow; */
      margin-top: 50px;
      .portrait {
        width: 180px;
        height: 180px;
        background: white;
        border-radius: 50%;
        float: left;
        margin-left: 130px;
        margin-top: -26px;
        margin-right: 20px;
       /*  position: absolute;
        left: 60px;
        top: 140px; */
        p {
          text-align: center;
          line-height: 180px;
        }
      }
      .username {
        font-size: 40px;
        color: white;
      }
      .state {
        font-size: 34px;
        color: white;
      }
      .address {
        font-size: 30px;
        color: white;
        display: inline-block;
        width: 200px;
        margin-left: 50px;
      }
    }
  }
}
</style>