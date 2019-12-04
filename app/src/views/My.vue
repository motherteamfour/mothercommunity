<template>
  <div class="my">
    <!-- 个人中心头部 -->
    <div class="top">
      <h3>我的</h3>
      <div class="user">
        <div class="portrait" @click="goMyResourcePage()">
        <!--   <p>头像</p> -->
          <img :src="userInfo.userImgUrl" alt="">
        </div>
        <span class="username">{{userInfo.userName}}</span>
        <br />
        <span class="state">备孕中</span>
        <span class="address">四川 成都</span>
      </div>
    </div>

    <div class="nav">
      <div class="attention" @click="goFocusPage()">
        <p>关注</p>
        <p class="fansnum">{{focusnum}}</p>
      </div>
      <div class="fans" @click="goFansPage()">
        <p>粉丝</p>
        <p class="fansnum">{{fansnum}}</p>
      </div>
    </div>
    <ul class="lists">
      <li>
        <img src="../assets/img/my/fatie.png" alt />
        <span class="title">我的发帖</span>
        <span class="num">{{getPostnum}}</span>
        <img src="../assets/img/my/youjiantou.png" alt @click="goNewpostPage()" />
      </li>
      <li>
        <img src="../assets/img/my/jinrutiezihuitie.png" alt />
        <span class="title">我的回帖</span>
        <span class="num">0</span>
        <img src="../assets/img/my/youjiantou.png" alt @click="goReplyPage()" />
      </li>
      <li style="border-bottom: none">
        <img src="../assets/img/my/shoucang.png" alt />
        <span class="title">我的收藏</span>
        <span class="num">0</span>
        <img src="../assets/img/my/youjiantou.png" alt @click="goCollectPage()" />
      </li>
    </ul>
    <ul class="lists">
      <li>
        <img src="../assets/img/my/shouji.png" alt />
        <span class="title">手机绑定</span>
        <span class="num telphone">{{userInfo.userPhone}}</span>
      </li>
      <li style="border-bottom: none">
        <img src="../assets/img/my/yidenglu5.png" alt />
        <span class="title">已登录</span>
        <span class="num tel">手机号码</span>
      </li>
    </ul>
    <div class="btnbox">
      <button type="button" class="btn">退出登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "My",
  data () {
    return {
      fansnum: "",
      focusnum: "",
      userInfo: {},
      getPostnum: ""
    }
  },
  created() {
    let param = new URLSearchParams();
    param.append("id","1002");
    this.axios.post("/zp/fant/countFants", param).then(res => {
      this.fansnum = res.data.data;
      console.log('粉丝数',res.data);
    });
    this.axios.post("/zp/fant/countattention", param).then(res => {
      this.focusnum = res.data.data;
      console.log('关注数',res.data);
    });
    this.axios.post("/zp/user/findMyself", param).then(res => {
      this.userInfo = res.data.data;
    });
    this.axios({
      url: "/user/findCollectByUserId?userId=1001",
      methods: "GET"
    })
    .then(res => {
      console.log(res.data);
      /* this.getPostnum = res.data.data.length; */
    })
   
  },
  methods: {
    goNewpostPage() {
      this.$router.push("/newpost");
    },
    goReplyPage() {
      this.$router.push("/reply");
    },
    goCollectPage() {
      this.$router.push("/collect");
    },
    goMyResourcePage() {
      this.$router.push("/resource");
    },
    goFansPage() {
      this.$router.push("/fanspage");
    },
    goFocusPage() {
      this.$router.push("/focuspage");
    },
    ResourcePage() {
      this.axios({});
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.my {
  width: 750px;
  height: 100vh;
  background: rgb(248, 248, 248);
  /*  overflow: hidden; */

  .top {
    padding-top: 40px;
    width: 100%;
    height: 300px;
    background: @themeColor;
    border-bottom-left-radius: 460px 200px;
    /* border-bottom-right-radius: 460px 200px; */
    h3 {
      text-align: center;
      color: white;
      font-weight: 500;
      font-size: 36px;
    }
    .user {
      width: 750px;
      height: 180px;
      /* background: greenyellow; */
      margin-top: 50px;
      .portrait {
        width: 180px;
        height: 180px;
        background: white;
        border-radius: 50%;
        float: left;
        margin-left: 80px;
        margin-top: -26px;
        margin-right: 20px;
        /*  position: absolute;
        left: 60px;
        top: 140px; */
        p {
          text-align: center;
          line-height: 180px;
        }
      }
      .username {
        font-size: 40px;
        color: white;
      }
      .state {
        font-size: 34px;
        color: white;
      }
      .address {
        font-size: 30px;
        color: white;
        display: inline-block;
        width: 200px;
        margin-left: 50px;
      }
    }
  }

  .nav {
    margin: 20px auto;
    width: 710px;
    height: 120px;
    background: white;
    border-radius: 40px;
    .attention,
    .fans {
      width: 100px;
      height: 120px;
      float: left;
      /*   background: gray; */
      margin: 0 10px 0 160px;
      p {
        font-size: 36px;
        line-height: 60px;
        text-align: center;
      }
      .fansnum {
        font-size: 34px;
        color: rgb(168, 170, 165);
      }
    }
  }

  .lists {
    width: 710px;
    border-radius: 20px;
    background: white;
    margin: 40px auto;
    /* box-shadow: 0 0 15px #ddd; */
    line-height: 100px;
    li {
      padding-left: 40px;

      height: 100px;
      border-bottom: 1px solid rgb(226, 226, 225);
      img {
        width: 44px;
        height: 44px;
        display: inline-block;
        vertical-align: middle;
      }
      .title {
        display: inline-block;
        font-size: 30px;
        width: calc(100%-44px);
        height: 60px;
        margin-left: 20px;
      }
      .num {
        display: inline-block;
        height: 70px;
        width: 430px;
        font-size: 36px;
        text-align: right;
        color: rgb(168, 170, 165);
      }
      .telphone {
        font-size: 28px;
        color: red;
      }
      .tel {
        font-size: 28px;
        margin-left: 70px;
        color: rgb(186, 189, 182);
      }
    }
  }

  .btnbox {
    width: 100%;
    height: 80px;
    text-align: center;
    .btn {
      width: 400px;
      height: 80px;
      background: @themeColor;
      color: white;
      border: none;
      border-radius: 30px;
      font-size: 30px;
      outline: none;
    }
  }
}
</style>