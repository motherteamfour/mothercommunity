<template>
  <div class="changePassword">
    <p class="title">修改密码</p>
    <form class="changePassword-form">
      <div class="basicInformation-form-item">
        <label class="basicInformation-form-item-label">当前密码</label>
        <div class="basicInformation-form-item-input">
          <el-input v-model="input"></el-input>
        </div>
      </div>
      <div class="basicInformation-form-item">
        <label class="basicInformation-form-item-label">新密码</label>
        <div class="basicInformation-form-item-input">
          <el-input v-model="input"></el-input>
        </div>
        <label class="basicInformation-form-item-label">6到16个字符</label>
      </div>
      <div class="basicInformation-form-item">
        <label class="basicInformation-form-item-label">确认新密码</label>
        <div class="basicInformation-form-item-input">
          <el-input v-model="input"></el-input>
        </div>
      </div>
      <div class="basicInformation-form-item">
          <el-button class="form-affirm" type="button">确认修改</el-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  
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