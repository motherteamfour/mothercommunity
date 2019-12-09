<template>
  <div class="content">
    <div class="ret-fo">
      <div class="ret">
        <i class="fa fa-angle-left" @click="back()"></i>
        <div class="retbai">百科</div>
        <div style="width:25px;"></div>
      </div>
    </div>

    <div class="contents">
      <ul>
        <li class="line" v-for="(itme, index) in  lines[0]" :key="index" @click="backs(isActive)">
          <div class="line-dv">
            <div class="line-di">{{itme.linesName}}</div>
            <div class="line-span">
              <span>{{itme.linsTat}}</span>
              <span>{{itme.linsTime}}次浏览</span>
            </div>
          </div>
          <div class="line-img">
            <img :src="itme.linsImg" alt />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import Encyclopedia from "./Encyclopedia";
export default {
  name: "EncyclopediaSon",
  //   methods:{
  //           liness(i) {
  //       this.isActive = i;
  //       console.log(i);
  //     }
  //   },
  data() {
    return {
      isActive: 0,
      lines: [
        [
          {
            linesId: 0,
            linesName: "怀孕最佳的月份是什么时候?",
            linsTat: "备孕 好孕指南",
            linsTime: "5397",
            linsImg: require("../assets/img/baike/ts2.jpg")
          },
          {
            linesId: 1,
            linesName: "二胎备孕注意事项",
            linsTat: "备孕 好孕指南",
            linsTime: "5397",
            linsImg: require("../assets/img/baike/ts7.jpg")
          },
          {
            linesId: 2,
            linesName: "孕早期有必要大补营养吗?",
            linsTat: "备孕 好孕指南",
            linsTime: "5397",
            linsImg: require("../assets/img/baike/ts4.jpg")
          },
          {
            linesId: 3,
            linesName: "如何让宝宝遗传父母优点",
            linsTat: "备孕 好孕指南",
            linsTime: "5397",
            linsImg: require("../assets/img/baike/ts5.jpg")
          },
          {
            linesId: 4,
            linesName: "试管婴儿会遗传基因吗?",
            linsTat: "备孕 好孕指南",
            linsTime: "5397",
            linsImg: require("../assets/img/baike/ts6.jpg")
          },
          {
            linesId: 5,
            linesName: "要生龙凤胎，多吃叶酸",
            linsTat: "备孕 好孕指南",
            linsTime: "5397",
            linsImg: require("../assets/img/baike/ts8.jpg")
          },
          {
            linesId: 6,
            linesName: "什么时候怀孕容易生男孩",
            linsTat: "备孕 好孕指南",
            linsTime: "5397",
            linsImg: require("../assets/img/baike/ts7.jpg")
          },
          {
            linesId: 7,
            linesName: "男奴的最佳受孕季节",
            linsTat: "备孕 好孕指南",
            linsTime: "5397",
            linsImg: require("../assets/img/baike/ts5.jpg")
          }
        ]
      ]
    };
  },
  methods: {
    back() {
      this.$router.replace("/encyclopedia");
    },
    backs(i) {
      this.$router.replace("/encyclopediaSons");
      this.lines[this.isActive][i].linsTime += 1;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
@import "../assets/style/Encycloped.less";
.ret-fo {
  width: 100%;
  height: 100px;
  position: relative;
}

.ret {
  width: 100%;
  height: 100px;
  background: @themeColor;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
}


.content {
  width: 750px;
  height: 1334px;
}

.retbai {
  color: @oneColor;
  font-size: 24px;
}
.fa {
  width: 50px;
  color: @oneColor;
  font-size: 60px;
  text-align: center;
}

.contents {
  width: 94%;
  margin: auto;
}

/* li 渲染 */
.line {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: @fourBorder;
  margin: 8px 0;
  // box-shadow: 2px 2px 10px rgb(138, 129, 129);
  // border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  // text-align: center;
}

/* 文章内容 */
.line-dv {
  width: 64%;
  //   display: flex;
  //   align-items: space-between;
}

/* 标题 */
.line-di {
  font-size: 36px;
  margin-bottom: 66px;
}

/* 浏览量 */
.line-span {
  font-size: 16px;
  color: @fiveColor;
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
}
/* 图片div */
.line-img {
  width: 36%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line-img img {
  width: 100%;
  height: 150px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px #999;
}
</style>