<template>
  <div class="reply">
    <div class="top">
      <span class="goback" @click="goback()">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </span>
      <h3>我的回复</h3>
      <span>
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
      </span>
    </div>
    <ReplyLists v-for="(item, index) in lists" :key="index"
    :lists="item"></ReplyLists>
    
  </div>
</template>

<script>
import ReplyLists from '../components/ReplyLists'
export default {
  data () {
    return {
      userId: 1001,
      lists: []
    }
  },
  components: {
    ReplyLists
  },
 created() {
    this.userId = sessionStorage.getItem("userId");
    let param = new URLSearchParams();
    param.append("userid",this.userId);
    this.axios.post(`/zp/user/retuenpost`, param)
    .then(res => {
      this.lists = res.data.data;

      console.log("回帖数",res.data.data);
    })
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
.reply {
  width: 750px;
  /* height: 100vh; */
  padding-bottom: 100px;
  background: rgb(248, 248, 248);
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
 
}
</style>