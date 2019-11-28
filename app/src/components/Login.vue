<template>
  <form class="login-form">
    <div class="form-group">
      <span>手机号</span>
      <input type="text" placeholder="输入手机号" v-model="username" />
    </div>
    <div class="form-group">
      <span>密码</span>

      <input type="password" placeholder="6-16位" v-model="userpass" @keyup.enter="getLogin" />
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
      // console.log("访问查询参数：", this.$route.query.id);
      // this.$route：保存了当前路由信息
      console.log("登录", this.username, this.userpass);

      this.axios
        .post("/api/zp/user/loginByPassword", {
          phone: this.username,
          password: this.userpass
          // .post("/api/users/login", {
          //   username: this.username,
          //   userpass: this.userpass
        })
        .then(res => {
          console.log(res.data);
          if (res.data.state == "200") {
            // var token = "njaksxbxkjasbkjcxasbjk" // 模拟后台返回的token
            var token = res.data.token;
            sessionStorage.setItem("token", token);

            // 获取参数（未登录时想访问的路由）
            var url = this.$route.query.redirect;

            url = url ? url : "/my";
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

.login-form {
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

    input[type="text"],
    input[type="password"] {
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
  .login-from-group {
    border: none;
  }
}
</style>