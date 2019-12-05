<template>
  <div class="search">
    <div class="searchbox">
      <van-search v-model="val" placeholder="请输入搜索关键词" show-action shape="round">
        <div slot="action" @click="search">搜索</div>
      </van-search>
    </div>
    <nav>
      <router-link to="/searchs">
        <div>帖子</div>
      </router-link>
      <router-link to="/searchs/userpage">
        <div>用户</div>
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
/* import SearchPost from '' */
import { Search } from "vant";
import { mapMutations } from "vuex";

export default {
  name: "Search",
  data() {
    return {
      val: "",
      result: null,
      /*  postnum: [], */
      userId: 1001,
      keyword: ""
    };
  },
  /*  computed: {
    ...mapState({
      postnum: state => state.postnum
    })
  }, */
  components: {
    [Search.name]: Search
  },
  methods: {
    /* select() { */
    //导航选择
    /* if (e.target.innerText == "帖子") {
        
      } else if (e.target.innerText == "用户") {
        
      } */
    /*  }, */
    ...mapMutations(["searctPost"]),

    goback() {
      this.$router.push("/");
    },
    search() {
      this.result = this.val;
      console.log(this.result);
      this.keyword = this.result;
      /* this.userId = sessionStorage.getItem("userId"); */
      this.searctPost(this.keyword);

      this.axios({
        url: `/search/searchPost?userId=${this.userId}&searchMessage=${this.keyword}`,
        methods: "GET"
      }).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.$router.push("/searchs/havingpost");
          /* this.postnum = res.data.data;
          console.log(this.postnum); */
        }
      });
      /*  this.$store.dispatch('getLists'); */
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.search {
  width: 750px;
  padding-bottom: 70px;
}
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
