<template>
<div>
  <div>
  <el-scrollbar style="height:700">
  <div class="title1">
    <span class="firsttitle" style="font-size: 12px">问卷须知</span>
    <p id="detail">请尽可能诚实和完整地回答本平台问卷内容，并在题目中写出你的真实情况或感受。问卷回答在提交之后，均不可修改，您的个人信息将会得到妥善保护，并仅用作学校管理工作和学术研究。本问卷共分为三个板块：7天活动日记、调查问卷、活动频率。其中:</p>
    <p id="detail"><i class="el-icon-info" id="lan" >调查问卷为独立板块，注册后即可填写</i></p>
    <p id="detail"><i class="el-icon-info" id="lan" ><span>7天活动日记需连续7天记录每日的体力活动</span></i></p>
    <p id="detail"><i class="el-icon-info" id="lan" >活动频率板块需在7天活动日记完成后填写</i></p>
    <p id="detail">感谢您的填写！</p>
  </div>
  <div v-if="isWap" class="title1">
    <span class="firsttitle" style="font-size: 12px">问卷进度</span>
    <el-button @click="getStatus()">查看最新状态</el-button>
    <div v-for="item of statuslist" :key="item.index">
      <div class="title">
        <span class="p_left">{{item.title}}</span>
        <span>{{item.date}}</span>
      </div>
      <div class="progress">
        <el-progress :text-inside="true" :stroke-width="25" :percentage="item.percentage" :color="item.color" class="percent"></el-progress>
        <el-popover placement="left-start" width="320" v-show="item.isGet && item.isShow" trigger="click" >
          <el-table :data="gridData" >
            <el-table-column property="event" label="事件" width="220"></el-table-column>
            <el-table-column property="time" label="时间(分钟)" width="100"></el-table-column>
          </el-table>
          <el-button slot="reference" @click="see(item.index)" size="mini" type="info" round>查看</el-button>
        </el-popover>
        <el-button @click="wad(item.index)" v-show="item.isGet && item.isOver && item.isOk" size="mini" type="warning" round>补填</el-button>
        <el-button @click="to('/seven')" v-show="item.isGet && item.isNow && item.isOk" size="mini" type="success" round>进行中</el-button>
      </div>
    </div>
  </div>
  <div v-else>
    <el-button type="danger" icon="el-icon-back" circle @click="Back()" class="close"></el-button>
    <p id="monp">{{title}}</p>
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
      </div>
    <div style="text-align:center">
      <el-button type="primary" @click="submitform">提交</el-button>
    </div>
  </div>
  </el-scrollbar>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      isWap: true,
      isRank: false,
      title: '',
      id: -1,
      day: '',
      dict: {0: '周一体力活动记录', 1: '周二体力活动记录', 2: '周三体力活动记录', 3: '周四体力活动记录', 4: '周五体力活动记录', 5: '周六体力活动记录', 6: '周日体力活动记录'},
      date: '',
      num: '',
      question: '',
      frequency: '',
      monForm: [
        {index: 0, label: '使用电子设备用于娱乐(看手机/视频／打游戏)', name: 'play', hour: '0', minute: '0'},
        {index: 1, label: '用电脑做作业', name: 'workWithComputer', hour: '0', minute: '0'},
        {index: 2, label: '做作业(不包含用电脑的时间)', name: 'homework', hour: '0', minute: '0'},
        {index: 3, label: '看闲书', name: 'read', hour: '0', minute: '0'},
        {index: 4, label: '上课', name: 'classroom', hour: '0', minute: '0'},
        {index: 5, label: '(坐着)出行(私家车/公交车/地铁/火车)', name: 'out', hour: '0', minute: '0'},
        {index: 6, label: '跟朋友聊天或打电话 ', name: 'chat', hour: '0', minute: '0'},
        {index: 7, label: '其他', name: 'other', hour: '0', minute: '0'}
      ],
      gridData: [
        {event: '使用电子设备用于娱乐(看手机/视频/打游戏)', time: 0},
        {event: '用电脑做作业', time: 0},
        {event: '做作业(不包含用电脑的时间)', time: 0},
        {event: '看闲书', time: 0},
        {event: '上课', time: 0},
        {event: '(坐着)出行(私家车/公交车/地铁/火车)', time: 0},
        {event: '跟朋友聊天或打电话', time: 0},
        {event: '其他久坐行为', time: 0}
      ],
      statuslist: [
        {index: -1, title: '', date: '', percentage: 0, color: '#9966CC', isGet: false, isShow: false, isOk: true, isOver: false, isNow: false},
        {index: -2, title: '', date: '', percentage: 0, color: '#9966CC', isGet: false, isShow: false, isOk: true, isOver: false, isNow: false},
        {index: -3, title: '', date: '', percentage: 0, color: '#9966CC', isGet: false, isShow: false, isOk: true, isOver: false, isNow: false},
        {index: -4, title: '', date: '', percentage: 0, color: '#9966CC', isGet: false, isShow: false, isOk: true, isOver: false, isNow: false},
        {index: -5, title: '', date: '', percentage: 0, color: '#9966CC', isGet: false, isShow: false, isOk: true, isOver: false, isNow: false},
        {index: -6, title: '', date: '', percentage: 0, color: '#9966CC', isGet: false, isShow: false, isOk: true, isOver: false, isNow: false},
        {index: -7, title: '', date: '', percentage: 0, color: '#9966CC', isGet: false, isShow: false, isOk: true, isOver: false, isNow: false},
        {index: -8, title: '', date: '', percentage: 0, color: '#9966CC', isGet: false, isShow: false, isOk: true, isOver: false, isNow: false},
        {index: -9, title: '活动频率！', date: '', percentage: 0, color: '#9966CC', isGet: false, isShow: false, isOk: true, isOver: false, isNow: false}
      ]
    }
  },
  mounted: function () {
    this.getStatus()
    document.body.setAttribute('class', 'bodyhome')
    console.log('渲染完成')
  },
  methods: {
    // 从后端获取信息，day表示已回答的题目；date表示日期和礼拜
    getProcess () {
      this.$ajax.get('/questionnaires/7d', {headers: {'Authorization': localStorage.token}, withCredentials: true}
      ).then((val) => {
        if (val.data.status === 200) { // 有数据
          this.day = val.data.data.sevendays
          this.date = val.data.data.date
          for (var num in this.statuslist) {
            var data = this.statuslist[num]
            data.isGet = true
            this.statuslist.splice(num, 1, data)
          }
        } else if (val.data.status === 400) { // 无数据
          this.$message({
            title: '提示信息',
            message: '你还没填写完呢！',
            type: 'error'
          })
        }
      })
      // 获取普通问卷和活动频率的信息
      this.$ajax.get('/questionnaires/status', {headers: {'Authorization': localStorage.token}, withCredentials: true}
      ).then((val) => {
        var questionSet = val.data.data
        var index1 = 0
        for (var key4 in questionSet) {
          if (index1 === 0) {
            this.num = questionSet[key4]
          } else if (index1 === 1) {
            this.question = questionSet[key4]
          } else {
            this.frequency = questionSet[key4]
          }
          index1 = index1 + 1
        }
        if (questionSet.submit_phase2 === true) {
          this.isRank = true
        }
      })
    },
    // 获取题目对应title
    get_title (num) {
      return this.dict[num]
    },
    // 获取状态
    getStatus () {
      this.getProcess()
      var index = 0
      for (var key in this.date) {
        var data = this.statuslist[index]
        data.date = key
        data.title = this.get_title(this.date[key])
        data.index = this.date[key]
        this.statuslist.splice(index, 1, data)
        index = index + 1
      }
      this.checkTime()
      for (var key1 in this.day) {
        for (var key2 in this.statuslist) {
          if (this.statuslist[key2].title === this.get_title(key1)) {
            var dataList = this.statuslist[key2]
            dataList.percentage = 100 // 进度条变为100%
            dataList.isShow = true // 有数据可以展示
            dataList.isOk = false // 需要补填
            this.statuslist.splice(key2, 1, dataList)
          }
        }
      }
      if (this.question === true) {
        var questionSet = this.statuslist[7]
        questionSet.title = '调查问卷'
        questionSet.percentage = 100
        questionSet.index = 7
        this.statuslist.splice(7, 1, questionSet)
      }
      if (this.frequency === true) {
        var freSet = this.statuslist[8]
        freSet.title = '活动频率'
        freSet.percentage = 100
        this.statuslist.splice(8, 1, freSet)
      }
    },
    // 根据所点击的事件显示相应用户所填数据
    see (number) {
      var data = this.day[number]
      for (var order in this.gridData) {
        this.gridData[order].time = data[order]
      }
    },
    // 判断今天是否已过
    checkTime () {
      for (var key in this.statuslist) {
        var sdate = new Date(Date.parse(this.statuslist[key].date.replace(/-/g, '/')))
        var Today = new Date()
        var TodayTime = Today.getTime() - 60 * 60 * 1000 * Today.getHours() - 60 * 1000 * Today.getMinutes() - 1000 * Today.getSeconds() - Today.getMilliseconds()
        var Tomorrow = TodayTime + 86400000
        if (sdate.getTime() < TodayTime) {
          var dataList = this.statuslist[key]
          dataList.isOver = true
          this.statuslist.splice(key, 1, dataList)
        } else if (sdate.getTime() >= TodayTime && sdate.getTime() < Tomorrow) {
          var dataS = this.statuslist[key]
          dataS.isNow = true
          this.statuslist.splice(key, 1, dataS)
        }
      }
    },
    // 补填功能键
    wad (number) {
      this.isWap = false
      this.title = this.get_title(number)
      this.id = number
    },
    // 跳转
    to (url) {
      this.$router.push(url)
    },
    // 提交补填的信息
    submitform () {
      console.log('补填提交')
      var answer = []
      var formdata = new FormData()
      formdata.append('day', this.id)
      for (var key in this.monForm) {
        var data = 0
        data = Number(this.monForm[key].minute) + 60 * Number(this.monForm[key].hour)
        answer.push(data)
      }
      formdata.append('answer', answer)
      this.$ajax({
        method: 'PUT',
        url: '/questionnaires/7d',
        data: formdata,
        headers: {
          'Authorization': localStorage.token
        }
      })
        .then(response => {
          if (response.data.status === 200) { // 登录成功的页面
            this.$message({
              title: '提示信息',
              message: '恭喜你，提交成功',
              type: 'success'
            })
            if (response.data.data.completed === false) {
              alert('下次不要忘记啦')
              this.isWap = true
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
      // 清空数据
      for (var key3 in this.monForm) {
        this.monForm[key3].hour = '0'
        this.monForm[key3].minute = '0'
      }
    },
    // 返回查看信息页面
    Back () {
      this.isWap = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
.title
  display flex

.p_left
  flex 60%

.progress
  display flex

.percent
  flex 60%

f > :first-child{
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
.bodyhome{
}

.close{
  margin-right 10px
}
.title1{
  width:83%;
  padding: 3px 15px;
  margin: 20px 0px;
  border: 2px solid grey

}
.firsttitle{
  display:block;
  width:80px;
  height:30%;
  position:relative;
  top:-15px;
  text-align: center;
  background: white;
}
#detail{
  font-family:"宋体"
  font-size: 15px
}
#lan{
  color: #F45B4B !important;
  font-family:"宋体";
  font-size: 15px
}
.el-scrollbar_wrap{
  overflow-x: hidden;
}
.Rank{
  float: right;
}
</style>
