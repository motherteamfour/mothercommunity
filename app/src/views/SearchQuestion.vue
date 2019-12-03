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
          <div class="one" v-for="(item, index) in hotLists" :key="index">{{item}}</div>
        </div>
      </div>
      <div class="wrap-history">
        <p class="title">历史搜索</p>
        <div class="content">
          <div class="one" v-for="(item, index) in historyLists" :key="index">
            <i class="fa fa-history" aria-hidden="true"></i>
            {{item}}
            <i class="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
        <p class="clear-history">清空记录</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchQuestion",
  data() {
    return {
      keyword: "",
      hotLists: {},
      historyLists: {}
    };
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    handleError() {
      this.keyword = "";
    },
    // 确认搜索问题 /question/ordinarySearch
    handleSure() {
      var userId = sessionStorage.getItem("userId");
      var value = this.keyword.trim();
      console.log(value);
      if (!value.length) {
        alert("搜索关键词不能为空");
      } else {
        
        let param = new URLSearchParams();
        param.append("questionTitle",value);
        param.append("userId",userId);
        this.axios
          .get( `/question/ordinarySearch`,param)
          // .get( `/question/ordinarySearch?questionTitle=${value}&userId=${userId}`)
          .then(res => {
            console.log(res.data);
            // 跳转到下一个页面,将数据传递给下一个页面
            this.$router.replace("/suresearch");
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  created() {
    var userId = sessionStorage.getItem("userId");

    // 热门搜索 /question/hotSearch

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

    // 历史搜索 /question/historySearch
    this.axios({
      url: `/question/historySearch?userId=${userId}`,
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
      .fa-times {
        float: right;
      }
      .fa {
        display: inline-block;
        width: 60px;
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
</style>