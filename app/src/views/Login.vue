<template>
  <div class="login">
    <div class="box">
      <div class="headimg">
        <img src="../assets/img/login/denglu.png" alt />
      </div>

      <div class="number">
        <p class="ziti">手机号</p>
        <input type="text" class="ipt" placeholder="请输入手机号" />
      </div>

      <div class="number">
        <p class="ziti">密码</p>
        <input type="password" class="ipt" placeholder="请输入密码" />
      </div>

      <div class="zz">
        <span>账户或密码错误</span>
        <a href="">手机验证码登录</a>
        <a href="">注册</a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {}
};
</script>

<style lang="less" scoped>
*{
  margin: 0;
  padding: 0;
}
a {
  text-decoration:none; 
}

/* 输入框颜色 */
.ipt {
  width: 100%;
  height: 66px;
  border: none;
  color: #444;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.5);
  text-indent: 80px;
}
//输入框提示文字颜色
::-webkit-input-placeholder {
  color: #fff;
}
.ziti {
  //输入框上方字体颜色
  height: 50px;
  line-height: 50px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 24px;
  text-indent: 10px;
}
// 公共代码

.login {
  width: 750px;
  height: 100vh;
  background: linear-gradient(#ffa37a, #ff518d);
  display: flex;  // 弹性布局
  justify-content: center;
  align-items: center;
}
.box {
  width: 70%;
  height: 50%;
}
.headimg {
  width: 140px;
  height: 140px;
  margin: 0 auto;
}
.number{
  margin: 50px 0;
}
.zz{
  color: #fff;
  font-size: 24px;

}
</style>