<template>
  <div class="pictureParticulars">
    <div class="pictureParticulars-top-btn">
      <el-button>添加</el-button>
      <el-button @click="returnBack">返回</el-button>
    </div>

    <div class="pictureParticulars-table">
      <el-table class="tabel" :data="tableData" style="width: 100%;">
        <el-table-column prop="number" label="图片顺序" width="180" align="center"></el-table-column>
        <el-table-column prop="name" label="图片名字" width="180" align="center"></el-table-column>
        <el-table-column prop="article" label="链接文章标题" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button class="edit" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "pictureParticulars",
  data() {
    return {
      tableData: [
        {
          number: "1",
          name: "王小虎",
          article: "即基金"
        },{
          number: "1",
          name: "王小虎",
          article: "即基金"
        },{
          number: "1",
          name: "王小虎",
          article: "即基金"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    returnBack() {
      this.$emit('showFn')
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
      opacity: .8;
    }
  }
  .pictureParticulars-table {
    margin-top: 20px;
  }
}
  
  .edit {
    background: rgb(30,159,255);
    color: #fff;
  }
  .edit:hover {
    opacity: .8;
  }
</style>