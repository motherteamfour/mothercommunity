<template>
  <div class="search-question">
    <div class="header">
      <div class="status-bar"></div>
      <div class="navigation">
        <i class="fa fa-angle-left" @click="back"></i>搜索问题
      </div>
    </div>
    <div class="main">
      <div class="wrap-serach">
        <div class="search-box">
          <i class="fa fa-search" aria-hidden="true"></i>
          <input type="input" placeholder="请输入关键词" v-model="keyword" />
          <i class="fa fa-times" aria-hidden="true" @click="handleError"></i>
        </div>

        <span class="sure" @click="handleSure">确定</span>
      </div>
      <div class="wrap-hot">
        <p class="title">热门搜索</p>
        <div class="content">
          <div
            class="one"
            v-for="(item, index) in hotLists"
            :key="index"
            @click="seeHotSearch(item)"
          >{{item}}</div>
        </div>
      </div>
      <div class="wrap-history">
        <p class="title">历史搜索</p>
        <div class="content">
          <div class="one" v-for="(item, index) in historyLists" :key="index">
            <div class="text" @click="seeHistorySearch(item)">
              <i class="fa fa-history" aria-hidden="true"></i>
              {{item}}
            </div>
            <i class="fa fa-times" aria-hidden="true" @click="delOneHistory(item)"></i>
          </div>
        </div>
        <p class="clear-history" @click="delAllHistory()">清空记录</p>
      </div>
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
import { mapMutations } from "vuex";

export default {
  name: "SearchQuestion",
  data() {
    return {
      userId: "",
      keyword: "",
      hotLists: {},
      historyLists: {},
      show: false,
      one: "",
      two: ""
    };
  },
  methods: {
    ...mapMutations(["setSearchKeyword"]),
    back() {
      this.$router.go(-1); //返回上一层
    },
    handleError() {
      this.keyword = "";
    },
    // 搜索
    search() {
      this.setSearchKeyword(this.keyword); //this.keyword存入store
      this.$router.replace("/suresearch");
    },
    // 输入关键字搜索
    handleSure() {
      var value = this.keyword.trim();
      console.log(value);
      if (!value.length) {
        // alert("搜索关键词不能为空");
        this.one = "搜索关键词不能为空";
        this.two = "请先输入哦~";
        this.show = true;
      } else {
        this.search();
      }
    },
    // 查看单个热门搜索
    seeHotSearch(value) {
      this.keyword = value;
      this.search();
    },
    // 查看单个历史搜索
    seeHistorySearch(value) {
      this.keyword = value;
      this.search();
    },
    //历史搜索
    historySearch() {
      this.axios({
        url: `/question/historySearch?userId=${this.userId}`,
        method: "get",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          console.log(res.data);
          this.historyLists = res.data.data;
          console.log("历史搜索lists", this.historyLists);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 热门搜索
    hotSearch() {
      this.axios({
        url: `/question/hotSearch`,
        method: "get",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          this.hotLists = res.data.data;
          console.log("热门搜索", this.hotLists);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除一个历史搜索
    delOneHistory(value) {
      console.log("删除一个", value);
      this.axios
        .get(
          `/question/delHistorySearch?searchMessage=${value}&userId=${this.userId}`
        )
        .then(res => {
          console.log(res.data);
          // 再次请求刷新历史搜索
          this.historySearch();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 清空记录
    delAllHistory() {
      console.log("删除所有");
      this.axios
        .get(`/question/delAllHistorySearch?userId=${this.userId}`)
        .then(res => {
          console.log(res.data);
          // 再次请求刷新历史搜索
          this.historySearch();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //关闭模态框
    closeModel() {
      this.show = false;
    }
  },
  created() {
    // 保存userId
    this.userId = sessionStorage.getItem("userId");

    // 热门搜索 /question/hotSearch
    this.hotSearch();
    // 历史搜索
    this.historySearch();
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
  padding: 0 30px;
  // background-color: skyblue;
  .wrap-serach {
    height: 160px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-box {
      width: 580px;
      height: 80px;
      background-color: #f2f2f2;
      border-radius: 40px;
      .fa {
        width: 60px;
        height: 80px;
        line-height: 80px;
        font-size: 30px;
        text-align: center;
        vertical-align: middle;
        display: inline-block;
        color: #adadad;
      }
      .fa-search {
        text-align: right;
      }
      .fa-times {
        text-align: left;
      }
      input {
        width: 420px;
        height: 80px;
        font-size: 28px;
        padding: 0 20px;
        background-color: #f2f2f2;
        vertical-align: middle;
        outline: none;
        border: none;
      }
    }
    .sure {
      display: inline-block;
      vertical-align: middle;
      font-size: 30px;
      height: 80px;
      line-height: 80px;
      letter-spacing: 10px;
      color: @themeColor;
    }
  }
  .wrap-hot {
    .title {
      height: 80px;
      line-height: 80px;
      font-size: 30px;
      font-weight: bold;
    }
    .content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      height: 330px;
      overflow: hidden;
      .one {
        width: 220px;
        height: 70px;
        line-height: 70px;
        text-align: center;
        background-color: #f2f2f2;
        font-size: 28px;
        margin: 20px 0;
      }
    }
  }
  .wrap-history {
    .title {
      height: 80px;
      line-height: 80px;
      font-size: 30px;
      font-weight: bold;
    }
    .content {
      .one {
        height: 100px;
        line-height: 100px;
        font-size: 28px;
        border-bottom: 1px solid #f2f2f2;
      }
      .fa-history {
        float: left;
      }
      .text {
        width: 90%;
        float: left;
      }
      .fa-times {
        float: right;
      }
      .fa {
        display: inline-block;
        width: 10%;
        height: 100px;
        line-height: 100px;
        color: #8a8a8a;
        text-align: center;
      }
    }
    .clear-history {
      height: 100px;
      line-height: 100px;
      font-size: 28px;
      color: #adadad;
      text-align: center;
    }
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