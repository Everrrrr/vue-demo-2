<template>
  <div class="user">
    <hm-header>个人中心</hm-header>
    <div class="info">
      <div class="left">
        <!-- <img :src="'http://127.0.0.1:3000' + info.head_img" alt /> -->
        <img :src="$axios.defaults.baseURL + info.head_img" alt />
      </div>
      <!-- 中 -->
      <div class="center">
        <div class="name">
          <i v-if="info.gender === 1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i>
          <span>{{ info.nickname }}</span>
        </div>
        <div class="time">{{ info.created_date | date }}</div>
      </div>
      <!-- ---- 防盗链 -->
      <!-- <meta name="referrer" content="no-referrer" /> -->
    </div>
    <van-cell-group>
      <van-cell
        title="我的关注"
        is-link
        value="关注的用户"
        @click="$router.push('/myfollow')"
      />
      <van-cell
        title="我的跟帖"
        is-link
        value="跟帖/回复"
        @click="$router.push('/mycomments')"
      />
      <van-cell
        title="我是收藏"
        is-link
        value="文档/视频"
        @click="$router.push('/mystar')"
      />
      <van-cell title="设置" is-link @click="$router.push('/edit')" />
      <van-cell title="退出" is-link @click="logout" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
    }
  },
  created() {
    let token = localStorage.getItem('token')
    let id = localStorage.getItem('user_id')
    this.$axios.get(`/user/${id}`).then((res) => {
      console.log('获取用户详情', res.data)
      const { statusCode, data, message } = res.data
      if (statusCode === 200) {
        this.info = data
      } else {
        this.$toast.fail(message)
      }
    })
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '您确定要退出账户吗?',
        })
        .then(() => {
          console.log('确定')
          localStorage.removeItem('token')
          localStorage.removeItem('user_id')
          this.$toast.success('退出成功')
          this.$router.push('/login')
        })
        .catch(() => {
          console.log('取消')
        })
    },
  },
}
</script>

<style scoped lang="less">
.info {
  height: 100px;
  border-bottom: 2px solid #cccccc;

  display: flex;
  padding: 0 20px;
  align-items: center;

  .left {
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .center {
    flex: 1;
    padding-left: 20px;
    height: 50px;
    line-height: 25px;
    font-size: 14px;
    .name {
      color: #000;
    }
  }
}
</style>
