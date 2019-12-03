<template>
  <div class="reply">
    <div class="top">
      <span class="goback" @click="goback()">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </span>
      <h3>我的收藏</h3>
      <span>
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
      </span>
    </div>
    <nav>
      <router-link to="/collect" ><div>帖子</div></router-link>
      <router-link to="/collect/collqa"><div>问答</div></router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    goback() {
      this.$router.push('/my')
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
  .reply {
  width: 750px;
  height: 100vh;
  background: rgb(248, 248, 248);
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
 nav {
  width: 710px;
  height: 80px;
  border-bottom: 1px solid gainsboro;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 36px;
  div {
    color: @themeColor;
    border-bottom: 6px solid @themeColor;
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
}
  
</style>