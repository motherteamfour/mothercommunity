<template>
  <div class="messageManage">
    <div v-show="showEdit">
      <div v-show="showEdit" class="messageManage-search">
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
          style="width: 80%; margin:0 auto;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="120"></el-table-column>
          <el-table-column prop="number" label="序号" width="120"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="state" label="状态" show-overflow-tooltip></el-table-column>
          <el-table-column label="头像" width="240">
            <template slot-scope="scope">
              <img class="user-picture" :src="scope.row.picture" alt="头像" />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :page-size="6"
          :total="18"
        ></el-pagination>
        <div style="margin-left: 10%; text-align: left;">
          <el-button class="messageManage-content-btn" @click="toggleSelection()">取消选择</el-button>
          <el-button
            class="messageManage-content-btn messageManage-content-btn-edit"
            @click="changeShow"
          >编辑通知消息</el-button>
        </div>
      </div>
    </div>
    <EditSendMessage v-show="!showEdit" @showEditFn="changeShow"></EditSendMessage>
  </div>
</template>

<script>
import EditSendMessage from "@/components/EditSendMessage.vue";

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
      ],
      showEdit: true
    };
  },
  components: {
    EditSendMessage
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
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    changeShow() {
      this.showEdit = !this.showEdit;
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
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .paging {
    height: 40px;
    margin-top: 10px;
  }
  .messageManage-content-btn {
    background: #009688;
    color: #fff;
  }
  .messageManage-content-btn:hover {
    opacity: 0.8;
  }
  .messageManage-content-btn-edit {
    float: right;
    margin-right: 50px;
  }
}
</style>