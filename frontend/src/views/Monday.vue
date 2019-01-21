<template>
    <div>
      <el-row type="flex" justify="center">
      <el-col :span="22">
        <p id="monp">周一活动日记</p>
        <div style="text-align:center;">
                  <el-form :model="monForm" ref="monForm">
                    <el-form-item :label="monForm.m1" prop="play" class="f">
                      <br/>
                      <el-input-number size="small" v-model="monForm.play_hour" :min="0" :max="12"></el-input-number>
                      <span>小时</span>
                      <el-input-number size="small" v-model="monForm.play_minute" :min="0" :max="59">
                      </el-input-number>
                      <span>分钟</span>
                    </el-form-item>
                    <el-form-item label="用电脑做作业" prop="workWithComputer" class="f">
                      <br/>
                      <el-input-number size="small" v-model="monForm.workWithComputer_hour" :min="0" :max="12">
                      </el-input-number>
                      <span>小时</span>
                      <el-input-number size="small" v-model="monForm.workWithComputer_minute" :min="0" :max="59">
                      </el-input-number>
                      <span>分钟</span>
                    </el-form-item>
                    <el-form-item label="做作业(不包含用电脑的时间)" prop="work" class="f">
                      <br/>
                      <el-input-number size="small" v-model="monForm.work_hour" :min="0" :max="12">
                      </el-input-number>
                      <span>小时</span>
                      <el-input-number size="small" v-model="monForm.work_minute" :min="0" :max="59">
                      </el-input-number>
                      <span>分钟</span>
                    </el-form-item>
                    <el-form-item label="看闲书" prop="read" class="f">
                      <br/>
                      <el-input-number size="small" v-model="monForm.read_hour" :min="0" :max="12">
                      </el-input-number>
                      <span>小时</span>
                      <el-input-number size="small" v-model="monForm.read_minute" :min="0" :max="59">
                      </el-input-number>
                      <span>分钟</span>
                    </el-form-item>
                    <el-form-item label="上课" prop="class" class="f">
                      <br/>
                      <el-input-number size="small" v-model="monForm.class_hour" :min="0" :max="12">
                      </el-input-number>
                      <span>小时</span>
                      <el-input-number size="small" v-model="monForm.class_minute" :min="0" :max="59">
                      </el-input-number>
                      <span>分钟</span>
                    </el-form-item>
                    <el-form-item label="(坐着)出行(私家车/公交车/地铁/火车)" prop="out" class="f">
                     <br/>
                      <el-input-number size="small" v-model="monForm.out_hour" :min="0" :max="12">
                      </el-input-number>
                      <span>小时</span>
                      <el-input-number size="small" v-model="monForm.out_minute" :min="0" :max="59">
                      </el-input-number>
                      <span>分钟</span>
                    </el-form-item>
                    <el-form-item label="做手工或练习乐器" prop="music" class="f">
                      <br/>
                      <el-input-number size="small" v-model="monForm.music_hour" :min="0" :max="12">
                      </el-input-number>
                      <span>小时</span>
                      <el-input-number size="small" v-model="monForm.music_minute" :min="0" :max="59">
                      </el-input-number>
                      <span>分钟</span>
                    </el-form-item>
                    <el-form-item label="跟朋友聊天或打电话" prop="chat" class="f">
                      <br/>
                      <el-input-number size="small" v-model="monForm.chat_hour" :min="0" :max="12">
                      </el-input-number>
                      <span>小时</span>
                      <el-input-number size="small" v-model="monForm.chat_minute" :min="0" :max="59">
                      </el-input-number>
                      <span>分钟</span>
                    </el-form-item>
                    <el-form-item label="其他久坐行为" prop="other" class="f">
                      <br/>
                      <el-input-number size="small" v-model="monForm.other_hour" :min="0" :max="12">
                      </el-input-number>
                      <span>小时</span>
                      <el-input-number size="small" v-model="monForm.other_minute" :min="0" :max="59">
                      </el-input-number>
                      <span>分钟</span>
                    </el-form-item>
                  <el-form-item>
                  <div style="text-align:center">
                  <el-button type="primary" @click="submitform" >提交</el-button>
                  <el-button type="info" @click="submitform">保存</el-button>
                  <!-- <el-button @click="reset('monForm')">重置</el-button> -->
                  </div>
                </el-form-item>
              </el-form>
          </div>
      </el-col>
    </el-row>
    </div>
</template>

<script>
export default {
  name: 'Monday',
  data () {
    return {
      monForm: {
        m1: '使用电子设备用于娱乐(看手机/视频／打游戏)',
        play_hour: '',
        play_minute: '',
        workWithComputer_hour: '',
        workWithComputer_minute: '',
        work_hour: '',
        work_minute: '',
        read_hour: '',
        read_minute: '',
        class_hour: '',
        class_minute: '',
        out_hour: '',
        out_minute: '',
        music_hour: '',
        music_minute: '',
        chat_hour: '',
        chat_minute: '',
        other_hour: '',
        other_minute: ''
      }
    }
  },
  methods: {
    // 提交表单数据
    submitform () {
      console.log('提交')
      var formdata = new FormData()
      formdata.append('play_hour', this.monForm.play_hour)
      formdata.append('play_minute', this.monForm.play_minute)
      this.$ajax({
        method: 'POST',
        url: '/users/monday',
        data: formdata,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      })
      // this.$message('注册成功') 还有判断
    },
    // 清空周一信息
    reset (formName) {
      console.log('清空')
      this.$refs[formName].resetFields()
      this.$message('清空数据成功！')
    }
  }
}
</script>

<style lang="stylus">
.f > :first-child{
  font-size:15px
  font-family:"宋体"
  color: black
  text-align:center
}
#monp{
  font-size:20px
  font-family:"宋体"
  font-weight: bold
  color: orange
}
</style>
