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
    <!-- tab栏 -->
    <van-sticky :offset-top="0" z-index="999">
      <div class="container" @click="$router.push('/tabedit')">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </van-sticky>

    <van-tabs v-model="active" sticky>
      <van-tab :title="tabs.name" v-for="tabs in tabsList" :key="tabs.id">
        <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
          <van-list
            offset="50"
            v-model="loading"
            :finished="finished"
            @load="onLoad"
            finished-text="没有更多内容了"
            :immediate-check="false"
          >
            <hm-post
              @click.native="$router.push(`/detail/${post.id}`)"
              v-for="(post, index) in postList"
              :key="index"
              :post="post"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      tabsList: [],
      postList: [],
      active: 1,
      // 当前页
      pageIndex: 1,
      // 每页的条数
      pageSize: 5,
      loading: false, // 是否正在加载 控制加载的状态
      finished: false,
      isRefreshing: false,
    }
  },
  watch: {
    active(value) {
      this.postList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      this.getPostList(this.tabsList[value].id)
    },
  },
  created() {
    this.getTabsList()
  },
  methods: {
    async getTabsList() {
      let activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
      if (activeTabs) {
        this.tabsList = activeTabs
        this.getPostList(this.tabsList[this.active].id)
        return
      }
      let res = await this.$axios.get('/category')
      this.tabsList = res.data.data
      // 请求文章列表
      this.getPostList(this.tabsList[this.active].id)
    },
    async getPostList(id) {
      let res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      })
      //  if (this.postList.length > 0 && this.pageIndex === 1) {
      //      this.postList = []
      // }
      this.postList = [...this.postList, ...res.data.data]
      this.loading = false
      if (res.data.data.length < 5) {
        this.finished = true
      }
      this.isRefreshing = false
      console.log('文章列表', this.postList)
    },
    onLoad() {
      console.log('触底了')
      this.pageIndex++
      this.getPostList(this.tabsList[this.active].id)
    },
    onRefresh() {
      setTimeout(() => {
        this.postList = []
        this.pageIndex = 1
        // 处理文字
        this.finished = false
        this.loading = true
        this.getPostList(this.tabsList[this.active].id)
      }, 1000)
    },
  },
}
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
.container {
  width: 40px;
  height: 43.98px;
  line-height: 43.98px;
  text-align: center;

  background: #ddd;
  position: absolute;
  right: 0;
  z-index: 999; // 添加 z-index 点击方可
}

/deep/ .van-tabs__nav {
  background: #ddd;
  margin-right: 40px;
}
</style>
