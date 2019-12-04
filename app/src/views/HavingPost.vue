<template>
  <div class="search">
    <div class="searchbox">
      <HavingPostList v-for="(item, index) in postnum" :key="index"></HavingPostList>
    </div>
  </div>
</template>

<script>
import HavingPostList from '../components/HavingPostList';
export default {
  props: ['postnum'],
  components: {
    HavingPostList
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