<template>
   <div class="a-question">
      <div class="title-wrap">
        <i class="fa fa-quora" aria-hidden="true"></i>
        <span class="title">问题标题</span>
      </div>
      <div class="content">
        问题内容问题内容问题内容问题内容问题内容问题内容问题内容问题内容
        问题内容问题内容问题内容问题内容问题内容问题内容问题内容题内容内容
      </div>
      <div class="bottom">
        <div class="reply">
          <span class="reply-num">38</span>&nbsp; 回答
        </div>
        <div class="praise">
          <span class="praise-num">6404</span>&nbsp; 点赞
        </div>
      </div>
    </div>
</template>
<script>

export default {
  name: "AQuestion",
 
};
</script>
<style lang="less" scoped>
 .a-question {
    width: 100%;
    height: 300px;
    // margin: 30px;
    background-color: white;
    //  box-shadow: 0 0 10px   rgba(0, 0, 0, .2);
    border-radius: 20px;
    .title-wrap {
      height: 70px;
      line-height: 70px;
      i {
        vertical-align: middle;
        padding: 0 10px;
        color: #dddddd;
        font-size: 40px;
      }
      .title {
        font-size: 30px;
        font-weight: 700;
      }
    }
    .content {
      padding: 20px 40px;
      height: 140px;
      line-height: 40px;
      font-size: 28px;
      color: #8a8a8a;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
    .bottom {
      padding: 0 40px;
      color: #afafaf;
      font-size: 24px;
      display: flex;
      justify-content: space-between;

      .reply-num,
      .praise-num {
        color: #dba438;
        font-weight: bold;
      }
    }
  }
</style>