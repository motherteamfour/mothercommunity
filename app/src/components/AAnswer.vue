<template>
  <div class="a-answer">
    <div class="title-wrap">
      <i class="fa fa-quora" aria-hidden="true"></i>
      <span class="title">{{answerTitle}}</span>
    </div>
    <div class="content">{{answerContent}}</div>
    <div class="bottom">
      <div class="reply">
        <span class="reply-num">{{answerReply}}</span>&nbsp; 回答
      </div>
      <div class="praise">
        <span class="praise-num">{{answerPoints}}</span>&nbsp; 点赞
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AAnswer",
  props: {
    answerTitle: String,
    answerContent: String,
    // 回答的数量
    answerReply: Number,
    // 点赞数量
    answerPoints: Number
  }
};
</script>
<style lang="less" scoped>