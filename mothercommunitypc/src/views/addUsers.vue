<template>
  <div>
    <div class="tab-one">
      <table>
        <tr>
          <td>账号：</td>
          <td><input type="text" placeholder="输入创建的账号" class="userId mod"></td>
        </tr>
        <tr>
          <td>密码：</td>
          <td><input type="text" placeholder="请输入密码" class="password mod"></td>
        </tr>
        <tr>
          <td>姓名：</td>
          <td><input type="text" placeholder="请输入姓名" class="name mod"></td>
        </tr>
        <tr>
          <td>联系方式：</td>
          <td><input type="text" placeholder="请输入联系电话" class="tel mod"></td>
        </tr>
        <tr>
          <td colspan="2">
            <button type="button" class="add">添加</button>
            <button type="button" class="exit">取消</button>
          </td>
        </tr>
      </table>
    </div>
    <div class="tab-two">
      <div>
        <div class="top">
          <input type="text" class="userId" placeholder="请输入需要搜索的id">
          <input type="text" class="user" placeholder="请输入需要搜索的账号">
          <input type="text" class="username" placeholder="请输入需要搜索的姓名">
          <button type="button" class="seek-btn">搜索</button>
          <button type="button" class="del-btn" @click="delAll">删除</button>
        </div>
      </div>
      <table>
        <tr>
          <th><input type="checkbox"></th>
          <th>id</th>
          <th>用户名</th>
          <th>姓名</th>
          <th>联系方式</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in trs" :key="index.id">
          <td><input type="checkbox"></td>
          <td>{{item.id}}</td>
          <td>{{item.user}}</td>
          <td>{{item.username}}</td>
          <td>{{item.tel}}</td>
          <td>
            <button type="button" class="compile">编辑</button>
            <button type="button" class="del">删除</button>
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
      trs:[]
    }
  },
  created() {
    this.trs = trs
  }
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

</style>