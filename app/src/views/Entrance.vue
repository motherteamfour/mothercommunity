<template>
  <div class="app-entrance">
    <div class="header">
      <div class="status-bar"></div>
      <div class="navigation">登录</div>
    </div>

    <div class="app-entrance-wrap">
      <div class="app-entrance-title">
        <a class="login" href="javascript:;" @click="com='Login'" :class="{on: com=='Login'}">密码登录</a>

        <a
          class="verify-code-login"
          href="javascript:;"
          @click="com='VerifyCodeLogin'"
          :class="{on: com=='VerifyCodeLogin'}"
        >验证码登录</a>
      </div>

      <keep-alive>
        <!-- is 等于哪个组件名，就在这渲染哪个组件 -->
        <component :is="com"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Login from "../components/Login";//登录
import VerifyCodeLogin from "../components/VerifyCodeLogin";//验证码登录
import Register from "../components/Register";//注册

export default {
  name: "login",
  components: {
    Login,
    VerifyCodeLogin,
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
    line-height: 88px;
    color: white;
    text-align: center;
    font-size: 36px;
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
    margin-top: 120px;
    margin-bottom: 60px;
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