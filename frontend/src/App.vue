<template>
  <div id="app" @click="clicked">
    <el-container class="firstpage">
      <el-header style="font-size: 15px; font-family: 微软雅黑;" height="0.8rem" v-if="show">
        <div>
          <i class="el-icon-menu" @click="collapse"><span v-show="menushow"> 收缩菜单</span>
          <span v-show="!menushow"> 展开菜单</span>
          </i>
          <i class="el-icon-menu" @click="exit" style="float: right text-align: right"><span> 退出</span></i>
          <span style="float: right"> {{msg}},欢迎你!</span>
        </div>
      </el-header>
      <el-container>
      <el-aside width="auto" style="background-color: rgb(238, 241, 246)" v-if="show">
        <el-menu :default-active="$route.path" mode="vertical" id="lastclass" :collapse="isCollapse" class="el-menu-vertical-demo"  router>
          <el-menu-item index="1" route="/home">
            <i class="el-icon-view"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2" route="/seven">
            <i class="el-icon-tickets"></i>
            <span slot="title">我的7天活动表</span>
          </el-menu-item>
          <el-menu-item index="/question" route="/question">
            <i class="el-icon-star-off"></i>
            <span slot="title">调查问卷</span>
          </el-menu-item>
          <el-menu-item index="/frequency" route="/frequency">
            <i class="el-icon-news"></i>
            <span slot="title">活动频率</span>
          </el-menu-item>
          <el-menu-item index="/admin" route="/Admin" v-show="isAdmin">
            <i class="el-icon-service"></i>
            <span slot="title">管理员</span>
          </el-menu-item>
          <el-menu-item index="rank" @click="Rank()">
            <i class="el-icon-view"></i>
            <span slot="title">点下看看</span>
          </el-menu-item>
          </el-menu>
        </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
      </el-container>
      <el-footer>
        <p style="text-align: center;"> Copyright © 上海大学 体力活动与健康促进定量研究课题组. All rights reserved.</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isAdmin: false,
      isCollapse: false,
      show: true,
      menushow: true,
      msg: '',
      collapseBtnClick: false,
      ltime: new Date().getTime(), // 最后一次点击时间
      ctime: new Date().getTime(), // 当前时间
      tout: 50 * 60 * 1000
    }
  },
  mounted () {
    window.setInterval(this.ttime, 60000)
    this.clicked()
  },
  watch: {
    '$route' () {
      // 判断是否为管理员
      if (localStorage.isAdmin === 'true') { this.isAdmin = true }
      if (localStorage.isAdmin === 'false') { this.isAdmin = false }
      // 不等于登录页面的时候为true
      if (this.$route.name === 'Login' || this.$route.name === 'Register' || this.$route.name === 'Mailpsw') { this.show = false }
      if (this.$route.name === 'frequency' || this.$route.name === 'Question' || this.$route.name === 'Seven' || this.$route.name === 'Home') { this.show = true }
    }
  },
  methods: {
    Rank () {
      this.$ajax.get('/questionnaires/MET', {headers: {'Authorization': localStorage.token}})
        .then((response) => {
          if (response.data.status === 200) {
            let score = response.data.data.MET
            let rank = response.data.data.rank
            let sum = response.data.data.sum
            this.$message({
              dangerouslyUseHTMLString: true,
              title: '体力得分排行榜',
              message: '您的体力得分为' + '<strong>' + score + '</strong>' + '分' + '<br/>' + '在当前完成测试的' + '<strong>' + sum + '</strong>' + '人中' + '<br/>' + '排名第' + '<strong>' + rank + '</strong>' + '位！',
              type: 'success'
            })
          } else if (response.data.status === 400) {
            this.$message({
              title: '提示',
              message: '加油,快去完成这些调研吧！之后有惊喜！！',
              type: 'warning'
            })
          }
        })
    },
    clicked () {
      this.ltime = new Date().getTime() // 当界面被点击更新时间
      this.msg = localStorage.username
    },
    ttime () {
      this.ctime = new Date().getTime()
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
      this.menushow = !this.menushow
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
