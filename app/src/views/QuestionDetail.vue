<template>
  <div class="question-detail">
    <div class="header">
      <div class="status-bar"></div>
      <div class="navigation">
        <i class="fa fa-angle-left" @click="back"></i>
        问题详情
        <i class="fa fa-star-o"></i>
        <!-- <i class="fa fa-star" aria-hidden="true"></i> -->
      </div>
    </div>
    <div class="main">
      <div class="title-wrap">
        <i class="fa fa-quora" aria-hidden="true"></i>
        <span class="title">questionTitle</span>
      </div>
      <div class="content">questionContent</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "QuestionDetail",
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    }
  },
  created() {
    console.log("当前文章 id", this.$route.params.questionId);
    var questionId = this.$route.params.questionId;
    var userId = sessionStorage.getItem("userId");

    this.axios({
      url: `/question/questionDetail?questionId=${questionId}&userId=${userId} `,
      method: "get",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => {
        console.log("问题详情：", res.data);
        this.lists = res.data.data;
        console.log(this.lists);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="less" scoped>
@import "../assets/style/base.less";
@zitiColor: #ccc;

.question-detail {
  width: 100%;
  height: 100vh;
  // background-color: #efefef;
}
.header {
  // margin: 0 30px;
  padding: 0 30px;
  // background-color: @themeColor;
  .status-bar {
    height: 40px;
  }
  .navigation {
    height: 88px;
    line-height: 88px;
    // color: white;
    color: black;
    text-align: center;
    font-size: 36px;
    .fa-angle-left {
      font-size: 80px;
      vertical-align: top;
      color: #ccc;
      float: left;
    }
    .fa-star-o {
      font-size: 50px;
      vertical-align: top;
      color: #ccc;
      // display: inline-block;
      float: right;
      height: 80px;
      line-height: 80px;
      vertical-align:middle;
    }
  }
}
.main {
  background-color: #efefef;
}
</style>