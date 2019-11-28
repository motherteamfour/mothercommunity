 <template>
  <div class="encyclopedia">
    <!-- 标题搜索 -->
    <div class="search">
      <div class="headline">百科</div>
      <input type="text" class="seek" placeholder="搜索百科文章" />
    </div>

    <!-- 边导航 -->
    <div class="sidebar"></div>

    <!-- 文章列表 -->
    <div class="list"></div>
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
</style>