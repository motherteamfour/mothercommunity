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
        @followFn="follow"
        @praiseFn="praise"
        @collectFn="collect"
      ></HotList>
    </section>
  </div>
</template>

<script>
import HotList from "@/components/HotList.vue";
import "@/assets/style/swiper.min.css";
import Swiper from "swiper";

var contact = [
  {
    id: 0,
    imgUrl: "",
    username: "jack",
    isFollowed: 0,
    isPraise: 0,
    isCollect: 0,
    title: "标题",
    content:
      "大富翁发大水发射点法撒旦发射点分啊违法违法的是妇科检查士大夫哦额罚你发viji",
    praise: 4,
    comments: 11,
    collect: 10
  }
];

export default {
  name: "Recommend",
  data() {
    return {
      contact: [],
      swipeImg: [
        require("@/assets/img/circleswipetest/swipe1.jpg"),
        require("@/assets/img/circleswipetest/swipe2.jpg")
      ],
      circle: [],
      hotList:[]
    };
  },
  components: {
    HotList
  },
  methods: {
    follow(i) {
      this.contact[i].isFollowed = !this.contact[i].isFollowed;
    },
    praise(i) {
      this.contact[i].isPraise = !this.contact[i].isPraise;
    },
    collect(i) {
      this.contact[i].isCollect = !this.contact[i].isCollect;
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
    this.contact = contact;
    this.axios.get("/circle/list").then(res => { //请求推荐圈子数据
      this.circle = res.data.data.splice(0, 7);
    });
    this.axios.get("/post/list?userId=1001").then(res => {
      this.hotList = res.data.data;
      console.log(res.data);
    })
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