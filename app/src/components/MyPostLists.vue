<template>
  <div class="newposts">
    <div class="newposts">
      <div class="user">
        <div class="user-por">
          <div class="portrait"></div>
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
            时间
            <span>
              <i class="fa fa-commenting-o" aria-hidden="true"></i>
              4
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
  props: ["name", "title"]
};
</script>

<style lang="less" scoped>
.newposts {
  width: 710px;
  margin: 40px auto;
  height: 180px;
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
      height: 120px;
      display: flex;
      justify-content: center;
      .portrait {
        width: 120px;
        height: 120px;
        background: rgb(151, 135, 135);
        border-radius: 50%;
      }
    }
    .user-name {
      width: 100%;
      height: 60px;
      /* overflow: hidden; */
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        font-size: 40px;
      }
    }
  }
  .right {
    width: 70%;
    height: 130px; /*  */

    .titlee {
      width: 100%;
      height: 130px;
      line-height: 100px; /*  */
    }
    .state {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      span {
        font-size: 30px;
        span {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>