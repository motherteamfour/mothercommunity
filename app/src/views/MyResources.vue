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
        <span class="title">宝宝管理</span>
        <span class="num">
          0
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </span>
      </li>
    </ul>
    <ul class="lists">
      <li>
        <span class="title">昵称</span>
        <span class="num">
          0
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </span>
      </li>
      <li>
        <span class="title">城市</span>
        <span class="num">
          0
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </span>
      </li>
      <li style="border-bottom: none">
        <span class="title">宝妈生日</span>
        <span class="num">
          0
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </span>
      </li>
    </ul>
    <ul class="lists">
      <li style="border-bottom: none">
        <span class="title">用户ID:1212121212</span>
        <!-- <span class="num tel">手机号码</span> -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    goback() {
      this.$router.push("./my");
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
      height: 140px;
      display: flex;
      
      align-items: center;
      padding: 0 40px;

      .title {
        /* height: 140px; */
        display: inline-block;
        font-size: 30px;
      }
      .num {
        height: 140px;
        line-height: 140px;
        .portrait {
          display: inline-block;
          width: 120px;
          height: 120px;
          background: yellow;
          border-radius: 50%;
          vertical-align: baseline;
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
      /*  img {
        width: 44px;
        height: 44px;
        display: inline-block;
        vertical-align: middle;
      } */
      .title {
        display: inline-block;
        font-size: 30px;
        /*         width: calc(100%-44px);
 */
        /* height: 60px; */
        /* margin-left: 20px; */
      }
      .num {
        /* display: inline-block;
        height: 70px;
        width: 430px;
        font-size: 36px;
        text-align: right;
        color: rgb(168, 170, 165); */
      }
      /*.telphone {
        font-size: 28px;
        color: red;
      }
      .tel {
        font-size: 28px;
        margin-left: 70px;
        color: rgb(186, 189, 182);
      } */
    }
  }
}
</style>