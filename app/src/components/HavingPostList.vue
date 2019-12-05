<template>
  <div class="lists">
    <div class="lis">
      <div class="title">{{user.postTitle}}</div>
      <div class="content">{{user.postContent}}</div>
      <div class="user">
        <img :src="'http://172.16.6.38:8989/'+user.user.userImgUrl" class="imgs" alt />

        <span class="username">{{user.user.userName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"]
};
</script>

<style lang="less" scoped>
.lists{
  width: 750px;
  height: 100vh;
  background: greenyellow;
}
.lis {
  width: 710px;
  height: 150px;

  border: 1px solid red;
  padding-left: 20px;
  margin: 10px auto;
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
      width: 30px;
      height: 30px;
      background: red;
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
</style>