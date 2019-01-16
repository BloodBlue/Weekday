<template>
  <div id="app" v-if="isShow">
    <el-container>
      <el-header>
      <el-breadcrumb separator="/" replace="true">
        <el-breadcrumb-item :to="{ path: '/login' }">登录</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/register'}">活动管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/li'}">1</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer class="footer">
      <p style="text-align: center;"> 问卷系统 2019</p>
    </el-footer>
    </el-container>
  </div>
  <div id="app" v-else>
    <el-container>
      <el-header>
      <el-menu :default-active="$route.path" mode="horizontal" router>
        <el-menu-item index="/" route="/">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的7天活动表</template>
          <el-menu-item index="2-1" route="/monday">周一</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="/question" route="/question">调查问卷</el-menu-item>
    </el-menu>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
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
      isShow: false
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key)
      console.log(keyPath)
    }
  }
}
</script>

<style>
</style>
