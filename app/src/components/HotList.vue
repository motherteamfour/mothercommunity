<template>
  <div class="hot-item">
    <div class="user-info" v-if="list.user != undefined">
      <router-link :to="'/otherUsers/' + list.user.userId">
        <div class="user-left">
          <div class="avater">
            <img :src="'http://172.16.6.38:8989/' + list.user.userImgUrl" alt />
          </div>
          <p class="username">{{list.user.userName}}</p>
        </div>
      </router-link>
      <div class="follow" v-if="!list.isFollow" @click="follow(list.idn, list.userId)">+关注</div>
      <div class="followed" v-else @click="cancleFollow(list.idn, list.userId)">
        <i class="fa fa-check"></i>
        已关注
      </div>
    </div>
    <router-link :to="'/article/'+ list.postId ">
      <div class="brief clearfix">
        <p class="title">{{list.postTitle}}</p>
        <p class="content">{{list.postContent}}</p>
        <div class="pic" v-if="list.postImgs.length !== 0">
          <img :src="'http://172.16.6.45:8989/' + list.postImgs[0].postUrl" />
        </div>
      </div>
    </router-link>
    <div class="options">
      <div v-if="!list.isLike" class="praise-wrap">
        <van-loading v-show="lLoading == list.idn" size="14px" color="#1989fa" vertical></van-loading>
        <div v-show="lLoading !== list.idn">
          <i @click="praise(list.idn, list.postId)" class="fa fa-heart-o" aria-hidden="true"></i>
          <span @click="praise(list.idn, list.postId)">赞({{list.countFabulous}})</span>
        </div>
      </div>
      <div style="color: red" v-else class="praise-wrap">
        <i @click="canclePraise(list.idn, list.postId)" class="fa fa-heart" aria-hidden="true"></i>
        <span @click="canclePraise(list.idn, list.postId)">已赞({{list.countFabulous}})</span>
      </div>
      <div>
        <i class="fa fa-comment-o" aria-hidden="true"></i>
        <span>评论{{list.countComment}}</span>
      </div>
      <div v-if="!list.isCollect" class="collect-wrap">
        <i @click="collect(list.idn, list.postId)" class="fa fa-star-o" aria-hidden="true"></i>
        <span @click="collect(list.idn, list.postId)">收藏({{list.countCollection}})</span>
      </div>
      <div style="color: #f8d742" v-else class="collect-wrap">
        <i @click="cancleCollect(list.idn, list.postId)" class="fa fa-star" aria-hidden="true"></i>
        <span @click="cancleCollect(list.idn, list.postId)">已收藏({{list.countCollection}})</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from "vant";
export default {
  name: "HotList",
  data() {
    return {};
  },
  props: ["list", "isAll", "fLoading", "lLoading", "cLoading"],
  components: {
    [Loading.name]: Loading
  },
  methods: {
    followStyle(i) {
      if (i == 1) {
        return {
          background: "#ffe469",
          color: "#fff",
          border: "none"
        };
      } else if (i == 0) {
        return {};
      }
    },
    follow(i, userId) {
      this.$emit("followFn", i, userId);
    },
    cancleFollow(i, userId) {
      this.$emit("cancleFollowFn", i, userId);
    },
    praise(i, postId) {
      this.$emit("praiseFn", i, postId);
    },
    canclePraise(i, postId) {
      this.$emit("canclePraiseFn", i, postId);
    },
    collect(i, postId) {
      this.$emit("collectFn", i, postId);
    },
    cancleCollect(i, postId) {
      this.$emit("cancleCollectFn", i, postId);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.clearfix::before,
.clearfix::after {
  display: table;
  content: "";
}
.clearfix::after {
  clear: both;
}
.hot-item {
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  background: #fff;
  .user-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    .user-left {
      display: flex;
      .avater {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        overflow: hidden;
        text-align: center;
        line-height: 70px;
        img {
          width: 120%;
        }
      }
      .username {
        line-height: 70px;
        font-size: 24px;
        float: left;
      }
    }
    .follow {
      width: 80px;
      height: 40px;
      line-height: 40px;
      font-size: 24px;
      border: 3px solid #f8d742;
      color: #f8d742;
      border-radius: 5px;
      line-height: 40px;
      font-weight: 600;
      text-align: center;
      border-radius: 20px;
      box-shadow: 0 0 15px #ffe469;
    }
    .followed {
      width: 100px;
      height: 40px;
      font-size: 20px;
      border: none;
      border-radius: 5px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      padding: 3px;
      background: #ffe469;
      border-radius: 20px;
      box-shadow: 0 0 15px #ffe469;
    }
  }

  .brief {
    margin-top: 20px;
    .pic {
      width: 100%;
      img {
        max-height: 300px;
        border-radius: 20px;
      }
    }
    .title {
      font-size: 30px;
      font-weight: 600;
    }
    .content {
      font-size: 28px;
      margin: 10px 0;
    }
  }
  .options {
    font-size: 28px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    i {
      vertical-align: middle;
    }
    span {
      font-size: 22px;
      vertical-align: middle;
    }
  }
}

.praised {
  color: rgb(241, 86, 86);
}
.collected {
  color: #f8d742;
}
.praise-wrap {
  width: 200px;
}
.collect-wrap {
  width: 200px;
  text-align: right;
}
</style>