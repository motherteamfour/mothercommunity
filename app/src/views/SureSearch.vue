<template>
  <div class="sure-search">
    <div class="header">
      <div class="status-bar"></div>
      <div class="navigation">
        <i class="fa fa-angle-left" @click="back()"></i>搜索结果
      </div>
    </div>
    <div class="main">
      <ul class="list">
        <li v-for="(item, index) in lists" :key="index">
          <router-link :to="'/questiondetail/' + item.questionId">
            <AQuestion
              :questionTitle="item.questionTitle"
              :questionContent="item.questionContent"
              :questionReply="item.questionReply"
              :questionPoints="item.questionPoints"
            ></AQuestion>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import AQuestion from "@/components/AQuestion.vue";

export default {
  name: "SureSearch",
  components: {
    AQuestion
  },
  data() {
    return {
      keyword: "",
      userId: "",
      lists: []
    };
  },
  methods: {
    back() {
      this.$router.replace("/searchquestion"); //返回上一层
    },
    getSearchResult() {
      this.axios
        .get(
          `/question/ordinarySearch?questionTitle=${this.keyword}&userId=${this.userId}`
        )
        .then(res => {
          console.log(res.data);
          if (res.data.length == 0) {
            //如果没有搜素到内容则显示全部问题
            this.axios
              .get(
                `/question/ordinarySearch?questionTitle=""&userId=${this.userId}`
              )
              .then(res => {
                console.log("全部", res.data);
                this.lists = res.data.data;
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            // 显示搜素问题
            this.lists = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.userId = sessionStorage.getItem("userId");
    this.keyword = this.$store.state.searchKeyword;
    // 发送请求获取对应关键词的所有问题
    console.log(this.userId, this.keyword);
    this.getSearchResult();
  }
};
</script>
<style lang="less" scoped>
@import "../assets/style/base.less";
@zitiColor: #ccc;
.search {
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
  }
}

.main {
  background-color: rgb(248, 248, 248);
  padding: 30px;
}
</style>