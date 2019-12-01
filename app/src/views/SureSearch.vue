<template>
  <div class="sure-search">
    <div class="header">
      <div class="status-bar"></div>
      <div class="navigation">
        <i class="fa fa-angle-left" @click="back"></i>
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
    </div>
  </div>
</template>
<script>
export default {
  name: "SureSearch",
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    handleError() {
      this.keyword = "";
    },
    // 搜索问题 /question/ordinarySearch
    handleSure() {
      var value = this.keyword.trim();
      console.log(value);
      if (!value.length) {
        alert("搜索关键词不能为空");
      } else {
        this.axios({
          url: `/question/ordinarySearch?questionTitle=${value}`,
          method: "get",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  created() {
    var userId = sessionStorage.getItem("userId");
    console.log(userId);
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
}
</style>