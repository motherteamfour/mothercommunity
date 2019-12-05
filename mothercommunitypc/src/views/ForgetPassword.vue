<template>
  <div class="login" v-loading.fullscreen.lock="fullscreenLoading">
    <form class="login-box" v-show="show">
      <h2>motherAdmin</h2>
      <p>妈妈怀孕管理系统</p>
      <div class="login-input">
        <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="username" @blur="judgeName(username)"></el-input>
      </div>
      
      <div class="login-input login-input-three">
        <div class="login-input-verification">
          <el-input placeholder="手机号" prefix-icon="el-icon-phone-outline" v-model="phone" @blur="judgePhone(phone)"></el-input>
        </div>
        
        <div class="verification-code">
          <button type="button" class="getCode" @click="getCode(username,phone)">获取验证码</button>
        </div>
      </div>
      <div class="login-input">
        <el-input placeholder="请输入验证码" prefix-icon="el-icon-lock" v-model="verificationCode" @blur="judgeCode(verificationCode)"></el-input>
      </div>
      <el-button class="login-btn" @click="sendCode">下一步</el-button>
    </form>
    <form class="login-box" v-show="!show">
      <h2>motherAdmin</h2>
      <p>妈妈怀孕管理系统</p>
      <div class="login-input">
        <el-input type="password" placeholder="请输入新密码" prefix-icon="el-icon-lock" v-model="userpass" @blur="judgePassword(userpass)"></el-input>
      </div>
      
      <div class="login-input">
        <el-input type="password" placeholder="请再次输入密码" prefix-icon="el-icon-lock" v-model="userpass2" @blur="judgePassword(userpass2)"></el-input>
      </div>
      <el-button class="login-btn" @click="changePassword">确定</el-button>
    </form>
  </div>
</template>

<script>


export default {
  data() {
    return {
      username: '',
      phone: '',
      userpass: '',
      userpass2: '',
      verificationCode: '',
      show: true,
      usernameFormat: false,
      phoneFormat: false,
      codeFormat: false,
      userpassFormat: false,
      userid: 1,
      fullscreenLoading: false
    }
  },
  components: {
    
  },
  mounted () {
    
  },
  methods:{
    changeShow(){
      this.show = !this.show
    },
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
    judgeName(msg) {
      var reg = /^[a-zA-Z]{5,15}$/;
      if (reg.test(msg)) {
        return (this.usernameFormat = true);
      }
      this.usernameFormat = false;
      this.defeated("用户名格式不正确");
    },
    judgePhone(msg) {
      var reg = /^1[3456789]\d{9}$/;
      if (reg.test(msg)) {
        return (this.phoneFormat = true);
      }
      this.phoneFormat = false;
      this.defeated("手机格式不正确");
    },
    judgeCode(msg) {
      var reg = /^\d{6}$/;
      if (reg.test(msg)) {
        return (this.codeFormat = true);
      }
      this.codeFormat = false;
      this.defeated("验证码格式不正确");
    },
    judgePassword(msg) {
      var reg = /^(\w){5,15}$/;
      if (reg.test(msg)) {
        return (this.userpassFormat = true);
      }
      this.userpassFormat = false;
      this.defeated("密码格式不正确");
    },
    getCode(adminName,adminPhone) {
      this.fullscreenLoading = true;
      if(this.usernameFormat==true&&this.phoneFormat==true) {
        this.axios
        .get("/admin/sendCode?adminName=" + adminName + "&adminPhone=" + adminPhone)
        .then((res) => {
          if(res.data.code==200) {
            this.fullscreenLoading = false;
            this.success("验证码发送成功")
            console.log(res.data);
            this.userid = res.data.id;
          }else if(res.data.code==400){
            this.fullscreenLoading = false;
            this.defeated("此用户名或者手机号不存在");
          }
        })
        .catch((error) => {
          console.log(error);
          this.fullscreenLoading = false;
          this.defeated('服务器出错，请稍后重试')
        });
      }else {
        this.defeated("用户名或者手机格式不正确");
      }
    },
    sendCode() {
      if(this.codeFormat==true&&this.phoneFormat==true){
        console.log(this.phone,this.verificationCode);
        this.axios({
          url: "/admin/judgeCode",
          method: "post",
          data: `adminPhone=${this.phone}&code=${this.verificationCode}`,
          header: {
            "Content-Type": "application/X-WWW-form-urlencoded"
          }
        })
          .then((res) => {
            console.log(res.data);
            if(res.data.code==200) {
              this.success("验证成功");
              this.changeShow();
            }else if(res.data.code==4015) {
              this.defeated("验证码错误");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    changePassword() {
      if(this.userpass == this.userpass2) {
        this.axios({
          url: "/admin/updatePassword",
          method: "post",
          data: `adminId=${this.userid}&adminPassword =${this.userpass}`,
          header: {
            "Content-Type": "application/X-WWW-form-urlencoded"
          }
        })
          .then((res) => {
            console.log(res.data);
            if(res.data.code==200) {
              this.success("修改成功");
              this.$router.replace('/login');
            }
          })
          .catch(err => {
            console.log(err);
          });
      }else {
        this.defeated("两次密码输入不一致");
      }
    }
  }
}
</script>

<style lang="less" scoped>
  
  .login-box {
    width: 400px;
    height: 400px;
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
      .getCode {
        width: 100%;
        height: 100%;
        background: #fff;
        outline: none;
        border: 1px solid #C9C9C9;
        cursor: pointer;
      }
      .getCode:hover {
        border-color: #009688;
      }
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