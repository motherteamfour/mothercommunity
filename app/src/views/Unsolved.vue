<template>
  <div class="un-solved">
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
  name: "Unsolved",
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
      .get(`/question/unsolvedQuestion?userId=${userId}`)
      .then(res => {
        console.log("待解决问题：", res.data);
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
.un-solved {
  background-color: rgb(248, 248, 248);
  padding: 30px;
}
</style>