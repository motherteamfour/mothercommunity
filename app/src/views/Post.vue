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
          <input type="text" class="title" placeholder="标题" />
        </div>
        <div class="line"></div>
        <div class="content-wrap">
          <textarea class="text-content" placeholder="写点内容"></textarea>
          <div class="post-pic">
            <van-uploader v-model="fileList" multiple :preview-size="100" />
          </div>
        </div>
      </div>
    </form>
    <div class="select-circle" @click="circleShow = !circleShow">
      <p class="left">
        <i class="fa fa-globe fa-2x" aria-hidden="true"></i>
        {{groupName}}
      </p>
      <p class="right">
        <span>帮你找到更多的小伙伴</span>
        <i class="fa fa-angle-right fa-2x" aria-hidden="true"></i>
      </p>
    </div>
    <van-action-sheet v-model="circleShow" title="选择圈子">
      <div class="option-wrap">
        <div class="select-followed">
          <h3>我关注的圈子</h3>
          <ul>
            <li
              v-for="(item, index) in circleOptions"
              :key="index"
              @click="selected"
              :classid="item.classid"
            >
              <div>
                <img src alt />
              </div>
              <p>{{item.name}}</p>
            </li>
          </ul>
        </div>
        <div class="select-all">
          <div class="wrap">
            <h3>全部圈子</h3>
          </div>
          <ul>
            <li v-for="(item, index) in circleOptions" :key="index" @click="selected">
              <div>
                <img src alt />
              </div>
              <p>{{item.name}}</p>
            </li>
          </ul>
        </div>
      </div>
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
      circleOptions: [
        {
          url: "",
          classid: 1,
          name: "怀孕圈"
        },
        {
          url: "",
          classid: 2,
          name: "夫妻感情"
        },
        {
          url: "",
          classid: 3,
          name: "育儿圈"
        },
        {
          url: "",
          classid: 4,
          name: "育儿圈"
        },
        {
          url: "",
          classid: 5,
          name: "育儿圈"
        },
        {
          url: "",
          classid: 6,
          name: "育儿圈"
        },
        {
          url: "",
          classid: 7,
          name: "育儿圈"
        }
      ],
      fileList: [],
      circleShow: false,
      groupName: "请选择圈子",
      classid: 0
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
    },
    selected(e) {
      this.circleShow = !this.circleShow;
      this.groupName = e.target.children[1].innerText;
      this.classid = e.target.getAttribute("classid");
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
    width: 110px;
    height: 50px;
    border: none;
    border-radius: 40px;
    font-size: 30px;
    background: #ffe469;
    color: #fff;
    outline: none;
    margin-right: 10px;
    box-shadow: 0 0 15px #ffe469;
    &:active {
      background: #e7d37a;
    }
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
        font-size: 32px;
        font-weight: 600;
        box-sizing: border-box;
        padding: 0 10px;
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
        box-sizing: border-box;
        padding: 0 10px;
        width: 100%;
        height: 400px;
        resize: none;
        border: none;
        outline: none;
        font-size: 28px;
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

.option-wrap {
  background: rgb(248, 248, 248);
}
.select-followed,
.select-all {
  width: 100%;
  height: 100%;
  background: #fff;

  h3 {
    font-size: 30px;
    font-weight: 500;
    margin: 20px 20px;
  }
  ul {
    box-sizing: border-box;
    width: 100%;
    padding: 0 20px;
    li {
      width: 100%;
      height: 100px;
      box-sizing: border-box;
      padding: 0 20px;
      margin: 10px 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 28px;
      border: 1px solid #ddd;
      border-radius: 20px;
      &:active {
        background: rgb(248, 248, 248);
      }
      div {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: lightseagreen;
        margin-right: 100px;
      }
    }
  }
}

.select-all {
  margin-top: 20px;
  .wrap {
    overflow: hidden;
    h3 {
      margin-bottom: 10px;
    }
  }
}
</style>