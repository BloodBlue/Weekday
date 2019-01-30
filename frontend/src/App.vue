<template>
  <div id="app" @click="clicked">
    <el-container class="firstpage">
      <el-header style="font-size: 15px; font-family: 微软雅黑;" height="0.8rem" v-if="show">
        <div>
          <i class="el-icon-menu" @click="collapse"><span> 我的菜单</span></i>
          <i class="el-icon-menu" @click="exit" style="float: right text-align: right"><span> 退出</span></i>
          <span style="float: right"> {{msg}}欢迎你!</span>
        </div>
      </el-header>
      <el-container>
      <el-aside width="auto" style="background-color: rgb(238, 241, 246)" v-if="show">
        <el-menu :default-active="$route.path" mode="vertical" id="lastclass" :collapse="isCollapse" class="el-menu-vertical-demo"  router>
          <el-menu-item index="1" route="/home">
          <i class="el-icon-view"></i>
          <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2"><template slot="title">
            <i class="el-icon-tickets"></i>
            <span slot="title">我的7天活动表</span>
            </template>
          <el-menu-item index="2-1" route="/monday">周一</el-menu-item>
          <el-menu-item index="2-2" route="/tuesday">周二</el-menu-item>
          <el-menu-item index="2-3" route="/wednesday">周三</el-menu-item>
          <el-menu-item index="2-4" route="/thursday">周四</el-menu-item>
          <el-menu-item index="2-5" route="/friday">周五</el-menu-item>
          <el-menu-item index="2-6" route="/saturday">周六</el-menu-item>
          <el-menu-item index="2-7" route="/sunday">周日</el-menu-item>
          </el-submenu>
          <el-menu-item index="/question" route="/question">
          <i class="el-icon-star-off"></i>
          <span slot="title">调查问卷</span>
          </el-menu-item>
          <el-menu-item index="/frequency" route="/frequency">
          <i class="el-icon-news"></i>
          <span slot="title">活动频率</span></el-menu-item>
          </el-menu>
        </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
      </el-container>
      <el-footer>
        <p style="text-align: center;"> 问卷系统 2019</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import './assets/iconfont/iconfont.css'
export default {
  name: 'App',
  data () {
    return {
      isCollapse: false,
      show: true,
      collapseBtnClick: false,
      msg: localStorage.username + '，',
      ltime: new Date().getTime(), // 最后一次点击时间
      ctime: new Date().getTime(), // 当前时间
      tout: 60 * 60 * 1000
    }
  },
  mounted () {
    window.setInterval(this.ttime, 300000)
  },
  watch: {
    '$route' () {
      console.log(this.$route.name)
      // 不等于登录页面的时候为true
      if (this.$route.name === 'Login' || this.$route.name === 'Register' || this.$route.name === 'Mailpsw') { this.show = false }
      if (this.$route.name === 'frequency' || this.$route.name === 'Question' || this.$route.name === 'Monday' || this.$route.name === 'Home') { this.show = true }
    }
  },
  methods: {
    clicked () {
      this.ltime = new Date().getTime() // 当界面被点击更新时间
    },
    ttime () {
      this.ctime = new Date().getTime()
      // console.log(sessionStorage.getItem('Login'))
      if (this.ctime - this.ltime > this.tout) {
        if (JSON.parse(sessionStorage.getItem('Login')) === true) {
          sessionStorage.removeItem('Login')
          this.$router.push('/login')
          alert('登陆超时，请重新登陆')
        }
      }
    },
    handleSelect (key, keyPath) {
      console.log(key)
      console.log(keyPath)
    },
    collapse: function () {
      this.isCollapse = !this.isCollapse
      var uiwidth = document.getElementById('lastclass')
      if (uiwidth.offsetWidth === 0) {
        uiwidth.style.width = '2.8rem'
      }
    },
    exit: function () {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 0.8rem;
}
.el-aside {
    color: #333;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 2.8rem;
}
</style>
