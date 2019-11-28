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
    :name="item.name"
    :title="item.title"></NewPosts>

  </div>
</template>

<script>
import NewPosts from '../components/MyPostLists';
export default {
  data () {
    return {
      lists:[
        {
          name: "nana",
          title: "你在干什se么",
        },
        {
          name: "kono",
          title: "你在干什么es",
        },
        {
          name: "eedd",
          title: "你在干什么ssss",
        }
      ]
    }
  },
  components: {
    NewPosts,
  },
  methods: {
    goback() {
      this.$router.push('./my');
    }
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