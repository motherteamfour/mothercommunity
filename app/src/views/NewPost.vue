<template>
  <div class="newpost">
    <div class="top">
      <h3>我的帖子</h3>
    </div>
    <NewPosts></NewPosts>

  </div>
</template>

<script>
import NewPosts from '../components/MyPostLists';
export default {
  components: {
    NewPosts
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.newpost {
  width: 750px;
  height: 100vh;
  background: rgb(248, 248, 248);
  .top {
    width: 750px;
    height: 80px;
    background: @themeColor;
    padding-top: 40px;
    text-align: center;

    h3 {
      width: 100%;
      color: white;
      font-weight: 500;
      font-size: 36px;
      margin-bottom: 10px;
      letter-spacing: 2px;
      line-height: 80px;
    }
  }
}
</style>