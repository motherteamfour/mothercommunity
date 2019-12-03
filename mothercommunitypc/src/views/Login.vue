<template>
  <div class="login">
    <form class="login-box">
      <h2>motherAdmin</h2>
      <p>妈妈怀孕管理系统</p>
      <div class="login-input">
        <el-input
          placeholder="用户名"
          prefix-icon="el-icon-user"
          v-model="username"
          @blur="judgeName(username)"
        ></el-input>
      </div>
      <div class="login-input">
        <el-input
          type="password"
          placeholder="密码"
          prefix-icon="el-icon-lock"
          v-model="userpass"
          @blur="judgePassword(userpass)"
        ></el-input>
      </div>
      <div class="login-input login-input-three">
        <div class="login-input-verification">
          <el-input
            placeholder="图形验证码"
            prefix-icon="el-icon-umbrella"
            v-model="input3"
            @blur="judgeCode(input3)"
          ></el-input>
        </div>

        <div class="verification-code" @click="refreshCode">
          <s-identify :identifyCode="identifyCode"></s-identify>
        </div>
      </div>
      <div class="login-about-password">
        <el-checkbox label="记住密码" name="type" v-model="isSelect"></el-checkbox>
        <router-link class="login-forgetPassword" to="/forgetPassword">忘记密码?</router-link>
      </div>
      <el-button class="login-btn" @click="getLogin">登入</el-button>
    </form>
  </div>
</template>

<script>
import SIdentify from "@/components/SIdentify.vue";

export default {
  data() {
    return {
      username: "",
      userpass: "",
      input3: "",
      isSelect: false,
      identifyCodes: "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", // 验证码字符的集合
      identifyCode: "",
      userpassFormat: false,
      usernameFormat: false,
      codeFormat: false,
      saveDays: 5  // cookie保存天数
    };
  },
  components: {
    SIdentify
  },
  watch: {
    isSelect() {
      if(this.isSelect){
        this.userpassFormat = true;
        this.usernameFormat = true;
      }
    }
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
    this.getCookie();
  },
  methods: {
    success(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "success"
      });
    },
    defeated(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "error"
      });
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
      console.log("当前验证码==", this.identifyCode);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    judgePassword(msg) {
      var reg = /^(\w){5,15}$/;
      if (reg.test(msg)) {
        return (this.userpassFormat = true);
      }
      this.defeated("密码格式不正确");
    },
    judgeName(msg) {
      var reg = /^[a-zA-Z]{5,15}$/;
      if (reg.test(msg)) {
        return (this.usernameFormat = true);
      }
      this.defeated("用户名格式不正确");
    },
    judgeCode(msg) {
      if (this.identifyCode === msg) {
        return (this.codeFormat = true);
      }
    },
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.username = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.userpass = arr2[1];
            this.isSelect = true;
          }
        }
      }
    },
    //清除cookie
    clearCookie() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
    getLogin() {
      if (this.userpassFormat && this.usernameFormat) {
        if (this.codeFormat) {
          this.axios
            .post("/admin/login1", {
              adminName: this.username,
              adminPassword: this.userpass
            })
            .then(res => {
              console.log(res.data);
              if (res.data.code == "200") {
                if (this.isSelect) {
                  //传入账号名，密码，和保存天数3个参数
                  this.setCookie(
                    this.username,
                    this.userpass,
                    this.saveDays
                  );
                } else {
                  //清空Cookie
                  this.clearCookie();
                }
                this.success("登录成功");
                // var token = "njaksxbxkjasbkjcxasbjk" // 模拟后台返回的token
                var token = res.data.data;
                sessionStorage.setItem("token", token);

                sessionStorage.setItem("userId", res.data.id);

                // 获取参数（未登录时想访问的路由）
                var url = this.$route.query.redirect;

                url = url ? url : "/home";
                // 切换路由
                this.$router.replace(url);
              } else if (res.data.code == "4002" || res.data.code == "4001") {
                this.defeated("用户名或密码错误");
              } else {
                console.log("登陆失败");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.defeated("验证码不正确");
        }
      } else {
        this.defeated("格式不正确");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login-box {
  width: 400px;
  height: 500px;
  background: rgb(242, 242, 242);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  h2 {
    padding-top: 50px;
    margin-bottom: 5px;
    font-size: 28px;
    font-weight: 500;
  }
  p {
    font-size: 14px;
    color: #999;
    margin-bottom: 40px;
  }
  .login-input {
    width: 80%;
    margin: 0 auto;
    padding: 10px 0;
    .login-input-verification {
      float: left;
      width: 60%;
      margin-right: 16px;
    }
    .verification-code {
      float: left;
      width: 35%;
      height: 40px;
      background: white;
    }
  }
  .login-input-three {
    text-align: left;
    height: 40px;
  }
  .login-about-password {
    width: 80%;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
    .el-checkbox {
      float: left;
    }
    .login-forgetPassword {
      float: right;
      text-decoration: none;
      color: rgb(0, 150, 136);
      font-size: 14px;
      font-weight: 500;
    }
  }
  .login-btn {
    width: 80%;
    background-color: #009688;
    color: #fff;
  }
  .login-btn:hover {
    opacity: 0.8;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #606266;
  }
}
</style>