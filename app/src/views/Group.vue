<template>
  <div class="group">
    <header>
      <nav>
        <div class="back" @click="back">
          <i class="fa fa-angle-left fa-2x"></i>
        </div>
      </nav>
      <div class="group-info">
        <p class="group-name">怀孕圈</p>
        <p class="group-num">帖子数 2658</p>
      </div>
    </header>
    <section class="hot">
      <p class="hot-title">全部帖子</p>
      <HotList
        v-for="(item, index) in contact"
        :key="index"
        :list="item"
        @followFn="follow"
        @praiseFn="praise"
        @collectFn="collect"
      ></HotList>
    </section>
  </div>
</template>

<script>
import HotList from "@/components/HotList.vue";
export default {
  name: "Group",
  data() {
    return {
      groupId: "",
      contact: [
        {
          id: 0,
          imgUrl: "",
          username: "jack",
          isFollowed: 0,
          isPraise: 0,
          isCollect: 0,
          title: "标题",
          content:
            "大富翁发大水发射点法撒旦发射点分啊违法违法的是妇科检查士大夫哦额罚你发viji",
          praise: 4,
          comments: 11,
          collect: 10
        },
        {
          id: 1,
          imgUrl: "",
          username: "张三",
          isFollowed: 1,
          isPraise: 0,
          isCollect: 1,
          title: "标题2",
          content:
            "大富翁发大水发射点法撒旦发射点分啊违法违法的是妇科检查士大夫哦额罚你发viji",
          praise: 4,
          comments: 11,
          collect: 10
        },
        {
          id: 2,
          imgUrl: "",
          username: "李四",
          isFollowed: 1,
          isPraise: 1,
          isCollect: 0,
          title: "朋友",
          content:
            "大富翁发大水发射点法撒旦发射点分啊违法违法的是妇科检查士大夫哦额罚你发viji",
          praise: 4666,
          comments: 11,
          collect: 10
        },
        {
          id: 3,
          imgUrl: "",
          username: "王五",
          isFollowed: 1,
          isPraise: 1,
          isCollect: 1,
          title: "同学",
          content:
            "大富翁发大水发射点法撒旦发射点分啊违法违法的是妇科检查士大夫哦额罚你发viji",
          praise: 455,
          comments: 551,
          collect: 5
        }
      ]
    };
  },
  components: {
    HotList
  },
  methods: {
    follow(i) {
      this.contact[i].isFollowed = !this.contact[i].isFollowed;
    },
    praise(i) {
      this.contact[i].isPraise = !this.contact[i].isPraise;
    },
    collect(i) {
      this.contact[i].isCollect = !this.contact[i].isCollect;
    },
     back(){
        this.$router.go(-1);//返回上一层
    }
  },
  created() {
    this.groupId = this.$route.params.id;
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.group {
  background: rgb(248, 248, 248);
}
header {
  width: 100%;
  height: 300px;
  background: rgb(255, 213, 224);
  padding-top: 40px;
  nav {
    width: 100%;
    height: 96px;
    line-height: 96px;
    .back {
      width: 50px;
      height: 90px;
      text-align: center;
    }
  }
  .group-info {
    text-align: center;
    color: #000;
    .group-name {
      font-size: 36px;
    }
    .group-num {
      font-size: 30px;
      margin-top: 20px;
    }
  }
}

.hot {
  border-radius: 10px;
  box-shadow: 0 0 15px #ddd;
  box-sizing: border-box;
  width: calc(100% - 40px);
  margin: 20px;
  padding: 20px 0;
  background: #fff;
  .hot-title {
    font-size: 30px;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
}
</style>