<template>
  <div class="backgrounddiv" >
    <el-row type="flex" justify="center">
      <el-col :span="21">
        <div>
        <h2 style="text-align: center; font-size: 0.65rem; color: white">大学生体力活动水平与健康促进调研平台</h2>
          <div class="divlogin">
            <el-row type="flex" justify="center">
              <el-col :span="21">
                <h4 style="text-align: center; font-size: 0.5rem; color: grey">登录</h4>
                <el-form label-position="left" :model="loginForm" :rules="rules" ref="loginForm">
                  <el-form-item label="邮箱" prop="username">
                    <el-input placeholder="请输入邮箱" v-model="loginForm.username" ></el-input>
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
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    let passCheck = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入密码'))
      } else if (value.toString().length < 8) {
        return callback(new Error('密码不得少于8位'))
      } else if (value.toString().length > 20) {
        return callback(new Error('密码不得多于20位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入邮箱' }
        ],
        password: [
          { required: true, validator: passCheck }
        ]
      }
    }
  },
  mounted () {
    document.body.setAttribute('class', 'bodylogin')
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
        if (response.data.status === 200) { // 登录成功的页面
          this.$store.commit('setToken', response.data.data)
          localStorage.setItem('userName', this.loginForm.username)
          localStorage.username = response.data.data.username
          localStorage.token = response.data.data.token
          localStorage.isAdmin = response.data.data.isAdmin
          sessionStorage.setItem('Login', true)
          console.log(localStorage.username)
          this.$emit('usersignin', this.loginForm.username)
          this.$message({
            title: '提示信息',
            message: '恭喜你，登录成功',
            type: 'success'
          })
          // this.$emit('isAdmin', true)
          this.$router.push('/home')
          // this.methods.to('/')// 需要商量一下跳转到那一个页面
        }
        if (response.data.status === 400) {
          this.$message({
            message: response.data.msg,
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

<style>
#login-card {
  margin-top: 30px;
}
.bodylogin{
  background-color: gray;
  padding:10px 0px 30px 0px;
  color: azure
}
.divlogin{
  background-color: white;
  opacity: 0.8;
}
</style>
