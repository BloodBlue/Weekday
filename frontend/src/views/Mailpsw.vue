<template>
  <div class="bodymailpsw">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <div class="divmailpsw">
          <div>
            <el-row type="flex" justify="center">
              <el-col :span="20">
                <h4 style="text-align: center; font-size: 0.5rem; color: grey">忘记密码</h4>
                <el-form label-position="left" :model="loginForm" :rules="rules" ref="loginForm">
                  <el-form-item label="邮箱" prop="mailname">
                    <el-input placeholder="请输入邮箱" v-model="loginForm.mailname" ></el-input>
                  </el-form-item>
                  <el-row>
                  <el-form-item label="验证码" prop="mailpassword" >
                      <el-input placeholder="请输入验证码" v-model="loginForm.mailpassword" ></el-input>
                      <el-button v-show="show" type="warning" @click="getsecode()">获取验证码</el-button>
                      <span v-show="!show" class="count">{{count}} s</span>
                  </el-form-item>
                  </el-row>
                  <el-form-item label="重置密码" prop="resetpsw">
                    <el-input type="password" placeholder="请输入重置密码" v-model="loginForm.resetpsw" ></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="resetpsw">
                    <el-input type="password" placeholder="请输入确认重置密码" v-model="loginForm.resetpsw2" ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary"  @click="submit" >提交</el-button>
                    <el-button type="password" @click="to('/login')" >返回</el-button>
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
        return callback(new Error('请输入重置密码'))
      } else if (value.toString().length < 8) {
        return callback(new Error('密码不得少于8位'))
      } else if (value.toString().length > 20) {
        return callback(new Error('密码不得多于20位'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入确认密码'))
      } else if (value.toString().length < 8) {
        return callback(new Error('密码不得少于8位'))
      } else if (value.toString().length > 20) {
        return callback(new Error('密码不得多于20位'))
      } else if (value !== this.regForm.passWord) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    let emailCheck = (rule, value, callback) => {
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (value === '') {
        return callback(new Error('邮箱是必须的'))
      } else if (!regEmail.test(value)) {
        return callback(new Error('邮箱格式有误！'))
      } else {
        callback()
      }
    }
    return {
      show: true,
      count: '',
      timer: null,
      loginForm: {
        mailname: '',
        mailpassword: '',
        resetpsw: '',
        resetpsw2: ''
      },
      isload: false,
      rules: {
        mailpassword: [
          { required: true, message: '请输入验证码' }
        ],
        resetpsw: [
          { required: true, validator: passCheck, trigger: 'blur' }
        ],
        resetpsw2: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        mailname: [
          { required: true, validator: emailCheck, trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    document.body.setAttribute('class', 'bodymailpsw')
  },
  methods: {
    to (url) {
      this.$router.push(url)
    },
    getpsw: function () {
      if (this.loginForm.mailname === '') {
        return this.$message.error('邮箱不能为空！请输入完整信息！')
      }
    },
    getsecode () {
      const TIME_COUNT = 60
      var params = new URLSearchParams()
      params.append('email', this.loginForm.mailname)
      this.$ajax.post('users/reset', params, {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'}}
      ).then((response) => {
        if (response.data.status === 200) {
          alert('验证码发送成功！')
          if (!this.timer) {
            this.count = TIME_COUNT
            this.show = false
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
              } else {
                this.show = true
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
          }
        }
      })
    },
    submit: function () {
      var params = new URLSearchParams()
      params.append('email', this.loginForm.mailname)
      params.append('password', this.$md5(this.loginForm.resetpsw))
      params.append('code', this.loginForm.mailpassword)
      this.$ajax({
        method: 'put',
        url: 'users/reset',
        data: params,
        dataType: 'jsonp',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      })
        .then(function (response) {
          if (response.data.status === 200) { // 登录成功的页面
            alert('恭喜你，密码修改成功')
            this.$router.push('/login')// 需要商量一下跳转到那一个页面
          }
          if (response.data.status === 400) { // 账户和密码输入错误的页面
            alert('邮箱或验证码错误，请重新输入！')
            this.loginForm.mailpassword = ''
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
.bodymailpsw{
  background-color: grey
  padding:10px 0px 30px 0px;
  color: white
}
.divmailpsw{
  background-color: white;
  opacity: 0.9;
}
</style>
