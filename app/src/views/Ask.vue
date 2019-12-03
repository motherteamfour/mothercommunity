<template>
  <div class="ask">
    <div class="header">
      <div class="status-bar"></div>
      <div class="navigation">
        <i class="fa fa-angle-left" @click="back"></i>知识问答
      </div>
    </div>
    <div class="main">
      <div class="title">
        <textarea placeholder="一句话概况您的问题" v-model="title"></textarea>
        <p class="title-length">{{title.length}}/50</p>
      </div>
      <div class="content">
        <textarea placeholder="请详细描述您的困惑状态、疾病症状等等，有助于更快、更好得到解答~" v-model="content"></textarea>
        <p class="content-length">{{content.length}}/500</p>
      </div>
    </div>
    <div class="footer">
      <button type="submit" @click="getSubmit">提交</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Ask",
  data() {
    return {
      title: "",
      content: "",
      titleMaxLength: 50,
      contentMaxLength: 500
    };
  },
  watch: {
    title() {
      if (this.title.length > this.titleMaxLength) {
        console.log("超过了");
        this.title = String(this.title).slice(0, this.titleMaxLength);
      }
    },
    content() {
      if (this.content.length > this.contentMaxLength) {
        console.log("超过了");
        this.content = String(this.content).slice(0, this.contentMaxLength);
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    getSubmit() {
      // console.log("访问查询参数：", this.$route.query.id);
      // this.$route：保存了当前路由信息
      var userId = sessionStorage.getItem("userId");
      console.log(typeof userId);
      console.log(userId, this.title, this.content);
      this.axios({
        url: "/question/addQuestion",
        method: "post",
        data: `userId=${userId}&questionTitle=${this.title}&questionContent=${this.content}`,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.data.code == "200") {
            // 切换路由
            // var url = "/"; //后端应该返回问题id,然后跳转到详情页（保留）
            // this.$router.replace(url);
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

.ask {
  width: 100%;
  height: 100vh;
  // background-color: #efefef;
}
.header {
  // margin: 0 30px;
  padding: 0 30px;
  background-color: @themeColor;
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
      float: left;
    }
  }
}
.main {
  margin: 0 30px;
  textarea {
    width: 100%;
    line-height: 50px;
    font-size: 32px;
    resize: none;
    border: none;
    outline: none;
  }
  .title {
    padding: 20px 0;
    textarea {
      height: 150px;
    }
    .title-length {
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      text-align: right;
      border-bottom: 1px solid #efefef;
    }
  }
  .content {
    padding: 20px 0;
    textarea {
      height: 400px;
    }
    .content-length {
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      text-align: right;
      border-bottom: 1px solid #efefef;
    }
  }
}
.footer {
  display: flex;
  justify-content: center;
}
button[type="submit"] {
  width: 420px;
  height: 100px;
  font-size: 32px;
  margin: 60px auto;
  border-radius: 50px;
  background-color: @themeColor;
  color: white;
  outline: none;
  border: none;
  &:active {
    color: @zitiColor;
  }
}
</style>