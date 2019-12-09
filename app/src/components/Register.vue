<template>
  <form class="register-form">
    <div class="form-group">
      <span>手机号</span>
      <input type="text" placeholder="输入手机号" v-model="username" />
    </div>

    <div class="form-group register-from-group">
      <input type="button" value="注册" @click="getRegister" />
    </div>
  </form>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: ""
    };
  },
  methods: {
    getRegister() {
      console.log("注册");
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";

.register-form {
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; // 决定子元素排列方式
  .form-group {
    font-size: 28px;
    color: #cccccc;
    border-bottom: 1px solid #cccccc;

    span {
      float: left;
      height: 100px;
      width: 120px;
      text-align: center;
      line-height: 100px;
      color: @themeColor;
      vertical-align: top;
    }
    input[type="text"] {
      width: 480px;
      height: 100px;
      line-height: 100px;
      border: none;
      outline: none;
    }

    input[type="button"] {
      width: 500px;
      height: 90px;
      line-height: 90px;
      margin-top: 100px;
      background: @themeColor;
      color: #fff;
      border: none;
      outline: none;
      border-radius: 45px;

      &:active {
        box-shadow: 1px 1px 3px #10412b;
      }
    }
  }
  .register-from-group {
    border: none;
  }
}
</style>