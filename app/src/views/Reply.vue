<template>
  <div class="reply">
    <div class="top">
      <span class="goback" @click="goback()">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </span>
      <h3>我的回复</h3>
      <span>
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
      </span>
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
        <div class="content">
          <p class="title">题目</p>
          <p class="con">内容</p>
        </div>
        <div class="foot">
          <span>
            <i>图标</i>
            16小时前
          </span>
          <span>
            <i>图标</i>
            2
          </span>
        </div>
      </li>
    </ul>
  </div>
  
</template>

<script>
export default {
  methods: {
    goback() {
      this.$router.push('./my');
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
  ul li {
    width: 710px;
    height: 300px;
    background: white;
    margin: 0 auto;
    .user {
      height: 120px;
      display: flex;
      padding-top: 20px;
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
    
    .content {
      p {
        margin-left: 20px;
        
      }
      .title {
        color: gray;
        line-height: 80px;
      }
      .con {
        font-size: 34px;
        
      }
    }
    .foot {
      width: 100%;
      height: 34px;
      background: gray;
      display: flex;
      justify-content: flex-end;
      span {
        font-size: 20px;
        margin-right: 30px;

      }
    }
  }
}
</style>