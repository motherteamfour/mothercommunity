<template>
  <div class="home">
    <div class="left">
      <el-col :span="24">
        <h5>这是一个logo</h5>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link to="addUsers">管理员</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="users">用户</router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
                已删除用户
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title"><router-link to="managePicture">图片管理</router-link></span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <router-link to="messageManage" slot="title">消息管理</router-link>
          </el-menu-item>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">管理员</el-menu-item>
              <el-menu-item index="1-2">用户</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1"><router-link to="basicInformation">基本资料</router-link></el-menu-item>
              <el-menu-item index="1-2"><router-link to="changePassword">修改密码</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </div>

    <div class="top">
      <img class="head-picture" src="../assets/images/001.jpg" alt="">
      <el-dropdown class="head">
        
        <span class="el-dropdown-link">
          用户某某某
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>基本资料</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="right">
      <div class="right-head">

      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {
    
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: white;
}
.home {
  width: 1366px;
  height: 768px;
  margin: 0 auto;
  /* overflow: hidden; */
}
.left {
  width: 200px;
  height: 100%;
  background: rgb(84, 92, 100);
  float: left;
  
  h5 {
    height: 50px;
    line-height: 50px;
  }
}
.top {
  height: 50px;
  line-height: 50px;
  margin-left: 200px;
  text-align: right;
  border-bottom: 1px solid rgb(194, 194, 194);
  background: white;

  .head {
    margin-right: 20px;
  }
  .head-picture {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    vertical-align: middle;
  }
}
.right {
  height: 658px;
  background: rgb(242,242,242);
  margin-left: 200px;
  
  .right-head {
    height: 50px;
    border-bottom: 1px solid rgb(194, 194, 194);
    background: #fff;
  }
}
.router-link-exact-active.router-link-active {
  color: rgb(255, 208, 75);
}
</style>