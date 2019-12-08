<template>
  <div class="group">
    <header>
      <nav>
        <div class="back" @click="back">
          <i class="fa fa-angle-left fa-2x"></i>
        </div>
      </nav>
      <div class="group-info">
        <img :src="imgUrl + circleUrl" alt />
        <p class="group-name">{{circleName}}</p>
        <p class="group-num">帖子数 {{hotList.length}}</p>
      </div>
    </header>
    <section class="hot">
      <p class="hot-title">全部帖子</p>
      <div class="no-post" v-if="hotList.length == 0">
        暂无帖子
      </div>
      <HotList
        v-for="(item, index) in hotList"
        :key="index"
        :list="item"
        :imgIp="imgIp"
        :fLoading="fLoading"
        :lLoading="lLoading"
        :cLoading="cLoading"
        :loading="loading"
        @followFn="follow"
        @cancleFollowFn="cancleFollow"
        @praiseFn="praise"
        @canclePraiseFn="canclePraise"
        @collectFn="collect"
        @cancleCollectFn="cancleCollect"
      ></HotList>
    </section>
  </div>
</template>

<script>
import HotList from "@/components/HotList.vue";
export default {
  name: "Group",
  data() {
    return {
      groupId: "",
      fLoading: -1,
      lLoading: -1,
      cLoading: -1,
      hotList: [],
      circleName: "",
      circleUrl: "",
      imgUrl: "",
      loading: true
    };
  },
  components: {
    HotList
  },
  methods: {
    follow(i, userId) {
      this.fLoading = i;
      let param = new URLSearchParams();
      param.append("followUserId", userId);
      param.append("userId", this.userId);
      this.axios.post("/user/fol", param).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.fLoading = -1;
          this.getList();
        }
      });
    },
    cancleFollow(i, userId) {
      this.fLoading = i;
      this.axios
        .delete(`/user/notFol?followUserId=${userId}&userId=${this.userId}`)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            console.log(res.data);
            this.fLoading = -1;
            this.getList();
          }
        });
    },
    praise(i, postId) {
      this.lLoading = i;
      let param2 = new URLSearchParams();
      param2.append("postId", postId);
      param2.append("userId", this.userId);
      this.axios.post("/post/like", param2).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.lLoading = -1;
          this.hotList[i].isLike = !this.hotList[i].isLike;
          this.hotList[i].countFabulous += 1;
        }
      });
    },
    canclePraise(i, postId) {
      this.lLoading = i;
      this.axios
        .delete(`/post/notLike?postId=${postId}&userId=${this.userId}`)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            console.log(res.data);
            this.lLoading = -1;
            this.hotList[i].isLike = !this.hotList[i].isLike;
            this.hotList[i].countFabulous -= 1;
          }
        });
      console.log(postId);
    },
    collect(i, postId) {
      this.cLoading = i;
      let param3 = new URLSearchParams();
      param3.append("postId", postId);
      param3.append("userId", this.userId);
      this.axios.post("/post/col", param3).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.cLoading = -1;
          this.hotList[i].isCollect = !this.hotList[i].isCollect;
          this.hotList[i].countCollection += 1;
        }
      });
      console.log(postId);
    },
    cancleCollect(i, postId) {
      this.axios
        .delete(`/post/notCol?postId=${postId}&userId=${this.userId}`)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            console.log(res.data);
            this.cLoading = -1;
            this.hotList[i].isCollect = !this.hotList[i].isCollect;
            this.hotList[i].countCollection -= 1;
          }
        });
      console.log(postId);
    },
    getList() {
      this.axios
        .get(`/cir/post?circleId=${this.groupId}&userId=${this.userId}`)
        .then(res => {
          console.log(res.data);
          if (res.data.data !== null) {
            this.circleName = res.data.data.circleName;
            this.circleUrl = res.data.data.circleUrl;
            this.hotList = res.data.data.posts;
            this.hotList.forEach((item, index) => {
              item.idn = index;
            });
            this.loading = false;
          }
          console.log(this.hotList);
        });
    },
    back() {
      this.$router.go(-1); //返回上一层
    }
  },
  created() {
    this.userId = sessionStorage.getItem("userId");
    this.imgUrl = this.$store.state.imgUrl; // 获取图片路径
    this.imgIp = this.$store.state.imgUrl;
    console.log(this.imgIp);
    this.groupId = this.$route.params.id;
    console.log(this.groupId);
    this.getList();
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.group {
  background: rgb(248, 248, 248);
  min-height: 100vh;
  padding-bottom: 90px;
}
header {
  width: 100%;
  height: 300px;
  background: rgb(255, 213, 224);
  padding-top: 40px;
  nav {
    width: 100%;
    height: 96px;
    line-height: 96px;
    .back {
      width: 50px;
      height: 90px;
      text-align: center;
    }
  }
  .group-info {
    text-align: center;
    color: #000;
    margin-bottom: 23px;
    .group-name {
      font-size: 36px;
    }
    .group-num {
      font-size: 30px;
    }
  }
}

.hot {
  border-radius: 10px;
  box-shadow: 0 0 15px #ddd;
  box-sizing: border-box;
  width: calc(100% - 40px);
  margin: 20px;
  padding: 20px 0;
  background: #fff;
  .hot-title {
    font-size: 30px;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
}

.no-post {
  height: 400px;
  text-align: center;
  line-height: 400px;
}
</style>