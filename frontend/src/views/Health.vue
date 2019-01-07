<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-card id="login-card">
          <div slot="header" class="clearfix">
            <span>健康关联</span>
          </div>
          <div>
            <el-row type="flex" justify="center">
              <el-col :span="16">
                <el-form label-position="left" label-width="250px" :model="healthForm" :rules="rules" ref="healthForm">
                  <el-form-item label="对我来说，多走一步都困难" prop="walk">
                     <el-radio-group v-model="healthForm.walk">
                      <el-radio :label=h0>从没有</el-radio>
                      <el-radio :label=h1>几乎没有</el-radio>
                      <el-radio :label=h2>有时有</el-radio>
                      <el-radio :label=h3>经常有</el-radio>
                      <el-radio :label=h4>几乎一直有</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="对我来说，跑步很困难" prop="run">
                     <el-radio-group v-model="healthForm.run">
                      <el-radio :label=h0>从没有</el-radio>
                      <el-radio :label=h1>几乎没有</el-radio>
                      <el-radio :label=h2>有时有</el-radio>
                      <el-radio :label=h3>经常有</el-radio>
                      <el-radio :label=h4>几乎一直有</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="对我来说，参加体育活动或竞赛很困难" prop="race">
                    <el-radio-group v-model="healthForm.race">
                      <el-radio :label=h0>从没有</el-radio>
                      <el-radio :label=h1>几乎没有</el-radio>
                      <el-radio :label=h2>有时有</el-radio>
                      <el-radio :label=h3>经常有</el-radio>
                      <el-radio :label=h4>几乎一直有</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="对我来说，提重物很困难" prop="rise">
                    <el-radio-group v-model="healthForm.rise">
                      <el-radio :label=h0>从没有</el-radio>
                      <el-radio :label=h1>几乎没有</el-radio>
                      <el-radio :label=h2>有时有</el-radio>
                      <el-radio :label=h3>经常有</el-radio>
                      <el-radio :label=h4>几乎一直有</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="对我来说，自己洗澡和淋浴很困难" prop="bathe">
                    <el-radio-group v-model="healthForm.bathe">
                      <el-radio :label=h0>从没有</el-radio>
                      <el-radio :label=h1>几乎没有</el-radio>
                      <el-radio :label=h2>有时有</el-radio>
                      <el-radio :label=h3>经常有</el-radio>
                      <el-radio :label=h4>几乎一直有</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="对我来说，做家务很困难" prop="housework">
                    <el-radio-group v-model="healthForm.housework">
                      <el-radio :label=h0>从没有</el-radio>
                      <el-radio :label=h1>几乎没有</el-radio>
                      <el-radio :label=h2>有时有</el-radio>
                      <el-radio :label=h3>经常有</el-radio>
                      <el-radio :label=h4>几乎一直有</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="我受伤或者是有疼痛" prop="hurt">
                    <el-radio-group v-model="healthForm.hurt">
                      <el-radio :label=h0>从没有</el-radio>
                      <el-radio :label=h1>几乎没有</el-radio>
                      <el-radio :label=h2>有时有</el-radio>
                      <el-radio :label=h3>经常有</el-radio>
                      <el-radio :label=h4>几乎一直有</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="我精神萎靡不振" prop="spirit">
                    <el-radio-group v-model="healthForm.spirit">
                      <el-radio :label=h0>从没有</el-radio>
                      <el-radio :label=h1>几乎没有</el-radio>
                      <el-radio :label=h2>有时有</el-radio>
                      <el-radio :label=h3>经常有</el-radio>
                      <el-radio :label=h4>几乎一直有</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitform" >提交</el-button>
                    <el-button @click="reset('healthForm')">重置</el-button>
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
  name: 'Health',
  data () {
    return {
      h0: '从没有',
      h1: '几乎没有',
      h2: '有时有',
      h3: '经常有',
      h4: '几乎一直有',
      healthForm: {
        walk: '',
        run: '',
        race: '',
        rise: '',
        bathe: '',
        housework: '',
        hurt: '',
        spirit: ''
      },
      rules: {
        walk: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        run: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        race: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        rise: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        bathe: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        housework: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        hurt: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        spirit: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitform () {
      console.log('提交')
      // var formdata = new FormData()
      // formdata.append('school', this.regForm.schoolName)
      // this.$ajax({
      //   method: 'POST',
      //   url: '/users/register',
      //   data: formdata,
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     'Accept': 'application/json'
      //   }
      // })
      // this.$message('注册成功') 还有判断
    },
    // 清空注册信息
    reset (formName) {
      console.log('清空')
      this.$refs[formName].resetFields()
      this.$message('清空数据成功！')
    }
  }
}
</script>

<style lang="stylus">
#login-card {
  margin-top: 50px
}
</style>
