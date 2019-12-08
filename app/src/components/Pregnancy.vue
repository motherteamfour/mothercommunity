<template>
  <div class="pregnancy">
    <!-- 表单 -->
    <form class="pregnancy-form">
      <div class="form-group">
        <p>输入预产期</p>
        <div class="one" @click="eventTime">{{expectedDate}}</div>
      </div>
      <div class="form-group">
        <input type="button" value="确定" @click="getConfirm" />
      </div>
    </form>

    <!-- 弹出层 -->
    <van-popup class="model" v-model="show" position="bottom" round>
      <!-- 预产期 -->
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
  name: "Pregnancy",
  data() {
    return {
      current: null,
      show: false,
      minDate: new Date(1000, 10, 1),
      maxDate: new Date(3000, 10, 1),
      currentDate: new Date(),
      expectedDate: new Date(), //预产期
      selectDate: ""
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
      this.expectedDate = y + "-" + m + "-" + d;
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
    // 月经时间时间
    changeTime(picker) {
      var timeArr = picker.getValues();
      this.selectDate = timeArr[0] + "-" + timeArr[1] + "-" + timeArr[2];
      console.log(this.selectDate);
    },
    confirmTime() {
      console.log("确认");
      this.expectedDate = this.selectDate; //设置时间
      this.show = false; //隐藏模态框
    },
    // 确认提交
    getConfirm() {
      var userId = sessionStorage.getItem("userId");
      console.log("确认提交", this.expectedDate);
      // 发送Ajax向后台传递数据
      this.axios
        .post("/zp/user/updatestate", {
          userId: userId,
          stateId: "3",
          stateStarttime: this.expectedDate
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

.pregnancy-form {
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