<template>
  <div class="lists">
    <div class="title">title</div>
    <div class="content">content</div>
    <div class="user">
      <span class="imgs"></span>
      <span class="username">name</span>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
  .lists{
    width: 750px;
    height: 150px;
    background: yellow;
    padding-left: 20px;
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