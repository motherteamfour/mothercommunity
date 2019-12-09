<template>
  <div class="listss">
    <div class="lis">
      <div class="title">{{user.postTitle}}</div>
      <div class="content">{{user.postContent}}</div>
      <div class="user">
        <img :src="imgUrl+user.user.userImgUrl" class="imgs" alt />

        <span class="username">{{user.user.userName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data () {
    return {
      imgUrl: ""
    }
  },
  created() {
    this.imgUrl = this.$store.state.imgUrl;
  }
};
</script>

<style lang="less" scoped>
.listss{
  width: 650px;
  height: 100vh;
  /* background: greenyellow; */
  .lis {
  width: 690px;
  height: 150px;
  background: white;
 /*  border: 1px solid red; */
  padding-left: 20px;
  margin: 15px auto;
  border-radius: 30px;
  box-shadow: 0 0 10px rgb(245, 223, 227);
  .title {
  }
  .content {
    font-size: 30px;
    color: gray;
  }
  .user {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    .imgs {
      display: inline-block;
      width: 40px;
      height: 40px;
      border: 1px solid red;
      border-radius: 50px;
    }
    .username {
      font-size: 20px;
      margin-left: 10px;

      height: 30px;
      line-height: 30px;
    }
  }
}
}

</style>