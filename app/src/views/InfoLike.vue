<template>
  <div class="resource">
    <div class="top">
      <span class="goback" @click="goback()">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </span>
      <h3>获赞</h3>
      <span></span>
    </div>
    <GetLikeList></GetLikeList>
  </div>
</template>

<script>
import GetLikeList from '../components/GetLikeList';
export default {
  components: {
    GetLikeList
  },
  methods: {
     goback() {
      this.$router.push('/infomation');
    }
   }
}
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.resource {
  width: 750px;
  height: 100vh;
  background:rgb(248, 248, 248);
}
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
</style>