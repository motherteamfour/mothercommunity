<template>
  <div id="app">
    <div id="nav">状态栏</div>
    <router-view />
  </div>
</template>

<style lang="less">
@import "./assets/style/base.less";

#nav {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  background: rgba(255, 255, 255, 0.1);
  position: fixed;
  top: 0;
  z-index: 99999;
}
</style>

