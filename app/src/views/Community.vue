<template>
  <div class="community">
    <div class="top">
      <div class="search">
        <div @click="goTrigger()">
          <i class="fa fa-lastfm" aria-hidden="true"></i>
          <span>切换</span>
        </div>
        <form>
          <div class="form-group">
            <div class="form-wrapper">
              <i class="fa fa-search fa-lg"></i>
            </div>
            <input type="text" placeholder="输入搜索关键词并按回车键" class="form-control" @click="goSearchPages()" />
          </div>
        </form>
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
        <div class="left-arrow">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </div>
        <div class="content">
          <div class="days">孕7周1天</div>
          <div class="handw">
            <span class="width">
              <i class="fa fa-thermometer-half" aria-hidden="true"></i>
              <span>顶臀长0.7厘米</span>
            </span>
            <span class="weight">
              <i class="fa fa-map-o" aria-hidden="true"></i>
              <span>体重0.9克</span>
            </span>
          </div>
        </div>
        <div class="right-arrow">
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </div>
      </div>
      <div class="babymamistate">
        <div class="baby">
          <p>
            <span>宝宝发育：</span> 可以明显看到分化出来的小手指和小脚趾啦，不过现在还有蹼连在一起。
          </p>
        </div>
        <div class="mami">
          <p>
            <span>宝宝发育：</span>可以明显看到分化出来的小手指和小脚趾啦，不过现在还有蹼连在一起。
          </p>
        </div>
      </div>
    </div>
    <div class="recommend">热门推荐</div>

    <RecommentLists></RecommentLists>
    <RecommentLists></RecommentLists>
    <RecommentLists></RecommentLists>
  </div>
</template>

<script>
import RecommentLists from "../components/RecommentLists";
import "@/assets/style/swiper.min.css";
import Swiper from "swiper";
export default {
  name: "Community",
  data() {
    return {
      contact: [],
      swipeImg: [
        require("@/assets/img/circleswipetest/swipe1.jpg"),
        require("@/assets/img/circleswipetest/swipe2.jpg")
      ]
    };
  },
  components: {
    RecommentLists
  },
  methods: {
    goSearchPages() {
      this.$router.push('/searchs')
    },
    goInfo() {
      this.$router.push('/infomation')
    },
    goTrigger() {
      this.$router.push('/trigger')
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
        nextEl:".swiper-button-next",
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
  /*  height: auto */
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
    input {
      width: 440px;
      height: 60px;
      border: none;
      border-radius: 30px;
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
  .form-group {
    position: relative;
  }
  .form-wrapper i.fa {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .form-group input {
    text-indent: 30px;
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
  height: 370px;
  background: white;
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 30px;
  .cycle {
    width: 100%;
    height: 180px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content {
      width: 590px;
      height: 100%;
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
        height: 80px;
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
    height: 190px;

    div {
      /* height: 50px;
      width: 100%; */
      /*     background: yellow; */
      p {
        color: rgb(83, 82, 82);
        font-size: 26px;
        line-height: 40px;
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