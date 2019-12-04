<template>
  <div class="wrap">
    <div class="swiper-container" ref="slider">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in swipeImg" :key="index">
          <img :src="item" alt />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <section class="circle-recommend">
      <p class="circle-title">圈子推荐</p>
      <ul>
        <li v-for="(item, index) in circle" :key="index">
          <router-link :to="'/group/' + item.circleId">
            <div class="circle-pic">
              <img :src="'http://172.16.6.45:8989' + item.circleUrl" alt />
            </div>
            <p class="circle-name">{{item.circleName}}</p>
          </router-link>
        </li>
        <li>
          <router-link to="/circlegourp">
            <div class="circle-pic"></div>
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
        :fLoading="fLoading"
        :lLoading="lLoading"
        :cLoading="cLoading"
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

export default {
  name: "Recommend",
  data() {
    return {
      swipeImg: [
        require("@/assets/img/circleswipetest/swipe1.jpg"),
        require("@/assets/img/circleswipetest/swipe2.jpg")
      ],
      circle: [],
      hotList: [],
      fLoading: -1,
      lLoading: -1,
      cLoading: -1
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
      param.append("userId", "1001");
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
        .delete(`/user/notFol?followUserId=${userId}&userId=1001`)
        .then(res => {
          console.log(res.data);
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
      param2.append("userId", "1001");
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
        .delete(`/post/notLike?postId=${postId}&userId=1001`)
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
      param3.append("userId", "1001");
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
        .delete(`/post/notCol?postId=${postId}&userId=1001`)
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
    getHotList() {
      this.axios.get("/post/list?userId=1001").then(res => {
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
    this.axios.get("/circle/list").then(res => {
      //请求推荐圈子数据
      this.circle = res.data.data.splice(0, 7);
    });
    this.getHotList();
  }
};
</script>

<style lang="less" scoped>
.wrap {
  padding-bottom: 80px;
}
.swiper-slide {
  height: auto;
  margin-top: 10px;
  img {
    width: 100%;
    height: 100%;
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
</style>