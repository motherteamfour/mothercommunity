<template>
  <div class="ohter-users">
    <van-sticky>
      <header>
        <div class="back" @click="back">
          <i class="fa fa-angle-left"></i>
        </div>
        <span>{{userInfo.userName}}</span>
      </header>
    </van-sticky>
    <div class="user-wrap">
      <div class="avatar">
        <img :src="'http://172.16.6.38:8989/' + userInfo.userImgUrl" alt />
      </div>
      <div class="user-info">
        <ul class="count">
          <li>
            <p>{{post.length}}</p>
            <span>帖子</span>
          </li>
          <li>
            <p>{{followed}}</p>
            <span>关注</span>
          </li>
          <li>
            <p>{{fans}}</p>
            <span>粉丝</span>
          </li>
        </ul>
        <div v-if="userId!==userInfo.userId">
          <button class="follow">关注</button>
        </div>
      </div>
    </div>
    <div class="posts">
      <ul>
        <li class="post-item" v-for="(item, index) in post" :key="index">
          <router-link :to="'/article/' + item.postId">
            <p class="title">{{item.postTitle}}</p>
            <p class="post-content">{{item.postContent}}</p>
            <p class="time">{{item.postTime}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Sticky } from "vant";
export default {
  name: "OtherUsers",
  data() {
    return {
      userId: 0,
      userInfo: {},
      fans: 0,
      followed: 0,
      post: []
    };
  },
  components: {
    [Sticky.name]: Sticky
  },
  created() {
    this.userId = this.$route.params.id;
    let param = new URLSearchParams();
    param.append("userid", this.userId);
    this.axios.post("/zp/user/findMyself", param).then(res => {
      this.userInfo = res.data.data;
      console.log(this.userInfo);
      this.axios
        .get(
          `/user/isFol?userId=1001&followUserId=1023`
        )
        .then(res => {
          console.log(res.data);
        });
    });
    this.axios.post("/zp/fant/countattention", param).then(res => {
      this.followed = res.data.data;
    });
    this.axios.post("/zp/fant/countFants", param).then(res => {
      this.fans = res.data.data;
    });
    this.axios
      .get(`/user/findPostAllByUserId?userid=${this.userId}`)
      .then(res => {
        this.post = res.data.data;
      });
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    getFollow() {
      this.axios
        .get(
          `/user/isFol?userId=${this.userId}&followUserId=${this.userInfo.userId}`
        )
        .then(res => {
          console.log(res.data);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.ohter-users {
  width: 100%;
  background: rgb(248, 248, 248);
  min-height: 100vh;
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

.user-wrap {
  width: 100%;
  height: 300px;
  border-bottom: 1px solid #ddd;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .avatar {
    width: 200px;
    height: 200px;
    background: #ccc;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 120%;
    }
  }
  .count {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    text-align: center;
    p {
      font-size: 36px;
    }
    span {
      font-size: 24px;
    }
  }
  .follow {
    margin-top: 30px;
    width: 300px;
    height: 50px;
    font-size: 28px;
    background: @themeColor;
    border: none;
    border-radius: 30px;
    color: #fff;
  }
}

.posts {
  width: 100%;
  .post-item {
    width: calc(100% - 40px);
    margin: 10px auto;
    height: 200px;
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 0 20px #ccc;
    .title {
      font-size: 36px;
      font-weight: 600;
    }
    .post-content {
      font-size: 28px;
      margin: 20px 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .time {
      font-size: 26px;
      color: #ccc;
    }
  }
}
</style>