<template>
  <div>
    <div class="tab-one">
      <table v-if="show">
        <tr>
          <td>姓名：</td>
          <td>
            <input
              type="text"
              placeholder="输入创建的账号"
              class="userId mod"
              v-model="inputName"
            />
          </td>
        </tr>
        <tr>
          <td>密码：</td>
          <td>
            <input
              type="text"
              placeholder="请输入密码"
              class="password mod"
              v-model="inputPassword"
              @blur="userpass(inputPassword)"
            />
          </td>
        </tr>
        <tr>
          <td>账号：</td>
          <td>
            <input type="text" placeholder="请输入姓名" class="name mod" v-model="inputUsername" @blur="username(inputName)"/>
          </td>
        </tr>
        <tr>
          <td>联系方式：</td>
          <td>
            <input
              type="text"
              placeholder="请输入联系电话"
              class="tel mod"
              v-model="inputTel"
              @blur="tel(inputTel)"
            />
          </td>
        </tr>
        <tr>
          <td>性别：</td>
          <td>
            <select class="mod sel" v-model="sex">
              <option value="0" selected>男</option>
              <option value="1">女</option>
            </select>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-button
              type="button"
              class="add"
              @click="addAdmin"
              :disabled="inputUsername==''||inputPassword==''||inputName==''||inputTel==''"
            >添加</el-button>
            <el-button type="button" class="exit" @click="exit">清空</el-button>
            <el-button type="button" class="exit" @click="exit2">关闭</el-button>
          </td>
        </tr>
      </table>
    </div>
    <div class="tab-two">
      <div class="top">
        <input type="text" class="user" v-model="userSearch" placeholder="请输入需要搜索的用户名" />
        <input type="text" class="username" v-model="usersName" placeholder="请输入需要搜索的姓名" />
        <button type="button" class="seek-btn" @click="search">搜索</button>
        <button type="button" class="seek-btn" @click="adds">添加</button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 98%; margin:0 auto;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="120"></el-table-column>
        <el-table-column type="index" :index="indexMethod" label="序号" width="120"></el-table-column>
        <el-table-column prop="adminNickName" label="姓名" width="120"></el-table-column>
        <el-table-column prop="adminName" label="用户名" width="120"></el-table-column>
        <el-table-column prop="adminPhone" label="联系方式" width="120"></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              class="btn"
              @click="delBtn(scope.row.adminId)"
              :disabled="scope.row.isSuper==1"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="paging"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        background
        layout="prev, pager, next"
        :page-size="sizePage"
        :total="userTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "addUsers",
  data() {
    return {
      // 对添加账户添加初始值
      inputUsername: "",
      inputPassword: "",
      inputName: "",
      inputTel: "",
      sex: "",
      tableData: [],
      userTotal: 0,
      page: 1,
      sizePage: 6,
      userSearch: "",
      usersName: "",
      show: false
    };
  },
  created() {
    this.axios
      .get("/admin/listAdmin?size=1&sizePage=6")
      .then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.list;
          //分页
          this.userTotal = res.data.data.total;
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  mounted() {},
  methods: {
    handleSelectionChange(val) {
      this.selAll = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      //显示当前页，当前条数
      //均为空 文本框
      if (this.usersName == "" && this.userSearch == "") {
        this.getAllUsers(val, this.sizePage);
      } else {
        this.searchPage(val, this.sizePage);
      }
    },
    //搜索
    search() {
      this.axios({
        url: "/admin/findAdminByConditions",
        method: "post",
        data: `size=1&sizePage=6&adminName=${this.userSearch}&adminNickName=${this.usersName}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.userTotal = res.data.data.total;
          } else {
            this.tableData = [];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchPage(size, sizePage) {
      this.axios({
        url: "/admin/findAdminByConditions",
        method: "post",
        data: `size=${size}&sizePage=${sizePage}&adminName=${this.userSearch}&adminNickName=${this.usersName}`,
        header: {
          "Content-Type": "application/X-WWW-form-urlencoded"
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAllUsers(size, sizePage) {
      this.axios
        .get("/admin/listAdmin?size=" + size + "&sizePage=" + sizePage)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //清空效果
    exit: function() {
      (this.inputUsername = ""),
        (this.inputPassword = ""),
        (this.inputName = ""),
        (this.inputTel = "");
    },
    //添加管理员
    addAdmin() {
      this.$confirm("确认添加管理员？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios({
          url: "/admin/addAdmin",
          method: "post",
          //不能使用回车换行
          data: `adminName=${this.inputName}&adminNickName=${this.inputUsername}&adminPassword=${this.inputPassword}&adminPhone=${this.inputTel}&adminSex=${this.sex}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
          .then(() => {
            this.axios
              .get("/admin/listAdmin?size=1&sizePage=6")
              .then(res => {
                console.log(res.data.data);
                if (res.data.code == 200) {
                  this.tableData = res.data.data.list;
                }
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          })
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消恢复"
        });
      });
    },
    defeated(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "error"
      });
    },
    //正则判断
    username(message) {
      var pat = /^[a-zA-Z]{5,15}$/;
      if (!pat.test(message)) {
        this.defeated("请输入5-15位的字母");
      }
    },
    userpass(message) {
      var pat = /^[a-zA-Z0-9_]{5,15}$/;
      if (!pat.test(message)) {
        this.defeated("请输入5-15位的字母、数字和下划线");
      }
    },
    tel(message) {
      var pat = /^1[3|4|5|6|7|8|9]\d{9}/;
      if (!pat.test(message)) {
        this.defeated("电话号码格式不正确");
      }
    },
    // 删除
    delBtn(adminId) {
      this.$confirm("确认删除管理员？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(()=>{
        this.axios({
        url: "/admin/delAdmin",
        method: "post",
        data: `adminId=${adminId}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(() => {
          this.axios.get("/admin/listAdmin?size=1&sizePage=6").then(res => {
            console.log(res.data.data);
            this.tableData = res.data.data.list;
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(error => {
          console.log(error);
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
      
    },
    //序号的编写
    indexMethod(index) {
      return index + 1 + (this.page - 1) * this.sizePage;
    },
    //点击添加按钮，出现添加框
    adds() {
      this.show = true;
    },
    //点击取消，清空文本框
    exit2() {
      this.show = false;
      this.$options.methods.exit.bind(this)();
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/resize.less";
.tab-one {
  position: absolute;
  top: 25%;
  left: 5%;
  z-index: 2;

  margin-top: 30px;
  width: 100%;
  table {
    // float: left;
    width: 30%;
    margin: 0 auto;
    border: @tab-border;
    background: rgb(175, 175, 175);

    td {
      padding: 5px;
    }
  }
}
button {
  width: @btn-w;
  height: @btn-h;
  color: white;
  outline: none;
  border: none;
  border-radius: 2px;
}
button:hover {
  background: #009687d0;
}
.add,
.exit,
.compile,
.del {
  background: @bg-btn;
  margin: 5px;
}
.add,
.exit:hover {
  color: white;
}
.mod {
  width: 182px;
  height: 38px;
  background: #fff;
  padding: 0 0 0 10px;
}
.sel {
  width: 196px;
  height: 42px;
}
.seek-btn,
.del-btn,
.btn {
  background: @bg-btn;
  margin: 5px;
}
.btn:hover {
  background: #009687d0;
  color: white;
}
.userId,
.username,
.user {
  width: 182px;
  height: 38px;
  background: #fff;
  padding: 0 0 0 10px;
  margin: 10px;
}
.tab-two {
  width: 100%;
  table {
    width: 98%;
    border-collapse: collapse;
    margin: 0 auto;
  }
  tr,
  th,
  td {
    border: @tab-border;
    height: 28px;
  }
}
.caozuo {
  width: @two;
}
// .top{
//   text-align: right
// }
</style>

