<template>
  <div class="reply">
    <div class="top">
      <h3>我的回复</h3>
    </div>
    <ul>
      <li>
        <div class="user">
          <div class="portrait"></div>
          <div>
            <p class="username">辣妈307948</p>
            <p class="state">孕3天</p>
          </div>
        </div>
        <div>
          <p>题目</p>
          <p>内容</p>
        </div>
      </li>
    </ul>
  </div>
  
</template>

<script>
export default {
  
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
  ul li {
    width: 710px;
    height: 300px;
    background: white;
    margin: 0 auto;
    .user {
      height: 120px;
      display: flex;
      .portrait {
        width: 120px;
        height: 120px;
        background: red;
        border-radius: 50%;
        margin: 0 20px;
      }
      .username {
        font-size: 52px;
      }
      .state {
        font-size: 38px;
      }
    }
  }
}
</style>