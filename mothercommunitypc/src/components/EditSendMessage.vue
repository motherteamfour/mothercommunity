<template>
  <div class="editSendMessage">
    <p class="title">发送消息</p>
    <form class="changePassword-form">
      <div class="basicInformation-form-item">
        <label class="basicInformation-form-item-label">消息标题</label>
        <div class="basicInformation-form-item-input">
          <el-input v-model="input1"></el-input>
        </div>
      </div>
      <div class="basicInformation-form-item basicInformation-form-item-content">
        <label class="basicInformation-form-item-label">消息内容</label>
        <div class="basicInformation-form-item-input">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea2"
          ></el-input>
        </div>
      </div>
      <div class="basicInformation-form-item">
        <el-button class="form-affirm" type="button">确认修改</el-button>
        <el-button class="form-cancel" type="button" @click="returnPrv">取消</el-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "editSendMessage",
  data() {
    return {
      input1: "",
      textarea2: ''
    };
  },
  methods: {
    returnPrv() {
      this.$emit("showEditFn");
      this.input1='';
      this.textarea2='';
    }
  }
};
</script>

<style lang="less" scoped>
.editSendMessage {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .title {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 50px;
  }
  .changePassword-form {
  width: 40%;
    .basicInformation-form-item {
      height: 45px;
      line-height: 45px;
      margin: 20px 0;
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
      .basicInformation-form-item-input {
        float: left;
        width: 210px;
        text-align: left;
      }
      .form-affirm,
      .form-cancel {
        background: #009688;
        color: #fff;
        margin-left: 50px;
      }
      .form-affirm:hover,
      .form-cancel:hover {
        opacity: 0.8;
      }
    }
    .basicInformation-form-item-content {
      height: 100px;
    }
  }
}
</style>