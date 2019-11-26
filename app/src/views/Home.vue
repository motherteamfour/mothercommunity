<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div class="home-content">
      <ul class="home-tabbar">
        <li>
          <router-link to="/">社区</router-link>
        </li>
        <li>
          <router-link to="/circle">圈子</router-link>
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
      <keep-alive include="Community,Circle,QandA,Encyclopedia,My">
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
.home-tabbar {
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  background: #eee;
}
</style>
