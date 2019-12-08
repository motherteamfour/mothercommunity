<template>
  <div class="search">
    <div class="searchbox">
      <HavingPostList v-for="(item, index) in postnum" :key="index"
      :user="item"></HavingPostList><!--  :title="item.postTitle"
      :content="item.postContent" -->
    </div>  <!--  :username="item.user.userName" -->
  </div>
</template>

<script>
import HavingPostList from '../components/HavingPostList';
export default {
  /* props:['title','content','username'], */
  data () {
    return {
      keyword: '',
      postnum: [],
      userId: 1001
    }
  },
  components: {
    HavingPostList
  },
  created () {
    this.userId = sessionStorage.getItem("userId");
    this.keyword = this.$store.state.searchPost;
    console.log("ss",this.keyword);
    this.axios({
        url: `/search/searchPost?userId=${this.userId}&searchMessage=${this.keyword}`,
        methods: "GET"
      }).then(res => {
        console.log("123",res.data.data);
        this.postnum = res.data.data;
          /* this.postnum = res.data.data;
          console.log(this.postnum); */
        
      });
  },
  methods: {
    /* getpostnum({commit},postnum){
      commit("getpostnum", postnum);
    } */
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.search {
  width: 750px;
  /* height: 1000px; */
  background: rgb(248,248,248);
}
.searchbox {
  width: 710px;
  
  /* background: yellow; */
  margin: 0 auto;

  font-size: 36px;
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  letter-spacing: 2px;
}
</style>