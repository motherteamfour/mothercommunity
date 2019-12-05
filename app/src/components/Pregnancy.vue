<template>
  <div class="pregnancy">
    <!-- 表单 -->
    <form class="prepare-form">
<!--       <div class="form-group">
        <p>选择预产期</p>
        <div class="one" @click="eventTime">{{menstrualTime}}</div>
      </div> -->
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
      menstrualTime: new Date(), //上一次月经时间
      selectTime: ""
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
          stateId: "3",
          stateStarttime: "2019-12-5"
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
.pregnancy {
  text-align: center;
  input {
    margin-top: 50px;
    width: 200px;
    height: 70px;
    border: none;
    border-radius: 30px;
    background: @themeColor;
    color: #fff;
    font-size: 30px;
  }
}
</style>