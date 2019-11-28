<template>
  <div>
    <div class="top">
      <input type="text" class="username" placeholder="请输入需要搜索的用户名">
      <select class="conition">
        <option value="备孕中">备孕中</option>
        <option value="已怀孕">已怀孕</option>
        <option value="已出生">已出生</option>
      </select>
      <button type="button" class="seek-btn">搜索</button>
      <button type="button" class="del-btn" @click="delAll">删除</button>
      <button type="button" class="recover">恢复</button>
    </div>
    <div class="table">
      <table>
        <tr>
          <th><input type="checkbox" @click="selectAll"></th>
          <th>ID</th>
          <th>用户名</th>
          <th>年龄</th>
          <th>备孕状态</th>
          <th class="caozuo">操作</th>
        </tr>
        <tr v-for="(item,index) in comsts" :key="index.id">
          <td><input type="checkbox" v-model="item.isSel"></td>
          <td>{{item.id}}</td>
          <td>{{item.username}}</td>
          <td>{{item.age}}</td>
          <td>{{item.type}}</td>
          <td>
            <button type="button" class="check-btn">查看</button>
            <button type="button" class="del-btn" @click="del(index)">删除</button>
            <button type="button" class="recover">恢复</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

const comsts = [
  {
    id:1,
    username:"lilei",
    age:25,
    type:"已怀孕",
    isSel:false
  },
  {
    id:2,
    username:"haiqiong",
    age:22,
    type:"备孕中",
    isSel:false
  },
  {
    id:3,
    username:"lilei",
    age:26,
    type:"已出生",
    isSel:true
  }
]
export default {
  name:"users",
  data() {
    return {
      comsts:[]
    }
  },
  created() {
    this.comsts = comsts;
  },
  computed: {
    // isSelectAll:function(){
    //   return this.comsts.every(function(val) {
    //     return val.isSel
    //   })
      
    // }
  },
  methods: {
    selectAll:function(e){
      if(e.target.checked){
        this.comsts = this.comsts.map(function(item){
          item.isSel = true;
          return item
        });
      } else {
        this.comsts = this.comsts.map(function(item){
          item.isSel = false;
          return item
        });
      }
    },
    del:function(i) {
      this.comsts.splice(i,1)
    },
    delAll: function(){

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