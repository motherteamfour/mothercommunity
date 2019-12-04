<template>
  <div class="resource">
    <div class="top">
      <span class="goback" @click="goback()">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </span>
      <h3>我的资料</h3>
      <span></span>
    </div>

    <ul class="por">
      <li style="border-bottom: none">
        <span class="title">头像</span>
        <span class="num">
          <span class="portrait"></span>
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </span>
      </li>
    </ul>
    <ul class="lists">
      <li style="border-bottom: none">
        <span class="title">宝宝状态</span>
        <span class="num">
          <span>{{userInfo.state}}</span>
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </span>
      </li>
    </ul>
    <ul class="lists">
      <li @click="gonicknamepage()">
        <span class="title">昵称</span>
        <span class="num">
          <span>{{userInfo.userName}}</span>
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </span>
      </li>
      <li style="border-bottom: none" @click="gobirthdaypage()">
        <span class="title">宝妈生日</span>
        <span class="num">
          <span>{{userInfo.userBirthday}}</span>
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </span>
      </li>
    </ul>
    <ul class="lists">
      <li style="border-bottom: none">
        <span class="title">用户ID：{{userInfo.userId}}</span>
        
      </li>
    </ul>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  created() {
    let param = new URLSearchParams();
    param.append("id","1001"); 
    this.axios.post("/zp/user/findMyself", param).then(res => {
      console.log(res.data);
      this.userInfo = res.data.data;
      console.log(this.userInfo);
      /* this.focusnum = res.data.data;
      console.log(this.focusnum); */
    });
  },
  methods: {
    goback() {
      this.$router.push("./my");
    },
    gonicknamepage() {
      this.$router.push("/altername")
    },
    gobirthdaypage() {
      this.$router.push("alterbirthday")
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.resource {
  width: 750px;
  height: 100vh;
  background: rgb(248, 248, 248);
  .top {
    width: 750px;
    height: 80px;
    background: @themeColor;
    padding-top: 40px;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    h3 {
      /* width: 80%; */
      width: 70%;
      color: white;
      font-weight: 500;
      font-size: 36px;
      /*  margin-bottom: 10px; */
      letter-spacing: 2px;
      /* line-height: 80px; */
    }
    i {
      color: white;
      font-size: 54px;
    }
  }
  .por {
    height: 140px;

    width: 710px;
    border-radius: 20px;
    background: white;
    margin: 40px auto;
    li {
     /*  height: 140px; */
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 40px;

      .title {
        /* height: 140px; */
        display: inline-block;
        font-size: 30px;
      }
      .num {
       height: 140px;
       /*   line-height: 140px; */
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .portrait {
          display: inline-block;
          width: 120px;
          height: 120px;
          background: yellow;
          border-radius: 50%;
          vertical-align: baseline;
          margin-right: 14px;
        }
      }
    }
  }
  .lists {
    width: 710px;
    border-radius: 20px;
    background: white;
    margin: 40px auto;
    /* box-shadow: 0 0 15px #ddd; */
    /*  line-height: 100px; */
    li {
      height: 100px;
      border-bottom: 1px solid rgb(226, 226, 225);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 40px;
     
      .title {
        display: inline-block;
        font-size: 30px;
     
      }
      .num {
        display: flex;
        justify-content: center;
        align-items: center;
        color: grey;
        span {
          font-size: 30px;
          margin-right: 14px;
        }
      }
      
    }
  }
}
</style>