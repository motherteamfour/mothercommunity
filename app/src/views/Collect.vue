<template>
  <div class="banner">
    <div class="top">
      
        <h3>我的收藏</h3>
    
      <div class="menubar">
        <div>
          <span class="post">帖子</span>
        </div>
        <div>
          <span class="queans">问答</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
  .top {
    width: 750px;
    height: 160px;
    background: @themeColor;
    padding-top: 40px;
    text-align: center;
    h3 {
      width: 100%;
      color: white;
      font-weight: 500;
      font-size: 36px;
      margin-bottom: 10px;
    }
    .menubar {
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: nowrap;
      color: white;
      span {
        display: inline-block;
        padding: 0 10px 10px 10px;
        border-bottom: 3px solid red;
      }
    } 
  }
  .post:click {
    border-bottom: green;
  }
  .queans:click {
    border-bottom: green;
  }
  
</style>