<template>
    <div>
      <el-row type="flex" justify="center">
      <el-col :span="22">
        <p id="monp">每日体力活动日记</p>
        <p style="color: red">Tips：当天只需填写当天的数据记录，漏填的数据需在首页找到相应进度栏的补填按钮进行填写。</p>
        <div style="text-align:center;">
          <el-form ref="monForm" v-for="item in monForm" :key="item.index">
            <el-form-item :label="item.label" prop="item.name" class="f">
              <br/>
              <el-input-number size="small" v-model="item.hour" :min="0" :max="12"></el-input-number>
              <span>小时</span>
              <el-input-number size="small" v-model="item.minute" :min="0" :max="59"></el-input-number>
              <span>分钟</span>
            </el-form-item>
          </el-form>
          <div style="text-align:center">
            <el-button type="primary" @click="submitform" >提交</el-button>
          </div>
          </div>
      </el-col>
    </el-row>
    </div>
</template>

<script>
export default {
  name: 'Seven',
  data () {
    return {
      day: '',
      monForm: [
        {index: 0, label: '使用电子设备用于娱乐(看手机/视频／打游戏)', name: 'play', hour: '0', minute: '0'},
        {index: 1, label: '用电脑做作业', name: 'workWithComputer', hour: '0', minute: '0'},
        {index: 2, label: '做作业(不包含用电脑的时间)', name: 'homework', hour: '0', minute: '0'},
        {index: 3, label: '看闲书', name: 'read', hour: '0', minute: '0'},
        {index: 4, label: '上课', name: 'classroom', hour: '0', minute: '0'},
        {index: 5, label: '坐着出行(私家车/公交车/地铁/火车)', name: 'out', hour: '0', minute: '0'},
        {index: 6, label: '跟朋友聊天或打电话 ', name: 'chat', hour: '0', minute: '0'},
        {index: 7, label: '其他久坐行为', name: 'other', hour: '0', minute: '0'}
      ]
    }
  },
  methods: {
    // 提交表单数据
    submitform () {
      console.log('提交')
      var answer = []
      var formdata = new FormData()
      for (var key in this.monForm) {
        var data = 0
        data = Number(this.monForm[key].minute) + 60 * Number(this.monForm[key].hour)
        answer.push(data)
      }
      formdata.append('answer', answer)
      this.$ajax({
        method: 'POST',
        url: '/questionnaires/7d',
        data: formdata,
        headers: {
          'Authorization': localStorage.token
        }
      })
        .then(response => {
          if (response.data.status === 200) { // 提交成功的页面
            this.$message({
              title: '提示信息',
              message: '恭喜你，提交成功',
              type: 'success'
            })
            if (response.data.data.completed === false) {
              alert('明天记得再来填写哦')
              this.$router.push('/home')
            }
            if (response.data.data.completed === true) {
              alert('恭喜你完成7天活动日记，接下来还差最后一部分啦！')
              this.$router.push('/frequency')
            }
          } else {
            this.$message({
              message: '今天已提交，请勿重复提交！',
              type: 'warning'
            })
          }
        })
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
