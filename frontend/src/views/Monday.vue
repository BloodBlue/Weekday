<template>
    <div>
      <el-row type="flex" justify="center">
      <el-col :span="15">
        <el-card id="login-card">
          <div slot="header" class="clearfix">
            <span>周一</span>
          </div>
          <div>
            <el-row type="flex" justify="center">
              <el-col :span="20">
                <el-form :model="monForm" :rules="rules" ref="monForm" label-width="300px">
                    <el-form-item label="使用电子设备用于娱乐(看手机/视频／打游戏)">
                      <el-form-item prop="play">
                        <el-input-number v-model="monForm.play_hour" :min="0" :max="12" style="width:130px">
                        </el-input-number>
                        <el-span>小时-</el-span>
                        <el-input-number v-model="monForm.play_minute" :min="0" :max="59" style="width:130px">
                        </el-input-number>
                        <el-span>分钟</el-span>
                      </el-form-item>
                    </el-form-item>
                    <el-form-item label="用电脑做作业">
                      <el-form-item prop="workWithComputer">
                        <el-input-number v-model="monForm.workWithComputer_hour" :min="0" :max="12" style="width:130px">
                        </el-input-number>
                        <el-span>小时-</el-span>
                        <el-input-number v-model="monForm.workWithComputer_minute" :min="0" :max="59" style="width:130px">
                        </el-input-number>
                        <el-span>分钟</el-span>
                      </el-form-item>
                    </el-form-item>
                    <el-form-item label="做作业(不包含用电脑的时间)">
                      <el-form-item prop="work">
                        <el-input-number v-model="monForm.work_hour" :min="0" :max="12" style="width:130px">
                        </el-input-number>
                        <el-span>小时-</el-span>
                        <el-input-number v-model="monForm.work_minute" :min="0" :max="59" style="width:130px">
                        </el-input-number>
                        <el-span>分钟</el-span>
                      </el-form-item>
                    </el-form-item>
                    <el-form-item label="看闲书">
                      <el-form-item prop="read">
                        <el-input-number v-model="monForm.read_hour" :min="0" :max="12" style="width:130px">
                        </el-input-number>
                        <el-span>小时-</el-span>
                        <el-input-number v-model="monForm.read_minute" :min="0" :max="59" style="width:130px">
                        </el-input-number>
                        <el-span>分钟</el-span>
                      </el-form-item>
                    </el-form-item>
                    <el-form-item label="上课">
                      <el-form-item prop="class">
                        <el-input-number v-model="monForm.class_hour" :min="0" :max="12" style="width:130px">
                        </el-input-number>
                        <el-span>小时-</el-span>
                        <el-input-number v-model="monForm.class_minute" :min="0" :max="59" style="width:130px">
                        </el-input-number>
                        <el-span>分钟</el-span>
                      </el-form-item>
                    </el-form-item>
                    <el-form-item label="(坐着)出行(私家车/公交车/地铁/火车)">
                      <el-form-item prop="out">
                        <el-input-number v-model="monForm.out_hour" :min="0" :max="12" style="width:130px">
                        </el-input-number>
                        <el-span>小时-</el-span>
                        <el-input-number v-model="monForm.out_minute" :min="0" :max="59" style="width:130px">
                        </el-input-number>
                        <el-span>分钟</el-span>
                      </el-form-item>
                    </el-form-item>
                    <el-form-item label="做手工或练习乐器">
                      <el-form-item prop="music">
                        <el-input-number v-model="monForm.music_hour" :min="0" :max="12" style="width:130px">
                        </el-input-number>
                        <el-span>小时-</el-span>
                        <el-input-number v-model="monForm.music_minute" :min="0" :max="59" style="width:130px">
                        </el-input-number>
                        <el-span>分钟</el-span>
                      </el-form-item>
                    </el-form-item>
                    <el-form-item label="跟朋友聊天或打电话">
                      <el-form-item prop="chat">
                        <el-input-number v-model="monForm.chat_hour" :min="0" :max="12" style="width:130px">
                        </el-input-number>
                        <el-span>小时-</el-span>
                        <el-input-number v-model="monForm.chat_minute" :min="0" :max="59" style="width:130px">
                        </el-input-number>
                        <el-span>分钟</el-span>
                      </el-form-item>
                    </el-form-item>
                    <el-form-item label="其他久坐行为">
                      <el-form-item prop="other">
                        <el-input-number v-model="monForm.other_hour" :min="0" :max="12" style="width:130px">
                        </el-input-number>
                        <el-span>小时-</el-span>
                        <el-input-number v-model="monForm.other_minute" :min="0" :max="59" style="width:130px">
                        </el-input-number>
                        <el-span>分钟</el-span>
                      </el-form-item>
                    </el-form-item>
                  <el-form-item>
                  <el-button type="primary" @click="submitform" >提交</el-button>
                  <!-- <el-button @click="reset('monForm')">重置</el-button> -->
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
  name: 'Monday',
  data () {
    return {
      monForm: {
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

</style>
