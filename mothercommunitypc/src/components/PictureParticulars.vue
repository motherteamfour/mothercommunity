<template>
  <div class="pictureParticulars">
    <div v-show='showAdd'>
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
              <el-button
                class="edit"
                size="mini"
                @click="handleEdit(scope.row.bannerId)"
              >编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <AddAndEdit v-show='!showAdd' @showAddFn="changeShow" :haveArticle="haveArticle" :clickType="clickType"></AddAndEdit>
  </div>
</template>

<script>
import AddAndEdit from "@/components/AddAndEdit.vue";

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
      bannerName: '',
      imgUrl: '',
      articleTitle: ''
    };
  },
  components: {
    AddAndEdit
  },
  methods: {
    handleEdit(id) {
      console.log(id);
      this.axios
        .get(`/banner/list/findByBannerId?bannerId=${id}&bannerType=${this.clickType}`)
        .then((res) => {
          console.log(res.data);
          /* if(res.data.code==200) {
            this.input = res.data.data.bannerName
            this.input1 = res.data.data.imgUrl
          } */
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    returnBack() {
      this.$emit("showFn");
    },
    changeShow() {
      this.showAdd = !this.showAdd
    },
    addBanner() {
      if(this.clickType == 0) {
        this.haveArticle=false
      }else {
        this.haveArticle=true
      }
      this.changeShow()
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