<template>
  <div class="showTime">
    <p>{{realTime}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      realTime: ""
    };
  },
  mounted() {
    // 页面加载完后显示当前时间
    this.realTime = this.dealWithTime(new Date());
    // 定时刷新时间
    let _this = this;
    // 定时器
    this.timer = setInterval(function() {
      _this.realTime = _this.dealWithTime(new Date()); // 修改数据date
    }, 1000);
  },
  methods: {
    dealWithTime(data) {
      let formatDateTime;
      let Y = data.getFullYear();
      let M = data.getMonth() + 1;
      let D = data.getDate();
      let H = data.getHours();
      let Min = data.getMinutes();
      let S = data.getSeconds();
      let W = data.getDay();
      H = H < 10 ? "0" + H : H;
      Min = Min < 10 ? "0" + Min : Min;
      S = S < 10 ? "0" + S : S;
      switch (W) {
        case 0:
          W = "天";
          break;
        case 1:
          W = "一";
          break;
        case 2:
          W = "二";
          break;
        case 3:
          W = "三";
          break;
        case 4:
          W = "四";
          break;
        case 5:
          W = "五";
          break;
        case 6:
          W = "六";
          break;
        default:
          break;
      }
      formatDateTime =
        Y + "年" + M + "月" + D + "日 " + H + ":" + Min + ":" + S + " 星期" + W;
      return formatDateTime;
    }
  },
  // 注意在vue实例销毁前，清除我们的定时器。
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style lang="less" scoped>
</style>