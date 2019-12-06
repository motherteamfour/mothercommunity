<template>
  <div class="post">
    <nav>
      <div class="back" @click="back">
        <i class="fa fa-angle-left"></i>
      </div>
      <span>发帖</span>
      <button class="confirm" @click="postImg">发布</button>
    </nav>
    <form>
      <div class="input-box">
        <div class="title-wrap">
          <input type="text" class="title" placeholder="标题" v-model="title" />
        </div>
        <div class="line"></div>
        <div class="content-wrap">
          <textarea class="text-content" placeholder="写点内容" v-model="content"></textarea>
          <div class="post-pic">
            <van-uploader v-model="fileList" multiple :preview-size="100" />
          </div>
        </div>
      </div>
    </form>
    <div class="select-circle" @click="getCircle">
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
              v-for="(item, index) in followedCircle"
              :key="index"
              @click="selected(item.circleId)"
            >
              <div class="img-wrap">
                <img :src="'http://172.17.4.107:8989' + item.circles.circleUrl" alt />
              </div>
              <p>{{item.circles.circleName}}</p>
            </li>
          </ul>
        </div>
        <div class="select-all">
          <div class="wrap">
            <h3>全部圈子</h3>
          </div>
          <ul>
            <li v-for="(item, index) in allCircle" :key="index" @click="selected(item.circleId)">
              <div>
                <img :src="'http://172.17.4.107:8989' + item.circleUrl" alt />
              </div>
              <p>{{item.circleName}}</p>
            </li>
          </ul>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { Uploader } from "vant";
import { ImagePreview } from "vant";
import { ActionSheet } from "vant";


export default {
  name: "Post",
  data() {
    return {
      followedCircle: [],
      allCircle: [],
      fileList: [],
      circleShow: false,
      groupName: "请选择圈子",
      groupid: -1,
      title: "",
      content: "",
      userId: 0
    };
  },
  components: {
    [ActionSheet.name]: ActionSheet,
    [ImagePreview.name]: ImagePreview,
    [Uploader.name]: Uploader
  },
  created() {
    this.userId = sessionStorage.getItem("userId");
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    selected(i) {
      this.circleShow = !this.circleShow;
      this.groupName = this.allCircle[i - 1].circleName;
      this.groupid = i;
    },
    getCircle() {
      this.circleShow = !this.circleShow;
      this.axios.get(`/userCircle/list?userId=${this.userId}`).then(res => {
        if (res.data.code == 200) {
          this.followedCircle = res.data.data;
        }
      });
      this.axios.get("/circle/list").then(res => {
        if (res.data.code == 200) {
          this.allCircle = res.data.data;
        }
      });
    },
    postImg() {
      let fd = new FormData();
      this.fileList.forEach((item, index) => {
        fd.append("files" + index, item.file);
      });
      this.axios.post("/file/insert", fd).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.axios
            .post("/post/addPost", {
              circleId: this.groupid,
              postContent: this.content,
              postImgs: res.data.data,
              postTitle: this.title,
              userId: this.userId
            })
            .then(res => {
              console.log(res.data);
              this.$router.replace('/article/' + res.data.data);
            });
        } else {
           this.$router.replace('/post/fromhome');
        }
      });
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
  .fa-angle-left {
    font-size: 1rem;
  }
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
    margin-left: 20px;
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
      padding: 0 100px;
      &:active {
        background: rgb(248, 248, 248);
      }
      div {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: lightseagreen;
        margin-right: 120px;
        img {
          width: 100%;
        }
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