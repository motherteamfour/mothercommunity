<template>
  <div class="searchpost">
    <p class="hint">历史记录</p>
    <ul class="history">
      <li v-for="(item, index) in history" :key="index" @click="searchpost()">
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
  inject: ["reload"],
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
      this.axios
        .get(
          "/search/deleteHistoryBySearchMessage?searchMessage=宝宝喝酒&userId=1001"
        )
        .then(res => {
          if (res.code == 200) {
            this.axios.get("/search/searchHistory?userId=1001").then(res => {
              this.history = res.data.data;
            });
          }
          console.log(res.data);
        });
      this.reload();
    },
    removeAll() {
      this.axios.get("/search/deleteAllHistory?userId=1001").then(res => {
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
}
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