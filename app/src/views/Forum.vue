<template>
  <div class="circle">
    <header>
      <h3 class="title">圈子</h3>
      <ul>
        <li>推荐</li>
        <li>关注</li>
      </ul>
    </header>
  </div>
</template>

<script>


export default {
  name: 'Forum'
 
}
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
  .circle {
    width: 750px;
    height: 100vh;
    background: rgb(248, 248, 248);
    header {
      width: 750px;
      height: 250px;
      border-bottom-left-radius: 350px 220px;
      border-bottom-right-radius: 350px 220px;
      background: @themeColor;
      h3 {
        font-weight: 500;
        color: #fff;
        text-align: center;
        margin-bottom: 10px;
      }
      ul {
        display: flex;
        justify-content: center;
        color: #fff;
        font-size: 40px;
        li {
          padding: 10px;
        }
      }
    }
  }
</style>
