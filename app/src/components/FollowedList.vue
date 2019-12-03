<template>
  <div class="hot-item">
    <div class="user-info">
      <div class="user-left">
        <div class="avater"></div>
        <p class="username">{{list.user.userName}}</p>
      </div>
      <div class="followed" @click="follow(list.postId)">
        <i class="fa fa-check"></i>
        已关注
      </div>
    </div>
    <router-link :to="'/article/'+ list.postId ">
      <div class="brief clearfix">
        <p class="title">{{list.postTitle}}</p>
        <p class="content">{{list.postContent}}</p>
        <div class="pic">
          <img v-for="(img, index) in list.postImgs" :key="index" :src="'http://172.16.6.46:8989/' + img.postUrl">
        </div>
      </div>
    </router-link>
    <div class="options">
      <div v-if="!list.isLike" class="praise-wrap">
        <i @click="praise(list.id)" class="fa fa-heart-o" aria-hidden="true"></i>
        <span @click="praise(list.id)">赞({{list.countFabulous}})</span>
      </div>
      <div style="color: red" v-else class="praise-wrap">
        <i @click="praise(list.id)" class="fa fa-heart" aria-hidden="true"></i>
        <span @click="praise(list.id)">已赞({{list.countFabulous}})</span>
      </div>
      <div>
        <i class="fa fa-comment-o" aria-hidden="true"></i>
        <span>评论{{list.countComment}}</span>
      </div>
      <div v-if="!list.isCollect" class="collect-wrap">
        <i @click="collect(list.postId)" class="fa fa-star-o" aria-hidden="true"></i>
        <span @click="collect(list.postId)">收藏({{list.countCollection}})</span>
      </div>
      <div style="color: #f8d742" v-else class="collect-wrap">
        <i class="fa fa-star" aria-hidden="true" @click="collect(list.id)"></i>
        <span @click="collect(list.postId)">已收藏({{list.countCollection}})</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotList",
  data() {
    return {};
  },
  props: ["list"],
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
    follow(i) {
      this.$emit("followFn", i);
    },
    praise(i) {
      this.$emit("praiseFn", i);
    },
    collect(i) {
      this.$emit("collectFn", i);
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
      .avater {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background: lightgreen;
        float: left;
        margin-right: 10px;
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
      background: @themeColor;
      border-radius: 20px;
      box-shadow: 0 0 15px #ffe469;
    }
  }

  .brief {
    margin-top: 20px;
    .pic {
      width: 200px;
      height: 200px;
      background: lightgreen;
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