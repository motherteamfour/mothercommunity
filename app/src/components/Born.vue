<template>
  <div class="born">
    <div class="boby-name">
      <p>宝宝姓名</p>
      <input type="text" v-model="name" placeholder="请输入"/>
    </div>
    <p>宝宝性别</p>
    <div class="select-sex">
      <van-radio-group v-model="radio" checked-color="#ef8e9a">
        <van-radio name="男">男</van-radio>
        <van-radio name="女">女</van-radio>
      </van-radio-group>
    </div>
    <div>
      <p>宝宝出生日期</p>
      <div class="time" @click="show=!show">{{time}}</div>
    </div>
    <input type="button" class="confirm" value="确定" @click="getConfirm" />
    <van-popup class="model" v-model="show" position="bottom" round>
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmTime"
        @change="changeTime"
      />
    </van-popup>
  </div>
</template>

<script>
import { RadioGroup, Radio } from "vant";
import { DatetimePicker } from "vant";
import { Popup } from "vant";
export default {
  name: "Born",
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup
  },
  data() {
    return {
      name: '',
      radio: "男",
      currentDate: new Date(),
      show: false,
      settingTime: "",
      time: "",
      minDate: new Date(2018, 1, 1),
      maxDate: new Date(2030, 10, 1)
    };
  },
  methods: {
    getConfirm() {
      var userId = sessionStorage.getItem("userId");
      // 发送Ajax向后台传递数据
      // /zp/user/updatestate
      this.axios
        .post("/zp/user/updatestate", {
          userId: userId,
          stateId: "4",
          babyName: this.name,
          badySex: this.radio,
          stateStarttime: this.time
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
    },

    confirmTime() {
      console.log("确认");
      this.time = this.selectTime; //设置时间
      this.show = false; //隐藏模态框
      console.log;
    },
    changeTime(picker) {
      var timeArr = picker.getValues();
      this.selectTime = timeArr[0] + "-" + timeArr[1] + "-" + timeArr[2];
      console.log(this.selectTime);
    },
    // 时间格式化
    timeFormat() {
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      this.time = y + "-" + m + "-" + d;
    }
  },
  created() {
    this.timeFormat();
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.born {
  width: 50%;
  margin: 0 auto;
  text-align: center;
  input {
    width: 100%;
    border-radius: 40px;
    border: none;
    text-align: center;
       height: 80px;
       font-size: 30px;
  }
}
.confirm {
  margin-top: 50px;
  width: 200px;
  height: 70px;
  border: none;
  border-radius: 30px;
  background: @themeColor;
  color: #fff;
  font-size: 30px;
}
p {
  width: 100%;
  font-size: 26px;
  text-align: left;
  margin-top: 30px;
  margin-bottom: 10px;
}
.select-sex {
  width: 100px;
  font-size: 26px;
  margin: 0 auto;
}

.time {
  width: 100%;
  font-size: 26px;
      border-radius: 40px;
      background: #fff;
      height: 80px;
      line-height: 80px;
}
</style>