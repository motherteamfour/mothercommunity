<template>
  <div class="fans">
    <div class="top">
      <span class="goback" @click="goback()">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </span>
      <h3>我的关注</h3>
      <span>
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
      </span>
    </div>
    <FansLists v-for="(item, index) in focusnum" :key="index"
    :username="item.userName"
    :userimg="item.userImgUrl"></FansLists>
  </div>
</template>

<script>
import FansLists from "../components/FocusLists";
export default {
  data () {
    return {
      focusnum: [],
      userId: 1001
    }
  },
  components: {
    FansLists
  },
  created () {
    this.userId = sessionStorage.getItem("userId");
    let param = new URLSearchParams();
    param.append("userid",this.userId);
    this.axios.post("/zp/fant/findattention", param).then(res => {
      console.log(res.data);
      this.focusnum = res.data.data;
    });
  },
  methods: {
    goback() {
      this.$router.push("./my");
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.fans{
  width: 100%;
 /*  background: ; */
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
    /* width: 80%; */
    width: 70%;
    color: white;
    font-weight: 500;
    font-size: 36px;
    /*  margin-bottom: 10px; */
    letter-spacing: 2px;
    /* line-height: 80px; */
  }
  i {
    color: white;
    font-size: 54px;
  }
}
</style>