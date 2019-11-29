<template>
  <div class="app-entrance">
    <div class="header">
      <div class="status-bar"></div>
      <div class="navigation"></div>
    </div>

    <div class="app-entrance-wrap">
      <div class="app-entrance-title">
        <a class="login" href="javascript:;" @click="com='Login'" :class="{on: com=='Login'}">登录</a>

        <a
          class="register"
          href="javascript:;"
          @click="com='Register'"
          :class="{on: com=='Register'}"
        >注册</a>
      </div>

      <keep-alive>
        <!-- is 等于哪个组件名，就在这渲染哪个组件 -->
        <component :is="com"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Login from "../components/Login";
import Register from "../components/Register";

export default {
  name: "login",
  components: {
    Login,
    Register
  },
  data() {
    return {
      com: "Login"
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
@import "../assets/style/base.less";
.header {
  .status-bar,
  .navigation {
    width: 100%;
    background-color: @themeColor;
  }
  .status-bar {
    height: 40px;
  }
  .navigation {
    height: 88px;
  }
}
.app-entrance-wrap {
  display: flex;
  justify-content: center; // 让子元素水平居中
  align-items: center; // 让子元素垂直居中
  flex-direction: column; // 决定子元素排列方式

  .app-entrance-title {
    display: flex;
    justify-content: center; // 让子元素水平居中
    align-items: center; // 让子元素垂直居中
    margin: 60px 0;
    height: 60px;
    line-height: 60px;
    width: 400px;
    border: 1px solid @themeColor;
    border-radius: 40px;
    font-size: 24px;
    overflow: hidden;
    a {
      width: 50%;
      text-align: center;
      color: @themeColor;

      &.on,
      &:hover {
        color: white;
        background-color: @themeColor;
      }
    }
  }
}
</style>