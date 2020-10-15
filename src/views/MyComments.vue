<template>
  <div class="my-comments">
    <hm-header>我的跟帖</hm-header>
    <!-- 列表 -->
    <div class="list">
      <van-list
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <!-- 1. 时间 -->
          <div class="time">
            {{ item.create_date | date('YYYY-MM-DD hh:mm') }}
          </div>
          <!--  -->
          <div class="parent-comment" v-if="item.parent">
            <div class="parent-name">
              回复 : {{ item.parent.user.nickname }}
            </div>
            <div class="parent-content">
              {{ item.parent.content }}
            </div>
          </div>

          <!-- 2 我的内容 -->
          <div class="content">{{ item.content }}</div>

          <!-- 3. 原文 -->
          <div class="link">
            <div class="title">{{ item.post.title }}</div>
            <i class="iconfont iconjiantou1"></i>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
    }
  },
  created() {
    this.getCommentsList()
  },
  methods: {
    getCommentsList() {
      this.$axios
        .get('user_comments', {
          params: {
            pageIndex: this.pageIndex,
            pageSize: 5,
          },
        })
        .then((res) => {
          this.list = [...this.list, ...res.data.data]
          this.loading = false
          if (res.data.data.length < 5) {
            this.finished = true
          }
        })
    },
    onLoad() {
      console.log('我触底了')
      setTimeout(() => {
        this.pageIndex++
        this.getCommentsList()
      }, 2000)
    },
  },
}
</script>

<style scoped lang="less">
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  .time {
    color: #999;
    height: 30px;
    line-height: 30px;
  }
  .content {
    font-size: 16px;
    padding: 10px 0;
  }
  .link {
    color: #999;
    display: flex;
    // margin-top: 10px;
    // justify-content: space-between;
    .title {
      flex: 1;
    }
    i {
      width: 50px;
      text-align: right;
    }
  }
  .parent-comment {
    padding: 10px;
    background: #cccccc;
    color: #666;
    line-height: 20px;
    .parents-name {
      height: 25px;
      line-height: 25px;
    }
  }
}
</style>