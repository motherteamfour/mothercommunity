<template>
  <div class="hot-question">
        <div class="phone-book-list">
                   <AQuestion></AQuestion>

        </div>


  </div>
</template>

<script>
import AQuestion from "@/components/AQuestion.vue";

export default {
  name: "HotQuestion",
    components: {
    AQuestion
  }
};
</script>
<style lang="less" scoped>
.hot-question {
  background-color: rgb(248, 248, 248);
  height: 1000px;
  padding: 30px;

 
}
</style>