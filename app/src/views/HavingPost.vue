<template>
  <div class="search">
    <div class="searchbox">
      <HavingPostList v-for="(item, index) in postnum" :key="index"
      :title="item.postTitle"
      :content="item.postContent"
      :username="item.user.userName"></HavingPostList>
    </div>
  </div>
</template>

<script>
import HavingPostList from '../components/HavingPostList';
export default {
  props:['title','content','username'],
  components: {
    HavingPostList
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
 
  background: greenyellow;
}
.searchbox {
  width: 710px;
  
  background: yellow;
  margin: 0 auto;

  font-size: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 2px;
}
</style>