<template>
  <div class="zhujianwai">
      <div class="zhujian">
        <div class="left">
          <div class="title">
            <p>{{countComment.postTitle}}</p>
          </div>
          <div class="content">
            <p>{{countComment.postContent}}</p>
          </div>
        </div>
        <div class="right">
          <div class="photo"></div>
        </div>
      </div>
      <div class="nameandcommend">
        <span>{{countComment.user.userName}}</span>
        <span>{{countComment.countComment}}-评论</span>
      </div>
    </div>
</template>
<script>
export default {
  name: 'RecommtLists',
  props:["countComment"]
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.zhujianwai {
  width: 716px;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  background: white;
  box-shadow: 0 0 6px rgb(233, 176, 176);
  overflow: hidden;
  margin: 20px auto;
  .zhujian {
    width: 710px;
   /*  height: 240px; */

    display: flex;
    justify-content: flex-start;

    .left {
      width: 60%;
      height: 100%;
      /*  background: greenyellow; */
      .title {
        width: 100%;
        height: 120px;

        padding: 30px;
        padding-left: 60px;
        box-sizing: border-box;
        p {
          font-size: 34px;
          font-weight: 500;
          
        }
      }
      .content {
        width: 100%;
        /* height: 120px; */
        /*   background: yellow; */
        padding: 10px;
        padding-top: 0;
        
        box-sizing: border-box;
        p {
          font-size: 26px;
          color: gray;
          
        }
      }
    }
    .right {
       width: 300px;
     /* height: 200px; */
    /*   background: grey; */

      display: flex;
      justify-content: center;
      align-items: center;
      .photo {
        /* width: 260px;
        height: 200px; */
        padding: 10px;
       /*  background: pink; */
      }
    }
  }
  .nameandcommend {
    width: 100%;
    height: 60px;
    /*    background: blue; */
    display: flex;
    justify-content: space-between;
    span {
      font-size: 26px;
      margin-left: 30px;
      margin-right: 30px;
      color: gray;
    }
  }
}

</style>