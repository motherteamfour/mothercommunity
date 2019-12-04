<template>
  <div class="followed">
    <div class="top">关注的人</div>
    <FollowedList v-for="(item, index) in hotList" :key="index" :list="item">
    </FollowedList>
  </div>
</template>

<script>
import FollowedList from "@/components/FollowedList.vue";
export default {
  data() {
    return {
      hotList: []
    };
  },
  components: {
    FollowedList
  },
  created() {
    this.axios.get("post/fol?userId=1002").then(res => {
      this.hotList = res.data.data;
      console.log(res.data);
    });
  }
};
</script>

<style lang="less" scoped>
.followed {
  width: calc(100% - 40px);
  min-height: 100vh;
  background: rgb(248, 248, 248);
  margin: 0 auto;
  padding-bottom: 100px;
  .top {
    text-align: center;
    background: #fff;
    font-size: 36px;
    border-radius: 20px 20px 0 0;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }
}
</style>