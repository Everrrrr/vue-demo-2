<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="center">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="right">
        <div @click="unfollow" v-if="detail.has_follow" class="followed">
          已关注
        </div>
        <div @click="follow" v-else class="followed">关注</div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="detail-content">
      <!-- 标题 -->
      <div class="title">{{ detail.title }}</div>
      <!-- 新闻作者和时间 -->
      <div class="user">
        <div>{{ detail.user.nickname }}</div>
        <div>{{ detail.create_date | date }}</div>
      </div>
      <!-- 内容 -->
      <div
        v-if="detail.type == 1"
        class="content"
        v-html="detail.content"
      ></div>
      <video v-else :src="detail.content" controls></video>
      <!-- 点赞 -->
      <div class="btns">
        <div class="like" @click="like" :class="{ active: detail.has_like }">
          <i class="iconfont icondianzan"></i>
          <span>{{ detail.like_length }}</span>
        </div>
      </div>
    </div>
    <!-- 评论 -->
    <div ref="box"></div>
    <div class="comments">
      <hm-comment
        v-for="item in commentList"
        :key="item.id"
        :comment="item"
      ></hm-comment>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <div class="input" v-if="!isShow">
        <input type="text" @focus="handleFocus" placeholder="写跟帖" />
        <i class="iconfont iconpinglun-">
          <i class="counter">{{ detail.comment_length }}</i>
        </i>
        <i
          class="iconfont iconshoucang"
          @click="star"
          :class="{ active: detail.has_star }"
        ></i>
        <i class="iconfont iconfenxiang"></i>
      </div>
      <div class="textarea" v-else>
        <textarea
          v-model="content"
          @blur="handleBlur"
          :placeholder="replyName ? '回复 :' + replyName : '请输入内容'"
          ref="textarea"
        ></textarea>
        <div class="send" @mousedown="send">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {
        user: {},
      },
      commentList: [],
      isShow: false,
      replyId: 0,
      replyName: '',
      content: '',
    }
  },
  created() {
    this.getDetail()
    this.getCommentsList()
    this.$bus.$on('reply', async (replyId, replyName) => {
      this.replyId = replyId
      this.replyName = replyName

      this.isShow = true
      await this.$nextTick()
      if (this.$refs.textarea) {
        this.$refs.textarea.focus()
      }
    })
  },
  methods: {
    async getDetail() {
      let res = await this.$axios.get(`post/${this.$route.params.id}`)
      this.detail = res.data.data
    },
    // 获取评论列表
    async getCommentsList() {
      let res = await this.$axios.get(`/post_comment/${this.$route.params.id}`)

      console.log('文章评论', res)
      this.commentList = res.data.data
    },
    async unfollow() {
      let token = localStorage.getItem('token')
      if (!token) {
        this.$toast.fail('请先登录')
        this.$router.push({
          name: 'login',
          params: {
            back: true,
          },
        })
        return
      }
      let res = await this.$axios.get(`/user_unfollow/${this.detail.user.id}`)
      this.$toast.success(res.data.message)
      this.getDetail()
    },
    async follow() {
      let token = localStorage.getItem('token')
      if (!token) {
        this.$toast.fail('请先登录')
        this.$router.push({
          name: 'login',
          params: {
            back: true,
          },
        })
        return
      }
      let res = await this.$axios.get(`/user_follows/${this.detail.user.id}`)
      this.$toast.success(res.data.message)
      this.getDetail()
    },
    like() {
      let token = localStorage.getItem('token')
      if (!token) {
        this.$toast.fail('请先登录')
        this.$router.push({
          name: 'login',
          params: {
            back: true,
          },
        })
        return
      }
      this.$axios.get(`/post_like/${this.detail.id}`).then(res => {
        this.$toast.success(res.data.message)
        this.getDetail()
      })
    },
    handleFocus() {
      this.isShow = true
      this.$nextTick().then(() => {
        this.$refs.textarea.focus()
      })
    },
    // textarea 失焦
    handleBlur() {
      console.log(123)

      this.isShow = false
      if (!this.content) {
        this.replyId = ''
        this.replyName = ''
      }
    },
    async send() {
      let res = await this.$axios.post(
        `/post_comment/${this.$route.params.id}`,
        {
          content: this.content,
          parent_id: this.replyId,
        }
      )
      const { statusCode, message } = res.data
      if (statusCode == 200) {
        this.$toast.success(message)
        this.getCommentsList()
        this.content = ''
        this.replyId = ''
        this.replyName = ''
        this.isShow = false
        this.$refs.box.scrollIntoView()
      }
    },
    async star() {
      let res = await this.$axios.get(`/post_star/${this.detail.id}`)
      this.$toast.success(res.data.message)
      this.getDetail()
    },
  },
}
</script>

<style scoped lang="less">
.header {
  height: 40px;
  line-height: 40px;
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 0 20px;
  align-items: center;
  .left {
    width: 20px;
    // background: red;
  }
  .center {
    flex: 1;
    // background: pink;
    display: flex;
    align-items: center;
    .iconfont {
      font-size: 50px;
    }
  }
  .right {
    width: 60px;
    // padding: 0 10px;
    height: 20px;
    border: 1px solid #999;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.detail-content {
  padding: 0 20px;

  .user {
    color: #999;
    height: 40px;
    line-height: 40px;
    display: flex;
    div {
      margin-right: 10px;
    }
  }

  /deep/ img {
    width: 100%;
    margin-top: 10px;
  }
  video {
    width: 100%;
  }
  .title {
    font-weight: 700;
    font-size: 14px;
    padding: 20px 0;
  }
  .btns {
    // height: 80px;
    // background: pink;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
    .like {
      width: 80px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #000;
      padding: 0 15px;
      border-radius: 15px;
      text-align: center;
      span {
        margin-left: 10px;
      }
      &.active {
        color: red;
        border: 1px solid red;
      }
    }
  }
}
// 评论部分
.comments {
  border-top: 3px solid #ccc;
  margin-top: 10px;
  padding-bottom: 40px;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  .input {
    border-top: 1px solid #000;
    height: 50px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .active {
      color: red;
    }
    input {
      height: 30px;
      width: 180px;
      background: #ddd;
      padding-left: 10px;
      outline: none;
      border: none;
      border-radius: 15px;
    }
    .iconfont {
      font-size: 20px;
    }
    .iconpinglun- {
      position: relative;
      .counter {
        position: absolute;
        top: -5px;
        right: -5px;
        font-size: 10px;
        background: red;
        // width: 12px;
        padding: 0 4px 0 2px;
        height: 12px;
        line-height: 12px;
        color: #fff;
      }
    }
  }
  .textarea {
    height: 100px;
    background: pink;
    border-top: 1px solid #000;
    display: flex;
    padding: 20px;
    align-items: flex-end;
    textarea {
      background: #eee;
      border-radius: 5px;
      padding: 5px 10px;
      flex: 1;
      margin-right: 20px;
      height: 100%;
      resize: none;
    }
    .send {
      width: 50px;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      background: red;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
