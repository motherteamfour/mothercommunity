<template>
  <div class="article-details">
    <header>
      <div class="back" @click="back">
        <i class="fa fa-angle-left"></i>
      </div>
      <span>帖子详情</span>
    </header>
    <div class="article-content">
      <div class="article-top">
        <div class="user-info">
          <div class="avatar"></div>
          <span>用户名</span>
        </div>
        <button class="follow">关注</button>
      </div>
      <div class="title">
        <p>宝宝出生拉！！</p>
      </div>
      <div class="body-text">
        <p>阿斯顿发额啊我额封建时代佛从vnzkld啊手动阀实打实的发啊啊额哇额福娃额俄方啊饿啊我额</p>
      </div>
      <div class="content-pic">
        <img src="@/assets/img/circleswipetest/swipe1.jpg" alt />
        <img src="@/assets/img/login/denglu.png" alt />
        <img src="@/assets/img/circleswipetest/swipe2.jpg" alt />
      </div>
      <div class="article-info"></div>
      <a class="circle" href>
        #产后圈
        <i class="fa fa-angle-right"></i>
      </a>
    </div>
    <div class="reply-content">
      <div class="reply-top">
        <i class="fa fa-commenting-o" aria-hidden="true"></i>
        全部评论
      </div>
      <ul>
        <li class="reply-item">
          <div class="left-avatar">
            <div class="reply-avatar"></div>
          </div>
          <div class="reply-right">
            <div class="right-top">
              <span class="name">用户123</span>
              <div class="praise">
                <i class="fa fa-heart-o"></i>
                5
              </div>
            </div>
            <p class="reply-text">啊圣诞节佛山额奥迪覅就撒阿道夫撒俄方额佛山额奥迪覅就撒阿道夫撒俄方</p>
            <ul class="sub-reply">
              <li>
                <p>
                  <span class="subusername">用户3333</span> 回复:123123
                </p>
              </li>
              <li>
                <p>
                  <span class="subusername">用户3333</span> 回复:123123
                </p>
              </li>
            </ul>
            <div class="right-bottom">
              <p class="time">2019/11/24 12:11</p>
              <div class="reply-reply">
                <i class="fa fa-comment-o"></i>
                回复
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="reply-bottom">
      <input type="text" placeholder="回复" />
      <div class="options">
        <div>
          <i class="fa fa-heart-o"></i>
          <span>赞(10)</span>
        </div>
        <div>
          <i class="fa fa-star-o" aria-hidden="true" @click="collect(list.id)"></i>
          <span @click="collect(list.id)">收藏(10)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.article-details {
  width: 100%;
  min-height: 100vh;
  background: rgb(248, 248, 248);
  padding-bottom: 90px;
}
header {
  width: 100%;
  height: 90px;
  background: #fff;
  padding-top: 40px;
  text-align: center;
  line-height: 80px;
  box-shadow: 0 5px 5px #eee;
  position: relative;
  vertical-align: middle;
  span {
    font-size: 36px;
    color: #000;
  }
  .back {
    width: 100px;
    height: calc(100% - 40px);
    display: flex;
    align-items: center;
    position: absolute;
    margin-left: 16px;
    left: 0;
    color: #000;
    .fa-angle-left {
      font-size: 1rem;
    }
  }
}

.article-content {
  width: calc(100% - 40px);
  margin: 0 auto;
  background: #fff;
  border-radius: 20px;
  margin-top: 20px;
  padding: 20px;
  box-sizing: border-box;
  .article-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-info {
      display: flex;
      font-size: 30px;
      align-items: center;
      .avatar {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background: red;
        margin-right: 10px;
      }
    }
    .follow {
      width: 100px;
      height: 50px;
      border-radius: 30px;
      border: none;
      outline: none;
      font-size: 28px;
      background: rgb(255, 220, 219);
      color: rgb(235, 75, 71);
      box-shadow: 0 0 10px rgb(255, 220, 219);
    }
  }
  .circle {
    color: rgb(35, 210, 255);
    font-size: 28px;
  }
  .title {
    margin-top: 20px;
    font-size: 36px;
  }
  .body-text {
    margin-top: 20px;
    font-size: 30px;
  }
  .content-pic {
    width: 100%;
    margin-top: 20px;
    img {
      max-width: 100%;
    }
  }
}

.reply-content {
  width: calc(100%-40px);
  margin: 0 20px;
  padding: 0 20px;
  background: #fff;
  margin-top: 20px;
  border-radius: 20px;
  .reply-top {
    width: 100%;
    height: 80px;
    font-size: 36px;
    line-height: 80px;
    border-bottom: 1px solid #eee;
  }
  ul {
    .reply-item {
      width: 100%;
      padding: 20px 0;
      display: flex;
      .left-avatar {
        margin-right: 20px;
        .reply-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: lightcyan;
        }
      }
      .reply-right {
        border-bottom: 1px solid rgb(160, 160, 160);
        padding: 20px 0;
        .right-top {
          display: flex;
          justify-content: space-between;
          font-size: 30px;
          color: rgb(160, 160, 160);
          font-size: 28px;
          .name {
            color: #000;
          }
          .praise {
            font-size: 26px;
          }
        }
        .reply-text {
          padding: 20px 0;
          font-size: 30px;
        }
        .sub-reply {
          background: rgb(237, 236, 236);
          font-size: 26px;
          li {
            padding: 10px;
            .subusername {
              color: rgb(35, 210, 255);
            }
          }
        }
        .right-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 30px;
          color: rgb(160, 160, 160);
          font-size: 28px;
          .time {
            font-size: 26px;
          }
        }
      }
    }
  }
}

.reply-bottom {
  width: 100%;
  height: 80px;
  padding: 0 20px;
  box-sizing: border-box;
  background: rgb(255, 220, 219);
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  input {
    width: 55%;
    height: 60%;
    border: none;
    border-radius: 20px;
    outline: none;
    text-indent: 20px;
    font-size: 28px;
  }
  .options {
    width: 40%;
    font-size: 26px;
    display: flex;
    justify-content: space-around;
  }
}
</style>