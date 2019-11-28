<template>
  <div class="login">
    <div class="box">
      <div class="headimg">
        <img src="../assets/img/login/denglu.png" alt />
      </div>

      <i class="fa fa-mobile" aria-hidden="true"></i>

      <div class="number">
        <p class="ziti">手机号</p>
        <input type="text" class="ipt" placeholder="请输入手机号" />
      </div>

      <div class="number">
        <p class="ziti">密码</p>
        <input type="password" class="ipt" placeholder="请输入密码" />
      </div>

      <div class="mistake">
        <a href="javascript:;" class="a1">账户或密码错误</a>
        <a href class="a2">忘记密码</a>
      </div>

      <button type="button" class="btn number">登录</button>

      <div class="start">
        <a href class="a3">短信登录</a>
        <a href="javascript:;" class="a4">|</a>
        <a href class="a5">用户注册</a>
      </div>
      <!-- <div class="shadow"></div> -->
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
/* @共用 */
@oneSize: 28px;
@oneColor: rgba(255, 255, 255, 0.7);

/* 输入框颜色 */
.ipt {
  width: 100%;
  height: 66px;
  border: none;
  color: #444;
  border-radius: 20px;
  background: @oneColor;
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
  color: @oneColor;
  font-size: @oneSize;
  text-indent: 10px;
}
// 公共代码

.login {
  width: 750px;
  height: 100vh;
  background: linear-gradient(#ffa37a, #ff518d);
  display: flex; // 弹性布局
  justify-content: center;
  align-items: center;
}
.box {
  width: 70%;
  // height: 50%;
}
.headimg {
  width: 140px;
  height: 140px;
  margin: 0 auto 140px auto;
}
.number {
  margin-top: 50px;
}
.btn {
  width: 100%;
  height: 66px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 228, 105);
  color: #fff;
}
/* 阴影 */
/* .shadow{
  width: 96%;
  height: 1px;
  // border: 1px solid rgba(255, 228, 105);
  box-shadow: 5px 5px 5px rgba(255, 228, 105);
} */
.mistake {
  margin-top: 10px;
  display: flex; // 弹性布局
  justify-content: space-between;
  align-items: center;
}
.a1 {
  font-size: @oneSize;
  color: red;
  // visibility: hidden;
}
.a2 {
  font-size: @oneSize;
  color: @oneColor;
}

.start{
  width: 60%;
  margin: 100px auto;
  display: flex; // 弹性布局
  justify-content: space-between;
  align-items: center;
}
.a3{
  font-size: @oneSize;
  color: @oneColor;
}
.a4{
  font-size: 28px;
  color: @oneColor;
}
.a5{
  font-size: @oneSize;
  color: rgba(255, 255, 0, 0.7);
}
</style>