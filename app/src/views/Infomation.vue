<template>
  <div class="information">
    <div class="top">
      <span class="goback" @click="goback()">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </span>
      <h3>消息</h3>
      <span></span>
    </div>

    <ul>
      <li @click="goInfoComment()">
        <div class="photo blue">
          <i class="fa fa-comments" aria-hidden="true"></i>
        </div>
        <div class="category">
          <div class="right">
            <div class="category">
              <span class="title reply">回复</span>
            </div>
          </div>
        </div>
      </li>
      <li @click="goInfoLike()">
        <div class="photo orange">
          <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
        </div>
        <div class="right">
          <div class="category">
            <span class="title">赞</span>
            <span class="gray">时间</span>
          </div>
          <div class="gray">帮小友思考思考时时刻刻是给你点了一个赞</div>
        </div>
      </li>
      <li @click="goInform()" >
        <div class="photo pink">
          <i class="fa fa-volume-up" aria-hidden="true"></i>
        </div>
        <div class="category">
          <div class="right">
            <div class="category" v-if="informLists != undefined">
              <span class="title">通知</span>
              <span class="gray">{{informLists[0].messageTime}}</span>
            </div>
            <div class="gray">{{informLists[0].messageTitle}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      informLists: []
    }
  },
  created() {
    this.axios({
      url: "/user/message/getMessages?userId=1001",
      methods: "GET"
    }).then(res => {
      console.log("消息列表", res.data.data);
      this.informLists = res.data.data;
      console.log(this.informLists[0].messageTime);
    });
  },
  methods: {
    goback() {
      this.$router.push("/");
    },
    goInfoComment() {
      this.$router.push("/infocomment");
    },
    goInfoLike() {
      this.$router.push("/infolike");
    },
    goInform() {
      this.$router.push("/inform");
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";

.top {
  width: 750px;
  height: 80px;
  background: @themeColor;
  padding-top: 40px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  h3 {
    /* width: 80%; */
    width: 70%;
    color: white;
    font-weight: 500;
    font-size: 36px;
    /*  margin-bottom: 10px; */
    letter-spacing: 2px;
    /* line-height: 80px; */
  }
  i {
    color: white;
    font-size: 54px;
  }
}
ul {
  width: 710px;
  margin: 0 auto;
  li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100px;

    .photo {
      width: 80px;
      height: 80px;
      background: red;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        color: white;
      }
    }
    .right {
      width: 610px;
      height: 90px;
      border-bottom: 1px solid gainsboro;
      margin-left: 20px;

      font-size: 30px;
      .category {
        display: flex;
        justify-content: space-between;

        .title {
          font-weight: 600;
        }
      }
    }
    .blue {
      background: rgb(60, 156, 235);
    }
    .orange {
      background: rgb(247, 207, 31);
    }
    .pink {
      background: rgb(253, 145, 163);
    }
  }
}
.gray {
  color: gray;
  font-size: 26px;
}
.reply {
  display: inline-block;
  height: 100px;
  line-height: 100px;
}
</style>