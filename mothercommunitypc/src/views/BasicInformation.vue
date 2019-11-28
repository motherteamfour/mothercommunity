<template>
  <div class="basicInformation">
    <p class="title">设置我的资料</p>
    <form class="basicInformation-form">
      <div class="basicInformation-form-item">
        <label class="basicInformation-form-item-label">我的角色</label>
        <div class="basicInformation-form-item-input">
          <el-input v-model="input" disabled></el-input>
        </div>
      </div>
      <div class="basicInformation-form-item">
        <label class="basicInformation-form-item-label">用户名</label>
        <div class="basicInformation-form-item-input">
          <el-input v-model="input1" disabled></el-input>
        </div>
      </div>
      <div class="basicInformation-form-item">
        <label class="basicInformation-form-item-label">姓名</label>
        <div class="basicInformation-form-item-input">
          <el-input v-model="input2"></el-input>
        </div>
      </div>
      <div class="basicInformation-form-item">
        <label class="basicInformation-form-item-label">性别</label>
        <div class="basicInformation-form-item-input">
          <el-radio v-model="radio" label="1">男</el-radio>
          <el-radio v-model="radio" label="2">女</el-radio>
        </div>
      </div>
      <div class="basicInformation-form-item">
        <label class="basicInformation-form-item-label">头像</label>
        <div class="basicInformation-form-item-input">
          <el-input v-model="input3"></el-input>
        </div>
        <el-button icon="el-icon-position" class="form-upload" type="button">上传图片</el-button>
      </div>
      <div class="basicInformation-form-item">
        <label class="basicInformation-form-item-label">手机</label>
        <div class="basicInformation-form-item-input">
          <el-input v-model="input4"></el-input>
        </div>
      </div>
      <div class="basicInformation-form-item">
          <el-button class="form-affirm" type="button">确认修改</el-button>
          <el-button class="form-reset" type="button">重新填写</el-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
   data() {
    return {
      input: '管理员',
      input1: 'xinxin',
      input2: '西西',
      input3: 'http://cdn.layui.com/avatar/168.jpg',
      input4: '15888899988',
      radio: '1'
    }
  }
};
</script>

<style lang="less" scoped>
.basicInformation {
  width: 1146px;
  height: 638px;
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
  .basicInformation-form {
    width: 50%;
    margin: 20px 0 0 20px;
    .basicInformation-form-item {
      height: 45px;
      line-height: 45px;
      margin: 10px 0;
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
      .form-upload:hover,.form-reset:hover {
        border-color: #009688;
        background: #fff;
        color: #606266;
      }
      .form-affirm {
        background: #009688;
        color: #fff;
        margin-right: 20px;
      }
      .form-affirm:hover {
        opacity: .8;
      }
    }
  }
}
</style>