<template>
  <div class="changePassword">
    <p class="title">修改密码</p>
    <form class="changePassword-form">
      <div class="basicInformation-form-item">
        <label class="basicInformation-form-item-label">新密码</label>
        <div class="basicInformation-form-item-input">
          <el-input v-model="input2" @blur="judgePasswordOne(input2)" type="password"></el-input>
        </div>
        <label class="basicInformation-form-item-label">5到15个字符</label>
      </div>
      <div class="basicInformation-form-item">
        <label class="basicInformation-form-item-label">确认新密码</label>
        <div class="basicInformation-form-item-input">
          <el-input v-model="input3" @blur="judgePasswordTwo(input3)" type="password"></el-input>
        </div>
      </div>
      <div class="basicInformation-form-item">
          <el-button class="form-affirm" type="button" @click="changePasswork">确认修改</el-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'changePassword',
  data() {
    return {
      input2: '',
      input3: '',
      userpassFormat1: false,
      userpassFormat2: false
    }
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
    judgePasswordOne(msg) {
      var reg = /^(\w){5,15}$/;
      if (reg.test(msg)) {
        return (this.userpassFormat1 = true);
      }
      this.userpassFormat1 = false;
      this.defeated("密码格式不正确");
    },
    judgePasswordTwo(msg) {
      var reg = /^(\w){5,15}$/;
      if (reg.test(msg)) {
        return (this.userpassFormat2 = true);
      }
      this.userpassFormat2 = false;
      this.defeated("密码格式不正确");
    },
    changePasswork() {
      const userId = sessionStorage.getItem("userId")
      
      if(this.input2==this.input3) {
        if(this.userpassFormat2&&this.userpassFormat1) {
          this.axios({
          url: "/admin/updatePassword",
          method: "post",
          data: `adminId=${userId}&adminPassword=${this.input2}`,
          header: {
            "Content-Type": "application/X-WWW-form-urlencoded"
          }
        })
          .then((res) => {
            console.log(res.data);
            if(res.data.code==200) {
              this.success('密码修改成功')
              this.input2=''
              this.input3=''
            }
          })
          .catch(err => {
            console.log(err);
          });
        }else {
          this.defeated('密码格式不正确')
        }
        
      }else {
        this.defeated("两次密码输入不一致");
      }
      
    }
  }
}
</script>

<style lang="less" scoped>
.changePassword {
  width: 1146px;
  height: 300px;
  margin: 10px;
  background: #fff;
  .title {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgb(194, 194, 194);
    color: #333;
    text-align: left;
    text-indent: 1em;
  }
  .changePassword-form {
    width: 50%;
    margin: 20px 0 0 20px;
    .basicInformation-form-item {
      height: 45px;
      line-height: 45px;
      margin: 10px 0;
      text-align: left;
      .basicInformation-form-item-label {
        float: left;
        width: 110px;
        text-align: right;
        margin-right: 10px;
        color: #666;
        font-weight: 400;
        font-size: 14px;
      }
      .basicInformation-form-item-input{
        float: left;
        width: 210px;
        text-align: left;
      }
      .form-affirm {
        background: #009688;
        color: #fff;
        margin-left: 120px;
      }
      .form-affirm:hover {
        opacity: .8;
      }
    }
  }
}
</style>