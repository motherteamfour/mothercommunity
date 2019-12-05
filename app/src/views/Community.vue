<template>
  <div class="community">
    <div class="top">
      <div class="search">
        <div @click="goTrigger()">
          <i class="fa fa-lastfm" aria-hidden="true"></i>
          <span>切换</span>
        </div>
        <input type="text" placeholder="妈妈优选"  class="inputbox" @click="goSearchPages()">
        <!--  <van-search placeholder="请输入搜索关键词" v-model="value" /> -->
        <!-- <van-search placeholder="请输入搜索关键词" shape="round" class="inputbox" @click="goSearchPages()" /> -->
<!-- <van-search
  v-model="value"
  placeholder="请输入搜索关键词"
  show-action
  shape="round"
  @search="onSearch"
> -->
<!--   <div slot="action" @click="onSearch">搜索</div>
</van-search> -->
        <div @click="goInfo()">
          <i class="fa fa-envelope-o" aria-hidden="true"></i>
          <span>消息</span>
        </div>
      </div>
    </div>
    <!-- <div class="wrapper"> -->
    <div class="swiper-container wrapper" ref="slider">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in swipeImg" :key="index">
          <img :src="item" alt />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!--   </div> -->
    <div class="wrapper1">
      <div class="cycle">
        <div class="left-arrow" @click="goBeforeDay()">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </div>
        <div class="content">
          <div class="days">{{babylong.pushTitle}}</div>
          <div class="handw">
            <span class="width">
              <i class="fa fa-thermometer-half" aria-hidden="true"></i>
              <span>{{babylong.heightMessage}}</span>
            </span>
            <span class="weight">
              <i class="fa fa-map-o" aria-hidden="true"></i>
              <span>{{babylong.weightMessage}}</span>
            </span>
          </div>
        </div>
        <div class="right-arrow" @click="goAfterDay()">
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </div>
      </div>
      <div class="babymamistate">
        <div class="baby">
          <p>
            <!-- <span></span> -->
            {{babylong.badyMessage}}
          </p>
        </div>
        <div class="mami">
          <p>
            <!-- <span></span> -->
            {{babylong.motherMessage}}
          </p>
        </div>
      </div>
    </div>
    <div class="recommend">热门推荐</div>

    <RecommentLists v-for="(item, index) in referer.list" :key="index" :countComment="item"></RecommentLists>
  </div>
</template>

<script>
import RecommentLists from "../components/RecommentLists";
import "@/assets/style/swiper.min.css";
import Swiper from "swiper";
import { Search } from "vant";
export default {
  name: "Community",

  data() {
    return {
      contact: [],
      swipeImg: [
        require("@/assets/img/circleswipetest/swipe1.jpg"),
        require("@/assets/img/circleswipetest/swipe2.jpg")
      ],
      babylong: {},
      referer: {},
      valueDate: "",
      dayday: "",
      userId: 1001
    };
  },
  components: {
    RecommentLists,
    [Search.name]: Search
  },
  created() {
    this.userId = sessionStorage.getItem("userId");
    console.log(this.userId);
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDay() + 1;
    var params = [];
    params.push(year, month, day);
    /* console.log("sssssss", params); */
    var date = params.join("-");
    /* var dates = this.dayday;
    console.log(dates); */
    
    this.axios
      .get(`/messagePush/findNowDay`, {
        params: {
          userId: this.userId,
          date: date
        }
      })
      .then(res => {
        this.babylong = res.data.data;
      });
    this.axios
      .get(`/posterior/postmanagement/recommend`, {
        params: {
          page: "",
          pagesize: ""
        }
      })
      .then(res => {
        this.referer = res.data.data;
        console.log("ssssssss", this.referer);
      });

    this.valueDate = new Date();
  },

  methods: {
    goSearchPages() {
      this.$router.push("/searchs");
    },
    goInfo() {
      this.$router.push("/infomation");
    },
    goTrigger() {
      this.$router.push("/trigger");
    },
    goBeforeDay() {
      /* this.userId = sessionStorage.getItem("userId"); */
     
      this.valueDate = new Date(
        this.valueDate.setDate(this.valueDate.getDate() - 1)
      );
      this.dayday =
        this.valueDate.getFullYear() +
        "-" +
        (this.valueDate.getMonth() + 1) +
        "-" +
        this.valueDate.getDate();
      this.axios
        .get(`/messagePush/findNowDay?`, {
          params: {
            userId: this.userId,
            date: this.dayday
          }
        })
        .then(res => {
          this.babylong = res.data.data;
        });
      this.axios
        .get(`/posterior/postmanagement/recommend`, {
          params: {
            page: "",
            pagesize: ""
          }
        })
        .then(res => {
          this.referer = res.data.data;
          console.log("ssssssss", this.referer);
        });

      console.log(this.dayday);
    },
    goAfterDay() {
      /* this.userId = sessionStorage.getItem("userId"); */
      this.valueDate = new Date(
        this.valueDate.setDate(this.valueDate.getDate() + 1)
      );
      this.dayday =
        this.valueDate.getFullYear() +
        "-" +
        (this.valueDate.getMonth() + 1) +
        "-" +
        this.valueDate.getDate();
      this.axios
        .get(`/messagePush/findNowDay`, {
          params: {
            userId: this.userId,
            date: this.dayday
          }
        })
        .then(res => {
          this.babylong = res.data.data;
        });
      this.axios
        .get(`/posterior/postmanagement/recommend`, {
          params: {
            page: "",
            pagesize: ""
          }
        })
        .then(res => {
          this.referer = res.data.data;
          console.log("ssssssss", this.referer);
        });
      console.log(this.dayday);
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
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.community {
  width: 750px;
  /*   height: 100vh; */
  /*    height: auto; */
  background: rgb(248, 248, 248);
  padding-bottom: 100px;
}
.top {
  padding-top: 40px;
  width: 750px;
  height: 280px;
  background: @themeColor;
  border-bottom-left-radius: 400px 200px;
  border-bottom-right-radius: 400px 200px;
  .search {
    width: 710px;
    height: 100px;
    /*  background: white; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .inputbox {
      width: 440px;
      height: 60px;
      border: none;
      border-radius: 30px;
      font-size: 30px;
      padding-left: 30px;
    }
    div {
      width: 80px;
      height: 100%;
      /*       background: red; */
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      i {
        color: white;
      }
      span {
        font-size: 30px;
        color: white;
      }
    }
  }
}
.wrap {
  padding-bottom: 80px;
}
.swiper-slide {
  height: auto;
  /*   margin-top: 20px; */
  img {
    width: 100%;
    height: 100%;
  }
}
.wrapper {
  width: 710px;
  height: 280px;
  background: white;
  margin: 0 auto;
  margin-top: -160px;
}
.wrapper1 {
  width: 710px;
  /* height: 370px; */
  padding-bottom: 20px;
  background: white;
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 30px;
  .cycle {
    width: 100%;
    /* height: 180px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content {
      width: 590px;
     /*  height: 100%; */
      .days {
        width: 100%;
        height: 100px;

        line-height: 100px;
        padding-left: 20px;
        box-sizing: border-box;
        color: @themeColor;
      }
      .handw {
        width: 100%;
        /* height: 80px; */
        /*   background: greenyellow; */
        padding-left: 20px;
       
        box-sizing: border-box;
        .width,
        .weight {
          margin-right: 20px;
          i {
            font-size: 28px;
            color: @themeColor;
          }
          span {
            font-size: 28px;
            color: rgb(190, 190, 190);
            padding-left: 10px;
             margin-bottom: 10px;
             
          }
        }
      }
    }
    .left-arrow,
    .right-arrow {
      width: 60px;
      display: flex;
      color: @themeColor;
      justify-content: center;
      align-items: center;
    }
  }
  .babymamistate {
    width: 100%;
    /* height: 190px;
 */
    div {
      /* height: 50px;
      width: 100%; */
          
      p {
        color: rgb(83, 82, 82);
        font-size: 26px;
        line-height: 20px;
        padding: 10px;
        letter-spacing: 3px;
        span {
          color: gray;
        }
      }
    }
  }
}
.recommend {
  width: 100%;
  height: 60px;
  margin-top: 20px;
  /*   background: greenyellow; */
  text-align: center;
  line-height: 60px;
  color: gray;
  font-size: 36px;
}
</style>