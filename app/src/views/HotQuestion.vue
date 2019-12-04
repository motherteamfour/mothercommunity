<template>
  <div class="hot-question">
    <ul class="list">
      <li v-for="(item, index) in lists" :key="index">
        <router-link :to="'/questiondetail/' + item.questionId">
          <AQuestion
            :questionTitle="item.questionTitle"
            :questionContent="item.questionContent"
            :questionReply="item.questionReply"
            :questionPoints="item.questionPoints"
          ></AQuestion>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import AQuestion from "@/components/AQuestion.vue";

export default {
  name: "HotQuestion",
  components: {
    AQuestion
  },
  data() {
    return {
      lists: {}
    };
  },
  created() {
    var userId = sessionStorage.getItem("userId");
    this.axios
      .post(`/question/hotQuestion?userId=${userId}`)
      .then(res => {
        console.log("热门问题：", res.data);
        this.lists = res.data.data;
        console.log(this.lists);
      })
      .catch(err => {
        console.log(err);
      });
  },
  destroyed() {
    console.log("组件被销毁");
  }
};
</script>
<style lang="less" scoped>
.hot-question {
  background-color: rgb(248, 248, 248);
  padding: 30px;
}
</style>