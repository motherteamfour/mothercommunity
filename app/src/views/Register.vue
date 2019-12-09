<template>
  <div class="register">
    <div class="header">
      <div class="status-bar"></div>
      <div class="navigation">
        <i class="fa fa-angle-left" @click="back"></i>注册
      </div>
    </div>
    <form class="register-form">
      <div class="form-group">
        <span>手机号</span>
        <input type="text" placeholder="输入手机号" v-model="username" />
      </div>
      <div class="form-group">
        <span>验证码</span>
        <input type="password" placeholder="输入验证码" v-model="userpass" />
        <button type="button" class="send-verify" @click="getVerifyCode" v-show="current==1">验证码</button>
        <button type="button" class="send-verify" v-show="current==2">{{count1}}</button>
      </div>
      <div class="form-group register-from-group">
        <input type="button" value="下一步" @click="getRegister" />
      </div>
    </form>
    <!-- 模态框 -->
    <van-popup class="model" v-model="show" round>
      <div class="top">
        <p class="one">{{one}}</p>
        <!-- 未填写手机号码 -->
        <p class="two">{{two}}</p>
      </div>
      <div class="bottom" @click="closeModel">好的</div>
    </van-popup>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

import Vue from "vue";
import { Popup } from "vant";

Vue.use(Popup);

export default {
  name: "Register",
  data() {
    return {
      current: 1,
      username: "",
      userpass: "",
      info: "",
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
    ...mapMutations(["setPhone"]),
    ...mapActions(["decrementSync"]),
    ...mapMutations(["resetcountDown"]),
    back() {
      this.$router.go(-1); //返回上一层
    },
    // 验证验证码
    getRegister() {
      var name = this.username.trim();
      var pass = this.userpass.trim();
      console.log("name,pass", name, pass);
      console.log("name,pass", name.length, pass.length);
      if (name.length == 0 || pass.length == 0) {
        this.one = "提示";
        this.two = "验证码或手机号不能为空";
        this.show = true;
      } else {
        this.axios
          .post("/zp/register/judegRegisterforuser", {
            registerPhone: this.username,
            registerCode: this.userpass
          })
          .then(res => {
            console.log(res.data);

            if (res.data.code == "200") {
              this.setPhone(this.username);
              // registerPhone: this.username

              // 进入输入密码页面
              this.$router.replace(`/registerPass`);
            } else if (res.data.code == "800") {
              this.one = "提示";
              this.two = "验证码错误";
              this.show = true;
            } else if (res.data.code == "400") {
              this.one = "提示";
              this.two = "该用户已存在";
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
      var name = this.username.trim();
      console.log("用户名", name);
      if (!name.length) {
        this.one = "未填写手机号码";
        this.two = "请输入手机号";
        this.show = true;
      } else {
        this.axios
          .post(`zp/user/sendcode?phone=${this.username}`)
          .then(res => {
            console.log("获取验证码：", res.data);
            // 倒计时
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

.header {
  padding: 0 30px;
  background-color: @themeColor;

  .status-bar,
  .navigation {
    width: 100%;
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
    .fa-angle-left {
      font-size: 80px;
      vertical-align: top;
      color: #ccc;
      float: left;
    }
  }
}
.register-form {
  padding: 0 20px;
  margin-top: 120px;
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
      color: black;
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
  .register-from-group {
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