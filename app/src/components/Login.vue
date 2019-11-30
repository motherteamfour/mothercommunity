<template>
  <form class="login-form">
    <div class="form-group">
      <span>手机号</span>
      <input type="text" placeholder="输入手机号" v-model="username" />
    </div>
    <div class="form-group">
      <span>密码</span>

      <input type="password" placeholder="6-16位" v-model="userpass" @keyup.enter="getLogin" />

      <router-link :to="'/login/findpassword'">
        <button type="button" class="forget-password">忘记密码</button>
      </router-link>
    </div>
    <div class="form-group login-from-group">
      <input type="button" value="登录" @click="getLogin" />
    </div>
  </form>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      userpass: ""
    };
  },
  methods: {
    getLogin() {
      this.axios
        .post("/zp/user/loginByPassword", {
          userPhone: this.username,
          userPassword: this.userpass
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code == "200") {
            var token = res.data.data;
            var userId = res.data.id;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("userId", userId);

            // 获取参数（未登录时想访问的路由）
            var url = this.$route.query.redirect;

            url = url ? url : "/";
            // 切换路由
            this.$router.replace(url);
          } else {
            console.log("登陆失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/style/base.less";
@zitiColor: #ccc;

.login-form {
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; // 决定子元素排列方式

  .form-group {
    font-size: 28px;
    color: @zitiColor;
    border-bottom: 1px solid @zitiColor;
    width: 600px;

    span {
      float: left;
      height: 100px;
      width: 120px;
      text-align: center;
      line-height: 100px;
      color: @themeColor;
      vertical-align: top;
    }

    input[type="text"],
    input[type="password"] {
      width: 360px;
      height: 98px;
      line-height: 98px;
      border: none;
      outline: none;
    }
    .forget-password {
      width: 120px;
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      color: white;
      border-radius: 25px;
      border: none;
      outline: none;
      background-color: @themeColor;
      &:active {
        color: @zitiColor;
      }
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
        color: @zitiColor;
      }
    }
  }
  .login-from-group {
    border: none;
    width: 500px;
  }
}
</style>