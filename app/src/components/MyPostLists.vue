<template>
  <div class="newpostss">
    <div class="newposts">
      <div class="user">
        <div class="user-por">
         <!--  <div class="portrait"> -->
            <img :src="'http://172.16.6.38:8989/'+imgs" class="portrait" alt="">

          <!-- </div> -->
        </div>
        <div class="user-name">
          <p>{{name}}</p>
        </div>
      </div>
      <div class="right">
        <div class="titlee">
          <p>{{title}}</p>
        </div>
        <div class="state">
          <span>孕4天</span>
          <span>
            {{time}}
            <span>
              <i class="fa fa-commenting-o" aria-hidden="true"></i>
              {{countco}}
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewPosts",
  props: ["name", "title", "time", "countco","imgs"]
};
</script>

<style lang="less" scoped>
.newposts {
    box-shadow: 0 0 8px rgb(236, 173, 173);
  padding: 10px;
  box-sizing: border-box;
  width: 710px;
  margin: 40px auto;
  margin-bottom: 20px;
  background: white;
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  border-radius: 30px;
  /* padding: 20px 0; */
  .user {
    
    width: 180px;
    height: 100%;
    /* background: yellow; */
    .user-por {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: center;
      .portrait {
        width: 100px;
        height: 100px;
        border: 1px solid red;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid red;
        }
      }
    }
    .user-name {
      width: 100%;
      height: 30px;
      /* overflow: hidden; */
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        font-size: 30px;
      }
    }
  }
  .right {
    width: 70%;
    height: 100px; /*  */

    .titlee {
      width: 100%;
      font-size: 34px;
      height: 100px;
      line-height: 100px; /*  */
    }
    .state {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      span {
        font-size: 20px;
        span {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>