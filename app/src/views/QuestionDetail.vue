<template>
  <div class="question-detail">
    <div class="header">
      <div class="status-bar"></div>
      <div class="navigation">
        <i class="fa fa-angle-left" @click="back"></i>
        问题详情
        <div class="wrap-fa" @click="handleCollect()">
          <i class="fa fa-star-o" aria-hidden="true" v-if="!info.collectState"></i>
          <i class="fa fa-star" aria-hidden="true" v-else></i>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="question">
        <div class="title-wrap">
          <i class="fa fa-question-circle" aria-hidden="true"></i>
          <span class="title">{{info.questionTitle}}</span>
        </div>
        <div class="content">{{info.questionContent}}</div>
      </div>
      <div class="all-answers">
        <div class="all-num">
          <h6>全部回答</h6>
          <span class="num">({{num}})</span>
        </div>
        <div class="answer-list">
          <AAnswer v-for="(item,index) in info.answers" :key="index" :info="item"></AAnswer>
        </div>
      </div>
    </div>
    <router-link :to="'/iwillanswer/'+this.info.questionId" class="footer">
      <p>我要回答</p>
    </router-link>
  </div>
</template>
<script>
import AAnswer from "@/components/AAnswer.vue";

export default {
  name: "QuestionDetail",
  components: {
    AAnswer
  },
  data() {
    return {
      info: [],
      num: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    handleCollect() {
      this.info.collectState = !this.info.collectState;
      var userId = sessionStorage.getItem("userId");
      var questionId = this.info.questionId;
      var collectState = this.info.collectState;
      console.log("收藏吗", questionId, userId, collectState);
      if (collectState) {
        // console.log("我要收藏");
        this.axios
          .get(
            `/question/collectQuestion?questionId=${questionId}&userId=${userId}`
          )
          .then(res => {
            console.log("收藏：", res.data);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        // console.log("我要取消收藏");
        this.axios
          .get(
            `/question/cancelCollectQuestion?questionId=${questionId}&userId=${userId}`
          )
          .then(res => {
            console.log("取消收藏：", res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  created() {
    console.log("创建");
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
        this.info = res.data.data;
        this.num = this.info.answers.length;
        console.log(this.info);
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
  // background-color: transparent;
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
    .wrap-fa {
      float: right;
      .fa-star-o,
      .fa-star {
        font-size: 50px;
        vertical-align: top;
        color: #ccc;
        // display: inline-block;
        height: 80px;
        line-height: 80px;
        vertical-align: middle;
      }
      .fa-star {
        color: @themeColor;
      }
    }
  }
}
.main {
  background-color: #efefef;
  .question {
    background-color: #efefef;
    padding: 20px 30px;
    .fa-question-circle {
      font-size: 40px;
      padding-right: 20px;
      color: @themeColor;
    }
    .title {
      font-size: 28px;
      height: 40px;
      line-height: 40px;
      font-weight: bold;
    }
    .content {
      font-size: 24px;
      color: #8a8a8a;
    }
  }
  .all-answers {
    padding: 0 30px;
    border-radius: 20px 20px 0 0;
    background-color: white;
    .all-num {
      height: 100px;
      line-height: 100px;
      border-bottom: 1px solid #efefef;
      border-radius: 10px 10px 0 0;

      h6 {
        display: inline-block;
      }
      .num {
        font-size: 30px;
      }
    }
  }
}
.footer {
  height: 90px;
  width: 100%;
  font-size: 32px;
  border-top: 1px solid #eaeaea;
  color: @themeColor;
  line-height: 90px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>