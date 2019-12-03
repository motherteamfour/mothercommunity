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
          unique-opened
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/addUsers">管理员</el-menu-item>
              <el-menu-item index="/home/users">用户</el-menu-item>
              <el-menu-item index="/home/delUsers">已删除用户</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/home/managePicture">
            <i class="el-icon-menu"></i>
            <span slot="title">图片管理</span>
          </el-menu-item>
          <el-menu-item index="/home/messageManage">
            <i class="el-icon-document"></i>
            <span slot="title">消息管理</span>
          </el-menu-item>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/aticleAll">所有文章</el-menu-item>
              <el-menu-item index="/home/investigate">文章审核</el-menu-item>
              <el-menu-item index="/home/recommend">文章推荐</el-menu-item>
              <el-menu-item index="/home/delAticle">已删除文章</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/basicInformation">基本资料</el-menu-item>
              <el-menu-item index="/home/changePassword">修改密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </div>

    <div class="top">
      <div class="right-head">
        <ShowTime></ShowTime>
      </div>
      <div class="top-right">
        <img class="head-picture" :src="userPicture" alt="头像" />
        <el-dropdown class="head" @command="quit">
          <span class="el-dropdown-link">
            {{userName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ShowTime from "@/components/ShowTime.vue";

export default {
  name: "home",
  components: {
    ShowTime
  },
  data() {
    return {
      userName: '',
      userPicture: ''
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    quit() {
      sessionStorage.removeItem("token");
      this.$router.replace("/login");
    }
  },
  mounted() {
    const userId = sessionStorage.getItem("userId")
    this.axios
      .get(
        "/admin/findMyselfMessage?adminId="+userId)
      .then(res => {
        console.log(res.data)
        if(res.data.code==200) {
          this.userName = res.data.data.adminNickName;
          this.userPicture = "http://172.16.6.48:8081/" + res.data.data.adminImgUrl;
        }
      })
      .catch(error => {
        console.log(error);
      });
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
  border-bottom: 1px solid rgb(194, 194, 194);
  background: white;

  .right-head {
    display: inline-block;
  }
  .top-right {
    float: right;
  }
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
  background: rgb(242, 242, 242);
  margin-left: 200px;

  .right-head {
    height: 50px;
    border-bottom: 1px solid rgb(194, 194, 194);
    background: #fff;
  }
}
</style>