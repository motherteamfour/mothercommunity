<template>
  <div class="banner">
    <CollPostList v-for="(item, index) in colllists" :key="index"
    :colllist="item"></CollPostList>
  </div>
</template>

<script>
import CollPostList from '../components/CQAList';
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
    var userId = sessionStorage.getItem("userId");
    let param = new URLSearchParams();
    param.append("userid", userId);
    this.axios.post("/zp/user/findcollectquestion", param).then(res => {
      console.log("问答",res.data.data);

      this.colllists = res.data.data;

    });
  }
}
</script>

<style lang="less" scoped>
  
</style>