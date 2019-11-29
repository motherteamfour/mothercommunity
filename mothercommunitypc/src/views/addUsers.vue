<template>
  <div>
    <div class="tab-one">
      <table>
        <tr>
          <td>账号：</td>
          <td><input type="text" placeholder="输入创建的账号" class="userId mod" v-model="inputUsername" @blur="username(inputUsername)" ></td>
        </tr>
        <tr>
          <td>密码：</td>
          <td><input type="text" placeholder="请输入密码" class="password mod" v-model="inputPassword" @blur="userpass(inputPassword)"></td>
        </tr>
        <tr>
          <td>姓名：</td>
          <td><input type="text" placeholder="请输入姓名" class="name mod" v-model="inputName"></td>
        </tr>
        <tr>
          <td>联系方式：</td>
          <td><input type="text" placeholder="请输入联系电话" class="tel mod" v-model="inputTel" @blur="tel(inputTel)"></td>
        </tr>
        <tr>
          <td colspan="2">
            <el-button type="button" class="add" :disabled="disadd1 && disadd2 && disadd3">添加</el-button>
            <el-button type="button" class="exit" @click="exit">清空</el-button>
          </td>
        </tr>
      </table>
    </div>
    <div class="tab-two">
      <div>
        <div class="top">
          <input type="text" class="user" placeholder="请输入需要搜索的用户名">
          <input type="text" class="username" placeholder="请输入需要搜索的姓名">
          <button type="button" class="seek-btn">搜索</button>
          <button type="button" class="del-btn">删除</button>
        </div>
      </div>
      <table>
        <tr>
          <th><input type="checkbox"></th>
          <th>id</th>
          <th>用户名</th>
          <th>姓名</th>
          <th>联系方式</th>
          <th class="caozuo">操作</th>
        </tr>
        <tr v-for="(item,index) in trs" :key="index.id">
          <td><input type="checkbox"></td>
          <td>{{item.id}}</td>
          <td>{{item.user}}</td>
          <td>{{item.username}}</td>
          <td>{{item.tel}}</td>
          <td>
            <button type="button" class="compile">编辑</button>
            <button type="button" class="del" @click="del(index)">删除</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
  

</template>

<script>
const trs = [
  {
    id:1,
    user:"lime",
    username:"licky",
    tel:"12345679820"
  },
  {
    id:2,
    user:"silence",
    username:"lisat",
    tel:"12344329820"
  },
  {
    id:3,
    user:"lucky",
    username:"seas",
    tel:"14325679820"
  }
]
export default {
  name:"addUsers",
  data(){
    return {
      trs:[],
      // 对添加账户添加初始值
      inputUsername : "",
      inputPassword : "",
      inputName : "",
      inputTel : "",
      disadd1 : false,
      disadd2 : false,
      disadd3 : false,
    }
  },
  created() {
    this.trs = trs
  },
  methods:{
    //清空效果
    exit:function(){
      this.inputUsername = "",
      this.inputPassword = "",
      this.inputName = "",
      this.inputTel = ""
      
    },
    del(i) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.trs.splice(i, 1);
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
    defeated(msg) {
      this.$message({
          showClose: true,
          message: msg,
          type: 'error'
        });
    },
    //正则判断
    username(message){
      var pat = /^[a-zA-Z]{5,15}$/;
      if(!pat.test(message)){
        this.defeated("请输入5-15位的字母") 
        if(message!=""){
        return  this.disadd1 = true
      }
      }
      
    },
    userpass(message){
      var pat = /^[a-zA-Z0-9_]{5,15}$/;
      if(!pat.test(message)){
        this.defeated("请输入5-15位的字母、数字和下划线")
        if(message!=""){
        return this.disadd2= true
      }
      }
    },
    tel(message){
      var pat = /^1[3|4|5|6|7|8|9]\d{9}/;
      if(!pat.test(message)){
        this.defeated("电话号码格式不正确")
        if(message!=""){
        return this.disadd3 = true
      }
      }
    },
   
  },
  // computed:{
  //   disadd(){
  //     if(this.inputUsername=="" || this.inputPassword=="" || this.inputTel==""){
  //       return this.disadd = true
  //     }
  //   }
  // }
}
</script>

<style lang="less" scoped>
@import '../assets/style/resize.less';
.tab-one{
  margin-top: 30px;
  width: 100%;
  table{
    width: 30%;
    margin: 0 auto;
    border: @tab-border;
    td{
      padding: 5px
    }

  }
}
button{
  width: @btn-w;
  height: @btn-h;
  color: white;
  outline: none;
  border: none;
  border-radius: 2px
}
button:hover {
  background: #009687d0
}
.add,.exit,.compile,.del{
  background: @bg-btn;
  margin: 5px
}
.add,.exit:hover{
  color: white;
}
.mod{
  width: 182px;
  height: 38px;
  background: #fff;
  padding:0 0 0 10px;
}
.seek-btn,.del-btn{
  background:@bg-btn;
  margin: 5px;
}
.userId,.username,.user{
  width: 182px;
  height: 38px;
  background: #fff;
  padding:0 0 0 10px;
  margin: 10px;
}
.tab-two{
  width: 100%;
  table{
    width: 98%;
    border-collapse:collapse;
    margin: 0 auto  
  };
  tr,th,td{
    border: @tab-border;
    height: 28px;
  }
}
.caozuo{
  width: @two;
}
// .top{
//   text-align: right
// }
</style>

