<template>
<div>
  <el-row type="flex" justify="center">
    <el-col :span="21">
        <div class="divregister">
          <div>
            <el-row type="flex" justify="center">
              <el-col :span="21">
                <h4 style="text-align: center; font-size: 0.5rem; color: grey">新用户注册</h4>
                <el-form label-position="left" status-icon :model="regForm" :rules="rules" ref="regForm">
                  <el-form-item label="学校" prop="schoolName">
                    <el-select
                    v-model="regForm.schoolName"
                    filterable
                    placeholder="--请选择--"
                    :loading="false"
                    @change="submitSchool"
                    clearable
                    >
                      <el-option
                      v-for="item in SchoolList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="学号" prop="idNumber">
                    <el-input v-model="regForm.idNumber" placeholder="请输入学号"></el-input>
                    <br/>
                  </el-form-item>
                   <el-form-item label="姓名" prop="name">
                    <el-input v-model="regForm.name" placeholder="请输入姓名" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="年级" prop="grade">
                    <el-select v-model="regForm.grade" clearable placehold="--请选择--">
                      <el-option v-for="item in gradelist" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="性别" prop="sex">
                    <el-radio v-model="regForm.sex" label="male">男</el-radio>
                    <el-radio v-model="regForm.sex" label="female">女</el-radio>
                  </el-form-item>
                  <el-form-item label="出生日期" prop="birthday">
                    <el-date-picker v-model="regForm.birthday" type="date" value-format="yyyy-MM-dd" placeholder="选择出生日期"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="专业类别" prop="major">
                    <el-input v-model="regForm.major" placeholder="请输入专业"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号" prop="mobilephone">
                    <el-input v-model="regForm.mobilephone" placeholder="请输入手机号"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="passWord">
                    <el-input type="password" v-model="regForm.passWord" auto-complete="off" placeholder="请设置8-20位密码" maxlength="20"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="checkPassword">
                    <el-input type="password" v-model="regForm.checkPassword" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="regForm.email" placeholder="请输入邮箱"></el-input>
                    <br/>
                  </el-form-item>
                <el-form-item>
                  <el-button size="small" type="primary" @click="submitform" >注册</el-button>
                  <el-button size="small" type="password" @click="to('/login')" >返回</el-button>
                  <el-button size="small"  @click="reset('regForm')">重置</el-button>
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
  name: 'Register',
  data () {
    let schoolNameCheck = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请填写学校名称'))
      } else {
        callback()
      }
    }
    let idNumberCheck = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入学号'))
      } else {
        callback()
      }
    }
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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
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
    let phoneCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (value.toString().length !== 11) {
        return callback(new Error('手机号不合法'))
      } else {
        callback()
      }
    }
    return {
      SchoolList: [{value: '上海大学', label: '上海大学'},
        {value: '同济大学', label: '同济大学'},
        {value: '对外经贸大学', label: '对外经贸大学'},
        {value: '上海健康医学院', label: '上海健康医学院'}
      ],
      gradelist: [{
        value: '大一',
        label: '大一'
      }, {
        value: '大二',
        label: '大二'
      }, {
        value: '大三',
        label: '大三'
      }, {
        value: '大四',
        label: '大四'
      }, {
        value: '研究生及以上',
        label: '研究生及以上'
      }],
      regForm: {
        schoolName: '',
        idNumber: '',
        name: '',
        grade: '',
        sex: '1',
        birthday: '',
        major: '',
        passWord: '',
        checkPassword: '',
        email: '',
        mobilephone: ''
      },
      rules: {
        schoolName: [
          { required: true, validator: schoolNameCheck, trigger: 'blur' }
        ],
        idNumber: [
          { required: true, validator: idNumberCheck, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '请选择年级', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '请选择出生日期', trigger: 'blur' }
        ],
        major: [
          { required: true, message: '请输入专业', trigger: 'blur' }
        ],
        passWord: [
          { required: true, validator: passCheck, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { required: true, validator: emailCheck, trigger: 'change' }
        ],
        mobilephone: [
          { required: true, validator: phoneCheck, trigger: 'change' }
        ]
      }
    }
  },
  watch: {
  },
  mounted () {
    document.body.setAttribute('class', 'bodylogin')
  },
  methods: {
    // 提交表单数据
    to (url) {
      this.$router.push(url)
    },
    submitform () {
      console.log('提交')
      console.log(this.$md5(this.regForm.passWord))
      var formdata = new FormData()
      formdata.append('school_name', this.regForm.schoolName)
      formdata.append('id_number', this.regForm.idNumber)
      formdata.append('password', this.$md5(this.regForm.passWord))
      formdata.append('email', this.regForm.email)
      formdata.append('gender', this.regForm.sex)
      formdata.append('name', this.regForm.name)
      formdata.append('grade', this.regForm.grade)
      formdata.append('mobile_phone', this.regForm.mobilephone)
      formdata.append('birthday', this.regForm.birthday)
      formdata.append('major', this.regForm.major)
      formdata.append('nationality', this.regForm.nationality)
      this.$ajax.post('/users/register', formdata, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'}}
      ).then((response) => {
        console.log(response.data)
        if (response.data.status === 200) {
          this.$message({
            title: '提示信息',
            message: '注册成功',
            type: 'success'
          })
          this.$router.push('/login')
        }
        if (response.data.status === 400) {
          let that = response.data.msg
          console.log(response.data.status)
          this.$message({
            title: '提示信息',
            message: '注册失败 ' + that,
            type: 'error'
          })
        }
      })
    },
    // 清空注册信息
    reset (formName) {
      console.log('清空')
      this.$refs[formName].resetFields()
      this.$message('清空数据成功！')
    },
    submitSchool () {
      console.log(this.regForm.schoolName)
    }
  }

}
</script>

<style lang="stylus">
.pclass{
  color:blue;
  font-size:20px;
  font-weight:blod;
}

.yanzheng{
  width:80px;
  height:30px;
  background-color: #1E90FF;
  font-size:12px;
  color:#ffffff;
  cursor:pointer;
}

.p_strong{
  color:red;
  font-size:25px;
  font-weight:bold;
  align:center;
  margin-left:240px;
}

.bodylogin{
  background-color: grey;
  padding:10px 0px 30px 0px;
  color: azure
}
.divregister{
  background-color:#CDCDC1;
  opacity: 0.9;
}
</style>
