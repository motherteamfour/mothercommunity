<template>
  <div class="addAndEdit" v-loading.fullscreen.lock="fullscreenLoading">
    <p class="title">添加与修改</p>
    <form class="addAndEdit-form">
      <div class="addAndEdit-form-item">
        <label class="addAndEdit-form-item-label">banner名字</label>
        <div class="addAndEdit-form-item-input">
          <el-input v-model="input"></el-input>
        </div>
      </div>
      <div class="addAndEdit-form-item addAndEdit-form-item-picture">
        <label class="addAndEdit-form-item-label">banner图片:</label>
        <div class="addAndEdit-form-item-picture-select">
          <el-upload
            class="image-upload-pic"
            ref="upload"
            action="fakeaction"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :http-request="uploadSectionFile"
            :file-list="fileList"
            :auto-upload="false"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>

          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
      </div>
      <div v-show="haveArticle" class="addAndEdit-form-item">
        <label class="addAndEdit-form-item-label">文章链接</label>
        <div class="addAndEdit-form-item-input">
          <el-select v-model="value" placeholder="请选择" @focus="getArticle">
            <el-option
              v-for="item in options"
              :key="item.postId"
              :label="item.postTitle||item.questionTitle"
              :value="item.postId||item.questionId"
            ></el-option>
          </el-select>
        </div>
        <el-button class="form-upload" type="text" @click="konwMore">查看</el-button>
      </div>
      <div class="addAndEdit-form-item addAndEdit-form-item-btn">
        <el-button class="form-affirm" type="button" @click="submitUpload">确认</el-button>
        <el-button class="form-reset" type="button" @click="getBanner">重置</el-button>
        <el-button class="form-cancel" type="button" @click="turnback">取消</el-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "addAndEdit",
  props: {
    haveArticle: Boolean,
    clickType: Number,
    bannerName: String,
    imgUrl: String,
    articleTitle: String,
    isAdd: Boolean,
    articleId: Number,
    showAdd: Boolean,
    bannerId: Number
  },
  data() {
    return {
      input: "",
      options: [],
      value: "",
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      fullscreenLoading: false
    };
  },
  watch: {
    showAdd() {
      if (!this.showAdd) {
        this.input = this.bannerName;
        this.value = this.articleTitle;
        if (this.imgUrl) {
          console.log("图片变了");
          const pictrueUrl = {
            url: this.imgUrl
          };
          this.fileList.push(pictrueUrl);
        }
      }
    },
    isAdd() {
      console.log(this.isAdd);
    }
  },
  methods: {
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
    turnback() {
      this.input = "";
      this.value = "";
      this.fileList = [];
      this.$emit("sonRefresh");
      this.$emit("showAddFn");
    },
    submitUpload() {
      this.$refs.upload.submit();
      this.input = "";
      this.value = "";
      this.fileList = [];
    },
    getBanner() {
      this.fullscreenLoading = true;
      this.axios
        .get(
          `/banner/list/findByBannerId?bannerId=${this.bannerId}&bannerType=${this.clickType}`
        )
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.input = res.data.data.bannerName;
            if (res.data.data.imgUrl) {
              console.log("图片变了");
              
              this.fileList[0].url="http://172.16.6.56:8081/" +res.data.data.imgUrl;
            }
            this.fullscreenLoading = false;
          }
        })
        .catch(error => {
          console.log(error);
          this.fullscreenLoading = false;
          this.defeated('服务器出错，请稍后重试')
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(response, file) {
      console.log(response, file);
    },
    addCircleBanner(form) {
      this.axios
        .post("/banner/addCircleBanner", form, {
          header: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res.data);
          this.fullscreenLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.fullscreenLoading = false;
          this.defeated('服务器出错，请稍后重试');
        });
    },
    addUserBanner(form) {
      this.axios
        .post("/banner/addUserBanner", form, {
          header: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res.data);
          this.fullscreenLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.fullscreenLoading = false;
          this.defeated('服务器出错，请稍后重试');
        });
    },
    addQuestionBanner(form) {
      this.axios
        .post("/banner/addQuestionBanner", form, {
          header: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res.data);
          this.fullscreenLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.fullscreenLoading = false;
          this.defeated('服务器出错，请稍后重试');
        });
    },
    updateCircleBanner(form) {
      this.axios
        .post("/banner/updateCircleBanner", form, {
          header: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res.data);
          this.fullscreenLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.fullscreenLoading = false;
          this.defeated('服务器出错，请稍后重试');
        });
    },
    updateUserBanner(form) {
      this.axios
        .post("/banner/updateUserBanner", form, {
          header: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res.data);
          this.fullscreenLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.fullscreenLoading = false;
          this.defeated('服务器出错，请稍后重试');
        });
    },
    updateQuestionBanner(form) {
      this.axios
        .post("/banner/updateQuestionBanner", form, {
          header: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res.data);
          this.fullscreenLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.fullscreenLoading = false;
          this.defeated('服务器出错，请稍后重试');
        });
    },
    uploadSectionFile(params) {
      this.fullscreenLoading = true;
      const file = params.file,
        fileType = file.type,
        isImage = fileType.indexOf("image") != -1,
        isLt1M = file.size / 1024 / 1024 < 1;
      // 这里常规检验，看项目需求而定
      if (!isImage) {
        this.$message.error("只能上传图片格式png、jpg、gif!");
        return;
      }
      if (!isLt1M) {
        this.$message.error("只能上传图片大小小于1M");
        return;
      }
      console.log(file);
      // 根据后台需求数据格式
      const form = new FormData();
      // 文件对象
      form.append("file", file);
      // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
      form.append("bannerName", this.input);

      // 请求方法
      if (this.isAdd) {
        form.append("bannerType", this.clickType);
        console.log("这是添加");
        if (this.clickType == 0) {
          console.log("这是圈子");
          this.addCircleBanner(form);
        } else if (this.clickType == 1) {
          console.log("这是主页");
          form.append("postId", this.value);
          this.addUserBanner(form);
        } else {
          console.log("这是问答");
          form.append("questionId", this.value);
          this.addQuestionBanner(form);
        }
      } else {
        console.log("这是编辑");
        form.append("bannerId", this.bannerId);
        if (this.clickType == 0) {
          this.updateCircleBanner(form);
        } else if (this.clickType == 1) {
          form.append("postId", this.articleId);
          this.updateUserBanner(form);
        } else if (this.clickType == 2) {
          console.log(this.articleId);
          form.append("questionId", this.articleId);
          this.updateQuestionBanner(form);
        }
      }
    },
    getArticle() {
      this.fullscreenLoading = true;
      if (this.clickType == 1) {
        console.log("这是主页");
        this.axios
          .get("/posterior/postmanagement/recommend?page=1&pagesize=100")
          .then(res => {
            console.log(res.data);
            if (res.data.code == 200) {
              this.options = res.data.data.list;
              this.fullscreenLoading = false;
            }
            this.fullscreenLoading = false;
          })
          .catch(err => {
            console.log(err);
            this.fullscreenLoading = false;
            this.defeated('服务器出错，请稍后重试');
          });
      } else if (this.clickType == 2) {
        console.log("这是问答");
        this.axios({
          url: "/question/hotQuestion",
          method: "post",
          data: `userId=4`,
          header: {
            "Content-Type": "application/X-WWW-form-urlencoded"
          }
        })
          .then(res => {
            console.log(res.data);
            if (res.data.code == 200) {
              this.options = res.data.data;
              this.fullscreenLoading = false;
            }
            this.fullscreenLoading = false;
          })
          .catch(err => {
            console.log(err);
            this.fullscreenLoading = false;
            this.defeated('服务器出错，请稍后重试');
          });
      }
    },
    open(t,c) {
      this.$alert(c, t, {
        confirmButtonText: '确定',
        callback: () => {
          this.$message({
            type: 'info',
            message: '好看吗'
          });
        }
      });
    },
    konwMore() {
      this.fullscreenLoading = true;
      var id;
      if(typeof(this.value)=='string'){
        id = this.articleId
      }else {
        id = this.value
      }
      if (this.clickType == 1) {
        this.axios
          .get("/post/getPost?postId=" + id + "&userId=1000")
          .then(res => {
            console.log(res.data);
            if(res.data.code==200) {
              this.open(res.data.data.postTitle,res.data.data.postContent);
              this.fullscreenLoading = false;
            }
            this.fullscreenLoading = false;
          })
          .catch(err => {
            console.log(err);
            this.fullscreenLoading = false;
            this.defeated('服务器出错，请稍后重试')
          });
      } else if (this.clickType == 2) {
        this.axios
          .get(
            "/question/questionDetail?questionId=" + id + "&userId=1000"
          )
          .then(res => {
            console.log(res.data);
            if(res.data.code==200) {
              this.open(res.data.data.questionTitle,res.data.data.questionContent);
              this.fullscreenLoading = false;
            }
            this.fullscreenLoading = false;
          })
          .catch(err => {
            console.log(err);
            this.fullscreenLoading = false;
            this.defeated('服务器出错，请稍后重试')
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.addAndEdit {
  width: 1146px;
  height: 638px;
  margin: 10px;
  background: #fff;
  .title {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgb(194, 194, 194);
    color: #333;
    text-align: left;
    text-indent: 1em;
  }
  .addAndEdit-form {
    width: 100%;
    margin: 20px 0 0 20px;
    .addAndEdit-form-item {
      height: 45px;
      line-height: 45px;
      margin: 10px 0;
      text-align: left;
      .addAndEdit-form-item-label {
        float: left;
        width: 110px;
        text-align: right;
        margin-right: 10px;
        color: #666;
        font-weight: 400;
        font-size: 14px;
      }
      .addAndEdit-form-item-input {
        float: left;
        width: 210px;
        text-align: left;
      }
      .form-upload {
        margin-left: 10px;
        padding: 12px 20px;
        color: #606266;
        border: 1px solid #dcdfe6;
      }
      .form-upload:hover,
      .form-reset:hover,
      .form-cancel:hover {
        border-color: #009688;
        background: #fff;
        color: #606266;
      }
      .form-affirm {
        background: #009688;
        color: #fff;
        margin-right: 20px;
      }
      .form-affirm:hover {
        opacity: 0.8;
      }
      .form-reset {
        margin-right: 20px;
      }
    }
    .addAndEdit-form-item-btn {
      margin-left: 50px;
    }
    .addAndEdit-form-item-picture {
      height: 200px;

      .addAndEdit-form-item-picture-select {
        text-align: left;
      }
    }
  }
}
</style>