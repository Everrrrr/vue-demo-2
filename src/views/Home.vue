<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="center">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <div class="right">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.header {
  height: 60px;
  background-color: red;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  .left {
    width: 60px;
  }
  .iconnew {
    font-size: 50px;
  }
  .iconwode {
    font-size: 26px;
  }
  .center {
    flex: 1;
    background: rgba(255, 255, 255, 0.5);
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    .iconsearch {
      font-size: 14px;
      margin-right: 20px;
    }
    span {
      font-size: 14px;
    }
  }
  .right {
    width: 60px;
  }
}
</style>