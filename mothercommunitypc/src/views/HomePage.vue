<template>
  <div class="homePage">
    <div class="head" v-loading.fullscreen.lock="fullscreenLoading">
      <el-row :gutter="12" class="head-card">
        <el-col :span="4">
          <el-card shadow="always">{{title}}数据</el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            新增用户量
            <p class="head-number">{{countUser}}</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            新增帖子量
            <p class="head-number">{{countPost}}</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            新增回复量
            <p class="head-number">{{countComment}}</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            新增问题量
            <p class="head-number">{{countQuestion}}</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            新增回答量
            <p class="head-number">{{countAnswer}}</p>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="homePage-search">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-button type="button" class="homePage-btn" @click="getCount">确定</el-button>
    </div>
    <div id="chart1"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countAnswer: "",
      countComment: "",
      countPost: "",
      countQuestion: "",
      countUser: "",
      title: "今天",
      options: [
        {
          value: "0",
          label: "当天"
        },
        {
          value: "1",
          label: "昨天"
        },
        {
          value: "2",
          label: "7日内"
        },
        {
          value: "3",
          label: "30日内"
        }
      ],
      value: "",
      fullscreenLoading: false
    };
  },
  mounted() {
    console.log("这是自动执行");
    this.fullscreenLoading = true;
    this.axios
      .get("/posterior/dateStatistics/countNewAdds?groupType=0")
      .then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.fullscreenLoading = false;
          this.countAnswer = res.data.data.countAnswer;
          this.countComment = res.data.data.countComment;
          this.countPost = res.data.data.countPost;
          this.countQuestion = res.data.data.countQuestion;
          this.countUser = res.data.data.countUser;

          this.creatEchart();
        }else {
          this.fullscreenLoading = false;
          this.defeated('服务器出错，请稍后重试');
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    creatEchart() {
      var myChart = this.echarts.init(document.getElementById("chart1"));

      myChart.setOption({
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "新增用户量",
              "新增帖子量",
              "新增回复量",
              "新增问题量",
              "新增回答量"
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "新增量",
            type: "bar",
            barWidth: "60%",
            data: [
              this.countUser,
              this.countPost,
              this.countComment,
              this.countQuestion,
              this.countAnswer
            ]
          }
        ]
      });
    },
    success(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "success"
      });
    },
    defeated(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "error"
      });
    },
    getCount() {
      console.log(this.value);
      this.fullscreenLoading = true;
      switch (this.value) {
        case '0':
          this.title = "今天";
          break;
        case '1':
          this.title = "昨天";
          break;
        case '2':
          this.title = "7日内";
          break;
        case '3':
          this.title = "30日内";
          break;
      }
      
      this.axios
        .get("/posterior/dateStatistics/countNewAdds?groupType=" + this.value)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.fullscreenLoading = false;
            this.countAnswer = res.data.data.countAnswer;
            this.countComment = res.data.data.countComment;
            this.countPost = res.data.data.countPost;
            this.countQuestion = res.data.data.countQuestion;
            this.countUser = res.data.data.countUser;

            this.creatEchart();
          }else {
          this.fullscreenLoading = false;
          this.defeated('服务器出错，请稍后重试');
        }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.homePage {
  width: 100%;
  height: 100%;
  background: #fff;
  margin: 10px;
  .head {
    width: 100%;
    height: 20%;
    border-bottom: 1px solid #aaa;

    .head-card {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      padding: 20px;
    }
    .head-number {
      font-size: 28px;
      color: #666;
      padding: 5px 0 10px;
    }
  }
  #chart1 {
    width: 80%;
    height: 60%;
  }
  .homePage-search {
    margin: 20px 20px;
    text-align: left;

    .homePage-btn {
      background-color: #009688;
      color: #fff;
    }
    .homePage-btn:hover {
      opacity: 0.8;
    }
  }
}
</style>