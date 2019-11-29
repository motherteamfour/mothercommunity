<template>
  <div class="post">
    <nav>
      <div class="back" @click="back">
        <i class="fa fa-angle-left fa-2x"></i>
      </div>
      <span>发帖</span>
      <button class="confirm">发布</button>
    </nav>
    <form>
      <div class="input-box">
        <div class="title-wrap">
          <input type="text" class="title" placeholder="来个标题" />
        </div>
        <div class="line"></div>
        <div class="content-wrap">
          <textarea class="text-content" placeholder="写点内容"></textarea>
          <div class="post-pic">
            <van-uploader v-model="fileList" multiple :preview-size="80" />
          </div>
        </div>
      </div>
    </form>
    <div class="select-circle" @click="show = !show">
      <p class="left">
        <i class="fa fa-globe fa-2x" aria-hidden="true"></i>
        选择圈子
      </p>
      <p class="right">
        <span>帮你找到更多的小伙伴</span>
        <i class="fa fa-angle-right fa-2x" aria-hidden="true"></i>
      </p>
    </div>
    <van-action-sheet v-model="show" title="标题">
      <p>内容</p>
    </van-action-sheet>
  </div>
</template>

<script>
import { Uploader, Button } from "vant";
import { ImagePreview } from "vant";
import { ActionSheet } from "vant";

export default {
  name: "Post",
  data() {
    return {
      fileList: [],
      show: false
    };
  },
  components: {
    [ActionSheet.name]: ActionSheet,
    [ImagePreview.name]: ImagePreview,
    [Uploader.name]: Uploader,
    [Button.name]: Button
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>

<style lang="less" scoped>
.post {
  background: rgb(248, 248, 248);
  height: 100vh;
}
nav {
  padding-top: 40px;
  width: 100%;
  height: 100px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 5px 5px #eee;
  span {
    font-size: 36px;
    color: #000;
  }
  .back {
    width: 100px;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    margin-left: 10px;
    color: #000;
  }
  .confirm {
    width: 120px;
    height: 60px;
    border: none;
    border-radius: 40px;
    font-size: 32px;
    background: #ffe469;
    color: #fff;
    outline: none;
    margin-right: 10px;
    box-shadow: 0 0 10px #ccc;
  }
}

form {
  .input-box {
    width: calc(100% - 40px);
    background: #fff;
    box-shadow: 0 0 15px #ddd;
    border-radius: 20px;
    margin: 20px auto;
    .title-wrap {
      box-sizing: border-box;
      width: 100%;
      height: 80px;
      padding: 10px 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .title {
        height: 60px;
        width: 100%;
        font-size: 30px;
        border: none;
        outline: none;
        &::-webkit-input-placeholder {
          font-size: 30px;
          color: rgb(100, 100, 100);
        }
      }
    }
    .line {
      margin: 0 auto;
      width: calc(100% - 40px);
      border-bottom: 1px solid #eee;
    }
    .content-wrap {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 20px;
      .text-content {
        width: 100%;
        height: 400px;
        resize: none;
        border: none;
        outline: none;
        font-size: 30px;
        &::-webkit-input-placeholder {
          font-size: 30px;
          color: rgb(100, 100, 100);
        }
      }
    }
  }
}

.select-circle {
  box-sizing: border-box;
  width: calc(100% - 40px);
  margin: 0 auto;
  height: 80px;
  border-radius: 20px;
  background: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 15px #ddd;

  .left {
    font-size: 28px;
    display: flex;
    align-items: center;
    i {
      color: rgb(255, 85, 85);
      margin-right: 10px;
    }
  }
  .right {
    font-size: 24px;
    display: flex;
    align-items: center;
    color: rgb(170, 170, 170);
    i {
      margin-left: 10px;
      margin-bottom: 1px;
    }
  }
}

.van-uploader__input {
  width: 80px;
  height: 80px;
}
</style>