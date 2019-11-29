<template>
  <div class="search">
    <div class="searchbox">
      <input type="text" placeholder="妈妈优选" /><span @click="goback()">取消</span>
    </div>
    <nav>
      <router-link to="/searchs" ><div>帖子</div></router-link>
      <router-link to="/searchs/userpage"><div>用户</div></router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
/* import SearchPost from '' */
export default {
  data () {
    return {
      
    }
  },
  /* components: {
    SearchPost,
    UserPage
  }, */
  methods: {
    /* select() { */
      //导航选择
      /* if (e.target.innerText == "帖子") {
        
      } else if (e.target.innerText == "用户") {
        
      } */
   /*  }, */
   
    goback() {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.searchbox {
  width: 710px;
  height: 100px;
  /*   background: yellow; */
  margin: 0 auto;
  padding-top: 40px;
  font-size: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 2px;

  input {
    width: 600px;
    height: 80px;
    background: rgb(248, 244, 244);
    border: none;
    border-radius: 30px;
  }
}
nav {
  width: 710px;
  height: 80px;
  border-bottom: 1px solid gainsboro;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 36px;
  div {
    color: @themeColor;
    border-bottom: 6px solid @themeColor;
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
.hint {
  width: 710px;
  height: 60px;
  font-size: 28px;
  line-height: 60px;
  margin: 0 auto;
  padding-top: 20px;
  /*  background: yellow; */
}
.hotsearch {
  width: 710px;
  margin: 0 auto;
  /* display: flex; */
  /* justify-content: space-around;
  align-items: center; */
  margin-top: 20px;
  li {
    width: 200px;
    height: 60px;
    background: rgb(248, 244, 244);
    text-align: center;
    font-size: 26px;
    line-height: 60px;
    flex-wrap: nowrap;
    display: inline-block;
    margin-left: 25px;
    margin-bottom: 20px;
  }
}
.history {
  width: 710px;
  height: 80px;
  font-size: 30px;
  line-height: 80px;
  margin: 0 auto;
  /*   background: chartreuse; */

  li {
    display: flex;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid rgb(214, 213, 213);
    span {
      span {
        padding-left: 20px;
        letter-spacing: 4px;
      }
      i {
        color: rgb(161, 157, 157);
        font-size: 38px;
      }
    }
  }
  .remove {
    color: rgb(190, 190, 190);
    font-weight: 200;
  }
}
</style>
