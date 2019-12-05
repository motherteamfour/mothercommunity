<template>
  <div class="newpost">
    <div class="top">
      <span class="goback" @click="goback()">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </span>
      <h3>我的帖子</h3>
      <span>
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
      </span>
    </div>
    <NewPosts v-for="(item, index) in lists" :key="index"
    :name="item.userName"
    :title="item.postTitle"
    :time="item.postTime"
    :countco="item.isRecommend"
    :imgs="item.user.userImgUrl"></NewPosts>

  </div>
</template>

<script>
import NewPosts from '../components/MyPostLists';
export default {
  data () {
    return {
      lists: [],
      userId: 1001
    }
  },
  components: {
    NewPosts,
  },
  created() {
    this.userId = sessionStorage.getItem("userId");
    this.axios({
      url: `/user/findPostAllByUserId?userid=${this.userId}`,
      methods: "GET"
    })
    .then(res => {
      this.lists = res.data.data;

      console.log("faxieshu",res.data.data);
    })
  },
  methods: {
    goback() {
      this.$router.push('./my');
    }/* ,
    getMypost() {
      this.$store.commit('mypost'+this.lists.length);
    }*/
  } 
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.newpost {
  width: 750px;
  height: 100vh;
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