<template>
  <div class="circle">
    <header>
      <h3 class="title">圈子</h3>
      <ul>
        <li class="recommend" @click="select">
          推荐
          <div class="line" v-bind:style="{ left:lineLeft }"></div>
        </li>
        <li class="followed" @click="select">关注</li>
      </ul>
    </header>
    <div class="banner">

    </div>
  </div>
</template>

<script>
export default {
  name: "Forum",
  data() {
    return {
      lineLeft: "0px"
    };
  },
  components: {},
  methods: {
    select(e) {
      //导航选择
      if(e.target.innerText == '推荐') {
        this.lineLeft = "0px";
      } else if(e.target.innerText == '关注') {
        this.lineLeft = '100%';
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.circle {
  width: 750px;
  height: 100vh;
  background: rgb(248, 248, 248);
  header {
    width: 750px;
    height: 250px;
    border-bottom-left-radius: 350px 220px;
    border-bottom-right-radius: 350px 220px;
    background: @themeColor;
    h3 {
      font-weight: 500;
      color: #fff;
      text-align: center;
      margin-bottom: 10px;
    }
    ul {
      width: 100%;
      display: flex;
      justify-content: center;
      color: #fff;
      font-size: 40px;
      li {
        box-sizing: border-box;
        width: 120px;
        padding: 10px;
        text-align: center;
        position: relative;
      }
      .recommend .line {
        width: 100%;
        height: 8px;
        background: #fff;
        border-radius: 10px;
        position: absolute;
        bottom: 0;
        transition: all 0.2s;
      }
    }
  }

  .banner {
    width: calc(100% - 40px);
    height: 30%;
    background: #ccc;
    box-sizing: border-box;
    margin: 20px;
  }
}
</style>
