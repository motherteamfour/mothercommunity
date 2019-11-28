<template>
  <div class="messageManage">
    <div class="messageManage-search">
      <el-select class="messageManage-search-select" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input class="messageManage-search-input" v-model="input" placeholder="请输入用户名字"></el-input>
      <el-button class="messageManage-search-btn" icon="el-icon-search">搜索</el-button>
    </div>

    <div class="messageManage-content">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="120"></el-table-column>
        <el-table-column prop="number" label="序号" width="120"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="state" label="状态" show-overflow-tooltip></el-table-column>
        <el-table-column label="头像" width="120">
          <template slot-scope="scope">
            <img class="user-picture" :src="scope.row.picture" alt="头像">
          </template>
        </el-table-column>
        
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "备孕中"
        },
        {
          value: "选项2",
          label: "已怀孕"
        },
        {
          value: "选项3",
          label: "已生子"
        }
      ],
      value: "",
      input: "",
      tableData: [
        {
          number: "1",
          name: "王小虎",
          state: "备孕中",
          picture: "/img/001.19fd437c.jpg"
        },
        {
          number: "1",
          name: "王小虎",
          state: "备孕中",
          picture: "/img/001.19fd437c.jpg"
        },
        {
          number: "1",
          name: "王小虎",
          state: "备孕中",
          picture: "/img/001.19fd437c.jpg"
        },
        {
          number: "1",
          name: "王小虎",
          state: "备孕中",
          picture: "/img/001.19fd437c.jpg"
        }
      ]
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang="less" scoped>
.messageManage {
  width: 1146px;
  height: 638px;
  margin: 10px;
  background: #fff;
  .messageManage-search {
    height: 100px;
    line-height: 100px;
    border-bottom: 1px solid #eee;
    text-align: left;
    .messageManage-search-select {
      margin-left: 60px;
    }
    .messageManage-search-input {
      width: 30%;
      display: inline-block;
    }
    .messageManage-search-btn {
      margin-left: 20px;
      background: #009688;
      color: #fff;
    }
    .messageManage-search-btn:hover {
      opacity: 0.8;
    }
  }
  .user-picture {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
</style>