<template>
  <div class="collpostlist">
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
            <i class="fa fa-clock-o" aria-hidden="true"></i>
            16小时前
          </span>
          <span>
            <i class="fa fa-commenting-o" aria-hidden="true"></i>
            2
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CollPostList"
}
</script>

<style lang="less" scoped>
  ul {
    padding-bottom: 20px;
    
    width: 710px;
    border-radius: 20px;
    background: white;
    margin: 20px auto 0;

    li {
      .user {
        height: 100px;
        display: flex;
        padding-top: 20px;
        .portrait {
          width: 80px;
          height: 80px;
          background: red;
          border-radius: 50%;
          margin: 0 20px;
        }
        .username {
          font-size: 36px;
        }
        .state {
          font-size: 20px;
        }
      }

      .content {
        p {
          margin-left: 20px;
        }
        .title {
          color: gray;
          line-height: 40px;
          font-size: 36px;
        }
        .con {
          font-size: 30px;
        }
      }
      .foot {
        width: 100%;
        height: 34px;

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