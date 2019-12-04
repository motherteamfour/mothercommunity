<template>
  <div class="register-pass">
    <div class="header">
      <div class="status-bar"></div>
      <div class="navigation">
        <i class="fa fa-angle-left" @click="back"></i>注册
      </div>
    </div>
    <form class="register-form">
      <div class="form-group">
        <span>密&nbsp;&nbsp;&nbsp;&nbsp;码</span>
        <input type="password" placeholder="6-16位" v-model="password" />
      </div>
      <div class="form-group">
        <span>确认密码</span>
        <input type="password" v-model="confirmPassword" />
      </div>
      <div class="form-group register-from-group">
        <input type="button" value="完成" @click="getComplete" />
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
import Vue from "vue";
import { Popup } from "vant";

Vue.use(Popup);

export default {
  name: "RegisterPass",
  data() {
    return {
      password: "",
      confirmPassword: "",
      userPhone: "",
      show: false,
      one: "",
      two: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    // 完成
    getComplete() {
      if (this.password == this.confirmPassword) {
        // this.axios
        //   .post(
        //     `/zp/user/register?phone=${this.password}&code=${this.userpass}`
        //   )
        console.log("电话和密码", this.userPhone, this.password);
        this.axios
          .post("/zp/user/register", {
            userPhone: this.userPhone,
            userPassword: this.password
          })
          .then(res => {
            console.log(res.data);
            if (res.data.code == 200) {
              this.one = "注册成功";
              this.two = "请登录";
              this.show = true;
              // 注册成功、返回登录页
              this.$router.replace(`/login`);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.one = "请重新输入";
        this.two = "密码与确认密码不相同";
        this.show = true;
      }
    },
    //关闭模态框
    closeModel() {
      this.show = false;
    }
  },
  created() {
    console.log("创建", this.$store.state.userPhone);
    this.userPhone = this.$store.state.userPhone;
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