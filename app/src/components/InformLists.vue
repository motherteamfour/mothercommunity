<template>
  <div>
    <div class="informlist">
      <div class="left">
        <div class="photo pink">
          <i class="fa fa-volume-up" aria-hidden="true"></i>
        </div>
      </div>
      <div class="right">
        <div class="title">{{title}}</div>
        <div class="content">{{content}}</div>
        <div class="timee">{{time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["content", "time", "title"]
}
</script>

<style lang="less" scoped>
.informlist {
  width: 100%;
 /*  height: 500px; */
 margin-bottom: 20px;
  /* background: gainsboro; */
  display: flex;
  justify-content: flex-start;
  .photo {
    width: 80px;
    height: 80px;
    background: pink;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 10px auto;
    i {
      color: white;
    }
  }
  .right {
    background: white;
    margin-top: 18px;
    box-shadow: 0 0 2px red;
     border-radius: 30px;
     padding-bottom: 10px;
    .content {
      width: 500px;
     
      font-size: 32px;
      padding: 20px;
      padding-top: 0;
     
    }
    .timee {
  
      text-align: center;
      font-size: 20px;
    }
    .title {
      font-size: 32px;
      font-weight: 600;
      padding-left: 20px;
      padding-top: 20px;
    }
  }
}
</style>