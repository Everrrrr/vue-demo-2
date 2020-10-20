<template>
  <div>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-field
      v-model="username"
      required
      label="用户名"
      placeholder="请输入用户名"
      :error-message="usernameErrMsg"
      @input="checkUsername"
      @clear="clearUsername"
      clearable
    />
    <van-field
      v-model="password"
      required
      label="密码"
      placeholder="请输入密码"
      @input="checkPassword"
      @clear="clearPassword"
      :error-message="passwordErrMsg"
      clearable
    />
    <hm-button @click.native="startLogin">登录</hm-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      // 用户名
      username: '',
      usernameErrMsg: '',
      // 密码
      password: '',
      passwordErrMsg: '',
    }
  },
  created() {
    const { username, password } = this.$route.params

    if (username && password) {
      this.username = username
      this.password = password
    }
  },
  methods: {
    checkUsername() {
      let reg = /^\d{0,5}$/
      if (reg.test(this.username)) {
        this.usernameErrMsg = ''
      } else {
        this.usernameErrMsg = '用户名格式不正确'
      }
    },
    clearUsername() {
      this.username = ''
      this.usernameErrMsg = ''
    },
    checkPassword() {
      let reg = /^\d{0,8}$/
      if (reg.test(this.password.trim())) {
        this.passwordErrMsg = ''
      } else {
        this.passwordErrMsg = '密码错误'
      }
    },
    clearPassword() {
      this.passwordErrMsg = ''
      this.password = ''
    },
    async startLogin() {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '确定登录',
        })
        console.log('确定')

        let res = await this.$axios.post('/login', {
          username: this.username,
          password: this.password,
        })
        const { statusCode, message, data } = res.data
        if (statusCode === 200) {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user_id', data.user.id)
          this.$toast.success(message)
          if (this.$route.params.back) {
            this.$router.back()
          } else {
            this.$router.push('/user')
          }
        } else {
          this.$toast.fail(message)
        }
      } catch (error) {
        console.log('取消')
      }
    },
    startLogin1() {
      if (
        this.username !== '' &&
        this.password !== '' &&
        this.usernameErrMsg === '' &&
        this.passwordErrMsg === ''
      ) {
        axios
          .post('http://localhost:3000/login', {
            username: this.username,
            password: this.password,
          })
          .then(res => {
            console.log(res)
            const { statusCode, message, data } = res.data
            if (statusCode === 200) {
              localStorage.setItem('token', data.token)
              localStorage.setItem('user_id', data.user.id)
              this.$toast.success(message)
              this.$router.push('/user')
            } else {
              this.$toast.fail(message)
            }
          })
      } else {
        this.$toast.fail('校验失败')
      }
    },
  },
}
</script>

<style></style>
