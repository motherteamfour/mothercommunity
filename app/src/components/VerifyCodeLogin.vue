<template>
  <form class="login-form">
    <div class="form-group">
      <span>手机号</span>
      <input type="text" placeholder="输入手机号" v-model="username" @change="verifyPhone" />
    </div>
    <div class="form-group">
      <span>验证码</span>

      <input type="password" placeholder="输入验证码" v-model="userpass" @keyup.enter="getLogin" />
      <button type="button" class="send-verify" @click="getVerifyCode" v-show="current==1">验证码</button>
      <button type="button" class="send-verify" v-show="current==2">{{count1}}</button>
    </div>
    <div class="form-group login-from-group">
      <input type="button" value="登录" @click="getLogin" />
    </div>
    <!-- 模态框 -->
    <van-popup class="model" v-model="show" round>
      <div class="top">
        <p class="one">{{one}}</p>
        <p class="two">{{two}}</p>
      </div>
      <div class="bottom" @click="closeModel">好的</div>
    </van-popup>
  </form>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

import Vue from "vue";
import { Popup } from "vant";

Vue.use(Popup);

export default {
  name: "login",
  data() {
    return {
      current: 1,
      username: "",
      userpass: "",
      show: false,
      one: "",
      two: ""
    };
  },
  computed: {
    count1() {
      return this.$store.state.countDown; // 写法1
    }
  },
  methods: {
    ...mapActions(["decrementSync"]),
    ...mapMutations(["resetcountDown"]),
    // 验证手机号码是否合法
    verifyPhone() {
      if (!/^1[3456789]\d{9}$/.test(this.username)) {
        this.one = "提示";
        this.two = "手机号不合法";
        this.show = true;
      }
    },
    // 验证码登录
    getLogin() {
      console.log("登录");
      if (this.username.length == 0 || this.userpass.length == 0) {
        this.one = "提示";
        this.two = "验证码或手机号不能为空";
        this.show = true;
      } else {
        this.axios
          .post(
            `/zp/user/loginByCode?phone=${this.username}&code=${this.userpass}`
          )
          .then(res => {
            console.log(res.data);
            var token = res.data.token;
            var userId = res.data.data;
            // 用户已注册
            if (res.data.code == "200" || res.data.code == "201") {
              // 将token和userId保存
              sessionStorage.setItem("token", token);
              sessionStorage.setItem("userId", userId);
            }

            if (res.data.code == "200") {
              // 非第一次登录进入首页
              this.$router.replace("/");
            } else if (res.data.code == "201") {
              // 第一次登录进入填写信息的页面
              this.$router.replace("/selectState");
            } else if (res.data.code == "204") {
              // 该用户不存在，请先注册
              this.one = "提示";
              this.two = "该用户不存在，请先注册";
              this.show = true;
            } else if (res.data.code == "400") {
              //账号或密码错误
              this.one = "提示";
              this.two = "账号或密码错误";
              this.show = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 获取验证码
    getVerifyCode() {
      var value = this.username.trim();
      console.log("用户名", value);
      if (!value.length) {
        this.one = "提示";
        this.two = "请先输入手机号码";
        this.show = true;
      } else {
        this.axios
          .post(`zp/user/sendcode?phone=${this.username}`)
          .then(res => {
            console.log("获取验证码：", res.data);

            if (res.data.code == 200) {
              this.current = 2;
              var that = this;
              var timer = setInterval(function() {
                that.decrementSync();
                console.log(that.$store.state.countDown);
                if (that.$store.state.countDown <= 1) {
                  clearInterval(timer);
                  that.current = 1;
                  // 重置倒计时数字
                  that.resetcountDown(5);
                }
              }, 1000);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //关闭模态框
    closeModel() {
      this.show = false;
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
    // color: @zitiColor;
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
    .send-verify {
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

    input[type="text"],
    input[type="password"] {
      width: 360px;
      height: 98px;
      line-height: 98px;
      border: none;
      outline: none;
      font-size: 28px;
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

.model {
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  width: 540px;
  .top {
    height: 120px;
    padding: 20px 0;
    margin: 0 auto;
    box-sizing: border-box;
    text-align: center;

    .one {
      font-weight: bold;
      font-size: 30px;
    }
    .two {
      font-size: 24px;
    }
  }
  .bottom {
    border-top: 1px solid #f9f9f9;
    height: 90px;
    line-height: 90px;
    text-align: center;
    font-size: 30px;
    color: blue;
  }
}
</style>