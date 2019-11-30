<template>
  <div>
    <div class="informlist">
      <div class="left">
        <div class="photo pink">
          <i class="fa fa-volume-up" aria-hidden="true"></i>
        </div>
      </div>
      <div class="right">
        <div class="content">内容菲佛为佛欸佛欸放假呢哦i金佛欸分解分解二姐夫都i恩迪哦呢哦i飞机场我i恩佛i就发动i额二级偶分呢</div>
        <div class="timee">时间</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
.informlist {
  width: 600px;
 /*  height: 500px; */
 margin-bottom: 20px;
  background: rgb(223, 219, 219);
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
    box-shadow: 0 0 3px red;
     border-radius: 30px;
     padding-bottom: 10px;
    .content {
      width: 500px;
     
      font-size: 32px;
      padding: 20px;
     
    }
    .timee {
  
      text-align: center;
      font-size: 20px;
    }
  }
}
</style>