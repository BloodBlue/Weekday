<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-card id="login-card">
          <div slot="header" class="clearfix">
            <span>忘记密码</span>
          </div>
          <div>
            <el-row type="flex" justify="center">
              <el-col :span="20">
                <el-form label-position="left" label-width="80px" :model="loginForm" :rules="rules" ref="loginForm">
                  <el-form-item label="邮箱" prop="mailname">
                    <el-input placeholder="请输入邮箱" v-model="loginForm.mailname" ></el-input>
                  </el-form-item>
                  <el-form-item label="验证码" prop="mailpassword" >
                    <el-col :span="8">
                      <el-input type="password" v-model="loginForm.mailpassword" ></el-input>
                    </el-col>
                    <el-col :span="15">
                      <el-button v-show="show" type="primary" @click="getpsw" >获取验证码</el-button>
                      <el-button v-show="!show" type="info" @click="getpsw" >{{timecount}}</el-button>
                    </el-col>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary"  @click="submit" >登录</el-button>
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
        mailname: '',
        mailpassword: ''
      },
      isload: false,
      rules: {
        mailname: [
          { required: true, message: '请输入邮箱' }
        ],
        mailpassword: [
          { required: true, message: '请输入验证码' }
        ]
      }
    }
  },
  methods: {
    to (url) {
      this.$router.push(url)
    },
    getpsw: function () {
      if (this.loginForm.mailname === '') {
        return this.$message.error('邮箱不能为空！请输入完整信息！')
      }
      this.isload = true
    },
    submit: function () {
      var params = new URLSearchParams()
      params.append('mail', this.loginForm.username)
      params.append('mailpassword', this.loginForm.password)
      this.$ajax({
        method: 'post',
        url: 'http://106.14.140.30:5000/login',
        data: params,
        dataType: 'jsonp',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(function (response) {
          console.log(response)
          console.log(response.data)
          console.log(response.data.data)
          console.log(response.data.msg)
          if (this.response.data.status === 1) { // 登录成功的页面
            this.$message({
              message: '恭喜你，登录成功',
              type: 'success'
            })
            this.methods.to('/')// 需要商量一下跳转到那一个页面
          }
          if (this.status_login === 2) { // 账户和密码输入错误的页面
            this.$message({
              message: '用户名或密码错误，请重新输入！',
              type: 'warning'
            })
            this.loginForm.username = ''
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
  margin-left: 50px
  magrin-right: 200px
}
</style>
