<template>
  <div class="resource">
    <div class="top">
      <span class="goback" @click="goback()">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </span>
      <h3>修改昵称</h3>
      <span></span>
    </div>
    <div class="alterbox">
      <div class="names">
        <span>昵称</span><!--:ss="userInfo.userName"   -->
        <input type="text" v-model="msg" :placeholder="userInfo.userName" />
      </div>
      <div class="btnbox">
        <button type="button" class="btn" @click="confirmBtn()">想好了，保存</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    return {
      userInfo: {},
      userId: 1001,
      msg: "",
     
    };
  },
  created() {
    this.userId = sessionStorage.getItem("userId");
    let param = new URLSearchParams();
    param.append("userid", this.userId);
    this.axios.post("/zp/user/findMyself", param).then(res => {
      console.log(res.data);
      this.userInfo = res.data.data;
    });
  },
  methods: {
    goback() {
      this.$router.push("/resource");
    },
    confirmBtn() {
      
      let param = new URLSearchParams();
      param.append("userid", this.userId);
      param.append("username", this.msg);
      this.axios.post("/zp/user/updateusername", param).then(res => {
        console.log(res.data);
      });
      this.reload();
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.resource {
  width: 750px;
  height: 100vh;
  background: rgb(248, 248, 248);
}
.top {
  width: 750px;
  height: 80px;
  background: @themeColor;
  padding-top: 40px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  h3 {
    /* width: 80%; */
    width: 70%;
    color: white;
    font-weight: 500;
    font-size: 36px;
    /*  margin-bottom: 10px; */
    letter-spacing: 2px;
    /* line-height: 80px; */
  }
  i {
    color: white;
    font-size: 54px;
  }
}
.alterbox {
  width: 640px;
  padding-bottom: 40px;
  background: white;
  margin: 40px auto;
  border-radius: 20px;
  box-shadow: 0 0 10px pink;
  .names {
    width: 100%;
    height: 100px;
    padding-top: 30px;
    margin-bottom: 30px;
    padding-left: 60px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    span {
      font-size: 34px;
      color: gray;
      margin-right: 40px;
    }
    input {
      width: 400px;
      height: 60px;
      border: none;
      outline: none;
    }
  }
  .btnbox {
    width: 100%;
    height: 80px;
    text-align: center;
    .btn {
      width: 400px;
      height: 80px;
      background: @themeColor;
      color: white;
      border: none;
      border-radius: 30px;
      font-size: 30px;
      outline: none;
    }
  }
}
</style>