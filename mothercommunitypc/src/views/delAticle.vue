<template>
  <div>
    <div class="top">
      <input type="text" class="username" placeholder="请输入需要搜索的用户名">
      <input type="text" class="title" placeholder="请输入需要搜索的标题">
      <input type="text" class="delCause" placeholder="请输入删除的原因">
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
          <th>标题</th>
          <th>内容</th>
          <th>删除原因</th>
          <th>删除时间</th>
          <th class="caozuo">操作</th>
        </tr>
        <tr v-for="(item,index) in comsts" :key="index.id">
          <td><input type="checkbox" v-model="item.isSel"></td>
          <td>{{item.id}}</td>
          <td>{{item.username}}</td>
          <td>{{item.title}}</td>
          <td>{{item.time}}</td>
          <td>{{item.collect}}</td>
          <td>{{item.praise}}</td>
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
    title:"朝花夕拾",
    time:"2017.1.5",
    collect:20,
    praise:30
  },
  {
    id:2,
    username:"haiqiong",
    title:"朝花夕拾",
    time:"2017.1.5",
    collect:20,
    praise:30
  },
  {
    id:3,
    username:"lilei",
    title:"朝花夕拾",
    time:"2017.1.5",
    collect:20,
    praise:30
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