<template>
  <div class="compa">
      <div class="left">
        <div class="portrait"></div>
      </div>
      <div class="middle">
        <span class="remind">给你点赞的人的名字</span>
        <span class="state">备孕中</span>
        <span class="content">攒了你的帖子</span>
        <span class="timee">时间</span>
      </div>
      <div class="right">
        <div class="title"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: "InfoComm"
}
</script>

<style lang="less" scoped>
.compa {
    width: 710px;
    height: 200px;
    background: white;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    border-radius: 20px;
    margin-top: 20px;
    .left {
      width: 100px;

      display: flex;
      justify-content: center;
      .portrait {
        width: 80px;
        height: 80px;
        background: pink;
        border-radius: 50%;
        margin-top: 10px;
      }
    }
    .middle {
      width: 400px;
      display: flex;
      flex-direction: column;
      .remind {
        font-size: 30px;
        color: black;
        height: 60px;
        line-height: 60px;
      }
      .state,
      .timee {
        font-size: 20px;
        color: gray;
      }
      .content {
        font-size: 30px;
        height: 60px;
        line-height: 60px;
        color: rgb(105, 105, 105);
      }
    }
    .right {
    
      display: flex;
      justify-content: center;
      
      .title {
        width: 160px;
        height: 160px;
        background: rgb(247, 245, 245);
        margin-top: 20px;
        border-radius: 20px;
      }
    }
  }
</style>