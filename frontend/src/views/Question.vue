<template>
  <div>
    <div v-if="isBasis">
      <el-row type="flex" justify="center">
        <div>
          <el-row type="flex" justify="center">
            <el-col :span="16">
              <p class="pclass">人口统计学的基本情况 </p>
              <el-form label-position="left" :model="basisForm" :rules="rules" ref="basisForm"  class="label">
                <el-form-item label="学校" prop="school">
                  <el-select v-model="basisForm.school" clearable placehold="--请选择--">
                    <el-option v-for="item in schoollist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="年级" prop="grade">
                  <el-select v-model="basisForm.grade" clearable placehold="--请选择--">
                    <el-option v-for="item in gradelist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="性别" prop="sex" class="radio-group">
                <el-radio v-model="basisForm.sex" label="男">男</el-radio>
                <el-radio v-model="basisForm.sex" label="女">女</el-radio>
              </el-form-item>
              <el-form-item label="出生日期" prop="birthday">
                <el-date-picker v-model="basisForm.birthday" placeholder="选择出生日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="民族" prop="nationality">
                <el-input v-model="basisForm.nationality" placeholder="请输入民族"></el-input>
              </el-form-item>
              <el-form-item label="专业类别" prop="major">
                <el-input v-model="basisForm.major" placeholder="请输入专业"></el-input>
              </el-form-item>
                <p class="pclass">请填写你最近一次体质测试的成绩</p>
                <el-form-item label="身高(厘米/cm)" prop="height">
                  <el-input v-model="basisForm.height" placeholder="请输入身高"></el-input>
                </el-form-item>
                <el-form-item label="体重(公斤/kg)" prop="weight">
                  <el-input v-model="basisForm.weight" placeholder="请输入体重"></el-input>
                </el-form-item>
                <el-form-item label="肺活量(毫升/ml)" prop="pulmonary">
                  <el-input v-model="basisForm.pulmonary" placeholder="请输入肺活量"></el-input>
                </el-form-item>
                <el-form-item label="坐位体前屈(厘米/cm)" prop="sitReach">
                  <el-input v-model="basisForm.sitReach" placeholder="请输入坐位体前屈值"></el-input>
                </el-form-item>
                <el-form-item label="50米(秒)" prop="fifty">
                  <el-input v-model="basisForm.fifty" placeholder="请输入50米成绩"></el-input>
                </el-form-item>
                <el-form-item label="800米/1000米(分钟.秒)" prop="enduranceRun">
                  <el-input v-model="basisForm.enduranceRun" placeholder="请输入800米/1000米成绩"></el-input>
                  <br>
                  <p><span style="color:red"><i class="el-icon-info"></i>友情提示：</span>如果记不起来准确时间，请勾选成绩的范围区间 (单位分/秒)</p>
                  <br>
                  <div v-if="isBoy">
                    <span>男生: </span>
                  <el-radio-group v-model="basisForm.enduranceRun" class="radio-group">
                    <el-radio :label="b1" class="radio-item">小于3.17</el-radio>
                    <el-radio :label="b2" class="radio-item">3.18-3.57</el-radio>
                    <el-radio :label="b3" class="radio-item">3.58-4.52</el-radio>
                    <el-radio :label="b4" class="radio-item">4.53-6.12</el-radio>
                    <el-radio :label="b5" class="radio-item">大于6.12</el-radio>
                  </el-radio-group>
                  </div>
                  <div v-else>
                    <span>女生: </span>
                    <el-radio-group v-model="basisForm.enduranceRun" class="radio-group">
                      <el-radio :label="g1" class="radio-item">小于3.18</el-radio>
                      <el-radio :label="g2" class="radio-item">3.19-3.57</el-radio>
                      <el-radio :label="g3" class="radio-item">3.58-4.44</el-radio>
                      <el-radio :label="g4" class="radio-item">4.45-5.24</el-radio>
                      <el-radio :label="g5" class="radio-item">大于5.24</el-radio>
                    </el-radio-group>
                  </div>
                </el-form-item>
                <el-form-item label="引体向上次数(个)" prop="upNumber" v-if="isBoy" >
                  <el-input v-model="basisForm.upNumber" placeholder="请输入引体向上次数"></el-input>
                </el-form-item>
                <el-form-item label="一分钟仰卧起坐数(个)" prop="upNumber" v-else>
                  <el-input v-model="basisForm.upNumber" placeholder="请输入仰卧起坐数"></el-input>
                </el-form-item>
              </el-form>
              <el-button @click="next()">下一页</el-button>
            </el-col>
          </el-row>
        </div>
      </el-row>
    </div>
    <div v-if="isHealth">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-card id="login-card">
          <div slot="header" class="clearfix">
            <span>健康关联</span>
          </div>
          <div>
            <el-row type="flex" justify="center">
              <el-col :span="20">
                <el-form label-position="left" :model="healthForm" :rules="rules" ref="healthForm">
                  <el-form-item :label="item.label" :prop="item.name" v-for="item in healthForm.questionlist" :key="item.name"  class="radio-group">
                    <el-radio-group v-model="item.value" class="radio-group">
                      <el-radio v-for="answer in answerlist" :key="answer.name" :label="answer.label" class="radio-item">{{ answer.name }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="HealthBack()">上一页</el-button>
                    <el-button @click="HealthNext()">下一页</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div v-if="isEmotion">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-card id="login-card">
          <div slot="header" class="clearfix">
            <span>情感关联</span>
          </div>
          <div>
            <el-row type="flex" justify="center">
              <el-col :span="20">
                <el-form label-position="left" :model="emotionForm" :rules="rules" ref="emotionForm">
                  <el-form-item :label="item.label" :prop="item.name" v-for="item in emotionForm.questionlist" :key="item.name" class="radio-group">
                    <el-radio-group v-model="item.value" class="radio-group">
                      <el-radio v-for="answer in answerlist" :key="answer.name" :label="answer.label" class="radio-item">{{ answer.name }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="EmotionBack()">上一页</el-button>
                    <el-button @click="EmotionNext()">下一页</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div v-if="isOthers">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-card id="login-card">
          <div slot="header" class="clearfix">
            <span>同伴关联</span>
          </div>
          <div>
            <el-row type="flex" justify="center">
              <el-col :span="20">
                <el-form label-position="left" :model="otherForm" :rules="rules" ref="otherForm">
                  <el-form-item :label="item.label" :prop="item.name" v-for="item in otherForm.questionlist" :key="item.name" class="radio-group">
                    <el-radio-group v-model="item.value" class="radio-group">
                      <el-radio v-for="answer in answerlist" :key="answer.name" :label="answer.label" class="radio-item">{{ answer.name }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="OthersBack()">上一页</el-button>
                    <el-button @click="OthersNext()">下一页</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div v-if="isSchool">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-card id="login-card">
          <div slot="header" class="clearfix">
            <span>学校里的问题</span>
          </div>
          <div>
            <el-row type="flex" justify="center">
              <el-col :span="20">
                <el-form label-position="left" :model="schoolForm" :rules="rules" ref="schoolForm">
                  <el-form-item :label="item.label" :prop="item.name" v-for="item in schoolForm.questionlist" :key="item.name" class="radio-group">
                    <el-radio-group v-model="item.value" class="radio-group">
                      <el-radio v-for="answer in answerlist" :key="answer.name" :label="answer.label" class="radio-item">{{ answer.name }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="SchoolBack()">上一页</el-button>
                    <el-button @click="submit()">提交</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Question',
  data () {
    return {
      isBasis: true,
      isHealth: false,
      isEmotion: false,
      isOthers: false,
      isSchool: false,
      isBoy: true,
      b1: '<3.17',
      b2: '3.18-3.57',
      b3: '3.58-4.52',
      b4: '4.53-6.12',
      b5: '>6.12',
      g1: '<3.18',
      g2: '3.19-3.57',
      g3: '4-4.44',
      g4: '4.45-5.24',
      g5: '>5.24',
      basisForm: {
        school: '',
        grade: '',
        sex: '男',
        birthday: '',
        nationality: '',
        major: '',
        height: '',
        weight: '',
        pulmonary: '',
        sitReach: '',
        fifty: '',
        enduranceRun: '',
        upNumber: ''
      },
      schoollist: [
        {value: '上海大学', label: '上海大学'},
        {value: '同济大学', label: '同济大学'},
        {value: '对外经贸大学', label: '对外经贸大学'},
        {value: '上海健康医学院', label: '上海健康医学院'}
      ],
      gradelist: [
        {value: '大一', label: '大一'},
        {value: '大二', label: '大二'},
        {value: '大三', label: '大三'},
        {value: '大四', label: '大四'},
        {value: '研究生及以上', label: '研究生及以上'}
      ],
      answerlist: [
        {label: '0', name: '从没有'},
        {label: '1', name: '几乎没有'},
        {label: '2', name: '有时有'},
        {label: '3', name: '经常有'},
        {label: '4', name: '几乎一直有'}
      ],
      healthForm: {
        questionlist: [
          {label: '对我来说,多走一步都困难', name: 'walk', value: ''},
          {label: '对我来说,跑步很困难', name: 'run', value: ''},
          {label: '对我来说,参加体育活动或竞赛很困难', name: 'race', value: ''},
          {label: '对我来说,提重物很困难', name: 'rise', value: ''},
          {label: '对我来说,自己洗澡和淋浴很困难', name: 'bathe', value: ''},
          {label: '对我来说,做家务很困难', name: 'housework', value: ''},
          {label: '我受伤或者是有疼痛', name: 'hurt', value: ''},
          {label: '我精神萎靡不振', name: 'spirit', value: ''}
        ]
      },
      emotionForm: {
        questionlist: [
          {label: '我感觉到害怕和恐惧', name: 'fear', value: ''},
          {label: '我感觉到悲伤和忧郁', name: 'sad', value: ''},
          {label: '我感觉到愤怒', name: 'anger', value: ''},
          {label: '我睡眠有问题', name: 'sleep', value: ''},
          {label: '我担心将会有什么事发生在我身上', name: 'worry', value: ''}
        ]
      },
      otherForm: {
        questionlist: [
          {label: '我同其他小朋友相处有困难', name: 'getAlong', value: ''},
          {label: '其他小朋友不想和我交朋友', name: 'makeFriend', value: ''},
          {label: '其他小朋友取笑(戏弄)我', name: 'jest', value: ''},
          {label: '我不能完成同龄小朋友完成的事情', name: 'failToFinish', value: ''},
          {label: '和其他小朋友一起玩耍(运动)时,我感到很困难', name: 'hardToPlay', value: ''}
        ]
      },
      schoolForm: {
        questionlist: [
          {label: '在课堂上,我的注意力很难集中', name: 'concentration', value: ''},
          {label: '我容易忘记事情(健忘)', name: 'forgettery', value: ''},
          {label: '我很难跟上学校的功课', name: 'keepPace', value: ''},
          {label: '我因为身体不舒服缺课', name: 'absentee', value: ''},
          {label: '我缺课去(医院)看医生', name: 'doctor', value: ''}
        ]
      },
      rules: {
        school: [
          { required: true, message: '请选择学校', trigger: 'blur' }
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
        nationality: [
          { required: true, message: '请输入民族', trigger: 'blur' }
        ],
        major: [
          { required: true, message: '请输入专业类别', trigger: 'blur' }
        ],
        height: [
          { required: true, message: '请输入身高', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入体重', trigger: 'blur' }
        ],
        pulmonary: [
          { required: true, message: '请输入肺活量', trigger: 'blur' }
        ],
        sitReach: [
          { required: true, message: '请输入坐位体前屈值', trigger: 'blur' }
        ],
        fifty: [
          { required: true, message: '请输入50米成绩', trigger: 'blur' }
        ],
        enduranceRun: [
          { required: true, message: '请输入800米/1000米成绩', trigger: 'blur' }
        ],
        upNumber: [
          { required: true, message: '请输入仰卧起坐或引体向上次数', trigger: 'blur' }
        ],
        walk: [
          { required: true, message: '请选择情况', trigger: 'blur,change' }
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
        ],
        fear: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        sad: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        anger: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        sleep: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        worry: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        getAlong: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        makeFriend: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        jest: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        failToFinish: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        hardToPlay: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        concentration: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        forgettery: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        keepPace: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        absentee: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ],
        doctor: [
          { required: true, message: '请选择情况', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    // 如果sex发生改变，这个函数就会运行
    'basisForm.sex': function (value) {
      if (value === '男') {
        this.isBoy = true
      } else {
        this.isBoy = false
      }
    }
  },
  methods: {
    next () {
      var flag = true
      Object.keys(this.basisForm).forEach(el => {
        if (this.basisForm[el] === '') {
          this.$message('请填写所有信息！')
          flag = false
        }
      })
      if (flag) {
        this.isBasis = false
        this.isHealth = true
      }
    },
    HealthNext () {
      var flag = true
      this.healthForm.questionlist.forEach(element => {
        if (element.value === '') {
          this.$message('请填写所有信息！')
          flag = false
        }
      })
      if (flag) {
        this.isHealth = false
        this.isEmotion = true
      }
    },
    HealthBack () {
      this.isHealth = false
      this.isBasis = true
    },
    EmotionBack () {
      this.isEmotion = false
      this.isHealth = true
    },
    EmotionNext () {
      var flag = true
      this.emotionForm.questionlist.forEach(element => {
        if (element.value === '') {
          this.$message('请填写所有信息！')
          flag = false
        }
      })
      if (flag) {
        this.isEmotion = false
        this.isOthers = true
      }
    },
    OthersBack () {
      this.isOthers = false
      this.isEmotion = true
    },
    OthersNext () {
      var flag = true
      this.otherForm.questionlist.forEach(element => {
        if (element.value === '') {
          this.$message('请填写所有信息！')
          flag = false
        }
      })
      if (flag) {
        this.isOthers = false
        this.isSchool = true
      }
    },
    SchoolBack () {
      this.isSchool = false
      this.isOthers = true
    },
    // 提交表单信息(index+value)
    // submit () {
    //   var data = []
    //   Object.keys(this.basisForm).forEach((el, index) => {
    //     data.push({
    //       index: index + 1,
    //       value: this.basisForm[el]
    //     })
    //   })
    //   this.healthForm.questionlist.forEach((element, index) => {
    //     data.push({
    //       index: element.name,
    //       value: element.value
    //     })
    //   })
    //   this.emotionForm.questionlist.forEach((element, index) => {
    //     data.push({
    //       index: element.name,
    //       value: element.value
    //     })
    //   })
    //   this.otherForm.questionlist.forEach((element, index) => {
    //     data.push({
    //       index: element.name,
    //       value: element.value
    //     })
    //   })
    //   this.schoolForm.questionlist.forEach((element, index) => {
    //     data.push({
    //       index: element.name,
    //       value: element.value
    //     })
    //   })
    //   console.log(data)
    // },
    // 提交表单(value)
    submit () {
      var flag = true
      this.schoolForm.questionlist.forEach(element => {
        if (element.value === '') {
          this.$message('请填写所有信息！')
          flag = false
        }
      })
      if (flag) {
        var answer = []
        Object.keys(this.basisForm).forEach(el => {
          answer.push(
            this.basisForm[el]
          )
        })
        this.healthForm.questionlist.forEach(element => {
          answer.push(
            element.value
          )
        })
        this.emotionForm.questionlist.forEach(element => {
          answer.push(
            element.value
          )
        })
        this.otherForm.questionlist.forEach(element => {
          answer.push(
            element.value
          )
        })
        this.schoolForm.questionlist.forEach(element => {
          answer.push(
            element.value
          )
        })
        console.log(answer)
        var formdata = new FormData()
        formdata.append('qnId', '1')
        formdata.append('answer', answer)
        this.$ajax.post('/questionnaires/submit_phase1', formdata, {
          headers: {'Authorization': localStorage.token}}
        ).then((response) => {
          console.log(response.data.status)
          if (response.data.status === 200) {
            this.$message({
              title: '提示信息',
              message: '提交成功',
              type: 'success'
            })
          }
          if (response.data.status === 400) {
            let that = response.data.msg
            console.log(response.data.status)
            this.$message({
              title: '提示信息',
              message: '提交失败 ' + that,
              type: 'error'
            })
          }
        })
        console.log('提交')
      }
    }
  }
}
</script>

<style lang="stylus">
.pclass
  color orange
  font-size 20px
  font-weight blod
  font-family "宋体"

.tip
  color red

@media (max-width 768px)
  .radio-group
    display flex
    flex-direction column

  .radio-item
    margin 0!important
</style>
