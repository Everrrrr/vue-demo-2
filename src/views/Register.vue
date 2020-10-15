<template>
  <div>
    <hm-header>注册</hm-header>
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
      v-model="nickname"
      required
      label="昵称"
      placeholder="请输入昵称"
      :error-message="nicknameErrMsg"
      @input="checkNickname"
      @clear="clearNickname"
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

    <hm-button @click.native="startRegister">注册</hm-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      // 用户名
      username: '10009',
      usernameErrMsg: '',
      // 密码
      password: '123',
      passwordErrMsg: '',
      //昵称
      nickname: '哈哈哈',
      nicknameErrMsg: '',
    }
  },
  methods: {
    checkUsername() {
      let reg = /^\d{1,5}$/
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
      let reg = /^\d{1,8}$/
      if (reg.test(this.password.trim())) {
        this.passwordErrMsg = ''
      } else {
        this.passwordErrMsg = '密码格式不正确'
      }
    },
    clearPassword() {
      this.passwordErrMsg = ''
      this.password = ''
    },
    checkNickname() {
      let reg = /^\d{1,5}$/
      if (reg.test(this.nickname)) {
        this.nicknameErrMsg = ''
      } else {
        this.nicknameErrMsg = '昵称格式不正确'
      }
    },
    clearNickname() {
      this.nickname = ''
      this.nicknameErrMsg = ''
    },
    startRegister() {
      if (
        this.username !== '' &&
        this.password !== '' &&
        this.nickname !== '' &&
        this.usernameErrMsg === '' &&
        this.passwordErrMsg === '' &&
        this.nicknameErrMsg === ''
      ) {
        axios
          .post('http://localhost:3000/register', {
            username: this.username,
            nickname: this.nickname,
            password: this.password,
          })
          .then((res) => {
            console.log(res)
            const { message, statusCode } = res.data
            if (statusCode === 200) {
              this.$toast.success(message)
              this.$router.push({
                name: 'login',
                params: {
                  username: this.username,
                  password: this.password,
                },
              })
            } else {
              this.$toast.fail(message)
            }
          })
      } else {
        console.log('校验失败')
      }
    },
  },
}
</script>

<style></style>
