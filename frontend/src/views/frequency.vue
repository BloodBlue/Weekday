<template>
<div>
  <el-row type="flex" justify="space-around">
    <el-col :span="22">
        <div>
          <el-row type="flex" justify="space-around">
              <el-col :span="22">
                  <el-form :model="freForm" :rules="rules" label-position="left" ref="freForm">
                    <p id="frepclass01">以下题目考察您体力活动内容、强度及频率</p>
                    <hr color=grey size=2>
                    <el-form-item :label="freForm.f1" prop="sport" class="sport">
                      <br/>
                      <el-checkbox-group v-model="freForm.sport" :min=0 :max=5>
                        <el-checkbox v-for="sport in freForm.sportlist" :key="sport.name" :label="sport.label" :name="freForm.sport">{{sport.name}}</el-checkbox>
                        <el-checkbox :label="freForm.othersport" :name="freForm.sport">其他：
                        <el-input size="mini" v-model="freForm.othersport" placeholder="请输入内容" clearable></el-input>
                        </el-checkbox>
                      </el-checkbox-group>
                     </el-form-item>
                     <p id="frepclass">请您根据过去七天的实际情况， 完成以下问题</p>
                     <hr color=grey size=2>
                    <el-form-item :label="freForm.f2" prop="heavy" class="heavy">
                      <br/>
                      <p><span style="color:red"><i class="el-icon-info"></i>友情提示：</span>所谓剧烈的体力活动是指每次至少10分钟、需要大力气完成、感到呼吸急促或较安静状态明显增强、以及心跳明显加快的活动。</p>
                      <el-input-number size="small" v-model="freForm.heavy" :min="0" :step="1"></el-input-number>
                      <span>次/周</span>
                     </el-form-item>
                    <el-form-item :label="freForm.f3" prop="heavytime" class="heavy">
                      <br/>
                      <el-input-number size="small" v-model="freForm.heavytimehour" @change="handleChange" :min="0" max="12"></el-input-number>
                      <span>小时</span>
                      <el-input-number size="small" v-model="freForm.heavytimemin" @change="handleChange" :min="0" max="59"></el-input-number>
                      <span>分钟/次</span>
                     </el-form-item>
                    <hr color=grey size=2>
                    <el-form-item :label="freForm.f4" prop="medheavy" class="heavy">
                      <br/>
                      <p><span style="color:red"><i class="el-icon-info"></i>友情提示：</span>所谓中等强度的体力活动是指每次至少 10 分钟、需要中等力气完成、呼吸较安静时稍微增强，以及心跳 稍微加快的活动；某项活动，比如打篮球有可能是中等强度，也有可能是大强度；比如太极拳推手和对抗 练习，也可能是中等强度运动或大强度运动，请根据你的主观感受填写。</p>
                      <el-input-number size="small" v-model="freForm.medheavy" @change="handleChange" :min="0"></el-input-number>
                      <span>次/周</span>
                     </el-form-item>
                    <el-form-item :label="freForm.f5" prop="medheavytime" class="heavy">
                      <br/>
                      <el-input-number size="small" v-model="freForm.medheavytimehour" @change="handleChange" :min="0" max="12"></el-input-number>
                      <span>小时</span>
                      <el-input-number size="small" v-model="freForm.medheavytimemin" @change="handleChange" :min="0" max="59"></el-input-number>
                      <span>分钟/次</span>
                     </el-form-item>
                    <hr color=grey size=2>
                    <el-form-item :label="freForm.f6" prop="walk" class="heavy">
                      <br/>
                      <p><span style="color:red"><i class="el-icon-info"></i>提示：</span>包括在家或工作场所、外出步行以及闲暇时间的散步、娱乐、锻炼等等各种生活状态下的步行活动。</p>
                      <el-input-number size="small" v-model="freForm.walk" @change="handleChange" :min="0"></el-input-number>
                      <span>次/天</span>
                     </el-form-item>
                    <el-form-item :label="freForm.f7" prop="walktime" class="heavy">
                      <br/>
                      <el-input-number size="small" v-model="freForm.walktimehour" @change="handleChange" :min="0" max="12"></el-input-number>
                      <span>小时</span>
                      <el-input-number size="small" v-model="freForm.walktimemin" @change="handleChange" :min="0" max="59"></el-input-number>
                      <span>分钟/次</span>
                     </el-form-item>
                    <hr color=grey size=2>
                    <el-form-item :label="freForm.f8" prop="oxytime" class="heavy">
                      <br/>
                      <p><span style="color:red"><i class="el-icon-info"></i>友情提示：</span>有氧运动指需要中等力气完成、呼吸较安静时稍微增强，以及心跳稍微加快的活动…….. </p>
                      <el-input-number size="small" v-model="freForm.oxytimehour" @change="handleChange" :min="0" max="12"></el-input-number>
                      <span>小时</span>
                      <el-input-number size="small" v-model="freForm.oxytimemin" @change="handleChange" :min="0" max="59"></el-input-number>
                      <span>分钟</span>
                     </el-form-item>
                    <hr color=grey size=2>
                    <el-form-item :label="freForm.f9" prop="fittime">
                      <el-radio-group v-model="freForm.fittime">
                        <el-radio v-for="time in freForm.fittimelist" :key="time.name" :label="time.label" :name="freForm.fittime">{{time.name}}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                      <div style="text-align:center">
                      <el-button type="primary" @click="submitForm('freForm')" size="medium">提交</el-button>
                      <el-button @click="resetForm('freForm')" size="medium" native-type="reset">重置</el-button>
                      </div>
                    </el-form-item>
                  </el-form>
              </el-col>
          </el-row>
        </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: 'frequency',
  data () {
    return {
      freForm: {
        f1: '您经常参加(平均每周3次、每次10分钟以上)的体力活动项目是（可多选/最多选5项)',
        f2: '在过去 7 天内,你有几次进行了剧烈的体力活动,例如:搬（举）重物、快速骑自行车、剧烈的体育锻炼（如篮球、 足球、网球、武术）等等？',
        f3: '每次进行上述剧烈的体力活动通常需要大概多长时间',
        f4: '在过去 7 天内，你有几次进行了中等强度的体力活动，例如搬（举）轻物、中等速度骑自行车或是参加中等强度体育锻炼（如乒乓、游泳、慢跑）',
        f5: '每次进行上述中等强度的体力活动通常需要多长时间?',
        f6: '在过去 7 天内，你通常每天有几次进行持续 10 分钟以上的步行活动？',
        f7: '在上述情况中，你通常每天要步行多长时间',
        f8: '在过去 7 天内， 你从事有氧运动（比如跑步、打篮球、踢足球）的时间累计起来大概一共有多长时间？',
        f9: '过去的 7 天里（或平均一周），您有几天参加巩固或增强肌肉的体力活动（比如俯卧撑、仰卧起坐或臂屈伸、力量举、 深蹲、哑铃、弹簧扩胸、瑜伽等）',
        sport: [],
        othersport: '',
        heavy: '0',
        heavytime: '',
        heavytimehour: '',
        heavytimemin: '',
        medheavy: '',
        medheavytime: '',
        medheavytimehour: '',
        medheavytimemin: '',
        walk: '',
        walktime: '',
        walktimehour: '',
        walktimemin: '',
        oxytime: '',
        oxytimehour: '',
        oxytimemin: '',
        fittime: '',
        fittimelist: [{
          label: '0',
          name: '没有'
        }, {
          label: '1',
          name: '1次'
        }, {
          label: '2',
          name: '2次'
        }, {
          label: '3',
          name: '3次'
        }, {
          label: '4',
          name: '4次'
        }, {
          label: '5',
          name: '5次'
        }, {
          label: '6',
          name: '6次'
        }],
        sportlist: [{
          label: '1',
          name: '乒乓球'
        }, {
          label: '2',
          name: '羽毛球'
        }, {
          label: '3',
          name: '篮球'
        }, {
          label: '4',
          name: '排球'
        }, {
          label: '5',
          name: '足球'
        }, {
          label: '6',
          name: '网球'
        }, {
          label: '7',
          name: '游泳'
        }, {
          label: '8',
          name: '健美操'
        }, {
          label: '9',
          name: '跳舞'
        }, {
          label: '10',
          name: '武术（太极拳）'
        }, {
          label: '11',
          name: '射箭'
        }, {
          label: '12',
          name: '舞龙'
        }, {
          label: '13',
          name: '毽子/跳绳'
        }, {
          label: '14',
          name: '跆拳道'
        }, {
          label: '15',
          name: '空手道'
        }, {
          label: '16',
          name: '轮滑/滑冰'
        }, {
          label: '17',
          name: '橄榄球'
        }, {
          label: '18',
          name: '跑/慢跑'
        }, {
          label: '19',
          name: '快走'
        }, {
          label: '20',
          name: '台球'
        }, {
          label: '21',
          name: '击剑'
        }, {
          label: '22',
          name: '攀岩'
        }, {
          label: '23',
          name: '棒球'
        }, {
          label: '24',
          name: '高尔夫'
        }]
      },
      rules: {
        /* sport: [
          {sport: 'array', required: true, message: '请选择运动', trigger: 'blur'}
        ], */
        heavy: [
          {required: true, message: '请选择次数', trigger: 'change'}
        ],
        medheavy: [
          {required: true, message: '请选择次数', trigger: 'change'}
        ],
        walk: [
          {required: true, message: '请选择次数', trigger: 'change'}
        ],
        fittime: [
          {required: true, message: '请选择次数', trigger: 'change'}
        ]
      }
    }
  },
  computed: {
    comoxytime: function () {
      return Number(this.freForm.oxytimemin) + 60 * Number(this.freForm.oxytimehour)
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    submitForm (freForm) {
      this.$refs['freForm'].validate((valid) => {
        if (valid) {
          var answer = []
          answer.push(this.freForm.sport.join(' '))
          answer.push(this.freForm.heavy)
          var heavytime = Number(this.freForm.heavytimemin) + 60 * Number(this.freForm.heavytimehour)
          answer.push(heavytime)
          answer.push(this.freForm.medheavy)
          var medheavytime = Number(this.freForm.medheavytimemin) + 60 * Number(this.freForm.medheavytimehour)
          answer.push(medheavytime)
          answer.push(this.freForm.walk)
          var walktime = Number(this.freForm.walktimemin) + 60 * Number(this.freForm.walktimehour)
          answer.push(walktime)
          var oxytime = Number(this.freForm.oxytimemin) + 60 * Number(this.freForm.oxytimehour)
          answer.push(oxytime)
          answer.push(this.freForm.fittime)
          var freformdata = new FormData()
          freformdata.append('answer', answer)
          this.$ajax({
            method: 'POST',
            url: '/questionnaires/submit_phase2',
            data: freformdata,
            headers: {
              'Authorization': localStorage.token,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            }
          })
          console.log(answer)
          alert('submit!')
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    resetForm (freForm) {
      this.$refs[freForm].resetFields()
    }
  }
}
</script>

<style lang="stylus">
.sport{
  align:left
}
#frepclass01{
  font-size:15px
  color:red
}
#frepclass{
  font-size:15px
  color:blue
}
</style>
