<template>
  <div class="login">
    <form class="login-box" v-show="show">
      <h2>motherAdmin</h2>
      <p>妈妈怀孕管理系统</p>
      <div class="login-input">
        <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="input1"></el-input>
      </div>
      
      <div class="login-input login-input-three">
        <div class="login-input-verification">
          <el-input placeholder="手机号" prefix-icon="el-icon-phone-outline" v-model="input3"></el-input>
        </div>
        
        <div class="verification-code">
          <button type="button" class="getCode">获取验证码</button>
        </div>
      </div>
      <div class="login-input">
        <el-input placeholder="请输入验证码" prefix-icon="el-icon-lock" v-model="input2"></el-input>
      </div>
      <el-button class="login-btn" @click="changeShow">下一步</el-button>
    </form>
    <form class="login-box" v-show="!show">
      <h2>motherAdmin</h2>
      <p>妈妈怀孕管理系统</p>
      <div class="login-input">
        <el-input type="password" placeholder="请输入新密码" prefix-icon="el-icon-lock" v-model="input1"></el-input>
      </div>
      
      <div class="login-input">
        <el-input type="password" placeholder="请再次输入密码" prefix-icon="el-icon-lock" v-model="input2"></el-input>
      </div>
      <el-button class="login-btn" @click="changeShow">确定</el-button>
    </form>
  </div>
</template>

<script>


export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      show: true
    }
  },
  components: {
    
  },
  mounted () {
    
  },
  methods:{
    changeShow(){
      this.show = !this.show
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