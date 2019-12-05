<template>
  <div class="basicInformation">
    <p class="title">设置我的资料</p>
    <form class="basicInformation-form">
      <div class="basicInformation-form-item">
        <label class="basicInformation-form-item-label">我的角色</label>
        <div class="basicInformation-form-item-input">
          <el-input v-model="input" disabled></el-input>
        </div>
      </div>
      <div class="basicInformation-form-item">
        <label class="basicInformation-form-item-label">用户名</label>
        <div class="basicInformation-form-item-input">
          <el-input v-model="input1" disabled></el-input>
        </div>
      </div>
      <div class="basicInformation-form-item">
        <label class="basicInformation-form-item-label">昵称</label>
        <div class="basicInformation-form-item-input">
          <el-input v-model="input2"></el-input>
        </div>
      </div>
      <div class="basicInformation-form-item basicInformation-form-item-picture">
        <label class="basicInformation-form-item-label">头像</label>
        <div class="basicInformation-form-item-picture-select">
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
      <div class="basicInformation-form-item">
        <label class="basicInformation-form-item-label">手机</label>
        <div class="basicInformation-form-item-input">
          <el-input v-model="input4"></el-input>
        </div>
      </div>
      <div class="basicInformation-form-item basicInformation-form-item-btn">
          <el-button class="form-affirm" type="button" @click="submitUpload">确认修改</el-button>
          <el-button class="form-reset" type="button" @click="rewirte">重新填写</el-button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
   data() {
    return {
      input: '',
      input1: '',
      input2: '',
      input4: '',
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: []
    }
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    imgUrlBase: state => state.imgUrl
    
  }),
  methods:{
    submitUpload() {
        this.$refs.upload.submit();
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
      form.append("header ", file);
      // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action

      form.append("adminNickName ", this.input2);

      form.append("adminPhone ", this.input4);

      form.append("adminId ", 1);
      // 请求方法
        this.axios
          .post("/admin/updateMyselfMessage", form, {
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
      
    },
    rewirte() {
      this.axios
      .get(
        "/admin/findMyselfMessage?adminId=1")
      .then(res => {
        console.log(res.data)
        if(res.data.code==200) {
          if(res.data.data.isSuper==0) {
            this.input = '管理员'
          }else if(res.data.data.isSuper==1) {
            this.input = '超级管理员'
          }
          this.input1 = res.data.data.adminName;
          this.input2 = res.data.data.adminNickName;
          /* this.dialogImageUrl = "http://172.16.6.48:8081/" + res.data.data.adminImgUrl; */
          this.input4 = res.data.data.adminPhone;
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  },
  mounted() {
    /* const userId = sessionStorage.getItem("userId") */
    this.axios
      .get(
        "/admin/findMyselfMessage?adminId=1")
      .then(res => {
        console.log(res.data)
        if(res.data.code==200) {
          if(res.data.data.isSuper==0) {
            this.input = '管理员'
          }else if(res.data.data.isSuper==1) {
            this.input = '超级管理员'
          }
          this.input1 = res.data.data.adminName;
          this.input2 = res.data.data.adminNickName;
          /* this.dialogImageUrl = "http://172.16.6.45:8989/" + res.data.data.adminImgUrl; */
          this.input4 = res.data.data.adminPhone;
          if(res.data.data.adminImgUrl) {
            const pictrueUrl = {
              url: this.imgUrlBase+res.data.data.adminImgUrl
            };
            this.fileList.push(pictrueUrl);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style lang="less" scoped>
.basicInformation {
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
  .basicInformation-form {
    width: 100%;
    margin: 20px 0 0 20px;
    .basicInformation-form-item {
      height: 45px;
      line-height: 45px;
      margin: 10px 0;
      text-align: left;
      .basicInformation-form-item-label {
        float: left;
        width: 110px;
        text-align: right;
        margin-right: 10px;
        color: #666;
        font-weight: 400;
        font-size: 14px;
      }
      .basicInformation-form-item-input {
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
    .basicInformation-form-item-btn {
      margin-left: 50px;
    }
    .basicInformation-form-item-picture {
      height: 200px;

      .basicInformation-form-item-picture-select {
        text-align: left;
      }
    }
  }
}
</style>