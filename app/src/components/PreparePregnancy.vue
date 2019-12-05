<template>
  <div class="prepare-pregnancy">
    <!-- 表单 -->
    <form class="prepare-form">
      <div class="form-group">
        <p>月经天数</p>
        <div class="one" @click="eventOne">6</div>
      </div>
      <div class="form-group">
        <p>月经周期</p>
        <div class="one" @click="eventTwo">28</div>
      </div>
      <div class="form-group">
        <p>上一次月经时间</p>
        <div class="one" @click="eventThree">{{periodOfTime}}</div>
      </div>
      <div class="form-group">
        <!-- <input type="button" value="确定" @click="getConfirm" /> -->
      </div>
    </form>

    <!-- 弹出层 -->
    <van-popup class="model" v-model="show" position="bottom" round>
      <!-- 月经天数 -->
      <van-picker
        :show-toolbar="true"
        v-show="current==1"
        :columns="columnsDays"
        @change="onChangeDays"
        :default-index="6"
      />
      <!-- 月经周期 -->
      <van-picker
        :show-toolbar="true"
        v-show="current==2"
        :columns="columnsPeriod"
        @change="onChangePeriod"
        :default-index="28"
      />

      <!-- 上一次月经时间 -->
      <van-datetime-picker
        v-show="current==3"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="cancel"
        @confirm="confirm"
        @change="change"
      />
    </van-popup>
  </div>
  <!-- 选择日期（年月日） -->
</template>

<script>
import Vue from "vue";
import { DatetimePicker } from "vant";
import { Popup } from "vant";
import { Picker } from "vant";
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(Picker);

export default {
  name: "PreparePregnancy",
  data() {
    return {
      current: null,
      show: false,
      minDate: new Date(1000, 10, 1),
      maxDate: new Date(3000, 10, 1),
      currentDate: new Date(),
      periodOfTime: new Date(),
      selectTime: "",
      // 月经天数（1-15）
      columnsDays: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15"
      ],
      // 月经周期（20-45）
      columnsPeriod: [
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "22",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45"
      ]
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    hidePopup() {
      this.show = false;
    },
    // 时间格式化
    timeFormat() {
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      this.periodOfTime = y + "-" + m + "-" + d;
    },
    // 月经天数事件
    eventOne() {
      this.current = 1;
      this.show = true;
    },
    onChangeDays(picker, value) {
      console.log("月经天数当前值", value);
    },
    // 月经周期事件
    eventTwo() {
      this.current = 2;
      this.show = true;
    },
    onChangePeriod(picker, value) {
      console.log("月经周期当前值", value);
    },
    // 月经时间时间
    eventThree() {
      this.current = 3;
      this.show = true;
    },
    cancel() {
      console.log("取消");
      // 隐藏模态框
      this.hidePopup();
    },
    confirm() {
      console.log("确认");
      this.periodOfTime = this.selectTime; //设置时间
      this.show = false; //隐藏模态框
    },
    change(picker) {
      var timeArr = picker.getValues();
      this.selectTime = timeArr[0] + "-" + timeArr[1] + "-" + timeArr[2];
      console.log(this.selectTime);
    }
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
  justify-content: center;
  flex-wrap: wrap;
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