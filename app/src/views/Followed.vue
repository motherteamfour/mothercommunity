<template>
  <div class="followed">
    <div class="top">关注的人</div>
    <HotList
      v-for="(item, index) in hotList"
      :key="index"
      :list="item"
      :imgIp="imgIp"
      :fLoading="fLoading"
      :lLoading="lLoading"
      :cLoading="cLoading"
      :userId="userId"
      :isFollowPage="isFollowPage"
      @followFn="follow"
      @cancleFollowFn="cancleFollow"
      @praiseFn="praise"
      @canclePraiseFn="canclePraise"
      @collectFn="collect"
      @cancleCollectFn="cancleCollect"
    ></HotList>
    <div v-if="isShow" class="on">暂无关注</div>
  </div>
</template>

<script>
import HotList from "@/components/HotList.vue";
export default {
  data() {
    return {
      hotList: [],
      isShow: true,
      fLoading: -1,
      lLoading: -1,
      cLoading: -1,
      imgIp: "",
      userId: 1001,
      isFollowPage: 1
    };
  },
  components: {
    HotList
  },
  created() {
    this.userId = sessionStorage.getItem("userId"); //获取userid
    console.log(this.userId);
    this.imgIp = this.$store.state.imgUrl;
    this.getHotList();
  },
  methods: {
    getHotList() {
      this.axios.get(`post/fol?userId=${this.userId}`).then(res => {
        if (res.data.code == 200) {
          this.hotList = res.data.data;
          this.hotList.forEach((item, index) => {
            item.idn = index;
            item.isFollow = 1;
          });
          this.isShow = !this.isShow;
        }
      });
    },
    follow(i, userId) {
      this.fLoading = i;
      let param = new URLSearchParams();
      param.append("followUserId", userId);
      param.append("userId", this.userId);
      this.axios.post("/user/fol", param).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.fLoading = -1;
          this.getHotList();
        }
      });
    },
    cancleFollow(i, userId) {
      this.fLoading = i;
      this.axios
        .delete(`/user/notFol?followUserId=${userId}&userId=${this.userId}`)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data);
            this.fLoading = -1;
            this.getHotList();
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
    }
  }
};
</script>

<style lang="less" scoped>
.followed {
  width: calc(100% - 40px);
  min-height: 100vh;
  background: rgb(248, 248, 248);
  margin: 10px auto 0;
  padding-bottom: 100px;
  .top {
    text-align: center;
    background: #fff;
    font-size: 36px;
    border-radius: 20px 20px 0 0;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }
}

.on {
  width: 100%;
  height: 400px;
  text-align: center;
  line-height: 400px;
  background: #fff;
  border-radius: 0 0 20px 20px;
}
</style>