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
        <el-button class="messageManage-search-btn" icon="el-icon-search" @click="search">搜索</el-button>
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
          <el-table-column prop="userName" label="姓名" width="120"></el-table-column>
          <el-table-column prop="state.stateMessage" label="状态" width="120"></el-table-column>
          <el-table-column prop="userPhone" label="电话号码" show-overflow-tooltip></el-table-column>
          <el-table-column label="头像" width="240">
            <template slot-scope="scope">
              <img class="user-picture" :src="scope.row.userImgUrl" alt="头像" />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :page-size="sizePage"
          :total="userTotal"
        ></el-pagination>
        <div style="margin-left: 10%; text-align: left;">
          <el-button class="messageManage-content-btn" @click="toggleSelection()">取消选择</el-button>
          <el-button
            class="messageManage-content-btn messageManage-content-btn-edit"
            @click="getReceiveIds"
          >编辑通知消息</el-button>
        </div>
      </div>
    </div>
    <EditSendMessage
      v-show="!showEdit"
      @showEditFn="changeShow"
      :receiveIds="receiveIds"
      @emptyUserIds="emptyIds"
    ></EditSendMessage>
  </div>
</template>

<script>
import EditSendMessage from "@/components/EditSendMessage.vue";

export default {
  data() {
    return {
      options: [
        {
          value: 1,
          label: "所有用户"
        },
        {
          value: 2,
          label: "备孕中"
        },
        {
          value: 3,
          label: "已怀孕"
        },
        {
          value: 4,
          label: "已生子"
        }
      ],
      value: "",
      input: "",
      tableData: [],
      showEdit: true,
      userTotal: 0,
      sizePage: 6,
      multipleSelection: [],
      receiveIds: []
    };
  },
  components: {
    EditSendMessage
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
      console.log(this.multipleSelection);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      console.log(this.sizePage);
      if(this.value==''&&this.input=='') {
        this.getAllUsers(val, this.sizePage);
      }else {
        this.searchPage(val, this.sizePage);
      }
    },
    changeShow() {
      this.showEdit = !this.showEdit;
    },
    getAllUsers(size, sizePage) {
      this.axios
        .get("/admin/userList?size=" + size + "&sizePage=" + sizePage)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getReceiveIds() {
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach(item => {
          this.receiveIds.push(item.userId);
        });
        console.log(this.receiveIds);
        this.changeShow();
      }else {
        this.defeated('请选择要发送的用户')
      }
    },
    emptyIds() {
      this.receiveIds = [];
      this.toggleSelection();
    },
    search() {
      this.axios({
          url: "/admin/findUserByConditions",
          method: "post",
          data: `size=1&sizePage=6&userName=${this.input}&userState=${this.value}`,
          header: {
            "Content-Type": "application/X-WWW-form-urlencoded"
          }
        })
        .then((res) => {
          console.log(res.data);
          if(res.data.code==200) {
            this.tableData = res.data.data.list;
            this.userTotal = res.data.data.total;
          }else {
            this.tableData = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchPage(size, sizePage) {
      this.axios({
          url: "/admin/findUserByConditions",
          method: "post",
          data: `size=${size}&sizePage=${sizePage}&userName=${this.input}&userState=${this.value}`,
          header: {
            "Content-Type": "application/X-WWW-form-urlencoded"
          }
        })
        .then((res) => {
          console.log(res.data);
          if(res.data.code==200) {
            this.tableData = res.data.data.list;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.axios
      .get("/admin/userList?size=1&sizePage=6")
      .then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.userTotal = res.data.data.total;
          this.tableData = res.data.data.list;
        }
      })
      .catch(error => {
        console.log(error);
      });
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