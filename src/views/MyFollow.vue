<template>
  <div class="my-follow">
    <hm-header>我的关注</hm-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" alt />
        </div>
        <div class="center">
          <div class="name">{{ item.nickname }}</div>
          <div class="date">{{ item.created_date | date }}</div>
        </div>
        <div class="right" @click="unfollow(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    }
  },

  created() {
    // this.getFollowList()
    this.follow()
  },
  methods: {
    getFollowList() {
      this.$axios.get('/user_follows').then((res) => {
        this.list = res.data.data
      })
    },
    unfollow(id) {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '你确定要删除吗',
        })
        .then(() => {
          this.$axios.get(`/user_unfollow/${id}`).then((res) => {
            this.$toast.success(res.data.message)
            this.getFollowList()
          })
        })
        .catch(() => {
          console.log('取消')
        })
    },
    follow() {
      this.$axios.get('/user_follows/2').then((res) => {
        this.getFollowList()
      })
    },
  },
}
</script>

<style scoped lang="less">
.item {
  height: 90px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 0 20px;
  .left {
    img {
      width: 60px;
      height: 60px;
      display: block;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    padding-left: 10px;
    .name {
      font-size: 14px;
    }
    .date {
      color: #999;
      font-size: 12px;
    }
  }
  .right {
    height: 30px;
    line-height: 30px;
    background: #ddd;
    border-radius: 15px;
    padding: 0 15px;
    color: #000;
  }
}
</style>