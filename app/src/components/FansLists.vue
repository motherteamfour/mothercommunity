<template>
  <div class="fans">
    <div class="fanslist">
      <div class="por"></div>
      <div class="username">title</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "fans"
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";

.fanslist {
  width: 710px;
  height: 100px;
  background: gainsboro;
  margin: 10px auto;
  display: flex;
  align-items: center;
  border-radius: 20px;
  .por {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: red;
    margin-left: 20px;
    margin-right: 20px;
  }
  .username {
    font-size: 50px;
  }
}
</style>