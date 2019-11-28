 <template>
  <div class="encyclopedia">
    <!-- 标题搜索 -->
    <div class="search">
      <div class="headline">百科</div>
      <input type="text" class="seek" placeholder="搜索百科文章" />
    </div>

    <div class="con">
      <!-- 边导航 -->
      <div class="sidebar">
        <ul>
          <li>
            <a href="javascript:;">备孕</a>
          </li>
          <li>
            <a href="javascript:;">怀孕</a>
          </li>
          <li>
            <a href="javascript:;">产后</a>
          </li>
          <li>
            <a href="javascript:;">育儿</a>
          </li>
          <li>
            <a href="javascript:;">其他</a>
          </li>
        </ul>
      </div>

      <!-- 文章列表 -->
      <div class="list">
        <ul class="listul">

          <li>
            <a href>
              <img src="../assets/img/login/denglu.png" alt />
              <p><span>#</span>好孕指南</p>
            </a>
          </li>

          <li>
            <a href>
              <img src="../assets/img/login/denglu.png" alt />
              <p><span>#</span>好孕指南</p>
            </a>
          </li>

          <li>
            <a href>
              <img src="../assets/img/login/denglu.png" alt />
              <p><span>#</span>好孕指南</p>
            </a>
          </li>

        </ul>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Encyclopedia"
};
</script>

<style lang="less" scoped>
@oneColor: #fff;
@themeColor: #ffe469;
@twoSize: 36px; // 页面字体大小
@fourBorder: 1px solid #ddd; // 分割线
@fiveColor: #666;

/* .encyclopedia{
  width: 750px;
  height: 1334px;
} */
.search {
  width: 100%;
  border-bottom: @fourBorder;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

/* 标题 */
.headline {
  width: 100%;
  height: 120px;
  background: @themeColor;
  color: @oneColor;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: @twoSize;
}
.seek {
  width: 90%;
  height: 60px;
  line-height: 60px;
  background: #ddd;
  border: none;
  border-radius: 50px;
  text-align: center;
  margin: 20px 0;
}
::-webkit-input-placeholder {
  color: @fiveColor;
}

// 导航文章
.con {
  display: flex;
  justify-content: space-between;
}

/* 导航 */
.sidebar{
  width: 20%;
}
.sidebar li{
  height: 90px;
  border-bottom: @fourBorder;
  display: flex;
  justify-content: center;
  align-items: center;

}
.sidebar a{
  font-size: @twoSize;
  color: @fiveColor;
}

/* 文章 */
.list{
  width: 80%;
}
.listul{
  display: flex;
  justify-content: space-around;
}
.listul li{
  text-align: center;
}
.listul p{
  font-size: 24px;
  color: @fiveColor;
}
.listul span{
  color: @themeColor;
}
</style>