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
      <div class="question">
        <div class="title-wrap">
          <i class="fa fa-question-circle" aria-hidden="true"></i>
          <span class="title">宝宝感冒去不去医院啊，他不肯吃饭</span>
        </div>
        <div class="content">
          宝宝感冒了,大冷天的看着心痛死了宝宝感冒了,大冷
          天的看着心痛死了宝宝感冒了,大冷天的看着心痛死了宝宝感冒了,大冷天的看着心痛
          死了宝宝感冒了,大冷天的看着心痛死了宝宝感冒了,大冷天的看着心痛死了
          宝宝感冒了,大冷天的看着心痛死了宝宝感冒了,大冷天的看着心痛死了
        </div>
      </div>
      <div class="all-answers">
        <div class="all-num">
          全部回答(
          <span class="num">30</span>)
        </div>
        <div class="one-answer"></div>
      </div>
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
      vertical-align: middle;
    }
  }
}
.main {
  // background-color: #efefef;
  .question {
    background-color: #efefef;
    padding: 0 30px;
    .fa-question-circle {
      font-size: 40px;
      padding-right: 20px;
      color: @themeColor;
    }
    .title {
      font-size: 28px;
      height: 60px;
      line-height: 60px;
      font-weight: bold;
    }
    .content {
      font-size: 24px;
      color: #8a8a8a;
    }
  }
  .all-answers {
    // padding: 0 30px;
    .all-num {
      height: 100px;
      line-height: 100px;
      border-radius: 10px 10px 0 0;
      border-bottom: 1px solid #efefef;
    }
  }
}
</style>