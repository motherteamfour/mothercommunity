<template>
  <div class="hot-item">
    <div class="user-info">
      <div class="user-left">
        <div class="avater"></div>
        <p class="username">{{list.username}}</p>
      </div>
      <div class="follow" :userid="list.id" v-if="!list.isFollowed" @click="follow(list.id)">+关注</div>
      <div class="followed" :userid="list.id" v-else @click="follow(list.id)">
        <i class="fa fa-check"></i>
        已关注
      </div>
    </div>
    <div class="brief clearfix">
      <p class="title">{{list.title}}</p>
      <p class="content">{{list.content}}</p>
      <div class="pic">
        <img src alt />
      </div>
    </div>
    <div class="options">
      <div v-if="list.isPraise" class="praise-wrap">
        <i @click="praise(list.id)" class="fa fa-heart-o" aria-hidden="true"></i>
        <span @click="praise(list.id)">赞({{list.praise}})</span>
      </div>
      <div style="color: red" v-else class="praise-wrap">
        <i @click="praise(list.id)" class="fa fa-heart" aria-hidden="true"></i>
        <span @click="praise(list.id)">已赞({{list.praise+1}})</span>
      </div>
      <div>
        <i class="fa fa-comment-o" aria-hidden="true"></i>
        <span>评论{{list.comments}}</span>
      </div>
      <div v-if="list.isCollect" class="collect-wrap">
        <i @click="collect(list.id)" class="fa fa-star-o" aria-hidden="true"></i>
        <span @click="collect(list.id)">收藏({{list.collect}})</span>
      </div>
      <div style="color: #f8d742" v-else class="collect-wrap">
        <i class="fa fa-star" aria-hidden="true" @click="collect(list.id)"></i>
        <span @click="collect(list.id)">已收藏({{list.collect}})</span>
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