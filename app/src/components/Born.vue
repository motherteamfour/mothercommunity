<template>
  <div class="born">
    <input type="button" value="确定" @click="getConfirm" />
  </div>
</template>

<script>
export default {
  name: "Born",
  methods: {
        getConfirm() {
      var userId = sessionStorage.getItem("userId");
      console.log(
        "确认提交",
        this.menstrualDays,
        this.menstrualPeriod,
        this.menstrualTime
      );
      // 发送Ajax向后台传递数据
      // /zp/user/updatestate
      this.axios
        .post("/zp/user/updatestate", {
          userId: userId,
          stateId: "4",
          babyName: "宝宝",
          badySex: "男",
          stateStarttime: "2019-12-4"
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.$router.replace("/");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.born {
  text-align: center;
}
  input {
    margin-top: 50px;
    width: 200px;
    height: 70px;
    border: none;
    border-radius: 30px;
    background: @themeColor;
    color: #fff;
    font-size: 30px;
  }
</style>