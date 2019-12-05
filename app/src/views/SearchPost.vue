<template>
  <div class="searchpost">
    <p class="hint">热门搜索</p>
    <ul class="hotsearch">
      <li v-for="(item, index) in searchlists" :key="index" @click="searchss(item)">{{item}}</li>
    </ul>
    <p class="hint">历史记录</p>
    <ul class="history">
      <li v-for="(item, index) in history" :key="index">
        <span @click="searchpost(item)">
          <i class="fa fa-clock-o" aria-hidden="true"></i>
          <span>{{item}}</span>
        </span>
        <span @click="del(item)">
          <i class="fa fa-times" aria-hidden="true"></i>
        </span>
      </li>
      <li class="remove" v-show="true">
        <span></span>
        <span @click="removeAll">清除消息记录</span>
        <span></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      searchlists: [],
      history: [],
      postnum: [],
      userId: 1001
    };
  },

  created() {
    this.userId = sessionStorage.getItem("userId");
    this.axios({
      url: "/search/searchTop10",
      method: "GET"
    }).then(res => {
      this.searchlists = res.data.data;
      console.log("top10",res.data);
    });
    this.axios.get(`/search/searchHistory?userId=${this.userId}`).then(res => {
      this.history = res.data.data;
    });
  },

  methods: {
    searchss(index){
      console.log("数据",index);
      this.axios({
        url: `/search/searchPost?userId=${this.userId}&searchMessage=${index}`,
        methods: "GET"
      })
      .then (res => {
        console.log(res.data);
        if(res.data.code == 200) {
          this.$router.push('/searchs/havingpost');
          this.postnum = res.data.data;
          console.log(this.postnum);
          /* this.$store.dispatch('getpostnum', this.postnum); */
        }
      })
    },
    searchpost(item) {
      var userId = sessionStorage.getItem("userId");
      this.axios({
        url: `/search/searchPost?userId=${userId}&searchMessage=${item}`,
        methods: "GET"
      })
      .then (res => {
        console.log(res.data);
        if(res.data.code == 200) {
          this.$router.push('/searchs/havingpost');
          this.postnum = res.data.data;
          console.log(this.postnum);
          /* this.$store.dispatch('getpostnum', this.postnum); */
        }
      })
    },
    del(item) {
      var userId = sessionStorage.getItem("userId");
      this.axios
        .get(
          `/search/deleteHistoryBySearchMessage?searchMessage=${item}&userId=${userId}`
        )
        .then(res => {
          if (res.code == 200) {
            this.axios.get(`/search/searchHistory?userId=${userId}`).then(res => {
              this.history = res.data.data;
            });
          }
          console.log(res.data);
        });
      this.reload();
    },
    removeAll() {
      this.axios.get(`/search/deleteAllHistory?userId=${this.userId}`).then(res => {
        if (res.code == 200) {
          this.axios.get("/search/searchHistory?userId=1001").then(res => {
            this.history = res.data.data;
          });
        }
      });
    },
    /* searchpost() {
      this.axios.
    } */
  }
};
</script>

<style lang="less" scoped>
.searchpost {
  width: 750px;
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
  /* height: 80px; */
  font-size: 30px;
  line-height: 80px;
  margin: 20px auto;

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
