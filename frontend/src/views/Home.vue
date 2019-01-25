<template>
  <div>
    <el-button @click="getProcess()">查看最新状态</el-button>
    <p>调查问卷</p>
    <el-progress :text-inside="true" :stroke-width="18" :percentage="survey" color="rgba(142, 113, 199, 0.7)"></el-progress>
    <p>周一体力活动记录</p>
    <el-progress :text-inside="true" :stroke-width="18" :percentage="monday" color="rgba(142, 113, 199, 0.7)"></el-progress>
    <p>周二体力活动记录</p>
    <el-progress :text-inside="true" :stroke-width="18" :percentage="tuesday" color="rgba(142, 113, 199, 0.7)"></el-progress>
    <p>周三体力活动记录</p>
    <el-progress :text-inside="true" :stroke-width="18" :percentage="wednesday" color="rgba(142, 113, 199, 0.7)"></el-progress>
    <p>周四体力活动记录</p>
    <el-progress :text-inside="true" :stroke-width="18" :percentage="thursday" color="rgba(142, 113, 199, 0.7)"></el-progress>
    <p>周五体力活动记录</p>
    <el-progress :text-inside="true" :stroke-width="18" :percentage="friday" color="rgba(142, 113, 199, 0.7)"></el-progress>
    <p>周六体力活动记录</p>
    <el-progress :text-inside="true" :stroke-width="18" :percentage="saturday" color="rgba(142, 113, 199, 0.7)"></el-progress>
    <p>周日体力活动记录</p>
    <el-progress :text-inside="true" :stroke-width="18" :percentage="sunday" color="rgba(142, 113, 199, 0.7)"></el-progress>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      survey: 0,
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0
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
        })
      console.log(Object.keys(this.day))
      Object.keys(this.day).forEach(element => {
        if (element === '0') {
          this.monday = 100
        }
        if (element === '1') {
          this.tuesday = 100
        }
        if (element === '2') {
          this.wednesday = 100
        }
        if (element === '3') {
          this.thursday = 100
        }
        if (element === '4') {
          this.friday = 100
        }
        if (element === '5') {
          this.saturday = 100
        }
        if (element === '6') {
          this.sunday = 100
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
