<template>
  <div class="article-details">
    <header>
      <div class="back" @click="back">
        <i class="fa fa-angle-left"></i>
      </div>
      <span>帖子详情</span>
    </header>
    <div class="article-content">
      <div class="article-top" v-if="article.user!=undefined">
        <div class="user-info">
          <div class="avatar" v-if="article.user != undefined">
            <img :src=" imgIp + article.user.userImgUrl" alt />
          </div>
          <span>{{article.user.userName}}</span>
        </div>
        <div v-if="userId !== article.user.userId">
          <button class="follow" v-if="!article.isFollow" @click="follow(article.userId)">关注</button>
          <div class="followed" v-else @click="cancleFollow(article.userId)">
            <i class="fa fa-check"></i>
            已关注
          </div>
        </div>
      </div>
      <div class="title">
        <p>{{article.postTitle}}</p>
      </div>
      <div class="body-text">
        <p>{{article.postContent}}</p>
      </div>
      <div class="content-pic">
        <img v-for="(img, index) in article.postImgs" :key="index" :src="imgIp + img.postUrl" alt />
      </div>
      <div class="article-info"></div>
      <router-link :to="'/group/' + article.circleId" class="circle" href>
        #{{article.circleName}}
        <i class="fa fa-angle-right"></i>
      </router-link>
    </div>
    <div class="reply-content">
      <div class="reply-top">
        <i class="fa fa-commenting-o" aria-hidden="true"></i>
        {{hasComm}}
      </div>
      <ul>
        <li v-for="(item, index) in firstComm" :key="index" class="reply-item">
          <div class="left-avatar">
            <div class="reply-avatar" v-if="item.user != undefined">
              <img :src=" imgIp + item.user.userImgUrl" alt />
            </div>
          </div>
          <div class="reply-right" v-if="item.user != undefined">
            <div class="right-top">
              <span class="name">{{item.user.userName}}</span>
              <div class="praise" @click="like(item.commentId)" v-if="!item.isLike">
                <i class="fa fa-heart-o"></i>
                {{item.countFabulous}}
              </div>
              <div class="praised" @click="unLike(item.commentId)" v-else>
                <i class="fa fa-heart"></i>
                {{item.countFabulous}}
              </div>
            </div>
            <p class="reply-text">{{item.commentContent}}</p>
            <ul class="sub-reply">
              <li v-for="(item, index) in item.comres" :key="index">
                <p>
                  <span class="subusername">{{item.user.userName}}</span>
                  回复:{{item.commentContent}}
                </p>
              </li>
            </ul>
            <div class="right-bottom">
              <p class="time">{{item.commentTime}}</p>
              <div
                class="reply-reply"
                @click="subRp(item.userId, item.commentId, item.user.userName)"
              >
                <i class="fa fa-comment-o"></i>
                回复
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="reply-bottom">
      <div @click="showRp" class="rp-input">回复</div>
      <div class="options">
        <div @click="postLike(postId)" v-if="!article.isLike">
          <i class="fa fa-heart-o"></i>
          <span>赞({{article.countFabulous}})</span>
        </div>
        <div class="praised" @click="postUnLike(postId)" v-else>
          <i class="fa fa-heart"></i>
          已赞{{article.countFabulous}}
        </div>
        <div class="collect" @click="collect" v-if="!article.isCollect">
          <i class="fa fa-star-o" aria-hidden="true" @click="collect(list.id)"></i>
          <span @click="collect(list.id)">收藏({{article.countCollection}})</span>
        </div>
        <div class="collected" @click="unCollect" v-else>
          <i class="fa fa-star" aria-hidden="true" @click="collect(list.id)"></i>
          <span @click="collect(list.id)">已收藏({{article.countCollection}})</span>
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '25%' }">
      <textarea v-model="rpContent" class="frist-rp" ref="getFocus" :placeholder="rpWho"></textarea>
      <div class="send-wrap">
        <button class="reply-btn" @click="reply">发送</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup } from "vant";
export default {
  data() {
    return {
      postId: -1,
      article: [],
      firstComm: [],
      parentId: 0,
      rpContent: "",
      rpPostId: 0,
      show: false,
      rpWho: "我也来说两句",
      hasComm: "暂无评论",
      userId: 1001,
      imgIp: ""
    };
  },
  components: {
    [Popup.name]: Popup
  },
  created() {
    this.imgIp = this.$store.state.imgUrl; //获取图片IP
    this.userId = sessionStorage.getItem("userId"); //获取userid
    this.postId = this.$route.params.id; //获取帖子id
    this.axios
      .get(`/post/getPost?postId=${this.postId}&userId=${this.userId}`) //请求文章详情数据
      .then(res => {
        if (res.data.code == 200) {
          this.article = res.data.data;
          console.log(this.article);
        }
      });
    this.getFirstRp();
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    getFirstRp() {
      this.axios
        .get(`/comm/list?postId=${this.postId}&userId=${this.userId}`) //请求文章一级回复
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data);
            this.firstComm = res.data.data;
            if (this.firstComm.length == 0) {
              this.hasComm = "暂无评论";
            } else {
              this.hasComm = "全部评论";
            }
          }
        });
    },
    follow(i) {
      let param = new URLSearchParams();
      param.append("followUserId", i);
      param.append("userId", this.userId);
      this.axios.post("/user/fol", param).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.article.isFollow = !this.article.isFollow;
        }
      });
    },
    cancleFollow(i) {
      this.axios
        .delete(`/user/notFol?followUserId=${i}&userId=${this.userId}`)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            console.log(res.data);
            this.article.isFollow = !this.article.isFollow;
          }
        });
    },
    showRp() {
      this.parentId = 0;
      this.rpPostId = this.postId;
      this.show = !this.show;
      this.rpWho = "我也来说两句";
      this.timer = setTimeout(() => {
        this.$refs.getFocus.focus();
      }, 100);
    },
    subRp(i, cId, userName) {
      this.parentId = cId;
      this.rpPostId = cId;
      this.rpWho = "回复：" + userName;
      this.show = !this.show;
    },
    reply() {
      this.show = !this.show;
      console.log({
        commentContent: this.rpContent,
        userId: this.userId,
        parentId: this.parentId,
        postId: this.rpPostId
      });
      this.axios
        .post("/comm/add", {
          commentContent: this.rpContent,
          userId: this.userId,
          parentId: this.parentId,
          postId: this.rpPostId
        })
        .then(res => {
          console.log(res.data);
          this.getFirstRp();
          this.rpContent = "";
        });
    },
    like(commentId) {
      console.log({
        commentId: commentId,
        userId: this.userId
      });
      let param3 = new URLSearchParams();
      param3.append("commentId", commentId);
      param3.append("userId", this.userId);
      this.axios.post("/comm/like", param3).then(res => {
        console.log(res.data);
        this.getFirstRp();
      });
    },
    unLike(commentId) {
      this.axios
        .delete(`/comm/notLike?commentId=${commentId}&userId=${this.userId}`)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data);
            /* this.getFirstRp(); */
          }
        });
    },
    postLike() {
      let param = new URLSearchParams();
      param.append("postId", this.postId);
      param.append("userId", this.userId);
      this.axios.post("/post/like", param).then(res => {
        this.article.isLike = !this.article.isLike;
        this.article.countFabulous += 1;
        console.log(res.data);
      });
    },
    postUnLike() {
      this.axios
        .delete(`/post/notLike?postId=${this.postId}&userId=${this.userId}`)
        .then(res => {
          if (res.data.code == 200) {
            this.article.isLike = !this.article.isLike;
            this.article.countFabulous -= 1;
          }
        });
    },
    collect() {
      let param2 = new URLSearchParams();
      param2.append("postId", this.postId);
      param2.append("userId", this.userId);
      this.axios.post("/post/col", param2).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.article.isCollect = !this.article.isCollect;
          this.article.countCollection += 1;
        }
      });
    },
    unCollect() {
      this.axios
        .delete(`/post/notCol?postId=${this.postId}&userId=${this.userId}`)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            console.log(res.data);
            this.article.isCollect = !this.article.isCollect;
            this.article.countCollection -= 1;
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.article-details {
  width: 100%;
  min-height: calc(100vh - 40px);
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
        margin-right: 10px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 120%;
        }
      }
    }
    .follow {
      width: 100px;
      height: 50px;
      border-radius: 30px;
      border: none;
      outline: none;
      font-size: 24px;
      background: rgb(255, 220, 219);
      color: rgb(235, 75, 71);
      box-shadow: 0 0 10px rgb(255, 220, 219);
    }
    .followed {
      width: 120px;
      height: 50px;
      border-radius: 30px;
      text-align: center;
      line-height: 50px;
      border: none;
      outline: none;
      font-size: 24px;
      background: rgb(235, 75, 71);
      color: #fff;
      box-shadow: 0 0 10px rgb(235, 75, 71);
    }
  }
  .circle {
    color: rgb(35, 210, 255);
    font-size: 28px;
  }
  .title {
    margin-top: 20px;
    font-size: 36px;
    font-weight: 600;
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
      justify-content: space-around;
      .left-avatar {
        width: 10%;
        margin-right: 20px;

        .reply-avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
      }
      .reply-right {
        width: 80%;
        border-bottom: 1px solid rgb(160, 160, 160);
        padding: 20px 0;
        .right-top {
          display: flex;
          justify-content: space-between;
          font-size: 30px;
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
          background: rgb(242, 242, 242);
          font-size: 26px;
          border-radius: 20px;
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
          padding-top: 10px;
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
  .rp-input {
    width: 55%;
    height: 60%;
    display: flex;
    align-items: center;
    border: 1px solid #000;
    background: #fff;
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

.frist-rp {
  width: calc(100% - 40px);
  height: 200px;
  padding: 20px;
  box-sizing: border-box;
  margin: 40px 20px 0;
  border: 1px solid @themeColor;
  font-size: 26px;
  border-radius: 20px;
}
.send-wrap {
  text-align: center;
  .reply-btn {
    width: 100px;
    height: 50px;
    font-size: 30px;
    border-radius: 20px;
    border: none;
    background: rgb(255, 220, 219);
    color: rgb(235, 75, 71);
  }
}

.collected {
  color: red;
}
.praised {
  color: red;
}
</style>