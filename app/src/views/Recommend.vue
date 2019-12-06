<template>
  <div class="wrap">
    <div class="van-swiper">
      <van-swipe :autoplay="3000" indicator-color="white" :height="200">
        <van-swipe-item v-for="(item, index) in swipeImg" :key="index">
          <img :src="imgIp + item.imgUrl" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <section class="circle-recommend">
      <p class="circle-title">圈子推荐</p>
      <ul>
        <li v-for="(item, index) in circle" :key="index">
          <router-link :to="'/group/' + item.circleId">
            <div class="circle-pic">
              <img :src="imgUrl+ item.circleUrl" alt />
            </div>
            <p class="circle-name">{{item.circleName}}</p>
          </router-link>
        </li>
        <li>
          <router-link to="/circlegourp">
            <div class="circle-pic">
              <img src="@/assets/img/circle/more.png" alt />
            </div>
            <p class="circle-name">更多圈子</p>
          </router-link>
        </li>
      </ul>
    </section>
    <section class="hot">
      <p class="hot-title">热门帖子</p>
      <HotList
        v-for="(item, index) in hotList"
        :key="index"
        :list="item"
        :imgIp="imgIp"
        :fLoading="fLoading"
        :lLoading="lLoading"
        :cLoading="cLoading"
        :userId="userId"
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
import "@/assets/style/swiper.min.css";
import Swiper from "swiper";
import { Swipe, SwipeItem } from "vant";

export default {
  name: "Recommend",
  data() {
    return {
      imgUrl: "",
      swipeImg: [],
      circle: [],
      hotList: [],
      fLoading: -1,
      lLoading: -1,
      cLoading: -1,
      imgIp: "",
      userId: 1
    };
  },
  components: {
    HotList,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
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
    },
    getHotList() {
      this.axios.get(`/post/list?userId=${this.userId}`).then(res => {
        //请求热门文章
        this.hotList = res.data.data;
        console.log(res.data);
        this.hotList.forEach((item, index) => {
          item.idn = index;
        });
        console.log(this.hotList);
      });
    }
  },
  mounted() {
    new Swiper(".swiper-container", {
      autoplay: true,
      loop: true,
      speed: 1000,
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      // 如果需要滚动条
      scrollbar: ".swiper-scrollbar"
    });
  },
  created() {
    this.imgUrl = this.$store.state.imgUrl; // 获取图片路径
    this.userId = sessionStorage.getItem("userId"); //获取userid
    this.imgIp = this.$store.state.imgUrl;
    this.axios.get("/circle/list").then(res => {
      //请求推荐圈子数据
      this.circle = res.data.data.splice(0, 7);
    });
    this.getHotList();
    this.axios.get("/banner/BannerContent").then(res => {
      console.log(res.data);
      this.swipeImg = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.wrap {
  padding-bottom: 80px;
}
.swiper-container {
  width: calc(100% - 40px);
  height: 300px;
  margin: 0 auto;
  margin-top: 10px;
  img {
    max-width: 100%;
    height: auto;
  }
}

.circle-recommend {
  border-radius: 10px;
  box-shadow: 0 0 15px #ddd;
  box-sizing: border-box;
  width: calc(100% - 40px);
  margin: 20px;
  padding: 20px 0;
  background: #fff;
  .circle-title {
    font-size: 36px;
    text-align: center;
    margin-bottom: 10px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    li {
      padding: 10px 0;
      width: 25%;
      .circle-pic {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background: rgb(255, 220, 219);
        img {
          width: 60%;
        }
      }
      .circle-name {
        font-size: 24px;
        text-align: center;
      }
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
    font-size: 36px;
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
}
.van-swiper {
  box-sizing: border-box;
  padding: 0 10px;
  margin-top: 10px;
  img {
    width: 100%;
    height: 200px;
  }
}
</style>