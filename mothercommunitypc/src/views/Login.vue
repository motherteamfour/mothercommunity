<template>
  <div class="login">
    <form class="login-box">
      <h2>motherAdmin</h2>
      <p>妈妈怀孕管理系统</p>
      <div class="login-input">
        <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="username" @blur="judgeName(username)"></el-input>
      </div>
      <div class="login-input">
        <el-input placeholder="密码" prefix-icon="el-icon-lock" v-model="userpass" @blur="judgePassword(userpass)"></el-input>
      </div>
      <div class="login-input login-input-three">
        <div class="login-input-verification">
          <el-input placeholder="图形验证码" prefix-icon="el-icon-umbrella" v-model="input3"></el-input>
        </div>
        
        <div class="verification-code" @click="refreshCode">
          <s-identify :identifyCode="identifyCode"></s-identify>
        </div>
      </div>
      <div class="login-about-password">
        <el-checkbox label="记住密码" name="type"></el-checkbox>
        <router-link class="login-forgetPassword" to="/forgetPassword">忘记密码?</router-link>
      </div>
      <el-button class="login-btn" @click="getLogin">登入</el-button>
    </form>
  </div>
</template>

<script>

import SIdentify from '@/components/SIdentify.vue'

export default {
  data() {
    return {
      username: '',
      userpass: '',
      input3: '',
      identifyCodes: '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', // 验证码字符的集合
      identifyCode: '',
      passwordFormat: false

    }
  },
  components: {
    SIdentify
  },
  mounted () {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods:{
    success(msg) {
      this.$message({
          showClose: true,
          message: msg,
          type: 'success'
        });
    },
    defeated(msg) {
      this.$message({
          showClose: true,
          message: msg,
          type: 'error'
        });
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
      console.log('当前验证码==', this.identifyCode)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    },
    judgePassword(msg) {
      var reg = /^(\w){5,15}$/;
      if(!reg.test(msg)) {
        this.defeated('密码格式不正确')
      }
    },
    judgeName(msg) {
      var reg = /^[a-zA-Z]{5,15}$/;
      if(!reg.test(msg)) {
        this.defeated('用户名格式不正确')
      }
    },
    getLogin() {
      this.axios
        .post("/api/admin/login1", {
          adminName: this.username,
          adminPassword: this.userpass
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code == "200") {
            // var token = "njaksxbxkjasbkjcxasbjk" // 模拟后台返回的token
            var token = res.data.token;
            sessionStorage.setItem("token", token);

            // 获取参数（未登录时想访问的路由）
            var url = this.$route.query.redirect;

            url = url ? url : "/home";
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
}
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
        color: rgb(0,150,136);
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
      opacity: .8;
    }
    .el-checkbox__input.is-checked+.el-checkbox__label {
      color: #606266;
    }
  }
  
</style>