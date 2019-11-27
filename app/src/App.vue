<template>
  <div id="app">
    <div id="nav">
      状态栏
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
@import "./assets/style/base.less";

#app {
  padding-bottom: 100px;
  #nav {
    width: 100%;
    height: 40px;
    text-align: center;
    font-size: 30px;
  }
}
</style>

