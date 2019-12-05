<template>
  <div>
    <div class="top">
      <!-- <select>
        <option value="selected"></option>
        <option>怀孕</option>
        <option>备孕</option>
        <option>出生</option>
      </select>
      <select>
        <option value="selected"></option>
        <option>怀孕</option>
        <option>备孕</option>
        <option>出生</option>
      </select> -->
      <input type="text" class="username" placeholder="请输入需要搜索的用户名" v-model="users" />
      <input type="text" class="title" placeholder="请输入需要搜索的标题" v-model="usertitle" />
      <button type="button" class="seek-btn" @click="search">搜索</button>
      <button type="button" class="del-btn" @click="delAll">删除</button>
      <button type="button" class="unRecommend" @click="Recommend">推荐</button>
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
        <el-table-column prop="categoryName" label="大圈子" width="100" align="center"></el-table-column>
        <el-table-column prop="circleName" label="小圈子" width="100" align="center"></el-table-column>
        <el-table-column prop="postTime" label="发布时间" width="120" align="center"></el-table-column>
        <el-table-column prop="countCollection" label="收藏数量" width="100" align="center"></el-table-column>
        <el-table-column prop="countFabulous" label="点赞数量" width="100" align="center"></el-table-column>
        
        <el-table-column label="操作" show-overflow-tooltip align="center">
           <!-- slot-scope="scope" -->
          <template slot-scope="scope">
            <el-button class="check-btn">查看</el-button>
            <el-button class="del-btn" @click="deleteAtic(scope.row.postId)">删除</el-button>
            <el-button class="unRecommend" @click="recom(scope.row.postId,scope.row.user.userId)">推荐</el-button>
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
  name: "aticleAll",
  data() {
    return {
      tableData: [],
      selAll:[],
      selectAll1:[],
      users:"",
      usertitle:"",
      selectAll2:"",
      delAlls:[],
      delAlls2:[],
      postId1:[],
      userTotal: 0,
      page:1,
      sizePage: 6,

    };
  },
  created() {
    this.axios.get("/posterior/postmanagement/notRecommend?page=1&pagesize=6")
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
        postTitle: this.usertitle,
        userName: this.users
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
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.comsts.splice(i, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //批量推荐
    Recommend(){
      if(this.selAll.length>0){
        this.selAll.forEach(item=>{
        
          this.postId1.push(item.postId)
          console.log(this.postId1)
        });
      
      } 
      // const postIds = 
      // console.log(postIds)
      this.axios({
        url:"/posterior/postmanagement/updatePostRecommendByIds",
        method:"post",
        data:`postIds=${this.postId1.join(",")}`,
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
      //设置为推荐之后给用户发送推荐消息

      if(this.selAll.length>0){
        this.selAll.forEach(item=>{
        
          this.selectAll1.push(item.user.userId)
          // console.log(item.user.userId)
        });
        this.selectAll2 = this.selectAll1.join(",")
      } 
      console.log(this.selectAll2)
      this.axios
      .post("/posterior/message/creatMessage",{
          messageTitle: "设置推荐",
          messageText: "你的文章已经被设置为推荐文章",
          receiveUserIds: this.selectAll2
      })
      .then(res=>{
        console.log(res.data)


      })
      .catch(error=>{
        console.log(error)
      })
    },
    //推荐
    recom(postId,userId){
      this.axios({
        url:"/posterior/postmanagement/updatePostRecommendById",
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
      //设置为推荐之后给用户发送推荐消息
      console.log(postId,userId)
      

      this.axios
      .post("/posterior/message/creatMessage",{
          messageTitle: "设置推荐",
          messageText: "你的文章已经被设置为推荐文章",
          receiveUserIds: userId
      })
      .then(res=>{
        console.log(res.data)

      })
      .catch(error=>{
        console.log(error)
      })
    },
    //文章删除
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
    indexMethod(index){
      return (index+ 1) + ( this.page - 1 ) * this.sizePage
    },
    //删除多个
    delAll(){
      if(this.selAll.length>0){
        this.selAll.forEach(item=>{
          this.delAlls.push(item.postId)
        });
        this.delAlls2 = this.delAlls.join(",")
      } 
      this.axios({
        url:"/posterior/postmanagement/removePostByIds",
        method:"post",
        data:`postIds=${this.delAlls2}`,
        headers:{"Content-Type":"application/x-www-form-urlencoded"}
      })
      // .post("/posterior/postmanagement/removePostByIds",{postIds:this.delAlls2})
      .then(res=>{
        console.log(res.data)
      })
      .catch(error=>{
        console.log(error)
      })
    }
    
  },
  
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
.title {
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

.unRecommend {
  background: #ebe71d;
  margin-left: 10px;
}
.unRecommend:hover {
  background: #ebe81dc4;
}
.caozuo {
  width: @three;
}
</style>