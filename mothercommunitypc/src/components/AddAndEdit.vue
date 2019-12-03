<template>
  <div class="addAndEdit">
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
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-button class="form-upload" type="button">查看</el-button>
      </div>
      <div class="addAndEdit-form-item addAndEdit-form-item-btn">
        <el-button class="form-affirm" type="button" @click="uploadSectionFile">确认</el-button>
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
    clickType: Number
  },
  data() {
    return {
      input: "",
      input1: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      bannerId: 1,
      bannerType: 2,
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: []
    };
  },
  methods: {
    turnback() {
      this.$emit("showAddFn");
    },
    getBanner() {
      this.axios
        .get(
          `/banner/list/findByBannerId?bannerId=${this.bannerId}&bannerType=${this.bannerType}`
        )
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.input = res.data.data.bannerName;
            this.input1 = res.data.data.imgUrl;
          }
        })
        .catch(error => {
          console.log(error);
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
    uploadSectionFile(params) {
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
      form.append("bannerName", "圈子banner2");

      form.append("bannerType", 0);

      form.append("postId", 1);
      // 请求方法
      if (this.clickType == 0) {
        this.axios
          .post("/banner/addUserBanner", form, {
            header: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }else if(this.clickType == 1) {
        this.axios
          .post("/banner/addUserBanner", form, {
            header: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }else if(this.clickType == 2) {
        this.axios
        .post("/banner/addUserBanner", form, {
          header: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
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