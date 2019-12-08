<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div class="home-content">
      <ul class="home-tabbar">
        <li>
          <router-link to="/">社区</router-link>
        </li>
        <li>
          <router-link to="/Forum">圈子</router-link>
        </li>
        <li>
          <router-link to="/qanda">问答</router-link>
        </li>
        <li>
          <router-link to="/encyclopedia">百科</router-link>
        </li>
        <li>
          <router-link to="/my">我的</router-link>
        </li>
      </ul>
    </div>
    <div class="home-main">
      <!-- 允许哪些可以被缓存 -->
      <keep-alive include="Community,QandA,Forum,Encyclopedia,My">
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.home-tabbar {
  width: 750px;
  height: 88px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
}
.home-tabbar li {
    display: inline-block;
    width: 100px;
    height: 80px;
    text-align: center;
    a{
      font-size: 28px;
    }
}

.router-link-exact-active {
  color: @themeColor;
}
</style>
