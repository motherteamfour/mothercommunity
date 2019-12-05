<template>
  <div>
    <div class="top">
      <input type="text" class="username" placeholder="请输入需要搜索的用户名">
      <input type="text" class="title" placeholder="请输入需要搜索的标题">
      <input type="text" class="delCause" placeholder="请输入删除的原因">
      <button type="button" class="seek-btn">搜索</button>
      <button type="button" class="del-btn">删除</button>
      <button type="button" class="recover" @click="recos">恢复</button>
    </div>
    <div class="table">

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 98%; margin:0 auto;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column type="index" :index="indexMethod" label="ID" width="60" align="center"></el-table-column>
        <el-table-column prop="user.userName" label="用户名" width="120" align="center"></el-table-column>
        <el-table-column prop="postTitle" label="标题" width="120" align="center"></el-table-column>
        <el-table-column prop="postContent" label="内容" width="120" align="center"></el-table-column>
        <el-table-column prop="" label="删除原因" width="120" align="center"></el-table-column>
        <el-table-column prop="" label="删除时间" width="120" align="center"></el-table-column>
        
        <el-table-column label="操作" show-overflow-tooltip align="center">
           <!-- slot-scope="scope" -->
          <template slot-scope="scope">
            <el-button class="check-btn">查看</el-button>
            <el-button class="del-btn" >删除</el-button>
            <el-button class="del-btn" @click="recover(scope.row.postId)">恢复</el-button>
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
  name:"delAticle",
  data() {
    return {
      tableData:[],
      selAll:[],
      unRecoms:[],
      unRecoms2:"",
      userTotal: 0,
      page:1,
      sizePage: 6,
    }
  },
  created() {
    this.axios.get("/posterior/postmanagement/recyclePost?page=1&pagesize=6")
    .then(res=>{
      console.log(res.data)
      this.tableData = res.data.data.list;
      this.userTotal = res.data.data.total;
    })
    .catch(error=>{
      console.log(error)
    })
  },
  computed: {
   
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
      console.log(this.users,this.usertitle)
      if(this.users==''&&this.usertitle=='') {
        
        this.getAllUsers(val, this.sizePage);
      }else {
        this.searchPage(val, this.sizePage);
      }
    },
    getAllUsers(size, sizePage) {
      this.axios
        .get("/posterior/postmanagement/notRecommend?page=" + size + "&pagesize=" + sizePage)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //搜索
    search(){

      console.log(this.users,this.usertitle);
      this.axios.post("/posterior/postmanagement/notRecommendByWhere",{
        categoryId: "",
        circleId: "",
        page: 1,
        pagesize: 6,
        postTitle: this.users,
        userName: this.usertitle
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

      this.axios.post("/posterior/postmanagement/notRecommendByWhere",{
        categoryId: "",
        circleId: "",
        page: size,
        pagesize: sizePage,
        postTitle: this.users,
        userName: this.usertitle
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
    del(i) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.comsts.splice(i, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
       
    },
    //恢复
    recover(postId){
      console.log(postId)
      this.axios({  
        url:"/posterior/postmanagement/recoveryPostById",
        method:"post",
        data:`postId=${postId}`,
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        },
      })
      .then(res=>{
        console.log(res.data)
        this.axios.get("/posterior/postmanagement/recyclePost?page=1&pagesize=6")
        .then(res=>{
          console.log(res.data)
          this.tableData = res.data.data.list;
        })
        .catch(error=>{
          console.log(error)
        })
      })
      .catch(error=>{
        console.log(error)
      })
    },
    indexMethod(index){
      return (index+ 1) + ( this.page - 1 ) * this.sizePage
    },
    recos(){
      if(this.selAll.length>0){
        this.selAll.forEach(item=>{
          this.unRecoms.push(item.postId)
        });
        this.unRecoms2 = this.unRecoms.join(",")
      } 
      console.log(this.unRecoms)
      this.axios({
        url:"/posterior/postmanagement/recoveryPostByIds",
        method:"post",
        data:`postIds=${this.unRecoms2}`,
        headers:{"Content-Type":"application/x-www-form-urlencoded"}
      })
     
      .then(res=>{
        console.log(res.data)
        this.axios.get("/posterior/postmanagement/recyclePost?page=1&pagesize=6")
        .then(res=>{
          console.log(res.data)
          this.tableData = res.data.data.list;
        })
        .catch(error=>{
          console.log(error)
        })
      
      })
      .catch(error=>{
        console.log(error)
      })
    }
    
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

.userId,.username,.title,.delCause{
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
.seek-btn,.del-btn{
  background:@bg-btn;
}
button:hover {
  background: #009687d0
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
  background: #ebe71d;
  margin-left: 10px
}
.recover:hover {
  background: #ebe81dc4
}
.caozuo{
  width:@three;
}

</style>