<template>
  <div class="circle-gourp">
    <header>
      <div class="back" @click="back">
        <i class="fa fa-angle-left"></i>
      </div>
      <span>圈子</span>
    </header>
    <ul class="category-tab">
      <li class="all" :class="{isall:isAll==1}" @click="isAll=1">所有圈子</li>
      <li class="followed" :class="{isall:isAll==2}" @click="getFollowedCircle">已关注圈子</li>
    </ul>
    <div class="tab-content">
      <div class="all-wrap" v-show="isAll==1">
        <div class="category-content">
          <ul class="category">
            <li
              class="category-item"
              v-for="(item, index) in category"
              :categoryId="item.categoryId"
              :key="index"
              :class="{on:isActive == item.categoryId}"
              @click="select(item.categoryId)"
            >{{item.categoryName}}</li>
          </ul>
        </div>
        <div class="followed-circle">
          <ul class="circle-content">
            <li
              class="circle-item"
              v-for="(item, index) in subClass"
              :key="index"
              :class="setColor(index)"
            >
              <div class="circle-pic">
                <img :src="imgUrl + item.circleUrl" alt />
              </div>
              <p>{{item.circleName}}</p>
              <div class="btns">
                <van-loading v-show="isLoading==item.circleId" size="24px" vertical></van-loading>
                <button
                  @click="follow(item.circleId, item.categoryId)"
                  v-if="!item.isFollow"
                  class="circle-follow"
                  v-show="isLoading!==item.circleId"
                >+关注</button>
                <button
                  @click="cancleFollow(item.circleId, item.categoryId)"
                  v-else
                  class="circle-followed"
                  v-show="isLoading!==item.circleId"
                >
                  <i class="fa fa-check"></i>已关注
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="followed-wrap" v-show="isAll==2">
        <ul>
          <li class="followed-item" v-for="(item, index) in followedCircle" :key="index">
            <img :src="imgUrl + item.circles.circleUrl" alt />
            <p>{{item.circles.circleName}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from "vant";

export default {
  name: "CircleGourp",
  components: {
    [Loading.name]: Loading
  },
  data() {
    return {
      imgUrl: "",
      isAll: 1,
      isActive: 1,
      category: [],
      subClass: [],
      isLoading: -1,
      followedCircle: [],
      imgIp: ""
    };
  },
  created() {
    // 获取图片路径
    this.imgUrl = this.$store.state.imgUrl;
    this.axios.get("/search/searchTop10").then(res => {
      console.log(res.data);
    });
    this.axios.get("/category/list").then(res => {
      //请求所有圈子大类数据
      this.category = res.data.data;
    });
    this.select(1);
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    select(i) {
      this.isActive = i;

      this.axios
        .get(`/circle/byId/list?categoryId=${i}&userId=1001`)
        .then(res => {
          //请求圈子数据
          if (res.data.code == 200) {
            this.subClass = res.data.data;
            this.isLoading = -1;
          }
        });
    },
    follow(i, categoryId) {
      this.isLoading = i;
      let param = new URLSearchParams();
      param.append("circleId", i);
      param.append("userId", "1001");
      this.axios.post("/user/addCircle", param).then(res => {
        //请求圈子数据
        if (res.data.code == 200) {
          this.select(categoryId);
        }
      });
    },
    cancleFollow(i, categoryId) {
      this.isLoading = i;
      this.axios
        .delete(`/user/deleteCircle?circleId=${i}&userId=1001`)
        .then(res => {
          //请求圈子数据
          if (res.data.code == 200) {
            this.select(categoryId);
          }
        });
    },
    getFollowedCircle() {
      this.isAll = 2;
      this.axios.get("/userCircle/list?userId=1001").then(res => {
        console.log(res.data);
        this.followedCircle = res.data.data;
      });
    },
    setColor(index) {
      var num = (index % 6) + 1;
      return "ss" + num;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.circle-gourp {
  background: rgb(248, 248, 248);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
header {
  padding-top: 40px;
  width: 100%;
  height: calc(10vh - 40px);
  background: #fff;
  text-align: center;
  position: relative;
  line-height: calc(10vh - 40px);
  box-shadow: 0 5px 5px #eee;
  vertical-align: middle;
  z-index: 3;
  span {
    font-size: 36px;
    color: #000;
  }
  .fa-angle-left {
    font-size: 1rem;
  }
  .back {
    width: 50px;
    height: calc(10vh - 40px);
    display: flex;
    align-items: center;
    position: absolute;
    left: 20px;
    text-align: center;

    color: #000;
  }
}

.category-tab {
  width: 100%;
  height: 6vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 30px;
  background: #fff;
  box-shadow: 0 5px 10px #ddd;
  position: relative;
  z-index: 2;
  li {
    padding: 10px 30px;
  }
}

.tab-content {
  display: flex;
}
.category-content {
  position: relative;
  width: 20%;
  z-index: 1;
  height: 84vh;
  background: #fff;

  .category {
    font-size: 30px;
    width: 100%;
    height: 100%;
    overflow: scroll;
    .category-item {
      text-align: center;
      padding: 20px 0;
      box-sizing: border-box;
      width: 100%;
      margin: 40px 0;
      color: rgb(102, 102, 102);
    }
  }
}
.followed-circle {
  width: 80%;
  height: 84vh;
  overflow: scroll;
  background: rgb(248, 248, 248);
  .circle-content {
    width: 80%;
    margin-left: 40px;
    .circle-item {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 160px;
      margin: 30px 0;
      border-radius: 60px 0 0 60px;
      font-size: 36px;

      .circle-pic {
        width: 90px;
        height: 90px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .circle-follow {
        width: 90px;
        height: 42px;
        border: none;
        border-radius: 30px;
        outline: none;
        font-size: 24px;
        border: 3px solid @themeColor;
        color: @themeColor;
        box-shadow: 0 0 15px @themeColor;
        background: rgba(248, 248, 248, 0);
      }
      .circle-followed {
        width: 120px;
        height: 42px;
        border: none;
        border-radius: 30px;
        outline: none;
        font-size: 24px;
        border: 3px solid @themeColor;
        color: #fff;
        box-shadow: 0 0 15px @themeColor;
        background: @themeColor;
      }
    }
  }
}

.followed-wrap {
  width: 100%;
  height: 84vh;
  overflow: scroll;
  background: rgb(248, 248, 248);
  ul {
    width: (100% - 5px);
    height: 100%;
    margin: 0 auto;

    .followed-item {
      display: flex;
      background: #fff;
      margin-top: 20px;
      justify-content: flex-start;
      align-items: center;
      font-size: 36px;
      border: 1px solid #eee;
      padding: 20px 30px;
      box-sizing: border-box;
      border-radius: 20px;
      box-shadow: 0 0 10px #ddd;
      img {
        width: 80px;
        height: 80px;
        margin-left: 100px;
      }
      p {
        margin-left: 80px;
      }
    }
  }
}

.btns {
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.on {
  background: rgb(248, 248, 248);
  font-weight: 600;
  color: @themeColor !important;
  border-left: 6px solid @themeColor;
}

.isall {
  color: @themeColor;
  border-bottom: 6px solid @themeColor;
}
.all-wrap {
  display: flex;
  width: 100%;
  height: 100%;
}

.ss1 {
  background: linear-gradient(to right, rgb(251, 230, 193), rgb(248, 248, 248));
}
.ss2 {
  background: linear-gradient(to right, rgb(251, 216, 228), rgb(248, 248, 248));
}
.ss3 {
  background: linear-gradient(to right, rgb(214, 239, 251), rgb(248, 248, 248));
}
.ss4 {
  background: linear-gradient(to right, rgb(251, 248, 196), rgb(248, 248, 248));
}
.ss5 {
  background: linear-gradient(to right, rgb(203, 217, 251), rgb(248, 248, 248));
}
.ss6 {
  background: linear-gradient(to right, rgb(234, 215, 248), rgb(248, 248, 248));
}
</style>