<template>
  <div class="prepare-pregnancy">
    <!-- 表单 -->
    <form class="prepare-form">
      <div class="form-group">
        <p>月经天数</p>
        <div class="one">6</div>
      </div>
      <div class="form-group">
        <p>月经周期</p>
        <div class="one">28</div>
      </div>
      <div class="form-group">
        <p>上一次月经时间</p>
        <div class="one">{{temptime}}</div>
      </div>
      <div class="form-group">
        <!-- <input type="button" value="确定" @click="getConfirm" /> -->
      </div>
    </form>
    <!-- 弹出层 -->
    <van-popup class="model" v-model="show" round>
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />

      <!-- <div class="bottom" @click="closeModel">好的</div> -->
    </van-popup>
  </div>
  <!-- 选择日期（年月日） -->
</template>

<script>
import Vue from "vue";
import { DatetimePicker } from "vant";
import { Popup } from "vant";
Vue.use(DatetimePicker);
Vue.use(Popup);

export default {
  name: "PreparePregnancy",
  data() {
    return {
      show: true,
      minDate: new Date(),
      maxDate: new Date(3000, 10, 1),
      currentDate: new Date(),
      temptime: new Date()
    };
  },
  watch() {},
  methods: {
    showPopup() {
      this.show = true;
    },
    timeFormat() {
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      this.temptime = y + "-" + m + "-" + d;
    },
    getConfirm() {}
  },
  created() {
    this.timeFormat();
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";

.prepare-form {
  display: flex;
  justify-content:center;
  flex-wrap:wrap;
  // margin: 0 auto;
  .form-group {
    display: inline-block;
    p {
      font-size: 24px;
      color: #b0b0b0;
      height: 80px;
      line-height: 80px;
    }
    .one {
      width: 380px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      left: 80px;
      border-radius: 40px;
      background-color: white;
      font-size: 22px;
      color: @themeColor;
    }
  }
}
</style>