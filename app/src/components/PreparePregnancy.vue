<template>
  <div class="prepare-pregnancy">
    <!-- 表单 -->
    <form class="prepare-form">
      <div class="form-group">
        <p>月经天数</p>
        <div class="one" @click="eventDay">{{menstrualDays}}</div>
      </div>
      <div class="form-group">
        <p>月经周期</p>
        <div class="one" @click="eventPeriod">{{menstrualPeriod}}</div>
      </div>
      <div class="form-group">
        <p>上一次月经时间</p>
        <div class="one" @click="eventTime">{{menstrualTime}}</div>
      </div>
      <div class="form-group">
        <input type="button" value="确定" @click="getConfirm" />
      </div>
    </form>

    <!-- 弹出层 -->
    <van-popup class="model" v-model="show" position="bottom" round>
      <!-- 月经天数 -->
      <van-picker
        :show-toolbar="true"
        v-show="current==1"
        :columns="columnsDays"
        @cancel="cancel"
        @confirm="confirmDays"
        @change="changeDays"
        :default-index="6"
      />
      <!-- 月经周期 -->
      <van-picker
        :show-toolbar="true"
        v-show="current==2"
        :columns="columnsPeriod"
        @cancel="cancel"
        @confirm="confirmPeriod"
        @change="changePeriod"
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
        @confirm="confirmTime"
        @change="changeTime"
      />
    </van-popup>
  </div>
  
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
      menstrualDays: "6", //月经天数
      menstrualPeriod: "28", //月经周期
      menstrualTime: new Date(), //上一次月经时间
      selectDays: "",
      selectPeriod: "",
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
    // 时间格式化
    timeFormat() {
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      this.menstrualTime = y + "-" + m + "-" + d;
    },
    eventDay() {
      this.current = 1;
      this.show = true;
    },
    eventPeriod() {
      this.current = 2;
      this.show = true;
    },
    eventTime() {
      this.current = 3;
      this.show = true;
    },
    // 取消直接隐藏模态框
    cancel() {
      console.log("取消");
      // 隐藏模态框
      this.show = false;
    },
    // 月经天数事件
    changeDays(picker, value) {
      console.log("月经天数当前值", value);
      this.selectDays = value;
    },
    confirmDays() {
      this.menstrualDays = this.selectDays;
      console.log(this.menstrualDays, this.selectDays);
      this.show = false; //隐藏模态框
    },
    // 月经周期事件
    confirmPeriod() {
      this.menstrualPeriod = this.selectCycle;
      console.log(this.menstrualPeriod, this.selectCycle);
      this.show = false; //隐藏模态框
    },
    changePeriod(picker, value) {
      console.log("月经周期当前值", value);
      this.selectCycle = value;
    },
    // 月经时间时间
    changeTime(picker) {
      var timeArr = picker.getValues();
      this.selectTime = timeArr[0] + "-" + timeArr[1] + "-" + timeArr[2];
      console.log(this.selectTime);
    },
    confirmTime() {
      console.log("确认");
      this.menstrualTime = this.selectTime; //设置时间
      this.show = false; //隐藏模态框
    },
    // 确认提交
    getConfirm() {
      var userId = sessionStorage.getItem("userId");
      console.log(
        "确认提交",
        this.menstrualDays,
        this.menstrualPeriod,
        this.menstrualTime
      );
      // 发送Ajax向后台传递数据
      // /zp/user/updatestate
      this.axios
        .post("/zp/user/updatestate", {
          userId: userId,
          stateId: "2",
          stateStarttime: this.menstrualTime,
          menstrualExtent: this.menstrualDays,
          menstrualCycle: this.menstrualPeriod
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.$router.replace("/");
          }
        })
        .catch(err => {
          console.log(err);
        });
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
      text-align: center;
    }
    .one {
      width: 380px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      // left: 80px;
      border-radius: 40px;
      background-color: white;
      font-size: 22px;
      color: @themeColor;
    }
    input[type="button"] {
      width: 380px;
      height: 80px;
      line-height: 80px;
      margin-top: 165px;
      text-align: center;
      border-radius: 40px;
      background-color: @themeColor;
      font-size: 22px;
      color: white;
      border: none;
      outline: none;
    }
  }
}
</style>