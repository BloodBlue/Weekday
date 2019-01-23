<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-card id="login-card">
          <div slot="header" class="clearfix">
            <span>登录</span>
          </div>
          <div>
            <el-row type="flex" justify="center">
              <el-col :span="16">
                <el-form label-position="left" label-width="80px" :model="loginForm" :rules="rules" ref="loginForm">
                  <el-form-item label="用户名" prop="username">
                    <el-input placeholder="请输入电话号码或者邮箱" v-model="loginForm.username" ></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password" >
                    <el-input type="password" v-model="loginForm.password" ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submit" >登录</el-button>
                    <el-button type="password" @click="to('/register')" >注册</el-button>
                    <el-button type="text"  icon="el-icon-question" size="mini" @click="to('/mailpsw')">忘记密码？</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ]
      }
    }
  },
  methods: {
    to (url) {
      this.$router.push(url)
    },
    submit: function () {
      if (this.loginForm.username === '' && this.loginForm.password === '') {
        return this.$message.error('用户名和密码不能为空！请输入完整信息！')
      }
      if (this.loginForm.username === '') {
        return this.$message.error('用户名不能为空！请输入完整信息！')
      }
      if (this.loginForm.password === '') {
        return this.$message.error('密码不能为空！请输入完整信息！')
      }
      var params = new URLSearchParams()
      params.append('email', this.loginForm.username)
      params.append('password', this.$md5(this.loginForm.password))
      this.$ajax.post('/users/login', params, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'}}
      ).then((response) => {
        console.log(response)
        console.log(response.data)
        console.log(response.data.data)
        console.log(response.data.msg)
        if (response.status === 200) { // 登录成功的页面
          this.$store.commit('setToken', response.data.data)
          console.log('token is set to:', this.$store.state.token)
          localStorage.setItem('userName', this.loginForm.username)
          localStorage.token = response.data.data.token
          this.$emit('usersignin', this.loginForm.username)
          this.$message({
            title: '提示信息',
            message: '恭喜你，登录成功',
            type: 'success'
          })
          // this.$emit('isShow', false);
          this.$router.push('/home')
          // this.methods.to('/')// 需要商量一下跳转到那一个页面
        } else {
          this.$message({
            message: '用户名或密码错误，请重新输入！',
            type: 'warning'
          })
          this.loginForm.password = ''
        }
      })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus">
#login-card {
  margin-top: 50px
}
</style>
