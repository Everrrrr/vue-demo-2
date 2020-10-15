<template>
  <div class="edit">
    <hm-header>编辑资料</hm-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt />
      <!-- uploader上传组件 -->
      <van-uploader class="uploader" :after-read="afterRed" />
    </div>
    <van-cell-group>
      <van-cell
        title="昵称"
        :value="info.nickname"
        is-link
        @click="showNickname"
      />
      <van-cell
        title="密码"
        :value="info.password"
        @click="showPassword"
        is-link
      />
      <van-cell
        title="性别"
        :value="info.gender === 1 ? '男' : '女'"
        @click="showGender"
        is-link
      />
    </van-cell-group>
    <!-- 昵称的对话框-->
    <van-dialog
      v-model="show"
      @confirm="confirmNickname"
      title="修改昵称"
      show-cancel-button
    >
      <van-field v-model="nickname" placeholder="请输入用户昵称" />
    </van-dialog>
    <!-- 密码的对话框-->
    <van-dialog
      v-model="show_password"
      @confirm="confirmPassword"
      title="修改昵称"
      show-cancel-button
    >
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>
    <!-- 修改性别 -->
    <van-dialog
      v-model="show_gender"
      title="修改性别"
      @confirm="confirmGender"
      show-cancel-button
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      show: false,
      nickname: '',
      show_gender: false,
      gender: 0,
      show_password: false,
      password: '',
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      const id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')
      this.$axios
        .get(`/user/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          this.info = res.data.data
          console.log('这是数据')
          console.log(this.info)
        })
    },
    showNickname() {
      // 对话框显示
      this.show = true
      // 回显 nickname
      this.nickname = this.info.nickname
    },
    confirmNickname() {
      // 1. 请求之前的判断
      if (this.nickname === this.info.nickname) {
        this.$toast('新旧昵称不能一样')
        return
      }
      let token = localStorage.getItem('token')
      let id = localStorage.getItem('user_id')
      this.$axios
        .post(`/user_update/${id}`, {
          nickname: this.nickname,
        })
        .then((res) => {
          this.getInfo()
          this.$toast.success('修改成功')
        })
    },
    showPassword() {
      this.show_password = true
      this.password = this.info.password
    },
    confirmPassword() {
      if (this.password === this.info.password) {
        this.$toast('密码不能相同')
        return
      }
      this.editUser({
        password: this.password,
      })
    },
    showGender() {
      this.show_gender = true
      this.gender = this.info.gender
    },
    confirmGender() {
      if (this.gender === this.info.gender) {
        return
      }
      let token = localStorage.getItem('token')
      let id = localStorage.getItem('user_id')
      this.$axios
        .post(`/user_update/${id}`, {
          gender: this.gender,
        })
        .then((res) => {
          this.getInfo()
          this.$toast.success('修改性别成功')
        })
    },
    editUser(data) {
      const id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')
      this.$axios.post(`/user_update/${id}`, data).then((res) => {
        this.getInfo()
        this.$toast.success('修改成功')
      })
    },
    afterRed(data) {
      let formData = new FormData()
      formData.append('file', data.file)
      this.$axios.post('/upload', formData).then((res) => {
        this.editUser({
          head_img: res.data.data.url,
        })
      })
    },
  },
}
</script>

<style scoped lang="less">
.avatar {
  text-align: center;
  margin: 20px 0;
  position: relative;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
  }
  .uploader {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
}
</style>