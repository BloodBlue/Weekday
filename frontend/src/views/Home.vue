<template>
  <div>
    <el-button @click="getStatus()">查看最新状态</el-button>
    <div v-for="item of statuslist" :key="item.index">
      <p>{{item.title}}{{item.date}}</p>
      <el-progress :text-inside="true" :stroke-width="18" :percentage="item.percentage" color="item.color"></el-progress>
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
      statuslist: [
        {index: 0, title: '', date: '', percentage: 0, color: 'rgba(142, 113, 199, 0.7)'},
        {index: 1, title: '', date: '', percentage: 0, color: 'rgba(142, 113, 199, 0.7)'},
        {index: 2, title: '', date: '', percentage: 0, color: 'rgba(142, 113, 199, 0.7)'},
        {index: 3, title: '', date: '', percentage: 0, color: 'rgba(142, 113, 199, 0.7)'},
        {index: 4, title: '', date: '', percentage: 0, color: 'rgba(142, 113, 199, 0.7)'},
        {index: 5, title: '', date: '', percentage: 0, color: 'rgba(142, 113, 199, 0.7)'},
        {index: 6, title: '', date: '', percentage: 0, color: 'rgba(142, 113, 199, 0.7)'},
        {index: 7, title: '', date: '', percentage: 0, color: 'rgba(142, 113, 199, 0.7)'}
      ]
    }
  },
  beforeCreate () {
    this.getProcess()
  },
  methods: {
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
          console.log('dict:', this.date)
        })
      // Object.keys(this.day).forEach(element => {
      //   if (element === '0') {
      //     this.statuslist[1].percentage = 100
      //   }
      //   if (element === '1') {
      //     this.statuslist[2].percentage = 100
      //   }
      //   if (element === '2') {
      //     this.statuslist[3].percentage = 100
      //   }
      //   if (element === '3') {
      //     this.statuslist[4].percentage = 100
      //   }
      //   if (element === '4') {
      //     this.statuslist[5].percentage = 100
      //   }
      //   if (element === '5') {
      //     this.statuslist[6].percentage = 100
      //   }
      //   if (element === '6') {
      //     this.statuslist[7].percentage = 100
      //   }
      // })
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
        this.statuslist[index].date = key
        this.statuslist[index].title = get_title(this.date[key])
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
