<template>
  <div>
    <ul>
      <li>
        <div class="user">
          
            <img :src="'http://172.16.6.38:8989/'+lists.userImgUrl" class="portrait" alt="">
        
          <div>
            <p class="username">{{lists.userName}}</p>
            <p class="state">孕3天</p>
          </div>
        </div>
        <div class="content">
          <p class="title">{{lists.postTitle}}</p>
          <p class="con">内容</p>
        </div>
        <div class="foot">
          <span>
            <i class="fa fa-clock-o" aria-hidden="true"></i>
            {{lists.postTime}}
          </span>
          <span>
            <i class="fa fa-commenting-o" aria-hidden="true"></i>
            {{lists.count}}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['lists']
}
</script>

<style lang="less" scoped>
 ul {
    padding-bottom: 20px;
    box-shadow: 0 0 8px rgb(236, 173, 173);
    width: 710px;
    border-radius: 20px;
    background: white;
    margin: 20px auto 20px;

    li {
      .user {
        height: 100px;
        display: flex;
        padding-top: 20px;
        .portrait {
          width: 80px;
          height: 80px;
          border: 1px solid red;
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