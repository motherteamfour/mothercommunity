<template>
  <div class="manngePicture" v-loading.fullscreen.lock="fullscreenLoading">
    <div v-show="showEidt">
      <p class="title">点击所需板块进行设置</p>
      <div>
        <div class="community" @click="homeSet">社区轮播</div>
        <div class="circle" @click="circleSet">圈子轮播</div>
        <div class="questions" @click="questionSet">问答轮播</div>
      </div>
    </div>

    <PictureParticulars
      v-show="!showEidt"
      @getBannerFn="getBanner"
      @showFn="changeShow"
      :clickType="clickType"
      :bannerLists="bannerLists"
    ></PictureParticulars>
  </div>
</template>

<script>
import PictureParticulars from "@/components/PictureParticulars.vue";

export default {
  name: "manngePicture",
  data() {
    return {
      showEidt: true,
      clickType: -1,
      bannerLists: [],
      fullscreenLoading: false
    };
  },
  components: {
    PictureParticulars
  },
  methods: {
    changeShow() {
      this.showEidt = !this.showEidt;
    },
    success(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "success"
      });
    },
    defeated(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "error"
      });
    },
    circleSet() {
      this.fullscreenLoading = true;
      this.clickType = 0;
      this.axios
        .get("/banner/list?bannerType=" + this.clickType)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.fullscreenLoading = false;
            this.bannerLists = res.data.data;
          }else {
            this.fullscreenLoading = false;
            this.defeated('服务器出错，请稍后重试');
          }
        })
        .catch(error => {
          console.log(error);
          this.fullscreenLoading = false;
          this.defeated('服务器出错，请稍后重试');
        });
      this.changeShow();
    },
    homeSet() {
      this.fullscreenLoading = true;
      this.clickType = 1;
      this.axios
        .get("/banner/list?bannerType=" + this.clickType)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.fullscreenLoading = false;
            this.bannerLists = res.data.data;
          }else {
            this.fullscreenLoading = false;
            this.defeated('服务器出错，请稍后重试');
          }
        })
        .catch(error => {
          console.log(error);
          this.fullscreenLoading = false;
          this.defeated('服务器出错，请稍后重试');
        });
      this.changeShow();
    },
    questionSet() {
      this.fullscreenLoading = true;
      this.clickType = 2;
      this.axios
        .get("/banner/list?bannerType=" + this.clickType)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.fullscreenLoading = false;
            this.bannerLists = res.data.data;
          }else {
            this.fullscreenLoading = false;
            this.defeated('服务器出错，请稍后重试');
          }
        })
        .catch(error => {
          console.log(error);
          this.fullscreenLoading = false;
          this.defeated('服务器出错，请稍后重试');
        });
      this.changeShow();
    },
    getBanner(i) {
      if (i == 0) {
        this.circleSetSon(i);
      } else if (i == 1) {
        this.homeSetSon(i);
      } else if (i == 2) {
        this.questionSetSon(i);
      }
    },
    circleSetSon(i) {
      this.fullscreenLoading = true;
      this.axios
        .get("/banner/list?bannerType=" + i)
        .then((res) => {
          console.log(res.data)
          if(res.data.code==200) {
            this.fullscreenLoading = false;
            this.bannerLists = res.data.data
          }else {
            this.fullscreenLoading = false;
            this.defeated('服务器出错，请稍后重试');
          }
        })
        .catch((error) => {
          console.log(error);
          this.fullscreenLoading = false;
          this.defeated('服务器出错，请稍后重试');
        });
    },
    homeSetSon(i) {
      this.fullscreenLoading = true;
      this.axios
        .get("/banner/list?bannerType=" + i)
        .then((res) => {
          console.log(res.data)
          if(res.data.code==200) {
            this.fullscreenLoading = false;
            this.bannerLists = res.data.data
          }else {
            this.fullscreenLoading = false;
            this.defeated('服务器出错，请稍后重试');
          }
        })
        .catch((error) => {
          console.log(error);
          this.fullscreenLoading = false;
          this.defeated('服务器出错，请稍后重试');
        });
    },
    questionSetSon(i) {
      this.fullscreenLoading = true;
      this.axios
        .get("/banner/list?bannerType=" + i)
        .then((res) => {
          console.log(res.data)
          if(res.data.code==200) {
            this.fullscreenLoading = false;
            this.bannerLists = res.data.data
          }else {
            this.fullscreenLoading = false;
            this.defeated('服务器出错，请稍后重试');
          }
        })
        .catch((error) => {
          console.log(error);
          this.fullscreenLoading = false;
          this.defeated('服务器出错，请稍后重试');
        });
    }
  }
};
</script>

<style lang="less" scoped>
.manngePicture {
  width: 1146px;
  height: 638px;
  margin: 10px;
  background: #fff;

  .title {
    font-size: 28px;
    font-weight: 500;
    padding: 50px 0;
  }
  .community,
  .circle,
  .questions {
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
  .community:hover,
  .circle:hover,
  .questions:hover {
    opacity: 0.8;
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