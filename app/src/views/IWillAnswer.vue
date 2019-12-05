<template>
  <div class="i-will-answer">
    <div class="header">
      <div class="status-bar"></div>
      <div class="navigation">
        <i class="fa fa-angle-left" @click="back"></i>回答
        <span class="publish" @click="handlePublish()">发表</span>
      </div>
    </div>
    <div class="content">
      <textarea placeholder="请详细描述您的问题" v-model="content"></textarea>
    </div>
    <!-- 模态框 -->
    <van-popup class="model" v-model="show" round>
      <div class="top">
        <p class="one">{{one}}</p>
        <!-- 未填写手机号码 -->
        <p class="two">{{two}}</p>
      </div>
      <div class="bottom" @click="closeModel">好的</div>
    </van-popup>
  </div>
</template>

<script>
// import bus from "@/utils/Bus";
import Vue from "vue";
import { Popup } from "vant";

Vue.use(Popup);

export default {
  name: "IWillAnswer",
  data() {
    return {
      content: "",
      show: false,
      one: "",
      two: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    //关闭模态框
    closeModel() {
      this.show = false;
    },
    // 发表 /answer/answerToQuestion
    handlePublish() {
      var userId = sessionStorage.getItem("userId");
      var questionId = this.$route.params.questionId;

      console.log(userId, this.content, questionId);
      this.axios({
        url: `/answer/answerToQuestion`,
        method: "post",
        data: `userId=${userId}&answerContent=${this.content}&questionId=${questionId}`,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.data.code == "200") {
            // 切换路由
            var url = `/questiondetail/${questionId}`; //后端应该返回问题id,然后跳转到详情页（保留）
            this.$router.replace(url);
          } else {
            console.log("提交失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/style/base.less";
@zitiColor: #ccc;

.header {
  padding: 0 30px;
  background-color: @themeColor;

  .status-bar,
  .navigation {
    width: 100%;
  }
  .status-bar {
    height: 40px;
  }
  .navigation {
    height: 88px;
    line-height: 88px;
    color: white;
    text-align: center;
    font-size: 36px;
    .fa-angle-left {
      font-size: 80px;
      vertical-align: top;
      color: #ccc;
      width: 72px;
      text-align: left;
      float: left;
    }
    .publish {
      float: right;
    }
  }
}
.content {
  height: 1000px;
  padding: 0 30px;
  textarea {
    width: 100%;
    height: 100%;
    line-height: 50px;
    font-size: 32px;
    resize: none;
    border: none;
    outline: none;
  }
}

.model {
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  width: 540px;
  .top {
    height: 120px;
    padding: 20px 0;
    margin: 0 auto;
    box-sizing: border-box;
    text-align: center;

    .one {
      font-weight: bold;
      font-size: 30px;
    }
    .two {
      font-size: 24px;
    }
  }
  .bottom {
    border-top: 1px solid #f9f9f9;
    height: 90px;
    line-height: 90px;
    text-align: center;
    font-size: 30px;
    color: blue;
  }
}
</style>