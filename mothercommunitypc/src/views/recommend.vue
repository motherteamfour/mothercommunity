<template>
  <div>
    <div class="top">
      <input type="text" class="username" placeholder="请输入需要搜索的用户名">
      <input type="text" class="title" placeholder="请输入需要搜索的标题">
      <button type="button" class="seek-btn">搜索</button>
      <button type="button" class="del-btn">删除</button>
      <button type="button" class="unRecommend">取消推荐</button>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 98%; margin:0 auto;"
      >
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column prop label="ID" width="60" align="center"></el-table-column>
        <el-table-column prop="user.userName" label="用户名" width="120" align="center"></el-table-column>
        <el-table-column prop="postTitle" label="标题" width="120" align="center"></el-table-column>
        <el-table-column prop="user.userStartTime" label="发布时间" width="120" align="center"></el-table-column>
        <el-table-column prop="countCollection" label="收藏数量" width="120" align="center"></el-table-column>
        <el-table-column prop="countFabulous" label="点赞数量" width="120" align="center"></el-table-column>
        
        <el-table-column label="操作" show-overflow-tooltip align="center">
           <!-- slot-scope="scope" -->
          <template slot-scope="scope">
            <el-button class="check-btn">查看</el-button>
            <el-button class="del-btn" @click="deleteAtic(scope.row.postId)">删除</el-button>
            <el-button class="unRecommend" @click="exit(scope.row.postId)">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name:"recommend",
  data() {
    return {
     tableData:[]
    }
  },
  created() {
    this.axios.get("/posterior/postmanagement/recommend?page=1&pagesize=6")
    .then(res=>{
      console.log(res.data)
      this.tableData = res.data.data.list;
    })
    .catch(error=>{
      console.log(error)
    })
  },
  computed: {

  },
  methods: {
   
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
    exit(postId){
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
        this.axios.get("/posterior/postmanagement/recommend?page=1&pagesize=6")
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
    //删除
    deleteAtic(postId){
      this.axios({
        url:"/posterior/postmanagement/removePostById",
        method:"post",
        data:`postId=${postId}`,
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        },
      })
      .then(res=>{
        console.log(res.data)
        this.axios.get("/posterior/postmanagement/notRecommend?page=1&pagesize=6")
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

.userId,.username,.title{
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

.unRecommend{
  background: #ebe71d;
  margin-left: 10px
}
.unRecommend:hover {
  background: #ebe81dc4
}
.caozuo{
  width:@three;
}
</style>