<template>
  <div class="resource">
    <div class="top">
      <span class="goback" @click="goback()">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </span>
      <h3>修改生日</h3>
      <span></span>
    </div>
    <div class="alterbox">
<van-datetime-picker
  v-model="currentDate"
  type="date"

  @confirm="alterbirth"
  @cancel="goback()"
/>
    </div>
  </div>
</template>

<script>
import { DatetimePicker } from 'vant';
export default {
  data() {
    return {
      currentDate: new Date(),
    
    };
  },
  components: {
    [DatetimePicker.name]: DatetimePicker
  },
  methods: {
    goback() {
      this.$router.push("/resource");
    },
    alterbirth() {
      console.log("xiugai")
      
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.resource {
  width: 750px;
  height: 100vh;
  background: rgb(230, 222, 222);
}
.top {
  width: 750px;
  height: 80px;
  background: @themeColor;
  padding-top: 40px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  h3 {
    width: 70%;
    color: white;
    font-weight: 500;
    font-size: 36px;
    letter-spacing: 2px;
  }
  i {
    color: white;
    font-size: 54px;
  }
}
</style>