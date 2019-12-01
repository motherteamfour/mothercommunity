<template>
  <div class="circle-gourp">
    <header>
      <div class="back" @click="back">
        <i class="fa fa-angle-left fa-2x"></i>
      </div>
      <span>圈子</span>
    </header>
    <ul class="category-tab">
      <li class="all" :class="{isall:isAll==1}" @click="isAll=1">所有圈子</li>
      <li class="followed" :class="{isall:isAll==2}" @click="isAll=2">关注圈子</li>
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
              @click="isActive = item.categoryId"
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
              <div
                class="circle-pic"
                :style="{background: 'url(require(' + item.circleUrl + ')) no-repeat center'}"
              ></div>
              <p>{{item.circleName}}</p>
              <button class="circle-follow">+关注</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="followed-wrap" v-show="isAll==2">12312321</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CircleGourp",
  components: {},
  data() {
    return {
      isAll: 1,
      isActive: 1,
      category: [
        {
          categoryId: 1,
          categoryName: "备孕"
        },
        {
          categoryId: 2,
          categoryName: "孕期"
        },
        {
          categoryId: 3,
          categoryName: "产后"
        },
        {
          categoryId: 4,
          categoryName: "情感"
        }
      ],
      subClass: [
        {
          circleId: 1,
          circleName: "孕妇交流圈",
          circleUrl: "../assets/img/login/denglu.png",
          isFollowed: true
        },
        {
          circleId: 2,
          circleName: "减肥瘦身",
          circleUrl: "../assets/img/login/denglu.png",
          isFollowed: false
        },
        {
          circleId: 3,
          circleName: "美容护肤",
          circleUrl: "../assets/img/login/denglu.png",
          isFollowed: false
        },
        {
          circleId: 4,
          circleName: "美容护肤",
          circleUrl: "../assets/img/login/denglu.png",
          isFollowed: false
        },
        {
          circleId: 5,
          circleName: "美容护肤",
          circleUrl: "../assets/img/login/denglu.png",
          isFollowed: false
        },
        {
          circleId: 5,
          circleName: "美容护肤",
          circleUrl: "../assets/img/login/denglu.png",
          isFollowed: false
        },
        {
          circleId: 5,
          circleName: "美容护肤",
          circleUrl: "../assets/img/login/denglu.png",
          isFollowed: false
        },
        {
          circleId: 5,
          circleName: "美容护肤",
          circleUrl: "../assets/img/login/denglu.png",
          isFollowed: false
        },
        {
          circleId: 5,
          circleName: "美容护肤",
          circleUrl: "../assets/img/login/denglu.png",
          isFollowed: false
        },
        {
          circleId: 5,
          circleName: "美容护肤",
          circleUrl: "../assets/img/login/denglu.png",
          isFollowed: false
        },
      ],
      colorList: ["ss1", "ss2", "ss3"]
    };
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    select() {},
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
  position: relative;
  z-index: 3;
  span {
    font-size: 36px;
    color: #000;
  }
  .back {
    width: 50px;
    height: 100px;
    position: absolute;
    left: 0;
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
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: url("../assets/img/login/denglu.png") no-repeat center;
        background-size: cover;
      }
      .circle-follow {
        width: 90px;
        height: 42px;
        border: none;
        border-radius: 30px;
        outline: none;
        font-size: 24px;
        border: 3px solid #f8d742;
        color: #f8d742;
        box-shadow: 0 0 15px #ffe469;
        background: rgba(248, 248, 248, 0);
      }
    }
  }
}

.on {
  background: rgb(248, 248, 248);
  font-weight: 600;
  color: #fddb43 !important;
  border-left: 5px solid #ffe469;
}

.isall {
    font-weight: 600;
    color: #fddb43;
  border-bottom: 8px solid #ffe469;
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