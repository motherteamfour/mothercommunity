<template>
  <div class="searchpost">
    <p class="hint">热门搜索</p>
    <ul class="hotsearch">
      <li v-for="(item, index) in searchlists" :key="index">{{item}}</li>
    </ul>
    <p class="hint">历史记录</p>
    <ul class="history">
      <li v-for="(item, index) in history" :key="index">
        <span>
          <i class="fa fa-clock-o" aria-hidden="true"></i>
          <span>{{item}}</span>
        </span>
        <span @click="del()">
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
  data() {
    return {
      searchlists: [],
      history: []
    };
  },

  created() {
    this.axios({
      url: "/search/searchTop10",
      method: "GET"
    }).then(res => {
      this.searchlists = res.data.data;
    });
    this.axios.get("/search/searchHistory?userId=1001").then(res => {
      this.history = res.data.data;
    });
    
  },

  methods: {
    del() {
      /*  this.axios({
        url: '/search/deleteHistoryBySearchMessage?searchMessage="1"&userId=1001',
        methods: "get"
      })
      .then(res => {
        console.log(res.data);
      }) */
      /*  this.history.splice(i, 1);
      console.log(i); */
      this.axios
      .get(
        "/search/deleteHistoryBySearchMessage?userId=1001&searchMessage=宝宝抽烟"
      )
      .then(res => {
        console.log(res.data);
      });
    },
    removeAll() {
      this.axios.get("/search/deleteAllHistory?userId=1001").then(res => {
        console.log(res.data);
      });
    }
  }
  /* this.axios({
      url: "/search/searchHistory",
      methods: "get", */
  /*  header: {
        "Content-Type": "application/x-www-form-urlencoded"
      } */
  /* })
      .then(res => {
        console.log(res.data);
      })
  }, */
  /*  this.axios.get("/search/searchHistory?userId=1001").then(res => {
      console.log(res.data);
      
    })
  }, */
};
</script>

<style lang="less" scoped>
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
  height: 80px;
  font-size: 30px;
  line-height: 80px;
  margin: 0 auto;
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
