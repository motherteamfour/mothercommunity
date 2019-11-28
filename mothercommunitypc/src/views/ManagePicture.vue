<template>
  <div class="manngePicture">
    <div v-show="showEidt">
      <p class="title">点击所需板块进行设置</p>
      <div>
        <div class="community" @click="changeShow">社区轮播</div>
        <div class="circle" @click="changeShow">圈子轮播</div>
        <div class="questions" @click="changeShow">问答轮播</div>
      </div>
    </div>
    
    <PictureParticulars v-show="!showEidt" @showFn="changeShow"></PictureParticulars>
  </div>
</template>

<script>
import PictureParticulars from "@/components/PictureParticulars.vue";

export default {
  name: 'manngePicture',
  data() {
    return {
      showEidt: true
    }
  },
  components: {
    PictureParticulars
  },
  methods: {
    changeShow() {
      this.showEidt=!this.showEidt
    }
  }
}
</script>

<style lang="less" scoped>
  .manngePicture{
    width: 1146px;
    height: 638px;
    margin: 10px;
    background: #fff;

    .title {
      font-size: 28px;
      font-weight: 500;
      padding: 50px 0;
    }
    .community,.circle,.questions {
      display: inline-block;
      width: 300px;
      height: 200px;
      background: lavender;
      margin: 40px 10px;
      line-height: 200px;
      font-size: 28px;
      font-weight: 600;
      color: #000;
      cursor: pointer;
    }
    .community:hover,.circle:hover,.questions:hover {
      opacity: .8;
      color: #555;
    }
    .community {
      background: url(../assets/images/002.jpg) no-repeat;
      background-size: 100%;
    }
    .circle {
      background: url(../assets/images/003.jpg) no-repeat;
      background-size: 100%;
    }
    .questions {
      background: url(../assets/images/004.jpg) no-repeat;
      background-size: 100%;
    }
  }
</style>