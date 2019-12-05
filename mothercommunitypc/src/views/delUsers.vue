<template>
  <div>
    <div class="top">
      <input type="text" class="username" v-model="userSearch" placeholder="请输入需要搜索的用户名">
      
      <select class="conition" v-model="value">
        <option value="1">所有用户</option>
        <option value="2">备孕中</option>
        <option value="3">已怀孕</option>
        <option value="4">已出生</option>
      </select>
      <button type="button" class="seek-btn" @click="search">搜索</button>
      <button type="button" class="del-btn" @click="delAll">删除</button>
      <button type="button" class="recover" @click="resumes">恢复</button>
    </div>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 98%; margin:0 auto;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column type="index" :index="indexMethod" label="序号" width="120" align="center"></el-table-column>
        <el-table-column prop="userName" label="用户名" width="120" align="center"></el-table-column>
        <el-table-column prop="userPhone" label="电话号码" width="120" align="center"></el-table-column>
        <el-table-column prop="state.stateMessage" label="备孕状态" width="120" align="center"></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-button class="btn"  @click="delBtn(scope.row.userId)">删除</el-button>
            <el-button class="btn" @click="resumeBtn(scope.row.userId)">恢复</el-button>
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
</template>

<script>

export default {
  name:"users",
  data() {
    return {
    tableData:[],
    selAll:[],
    selectAll1:[],
    selectAll2:"",
    userSearch:"",
    value:"",
    userTotal: 0,
    page:1,
    sizePage: 6,
    number:0
    }
  },
  created() {
    this.axios
      .get("/admin/delUserList?size=1&sizePage=6")
      .then(res => {
        console.log(res.data.data);
        if (res.data.code == 200) {
          //将数据库中的数据对象赋值到自己创建的数据库中
          this.tableData = res.data.data.list;
          //将数据库中的总条数赋值到按钮上，自动分页
          this.userTotal = res.data.data.total;
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {

  },
  mounted() {
    
  },
  methods: {
    handleSelectionChange(val) {
      this.selAll = val;
      console.log(this.selAll);
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
    getAllUsers(size, sizePage) {
      this.axios
        .get("/admin/delUserList?size=" + size + "&sizePage=" + sizePage)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //删除
    delBtn(userId) {
      console.log(userId);
      this.axios({
        url:"/admin/deleteUser",
        method:"post",
        data: `userId=${userId}`,
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        },
      })
      .then(res=>{
        console.log(res.data)
        this.axios
          .get("/admin/delUserList?size=1&sizePage=6")
          .then(res => {
              this.tableData = res.data.data.list;
              
          }) 
          .catch(error => {
            console.log(error);
          });   
      })
      .catch(error=>{
        console.log(error)
      })
    },
    //恢复
    resumeBtn(userId){
       // var userIds = this.userIds.join
      console.log(userId);
      // const params = new URLSearchParams()
      // params.append('userId',userId)
      this.axios({
        url:"/admin/resumeUser",
        method:"post",
        data: `userId=${userId}`,
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        },
      // data:params
        
      })
      .then(res=>{
        console.log(res.data)
          this.axios
          .get("/admin/delUserList?size=1&sizePage=6")
          .then(res => {
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
    //搜索
    search(){

      console.log();
      this.axios({
        url:"/admin/findDelUserByConditions",
        method:"post",
        data: `size=1&sizePage=6&userName=${this.userSearch}&userState=${this.value}`,
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        },
        
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
    //搜索完成之后的分页
    searchPage(size, sizePage) {
      this.axios({
          url: "/admin/findDelUserByConditions",
          method: "post",
          data: `size=${size}&sizePage=${sizePage}&userName=${this.userSearch}&userState=${this.value}`,
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
    },
    //恢复多个
    resumes(){
      console.log()
      if(this.selAll.length>0){
        this.selAll.forEach(item=>{
          this.selectAll1.push(item.userId)
          console.log(this.selectAll1)
          
        });
        this.selectAll2 = this.selectAll1.join(",")
      } 
      console.log(this.selectAll1)
      this.axios({
        url:"/admin/resumeUsers",
        method:"post",
        data: `ids=${this.selectAll2}`,
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        },
      })
      .then(res=>{
        console.log(res.data)
         this.axios
        .get("/admin/delUserList?size=1&sizePage=6")
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
    },
    //序号的编写
    indexMethod(index){
      return (index+ 1) + ( this.page - 1 ) * this.sizePage
    },
    //删除多条数据
    delAll() {
      console.log()
      if(this.selAll.length>0){
        this.selAll.forEach(item=>{
          this.selectAll1.push(item.userId)
          console.log(this.selectAll1)
          
        });
        this.selectAll2 = this.selectAll1.join(",")
      } 
      console.log(this.selectAll1)
      this.axios({
        url:"/admin/deleteUsers",
        method:"post",
        data: `ids=${this.selectAll2}`,
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        },
      })
      .then(res=>{
        console.log(res.data)
         this.axios
        .get("/admin/delUserList?size=1&sizePage=6")
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
      

    },
  }
  

}
</script>

<style lang="less" scoped>
@import '../assets/style/resize.less';
.top{
  padding: 20px;
  input,button{
    margin: 20px;
  };
  select{
    margin: 20px;
  }
  
}

.userId,.username,select{
  width: 182px;
  height: 38px;
  background: #fff;
  padding:0 0 0 10px;
}
select{
  height: 42px;
  margin-top: 2px
}
button{
  width: @btn-w;
  height: @btn-h;
  color: white;
  outline: none;
  border: none;
  border-radius: 2px
}
.seek-btn,.del-btn,.btn{
  background:@bg-btn;
}
button,.btn:hover {
  background: #009687d0;
  color:white
}
.check-btn{
  background: @bg-check-btn;
  margin-right: 10px
}
.check-btn:hover{
  background: #2a8fddfa
}
.table{
  width: 100%;
  
}
table{
  width: 98%;
  border-collapse:collapse;
  margin: 0 auto  

}
tr,th,td{
  border: @tab-border;
  height: 28px;
}

.recover{
  background: red;
  margin-left: 10px
}
.recover:hover {
  background: rgba(255, 0, 0, 0.699)
}
.caozuo{
  width: @three;
}
</style>