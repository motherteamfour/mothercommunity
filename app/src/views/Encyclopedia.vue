<template>
  <div class="encyclopedia">
    <div class="ret-fo">
      <div class="fo">
        <div class="title">百科</div>
        <div class="seek">
          <input type="text" class="ipt" placeholder="搜索文章" />
        </div>
      </div>
    </div>

    <div class="content">
      <!-- 导航 -->

      <div class="ret-fof">
        <div class="nav">
          <ul>
            <li
              v-for="(item, index) in navul"
              :key="index"
              @click="navs(item.navulId)"
              :class="{on: isActive==item.navulId}"
            >{{item.navulName}}</li>
          </ul>
        </div>
      </div>

      <!-- 文章说明 -->
      <div class="show">
        <ul class="showul">
          <li v-for="(item, index) in isnav[isActive]" :key="index" @click="goSon()">
            <img class="imgs" :src="item.isnavImg" alt />
            <span style="color:#FF8A9A;">#</span>
            {{item.isnavName}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
// import EncyclopediaSon from "./EncyclopediaSon";
export default {
  name: "Encyclopedia",
  components: {
    // 注册组件
  },
  methods: {
    // 定义方法
    navs(i) {
      this.isActive = i;
      console.log(i);
    },
    goSon() {
      this.$router.replace("/encyclopediason");
    }
  },
  data() {
    // 模拟数据
    return {
      isActive: 0,
      navul: [
        {
          navulId: 0,
          navulName: "备孕"
        },
        {
          navulId: 1,
          navulName: "怀孕"
        },
        {
          navulId: 2,
          navulName: "产后"
        },
        {
          navulId: 3,
          navulName: "育儿"
        },
        {
          navulId: 4,
          navulName: "其他"
        }
      ],
      isnav: [
        [
          // 下标0的数组 备孕
          {
            isnavId: 0,
            isnavImg: require("../assets/img/touxiang/dt11.jpg"),
            isnavName: "备孕必知"
          },
          {
            isnavId: 1,
            isnavImg: require("../assets/img/touxiang/dt16.jpg"),
            isnavName: "受孕时间"
          },
          {
            isnavId: 2,
            isnavImg: require("../assets/img/touxiang/dt13.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 3,
            isnavImg: require("../assets/img/touxiang/dt4.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 4,
            isnavImg: require("../assets/img/touxiang/dt16.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 5,
            isnavImg: require("../assets/img/touxiang/dt17.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 6,
            isnavImg: require("../assets/img/touxiang/dt15.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 7,
            isnavImg: require("../assets/img/touxiang/dt8.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 8,
            isnavImg: require("../assets/img/touxiang/dt5.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 9,
            isnavImg: require("../assets/img/touxiang/dt4.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 10,
            isnavImg: require("../assets/img/touxiang/dt3.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 11,
            isnavImg: require("../assets/img/touxiang/dt2.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 12,
            isnavImg: require("../assets/img/touxiang/dt13.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 13,
            isnavImg: require("../assets/img/touxiang/dt14.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 14,
            isnavImg: require("../assets/img/touxiang/dt15.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 15,
            isnavImg: require("../assets/img/touxiang/dt16.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 16,
            isnavImg: require("../assets/img/touxiang/dt17.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 17,
            isnavImg: require("../assets/img/touxiang/dt18.jpg"),
            isnavName: "备孕禁忌"
          }
        ], // 下标1的数组 怀孕
        [
          {
            isnavId: 0,
            isnavImg: require("../assets/img/touxiang/dt18.jpg"),
            isnavName: "备孕必知"
          },
          {
            isnavId: 1,
            isnavImg: require("../assets/img/touxiang/dt16.jpg"),
            isnavName: "受孕时间"
          },
          {
            isnavId: 2,
            isnavImg: require("../assets/img/touxiang/dt17.jpg"),
            isnavName: "孕妇零食"
          },
          {
            isnavId: 3,
            isnavImg: require("../assets/img/touxiang/dt15.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 4,
            isnavImg: require("../assets/img/touxiang/dt14.jpg"),
            isnavName: "维生素"
          },
          {
            isnavId: 5,
            isnavImg: require("../assets/img/touxiang/dt13.jpg"),
            isnavName: "孕妇补钙"
          },
          {
            isnavId: 6,
            isnavImg: require("../assets/img/touxiang/dt12.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 7,
            isnavImg: require("../assets/img/touxiang/dt11.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 8,
            isnavImg: require("../assets/img/touxiang/dt5.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 9,
            isnavImg: require("../assets/img/touxiang/dt4.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 10,
            isnavImg: require("../assets/img/touxiang/dt3.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 11,
            isnavImg: require("../assets/img/touxiang/dt2.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 12,
            isnavImg: require("../assets/img/touxiang/dt1.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 13,
            isnavImg: require("../assets/img/touxiang/dt10.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 14,
            isnavImg: require("../assets/img/touxiang/dt6.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 15,
            isnavImg: require("../assets/img/touxiang/dt8.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 16,
            isnavImg: require("../assets/img/touxiang/dt7.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 17,
            isnavImg: require("../assets/img/touxiang/dt1.jpg"),
            isnavName: "备孕禁忌"
          }
        ], // 下标2的数组  产后
        [
          {
            isnavId: 0,
            isnavImg: require("../assets/img/touxiang/dt12.jpg"),
            isnavName: "备孕必知"
          },
          {
            isnavId: 1,
            isnavImg: require("../assets/img/touxiang/dt11.jpg"),
            isnavName: "月子饮食"
          },
          {
            isnavId: 2,
            isnavImg: require("../assets/img/touxiang/dt12.jpg"),
            isnavName: "产后发汗"
          },
          {
            isnavId: 3,
            isnavImg: require("../assets/img/touxiang/dt8.jpg"),
            isnavName: "产后出血"
          },
          {
            isnavId: 4,
            isnavImg: require("../assets/img/touxiang/dt10.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 5,
            isnavImg: require("../assets/img/touxiang/dt18.jpg"),
            isnavName: "每月恢复"
          },
          {
            isnavId: 6,
            isnavImg: require("../assets/img/touxiang/dt17.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 7,
            isnavImg: require("../assets/img/touxiang/dt16.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 8,
            isnavImg: require("../assets/img/touxiang/dt10.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 9,
            isnavImg: require("../assets/img/touxiang/dt11.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 10,
            isnavImg: require("../assets/img/touxiang/dt7.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 11,
            isnavImg: require("../assets/img/touxiang/dt6.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 12,
            isnavImg: require("../assets/img/touxiang/dt12.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 13,
            isnavImg: require("../assets/img/touxiang/dt5.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 14,
            isnavImg: require("../assets/img/touxiang/dt15.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 15,
            isnavImg: require("../assets/img/touxiang/dt13.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 16,
            isnavImg: require("../assets/img/touxiang/dt17.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 17,
            isnavImg: require("../assets/img/touxiang/dt8.jpg"),
            isnavName: "备孕禁忌"
          }
        ], // 下表3的数组 育儿
        [
          {
            isnavId: 0,
            isnavImg: require("../assets/img/touxiang/dt10.jpg"),
            isnavName: "备孕必知"
          },
          {
            isnavId: 1,
            isnavImg: require("../assets/img/touxiang/dt8.jpg"),
            isnavName: "受孕时间"
          },
          {
            isnavId: 2,
            isnavImg: require("../assets/img/touxiang/dt3.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 3,
            isnavImg: require("../assets/img/touxiang/dt17.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 4,
            isnavImg: require("../assets/img/touxiang/dt12.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 5,
            isnavImg: require("../assets/img/touxiang/dt16.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 6,
            isnavImg: require("../assets/img/touxiang/dt1.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 7,
            isnavImg: require("../assets/img/touxiang/dt8.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 8,
            isnavImg: require("../assets/img/touxiang/dt5.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 9,
            isnavImg: require("../assets/img/touxiang/dt4.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 10,
            isnavImg: require("../assets/img/touxiang/dt7.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 11,
            isnavImg: require("../assets/img/touxiang/dt2.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 12,
            isnavImg: require("../assets/img/touxiang/dt13.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 13,
            isnavImg: require("../assets/img/touxiang/dt14.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 14,
            isnavImg: require("../assets/img/touxiang/dt15.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 15,
            isnavImg: require("../assets/img/touxiang/dt16.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 16,
            isnavImg: require("../assets/img/touxiang/dt17.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 17,
            isnavImg: require("../assets/img/touxiang/dt18.jpg"),
            isnavName: "备孕禁忌"
          }
        ], // 下表4的数组 其他
        [
          {
            isnavId: 0,
            isnavImg: require("../assets/img/touxiang/dt13.jpg"),
            isnavName: "备孕必知"
          },
          {
            isnavId: 1,
            isnavImg: require("../assets/img/touxiang/dt6.jpg"),
            isnavName: "受孕时间"
          },
          {
            isnavId: 2,
            isnavImg: require("../assets/img/touxiang/dt12.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 3,
            isnavImg: require("../assets/img/touxiang/dt2.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 4,
            isnavImg: require("../assets/img/touxiang/dt11.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 5,
            isnavImg: require("../assets/img/touxiang/dt17.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 6,
            isnavImg: require("../assets/img/touxiang/dt8.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 7,
            isnavImg: require("../assets/img/touxiang/dt7.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 8,
            isnavImg: require("../assets/img/touxiang/dt5.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 9,
            isnavImg: require("../assets/img/touxiang/dt15.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 10,
            isnavImg: require("../assets/img/touxiang/dt3.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 11,
            isnavImg: require("../assets/img/touxiang/dt5.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 12,
            isnavImg: require("../assets/img/touxiang/dt13.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 13,
            isnavImg: require("../assets/img/touxiang/dt14.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 14,
            isnavImg: require("../assets/img/touxiang/dt15.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 15,
            isnavImg: require("../assets/img/touxiang/dt16.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 16,
            isnavImg: require("../assets/img/touxiang/dt17.jpg"),
            isnavName: "备孕禁忌"
          },
          {
            isnavId: 17,
            isnavImg: require("../assets/img/touxiang/dt18.jpg"),
            isnavName: "备孕禁忌"
          }
        ]
      ]
    };
  }
};
</script>


<style lang="less" scoped>
@import "../assets/style/base.less";
@import "../assets/style/Encycloped.less";

// 上方共有数据

/* 百科全书 */
.encyclopedia {
  width: 750px;
  height: 1334px;
  background: @oneColor;
}
.ret-fo {
  width: 100%;
  height: 204px;
  position: relative;
}
.fo {
  width: 100%;
  background: @oneColor;
  position: fixed;
  top: 0;
}

/* 标题栏 */
.title {
  .wht();
  background: @themeColor;
  font-size: @twoSize;
  color: @oneColor;
  .flexCenter(); // 水平垂直居中
}

/* 搜索 */
.seek {
  width: 100%;
  height: 100px;
  border: @fourBorder;
  .flexCenter(); // 水平垂直居中
}
.ipt::-webkit-input-placeholder {
  color: @fiveColor;
  text-align: center;
}
.ipt {
  width: 80%;
  height: 50px;
  background: @sixColor;
  border: none;
  border-radius: 50px;
}

/* 内容 */
.content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

/* 导航固定 */
// .ret-fof{
//   width: 20%;
//   position: relative;
// }

.nav {
  width: 20%;
  position: fixed;
  // top: 204px;
  // left: 0;
}

.nav li {
  height: 80px;

  .flexCenter();
  .sizeBorder();
}

.on {
  color: @themeColor !important; //权重方法
  border-left: 2px solid @themeColor !important;
  // box-shadow: 2px 2px 10px @themeColor !important;
}

/* 文章说明 */
.show {
  width: 80%;
}
.showul {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 20px;
}
.show li {
  width: 120px;
  height: 200px;
  // background: red;
  font-size: 12px;
  color: @fiveColor;
  text-align: center;
  margin: 0 20px;
}

.bb {
  width: 100px;
  height: 100px;
}

.imgs {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>