<template>
  <div>
    <div v-if="isBasis">
      <el-row type="flex" justify="center">
        <el-col :span="18">
          <el-card id="basis-card">
            <div slot="header" class="clearfix">
              <span>基本情况</span>
            </div>
            <div>
              <el-row type="flex" justify="center">
                <el-col :span="16">
                  <p class="pclass">请填写你最近一次体质测试的成绩</p>
                  <el-form label-position="left" label-width="150px" :model="basisForm" :rules="rules" ref="basisForm">
                    <el-form-item label="身高" prop="height">
                      <el-input v-model="basisForm.height" placeholder="请输入身高" style="width:200px"></el-input>
                      <span>(公斤/kg)</span>
                    </el-form-item>
                    <el-form-item label="体重" prop="weight">
                      <el-input v-model="basisForm.weight" placeholder="请输入体重" style="width:200px"></el-input>
                      <span>(厘米/cm)</span>
                    </el-form-item>
                    <el-form-item label="肺活量" prop="pulmonary">
                      <el-input v-model="basisForm.pulmonary" placeholder="请输入肺活量" style="width:200px"></el-input>
                      <span>(毫升/ml)</span>
                    </el-form-item>
                    <el-form-item label="坐位体前屈" prop="sitReach">
                      <el-input v-model="basisForm.sitReach" placeholder="请输入坐位体前屈值" style="width:200px"></el-input>
                      <span>(厘米/cm)</span>
                    </el-form-item>
                    <el-form-item label="50米" prop="fifty">
                      <el-input v-model="basisForm.fifty" placeholder="请输入50米成绩" style="width:200px"></el-input>
                      <span>(秒)</span>
                    </el-form-item>
                    <el-form-item label="800米/1000米" prop="enduranceRun">
                      <el-input v-model="basisForm.enduranceRun" placeholder="请输入800米/1000米成绩" style="width:200px"></el-input>
                      <span>(秒)</span>
                      <br>
                      <span>如果记不起来准确时间，请勾选成绩的范围区间 (单位分/秒) </span>
                      <br>
                      <div v-if="isBoy">
                        <span>男生: </span>
                      <el-radio-group v-model="basisForm.enduranceRun">
                        <el-radio :label="b1">小于3.17</el-radio>
                        <el-radio :label="b2">3.18-3.57</el-radio>
                        <el-radio :label="b3">3.58-4.52</el-radio>
                        <el-radio :label="b4">4.53-6.12</el-radio>
                        <el-radio :label="b5">大于6.12</el-radio>
                      </el-radio-group>
                      </div>
                      <div v-else>
                        <span>女生: </span>
                        <el-radio-group v-model="basisForm.enduranceRun">
                          <el-radio :label="g1">小于3.18</el-radio>
                          <el-radio :label="g2">3.19-3.57</el-radio>
                          <el-radio :label="g3">3.58-4.44</el-radio>
                          <el-radio :label="g4">4.45-5.24</el-radio>
                          <el-radio :label="g5">大于5.24</el-radio>
                        </el-radio-group>
                      </div>
                    </el-form-item>
                    <el-form-item label="引体向上次数" prop="upNumber" v-if="isBoy" >
                      <el-input v-model="basisForm.upNumber" placeholder="请输入引体向上次数" style="width:200px"></el-input>
                      <span>(个)</span>
                    </el-form-item>
                    <el-form-item label="一分钟仰卧起坐数" prop="upNumber" v-else>
                      <el-input v-model="basisForm.upNumber" placeholder="请输入仰卧起坐数" style="width:200px"></el-input>
                      <span>(个)</span>
                    </el-form-item>
                  </el-form>
                  <el-button @click="next()">下一页</el-button>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
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
                  <el-form-item :label="item.label" :prop="item.name" v-for="item in healthForm.questionlist" :key="item.name">
                    <el-radio-group v-model="item.value">
                      <el-radio v-for="answer in answerlist" :key="answer.name" :label="answer.label">{{ answer.name }}</el-radio>
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
                  <el-form-item :label="item.label" :prop="item.name" v-for="item in emotionForm.questionlist" :key="item.name">
                    <el-radio-group v-model="item.value">
                      <el-radio v-for="answer in answerlist" :key="answer.name" :label="answer.label">{{ answer.name }}</el-radio>
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
                  <el-form-item :label="item.label" :prop="item.name" v-for="item in otherForm.questionlist" :key="item.name">
                    <el-radio-group v-model="item.value">
                      <el-radio v-for="answer in answerlist" :key="answer.name" :label="answer.label">{{ answer.name }}</el-radio>
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
                  <el-form-item :label="item.label" :prop="item.name" v-for="item in schoolForm.questionlist" :key="item.name">
                    <el-radio-group v-model="item.value">
                      <el-radio v-for="answer in answerlist" :key="answer.name" :label="answer.label">{{ answer.name }}</el-radio>
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
  <el-button @click="show()">显示</el-button>
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
      isBoy: false,
      isOthers: false,
      isSchool: false,
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
        height: '',
        weight: '',
        pulmonary: '',
        sitReach: '',
        fifty: '',
        enduranceRun: '',
        upNumber: ''
      },
      answerlist: [{
        label: '从没有',
        name: '从没有'
      }, {
        label: '几乎没有',
        name: '几乎没有'
      }, {
        label: '有时有',
        name: '有时有'
      }, {
        label: '经常有',
        name: '经常有'
      }, {
        label: '几乎一直有',
        name: '几乎一直有'
      }],
      healthForm: {
        questionlist: [{
          label: '对我来说,多走一步都困难',
          name: 'walk',
          value: ''
        }, {
          label: '对我来说,跑步很困难',
          name: 'run',
          value: ''
        }, {
          label: '对我来说,参加体育活动或竞赛很困难',
          name: 'race',
          value: ''
        }, {
          label: '对我来说,提重物很困难',
          name: 'rise',
          value: ''
        }, {
          label: '对我来说,自己洗澡和淋浴很困难',
          name: 'bathe',
          value: ''
        }, {
          label: '对我来说,做家务很困难',
          name: 'housework',
          value: ''
        }, {
          label: '我受伤或者是有疼痛',
          name: 'hurt',
          value: ''
        }, {
          label: '我精神萎靡不振',
          name: 'spirit',
          value: ''
        }]
      },
      emotionForm: {
        questionlist: [{
          label: '我感觉到害怕和恐惧',
          name: 'fear',
          value: ''
        }, {
          label: '我感觉到悲伤和忧郁',
          name: 'sad',
          value: ''
        }, {
          label: '我感觉到愤怒',
          name: 'anger',
          value: ''
        }, {
          label: '我睡眠有问题',
          name: 'sleep',
          value: ''
        }, {
          label: '我担心将会有什么事发生在我身上',
          name: 'worry',
          value: ''
        }]
      },
      otherForm: {
        questionlist: [{
          label: '我同其他小朋友相处有困难',
          name: 'getAlong',
          value: ''
        }, {
          label: '其他小朋友不想和我交朋友',
          name: 'makeFriend',
          value: ''
        }, {
          label: '其他小朋友取笑(戏弄)我',
          name: 'jest',
          value: ''
        }, {
          label: '我不能完成同龄小朋友完成的事情',
          name: 'failToFinish',
          value: ''
        }, {
          label: '和其他小朋友一起玩耍(运动)时,我感到很困难',
          name: 'hardToPlay',
          value: ''
        }]
      },
      schoolForm: {
        questionlist: [{
          label: '在课堂上,我的注意力很难集中',
          name: 'concentration',
          value: ''
        }, {
          label: '我容易忘记事情(健忘)',
          name: 'forgettery',
          value: ''
        }, {
          label: '我很难跟上学校的功课',
          name: 'keepPace',
          value: ''
        }, {
          label: '我因为身体不舒服缺课',
          name: 'absentee',
          value: ''
        }, {
          label: '我缺课去(医院)看医生',
          name: 'doctor',
          value: ''
        }]
      },
      rules: {
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
        ]
      }
    }
  },
  created () {
    this.getSex()
  },
  methods: {
    next () {
      this.isBasis = false
      this.isHealth = true
    },
    HealthNext () {
      this.isHealth = false
      this.isEmotion = true
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
      this.isEmotion = false
      this.isOthers = true
    },
    OthersBack () {
      this.isOthers = false
      this.isEmotion = true
    },
    OthersNext () {
      this.isOthers = false
      this.isSchool = true
    },
    SchoolBack () {
      this.isSchool = false
      this.isOthers = true
    },
    // 判断性别
    getSex () {
    },
    show () {
      console.log(this.healthForm.questionlist)
      console.log(this.emotionForm.questionlist)
      console.log(this.otherForm.questionlist)
    }
  }
}
</script>

<style lang="stylus">
#basis-card {
  margin-top: 50px
}

.pclass{
  color:blue;
  font-size:20px;
  font-weight:blod;
}

@media (max-width 768px)
  .radio-group
    display flex
    flex-direction column

  .radio-item
    margin 0 !important
</style>
