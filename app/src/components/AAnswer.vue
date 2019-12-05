<template>
  <div class="a-answer">
    <div class="title-wrap">
      <img :src="imgUrl+information.user.userImgUrl" alt />
      <span class="title">{{information.user.userName}}</span>
    </div>
    <div class="content">{{information.answerContent}}</div>
    <div class="bottom">
      <div class="reply">
        <span class="reply-time">{{information.answerTime}}</span>
      </div>
      <div class="praise">
        <span class="praise-num" @click=" handlePraise">
          <i class="fa fa-heart-o" aria-hidden="true" v-if="!information.praiseState"></i>
          <i class="fa fa-heart" aria-hidden="true" v-else></i>
          {{information.answerPoints}}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
// import { Info } from "vant";
// import bus from "../utils/Bus";

export default {
  name: "AAnswer",
  data() {
    return {
      isShow: false,
      information: this.info,
      imgUrl: ""
    };
  },
  props: ["info"], //这里的info是一个回答 不约束类型，直接以数组形式列出 props
  methods: {
    handlePraise() {
      this.information.praiseState = !this.information.praiseState;
      console.log("information", this.information);

      var userId = sessionStorage.getItem("userId");
      var answerId = this.information.answerId;
      var praiseState = this.information.praiseState;
      // console.log("点不点赞",answerId, userId, praiseState);
      if (praiseState) {
        this.information.answerPoints = this.information.answerPoints + 1;
        this.axios
          .get(`/answer/praiseAnswer?answerId=${answerId}&userId=${userId}`)
          .then(res => {
            console.log("点赞：", res.data);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.information.answerPoints = this.information.answerPoints - 1;

        this.axios
          .get(
            `/answer/cancelPraiseAnswer?answerId=${answerId}&userId=${userId}`
          )
          .then(res => {
            console.log("取消点赞：", res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  created() {
    this.imgUrl = this.$store.state.imgUrl;
  }
};
</script>
<style lang="less" scoped>
@import "../assets/style/base.less";

.a-answer {
  padding: 20px 0;
  border-bottom: 1px solid #e7e7e7;
  .title-wrap {
    height: 50px;
    line-height: 50px;
    padding-bottom: 10px;
    img {
      display: inline-block;
      background-color: lemonchiffon;
      width: 50px;
      height: 50px;
      margin-right: 20px;
      vertical-align: middle;
    }
    .title {
      font-size: 24px;
      color: #8a8a8a;
      vertical-align: middle;
    }
  }
  .content {
    font-size: 26px;
  }
  .bottom {
    overflow: hidden;
    height: 50px;
    line-height: 50px;
    .reply {
      float: left;
      .reply-time {
        font-size: 24px;
        color: #a6a6a6;
      }
    }
    .praise {
      float: right;

      .praise-num {
        .fa-heart {
          color: @themeColor;
        }
        display: inline-block;
        border: 1px solid #a6a6a6;
        vertical-align: bottom;
        // width: 110px;
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        font-size: 24px;
        color: #a6a6a6;
      }
    }
  }
}
</style>