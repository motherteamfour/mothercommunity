<template>
  <div>
    <div class="top">
      <input type="text" class="username" placeholder="请输入需要搜索的用户名" />
      <select class="conition">
        <option value="备孕中">备孕中</option>
        <option value="已怀孕">已怀孕</option>
        <option value="已出生">已出生</option>
      </select>
      <button type="button" class="seek-btn">搜索</button>
      <button type="button" class="del-btn">删除</button>
    </div>
    <div class="table">
      <!-- <table>
        <tr>
          <th>
            <input type="checkbox" @click="selectAll" />
          </th>
          <th>ID</th>
          <th>用户名</th>
          <th>电话号码</th>
          <th>备孕状态</th>
          <th class="caozuo">操作</th>
        </tr>
        <tr v-for="(item,index) in tableData" :key="index.id">
          <td>
            <input type="checkbox" v-model="item.isSel" />
          </td>
          <td></td>
          <td>{{item.userName}}</td>
          <td>{{item.userPhone}}</td>
          <td>{{item.state.message}}</td>
          <td>
            <button type="button" class="check-btn">查看</button>
            <button type="button" class="del-btn" @click="del(index)">删除</button>
          </td>
        </tr>
      </table>-->
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
            <el-button class="btn">查看</el-button>
            <el-button class="btn"  @click="delbtn(scope.row.userId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template> 

<script>
export default {
  name: "users",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
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
    //分页按钮
    load(){
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
    },
    //用户数据假删
    delbtn(userId) {
      // var userIds = this.userIds.join
      console.log(userId);
      // const params = new URLSearchParams()
      // params.append('userId',userId)
      this.axios({
        url:"/admin/delUser",
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
          .get("/admin/userList?size=1&sizePage=6")
          .then(res => {
            console.log(res.data.data);
              this.tableData = res.data.data.list;
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