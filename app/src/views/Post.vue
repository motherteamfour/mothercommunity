<template>
  <div class="Post">
    <nav>
      <div class="back" @click="back">
        <i class="fa fa-angle-left fa-2x"></i>
      </div>
      <span>发帖</span>
      <button>发布</button>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Post",
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>

<style lang="less" scoped>
nav {
  padding-top: 40px;
  width: 100%;
  height: 100px;
  background: #ffe469;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 36px;
  }
  .back {
    width: 50px;
    height: 90px;
    text-align: center;
    line-height: 90px;
    margin-bottom: 8px;
  }
}
</style>