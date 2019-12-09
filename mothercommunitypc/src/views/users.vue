<template>
  <div>
    <div class="top">
      <input type="text" class="username" v-model="userSearch" placeholder="请输入需要搜索的用户名" />
      <select class="conition" v-model="value">
        <option value="1">所有用户</option>
        <option value="2">备孕中</option>
        <option value="3">已怀孕</option>
        <option value="4">已出生</option>
      </select>
      <button type="button" class="seek-btn" @click="search">搜索</button>
      <button type="button" class="del-btn" @click="delAll">删除</button>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 98%; margin:0 auto;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="120"></el-table-column>
        <el-table-column type="index" :index="indexMethod"  label="序号" width="120"></el-table-column>
        <el-table-column prop="userName" label="用户名" width="120"></el-table-column>
        <el-table-column prop="userPhone" label="电话号码" width="120"></el-table-column>
        <el-table-column prop="state.stateMessage" label="备孕状态" width="120"></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button class="btn"  @click="delbtn(scope.row.userId)">删除</el-button>
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
  name: "users",
  data() {
    return {
      tableData: [],
      userIds:[],
      selAll:[],
      selectAll1:[],
      selectAll2:"",
      userSearch:"",
      value:"",
      userTotal: 0,
      page:1,
      sizePage: 6,
      
    };
  },
  created() {
    this.axios
      .get("/admin/userList?size=1&sizePage=6")
      .then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.list;
          this.userTotal = res.data.data.total;
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    isSelectAll: function() {
      return this.comsts.every(function(val) {
        return val.isSel;
      });
    }
  },
  mounted() { 
  },
  methods: {
    handleSelectionChange(val) {
      this.selAll = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      console.log(this.sizePage);
      if(this.value==''&&this.userSearch=='') {
        this.getAllUsers(val, this.sizePage);
      }else {
        this.searchPage(val, this.sizePage);
      }
    },
    //搜索
    search(){
      // var userIds = this.userIds.join
      console.log();
      // const params = new URLSearchParams()
      // params.append('userId',userId)
      this.axios({
        url:"/admin/findUserByConditions",
        method:"post",
        data: `size=1&sizePage=6&userName=${this.userSearch}&userState=${this.value}`,
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        },
      // data:params
        
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
      // this.axios.post("/admin/delUser", 
      //   {
      //     userId: userId
      //   })
      //   .then(res => {
      //     console.log(res.data,"1111");
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   })
      
    },
    searchPage(size, sizePage) {
      this.axios({
          url: "/admin/findUserByConditions",
          method: "post",
          data: `size=${size}&sizePage=${sizePage}&userName=${this.userSearch}&userState=${this.value}`,
          header: {
            "Content-Type": "application/X-WWW-form-urlencoded"
          }
        })
        .then((res) => {
          if(res.data.code==200) {
            this.tableData = res.data.data.list;
          }
        })
        .catch((err) => {
          console.log(err);
        });
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

    //用户数据删除
    delbtn(userId) {
      this.$confirm("确认删除该用户？","提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      })
      .then(()=>{
        this.$message({ 
        type: 'success',
        message: '删除成功!'
        })
        this.axios({
          url:"/admin/delUser",
          method:"post",
          data: `userId=${userId}`,
          headers:{
            "Content-Type":"application/x-www-form-urlencoded"
          },        
        })
        .then(()=>{
            this.axios
            .get("/admin/userList?size=1&sizePage=6")
            .then(res => {
                this.tableData = res.data.data.list;
            })
        })
        .catch(error=>{
          console.log(error)
        })
      })
      .catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消删除'
        });  
      })
      
    },
    //刪除多條數據
    delAll() {
      if(this.selAll.length>0){
        this.selAll.forEach(item=>{
          this.selectAll1.push(item.userId)
          
        });
        this.selectAll2 = this.selectAll1.join(",")
      } 
      this.$confirm("确认批量删除用户？","提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      })
      .then(()=>{
        this.$message({ 
        type: 'success',
        message: '删除成功!'
        })
        this.axios({
          url:"/admin/delUsers",
          method:"post",
          data:`ids=${this.selectAll2}`,
          headers:{
            "Content-Type":"application/x-www-form-urlencoded"
          },
        })
        .then(res=>{
          console.log(res.data)
          this.axios
          .get("/admin/userList?size=1&sizePage=6")
          .then(res => {
            console.log(res.data.data);
            if (res.data.code == 200) {
              this.tableData = res.data.data.list;
            }
          })
          .catch(error => {
            console.log(error);
          });
        })
        .catch(error=>{
          console.log(error)
        })
      })
      .catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消删除'
        }); 
      })
    },
    //序號的編寫
    indexMethod(index){
      return (index+ 1) + ( this.page - 1 ) * this.sizePage
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/resize.less";
.top {
  padding: 20px;
  input,
  button {
    margin: 20px;
  }
  select {
    margin: 20px;
  }
}

.userId,
.username,
select {
  width: 182px;
  height: 38px;
  background: #fff;
  padding: 0 0 0 10px;
}
select {
  height: 42px;
  margin-top: 2px;
}
button {
  width: @btn-w;
  height: @btn-h;
  color: white;
  outline: none;
  border: none;
  border-radius: 2px;
}
.btn {
  width: @btn-w;
  height: @btn-h;
  color: white;
  outline: none;
  border: none;
  border-radius: 2px;
  background: @bg-btn;
}
.seek-btn,
.del-btn {
  background: @bg-btn;
}
button:hover {
  background: #009687d0;
}
.check-btn {
  background: @bg-check-btn;
  margin-right: 10px;
}
.check-btn:hover {
  background: #2a8fddfa;
}
.table {
  width: 100%;
}
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
.caozuo {
  width: @two;
}
</style>