<template>
  <div class="searchpost">
    <p class="hint">热门搜索</p>
    <ul class="hotsearch">
      <li v-for="(item, index) in searchlists" :key="index">{{item.keywords}}</li>
    </ul>
    <p class="hint">历史记录</p>
    <ul class="history">
      <li v-for="(item, index) in history" :key="index">
        <span>
          <i class="fa fa-clock-o" aria-hidden="true"></i>
          <span>着床</span>
        </span>
        <span @click="del(index)">
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
      searchlists: [
        {
          keywords: "着床"
        },
        {
          keywords: "着床"
        },
        {
          keywords: "着床"
        },
        {
          keywords: "怀孕"
        },
        {
          keywords: "着床"
        },
        {
          keywords: "怀孕"
        },
        {
          keywords: "着床"
        },
        {
          keywords: "怀孕"
        }
      ],
      history: [
        {
          name: "着床"
        },
        {
          name: "着床"
        },
        {
          name: "着床"
        },
        {
          name: "着床"
        }
      ]
    };
  },
  methods: {
    del(i) {
      this.history.splice(i, 1);
      console.log(i);
    },
    removeAll() {
      this.history.splice(0);
      console.log(this.lengths);
    }
  }
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