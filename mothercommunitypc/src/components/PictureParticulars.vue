<template>
  <div class="pictureParticulars" v-loading.fullscreen.lock="fullscreenLoading">
    <div v-show="showAdd">
      <div class="pictureParticulars-top-btn">
        <el-button @click="addBanner">添加</el-button>
        <el-button @click="returnBack">返回</el-button>
      </div>

      <div class="pictureParticulars-table">
        <el-table class="tabel" :data="bannerLists" style="width: 100%;">
          <el-table-column type="index" label="图片顺序" width="180" align="center"></el-table-column>
          <el-table-column prop="bannerName" label="图片名字" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="360">
            <template slot-scope="scope">
              <el-button class="edit" size="mini" @click="handleEdit(scope.row.bannerId)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.bannerId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <AddAndEdit
      v-show="!showAdd"
      @sonRefresh="refersh"
      @showAddFn="changeShow"
      :haveArticle="haveArticle"
      :clickType="clickType"
      :bannerName="bannerName"
      :imgUrl="imgUrl"
      :articleTitle="articleTitle"
      :isAdd="isAdd"
      :showAdd="showAdd"
      :bannerId="bannerId"
      :articleId="articleId"
    ></AddAndEdit>
  </div>
</template>

<script>
import AddAndEdit from "@/components/AddAndEdit.vue";
import { mapState } from 'vuex';

export default {
  name: "pictureParticulars",
  props: {
    clickType: Number,
    bannerLists: Array
  },
  data() {
    return {
      showAdd: true,
      haveArticle: true,
      isAdd: true,
      bannerName: "",
      imgUrl: "",
      articleTitle: "",
      articleId: 0,
      bannerId: 0,
      fullscreenLoading: false
    };
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    imgUrlBase: state => state.imgUrl
    
  }),
  components: {
    AddAndEdit
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
    handleEdit(id) {
      console.log(id);
      this.fullscreenLoading = true;
      this.axios
        .get(
          `/banner/list/findByBannerId?bannerId=${id}&bannerType=${this.clickType}`
        )
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            
            this.bannerId = res.data.data.bannerId;
            this.bannerName = res.data.data.bannerName;
            this.imgUrl = res.data.data.imgUrl ? this.imgUrlBase + res.data.data.imgUrl: "";
            
            if (res.data.data.post) {
              console.log('主页id存在')
              this.articleTitle = res.data.data.post.postTitle;
              this.articleId = res.data.data.post.postId;
            }else if (res.data.data.question) {
              console.log('问答id存在')
              this.articleTitle = res.data.data.question.questionTitle;
              this.articleId = res.data.data.question.questionId;
            }
            
            this.isAdd = false;
            this.haveArticle = this.clickType == 0? false:true;
            this.fullscreenLoading = false;
            this.changeShow();
          }
          this.fullscreenLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.fullscreenLoading = false;
          this.defeated("服务器出错，请稍后重试")
        });
    },
    handleDelete(id) {
      console.log(id);
      this.fullscreenLoading = true;
      this.axios({
        url: "/banner/delBanner",
        method: "post",
        data: `bannerId=${id}`,
        header: {
          "Content-Type": "application/X-WWW-form-urlencoded"
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.fullscreenLoading = false;
            this.refersh();
          }else {
            this.fullscreenLoading = false;
            this.defeated("服务器出错，请稍后重试");
          }
        })
        .catch(err => {
          console.log(err);
          this.fullscreenLoading = false;
          this.defeated("服务器出错，请稍后重试");
        });
    },
    refersh() {
      this.$emit("getBannerFn", this.clickType);
    },
    returnBack() {
      this.$emit("showFn");
    },
    changeShow() {
      this.isAdd=this.isAdd ? true:false 
      this.showAdd = !this.showAdd;
    },
    addBanner() {
      this.isAdd = true;
      this.bannerName = "";
      this.imgUrl = "";
      this.articleTitle = "";
      this.articleId = 0;
      if (this.clickType == 0) {
        this.haveArticle = false;
      } else {
        this.haveArticle = true;
      }
      this.changeShow();
    }
  }
};
</script>

<style lang="less" scoped>
.pictureParticulars {
  padding-top: 40px;

  .pictureParticulars-top-btn {
    text-align: left;
    button {
      background: #009688;
      color: #fff;
      margin-left: 50px;
    }
    button:hover {
      opacity: 0.8;
    }
  }
  .pictureParticulars-table {
    margin-top: 20px;
  }
}

.edit {
  background: rgb(30, 159, 255);
  color: #fff;
}
.edit:hover {
  opacity: 0.8;
}
</style>