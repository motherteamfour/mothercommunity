<template>
  <div class="q-and-a">
    <div class="top">轮播图</div>
    <div class="main">
      <div class="one">
        <router-link :to="'/ask'" class="ask">
          <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
          <div>
            <p class="one-text">我要提问</p>
            <p class="two-text">
              <span>{{totalNum}}</span>人正在提问
            </p>
          </div>
        </router-link>
        <router-link :to="'/searchquestion'" class="search">
          <i class="fa fa-search fa-lg" aria-hidden="true"></i>
          <div>
            <p class="one-text">搜索</p>
            <p class="two-text">精准 经验 精彩</p>
          </div>
        </router-link>
      </div>
      <div class="two">
        <router-link class="hot" to="/qanda">热门问题</router-link>
        <router-link class="unsolved" to="/qanda/unsolved">待解决</router-link>
      </div>
    </div>
    <div class="footer">
      <keep-alive include="HotQuestion,Unsolved">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "QandA",
  data() {
    return {
      totalNum: ""
    };
  },
  created() {
    console.log("组件创建");
    this.axios
      .get(`/question/numberOfQuestion`)
      .then(res => {
        console.log("正在提问的人数：", res.data);
        this.totalNum = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  destroyed() {
    console.log("组件销毁");
  }
};
</script>
<style lang="less" scoped>
@import "../assets/style/base.less";

@wenziColor: #8a8a8a;
.q-and-a {
  width: 100%;

  .top {
    width: 100%;
    height: 400px;
    background-color: @themeColor;
  }
  .main {
    width: 100%;

    .one {
      padding: 40px 30px;
      display: flex;
      justify-content: space-between;

      .ask,
      .search {
        height: 150px;
        width: 330px;
        background-color: @themeColor;
        border-radius: 20px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .one-text {
          font-size: 28px;
        }
        .two-text {
          font-size: 24px;
          color: @wenziColor;
        }
      }
      .ask {
        background-color: #f0f4fe;
        color: #7591d5;
      }
      .search {
        background-color: #fcf0f0;
        color: #ef90a0;
      }
    }
    .two {
      padding: 0 30px;
      display: flex;
      justify-content: space-between;
      text-align: center;

      .hot,
      .unsolved {
        width: 50%;
        height: 60px;
        font-size: 30px;
        line-height: 60px;
      }
    }
  }
}
.router-link-exact-active.router-link-active {
  font-weight: bold;
}
</style>