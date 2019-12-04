<template>
  <div>
    <div class="top">
      <input type="text" class="username" placeholder="请输入需要搜索的用户名">
      <select class="conition">
        <option value="备孕中">备孕中</option>
        <option value="已怀孕">已怀孕</option>
        <option value="已出生">已出生</option>
      </select>
      <button type="button" class="seek-btn" @click="search">搜索</button>
      <button type="button" class="del-btn">删除</button>
      <button type="button" class="recover">恢复</button>
    </div>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 98%; margin:0 auto;"
      >
        <el-table-column type="selection" width="120"></el-table-column>
        <el-table-column prop label="序号" width="120"></el-table-column>
        <el-table-column prop="userName" label="用户名" width="120"></el-table-column>
        <el-table-column prop="userPhone" label="电话号码" width="120"></el-table-column>
        <el-table-column prop="state.stateMessage" label="备孕状态" width="120"></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button class="btn"  @click="delBtn(scope.row.userId)">删除</el-button>
            <el-button class="btn" @click="resumeBtn(scope.row.userId)">恢复</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>

export default {
  name:"users",
  data() {
    return {
     tableData:[]
    }
  },
  created() {
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
  },
  computed: {

  },
  mounted() {
    
  },
  methods: {
    delBtn(userId) {
      console.log(userId);
      this.axios
        .delete("/admin/deleteUser?userId=1000")
        .then(res=>{
          console.log(res.data)
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
    search(userName){
        // var userIds = this.userIds.join
      console.log(userName);
      // const params = new URLSearchParams()
      // params.append('userId',userId)
      this.axios({
        url:" /admin/findUserByConditions?size=1&sizePage=6",
        method:"post",
        data: `Name=${userName}`,
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        },
      // data:params
        
      })
      .then(res=>{
        console.log(res.data)
          this.axios
          .get("/admin/findUserByConditions?size=1&sizePage=6")
          .then(res => {
            if (res.data.code == 200) {
              this.tableData = res.data.data.list;
            }
          })            
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