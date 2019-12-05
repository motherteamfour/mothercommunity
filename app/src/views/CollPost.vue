<template>
  <div class="banner">
    <CollPostList v-for="(item, index) in colllists" :key="index"
    :colllist="item"></CollPostList>
  </div>
</template>

<script>
import CollPostList from "../components/CollPostList";

export default {
  data () {
    return {
      colllists: []
    }
  },
  components: {
    CollPostList
  },
  created() {
    let param = new URLSearchParams();
    param.append("userid", "1001");
    this.axios.post("/zp/user/findcollectpost", param).then(res => {
      console.log(res.data.data);

      this.colllists = res.data.data;

    });
  }
};
</script>

<style lang="less" scoped>
</style>