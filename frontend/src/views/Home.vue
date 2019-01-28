<template>
  <div>
    <el-button @click="getStatus()">查看最新状态</el-button>
    <div v-for="item of statuslist" :key="item.index">
      <div class="title">
        <span class="p_left">{{item.title}}</span>
        <span>{{item.date}}</span>
      </div>
      <div class="progress">
        <el-progress :text-inside="true" :stroke-width="25" :percentage="item.percentage" :color="item.color" class="percent"></el-progress>
        <el-popover placement="left-start" width="320" v-show="item.isGet && item.isShow" trigger="click" >
          <el-table :data="gridData">
            <el-table-column property="event" label="事件" width="220"></el-table-column>
            <el-table-column property="time" label="时间(分钟)" width="100"></el-table-column>
          </el-table>
          <el-button slot="reference" @click="see(item.index)" size="mini" type="info" round>查看</el-button>
        </el-popover>
        <el-button @click="wad(item.index)" v-show="item.isGet && item.isOver && item.isOk" size="mini" type="warning" round>补填</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      day: '',
      dict: {0: '周一体力活动记录', 1: '周二体力活动记录', 2: '周三体力活动记录', 3: '周四体力活动记录', 4: '周五体力活动记录', 5: '周六体力活动记录', 6: '周日体力活动记录'},
      date: '',
      gridData: [
        {event: '使用电子设备用于娱乐(看手机/视频/打游戏)', time: 0},
        {event: '用电脑做作业', time: 0},
        {event: '做作业(不包含用电脑的时间)', time: 0},
        {event: '看闲书', time: 0},
        {event: '上课', time: 0},
        {event: '(坐着)出行(私家车/公交车/地铁/火车)', time: 0},
        {event: '做手工或练习乐器', time: 0},
        {event: '跟朋友聊天或打电话', time: 0},
        {event: '其他久坐行为', time: 0}
      ],
      statuslist: [
        {index: -1, title: '', date: '', percentage: 0, color: '#9966CC', isGet: false, isShow: false, isOk: true, isOver: false},
        {index: -2, title: '', date: '', percentage: 0, color: '#9966CC', isGet: false, isShow: false, isOk: true, isOver: false},
        {index: -3, title: '', date: '', percentage: 0, color: '#9966CC', isGet: false, isShow: false, isOk: true, isOver: false},
        {index: -4, title: '', date: '', percentage: 0, color: '#9966CC', isGet: false, isShow: false, isOk: true, isOver: false},
        {index: -5, title: '', date: '', percentage: 0, color: '#9966CC', isGet: false, isShow: false, isOk: true, isOver: false},
        {index: -6, title: '', date: '', percentage: 0, color: '#9966CC', isGet: false, isShow: false, isOk: true, isOver: false},
        {index: -7, title: '', date: '', percentage: 0, color: '#9966CC', isGet: false, isShow: false, isOk: true, isOver: false},
        {index: -8, title: '调查问卷', date: '', percentage: 0, color: '#9966CC', isGet: true, isShow: false, isOk: true, isOver: false}
      ]
    }
  },
  created () {
    this.getStatus()
  },
  methods: {
    // 从后端获取信息，day表示已回答的题目；date表示日期和礼拜
    getProcess () {
      this.$ajax({
        url: '/questionnaires/7d',
        method: 'GET',
        headers: {
          'Authorization': localStorage.token
        },
        withCredentials: true
      })
        .then(val => {
          this.day = val.data.data.sevendays
          this.date = val.data.data.date
          console.log('sevendays', this.day)
          console.log('date:', this.date)
          for (var num in this.statuslist) {
            this.statuslist[num].isGet = true
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
        this.statuslist[index].date = key // 获取xx年xx月xx日
        this.statuslist[index].title = this.get_title(this.date[key]) // 获取标题
        this.statuslist[index].index = this.date[key] // index为0-6对应礼拜一-礼拜天
        index = index + 1
      }
      this.checkTime()
      index = 0
      for (var key1 in this.day) {
        for (var key2 in this.statuslist) {
          if (this.statuslist[key2].title === this.get_title(key1)) {
            this.statuslist[key2].percentage = 100 // 进度条变为100%
            this.statuslist[key2].isShow = true // 有数据可以展示
            this.statuslist[key2].isOk = false // 需要补填
          }
        }
      }
    },
    // 根据所点击的事件显示相应用户所填数据
    see (number) {
      console.log(number)
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
        if (sdate.getTime() < Today.getTime()) {
          this.statuslist[key].isOver = true
        }
      }
    },
    wad (number) {
      console.log(number)
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
</style>
