<template>
  <div class="circle">
    <header>
      <div class="header-bg"></div>
      <h3 class="title">圈子</h3>
      <ul>
        <li class="recommend" @click="select">
          <router-link to="/forum">推荐</router-link>
          <div class="line" v-bind:style="{ left:lineLeft }"></div>
        </li>
        <li class="followed" @click="select">
          <router-link to="/forum/followed">关注</router-link>
        </li>
      </ul>
    </header>
    <router-link to="/post/fromhome" class="post">
    <!--   <img src="@/assets/img/circleswipetest/post.png" alt=""> -->
      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
    </router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Forum",
  data() {
    return {
      lineLeft: "0px"
    };
  },
  components: {},
  methods: {
    select(e) {
      //导航选择
      if (e.target.innerText == "推荐") {
        this.lineLeft = "0px";
      } else if (e.target.innerText == "关注") {
        this.lineLeft = "100%";
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.circle {
  width: 750px;
  position: absolute;
  z-index: -9999;
  background: rgb(248, 248, 248);
  header {
    width: 750px;
    padding-top: 40px;
    .header-bg {
      width: 100%;
      height: 250px;
      position: absolute;
      top: 0;
      border-bottom-left-radius: 350px 220px;
      border-bottom-right-radius: 350px 220px;
      background: @themeColor;
      z-index: -1;
    }
    h3 {
      font-weight: 500;
      color: #fff;
      text-align: center;
      margin-bottom: 10px;
      font-size: 36px;
    }
    ul {
      width: 100%;
      display: flex;
      justify-content: center;
      color: #fff;
      font-size: 36px;
      li {
        box-sizing: border-box;
        width: 120px;
        padding: 10px;
        text-align: center;
        position: relative;
        a {
          color: #fff;
        }
      }
      .recommend .line {
        width: 100%;
        height: 8px;
        background: #fff;
        border-radius: 10px;
        position: absolute;
        bottom: 0;
        transition: all 0.2s;
      }
    }
  }
}
.post {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  position: fixed;
  bottom: 150px;
  right: 50px;
  background: rgba(255, 228, 105,0.9);
  color: #fff;
  text-align: center;
  line-height: 90px;
  text-indent: 3px;
}
</style>
